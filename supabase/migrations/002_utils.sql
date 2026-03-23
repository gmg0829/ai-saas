-- AI SaaS Helper Functions
-- Run this in Supabase SQL Editor after 001_initial_schema.sql

-- ============================================
-- Get or Create User Settings
-- ============================================
CREATE OR REPLACE FUNCTION get_or_create_user_settings(p_user_id TEXT)
RETURNS user_settings AS $$
DECLARE
  v_settings user_settings;
BEGIN
  SELECT * INTO v_settings FROM user_settings WHERE user_id = p_user_id;

  IF v_settings IS NULL THEN
    INSERT INTO user_settings (user_id) VALUES (p_user_id) RETURNING * INTO v_settings;
  END IF;

  RETURN v_settings;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Get User Subscription Status
-- ============================================
CREATE OR REPLACE FUNCTION get_subscription_status(p_user_id TEXT)
RETURNS TEXT AS $$
DECLARE
  v_status TEXT;
BEGIN
  SELECT status INTO v_status FROM subscriptions WHERE user_id = p_user_id;
  RETURN COALESCE(v_status, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Save Chat Message
-- ============================================
CREATE OR REPLACE FUNCTION save_message(
  p_conversation_id UUID,
  p_role TEXT,
  p_content TEXT,
  p_tokens_used INTEGER DEFAULT NULL
)
RETURNS messages AS $$
DECLARE
  v_message messages;
BEGIN
  INSERT INTO messages (conversation_id, role, content, tokens_used)
  VALUES (p_conversation_id, p_role, p_content, p_tokens_used)
  RETURNING * INTO v_message;

  RETURN v_message;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Get Conversation with Messages
-- ============================================
CREATE OR REPLACE FUNCTION get_conversation_with_messages(p_conversation_id UUID)
RETURNS TABLE(
  conversation_json JSONB,
  messages_json JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    row_to_json(c)::JSONB,
    COALESCE(json_agg(row_to_json(m) ORDER BY m.created_at), '[]')::JSONB
  FROM conversations c
  LEFT JOIN messages m ON m.conversation_id = c.id
  WHERE c.id = p_conversation_id
  GROUP BY c.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Get User Conversations List
-- ============================================
CREATE OR REPLACE FUNCTION get_user_conversations(p_user_id TEXT)
RETURNS TABLE(
  id UUID,
  title TEXT,
  model TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  message_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.title,
    c.model,
    c.created_at,
    c.updated_at,
    COUNT(m.id)::BIGINT as message_count
  FROM conversations c
  LEFT JOIN messages m ON m.conversation_id = c.id
  WHERE c.user_id = p_user_id
  GROUP BY c.id
  ORDER BY c.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Increment Usage Counter (for rate limiting)
-- ============================================
CREATE OR REPLACE FUNCTION increment_usage_counter(
  p_user_id TEXT,
  p_limit INTEGER DEFAULT 10
)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
  v_key TEXT;
BEGIN
  v_key := 'daily_usage:' || p_user_id || ':' || TO_CHAR(NOW(), 'YYYY-MM-DD');

  -- Use Redis via Supabase edge function or pg cache
  -- This is a placeholder - implement with Upstash Redis in application code

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
