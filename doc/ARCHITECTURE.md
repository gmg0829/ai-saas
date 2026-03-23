# AI SaaS 产品架构文档

## 1. 产品定位

**产品名称**: AI Tools Hub
**核心定位**: 面向 B2C 用户的 AI 工具集合，用完即走，降低使用门槛
**目标用户**: 普通消费者，需要快速完成 AI 任务的轻度用户

### MVP 功能范围
1. **AI 聊天** - 基础对话，无需登录也能用
2. **AI 写作** - 邮件、朋友圈、小红书文案模板
3. **AI 总结** - 粘贴文章/链接，AI 总结要点

### 后续扩展方向
- 会员订阅体系
- 积分消耗机制
- 更多 AI 工具模板

---

## 2. 技术架构

### 技术选型

| 类别 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Next.js 14 (App Router) | SSR + API Routes |
| 样式 | Tailwind CSS | 快速 UI 开发 |
| 部署平台 | Vercel | 免费额度够用 |
| 认证 | Clerk | 免费额度: 10K MAU |
| 数据库 | Supabase | PostgreSQL + Realtime |
| 向量数据库 | Pinecone | 免费 Starter |
| AI 模型 | OpenAI GPT-4o / Claude 3.5 | 按 token 计费 |
| 邮件服务 | Resend | 免费 3K/月 |
| 支付 | Stripe | 2.9% + 30¢ per txn |
| 分析 | PostHog | 免费 1M events/月 |
| 监控 | Sentry | 免费 5K errors/月 |
| 缓存 | Upstash Redis | 免费 10K/day |

### 项目目录结构

```
ai-saas/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # 认证页面组
│   │   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── sign-up/[[...sign-up]]/
│   │   ├── (dashboard)/         # 登录后页面组
│   │   │   ├── layout.tsx       # Dashboard 布局
│   │   │   ├── chat/            # AI 聊天页面
│   │   │   ├── write/           # AI 写作页面
│   │   │   └── summarize/       # AI 总结页面
│   │   ├── api/                 # API Routes
│   │   │   ├── chat/
│   │   │   ├── write/
│   │   │   ├── summarize/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # 首页
│   │   └── globals.css
│   ├── components/              # React 组件
│   │   ├── ui/                  # 基础 UI 组件
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── AIWriting.tsx
│   │   ├── WritingTemplate.tsx
│   │   ├── AISummary.tsx
│   │   ├── Header.tsx
│   │   ├── Pricing.tsx
│   │   ├── PostHogProvider.tsx
│   │   └── FeatureCard.tsx
│   ├── lib/                     # 工具函数
│   │   ├── supabase.ts          # Supabase 客户端
│   │   ├── pinecone.ts          # Pinecone 客户端
│   │   ├── openai.ts            # OpenAI 客户端
│   │   ├── redis.ts             # Upstash 客户端
│   │   ├── stripe.ts            # Stripe 客户端
│   │   ├── resend.ts            # Resend 客户端
│   │   └── utils.ts             # 通用工具
│   ├── hooks/                   # 自定义 React Hooks
│   │   ├── useChat.ts
│   │   ├── usePostHog.ts
│   │   └── useSubscription.ts
│   ├── types/                   # TypeScript 类型定义
│   │   └── index.ts
│   └── middleware.ts            # Next.js 中间件
├── prisma/                      # (可选) Prisma ORM
│   └── schema.prisma
├── public/                      # 静态资源
├── .env.local                   # 环境变量 (不提交)
├── .env.example                 # 环境变量模板
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── middleware.ts               # Clerk 认证中间件
└── sentry.client.config.ts     # Sentry 配置
```

---

## 3. 数据库设计 (Supabase)

### 表结构

```sql
-- 用户配置表
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,  -- Clerk user ID
  openai_api_key TEXT,           -- 用户自己的 API Key (可选)
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 对话历史表
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT,
  model TEXT DEFAULT 'gpt-4o',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 消息表
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,  -- 'user' | 'assistant'
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 写作模板使用记录
CREATE TABLE writing_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  template_type TEXT NOT NULL,  -- 'email' | 'weibo' | 'xhs'
  input_text TEXT,
  output_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 订阅状态表 (由 Stripe webhook 更新)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'free',  -- 'free' | 'pro' | 'cancelled'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)

```sql
-- 启用 RLS
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY "Users can only access own data" ON user_settings
  FOR ALL USING (user_id::text = current_setting('request.user_id', true)::text);

CREATE POLICY "Users can only access own conversations" ON conversations
  FOR ALL USING (user_id::text = current_setting('request.user_id', true)::text);
```

---

## 4. API 设计

### Chat API

```
POST /api/chat
Request:
{
  "messages": [{ "role": "user", "content": "..." }],
  "model": "gpt-4o" | "claude-3-5-sonnet"
}
Response:
{
  "content": "...",
  "tokens_used": 123,
  "model": "gpt-4o"
}
```

### Write API

```
POST /api/write
Request:
{
  "template": "email" | "weibo" | "xhs",
  "content": "用户输入的关键词/主题"
}
Response:
{
  "result": "生成的文案内容"
}
```

### Summarize API

```
POST /api/summarize
Request:
{
  "url": "https://..." | null,
  "text": "文章内容..." | null
}
Response:
{
  "title": "文章标题",
  "summary": "总结要点",
  "key_points": ["要点1", "要点2", ...]
}
```

### Webhooks

```
POST /api/webhooks/stripe
- 处理订阅状态更新

POST /api/webhooks/resend
- 处理邮件事件
```

---

## 5. 认证与授权 (Clerk)

### 中间件配置

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks(.*)", "/sign-in(.*)", "/sign-up(.*)"],
  ignoredRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### 用户流程

1. **未登录用户**: 可以使用基础 AI 聊天 (限制消息数)
2. **注册用户**: 获得更多使用额度
3. **订阅用户**: 无限使用 + 优先模型

---

## 6. 支付设计 (Stripe)

### 定价方案

| 方案 | 价格 | 功能 |
|------|------|------|
| Free | $0 | 每天 10 次 AI 聊天，基础模型 |
| Pro | $9.9/月 | 无限聊天，高级模型，优先访问新功能 |

### Stripe Checkout 流程

1. 用户点击升级 → 创建 Stripe Checkout Session
2. 重定向到 Stripe 支付页面
3. 支付成功 → Stripe Webhook 更新订阅状态
4. 用户获得 Pro 权限

---

## 7. 开发计划

### Phase 1: 项目初始化 (第 1 天)

- [ ] 初始化 Next.js 项目 (已完成部分)
- [ ] 配置 Tailwind CSS
- [ ] 配置 ESLint + Prettier
- [ ] 配置环境变量
- [ ] 配置 Clerk 认证
- [ ] 配置 Supabase 客户端
- [ ] 创建数据库表

**交付物**: 完整的项目脚手架，能跑起来

### Phase 2: AI 聊天功能 (第 2 天)

- [ ] 创建 Chat 页面
- [ ] 实现 ChatInterface 组件
- [ ] 调用 OpenAI API
- [ ] 实现消息历史
- [ ] 添加加载状态和错误处理
- [ ] PostHog 埋点

**交付物**: 可用的 AI 聊天功能

### Phase 3: AI 写作功能 (第 3 天)

- [ ] 创建 Write 页面
- [ ] 实现写作模板选择
- [ ] 调用 OpenAI API 生成文案
- [ ] 复制到剪贴板功能
- [ ] 使用记录存储

**交付物**: AI 写作工具

### Phase 4: AI 总结功能 (第 4 天)

- [ ] 创建 Summarize 页面
- [ ] 支持 URL 输入和文本粘贴
- [ ] 提取网页内容
- [ ] 调用 AI 总结
- [ ] 展示总结结果

**交付物**: AI 总结工具

### Phase 5: 订阅系统 (第 5 天)

- [ ] 配置 Stripe
- [ ] 创建定价页面
- [ ] 实现 Checkout 流程
- [ ] 实现 Webhook 处理
- [ ] 订阅状态管理

**交付物**: 可用的订阅系统

### Phase 6: 部署上线 (第 6 天)

- [ ] Vercel 部署
- [ ] 配置环境变量
- [ ] 配置域名 (Cloudflare DNS)
- [ ] Sentry 接入
- [ ] PostHog 配置
- [ ] 监控告警设置

**交付物**: 生产环境可用的产品

---

## 8. 环境变量清单

```bash
# .env.example

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Pinecone
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ID_PRO=

# Resend
RESEND_API_KEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Sentry
SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

---

## 9. 关键文件路径

| 文件 | 路径 | 说明 |
|------|------|------|
| 主布局 | src/app/layout.tsx | 根布局，包含 ClerkProvider |
| 首页 | src/app/page.tsx | Landing page |
| 聊天页 | src/app/(dashboard)/chat/page.tsx | AI 聊天页面 |
| 写作页 | src/app/(dashboard)/write/page.tsx | AI 写作页面 |
| 总结页 | src/app/(dashboard)/summarize/page.tsx | AI 总结页面 |
| Chat API | src/app/api/chat/route.ts | 聊天 API |
| Write API | src/app/api/write/route.ts | 写作 API |
| Supabase 客户端 | src/lib/supabase.ts | 数据库客户端 |
| 中间件 | src/middleware.ts | Clerk 认证中间件 |

---

## 10. 第三方服务申请链接

- [Clerk](https://clerk.com) - 认证服务
- [Supabase](https://supabase.com) - 数据库
- [Pinecone](https://pinecone.io) - 向量数据库
- [OpenAI](https://platform.openai.com) - AI 模型
- [Stripe](https://stripe.com) - 支付
- [Resend](https://resend.com) - 邮件
- [Upstash](https://upstash.com) - Redis
- [PostHog](https://posthog.com) - 分析
- [Sentry](https://sentry.io) - 监控
- [Vercel](https://vercel.com) - 部署
- [Cloudflare](https://cloudflare.com) - DNS
