'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Copy, Sparkles, Layout, Palette, Type, Code, Terminal, Check, Bot } from 'lucide-react';
import { format } from 'date-fns';

const quickPrompts = [
    { icon: Layout, label: 'Add Hero', prompt: 'Create a modern hero section with a title, description, and primary CTA button.' },
    { icon: Palette, label: 'Pricing Table', prompt: 'Build a 3-tier pricing table with features and "Get Started" buttons.' },
    { icon: Type, label: 'Contact Form', prompt: 'Create a contact form with name, email, subject, and a message textarea.' },
];

export function ContextualAssistant() {
    const {
        currentProject,
        currentScreen,
        chatHistory,
        isLoading,
        addChatMessage,
        setLoading,
        updateScreenContent,
    } = useAppStore();

    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, isLoading]);

    const handleSend = async (text: string = input) => {
        const prompt = text.trim();
        if (!prompt || isLoading || !currentProject || !currentScreen) return;

        // Add user message to UI
        const userMsg = {
            id: Math.random().toString(),
            role: 'user' as const,
            content: prompt,
            timestamp: new Date(),
        };
        addChatMessage(userMsg);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userPrompt: prompt,
                    conversationHistory: chatHistory,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update the current screen with new UI
                updateScreenContent(currentProject.id, currentScreen.id, data.components);

                // Add agent message
                addChatMessage({
                    id: Math.random().toString(),
                    role: 'agent',
                    content: `I've generated the UI for you! Generated ${data.components.length} components.`,
                    timestamp: new Date(),
                    components: data.components,
                });
            } else {
                addChatMessage({
                    id: Math.random().toString(),
                    role: 'agent',
                    content: `Error: ${data.error || 'Something went wrong while generating the UI.'}`,
                    timestamp: new Date(),
                });
            }
        } catch (error) {
            addChatMessage({
                id: Math.random().toString(),
                role: 'agent',
                content: 'Failed to connect to the AI agent. Please check your connection.',
                timestamp: new Date(),
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        const json = JSON.stringify(currentScreen?.components || [], null, 2);
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex h-full flex-col bg-card border-l border-border/50">
            <Tabs defaultValue="chat" className="flex flex-1 flex-col overflow-hidden">
                <div className="flex h-14 items-center border-b border-border px-4 bg-muted/20">
                    <TabsList className="grid w-full grid-cols-2 bg-background/50 h-9 p-1 rounded-lg">
                        <TabsTrigger
                            value="chat"
                            className="gap-2 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                        >
                            <Sparkles className="h-3 w-3" />
                            Assistant
                        </TabsTrigger>
                        <TabsTrigger
                            value="code"
                            className="gap-2 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                        >
                            <Code className="h-3 w-3" />
                            Manifest
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Chat Content */}
                <TabsContent value="chat" className="mt-0 flex flex-1 flex-col overflow-hidden bg-background/30">
                    <ScrollArea className="flex-1 px-4 py-6">
                        <div className="space-y-6">
                            {chatHistory.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Bot className="h-6 w-6 text-primary" />
                                    </div>
                                    <p className="text-xs font-medium">Ready to build? Ask me to create a UI component or layout.</p>
                                </div>
                            )}

                            {chatHistory.map((message) => (
                                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex flex-col gap-1.5 max-w-[85%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm transition-all ${message.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                : 'bg-card border border-border/50 text-foreground rounded-tl-none font-medium'
                                                }`}
                                        >
                                            {message.content}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-mono">
                                            {format(message.timestamp, 'HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-card border border-border/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                        <div className="flex gap-1.5 items-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    {/* Quick Prompts */}
                    <div className="border-t border-border/50 bg-muted/20 px-4 py-4">
                        <div className="mb-3 flex items-center gap-2">
                            <Terminal className="h-3 w-3 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Sparks</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {quickPrompts.map((prompt, idx) => (
                                <Button
                                    key={idx}
                                    size="sm"
                                    variant="outline"
                                    className="h-8 gap-1.5 min-w-fit text-[10px] font-bold border-border/50 hover:bg-primary/5 hover:border-primary/50 bg-background/50 transition-all rounded-full"
                                    onClick={() => handleSend(prompt.prompt)}
                                    disabled={isLoading || !currentScreen}
                                >
                                    <prompt.icon className="h-3 w-3 text-primary" />
                                    {prompt.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-border bg-card p-4">
                        <div className="relative group">
                            <Input
                                placeholder={currentScreen ? "Describe the UI you want to build..." : "Select a screen first..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isLoading || !currentScreen}
                                className="pr-12 bg-secondary/50 border-border/50 focus-visible:ring-primary h-12 rounded-xl"
                            />
                            <Button
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim() || !currentScreen}
                                size="icon"
                                className="absolute right-1 top-1 h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-lg transition-all active:scale-95"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mt-2 text-[10px] text-center text-muted-foreground font-medium">
                            Press Enter to send, Shift + Enter for new line
                        </p>
                    </div>
                </TabsContent>

                {/* Code Content */}
                <TabsContent value="code" className="mt-0 flex flex-1 flex-col overflow-hidden bg-background">
                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                        <div className="relative rounded-xl border border-border/50 bg-[#0d0d0d] p-6 font-mono text-xs leading-relaxed group shadow-inner">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-3 top-3 h-8 gap-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10 opacity-0 group-hover:opacity-100"
                                onClick={copyToClipboard}
                            >
                                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                            <pre className="text-[#a6accd]">
                                <code>{currentScreen ? JSON.stringify(currentScreen.components, null, 2) : '// No screen selected'}</code>
                            </pre>
                        </div>
                    </div>
                    <div className="border-t border-border bg-card p-4">
                        <Button
                            onClick={copyToClipboard}
                            disabled={!currentScreen}
                            className="w-full justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold text-xs uppercase tracking-widest"
                        >
                            <Copy className="h-4 w-4" />
                            Copy UI Manifest
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
