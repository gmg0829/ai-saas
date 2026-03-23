export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  tokens_used?: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  model: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface UserSettings {
  id: string;
  user_id: string;
  openai_api_key?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: "free" | "pro" | "cancelled";
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}

export interface WritingLog {
  id: string;
  user_id: string;
  template_type: "email" | "weibo" | "xhs";
  input_text: string;
  output_text: string;
  created_at: string;
}

export type TemplateType = "email" | "weibo" | "xhs";

export interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
  model?: "gpt-4o" | "claude-3-5-sonnet";
}

export interface WriteRequest {
  template: TemplateType;
  content: string;
}

export interface SummarizeRequest {
  url?: string;
  text?: string;
}
