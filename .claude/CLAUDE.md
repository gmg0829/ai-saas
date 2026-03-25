# Project: AI SaaS

## Commands
bun run dev          # Start dev server (Bun)
bun run build        # Production build
bun run lint         # ESLint check

## Architecture
- Next.js 14 (App Router)
- Bun as package manager
- Clerk for authentication
- Supabase for database
- Stripe for payments
- AI SDK + OpenAI for AI features
- Pinecone for vector database
- Tailwind CSS + TypeScript

## Key Files
- `src/app/` - Next.js App Router pages
- `src/app/(auth)/` - Auth pages (sign-in, sign-up)
- `src/app/(dashboard)/` - Protected dashboard pages (chat, summarize, write)
- `src/app/api/` - API routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions
- `src/middleware.ts` - Auth middleware (Clerk)

## Conventions
- Use `bun` instead of `npm` for all package operations
- Use `clsx` + `tailwind-merge` for conditional classnames
- Use `lucide-react` for icons
- API routes return JSON with { data, error } shape
- Environment variables prefixed: `NEXT_PUBLIC_*` for client-exposed vars

## Watch Out For
- `.env` and `.env.*` files are gitignored - never commit secrets
- Clerk middleware protects `(dashboard)` routes
- Sentry is configured for error tracking
- PostHog for analytics

## Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Auth**: Clerk
- **Payments**: Stripe
- **AI**: AI SDK, OpenAI, Pinecone
- **Monitoring**: Sentry, PostHog
