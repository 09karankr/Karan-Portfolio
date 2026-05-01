import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    return NextResponse.json(
      { ok: false, error: "Email not configured on server" },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length > 100) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message must be 1–5000 characters" },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to,
      reply_to: email,
      subject: `[Portfolio] Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    } as Parameters<typeof resend.emails.send>[0]);

    if (result.error) {
      console.error("[contact] resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Failed to send" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send" },
      { status: 500 },
    );
  }
}
