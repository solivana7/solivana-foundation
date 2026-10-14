// Magic-link tokens for /library/login-link.
// Format: base64url(email).timestamp.signature
// HMAC-SHA256 signed; expires in 30 minutes.
// Edge-runtime safe (Web Crypto only).

const TOKEN_TTL_MS = 60 * 60 * 1000; // 60 minutes

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

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(
    str.length + ((4 - (str.length % 4)) % 4),
    '='
  );
  return atob(padded);
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

export async function signMagicLinkToken(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  const ts = Date.now().toString();
  const payload = `${base64UrlEncode(normalized)}.${ts}`;
  const sig = await hmac(payload, getSecret());
  return `${payload}.${sig}`;
}

export async function verifyMagicLinkToken(
  token: string
): Promise<{ valid: false; reason: string } | { valid: true; email: string }> {
  if (!token) return { valid: false, reason: 'missing-token' };
  const parts = token.split('.');
  if (parts.length !== 3) return { valid: false, reason: 'malformed' };
  const [encEmail, ts, sig] = parts;
  const payload = `${encEmail}.${ts}`;
  const expectedSig = await hmac(payload, getSecret());
  if (sig.length !== expectedSig.length) return { valid: false, reason: 'bad-sig' };
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  if (diff !== 0) return { valid: false, reason: 'bad-sig' };
  const age = Date.now() - Number(ts);
  console.log('[magic-link] verify', {
    ageMs: age,
    ageMin: Math.round(age / 60000),
    ttlMin: TOKEN_TTL_MS / 60000,
    expired: age > TOKEN_TTL_MS,
  });
  if (!Number.isFinite(age) || age < 0 || age > TOKEN_TTL_MS) {
    return { valid: false, reason: 'expired' };
  }
  let email: string;
  try {
    email = base64UrlDecode(encEmail);
  } catch {
    return { valid: false, reason: 'malformed' };
  }
  return { valid: true, email };
}
