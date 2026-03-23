-- AI SaaS Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- User Settings Table
-- ============================================
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  openai_api_key TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Conversations Table
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  title TEXT DEFAULT 'New Chat',
  model TEXT DEFAULT 'gpt-4o',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster user queries
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);

-- ============================================
-- Messages Table
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster conversation queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- ============================================
-- Writing Logs Table
-- ============================================
CREATE TABLE IF NOT EXISTS writing_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('email', 'weibo', 'xhs')),
  input_text TEXT,
  output_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for analytics
CREATE INDEX IF NOT EXISTS idx_writing_logs_user_id ON writing_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_writing_logs_created_at ON writing_logs(created_at DESC);

-- ============================================
-- Subscriptions Table
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'free' CHECK (status IN ('free', 'pro', 'cancelled')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- User Settings Policies
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  USING (user_id = current_setting('app.user_id', true));

-- Conversations Policies
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own conversations"
  ON conversations FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own conversations"
  ON conversations FOR UPDATE
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own conversations"
  ON conversations FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

-- Messages Policies
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = current_setting('app.user_id', true)
    )
  );

CREATE POLICY "Users can insert own messages"
  ON messages FOR INSERT
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = current_setting('app.user_id', true)
    )
  );

-- Writing Logs Policies
CREATE POLICY "Users can view own writing logs"
  ON writing_logs FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own writing logs"
  ON writing_logs FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

-- Subscriptions Policies (read-only for users, managed by webhooks)
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- Functions
-- ============================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- INSERT INTO subscriptions (user_id, status) VALUES ('test_user', 'free');
