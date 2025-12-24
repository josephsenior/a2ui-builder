# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Considerations

### API Keys

**Important**: Never commit API keys or sensitive credentials to the repository.

- All API keys are stored in environment variables
- The `.gitignore` file excludes all `.env*` files
- Use `.env.local` for local development (this file is gitignored)
- Use `.env.example` as a template (this file is safe to commit)

### Environment Variables

The following environment variables are used:

- `NEXT_PUBLIC_GEMINI_API_KEY` - Google Gemini API key (required)
- `MCP_SERVER_URL` - Optional MCP server URL
- `MCP_API_KEY` - Optional MCP server API key

**Note**: While `NEXT_PUBLIC_GEMINI_API_KEY` has the `NEXT_PUBLIC_` prefix, it's actually used server-side only. Consider renaming it to `GEMINI_API_KEY` in future versions for clarity.

### Best Practices

1. **Never commit `.env.local`**: This file contains your actual API keys
2. **Use environment-specific files**: `.env.development.local`, `.env.production.local`
3. **Rotate keys regularly**: If a key is exposed, rotate it immediately
4. **Use secrets management**: For production, use proper secrets management (Vercel, AWS Secrets Manager, etc.)

### Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **Do NOT** open a public issue
2. Email security concerns to: [your-email@example.com]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

### Security Checklist

Before deploying:

- [ ] No API keys in code
- [ ] All `.env*` files in `.gitignore`
- [ ] Environment variables properly configured
- [ ] Dependencies up to date (`pnpm audit`)
- [ ] No sensitive data in logs
- [ ] CORS properly configured
- [ ] Input validation in place

## Dependency Security

Regularly update dependencies:

```bash
pnpm audit
pnpm update
```

## Data Privacy

- A2UI Builder processes UI descriptions locally
- No user data is stored permanently (all in-memory)
- API calls to Gemini are made server-side
- No tracking or analytics by default

## Third-Party Services

- **Google Gemini API**: Used for AI generation. Review their [privacy policy](https://ai.google.dev/terms)
- **shadcn/ui**: Open-source component library
- **Vercel**: If deploying to Vercel, review their [security practices](https://vercel.com/security)

---

Last updated: 2024

