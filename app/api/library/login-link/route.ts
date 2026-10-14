import { NextResponse } from 'next/server';
import { verifyMagicLinkToken } from '@/lib/library-magic-link';
import { signSession, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/library-auth';
import { getBaseUrl } from '@/lib/base-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') || '';

  // Use the public origin (Railway/Fastly forwarded host) for redirects —
  // not url.origin, which is the internal bind address (0.0.0.0:8080) and
  // makes Chrome land on a connection-refused page.
  const base = getBaseUrl(req);

  const result = await verifyMagicLinkToken(token);

  if (!result.valid) {
    const reason = result.reason === 'expired' ? 'expired' : 'invalid';
    const loginUrl = new URL('/library/login', base);
    loginUrl.searchParams.set(
      'error',
      reason === 'expired'
        ? 'That sign-in link expired. Magic links are good for 60 minutes — request a fresh one.'
        : 'That sign-in link didn\'t check out. Request a fresh one.'
    );
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const sessionToken = await signSession();
  const libraryUrl = new URL('/library', base);
  const res = NextResponse.redirect(libraryUrl, { status: 303 });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
