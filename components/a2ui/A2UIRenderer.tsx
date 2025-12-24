'use client';

// A2UI Renderer Component
// Processes A2UI JSON and renders React components
// Based on A2UI Builder Implementation Guide

import React, { useMemo } from 'react';
import { A2UIComponent, BoundValue } from '@/lib/types';
import { ComponentRegistry } from './ComponentRegistry';

// ============================================
// Props Interface
// ============================================

export interface A2UIRendererProps {
    /** Array of A2UI components to render */
    components: A2UIComponent[] | null;
    /** ID of the root component (defaults to first component) */
    rootId?: string;
    /** Data model for resolving path bindings */
    dataModel: Record<string, any>;
    /** Callback for handling actions from interactive components */
    onAction?: (action: string, context: Record<string, any>) => void;
}

// ============================================
// A2UI Renderer Component
// ============================================

export const A2UIRenderer: React.FC<A2UIRendererProps> = ({
    components,
    rootId,
    dataModel,
    onAction,
}) => {
    // Create registry instance (memoized)
    const registry = useMemo(() => new ComponentRegistry(), []);

    // Build component map for fast lookup by ID
    const componentMap = useMemo(() => {
        const map = new Map<string, A2UIComponent>();
        if (components) {
            components.forEach((comp) => map.set(comp.id, comp));
        }
        return map;
    }, [components]);

    // ============================================
    // Data Binding Resolution
    // ============================================

    /**
     * Resolves a BoundValue to its actual value
     * - Literal values are returned directly
     * - Path bindings are looked up in the data model
     */
    const resolveDataBinding = (boundValue: BoundValue | string | number | boolean | undefined): any => {
        if (boundValue === undefined || boundValue === null) return undefined;

        // Handle primitive values directly (for convenience)
        if (typeof boundValue === 'string') return boundValue;
        if (typeof boundValue === 'number') return boundValue;
        if (typeof boundValue === 'boolean') return boundValue;

        // Handle literal values
        if (boundValue.literalString !== undefined) return boundValue.literalString;
        if (boundValue.literalNumber !== undefined) return boundValue.literalNumber;
        if (boundValue.literalBoolean !== undefined) return boundValue.literalBoolean;

        // Handle path binding (e.g., "/user/name" or "/users/0/email")
        if (boundValue.path) {
            const parts = boundValue.path.split('/').filter(Boolean);
            let value: any = dataModel;

            for (const part of parts) {
                if (value === undefined || value === null) return undefined;
                // Handle array indices
                const index = parseInt(part, 10);
                if (!isNaN(index) && Array.isArray(value)) {
                    value = value[index];
                } else {
                    value = value[part];
                }
            }

            return value;
        }

        return undefined;
    };

    // ============================================
    // Recursive Component Rendering
    // ============================================

    /**
     * Recursively renders a component by its ID
     * Looks up the component, finds its renderer, and calls it
     */
    const renderComponent = (componentId: string): React.ReactNode => {
        const component = componentMap.get(componentId);

        if (!component) {
            return (
                <div key={componentId} className="p-2 text-red-500 border border-red-300 rounded bg-red-50">
                    Unknown component: {componentId}
                </div>
            );
        }

        // Extract component type and props (first key-value pair)
        const entries = Object.entries(component.component);
        if (entries.length === 0) {
            return (
                <div key={componentId} className="p-2 text-yellow-500 border border-yellow-300 rounded bg-yellow-50">
                    Empty component: {componentId}
                </div>
            );
        }

        const [componentType, props] = entries[0];
        const RenderFn = registry.getRenderer(componentType);

        if (!RenderFn) {
            return (
                <div key={componentId} className="p-2 text-orange-500 border border-orange-300 rounded bg-orange-50">
                    Unsupported type: {componentType}
                </div>
            );
        }

        // Call the renderer with full context
        return (
            <RenderFn
                key={componentId}
                componentId={componentId}
                props={props}
                components={componentMap}
                dataModel={dataModel}
                onAction={onAction}
                renderComponent={renderComponent}
                resolveDataBinding={resolveDataBinding}
            />
        );
    };

    // ============================================
    // Empty State
    // ============================================

    if (!components || components.length === 0) {
        return (
            <div className="flex items-center justify-center h-full p-8 text-muted-foreground">
                <div className="text-center space-y-2">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium">No UI Generated Yet</p>
                    <p className="text-sm">Describe your UI in the chat to get started</p>
                </div>
            </div>
        );
    }

    // ============================================
    // Render Root Component
    // ============================================

    const rootComponentId = rootId || components[0].id;

    return (
        <div className="a2ui-renderer p-4">
            {renderComponent(rootComponentId)}
        </div>
    );
};

export default A2UIRenderer;
