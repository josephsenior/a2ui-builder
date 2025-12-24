# Contributing to A2UI Builder

Thank you for your interest in contributing to A2UI Builder! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and considerate
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/a2ui-builder.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit with clear messages
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env.local` and add your API key
3. Run the dev server: `pnpm dev`
4. Make your changes
5. Run linting: `pnpm lint`

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use interfaces for object shapes
- Use types for unions and intersections

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop validation
- Optimize with `React.memo` when appropriate
- Use fragments to avoid unnecessary DOM elements

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small
- Use consistent formatting (Prettier is configured)

### File Organization

- Group related files together
- Use descriptive file names
- Follow the existing directory structure
- Keep components in appropriate directories

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add dark mode toggle to settings
fix: Resolve canvas rendering issue on mobile
docs: Update README with new setup instructions
refactor: Simplify component registry logic
test: Add unit tests for A2UI renderer
```

Prefix types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Update Documentation**: Update README.md, USAGE.md, or ARCHITECTURE.md if needed
2. **Add Tests**: Add tests for new features or bug fixes
3. **Update CHANGELOG**: Document your changes (if applicable)
4. **Ensure Tests Pass**: Make sure all tests pass locally
5. **Request Review**: Request review from maintainers

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tests added/updated (if applicable)
- [ ] All tests pass

## Adding New Components

To add support for a new A2UI component:

1. **Add to Catalog**: Update `lib/a2ui-catalog.ts` with component definition
2. **Create Renderer**: Add renderer function in `components/a2ui/ComponentRegistry.tsx`
3. **Map to shadcn**: Ensure the component maps to a shadcn/ui component
4. **Add Tests**: Write tests for the new component
5. **Update Docs**: Document the component in USAGE.md

## Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: OS, Node version, browser version
7. **Logs**: Relevant console logs or error messages

## Suggesting Features

When suggesting features:

1. **Use Cases**: Describe the use case and why it's valuable
2. **Proposed Solution**: Describe your proposed solution
3. **Alternatives**: Discuss alternative approaches considered
4. **Impact**: Explain the impact on existing functionality

## Testing

- Write tests for new features
- Ensure existing tests still pass
- Test in multiple browsers
- Test responsive behavior
- Test accessibility

## Questions?

If you have questions about contributing:

1. Check existing issues and PRs
2. Review the documentation
3. Open a discussion on GitHub
4. Reach out to maintainers

Thank you for contributing to A2UI Builder!

