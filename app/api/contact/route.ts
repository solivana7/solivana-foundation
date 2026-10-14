import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TO_EMAIL = 'info@solivana.com';
const FROM_EMAIL = 'The Foundation <noreply@lastwishvault.com>';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }

    const form = await req.formData();

    // Honeypot — bots that fill hidden fields get a silent success.
    if (form.get('website')) {
      return NextResponse.json({ ok: true });
    }

    const name = String(form.get('name') || '').trim().slice(0, 200);
    const email = String(form.get('email') || '').trim().slice(0, 200);
    const topic = String(form.get('topic') || 'Other').trim().slice(0, 100);
    const message = String(form.get('message') || '').trim().slice(0, 5000);

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'That email doesn\'t look right.' },
        { status: 400 }
      );
    }
    if (message.length < 5) {
      return NextResponse.json(
        { error: 'Please add a bit more detail.' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `[The Foundation] ${topic}${name ? ` — ${name}` : ''}`;
    const textBody = [
      'New message from foundation.solivana.ai contact form.',
      '',
      `Name:    ${name || '(not provided)'}`,
      `Email:   ${email}`,
      `Topic:   ${topic}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; color: #331D01;">
        <p style="font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: #786455; margin: 0 0 18px;">
          New Contact Form Submission
        </p>
        <h2 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 18px; color: #331D01;">
          ${escapeHtml(topic)}
        </h2>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 18px;">
          <tr>
            <td style="padding: 8px 0; color: #786455; width: 90px;">Name</td>
            <td style="padding: 8px 0; color: #331D01;"><strong>${escapeHtml(name || '(not provided)')}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #786455;">Email</td>
            <td style="padding: 8px 0; color: #331D01;"><a href="mailto:${escapeHtml(email)}" style="color: #EC9247; text-decoration: none;">${escapeHtml(email)}</a></td>
          </tr>
        </table>
        <div style="background: #F6F1EC; border-left: 3px solid #EC9247; padding: 16px 20px; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.55; color: #1F1208;">${escapeHtml(message)}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #786455;">
          Reply directly to this email to respond — Reply-To is set to the sender.
        </p>
      </div>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (result.error) {
      console.error('[contact] resend error:', result.error);
      return NextResponse.json(
        { error: 'Email failed to send. Please try emailing info@solivana.com directly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unexpected error';
    console.error('[contact] error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
