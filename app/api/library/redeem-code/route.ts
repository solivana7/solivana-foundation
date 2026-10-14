import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { signMagicLinkToken } from '@/lib/library-magic-link';
import { addTagsToContact, createOrFindContact } from '@/lib/ghl-client';
import { getBaseUrl } from '@/lib/base-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FROM_EMAIL = 'Natasha Berness <info@solivana.com>';
const NATASHA_NOTIFY_EMAIL = 'info@solivana.com';

// Sender for ops notifications to Natasha's own info@solivana.com inbox.
// Hostinger blocks intra-domain (info@ → info@) even with full Resend SPF/
// DKIM/DMARC, so we must send from a different domain. Default fallback is
// noreply@lastwishvault.com (verified in Resend, always works).
//
// CANONICAL SENDER (confirmed 2026-05-06): the foundation.solivana.ai
// subdomain is verified in Resend. Set OPS_NOTIFY_FROM=
//   "SoliVana Foundation <notifications@foundation.solivana.ai>"
// on Railway and the on-brand sender takes over without a code change.
const OPS_NOTIFY_FROM =
  process.env.OPS_NOTIFY_FROM || 'noreply@lastwishvault.com';

// Comma-separated list of accepted free-access codes. Set on Railway —
// rotate values without code changes. Comparison is case-insensitive.
function getValidCodes(): string[] {
  return (process.env.FOUNDATION_FREE_CODES || '')
    .split(',')
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData().catch(() => null);
    const email = String(form?.get('email') || '').trim().toLowerCase();
    const firstName = String(form?.get('firstName') || '').trim();
    const lastName = String(form?.get('lastName') || '').trim();
    const code = String(form?.get('code') || '').trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'That email doesn\'t look right.' },
        { status: 400 }
      );
    }
    if (!firstName) {
      return NextResponse.json(
        { error: 'First name is required.' },
        { status: 400 }
      );
    }
    if (!code) {
      return NextResponse.json(
        { error: 'Access code is required.' },
        { status: 400 }
      );
    }

    const validCodes = getValidCodes();
    if (!validCodes.length) {
      console.error('[redeem] FOUNDATION_FREE_CODES not configured');
      return NextResponse.json(
        {
          error:
            'Redemption is not configured right now. Email info@solivana.com.',
        },
        { status: 500 }
      );
    }
    if (!validCodes.includes(code)) {
      return NextResponse.json(
        {
          error:
            'That code isn\'t valid. Email info@solivana.com if you think this is wrong.',
        },
        { status: 403 }
      );
    }

    // Create-or-find the contact in GHL.
    let contact;
    try {
      contact = await createOrFindContact({
        email,
        firstName,
        lastName: lastName || undefined,
        source: `The Foundation - Free Code (${code})`,
      });
    } catch (err) {
      console.error('[redeem] GHL upsert error:', err);
      return NextResponse.json(
        {
          error:
            'We could not create your account right now. Please try again, or email info@solivana.com.',
        },
        { status: 502 }
      );
    }

    // Tag with both the access tag (so magic-link login allows them through)
    // and the comp-tier tag (so the rest of the SoliVana system knows this
    // member arrived through a comp code, not a paid enrollment).
    try {
      await addTagsToContact(contact.id, [
        'foundation-active-cohort',
        'foundation-tier-comp',
      ]);
    } catch (err) {
      console.error('[redeem] GHL tag error:', err);
      return NextResponse.json(
        {
          error:
            'We created your account but could not grant access. Please email info@solivana.com.',
        },
        { status: 502 }
      );
    }

    // Send the magic-link sign-in email so the recipient can land in the
    // library on their first click — no separate "now go log in" step.
    const baseUrl = getBaseUrl(req);
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.error('[redeem] RESEND_API_KEY not configured');
      return NextResponse.json(
        {
          error:
            'Email service not configured. Please email info@solivana.com.',
        },
        { status: 500 }
      );
    }

    const token = await signMagicLinkToken(email);
    const link = `${baseUrl}/api/library/login-link?token=${encodeURIComponent(token)}`;
    const resend = new Resend(resendKey);

    const sendResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: 'info@solivana.com',
      subject: 'Your Foundation library is ready',
      text:
        `Hi ${firstName},\n\n` +
        'Your access to The Foundation library is set up. Tap the link below to sign in:\n\n' +
        link +
        '\n\n' +
        'This link is good for 60 minutes. If you ever need to come back, ' +
        'just enter your email at https://foundation.solivana.ai/library/login ' +
        'and we will email you a fresh link.\n\n' +
        '— Natasha\n' +
        'SoliVana Wellness',
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; color: #331D01;">
          <p style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #786455; margin: 0 0 18px;">
            Welcome to The Foundation
          </p>
          <h2 style="font-family: Georgia, serif; font-weight: 400; font-size: 24px; margin: 0 0 18px; color: #331D01; line-height: 1.3;">
            Hi ${escapeHtml(firstName)} — your library is ready.
          </h2>
          <p style="line-height: 1.55; color: #786455; margin: 0 0 24px;">
            Tap the button below to sign in. The link is good for 60 minutes.
            Any time you want to come back, enter your email at the
            <a href="${baseUrl}/library/login" style="color: #EC9247;">sign-in page</a>
            and we will email you a fresh one.
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

    if (sendResult.error) {
      console.error('[redeem] resend error:', sendResult.error);
      return NextResponse.json(
        {
          error:
            'Your access is granted but the welcome email failed to send. ' +
            'Sign in at /library/login with your email — we will resend the link.',
        },
        { status: 502 }
      );
    }

    // Notify Natasha (best-effort — don't fail the redemption if this errors).
    // Per ops-emails-auto-send carve-out: operational notifications to her own
    // inbox are allowed without explicit approval.
    // Sender: configurable via OPS_NOTIFY_FROM env var. Defaults to
    // noreply@lastwishvault.com because Hostinger rejects intra-domain mail
    // (info@solivana.com → info@solivana.com) on receive even with full
    // Resend SPF/DKIM/DMARC. To switch to a more on-brand sender like
    // notifications@solivana.ai, verify solivana.ai in Resend (DNS at the
    // Vercel solivana.ai zone), then set OPS_NOTIFY_FROM on Railway.
    // Per memory file project_solivana_email_routing.md.
    resend.emails
      .send({
        from: OPS_NOTIFY_FROM,
        to: [NATASHA_NOTIFY_EMAIL],
        subject: `[Foundation] ${firstName} ${lastName || ''} redeemed code "${code}"`,
        text:
          `${firstName}${lastName ? ' ' + lastName : ''} (${email}) redeemed Foundation comp code "${code}".\n\n` +
          `GHL contact id: ${contact.id}\n` +
          `Tags added: foundation-active-cohort, foundation-tier-comp\n` +
          `Sign-in link sent to ${email}.\n`,
      })
      .catch((err) => console.error('[redeem] notify error:', err));

    return NextResponse.json({ ok: true, email });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unexpected error';
    console.error('[redeem] error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
