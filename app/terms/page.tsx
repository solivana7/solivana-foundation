import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

const LAST_UPDATED = 'April 22, 2026';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="eyebrow mb-5">Legal</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-solivana-taupe mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose-legal space-y-8 text-solivana-bark leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By enrolling in, accessing, or using The Foundation program
              (&ldquo;Program&rdquo;) or the website at foundation.solivana.ai
              (&ldquo;Site&rdquo;), you agree to be bound by these Terms of Service. If
              you do not agree, do not enroll or use the Site.
            </p>
            <p className="mt-3">
              These Terms are entered into between you and SoliVana Wellness (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;SoliVana&rdquo;), located at 1922 El Camino Real,
              Redwood City, California.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">2. The Program</h2>
            <p>
              The Foundation is a 6-week educational wellness program consisting of video
              modules, written guides, printable PDFs, an educational assessment, a
              progress tracker, live group office hours, and supplementary materials. The
              Program is delivered digitally and requires internet access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">3. Eligibility</h2>
            <p>
              You must be at least 18 years old to enroll. By enrolling, you represent
              that you are 18 or older, legally able to enter into this agreement, and
              that all information you provide is accurate.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">4. Educational Purpose · Not Medical Advice</h2>
            <p className="font-medium">
              The Program is educational only. Nothing in the Program constitutes
              medical, nutritional, psychological, or professional advice.
            </p>
            <p className="mt-3">
              The Program is not intended to diagnose, treat, cure, or prevent any
              disease. Statements about supplements, foods, or protocols have not been
              evaluated by the U.S. Food and Drug Administration. You agree to consult a
              qualified healthcare provider before beginning any cleanse, supplement, or
              dietary protocol — especially if you are pregnant, nursing, taking
              medications, or managing a chronic health condition.
            </p>
            <p className="mt-3">
              Natasha Berness is a wellness educator and holistic coach. She is not a
              licensed physician, dietitian, or other medical professional, and no
              doctor–patient relationship is created by enrollment or participation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">5. Payment and Refunds</h2>
            <p>
              The Program is sold for a one-time payment of $299 USD. Payment is processed
              by a third-party payment processor under that processor&apos;s terms.
              Refunds are governed by our{' '}
              <a href="/refunds" className="underline decoration-solivana-amber">
                Refund Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">6. Your Account and Access</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activity that occurs under your account. You agree
              to notify us immediately of any unauthorized access.
            </p>
            <p className="mt-3">
              Access is granted for your personal, non-commercial use. Lifetime access
              means access for as long as the Program is offered. If we discontinue the
              Program, we will provide at least 60 days&apos; notice and make the
              materials available for download where reasonable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">7. Intellectual Property</h2>
            <p>
              All content in the Program — including videos, PDFs, audio, graphics,
              written materials, and course structure — is the intellectual property of
              SoliVana Wellness and/or Natasha Berness. You are granted a non-exclusive,
              non-transferable, revocable license to access the content for personal use
              only.
            </p>
            <p className="mt-3">
              You may not: copy, redistribute, rebroadcast, sell, license, or create
              derivative works from the content; share your login credentials; download
              and redistribute materials outside the platform; or use the content to
              compete with SoliVana.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">8. Your Content</h2>
            <p>
              If you submit questions, feedback, or content during office hours or
              through the platform, you grant SoliVana a worldwide, royalty-free license
              to use that content to improve the Program, answer other members&apos;
              questions, and create educational materials — with your name redacted
              unless you consent otherwise.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">9. Prohibited Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Program in a way that violates any applicable law or regulation</li>
              <li>Harass, abuse, or defame other members or the Program staff</li>
              <li>Attempt to gain unauthorized access to accounts, systems, or content</li>
              <li>Scrape, spider, or bulk-download Program content</li>
              <li>Use the Program to provide medical advice to others</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">10. Disclaimers</h2>
            <p className="uppercase text-sm tracking-wide">
              The Program is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              without warranties of any kind, express or implied, including but not
              limited to warranties of merchantability, fitness for a particular purpose,
              non-infringement, or accuracy. We do not warrant that the Program will meet
              your expectations, be uninterrupted, or produce any particular health
              outcome.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">11. Limitation of Liability</h2>
            <p className="uppercase text-sm tracking-wide">
              To the fullest extent permitted by law, SoliVana, Natasha Berness, and their
              affiliates will not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the Program.
              Our total cumulative liability for any claim arising from these Terms shall
              not exceed the amount you paid for the Program.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">12. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless SoliVana, Natasha Berness, and
              their affiliates from any claim, loss, liability, or expense (including
              reasonable attorneys&apos; fees) arising from your use of the Program or
              your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">13. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the State of California, without
              regard to conflict-of-law principles. Any dispute arising from these Terms
              shall first be attempted to be resolved through good-faith negotiation. If
              unresolved within 30 days, the dispute shall be submitted to binding
              arbitration in San Mateo County, California, under the rules of the
              American Arbitration Association. You waive the right to participate in any
              class action.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">14. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be
              communicated by email or by posting on this page with an updated &ldquo;Last
              updated&rdquo; date. Continued use of the Program after changes constitutes
              acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold mb-3">15. Contact</h2>
            <p>
              Questions about these Terms? Email{' '}
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
