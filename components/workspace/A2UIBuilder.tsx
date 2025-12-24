'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CenterCanvas } from './CenterCanvas';
import { ThemeProvider } from './ThemeProvider';

// Dynamically import client-heavy components to assume client-only rendering and fix hydration mismatch
const Sidebar = dynamic(() => import('./Sidebar').then(mod => mod.Sidebar), { ssr: false });
const ContextualAssistant = dynamic(() => import('./ContextualAssistant').then(mod => mod.ContextualAssistant), { ssr: false });

export function A2UIBuilder() {
    const [leftWidth, setLeftWidth] = useState(280);
    const [rightWidth, setRightWidth] = useState(420);

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans antialiased selection:bg-primary/30">
                {/* Left Sidebar - Project Explorer */}
                <div style={{ width: `${leftWidth}px` }} className="shrink-0 border-r border-border/50 shadow-2xl z-20 overflow-hidden">
                    <Sidebar />
                </div>

                {/* Resizer Left */}
                <div
                    className="group relative w-0.5 shrink-0 cursor-col-resize bg-border/20 hover:bg-primary/40 active:bg-primary transition-all z-30"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        const startX = e.clientX;
                        const startWidth = leftWidth;

                        const handleMouseMove = (e: MouseEvent) => {
                            const delta = e.clientX - startX;
                            const newWidth = Math.max(240, Math.min(450, startWidth + delta));
                            setLeftWidth(newWidth);
                        };

                        const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                        };

                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    }}
                >
                    <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 h-full opacity-0 group-hover:bg-primary/5 transition-all" />
                </div>

                {/* Center Main Area - Canvas */}
                <div className="flex-1 overflow-hidden relative z-10">
                    <CenterCanvas />
                </div>

                {/* Resizer Right */}
                <div
                    className="group relative w-0.5 shrink-0 cursor-col-resize bg-border/20 hover:bg-primary/40 active:bg-primary transition-all z-30"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        const startX = e.clientX;
                        const startWidth = rightWidth;

                        const handleMouseMove = (e: MouseEvent) => {
                            const delta = startX - e.clientX;
                            const newWidth = Math.max(350, Math.min(600, startWidth + delta));
                            setRightWidth(newWidth);
                        };

                        const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                        };

                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    }}
                >
                    <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 h-full opacity-0 group-hover:bg-primary/5 transition-all" />
                </div>

                {/* Right Sidebar - Assistant */}
                <div style={{ width: `${rightWidth}px` }} className="shrink-0 border-l border-border/50 shadow-2xl z-20 overflow-hidden">
                    <ContextualAssistant />
                </div>
            </div>
        </ThemeProvider>
    );
}
