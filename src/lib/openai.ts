import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

export async function chat(messages: OpenAI.Chat.ChatCompletionMessageParam[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
  });

  return {
    content: response.choices[0]?.message?.content || "",
    tokens_used: response.usage?.total_tokens || 0,
  };
}
