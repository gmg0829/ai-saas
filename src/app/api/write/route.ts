import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";

const TEMPLATE_PROMPTS = {
  email: (content: string) =>
    `Write a professional email based on the following input:\n\n"${content}"\n\nWrite only the email body, be concise and professional.`,
  weibo: (content: string) =>
    `Write a Weibo (Chinese Twitter) post based on the following input:\n\n"${content}"\n\nKeep it under 140 characters, engaging, with appropriate hashtags if relevant.`,
  xhs: (content: string) =>
    `Write a Xiaohongshu (Little Red Book) style post based on the following input:\n\n"${content}"\n\nUse a friendly, personal tone. Include emojis. Make it engaging and relatable.`,
};

export async function POST(req: NextRequest) {
  try {
    const { template, content } = await req.json();

    if (!template || !content) {
      return NextResponse.json(
        { error: "Template and content are required" },
        { status: 400 }
      );
    }

    const promptFn = TEMPLATE_PROMPTS[template as keyof typeof TEMPLATE_PROMPTS];
    if (!promptFn) {
      return NextResponse.json({ error: "Invalid template" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: promptFn(content) }],
      max_tokens: 500,
    });

    return NextResponse.json({
      result: response.choices[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Write API error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
