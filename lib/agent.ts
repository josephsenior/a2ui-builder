// Gemini Agent Integration with Structured Output
// Generates A2UI JSON from natural language descriptions
// Uses Gemini's structured output feature for reliable JSON generation

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { A2UIComponent, ChatMessage, AgentResponse } from './types';
// Catalog import removed to enable Dynamic Discovery

// ============================================
// Gemini Client
// ============================================

const getGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set');
  }
  return new GoogleGenerativeAI(apiKey);
};

// ============================================
// System Prompt (Detailed for better JSON generation)
// ============================================

const SYSTEM_PROMPT = `You are an expert UI designer specializing in A2UI JSON generation. Your task is to convert natural language UI descriptions into A2UI JSON specifications.

## A2UI Format

A2UI is a declarative JSON format where UI is represented as a flat array of components with parent-child relationships via IDs.

### Component Structure

Each component has:
- \`id\`: Unique string identifier (use semantic names like "header", "form-card", "submit-btn")
- \`component\`: Object with exactly ONE key (the component type) and its props

### Available Component Types

[Dynamic Catalog - Agent must discover components using \`list_components\`]

### Data Binding (BoundValue)

All text values should use BoundValue format:
- Literal string: { "literalString": "Hello World" }
- Literal number: { "literalNumber": 42 }
- Literal boolean: { "literalBoolean": true }
- Data path: { "path": "/user/name" }

### Children References

- For multiple children: "children": { "explicitList": ["child1-id", "child2-id"] }
- For single child: "child": "child-id"

### Actions

Interactive components (especially Button) can have actions:
{
  "action": {
    "name": "submitForm",
    "context": { "formId": "contact" }
  }
}

## Tools

You have access to:
1. \`list_components()\`: Lists all available components in the system. ALWAYS call this first to see what you can work with.
2. \`get_component(componentName)\`: Get the specific props and usage for a component.

## Workflow
1. Call \`list_components()\` to discover available UI primitives.
2. If you need details on a specific component, call \`get_component(name)\`.
3. Use this knowledge to generate the A2UI JSON.

## Rules

1. Always start with a root container (Column or Row)
2. Use the flat adjacency list model (all components at top level, linked by IDs)
3. Each component object has exactly ONE key (the component type)
4. Use semantic IDs that describe the component's purpose
5. All text content MUST use BoundValue format (literalString, literalNumber, etc.)
6. Create visually appealing, well-structured UIs
7. **Visual Polish & Layout Best Practices**:
   - **Grouping**: Use \`Card\` to group related content (e.g., a login form, a profile summary).
   - **Spacing**: Use \`gap\` in \`Column\` and \`Row\` (scale 4, 8, etc.) to create breathing room.
   - **Sizing**: Use \`width\` and \`height\` props on layouts, OR use \`className\` for full Tailwind power (e.g., "flex-1", "min-h-screen").
   - **Structure**: Nest layouts deeply! A Page is a \`Column\`, containing \`Row\`s of \`Card\`s, which contain \`Column\`s of \`Text\`.
   - **Forms**: Always use \`InputGroup\` for search bars or inputs with buttons.
   - **Styling**: All Layout components (Column, Row, Card) accept a \`className\` prop. Use it to add shadows, borders, specific padding, or responsiveness (e.g., \`className: "shadow-lg border-2 border-primary/20"\`).

## Example: Pricing Table (High-Fidelity)
For "Create a 3-tier pricing table":
[
  {
    "id": "root",
    "component": { "Column": { "gap": 8, "width": "full", "children": { "explicitList": ["header", "pricing-row"] } } }
  },
  {
    "id": "header",
    "component": { "Text": { "text": { "literalString": "Simple Pricing" }, "usageHint": "h2", "className": "text-center text-3xl font-bold" } }
  },
  {
    "id": "pricing-row",
    "component": { "Row": { "gap": 6, "justify": "center", "width": "full", "children": { "explicitList": ["plan-basic", "plan-pro", "plan-enterprise"] } } }
  },
  {
    "id": "plan-basic",
    "component": { "Card": { "width": "1/3", "title": { "literalString": "Basic" }, "description": { "literalString": "$10/mo" }, "child": "basic-list", "footer": "btn-basic" } }
  },
  {
    "id": "basic-list",
    "component": { "Column": { "gap": 2, "children": { "explicitList": ["feat-b1", "feat-b2"] } } }
  },
  {
    "id": "feat-b1", "component": { "Text": { "text": { "literalString": "• 5 Projects" } } }
  },
  {
    "id": "feat-b2", "component": { "Text": { "text": { "literalString": "• Community Support" } } }
  },
  {
    "id": "btn-basic", "component": { "Button": { "label": { "literalString": "Get Started" }, "variant": "outline", "width": "full" } }
  },
  {
    "id": "plan-pro",
    "component": { "Card": { "width": "1/3", "title": { "literalString": "Pro" }, "description": { "literalString": "$29/mo" }, "child": "pro-list", "footer": "btn-pro" } }
  },
  {
    "id": "pro-list",
    "component": { "Column": { "gap": 2, "children": { "explicitList": ["feat-p1", "feat-p2"] } } }
  },
  {
    "id": "feat-p1", "component": { "Text": { "text": { "literalString": "• Unlimited Projects" } } }
  },
  {
    "id": "feat-p2", "component": { "Text": { "text": { "literalString": "• Priority Support" } } }
  },
  {
    "id": "btn-pro", "component": { "Button": { "label": { "literalString": "Get Started" }, "variant": "default", "width": "full" } }
  },
  {
    "id": "plan-enterprise",
    "component": { "Card": { "width": "1/3", "title": { "literalString": "Enterprise" }, "description": { "literalString": "Custom" }, "child": "ent-list", "footer": "btn-ent" } }
  },
  {
    "id": "ent-list",
    "component": { "Column": { "gap": 2, "children": { "explicitList": ["feat-e1", "feat-e2"] } } }
  },
  {
    "id": "feat-e1", "component": { "Text": { "text": { "literalString": "• SSO & Security" } } }
  },
  {
    "id": "feat-e2", "component": { "Text": { "text": { "literalString": "• Dedicated Success Manager" } } }
  },
  {
    "id": "btn-ent", "component": { "Button": { "label": { "literalString": "Contact Sales" }, "variant": "outline", "width": "full" } }
  }
]

Generate A2UI for the user's request. Return ONLY a valid JSON array of components. Attempt to use premium features like InputGroup, Resizable, or Sidebar where appropriate to WOW the user.`;

// ============================================
// Model Configuration (Singleton for Efficiency)
// ============================================

let generativeModel: any = null;

const getModel = () => {
  if (generativeModel) return generativeModel;

  const client = getGeminiClient();

  generativeModel = client.getGenerativeModel({
    model: 'gemini-3-flash-preview',
    tools: tools,
    systemInstruction: SYSTEM_PROMPT,
    // generationConfig: {
    //   responseMimeType: 'application/json',
    // },
  });

  return generativeModel;
};

// ============================================
// Remote MCP Server Helper (optional)
// Set MCP_SERVER_URL to enable remote tool calls. If unset, local FS-based tools are used.
// Optional: MCP_API_KEY for Authorization: Bearer <key>
// ============================================

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || '';
const MCP_API_KEY = process.env.MCP_API_KEY || '';

async function callRemoteMCP(toolName: string, args: any) {
  if (!MCP_SERVER_URL) throw new Error('MCP_SERVER_URL not configured');

  const url = `${MCP_SERVER_URL.replace(/\/$/, '')}/tool`;
  const body = { tool: toolName, args };

  try {
  const fetchImpl: any = (globalThis as any).fetch;
  if (!fetchImpl) throw new Error('global fetch not available in this runtime');
  const res = await fetchImpl(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(MCP_API_KEY ? { Authorization: `Bearer ${MCP_API_KEY}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Remote MCP ${res.status} ${res.statusText}: ${txt}`);
    }

    const json = await res.json();
    // Expecting { success: true, result: {...} } or raw result
    if (json && typeof json === 'object' && 'success' in json) {
      return json.result;
    }

    return json;
  } catch (e: any) {
    throw new Error(`Remote MCP call failed: ${e.message}`);
  }
}

// ============================================
// Tools Definition
// ============================================

const tools = [
  {
    functionDeclarations: [
      {
        name: 'list_components',
        description: 'List all available UI components in the project registry.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {} as any,
        },
      },
      {
        name: 'get_component',
        description: 'Get the source code and interface definitions for a shadcn/ui component.',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            componentName: {
              type: SchemaType.STRING,
              description: 'The name of the component (e.g., "button", "card")',
            },
          },
          required: ['componentName'],
        },
      },
      {
        name: 'get_component_demo',
        description: 'Get example usage or demo snippets for a component, if available (searches demo, example, and story files).',
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            componentName: {
              type: SchemaType.STRING,
              description: 'The name of the component to find demos for.',
            },
          },
          required: ['componentName'],
        },
      },
    ],
  },
] as any;

// ============================================
// Generate A2UI Function (Optimized)
// ============================================

export async function generateA2UI(
  userPrompt: string,
  conversationHistory: ChatMessage[] = []
): Promise<AgentResponse> {
  try {
    const model = getModel();

    // Start Chat (Implicit Caching: Reusing session with same prefix)
    const chat = model.startChat({
      history: conversationHistory
        .filter((msg) => !msg.components)
        .slice(-10)
        .map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
    });

    let result = await chat.sendMessage(userPrompt);
    let response = result.response;
    let functionCalls = response.functionCalls();
    console.log('Initial functionCalls:', functionCalls?.map((c: any) => c.name));

    const MAX_TURNS = 5;
    let turn = 0;

    while (functionCalls && functionCalls.length > 0 && turn < MAX_TURNS) {
      turn++;

      const functionResponses = await Promise.all(
        functionCalls.map(async (call: any) => {
          const name = call.name;
          const args = call.args as any;

          try {
            if (name === 'list_components') {
              // Prefer remote MCP if configured
                if (MCP_SERVER_URL) {
                  try {
                    const remote = await callRemoteMCP('list_components', {});
                    return { functionResponse: { name, response: remote } };
                  } catch (e: any) {
                    console.warn('Remote list_components failed and no local fallback is allowed when MCP_SERVER_URL is set:', e?.message || e);
                    return { functionResponse: { name, response: { error: `Remote MCP unavailable: ${e?.message || e}` } } };
                  }
                }

                const fs = await import('fs/promises');
                const path = await import('path');
                const files = await fs.readdir(path.join(process.cwd(), 'components', 'ui'));
                return {
                  functionResponse: {
                    name,
                    response: { components: files.filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', '')) },
                  },
                };
            }

            if (name === 'get_component') {
                if (MCP_SERVER_URL) {
                  try {
                    const remote = await callRemoteMCP('get_component', args);
                    return { functionResponse: { name, response: remote } };
                  } catch (e: any) {
                    console.warn('Remote get_component failed and no local fallback is allowed when MCP_SERVER_URL is set:', e?.message || e);
                    return { functionResponse: { name, response: { error: `Remote MCP unavailable: ${e?.message || e}` } } };
                  }
                }

                const fs = await import('fs/promises');
                const path = await import('path');
                const safeName = args.componentName.toLowerCase().replace(/[^a-z0-9-]/g, '');
                const content = await fs.readFile(path.join(process.cwd(), 'components', 'ui', `${safeName}.tsx`), 'utf-8');
                return {
                  functionResponse: {
                    name,
                    response: { content: content.slice(0, 5000) },
                  },
                };
            }

            if (name === 'get_component_demo') {
                if (MCP_SERVER_URL) {
                  try {
                    const remote = await callRemoteMCP('get_component_demo', args);
                    return { functionResponse: { name, response: remote } };
                  } catch (e: any) {
                    console.warn('Remote get_component_demo failed and no local fallback is allowed when MCP_SERVER_URL is set:', e?.message || e);
                    return { functionResponse: { name, response: { error: `Remote MCP unavailable: ${e?.message || e}` } } };
                  }
                }

                const fs = await import('fs/promises');
                const path = await import('path');
                const safeName = args.componentName.toLowerCase().replace(/[^a-z0-9-]/g, '');

                // Try several demo filename patterns
                const candidates = [
                  `${safeName}.demo.tsx`,
                  `${safeName}.examples.tsx`,
                  `${safeName}.stories.tsx`,
                  `${safeName}.story.tsx`,
                ];

                const demos: string[] = [];

                try {
                  const dir = path.join(process.cwd(), 'components', 'ui');
                  for (const fn of candidates) {
                    try {
                      const p = path.join(dir, fn);
                      const c = await fs.readFile(p, 'utf-8');
                      demos.push(`// file: ${fn}\n` + c.slice(0, 3000));
                    } catch (e) {
                      // ignore missing files
                    }
                  }

                  // Also search a 'demo' or 'examples' subdirectory
                  const subdirs = ['demo', 'examples', 'stories'];
                  for (const d of subdirs) {
                    try {
                      const pdir = path.join(process.cwd(), 'components', 'ui', d);
                      const names = await fs.readdir(pdir);
                      for (const name of names) {
                        if (name.toLowerCase().includes(safeName)) {
                          try {
                            const c = await fs.readFile(path.join(pdir, name), 'utf-8');
                            demos.push(`// file: ${d}/${name}\n` + c.slice(0, 3000));
                          } catch (_) {}
                        }
                      }
                    } catch (_) {}
                  }

                  if (demos.length === 0) {
                    return {
                      functionResponse: {
                        name,
                        response: { demos: [], message: 'No demo files found for this component' },
                      },
                    };
                  }

                  return {
                    functionResponse: {
                      name,
                      response: { demos },
                    },
                  };
                } catch (e: any) {
                  return { functionResponse: { name, response: { error: e.message } } };
                }
            }

            return { functionResponse: { name, response: { error: 'Unknown tool' } } };
          } catch (e: any) {
            return { functionResponse: { name, response: { error: e.message } } };
          }
        })
      );

      console.log('Prepared functionResponses:', functionResponses.map((fr: any) => ({ name: fr.functionResponse?.name, responseKeys: Object.keys(fr.functionResponse?.response || {}) })) );

      result = await chat.sendMessage(functionResponses);
      response = result.response;
      functionCalls = response.functionCalls();
    }

    const outputText = (response.text && typeof response.text === 'function') ? response.text() : (response.output?.[0]?.content?.[0]?.text || '');
    console.log('Gemini 3 Token Usage:', response.usageMetadata?.totalTokenCount);
    console.log('Gemini 3 Raw Output:', outputText); // Diagnostic Log

    try {
      // Clean markdown code blocks if present (though responseMimeType: 'application/json' usually prevents this)
      const raw = outputText || '';
      const cleanText = raw.replace(/```json\n?|```/g, '').trim();

      if (!cleanText) {
        const lastCalls = (functionCalls && functionCalls.map((c: any) => c.name)) || [];
        throw new Error(`Received empty response from AI model. lastFunctionCalls=${JSON.stringify(lastCalls)}`);
      }

      const components = JSON.parse(cleanText);

      if (!Array.isArray(components) || components.length === 0) {
        throw new Error('A2UI output must be a non-empty array');
      }

      // Semantic Validation
      for (const comp of components) {
        if (!comp.id || !comp.component || Object.keys(comp.component).length === 0) {
          throw new Error(`Invalid component structure for ${comp.id || 'unknown'}`);
        }
      }

      return { success: true, components, dataModel: {} };
    } catch (parseError: any) {
      console.error('Gemini Logic Error:', outputText);
      return { success: false, error: `Protocol Error: ${parseError.message}` };
    }

  } catch (error) {
    console.error('Agent Failure:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal Agent Error',
    };
  }
}


// ============================================
// Helper: Validate A2UI Structure
// ============================================

export function validateA2UI(a2ui: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(a2ui)) {
    return { valid: false, errors: ['A2UI must be an array'] };
  }

  const ids = new Set<string>();

  for (let i = 0; i < a2ui.length; i++) {
    const component = a2ui[i];

    if (!component.id) {
      errors.push(`Component at index ${i} missing id`);
      continue;
    }

    if (ids.has(component.id)) {
      errors.push(`Duplicate id: ${component.id}`);
    }
    ids.add(component.id);

    if (!component.component) {
      errors.push(`Component ${component.id} missing component object`);
    }
  }

  return { valid: errors.length === 0, errors };
}
