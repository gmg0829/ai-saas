import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { url, text } = await req.json();

    if (!url && !text) {
      return NextResponse.json(
        { error: "Either URL or text is required" },
        { status: 400 }
      );
    }

    let contentToSummarize = text;

    // If URL is provided, fetch and extract content
    // TODO: Implement proper URL content extraction
    if (url && !text) {
      contentToSummarize = `Content from ${url}. Please summarize the main points.`;
    }

    const prompt = `Analyze the following content and provide:
1. A brief title
2. A summary (2-3 sentences)
3. Key points as a list

Content:
${contentToSummarize}

Respond in JSON format:
{
  "title": "...",
  "summary": "...",
  "key_points": ["...", "..."]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 800,
    });

    const result = JSON.parse(
      response.choices[0]?.message?.content || "{}"
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Summarize API error:", error);
    return NextResponse.json(
      { error: "Failed to summarize content" },
      { status: 500 }
    );
  }
}
