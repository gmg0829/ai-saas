import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await sendEmail({
      to: email,
      subject: "Thanks for subscribing to AI Tools Hub!",
      html: `
        <h1>Welcome to AI Tools Hub!</h1>
        <p>Thanks for subscribing. We'll keep you updated with the latest news and features.</p>
        <p>Best regards,<br/>AI Tools Hub Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
