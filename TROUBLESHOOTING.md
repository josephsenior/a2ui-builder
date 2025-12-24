# Troubleshooting Guide

## TypeScript Errors in IDE

If you see TypeScript errors like "Cannot find module 'react'" in your IDE:

### Solution 1: Restart TypeScript Server
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "TypeScript: Restart TS Server"
3. Select it and wait for restart

### Solution 2: Reload VS Code Window
1. Open Command Palette
2. Type "Developer: Reload Window"
3. Select it

### Solution 3: Reinstall Dependencies
```bash
cd a2ui-builder
rm -rf node_modules
pnpm install
```

### Solution 4: Verify TypeScript Installation
```bash
cd a2ui-builder
pnpm list typescript
pnpm list @types/react
```

If packages are missing:
```bash
pnpm install
```

## Build Errors

### "Module not found" errors
- Ensure you're in the `a2ui-builder` directory
- Run `pnpm install` to install dependencies
- Check that `node_modules` exists

### "Cannot find module" errors
- Verify `tsconfig.json` paths are correct
- Check that imports use correct paths (e.g., `@/components/...`)
- Restart the dev server: `pnpm dev`

## Runtime Errors

### API Key Not Found
- Create `.env.local` file (copy from `.env.example`)
- Add your `NEXT_PUBLIC_GEMINI_API_KEY`
- Restart the dev server

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Or use a different port:
```bash
pnpm dev -- -p 3001
```

## Common Issues

### Hydration Mismatch
- This is normal for client-only components
- Components using `dynamic` imports with `ssr: false` are expected

### Styling Not Applied
- Clear `.next` cache: `rm -rf .next`
- Restart dev server
- Check `tailwind.config` and `globals.css`

### Component Not Rendering
- Check browser console for errors
- Verify component is in the registry
- Check A2UI JSON structure is valid

## Getting Help

1. Check the [USAGE.md](./USAGE.md) guide
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. Check browser console for runtime errors
4. Verify environment variables are set correctly
5. Open an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

