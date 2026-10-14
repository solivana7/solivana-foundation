// HMAC-signed session cookie for the gated /library area.
// Edge-runtime safe: uses Web Crypto only (no Buffer, no Node crypto).

const SESSION_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const COOKIE_NAME = 'solivana_member';

function getSecret(): string {
  return (
    process.env.LIBRARY_SESSION_SECRET ||
    'dev-secret-rotate-on-launch-please-set-LIBRARY_SESSION_SECRET'
  );
}

function bufToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return bufToBase64Url(sig);
}

export const SESSION_COOKIE = COOKIE_NAME;
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

export async function signSession(): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(ts, getSecret());
  return `${ts}.${sig}`;
}

export async function verifySession(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const dot = value.indexOf('.');
  if (dot <= 0) return false;
  const ts = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!ts || !sig) return false;
  const expected = await hmac(ts, getSecret());
  // constant-time compare not strictly available in edge; length check + char-by-char approximation.
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return false;
  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age) || age < 0 || age > SESSION_TTL_MS) return false;
  return true;
}
