import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: "AI Tools Hub <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw error;
  }

  return data;
}

export async function sendWelcomeEmail(email: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to AI Tools Hub!",
    html: "<h1>Welcome!</h1><p>Thanks for joining AI Tools Hub.</p>",
  });
}
