'use client';

// Dashboard Page
// Main entry point for the A2UI Builder workspace

import React, { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function DashboardPage() {
    const { projects, createProject, currentProject } = useAppStore();

    // Create a default project if none exists
    useEffect(() => {
        if (projects.length === 0) {
            createProject('My First Project');
        }
    }, [projects.length, createProject]);

    // The actual UI is rendered by the layout
    // This page component is mostly a placeholder
    return null;
}
