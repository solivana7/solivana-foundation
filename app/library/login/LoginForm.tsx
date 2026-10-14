'use client';

import { useState } from 'react';

interface LoginFormProps {
  initialNext?: string;
  initialError?: string;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; email: string }
  | { kind: 'error'; message: string };

export function LoginForm({ initialNext, initialError }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>(
    initialError ? { kind: 'error', message: initialError } : { kind: 'idle' }
  );

  function onEmailChange(value: string) {
    setEmail(value);
    // Clear stale errors as soon as the user starts typing again.
    if (status.kind === 'error') setStatus({ kind: 'idle' });
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (status.kind === 'sending') return;

    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setStatus({ kind: 'error', message: 'Please enter your email.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus({ kind: 'error', message: 'That email doesn\'t look right.' });
      return;
    }

    setStatus({ kind: 'sending' });

    // Build FormData explicitly from controlled state — never trust the form's
    // FormData on mobile Safari, where autofill can clobber values mid-render.
    const fd = new FormData();
    fd.set('email', trimmed);
    fd.set('next', initialNext ?? '/library');

    try {
      const res = await fetch('/api/library/login-magic', {
        method: 'POST',
        body: fd,
        credentials: 'same-origin',
        cache: 'no-store',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          kind: 'error',
          message:
            data.error ||
            'Something went wrong. Try the access password below, or email info@solivana.com.',
        });
        return;
      }
      setStatus({ kind: 'sent', email: trimmed });
      setEmail('');
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof Error
            ? `Network error: ${err.message}`
            : 'Network error. Try again or use the access password below.',
      });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="card-soft p-8 md:p-10 text-center">
        <div className="text-5xl mb-5" aria-hidden="true">
          ✉
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-solivana-bark mb-3">
          Check your inbox.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-6">
          We sent a sign-in link to{' '}
          <strong className="text-solivana-bark">{status.email}</strong>. Tap the
          button in the email to open your library. The link is good for 60 minutes.
        </p>
        <p className="text-xs text-solivana-taupe leading-relaxed mb-5">
          Didn&apos;t arrive within 2 minutes? Check spam, or try again with the same
          email.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="btn-secondary"
        >
          Use a different email
        </button>
      </div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <>
      {/* Primary: email magic-link */}
      <form onSubmit={handleEmailSubmit} className="card-soft p-7 md:p-8 space-y-5">
        <div>
          <label
            htmlFor="lib-email"
            className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
          >
            The Email You Used at Checkout
          </label>
          <input
            id="lib-email"
            name="email"
            type="email"
            inputMode="email"
            required
            autoFocus
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={sending}
            className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 disabled:opacity-60"
            style={{ fontSize: '16px' }}
          />
        </div>

        <div aria-live="polite" aria-atomic="true">
          {status.kind === 'error' && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
              {status.message}
            </div>
          )}
          {sending && (
            <div className="rounded-lg border border-solivana-amber/40 bg-solivana-amber/5 px-4 py-3 text-sm text-solivana-bark flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-solivana-amber animate-pulse"
              />
              Looking up your account and sending the link…
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={sending || !email.trim()}
          className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-wait"
        >
          {sending ? 'Sending sign-in link…' : 'Email Me a Sign-In Link'}
        </button>
        <p className="text-xs text-solivana-taupe leading-relaxed text-center">
          We&apos;ll email a one-tap sign-in link. Good for 60 minutes.
        </p>
      </form>

      {/* Secondary: shared-password fallback */}
      <details className="mt-8 group">
        <summary className="text-sm text-solivana-taupe cursor-pointer hover:text-solivana-bark inline-flex items-center gap-2 select-none list-none">
          <span className="text-solivana-amber group-open:rotate-45 transition-transform inline-block">
            +
          </span>
          <span>Use the access password instead</span>
        </summary>
        <form
          action="/api/library/login"
          method="POST"
          className="mt-5 card-flat p-6 space-y-4"
        >
          <input type="hidden" name="next" value={initialNext ?? '/library'} />
          <div>
            <label
              htmlFor="lib-password"
              className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
            >
              Access Password
            </label>
            <input
              id="lib-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20"
              style={{ fontSize: '16px' }}
            />
          </div>
          <button type="submit" className="btn-secondary w-full text-center">
            Sign In with Password
          </button>
          <p className="text-xs text-solivana-taupe text-center">
            Backup option. We recommend the email link above.
          </p>
        </form>
      </details>

      <p className="text-xs text-solivana-taupe leading-relaxed text-center mt-8">
        Lost access? Email{' '}
        <a
          href="mailto:info@solivana.com"
          className="underline decoration-solivana-amber hover:text-solivana-bark"
        >
          info@solivana.com
        </a>
      </p>
    </>
  );
}
