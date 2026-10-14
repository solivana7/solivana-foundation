import Link from 'next/link';
import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';
import { AcknowledgeForm } from './AcknowledgeForm';

const INCLUDED = [
  'The 6-Week Protocol (video modules, phased)',
  'Personal Foundation Assessment',
  'The Foundation Diet Blueprint (3 phases)',
  'Daily Ritual Tracker',
  'The AI Companion (Phase 2 bonus)',
  'Healing Response Guide',
  'Environmental Audit',
  'Family & Pet Protocol',
  'Bi-weekly Office Hours with Natasha (3 live calls)',
  'Lifetime Access',
];

interface EnrollPageProps {
  searchParams: Promise<{ canceled?: string }>;
}

export default async function EnrollPage({ searchParams }: EnrollPageProps) {
  const { canceled } = await searchParams;
  return (
    <main className="min-h-screen text-solivana-ink">
      <SiteTopBar rightCta={{ href: '/', label: '← Back to Details' }} />

      {canceled && (
        <div className="bg-solivana-amber/15 border-b border-solivana-amber/40">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-3 text-sm text-solivana-ink text-center">
            Checkout was canceled. No charge was made. Ready when you are.
          </div>
        </div>
      )}

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="eyebrow mb-5">Enroll · Final Step Before Checkout</div>
        <h1 className="font-display text-4xl md:text-5xl font-light leading-tight text-solivana-ink mb-6">
          One step from beginning.
        </h1>
        <p className="text-lg text-solivana-taupe leading-relaxed mb-10">
          Take one minute to confirm what you&apos;re saying yes to. Then proceed to
          secure checkout.
        </p>

        {/* Program summary card */}
        <div className="card-soft p-7 md:p-9 mb-10">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6 pb-5 border-b border-solivana-sand/40">
            <div>
              <div className="eyebrow mb-1">Your Enrollment</div>
              <div className="font-display text-2xl font-medium text-solivana-ink">
                The Foundation · 6-Week Program
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl font-extralight text-solivana-ink">
                $299
              </div>
              <div className="text-xs text-solivana-taupe">one payment · lifetime access</div>
            </div>
          </div>
          <ul className="space-y-2.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-solivana-taupe">
                <span aria-hidden="true" className="text-solivana-amber font-semibold">
                  ◆
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive acknowledgments + checkout CTA — primary path */}
        <AcknowledgeForm />

        {/* Free-access redemption — quieter alternative path, sits BELOW the
            primary submit button so it doesn't interrupt the main checkout
            flow. Only people Natasha has handed a code to expand it. Tightly
            coupled to the form section above (mt-6) so it doesn't read as an
            orphaned element separate from the form. */}
        <details className="mt-6 group text-center">
          <summary className="text-sm text-solivana-taupe cursor-pointer hover:text-solivana-bark inline-flex items-center gap-2 select-none">
            <span className="text-solivana-amber group-open:rotate-45 transition-transform inline-block">
              +
            </span>
            <span>Have a free-access code?</span>
          </summary>
          <p className="text-sm text-solivana-taupe leading-relaxed mt-3 max-w-xl mx-auto">
            If Natasha gave you a code for full access without payment,{' '}
            <Link
              href="/redeem"
              className="underline decoration-solivana-amber hover:text-solivana-bark"
            >
              redeem it here
            </Link>
            . You&apos;ll enter your name + email + code, then receive a one-tap
            sign-in link by email — no checkout.
          </p>
        </details>

        {/* Questions footer — natural close to the entire enroll section,
            sits last so it reads as the page-level fallback for both the
            primary checkout path and the alternate redeem path above. */}
        <p className="mt-10 text-sm text-solivana-taupe text-center">
          Questions first?{' '}
          <a
            href="mailto:info@solivana.com"
            className="underline decoration-solivana-sand hover:text-solivana-ink"
          >
            info@solivana.com
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
