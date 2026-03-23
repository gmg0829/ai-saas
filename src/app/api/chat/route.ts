import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // Simple rate limiting without Redis for now
    // TODO: Implement proper rate limiting with Upstash Redis

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      max_tokens: 1000,
    });

    return NextResponse.json({
      content: response.choices[0]?.message?.content || "",
      tokens_used: response.usage?.total_tokens || 0,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
