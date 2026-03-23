# AI SaaS

Bun 集成的 AI 工具集合 SaaS 产品。

## 使用 Bun

```bash
# 安装依赖
bun install

# 开发
bun run dev

# 构建
bun run build

# 生产
bun run start
```

## 环境变量

复制 `.env.example` 为 `.env.local` 并填写：

```bash
cp .env.example .env.local
```

## 技术栈

- **框架**: Next.js 14 (App Router)
- **运行时**: Bun
- **认证**: Clerk
- **数据库**: Supabase
- **AI**: OpenAI / Claude
- **支付**: Stripe
- **部署**: Vercel
