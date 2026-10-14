import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION_COOKIE } from './lib/library-auth';

const OPEN_PATHS = ['/library/login'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (OPEN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await verifySession(cookie);
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/library/login';
  if (pathname !== '/library') url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/library/:path*'],
};
