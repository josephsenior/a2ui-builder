// Zustand State Management for A2UI Builder
// Based on A2UI Builder Implementation Guide

import { create } from 'zustand';
import { A2UIComponent, ChatMessage, Project, Screen } from './types';

// ============================================
// App State Interface
// ============================================

interface AppState {
    // Projects
    projects: Project[];
    currentProject: Project | null;
    currentScreen: Screen | null;

    // Chat
    chatHistory: ChatMessage[];
    isLoading: boolean;

    // Current component list and Data
    currentA2UI: A2UIComponent[] | null;
    dataModel: Record<string, any>;

    // Actions
    createProject: (name: string) => void;
    deleteProject: (projectId: string) => void;
    selectProject: (projectId: string) => void;

    createScreen: (projectId: string, name: string) => void;
    deleteScreen: (projectId: string, screenId: string) => void;
    selectScreen: (projectId: string, screenId: string) => void;
    updateScreenContent: (projectId: string, screenId: string, components: A2UIComponent[]) => void;

    addChatMessage: (message: ChatMessage) => void;
    clearChatHistory: () => void;

    setLoading: (loading: boolean) => void;
    setComponents: (components: A2UIComponent[] | null) => void;
    updateDataModel: (data: Record<string, any>) => void;
}

// ============================================
// Helper: Generate unique IDs
// ============================================

function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}

// ============================================
// Zustand Store
// ============================================

export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    projects: [],
    currentProject: null,
    currentScreen: null,
    chatHistory: [],
    isLoading: false,
    currentA2UI: null,
    dataModel: {},

    // ============================================
    // Project Actions
    // ============================================

    createProject: (name: string) => {
        const newProject: Project = {
            id: generateId(),
            name,
            screens: [
                {
                    id: generateId(),
                    name: 'Screen 1',
                    components: null,
                    dataModel: {},
                    chatHistory: [],
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        set((state) => ({
            projects: [...state.projects, newProject],
            currentProject: newProject,
            currentScreen: newProject.screens[0],
            chatHistory: [],
            currentA2UI: null,
            dataModel: {},
        }));
    },

    deleteProject: (projectId: string) => {
        set((state) => {
            const projects = state.projects.filter((p) => p.id !== projectId);
            const isCurrentProjectDeleted = state.currentProject?.id === projectId;

            return {
                projects,
                currentProject: isCurrentProjectDeleted ? null : state.currentProject,
                currentScreen: isCurrentProjectDeleted ? null : state.currentScreen,
                chatHistory: isCurrentProjectDeleted ? [] : state.chatHistory,
                currentA2UI: isCurrentProjectDeleted ? null : state.currentA2UI,
            };
        });
    },

    selectProject: (projectId: string) => {
        const project = get().projects.find((p) => p.id === projectId);
        if (project) {
            const screen = project.screens[0] || null;
            set({
                currentProject: project,
                currentScreen: screen,
                chatHistory: screen?.chatHistory || [],
                currentA2UI: screen?.components || null,
                dataModel: screen?.dataModel || {},
            });
        }
    },

    // ============================================
    // Screen Actions
    // ============================================

    createScreen: (projectId: string, name: string) => {
        const newScreen: Screen = {
            id: generateId(),
            name,
            components: null,
            dataModel: {},
            chatHistory: [],
        };

        set((state) => {
            const projects = state.projects.map((p) => {
                if (p.id === projectId) {
                    return {
                        ...p,
                        screens: [...p.screens, newScreen],
                        updatedAt: new Date(),
                    };
                }
                return p;
            });

            const currentProject = projects.find((p) => p.id === projectId) || state.currentProject;

            return {
                projects,
                currentProject,
                currentScreen: newScreen,
                chatHistory: [],
                currentA2UI: null,
                dataModel: {},
            };
        });
    },

    deleteScreen: (projectId: string, screenId: string) => {
        set((state) => {
            const projects = state.projects.map((p) => {
                if (p.id === projectId) {
                    return {
                        ...p,
                        screens: p.screens.filter((s) => s.id !== screenId),
                        updatedAt: new Date(),
                    };
                }
                return p;
            });

            const currentProject = projects.find((p) => p.id === projectId);
            const isCurrentScreenDeleted = state.currentScreen?.id === screenId;

            return {
                projects,
                currentProject: currentProject || state.currentProject,
                currentScreen: isCurrentScreenDeleted
                    ? (currentProject?.screens[0] || null)
                    : state.currentScreen,
                chatHistory: isCurrentScreenDeleted ? [] : state.chatHistory,
                currentA2UI: isCurrentScreenDeleted ? null : state.currentA2UI,
            };
        });
    },

    selectScreen: (projectId: string, screenId: string) => {
        const project = get().projects.find((p) => p.id === projectId);
        const screen = project?.screens.find((s) => s.id === screenId);

        if (project && screen) {
            set({
                currentProject: project,
                currentScreen: screen,
                chatHistory: screen.chatHistory,
                currentA2UI: screen.components,
                dataModel: screen.dataModel,
            });
        }
    },

    updateScreenContent: (projectId: string, screenId: string, components: A2UIComponent[]) => {
        set((state) => {
            const updatedProjects = state.projects.map((p) => {
                if (p.id === projectId) {
                    return {
                        ...p,
                        screens: p.screens.map((s) => {
                            if (s.id === screenId) {
                                return { ...s, components };
                            }
                            return s;
                        }),
                        updatedAt: new Date(),
                    };
                }
                return p;
            });

            const currentProject = updatedProjects.find((p) => p.id === projectId);
            const currentScreen = currentProject?.screens.find((s) => s.id === screenId);

            return {
                projects: updatedProjects,
                currentProject: currentProject || state.currentProject,
                currentScreen: currentScreen || state.currentScreen,
                currentA2UI: currentScreen?.id === state.currentScreen?.id ? components : state.currentA2UI,
            };
        });
    },

    // ============================================
    // Chat Actions
    // ============================================

    addChatMessage: (message: ChatMessage) => {
        set((state) => {
            const newChatHistory = [...state.chatHistory, message];

            // Update current screen's chat history and A2UI if present
            const updatedProjects = state.projects.map((p) => {
                if (p.id === state.currentProject?.id) {
                    return {
                        ...p,
                        screens: p.screens.map((s) => {
                            if (s.id === state.currentScreen?.id) {
                                return {
                                    ...s,
                                    chatHistory: newChatHistory,
                                    components: message.components || s.components,
                                };
                            }
                            return s;
                        }),
                        updatedAt: new Date(),
                    };
                }
                return p;
            });

            return {
                chatHistory: newChatHistory,
                projects: updatedProjects,
                currentA2UI: message.components || state.currentA2UI,
            };
        });
    },

    clearChatHistory: () => {
        set((state) => ({
            chatHistory: [],
            projects: state.projects.map((p) => {
                if (p.id === state.currentProject?.id) {
                    return {
                        ...p,
                        screens: p.screens.map((s) => {
                            if (s.id === state.currentScreen?.id) {
                                return { ...s, chatHistory: [] };
                            }
                            return s;
                        }),
                    };
                }
                return p;
            }),
        }));
    },

    // ============================================
    // Loading & Data Actions
    // ============================================

    setLoading: (loading: boolean) => set({ isLoading: loading }),

    setComponents: (components: A2UIComponent[] | null) => {
        set((state) => {
            // Also update the current screen
            const updatedProjects = state.projects.map((p) => {
                if (p.id === state.currentProject?.id) {
                    return {
                        ...p,
                        screens: p.screens.map((s) => {
                            if (s.id === state.currentScreen?.id) {
                                return { ...s, components };
                            }
                            return s;
                        }),
                    };
                }
                return p;
            });

            return {
                currentA2UI: components,
                projects: updatedProjects,
            };
        });
    },

    updateDataModel: (data: Record<string, any>) => {
        set((state) => {
            const updatedProjects = state.projects.map((p) => {
                if (p.id === state.currentProject?.id) {
                    return {
                        ...p,
                        screens: p.screens.map((s) => {
                            if (s.id === state.currentScreen?.id) {
                                return { ...s, dataModel: data };
                            }
                            return s;
                        }),
                    };
                }
                return p;
            });

            return {
                dataModel: data,
                projects: updatedProjects,
            };
        });
    },
}));
