'use client';

import { useState } from 'react';

const ACKNOWLEDGMENTS = [
  'The Foundation is an educational wellness program, not medical advice, diagnosis, or treatment.',
  'I will consult my physician before beginning if I am pregnant, nursing, taking prescription medications, or managing a chronic condition.',
  'Results vary. My participation is at my own discretion and responsibility.',
  'I have read the Refund Policy and understand the 14-day / pre-Phase-2 window.',
];

export function AcknowledgeForm() {
  const [checked, setChecked] = useState<boolean[]>(
    Array(ACKNOWLEDGMENTS.length).fill(false)
  );
  const allChecked = checked.every(Boolean);

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <>
      <div className="bg-solivana-amber/5 border border-solivana-amber/40 rounded-2xl p-7 md:p-9 mb-10">
        <div className="eyebrow mb-4 text-solivana-amber">Please Acknowledge</div>
        <ul className="space-y-4">
          {ACKNOWLEDGMENTS.map((text, i) => (
            <li key={i}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked[i]}
                onClick={() => toggle(i)}
                className="w-full text-left flex gap-3 items-start text-solivana-ink leading-relaxed group focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2 rounded p-1 -m-1"
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                    checked[i]
                      ? 'bg-solivana-amber border-solivana-amber'
                      : 'bg-white border-solivana-ink/40 group-hover:border-solivana-ink'
                  }`}
                >
                  {checked[i] && (
                    <span className="text-white text-xs font-bold leading-none">
                      ✓
                    </span>
                  )}
                </span>
                <span className="flex-1">{text}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-solivana-taupe leading-relaxed">
          You must acknowledge each statement before continuing. Full details:{' '}
          <a href="/terms" className="underline decoration-solivana-amber">
            Terms
          </a>
          ,{' '}
          <a href="/privacy" className="underline decoration-solivana-amber">
            Privacy Policy
          </a>
          , and{' '}
          <a href="/refunds" className="underline decoration-solivana-amber">
            Refund Policy
          </a>
          .
        </p>
      </div>

      <div className="text-center">
        <form action="/api/checkout" method="POST">
          <button
            type="submit"
            disabled={!allChecked}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:bg-solivana-ink disabled:hover:shadow-none"
          >
            Continue to Checkout →
          </button>
        </form>
        <p className="mt-4 text-xs text-solivana-taupe font-accent tracking-wider uppercase">
          {allChecked
            ? 'Secure Checkout · Powered by Stripe'
            : 'Acknowledge all statements above to continue'}
        </p>
      </div>
    </>
  );
}
