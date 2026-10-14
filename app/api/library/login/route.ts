import { NextResponse } from 'next/server';
import { signSession, SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/lib/library-auth';
import { getBaseUrl } from '@/lib/base-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const expected = process.env.LIBRARY_PASSWORD;
    if (!expected) {
      return NextResponse.json(
        { error: 'Library not configured.' },
        { status: 500 }
      );
    }

    const form = await req.formData();
    const password = String(form.get('password') || '').trim();
    const next = String(form.get('next') || '/library');

    if (!password) {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
    }
    if (password !== expected) {
      return NextResponse.json(
        { error: 'That password didn\'t match. Try again or check your welcome email.' },
        { status: 401 }
      );
    }

    const safeNext =
      next.startsWith('/library') && !next.startsWith('//') ? next : '/library';

    const token = await signSession();
    // Build the redirect target against the public origin (Railway forwarded
    // host), not new URL(safeNext, req.url) — that resolves to 0.0.0.0:8080
    // inside Railway and causes Chrome to land on connection-refused.
    const res = NextResponse.redirect(new URL(safeNext, getBaseUrl(req)), {
      status: 303,
    });
    res.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    });
    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Login error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
