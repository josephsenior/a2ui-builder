# A2UI Builder Architecture

This document describes the architecture, design decisions, and technical implementation of A2UI Builder.

## Overview

A2UI Builder is a visual UI builder that uses AI to convert natural language descriptions into React components. It follows a declarative JSON format (A2UI) that represents UI as a flat array of components with parent-child relationships.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Sidebar  │  │  Canvas      │  │  Contextual         │  │
│  │ Projects │  │  (Preview)    │  │  Assistant          │  │
│  │ Screens  │  │               │  │  (Chat)             │  │
│  └──────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    State Management                          │
│                    (Zustand Store)                          │
│  - Projects & Screens                                       │
│  - Chat History                                             │
│  - Current UI Components                                    │
│  - Data Model                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                              │
│                  /api/agent (POST)                          │
│  - Receives user prompts                                    │
│  - Manages conversation history                            │
│  - Returns A2UI JSON                                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI Agent Layer                           │
│              (lib/agent.ts)                                 │
│  - Google Gemini Integration                                │
│  - Component Discovery (MCP)                                │
│  - A2UI JSON Generation                                     │
│  - Structured Output                                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Rendering Layer                           │
│              (components/a2ui/)                              │
│  ┌──────────────────┐  ┌──────────────────────┐            │
│  │ A2UIRenderer     │  │ ComponentRegistry     │            │
│  │ - Parses JSON    │  │ - Maps A2UI types    │            │
│  │ - Resolves data  │  │ - to React components│            │
│  │ - Renders tree   │  │ - Handles props      │            │
│  └──────────────────┘  └──────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Component Library                         │
│                    (shadcn/ui)                              │
│  - Button, Card, Input, etc.                               │
│  - Radix UI Primitives                                      │
│  - Tailwind CSS Styling                                     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Input Flow

```
User Types Prompt
    │
    ▼
ContextualAssistant Component
    │
    ▼
POST /api/agent
    │
    ▼
generateA2UI() in lib/agent.ts
    │
    ▼
Google Gemini API
    │
    ▼
A2UI JSON Response
    │
    ▼
Update Zustand Store
    │
    ▼
A2UIRenderer Component
    │
    ▼
React Components (shadcn/ui)
    │
    ▼
Canvas Display
```

### 2. Component Rendering Flow

```
A2UI JSON Array
    │
    ▼
Component Map (by ID)
    │
    ▼
Root Component Resolution
    │
    ▼
Recursive Rendering
    │
    ├─► ComponentRegistry.getRenderer()
    │
    ├─► Resolve Data Bindings
    │
    ├─► Map Props to shadcn Components
    │
    └─► Render Children Recursively
```

## Core Concepts

### A2UI Format

A2UI (Abstract UI) is a declarative JSON format that represents UI components as a flat array:

```typescript
interface A2UIComponent {
  id: string;                    // Unique identifier
  component: Record<string, any>; // Single component type with props
}
```

**Key Principles:**
- Flat structure: All components at the same level
- ID-based references: Parent-child relationships via IDs
- Single component type: Each component object has exactly one key
- Data binding: Values can be literal or path-bound

### Component Registry

The `ComponentRegistry` maps A2UI component types to React renderers:

```typescript
class ComponentRegistry {
  register(type: string, renderer: ComponentRenderer): void
  getRenderer(type: string): ComponentRenderer | null
}
```

Each renderer receives:
- Component ID and props
- Component map (for child resolution)
- Data model (for bindings)
- Render function (for recursion)
- Action handler (for events)

### Data Binding

A2UI supports two types of values:

1. **Literal Values**: Static content
   ```json
   { "literalString": "Hello World" }
   { "literalNumber": 42 }
   { "literalBoolean": true }
   ```

2. **Path Bindings**: Dynamic content from data model
   ```json
   { "path": "/user/name" }
   { "path": "/users/0/email" }
   ```

The renderer resolves bindings at runtime using the data model.

## File Structure

### `/app`
Next.js App Router directory:
- `api/agent/route.ts`: API endpoint for AI agent
- `dashboard/`: Dashboard pages and layouts
- `layout.tsx`: Root layout with providers

### `/components/a2ui`
A2UI rendering system:
- `A2UIRenderer.tsx`: Main renderer component
- `ComponentRegistry.tsx`: Component type registry
- Maps A2UI types to React components

### `/components/ui`
shadcn/ui components (generated):
- Standard UI primitives
- Radix UI based
- Tailwind CSS styled

### `/components/workspace`
Builder UI components:
- `A2UIBuilder.tsx`: Main workspace layout
- `Sidebar.tsx`: Project/screen explorer
- `CenterCanvas.tsx`: Preview canvas
- `ContextualAssistant.tsx`: Chat interface

### `/lib`
Core business logic:
- `agent.ts`: Gemini AI integration
- `a2ui-catalog.ts`: Component catalog definitions
- `store.ts`: Zustand state management
- `types.ts`: TypeScript type definitions
- `utils.ts`: Utility functions

## State Management

Uses Zustand for global state:

```typescript
interface AppState {
  // Projects & Screens
  projects: Project[]
  currentProject: Project | null
  currentScreen: Screen | null
  
  // Chat
  chatHistory: ChatMessage[]
  isLoading: boolean
  
  // UI State
  currentA2UI: A2UIComponent[] | null
  dataModel: Record<string, any>
  
  // Actions
  createProject(name: string): void
  selectProject(id: string): void
  updateScreenContent(...): void
  // ... more actions
}
```

State is persisted in memory (can be extended to localStorage/backend).

## AI Integration

### Gemini API

Uses Google's Gemini 3 Flash model with:
- **Function Calling**: For component discovery
- **Structured Output**: For reliable JSON generation
- **System Instructions**: Detailed A2UI format guide
- **Conversation History**: Context-aware generation

### Component Discovery

The agent can discover available components via:
1. **Local File System**: Reads `components/ui/` directory
2. **Remote MCP Server**: Uses MCP protocol for component info

Tools available:
- `list_components()`: Get all available components
- `get_component(name)`: Get component source code
- `get_component_demo(name)`: Get usage examples

## Rendering System

### Recursive Rendering

The renderer uses a recursive approach:

```typescript
function renderComponent(id: string): ReactNode {
  const component = componentMap.get(id)
  const [type, props] = Object.entries(component.component)[0]
  const Renderer = registry.getRenderer(type)
  
  return (
    <Renderer
      componentId={id}
      props={props}
      components={componentMap}
      dataModel={dataModel}
      renderComponent={renderComponent}  // Recursive
      resolveDataBinding={resolveDataBinding}
    />
  )
}
```

### Child Resolution

Components reference children via:
- `child: "child-id"` - Single child
- `children: { explicitList: ["id1", "id2"] }` - Multiple children

The renderer resolves these IDs and recursively renders children.

## Styling

- **Tailwind CSS v4**: Utility-first CSS framework
- **CSS Variables**: For theming (light/dark mode)
- **Responsive Design**: Mobile-first approach
- **Custom Classes**: For component-specific styles

## Performance Considerations

1. **Memoization**: Components memoized where appropriate
2. **Lazy Loading**: Dynamic imports for heavy components
3. **Efficient Updates**: Zustand's selective subscriptions
4. **Component Map**: O(1) lookup by ID
5. **Render Optimization**: Only re-render changed components

## Security

- **API Keys**: Never exposed to client (server-side only)
- **Input Validation**: All user input validated
- **XSS Prevention**: React's built-in escaping
- **CORS**: Properly configured for API endpoints

## Future Enhancements

Potential improvements:
- Backend persistence for projects
- Collaborative editing
- Component versioning
- Export to code (React/HTML)
- Plugin system for custom components
- Visual drag-and-drop editor
- Component library marketplace

## Dependencies

### Core
- `next`: React framework
- `react`, `react-dom`: UI library
- `typescript`: Type safety

### UI
- `@radix-ui/*`: Accessible primitives
- `tailwindcss`: Styling
- `lucide-react`: Icons

### State & Data
- `zustand`: State management
- `@google/generative-ai`: AI integration

### Forms & Validation
- `react-hook-form`: Form handling
- `zod`: Schema validation

## Testing Strategy

(To be implemented)
- Unit tests for renderer logic
- Integration tests for API endpoints
- E2E tests for user workflows
- Component snapshot tests

---

For usage examples, see [USAGE.md](./USAGE.md)

