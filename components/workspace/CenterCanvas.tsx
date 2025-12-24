'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Monitor, Tablet, Smartphone, Sparkles, Layers, Box } from 'lucide-react';
import { A2UIRenderer } from '@/components/a2ui/A2UIRenderer';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export function CenterCanvas() {
    const { currentProject, currentScreen } = useAppStore();
    const [device, setDevice] = useState<DeviceType>('desktop');

    const deviceSizes = {
        desktop: 'w-full h-full max-w-[1200px]',
        tablet: 'w-[768px] h-[1024px]',
        mobile: 'w-[375px] h-[667px]',
    };

    return (
        <div className="flex h-full flex-col bg-background">
            {/* Top Toolbar */}
            <div className="flex h-14 items-center justify-between border-b border-border bg-card/50 backdrop-blur-md px-6 sticky top-0 z-10">
                <div className="flex items-center gap-1">
                    <Box className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm font-semibold truncate hidden sm:inline-block">
                        {currentProject ? `${currentProject.name} / ${currentScreen?.name || 'No Screen'}` : 'Workspace'}
                    </span>
                </div>

                {/* Device Switcher */}
                <div className="flex items-center gap-0.5 rounded-lg border border-border bg-background/50 p-0.5 shadow-inner">
                    <Button
                        size="sm"
                        variant={device === 'desktop' ? 'default' : 'ghost'}
                        className={`h-7 gap-1.5 px-3 text-[10px] font-bold uppercase tracking-wider ${device === 'desktop' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-secondary text-muted-foreground'
                            }`}
                        onClick={() => setDevice('desktop')}
                    >
                        <Monitor className="h-3 w-3" />
                        Desktop
                    </Button>
                    <Button
                        size="sm"
                        variant={device === 'tablet' ? 'default' : 'ghost'}
                        className={`h-7 gap-1.5 px-3 text-[10px] font-bold uppercase tracking-wider ${device === 'tablet' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-secondary text-muted-foreground'
                            }`}
                        onClick={() => setDevice('tablet')}
                    >
                        <Tablet className="h-3 w-3" />
                        Tablet
                    </Button>
                    <Button
                        size="sm"
                        variant={device === 'mobile' ? 'default' : 'ghost'}
                        className={`h-7 gap-1.5 px-3 text-[10px] font-bold uppercase tracking-wider ${device === 'mobile' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-secondary text-muted-foreground'
                            }`}
                        onClick={() => setDevice('mobile')}
                    >
                        <Smartphone className="h-3 w-3" />
                        Mobile
                    </Button>
                </div>

                <Button
                    size="sm"
                    className="gap-2 bg-primary px-4 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    Export Code
                </Button>
            </div>

            {/* Artboard Area */}
            <div className="relative flex-1 overflow-auto bg-[radial-gradient(ellipse_at_center,var(--border)_0%,transparent_70%)] bg-size-[20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]">
                <div className="flex min-h-full items-center justify-center p-8">
                    <div
                        className={`${deviceSizes[device]} flex flex-col rounded-xl border border-border/50 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out overflow-hidden`}
                    >
                        {currentScreen ? (
                            <div className="flex-1 overflow-auto bg-background/50 custom-scrollbar">
                                <A2UIRenderer
                                    components={currentScreen.components}
                                    dataModel={currentScreen.dataModel || {}}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-12 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/5 ring-1 ring-primary/20 animate-pulse">
                                    <Layers className="h-10 w-10 text-primary-foreground/50" />
                                </div>
                                <div className="space-y-3">
                                    <h1 className="text-2xl font-bold tracking-tight text-foreground">A2UI Preview</h1>
                                    <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
                                        Select a screen from the explorer or ask the AI to generate a new interface for you.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-8 border-t border-border bg-card/30 backdrop-blur-sm flex items-center justify-between px-4 text-[10px] font-medium text-muted-foreground">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Live Preview Synchronized
                    </span>
                    <span className="border-l border-border h-3 pl-3">
                        {currentScreen?.components?.length || 0} Components
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <span>{device.toUpperCase()} View</span>
                    <span className="border-l border-border h-3 pl-3">
                        v1.0.0
                    </span>
                </div>
            </div>
        </div>
    );
}
