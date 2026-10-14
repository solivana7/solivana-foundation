'use client';

import { useEffect, useState } from 'react';

interface SiteTopBarProps {
  rightCta?: { href: string; label: string };
}

const NAV = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/quiz', label: 'Take the Quiz' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function SiteTopBar({ rightCta }: SiteTopBarProps) {
  const cta = rightCta ?? { href: '/enroll', label: 'Enroll Now' };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[rgba(246,241,236,0.85)] border-b border-solivana-sand/30">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-6">
          <a
            href="/"
            className="font-display text-base md:text-lg font-medium tracking-tight text-solivana-ink hover:text-solivana-amber transition-colors shrink-0"
          >
            The Foundation
            <span className="ml-2 hidden sm:inline text-[9px] font-accent tracking-[0.28em] uppercase text-solivana-taupe align-middle">
              by SoliVana
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-solivana-ink/70 hover:text-solivana-ink transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={cta.href}
              className="hidden sm:inline-block text-[11px] font-accent uppercase tracking-[0.18em] text-solivana-cream bg-solivana-ink px-5 py-2.5 rounded-full hover:bg-solivana-amber transition-colors shrink-0"
            >
              {cta.label}
            </a>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-solivana-sand/60 text-solivana-ink hover:border-solivana-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2 focus-visible:ring-offset-solivana-warm"
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {open ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-0 z-40 bg-solivana-warm flex flex-col"
        >
          <div className="border-b border-solivana-sand/30 px-5 py-4 flex items-center justify-between">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="font-display text-lg font-medium text-solivana-ink"
            >
              The Foundation
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-solivana-sand/60 text-solivana-ink"
            >
              ✕
            </button>
          </div>
          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-5 py-8 flex flex-col gap-1"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 text-2xl font-display font-light text-solivana-ink border-b border-solivana-sand/20 hover:text-solivana-amber"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="border-t border-solivana-sand/30 p-5">
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="btn-primary w-full text-center"
            >
              {cta.label}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
