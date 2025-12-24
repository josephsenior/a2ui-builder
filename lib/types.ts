// A2UI Type Definitions
// Based on A2UI Builder Implementation Guide

// ============================================
// Core A2UI Component Structure
// ============================================

/**
 * A2UIComponent - The fundamental building block
 * Each component has a unique ID and a single component type with its props
 */
export interface A2UIComponent {
    id: string;
    component: Record<string, any>;
}

/**
 * BoundValue - Data binding for dynamic values
 * Values can be literal (static) or bound to a data path
 */
export interface BoundValue {
    literalString?: string;
    literalNumber?: number;
    literalBoolean?: boolean;
    path?: string; // e.g., "/user/name" or "/users/0/email"
}

/**
 * A2UIAction - Event handlers for interactive components
 */
export interface A2UIAction {
    name: string;
    context?: Record<string, any>;
}

/**
 * Children reference - How parent components reference children
 */
export interface ChildrenRef {
    explicitList?: string[]; // List of child component IDs
    child?: string; // Single child component ID
}

// ============================================
// Chat & Conversation Types
// ============================================

/**
 * ChatMessage - A single message in the conversation
 */
export interface ChatMessage {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
    components?: A2UIComponent[]; // Optional generated UI
}

// ============================================
// Project & Screen Types
// ============================================

/**
 * Screen - A design canvas within a project
 */
export interface Screen {
    id: string;
    name: string;
    components: A2UIComponent[] | null;
    dataModel: Record<string, any>;
    chatHistory: ChatMessage[];
}

/**
 * Project - A workspace containing multiple screens
 */
export interface Project {
    id: string;
    name: string;
    screens: Screen[];
    createdAt: Date;
    updatedAt: Date;
}

// ============================================
// API Response Types
// ============================================

/**
 * AgentResponse - Response from the Gemini agent
 */
export interface AgentResponse {
    success: boolean;
    components?: A2UIComponent[];
    dataModel?: Record<string, any>;
    error?: string;
}

// ============================================
// Renderer Types
// ============================================

/**
 * RendererProps - Props passed to each component renderer
 */
export interface RendererProps {
    componentId: string;
    props: any;
    components: Map<string, A2UIComponent>;
    dataModel: Record<string, any>;
    onAction?: (action: string, context: Record<string, any>) => void;
    renderComponent: (id: string) => React.ReactNode;
    resolveDataBinding: (binding: BoundValue | undefined) => any;
}

/**
 * ComponentRenderer - Function signature for component renderers
 */
export type ComponentRenderer = (props: RendererProps) => React.ReactNode;
