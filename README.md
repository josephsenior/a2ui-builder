# A2UI Builder

A powerful, AI-driven visual UI builder that converts natural language descriptions into beautiful React components using A2UI (Google's declarative UI protocol). Built with Next.js, TypeScript, and Google's Gemini AI.

## Features

- **Natural Language to UI**: Describe your UI in plain English and watch it come to life
- **A2UI Format**: Google's declarative JSON protocol for UI components with data binding support
- **Component Library**: Full integration with shadcn/ui components
- **Real-time Preview**: See your UI changes instantly in the canvas
- **Project Management**: Organize your work with projects and multiple screens
- **Dark Mode**: Built-in theme support with light/dark mode toggle
- **Export Ready**: Copy your UI manifest as JSON for use in other applications

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **AI**: Google Gemini 3 Flash
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/a2ui-builder.git
cd a2ui-builder
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating Your First UI

1. **Create a Project**: Click "New Project" in the sidebar and give it a name
2. **Add a Screen**: Click "Add Screen" under your project
3. **Describe Your UI**: In the chat panel, describe what you want to build
   - Example: "Create a modern hero section with a title, description, and primary CTA button"
4. **View Results**: Your UI will appear in the center canvas
5. **Export**: Use the "Manifest" tab to copy your A2UI JSON

### Quick Prompts

The assistant includes quick prompts for common UI patterns:
- Hero sections
- Pricing tables
- Contact forms
- And more...

### A2UI Format

A2UI (Google's declarative UI protocol) uses a flat array structure where components reference each other by ID:

```json
[
  {
    "id": "root",
    "component": {
      "Column": {
        "gap": 8,
        "children": {
          "explicitList": ["header", "content"]
        }
      }
    }
  },
  {
    "id": "header",
    "component": {
      "Text": {
        "text": {
          "literalString": "Welcome"
        }
      }
    }
  }
]
```

See [USAGE.md](./USAGE.md) for detailed examples and [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details.

## Project Structure

```
a2ui-builder/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── agent/        # Gemini AI agent endpoint
│   ├── dashboard/        # Dashboard pages
│   └── layout.tsx        # Root layout
├── components/
│   ├── a2ui/            # A2UI renderer and registry
│   ├── ui/              # shadcn/ui components
│   └── workspace/       # Builder workspace components
├── lib/
│   ├── agent.ts         # Gemini AI integration
│   ├── a2ui-catalog.ts  # Component catalog
│   ├── store.ts         # Zustand state management
│   └── types.ts         # TypeScript definitions
└── public/              # Static assets
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm dev:mcp` - Start MCP server (for component discovery)
- `pnpm mcp:check` - Check MCP server health

## Configuration

### Environment Variables

- `NEXT_PUBLIC_GEMINI_API_KEY` (required) - Your Google Gemini API key
- `MCP_SERVER_URL` (optional) - Remote MCP server URL for component discovery
- `MCP_API_KEY` (optional) - API key for remote MCP server

### MCP Server (Optional)

For enhanced component discovery, you can run a local MCP server:

```bash
pnpm dev:mcp
```

Or use SSE mode:
```bash
pnpm dev:mcp:sse
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Architecture

For detailed information about the architecture, data flow, and component system, see [ARCHITECTURE.md](./ARCHITECTURE.md).
<img width="1536" height="1024" alt="ChatGPT Image Dec 24, 2025, 01_35_56 AM" src="https://github.com/user-attachments/assets/c515037a-2bd4-45e0-b323-876b0e816d4c" />

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Google Gemini](https://ai.google.dev/) for the AI capabilities
- [Next.js](https://nextjs.org/) for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for accessible primitives

## Support

If you encounter any issues or have questions:
1. Check the [USAGE.md](./USAGE.md) guide
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. Open an issue on GitHub

---

Built with ❤️ using Next.js and AI
