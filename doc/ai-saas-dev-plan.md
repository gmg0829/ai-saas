# AI SaaS 开发计划

## 产品定位
- **产品名**: AI Tools Hub
- **定位**: 面向 B2C 的 AI 工具集合
- **MVP 功能**: AI 聊天、AI 写作、AI 总结
- **技术栈**: Next.js 14 + Bun + Clerk + Supabase + Pinecone + Stripe

## 项目状态

### ✅ 已完成

**Phase 1: 项目初始化**
- [x] 项目结构 (Next.js App Router)
- [x] Bun 集成 (bunfig.toml, .bun-version)
- [x] 环境变量模板 (.env.example)
- [x] Clerk 认证 (middleware.ts, PostHogProvider)
- [x] Supabase 客户端 (lib/supabase.ts)
- [x] 所有 Lib 客户端 (openai, pinecone, redis, stripe, resend)

**Phase 2: AI 聊天**
- [x] Chat 页面 (`/chat`)
- [x] ChatInterface 组件
- [x] ChatMessage 组件
- [x] ChatInput 组件
- [x] 调用 OpenAI API (api/chat)

**Phase 3: AI 写作**
- [x] Write 页面 (`/write`)
- [x] AIWriting 组件
- [x] WritingTemplate 组件
- [x] AI 生成文案 (api/write)
- [x] 复制功能

**Phase 4: AI 总结**
- [x] Summarize 页面 (`/summarize`)
- [x] AISummary 组件
- [x] AI 总结 (api/summarize)

**Phase 5: 订阅系统**
- [x] Stripe 配置 (lib/stripe.ts)
- [x] 定价页面 (`/pricing`)
- [x] Pricing 组件
- [x] Checkout 流程 (api/create-checkout-session)
- [x] Webhook 处理 (api/webhooks/stripe)

**Phase 6: 部署上线 (部分)**
- [x] Sentry 配置 (sentry.client.config.ts, sentry.server.config.ts, sentry.edge.config.ts)
- [x] Next.js Instrumentation (instrumentation.ts)
- [x] 数据库迁移脚本 (supabase/migrations/)

### ⏳ 待完成

- 创建 Supabase 数据库表 (运行 SQL 脚本)
- 配置 .env.local 填入真实 API Keys
- Vercel 部署
- Cloudflare 域名配置

## 项目路径
`/home/gaominggang/opc/ai-saas`

## 关键文件
| 文件 | 说明 |
|------|------|
| `ai-saas/ARCHITECTURE.md` | 完整架构文档 |
| `ai-saas/.env.example` | 环境变量模板 |
| `ai-saas/supabase/migrations/001_initial_schema.sql` | 数据库表结构 |
| `ai-saas/supabase/migrations/002_utils.sql` | 数据库函数 |
| `memory/ai-saas-dev-plan.md` | 本文件 |

## 启动步骤

```bash
# 1. 进入项目目录
cd /home/gaominggang/opc/ai-saas

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入真实 API Keys

# 3. 安装依赖
bun install

# 4. 在 Supabase 运行数据库脚本
# 复制 supabase/migrations/001_initial_schema.sql 到 Supabase SQL Editor 运行
# 复制 supabase/migrations/002_utils.sql 运行

# 5. 本地开发
bun run dev

# 6. Vercel 部署
# 连接 GitHub 仓库，配置环境变量，部署
```

## 第三方服务申请
- Clerk: https://clerk.com
- Supabase: https://supabase.com
- Pinecone: https://pinecone.io
- OpenAI: https://platform.openai.com
- Stripe: https://stripe.com
- Resend: https://resend.com
- Upstash: https://upstash.com
- PostHog: https://posthog.com
- Sentry: https://sentry.io
- Vercel: https://vercel.com
- Cloudflare: https://cloudflare.com
