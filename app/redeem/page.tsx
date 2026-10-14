import Link from 'next/link';
import { SiteFooter } from '../components/SiteFooter';
import { RedeemForm } from './RedeemForm';

export const metadata = {
  title: 'Redeem Your Access — The Foundation',
  description:
    'If you\'ve been given a Foundation access code, enter it here to set up your library and sign in.',
  // Not for the public eye — keep search engines out.
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function RedeemPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <header className="max-w-3xl mx-auto px-5 md:px-8 pt-10 md:pt-14">
        <Link
          href="/"
          className="inline-block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe hover:text-solivana-bark mb-10"
        >
          ← The Foundation
        </Link>
      </header>

      <section className="max-w-xl mx-auto px-5 md:px-8 pb-10 md:pb-16">
        <div className="eyebrow mb-3 text-solivana-amber">Comp Access</div>
        <h1 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-bark mb-5">
          Redeem your access.
        </h1>
        <p className="text-base md:text-lg text-solivana-taupe leading-relaxed mb-9 max-w-lg">
          You were given a code for The Foundation. Enter it below with your
          name and email. We&apos;ll create your account and email a one-tap
          sign-in link — no payment, nothing else to do.
        </p>

        <RedeemForm />

        <p className="text-xs text-solivana-taupe leading-relaxed text-center mt-8">
          Already have an account? Sign in at{' '}
          <Link
            href="/library/login"
            className="underline decoration-solivana-amber hover:text-solivana-bark"
          >
            /library/login
          </Link>
          . Lost your code? Email{' '}
          <a
            href="mailto:info@solivana.com"
            className="underline decoration-solivana-amber hover:text-solivana-bark"
          >
            info@solivana.com
          </a>
          .
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
