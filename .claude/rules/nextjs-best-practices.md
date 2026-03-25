---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
---

# Next.js Best Practices

## App Router
- Use Server Components by default
- Add `'use client'` directive only when needed (interactivity, hooks)
- Keep client components as leaves in the component tree
- Use `next/image` for all images

## Data Fetching
- Use `fetch` with extended caching options
- Use Server Actions for form submissions
- Implement proper error boundaries
- Use `loading.tsx` for route loading states

## Middleware
- Handle auth checks in `src/middleware.ts`
- Use Clerk's `auth()` and `clerkClient()` utilities
- Redirect unauthenticated users appropriately

## Environment Variables
- Client-exposed vars must start with `NEXT_PUBLIC_`
- Never log or expose `.env` values
- Use `.env.example` to document required variables
