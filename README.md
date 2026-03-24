# AI Tools Hub

An AI-powered productivity SaaS application featuring chat, writing, and summarization tools.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

### AI Chat
Intelligent conversational AI powered by GPT-4. Have natural discussions, get answers to questions, and brainstorm ideas.

### AI Writing
Generate high-quality content with advanced AI models. Perfect for blog posts, emails, and creative writing.

### AI Summarize
Instantly summarize articles, documents, and web content. Extract key points in seconds.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Auth**: Clerk Authentication
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **Payments**: Stripe (subscription)
- **Analytics**: PostHog
- **Error Tracking**: Sentry
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/gmg0829/ai-saas.git
cd ai-saas

# Install dependencies
npm install
# or
bun install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Configure the following environment variables in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Run development server
npm run dev
# or
bun run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Build

```bash
npm run build
# or
bun run build
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/        # Protected dashboard pages
│   │   ├── chat/
│   │   ├── write/
│   │   └── summarize/
│   ├── api/                 # API routes
│   │   ├── chat/
│   │   ├── write/
│   │   ├── summarize/
│   │   └── webhooks/
│   └── page.tsx             # Homepage
├── components/              # React components
└── lib/                     # Utility libraries
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | AI chat with GPT-4 |
| `/api/write` | POST | AI content generation |
| `/api/summarize` | POST | URL/text summarization |
| `/api/create-checkout-session` | POST | Create Stripe checkout |
| `/api/webhooks/stripe` | POST | Stripe webhooks |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy

### Required Environment Variables for Production

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PRO`

## TODO

- [ ] Implement proper rate limiting with Upstash Redis
- [ ] Add URL content extraction for summarization
- [ ] User dashboard with usage history
- [ ] More AI models support (Claude, Gemini)

## License

MIT
