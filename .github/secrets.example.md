# GitHub Secrets Configuration

需要在 GitHub Repository Settings → Secrets and variables → Actions 中添加以下 secrets：

## Required for CI (ci.yml)

| Secret Name | Description |
|-------------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

## Required for Vercel Deploy (deploy.yml)

| Secret Name | Description |
|-------------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

## How to get Vercel secrets:

1. **VERCEL_TOKEN**: https://vercel.com/account/tokens
2. **VERCEL_ORG_ID**: Run `vercel org ls` or check project settings
3. **VERCEL_PROJECT_ID**: Run `vercel project ls` or check project settings
