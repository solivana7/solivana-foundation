// Resolves the public origin of the Foundation site for use in outbound
// links (magic-link emails, etc.). Inputs in order of trust:
//
//   1. NEXT_PUBLIC_BASE_URL — explicit override on Railway, hardest truth
//   2. The request's x-forwarded-* headers, set by Railway's edge proxy
//   3. The request URL's own origin
//
// We never trust new URL(req.url).origin alone, because inside a Next.js
// Route Handler running behind Railway/Fastly that origin can be the
// internal bind address (e.g. http://0.0.0.0:8080), which is what shipped
// to members in the magic-link emails before this helper existed.
//
// All return values are guaranteed to NOT be a 0.0.0.0 / 127.0.0.1 /
// localhost URL — those are filtered as obviously-wrong fallbacks.

const BAD_HOSTS = new Set(['0.0.0.0', '127.0.0.1', 'localhost']);

function isBadOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    return BAD_HOSTS.has(u.hostname);
  } catch {
    return true;
  }
}

export function getBaseUrl(req: Request): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (explicit && !isBadOrigin(explicit)) {
    return explicit.replace(/\/$/, '');
  }

  const headers = req.headers;
  const forwardedHost =
    headers.get('x-forwarded-host') ||
    headers.get('host');
  const forwardedProto =
    headers.get('x-forwarded-proto') || 'https';

  if (forwardedHost && !BAD_HOSTS.has(forwardedHost.split(':')[0])) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, '');
  }

  // Last-resort fallback. May still produce a 0.0.0.0 URL inside Railway,
  // but at this point we've exhausted every safer signal.
  try {
    return new URL(req.url).origin;
  } catch {
    return 'https://foundation.solivana.ai';
  }
}
