import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

const LAST_UPDATED = 'April 22, 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="eyebrow mb-5">Legal</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-solivana-taupe mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8 text-solivana-bark leading-relaxed">
          <section>
            <p>
              SoliVana Wellness (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;SoliVana&rdquo;)
              respects your privacy. This policy explains what information we collect,
              how we use it, and what rights you have over it — in plain language.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Information We Collect</h2>
            <p>When you visit this site or enroll in The Foundation, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Account information</strong> — your name, email address, and
                phone number (optional)
              </li>
              <li>
                <strong>Payment information</strong> — processed by our third-party
                payment processor. We do not store full card numbers.
              </li>
              <li>
                <strong>Program activity</strong> — modules and lessons viewed,
                assessment answers, tracker entries, and any notes you submit
              </li>
              <li>
                <strong>Communications</strong> — emails and support messages you send us
              </li>
              <li>
                <strong>Technical data</strong> — IP address, browser type, device type,
                and basic analytics (pages visited, time on page) via standard web
                analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To deliver the Program and grant you access to course materials</li>
              <li>To communicate with you about your account, the Program, and live office hours</li>
              <li>To personalize your experience (e.g., show your assessment results)</li>
              <li>To improve the Program based on aggregate feedback</li>
              <li>To send occasional updates about SoliVana (you can opt out anytime)</li>
              <li>To comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Sharing of Information</h2>
            <p>We share your information only with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Payment processor</strong> (e.g., Stripe, Mangomint, or similar)
                to process your purchase
              </li>
              <li>
                <strong>Course delivery and CRM platform</strong> (GoHighLevel) to host
                the course and manage communications
              </li>
              <li>
                <strong>Email and automation tools</strong> (e.g., Make.com) to automate
                enrollment and onboarding
              </li>
              <li>
                <strong>Analytics providers</strong> for aggregate site analytics
              </li>
              <li>
                <strong>Legal authorities</strong> when required by law
              </li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information. We do not share your assessment
              answers, tracker entries, or office-hours questions with anyone outside
              SoliVana and the platforms necessary to deliver the Program.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Cookies and Tracking</h2>
            <p>
              We use essential cookies to keep you logged in and remember your
              preferences, and limited analytics cookies to understand how the site is
              used. You can disable cookies in your browser, though this may affect
              functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Data Retention</h2>
            <p>
              We retain your information for as long as your account is active and as
              needed to deliver the Program. You can request deletion of your personal
              information at any time by emailing{' '}
              <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">
                info@solivana.com
              </a>
              . Some records (payment history, tax records) must be retained by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Your Rights</h2>
            <p>
              Depending on where you live, you may have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information (with legal exceptions)</li>
              <li>Opt out of marketing communications</li>
              <li>Opt out of the sale of personal information (we do not sell)</li>
              <li>Data portability (receive a copy of your data)</li>
            </ul>
            <p className="mt-3">
              California residents have specific rights under the CCPA. EU/UK residents
              have rights under the GDPR. To exercise any of these, email{' '}
              <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">
                info@solivana.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect your
              information, including encrypted connections (HTTPS), reputable third-party
              platforms, and limited access to personal data. No system is perfectly
              secure; we cannot guarantee against all unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Children&apos;s Privacy</h2>
            <p>
              The Program is not directed to children under 18 and we do not knowingly
              collect information from minors. If you believe a child has provided us
              information, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Changes to This Policy</h2>
            <p>
              We may update this policy periodically. Material changes will be announced
              by email or by posting here with an updated &ldquo;Last updated&rdquo;
              date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">
                info@solivana.com
              </a>
              .
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
