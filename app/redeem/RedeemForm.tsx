'use client';

import { useState } from 'react';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; email: string }
  | { kind: 'error'; message: string };

export function RedeemForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  function clearError() {
    if (status.kind === 'error') setStatus({ kind: 'idle' });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (status.kind === 'sending') return;

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedFirst = firstName.trim();
    const trimmedCode = code.trim();

    if (!trimmedFirst) {
      setStatus({ kind: 'error', message: 'Please enter your first name.' });
      return;
    }
    if (!trimmedEmail) {
      setStatus({ kind: 'error', message: 'Please enter your email.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus({ kind: 'error', message: 'That email doesn\'t look right.' });
      return;
    }
    if (!trimmedCode) {
      setStatus({ kind: 'error', message: 'Please enter your access code.' });
      return;
    }

    setStatus({ kind: 'sending' });

    const fd = new FormData();
    fd.set('firstName', trimmedFirst);
    fd.set('lastName', lastName.trim());
    fd.set('email', trimmedEmail);
    fd.set('code', trimmedCode);

    try {
      const res = await fetch('/api/library/redeem-code', {
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
            'Something went wrong. Please email info@solivana.com.',
        });
        return;
      }
      setStatus({ kind: 'sent', email: trimmedEmail });
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof Error
            ? `Network error: ${err.message}`
            : 'Network error. Please try again.',
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
          You&apos;re in. Check your inbox.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-6">
          We sent your sign-in link to{' '}
          <strong className="text-solivana-bark">{status.email}</strong>. Tap the
          button in the email to open The Foundation library. The link is good for
          60 minutes.
        </p>
        <p className="text-xs text-solivana-taupe leading-relaxed">
          Didn&apos;t arrive within 2 minutes? Check your spam folder. To request a
          new link any time, enter your email at{' '}
          <a
            href="/library/login"
            className="underline decoration-solivana-amber hover:text-solivana-bark"
          >
            /library/login
          </a>
          .
        </p>
      </div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form onSubmit={handleSubmit} className="card-soft p-7 md:p-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="redeem-first"
            className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
          >
            First Name
          </label>
          <input
            id="redeem-first"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearError();
            }}
            disabled={sending}
            className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 disabled:opacity-60"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div>
          <label
            htmlFor="redeem-last"
            className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
          >
            Last Name <span className="lowercase tracking-normal text-solivana-taupe/70">(optional)</span>
          </label>
          <input
            id="redeem-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              clearError();
            }}
            disabled={sending}
            className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 disabled:opacity-60"
            style={{ fontSize: '16px' }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="redeem-email"
          className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
        >
          Email
        </label>
        <input
          id="redeem-email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          disabled={sending}
          className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 disabled:opacity-60"
          style={{ fontSize: '16px' }}
        />
      </div>

      <div>
        <label
          htmlFor="redeem-code"
          className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
        >
          Access Code
        </label>
        <input
          id="redeem-code"
          name="code"
          type="text"
          required
          autoComplete="off"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Enter your code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            clearError();
          }}
          disabled={sending}
          className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 disabled:opacity-60 tracking-widest uppercase"
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
            Setting up your access and sending your sign-in link…
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={sending || !firstName.trim() || !email.trim() || !code.trim()}
        className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-wait"
      >
        {sending ? 'Setting Up Your Access…' : 'Redeem My Access'}
      </button>
      <p className="text-xs text-solivana-taupe leading-relaxed text-center">
        We&apos;ll create your account and email you a one-tap sign-in link.
      </p>
    </form>
  );
}
