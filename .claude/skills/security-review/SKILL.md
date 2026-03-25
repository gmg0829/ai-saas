---
name: security-review
description: Comprehensive security audit for AI SaaS. Use when reviewing code for vulnerabilities,
  before deployments, or when user mentions security concerns.
allowed-tools: Read, Grep, Glob
---

Analyze the codebase for security vulnerabilities:

1. **Authentication & Authorization**
   - Verify Clerk auth is properly configured on protected routes
   - Check middleware.ts for proper route protection
   - Ensure API routes validate user sessions

2. **API Security**
   - No exposed API keys or secrets in client-side code
   - Environment variables properly prefixed with NEXT_PUBLIC_
   - Rate limiting on public endpoints
   - Input validation with Zod on all API routes

3. **Injection Risks**
   - SQL injection (Supabase queries use parameterized queries)
   - XSS risks in user-generated content
   - Prompt injection in AI features

4. **Data Protection**
   - .env files are gitignored
   - No sensitive data in client-side code
   - Proper CORS configuration
   - HTTPS enforcement in production

5. **AI-Specific Concerns**
   - User input sanitization before AI prompts
   - Rate limiting on AI-powered endpoints
   - Cost control for AI API calls
   - No PII sent to AI providers without consent

Report findings with severity ratings (Critical/High/Medium/Low) and specific remediation steps.
