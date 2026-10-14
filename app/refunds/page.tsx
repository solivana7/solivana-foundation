import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

const LAST_UPDATED = 'April 22, 2026';

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="eyebrow mb-5">Legal</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-4">
          Refund Policy
        </h1>
        <p className="text-sm text-solivana-taupe mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8 text-solivana-bark leading-relaxed">
          <section>
            <p>
              The Foundation is a digital educational program with substantial content
              available immediately on enrollment. Because the Program is delivered
              digitally and cannot be &ldquo;returned,&rdquo; our refund policy is
              designed to be fair to both you and us.
            </p>
          </section>

          <section className="bg-white border border-solivana-sand/70 rounded-2xl p-7 md:p-8">
            <h2 className="font-display text-xl font-semibold mb-3">The Policy in One Line</h2>
            <p className="text-lg text-solivana-bark">
              <strong>Full refund within 14 days of purchase, as long as you have not
              begun Phase 2 (Week 3 — The Cleanse).</strong>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Why This Window</h2>
            <p>
              Phases 1 (Weeks 1–2, Build the Foundation) and the Foundation Assessment
              are designed to give you a meaningful, actionable sample of the Program.
              Fourteen days is enough time to complete the Assessment, watch the
              Foundations module, and begin Phase 1. If the Program isn&apos;t right for
              you by then, request a full refund.
            </p>
            <p className="mt-3">
              Phase 2 (Weeks 3–4) contains the herbal cleanse protocol — the heart of the
              Program&apos;s proprietary content. Once you access Phase 2 materials, the
              Program is considered delivered and refunds are no longer available.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">How to Request a Refund</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Email{' '}
                <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">
                  info@solivana.com
                </a>{' '}
                within 14 days of your purchase date, with subject line &ldquo;Refund
                Request — The Foundation.&rdquo;
              </li>
              <li>
                Include the email address you used to enroll and, if you&apos;re willing,
                one sentence about why the Program isn&apos;t working for you. Feedback
                is optional but appreciated — it helps us improve.
              </li>
              <li>
                We&apos;ll confirm receipt within 1 business day and process the refund
                within 5–10 business days to the original payment method.
              </li>
              <li>
                Your access to the course and materials is revoked when the refund is
                issued.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Exceptions</h2>
            <p>
              We will consider refunds outside the standard window in the following
              cases:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Medical emergency or serious illness</strong> — if you cannot
                continue the Program due to a medical event, email us and we will work
                with you on a prorated refund or a pause-and-resume option.
              </li>
              <li>
                <strong>Duplicate charge or technical error</strong> — we refund these
                immediately.
              </li>
              <li>
                <strong>Materials not delivered</strong> — if you never received access
                to the Program for any reason on our end, we refund in full regardless of
                the window.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Not Eligible for Refund</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Requests made more than 14 days after purchase</li>
              <li>Accounts that have accessed Phase 2 (Week 3) materials</li>
              <li>Disputes opened with your bank or payment processor without first contacting us</li>
              <li>Accounts suspended or terminated for violation of our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Office Hours and Live Calls</h2>
            <p>
              Live office hours are included in the Program. Refunds are not affected by
              whether you attended or missed any live calls. Recordings are available to
              all active members.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Contact</h2>
            <p>
              Refund questions, concerns, or special circumstances:{' '}
              <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">
                info@solivana.com
              </a>
              . We respond within 1 business day.
            </p>
            <p className="mt-3 text-sm text-solivana-taupe">
              SoliVana Wellness · 1922 El Camino Real, Redwood City, CA 94063
            </p>
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
