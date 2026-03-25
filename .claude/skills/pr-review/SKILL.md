---
name: pr-review
description: Review pull requests for code quality, security, and best practices.
  Use when user asks to review a PR or when a new PR is detected.
allowed-tools: Read, Grep, Glob, Bash
---

Review the pull request with focus on:

1. **Code Quality**
   - TypeScript types are correct and explicit
   - No `any` types without good reason
   - Functions are reasonably sized
   - No code duplication without abstraction

2. **Next.js Best Practices**
   - Server vs Client components properly used
   - Client components are leaves in component tree
   - Proper use of `next/image`
   - Environment variables properly configured

3. **Security**
   - No secrets or keys in code
   - User input properly validated
   - Auth checks on protected routes
   - API routes validate permissions

4. **Performance**
   - No unnecessary re-renders
   - Proper loading states
   - Optimistic updates where appropriate
   - Images optimized

5. **Testing**
   - Critical paths have test coverage
   - No obvious edge cases missed

Provide actionable feedback with specific file locations.
