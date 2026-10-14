import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { signMagicLinkToken } from '@/lib/library-magic-link';
import { findContactByEmail, hasFoundationAccess } from '@/lib/ghl-client';
import { getBaseUrl } from '@/lib/base-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Sends to member's external inbox — intra-domain spoof rule (which forces
// noreply@lastwishvault.com on the contact form) doesn't apply here.
// Requires solivana.com verified in Resend with SPF/DKIM/DMARC.
const FROM_EMAIL = 'Natasha Berness <info@solivana.com>';

export async function POST(req: Request) {
  try {
    const form = await req.formData().catch(() => null);
    const email = String(form?.get('email') || '')
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'That email doesn\'t look right.' },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const resendKey = process.env.RESEND_API_KEY;

    let contact;
    try {
      contact = await findContactByEmail(email);
    } catch (err) {
      console.error('[magic-link] GHL lookup error:', err);
      return NextResponse.json(
        {
          error:
            'We could not check your access right now. Please try the access password instead, or email info@solivana.com.',
        },
        { status: 502 }
      );
    }

    if (!hasFoundationAccess(contact)) {
      return NextResponse.json(
        {
          error:
            'We don\'t see an active Foundation membership for that email. If you just enrolled, give it a few minutes for the system to sync — or email info@solivana.com.',
        },
        { status: 404 }
      );
    }

    const token = await signMagicLinkToken(email);
    const link = `${baseUrl}/api/library/login-link?token=${encodeURIComponent(token)}`;

    if (!resendKey) {
      console.error('[magic-link] RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: 'info@solivana.com',
      subject: 'Your Foundation library sign-in link',
      text:
        'Sign in to your Foundation library:\n\n' +
        link +
        '\n\n' +
        'This link is good for 60 minutes. If you didn\'t request it, you can safely ignore this email.\n\n' +
        '— Natasha\n' +
        'SoliVana Wellness',
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; color: #331D01;">
          <p style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #786455; margin: 0 0 18px;">
            Foundation Member Sign-In
          </p>
          <h2 style="font-family: Georgia, serif; font-weight: 400; font-size: 24px; margin: 0 0 18px; color: #331D01; line-height: 1.3;">
            Tap the button to open your library.
          </h2>
          <p style="line-height: 1.55; color: #786455; margin: 0 0 24px;">
            One-tap sign-in. The link is good for 60 minutes. If you didn't request it,
            ignore this email.
          </p>
          <a href="${link}" style="display: inline-block; background: #1F1208; color: #F6F1EC; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-family: 'Poppins', system-ui, sans-serif; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase;">
            Open Library →
          </a>
          <p style="font-size: 13px; color: #786455; margin: 28px 0 0; line-height: 1.55;">
            If the button doesn't work, paste this URL into your browser:<br>
            <a href="${link}" style="color: #EC9247; word-break: break-all;">${link}</a>
          </p>
          <p style="margin-top: 32px; font-size: 11px; color: #786455; line-height: 1.55;">
            — Natasha<br>
            SoliVana Wellness · 1922 El Camino Real, Redwood City, CA 94063
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error('[magic-link] resend error:', result.error);
      return NextResponse.json(
        {
          error:
            'Email failed to send. Try the access password, or email info@solivana.com.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unexpected error';
    console.error('[magic-link] error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
