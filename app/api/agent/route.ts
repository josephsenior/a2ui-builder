// API Endpoint: POST /api/agent
// Receives user prompts and returns A2UI JSON
// Based on A2UI Builder Implementation Guide

import { NextRequest, NextResponse } from 'next/server';
import { generateA2UI } from '@/lib/agent';
import { ChatMessage } from '@/lib/types';

// ============================================
// POST Handler
// ============================================

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const body = await req.json();
        const { userPrompt, conversationHistory } = body;

        // Validate required fields
        if (!userPrompt || typeof userPrompt !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Missing or invalid userPrompt' },
                { status: 400 }
            );
        }

        // Validate conversation history is an array (optional field)
        const history: ChatMessage[] = Array.isArray(conversationHistory)
            ? conversationHistory
            : [];

        // Generate A2UI
        const result = await generateA2UI(userPrompt, history);

        // Return result
        return NextResponse.json(result);
    } catch (error) {
        console.error('Agent API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
            },
            { status: 500 }
        );
    }
}

// ============================================
// OPTIONS Handler (CORS)
// ============================================

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
