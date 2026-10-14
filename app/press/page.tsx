import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

export const metadata = {
  title: 'Press Kit — The Foundation',
  description:
    'Press kit for The Foundation by Natasha Berness — bio, program details, brand assets, and contact for media inquiries.',
};

export default function PressPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <SiteTopBar />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <div className="eyebrow mb-5">Press Kit</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-6">
          For media + partnership inquiries.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          The essentials, in one place. For interviews, podcast invites, retreat
          collaborations, and editorial features. Email{' '}
          <a
            href="mailto:partnerships@solivana.com"
            className="underline decoration-solivana-amber hover:text-solivana-bark"
          >
            partnerships@solivana.com
          </a>
          .
        </p>
      </section>

      {/* Founder bio */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-4">Founder Bio</div>
          <h2 className="font-display text-3xl font-light text-solivana-bark mb-8 leading-tight">
            Natasha Berness · Wellness Expert &amp; Holistic Coach
          </h2>
          <div className="space-y-5 text-solivana-taupe leading-[1.75] text-[16px]">
            <p>
              <strong className="text-solivana-bark">Short bio (50 words).</strong>{' '}
              Natasha Berness is the founder of SoliVana Wellness in Redwood City,
              California. She is a holistic coach and educator focused on
              foundational wellness, bioenergetics, and the sequence the body
              actually needs to detoxify safely. Her work bridges contemporary
              functional wellness with classical terrain-based principles.
            </p>
            <p>
              <strong className="text-solivana-bark">Long bio (150 words).</strong>{' '}
              Natasha Berness is the founder of SoliVana Wellness in Redwood City,
              California, and the creator of The Foundation — a 6-week educational
              wellness program built around the sequence she walks 1:1 clients
              through before any serious cleanse. Her work integrates REST Floating
              Therapy, contrast therapy, halotherapy, infrared and red light therapy,
              pressotherapy, and bioenergetic scanning into a coherent practice
              focused on terrain — the underlying conditions that determine whether
              the body can actually heal. She has coached more than 1,000 clients
              over the past decade, with a particular focus on women in their 30s
              through 60s who have been told their lab work is &ldquo;normal&rdquo;
              while feeling far from well. The Foundation makes her sequence
              accessible to anyone, anywhere, in a self-paced format with live
              office hours and an AI companion trained on her materials.
            </p>
          </div>
        </div>
      </section>

      {/* Program details */}
      <section className="bg-solivana-warm">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-4">The Foundation · Quick Facts</div>
          <h2 className="font-display text-3xl font-light text-solivana-bark mb-8 leading-tight">
            One-page program summary.
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-[15.5px]">
            {[
              ['Product', 'The Foundation — 6-Week Educational Wellness Program'],
              ['Founded', 'Spring 2026, by Natasha Berness'],
              ['Format', 'Online, self-paced, with three live group office hours'],
              ['Length', 'Six weeks · three phases (Build, Cleanse, Rebuild)'],
              ['Price', '$299 · one payment · lifetime access'],
              ['Domain', 'foundation.solivana.ai'],
              ['Parent Brand', 'SoliVana Wellness (Redwood City, CA)'],
              ['Audience', 'Adults seeking a structured, gentle parasite cleanse with proper preparation and rebuild phases'],
              ['Components', '24-question Foundation Assessment · 6-week protocol · Diet Blueprint (3 phases) · Daily Ritual Tracker · AI Companion · Healing Response Guide · Environmental Audit · Family/Pet Protocol · 3 live office hours · Lifetime access'],
              ['Compliance', 'Educational only · not medical advice · not FDA-evaluated · not intended to diagnose, treat, cure, or prevent any disease'],
            ].map(([label, val]) => (
              <div key={label} className="contents">
                <dt className="font-accent tracking-wider uppercase text-xs text-solivana-taupe pt-1">
                  {label}
                </dt>
                <dd className="text-solivana-bark leading-relaxed mb-3 md:mb-0">
                  {val}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Brand assets */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-4">Brand Assets</div>
          <h2 className="font-display text-3xl font-light text-solivana-bark mb-8 leading-tight">
            Logos, colors, photography.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="card-flat p-6">
              <h3 className="font-display text-lg font-medium text-solivana-bark mb-3">
                Color Palette
              </h3>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[
                  { hex: '#1F1208', name: 'Ink' },
                  { hex: '#331D01', name: 'Bark' },
                  { hex: '#EC9247', name: 'Amber' },
                  { hex: '#786455', name: 'Taupe' },
                  { hex: '#F6F1EC', name: 'Warm' },
                ].map((c) => (
                  <div key={c.hex} className="text-center">
                    <div
                      className="w-full aspect-square rounded mb-1.5 border border-solivana-sand/40"
                      style={{ background: c.hex }}
                    />
                    <div className="text-[10px] font-accent tracking-wider uppercase text-solivana-taupe">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-solivana-taupe">{c.hex}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-flat p-6">
              <h3 className="font-display text-lg font-medium text-solivana-bark mb-3">
                Typography
              </h3>
              <ul className="space-y-2 text-sm text-solivana-bark">
                <li><strong>Display</strong>: Jost (Google Fonts)</li>
                <li><strong>Body</strong>: Montserrat (Google Fonts)</li>
                <li><strong>Accent</strong>: Poppins (Google Fonts)</li>
                <li><strong>Editorial / italic</strong>: Cormorant Garamond</li>
              </ul>
            </div>
          </div>

          <div className="card-flat p-6">
            <h3 className="font-display text-lg font-medium text-solivana-bark mb-3">
              Logo &amp; Photography Downloads
            </h3>
            <p className="text-solivana-taupe leading-relaxed mb-4">
              High-resolution logos (PNG + SVG), founder portraits, and lifestyle
              imagery available on request. Email{' '}
              <a
                href="mailto:partnerships@solivana.com"
                className="underline decoration-solivana-amber"
              >
                partnerships@solivana.com
              </a>{' '}
              with the publication name and intended use; we&apos;ll send a Dropbox
              link within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Sample pull-quotes */}
      <section className="bg-solivana-warm">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-4">Sample Pull Quotes</div>
          <h2 className="font-display text-3xl font-light text-solivana-bark mb-8 leading-tight">
            Quotable lines, in Natasha&apos;s voice.
          </h2>
          <div className="space-y-5">
            {[
              'You don\'t have a parasite problem. You have a foundation problem.',
              'You cannot cleanse what your foundation cannot support.',
              'The aggressive parasite cleanses on the internet are most dangerous for the people who need them most.',
              'I have never seen a real, lasting recovery happen in 30 days. Six weeks is the floor. A year is normal.',
              'Slowing down is never failure. You can lose progress by pushing through something your body asked you to pause for.',
            ].map((q, i) => (
              <blockquote
                key={i}
                className="border-l-4 border-solivana-amber pl-6 py-2 serif text-xl italic font-light text-solivana-ink leading-snug"
              >
                &ldquo;{q}&rdquo;
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
          <div className="eyebrow mb-4">Contact</div>
          <h2 className="font-display text-3xl font-light text-solivana-bark mb-6 leading-tight">
            For media + partnerships.
          </h2>
          <a href="mailto:partnerships@solivana.com" className="btn-primary mb-4">
            partnerships@solivana.com
          </a>
          <p className="text-solivana-taupe leading-relaxed">
            Most replies within one business day.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
