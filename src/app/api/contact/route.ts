import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO ?? "uniagent@unitrans.bg";
const FROM = process.env.RESEND_FROM ?? "Website <onboarding@resend.dev>";

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, company, email, phone, topic, message, website } = data;

  // Honeypot — bots fill the hidden field; pretend success.
  if (website) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "bad-email" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.VERCEL) {
      // Production without email configured — fail honestly so the visitor
      // sees the direct-email fallback instead of a false success.
      console.error("[contact] RESEND_API_KEY missing in production — enquiry NOT delivered");
      return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
    }
    // Local development — accept and log so the UX can be tested.
    console.info("[contact] demo submission:", { name, company, email, phone, topic });
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `[unitrans.bg] ${topic || "Enquiry"} — ${name}`,
      html: `
        <h2 style="font-family:sans-serif">New enquiry from unitrans.bg</h2>
        <table style="font-family:sans-serif;font-size:14px">
          <tr><td style="padding:4px 12px 4px 0"><b>Name</b></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Company</b></td><td>${esc(company || "—")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Email</b></td><td>${esc(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Phone</b></td><td>${esc(phone || "—")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Topic</b></td><td>${esc(topic || "—")}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(message)}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
}
