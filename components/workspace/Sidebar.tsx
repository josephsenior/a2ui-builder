'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Project, Screen } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Folder,
    FolderOpen,
    ChevronRight,
    ChevronDown,
    FileCode2,
    Plus,
    Settings
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface ProjectNodeProps {
    type: 'folder' | 'screen';
    id: string;
    projectId?: string;
    name: string;
    isActive: boolean;
    onSelect: () => void;
    children?: React.ReactNode;
}

function ProjectTreeNode({
    type,
    id,
    name,
    isActive,
    onSelect,
    children,
}: ProjectNodeProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <button
                onClick={() => {
                    if (type === 'folder') {
                        setIsOpen(!isOpen);
                    }
                    onSelect();
                }}
                className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary ${isActive ? 'bg-primary/10 text-primary font-medium' : ''
                    }`}
                style={{ paddingLeft: type === 'folder' ? '8px' : '24px' }}
            >
                {type === 'folder' ? (
                    <>
                        {isOpen ? (
                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        {isOpen ? (
                            <FolderOpen className="h-4 w-4 text-primary" />
                        ) : (
                            <Folder className="h-4 w-4 text-primary" />
                        )}
                    </>
                ) : (
                    <FileCode2 className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="flex-1 truncate">{name}</span>
            </button>
            {type === 'folder' && isOpen && children && (
                <div className="mt-0.5">{children}</div>
            )}
        </div>
    );
}

export function Sidebar() {
    const {
        projects,
        currentProject,
        currentScreen,
        createProject,
        selectProject,
        createScreen,
        selectScreen,
    } = useAppStore();

    const [newProjectName, setNewProjectName] = useState('');
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);

    const handleCreateProject = () => {
        if (newProjectName.trim()) {
            createProject(newProjectName.trim());
            setNewProjectName('');
            setProjectDialogOpen(false);
        }
    };

    const handleCreateScreen = (projectId: string) => {
        const name = `Screen ${projects.find(p => p.id === projectId)?.screens.length || 0 + 1}`;
        createScreen(projectId, name);
    };

    return (
        <div className="flex h-full flex-col bg-card">
            {/* Header */}
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">Explorer</h2>
                <ThemeToggle />
            </div>

            {/* Project Tree */}
            <ScrollArea className="flex-1 px-2 py-3">
                <div className="space-y-0.5">
                    {projects.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-xs text-muted-foreground italic">No projects created yet.</p>
                        </div>
                    ) : (
                        projects.map((project: Project) => (
                            <ProjectTreeNode
                                key={project.id}
                                type="folder"
                                id={project.id}
                                name={project.name}
                                isActive={currentProject?.id === project.id}
                                onSelect={() => selectProject(project.id)}
                            >
                                {project.screens.map((screen: Screen) => (
                                    <ProjectTreeNode
                                        key={screen.id}
                                        type="screen"
                                        id={screen.id}
                                        projectId={project.id}
                                        name={screen.name}
                                        isActive={currentScreen?.id === screen.id}
                                        onSelect={() => selectScreen(project.id, screen.id)}
                                    />
                                ))}
                                <button
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        handleCreateScreen(project.id);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-md px-2 py-1 ml-6 text-left text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Plus className="h-3 w-3" />
                                    Add Screen
                                </button>
                            </ProjectTreeNode>
                        ))
                    )}
                </div>
            </ScrollArea>

            {/* New Project Button */}
            <div className="border-t border-border p-4">
                <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                            <Input
                                placeholder="Project Name (e.g. My E-commerce App)"
                                value={newProjectName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProjectName(e.target.value)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleCreateProject()}
                                autoFocus
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setProjectDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateProject}>Create Project</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* User Footer */}
            <div className="flex items-center gap-3 border-t border-border px-4 py-3 bg-muted/30">
                <Avatar className="h-8 w-8 ring-1 ring-border">
                    <AvatarFallback className="bg-primary/20 text-[10px] font-bold text-primary">A2</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <div className="truncate text-xs font-semibold">Designer</div>
                    <div className="truncate text-[10px] text-muted-foreground">Pro Workspace</div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
            </div>
        </div>
    );
}
