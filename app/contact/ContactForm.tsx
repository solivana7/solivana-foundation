'use client';

import { useState } from 'react';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error'; message: string };

const TOPICS = [
  'Question about The Foundation',
  'Member support (already enrolled)',
  'Refund request',
  'Press / podcast',
  'Partnership / collaboration',
  'Something else',
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === 'sending') return;
    setStatus({ kind: 'sending' });

    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          kind: 'error',
          message: data.error || 'Something went wrong. Try again or email info@solivana.com directly.',
        });
        return;
      }
      setStatus({ kind: 'sent' });
      form.reset();
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Network error.',
      });
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className="card-soft p-10 md:p-12 text-center">
        <div className="text-5xl mb-5" aria-hidden="true">
          ✓
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-4 leading-tight">
          Got it. Thank you.
        </h2>
        <p className="text-solivana-taupe leading-relaxed text-lg mb-8 max-w-md mx-auto">
          Your message landed in Natasha&apos;s inbox. We respond within one business
          day, usually faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="btn-secondary"
        >
          Send Another
        </button>
      </div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form
      onSubmit={handleSubmit}
      className="card-soft p-7 md:p-10 space-y-6"
      noValidate
    >
      {/* Honeypot — hidden from humans, bots fill it */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
          >
            Email <span className="text-solivana-amber">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-topic"
          className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
        >
          What&apos;s this about?
        </label>
        <select
          id="contact-topic"
          name="topic"
          defaultValue={TOPICS[0]}
          className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 appearance-none cursor-pointer"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23786455' stroke-width='1.5' stroke-linecap='round'/%3e%3c/svg%3e\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: '40px',
          }}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
        >
          Your message <span className="text-solivana-amber">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          minLength={5}
          maxLength={5000}
          placeholder="Tell us what's on your mind..."
          className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 resize-y"
        />
        <p className="text-xs text-solivana-taupe mt-2">
          Please don&apos;t share medical history or describe a medical emergency. For
          emergencies, call 911 or your physician.
        </p>
      </div>

      {status.kind === 'error' && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {status.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="btn-primary disabled:opacity-60 disabled:cursor-wait"
        >
          {sending ? 'Sending…' : 'Send Message'}
        </button>
        <p className="text-sm text-solivana-taupe">
          We respond within one business day.
        </p>
      </div>
    </form>
  );
}
