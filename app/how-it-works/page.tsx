import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

export const metadata = {
  title: 'How It Works — The Foundation',
  description:
    'A 6-week phased protocol — Build the Foundation, The Cleanse, Protect & Rebuild. Daily structure, what each week looks like, and what to expect.',
};

const PHASE_DETAIL = [
  {
    label: 'Phase 1',
    weeks: 'Weeks 1–2',
    title: 'Build the Foundation',
    summary:
      'Open drainage. Repair the gut barrier. Establish minerals, hydration, and nervous-system base.',
    daily: [
      'Morning: water + minerals + 10 min movement + 5 min sunlight',
      'Mid-morning: drainage practice (castor oil pack, dry brushing, or coffee enema — depending on what your body tolerates)',
      'Afternoon: hydration check + lymph movement (rebound, walk, or sauna)',
      'Evening: nervous system wind-down — no screens 60 min before bed',
    ],
    expect: [
      'More frequent bowel movements',
      'Slightly more vivid dreams',
      'Some headaches in days 2–4 if drainage was sluggish',
      'Energy beginning to stabilize by end of Week 2',
    ],
  },
  {
    label: 'Phase 2',
    weeks: 'Weeks 3–4',
    title: 'The Cleanse',
    summary:
      'A gentle, supported herbal protocol. Daily binders. Phase 2 diet. The work landing.',
    daily: [
      'Same morning ritual as Phase 1',
      'Herbal antimicrobial layer — rotated through the two weeks',
      'Binders 30 minutes away from food, supplements, and coffee',
      'Phase 2 diet: stricter — no fermented foods this phase, no nightshades, no alcohol',
      'Sauna or sweat practice at least 3x/week',
    ],
    expect: [
      'A "healing response" window in days 3–6 of Week 3 — fatigue, mood shifts, vivid dreams',
      'Skin sometimes looks worse before it looks better',
      'Old emotional material can surface — this is normal',
      'By end of Week 4 most people report unfamiliar clarity',
    ],
  },
  {
    label: 'Phase 3',
    weeks: 'Weeks 5–6',
    title: 'Protect & Rebuild',
    summary:
      'Rebuild the gut. Reintroduce foods. Audit the home. Install maintenance.',
    daily: [
      'Probiotic reintroduction — specific strains, timed correctly',
      'Bone broth, collagen, glutamine daily',
      'Reduced herbal cleanse layer; drainage support continues',
      'Food reintroduction — one new food at a time, journaled',
      'Environmental audit — water, fragrance, mold, EMF, cookware',
    ],
    expect: [
      'Sleep deepens',
      'Foods that previously caused reactions can sometimes be tolerated again',
      'Steady, calm energy throughout the day',
      'A clear sense of which habits are now non-negotiable for you',
    ],
  },
];

const WEEK_BY_WEEK = [
  { w: 'Week 1', f: 'Drainage opens. Hydration, minerals, daily ritual.' },
  { w: 'Week 2', f: 'Binders introduced. Lymph movement scaled up. Office Hours #1.' },
  { w: 'Week 3', f: 'Cleanse begins. Phase 2 diet. Healing response window.' },
  { w: 'Week 4', f: 'Cleanse deepens. The middle that most programs lose people in. Office Hours #2.' },
  { w: 'Week 5', f: 'Rebuild begins. Probiotics. Fermented foods return.' },
  { w: 'Week 6', f: 'Maintenance design. Food reintroduction. Office Hours #3.' },
];

const SUPPORT = [
  {
    t: 'Personal Foundation Assessment',
    b: '24-question intake that scores your readiness and tells you which phase to lean on.',
  },
  {
    t: 'Daily Ritual Tracker',
    b: 'Habits, symptom scores, and energy patterns charted week over week. The single biggest predictor of success.',
  },
  {
    t: 'AI Companion (Phase 2 bonus)',
    b: 'A private assistant trained on Natasha\'s materials. Ask it anything, any hour. Won\'t replace office hours — keeps you from panicking at 2 a.m.',
  },
  {
    t: 'Office Hours with Natasha',
    b: 'Three live group calls during the program. Bring your specific situation. Recordings posted for replay.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-12">
        <div className="eyebrow mb-5">How It Works</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-6">
          Six weeks. Three phases. One sequence that respects how your body actually works.
        </h1>
        <p className="text-lg text-solivana-taupe leading-relaxed">
          The Foundation is not a 30-day cleanse. It&apos;s a phased rebuild. Below is
          exactly what each phase looks like, what your day looks like, and what to
          expect — including the uncomfortable parts.
        </p>
      </section>

      {/* Phases */}
      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="space-y-10">
            {PHASE_DETAIL.map((phase) => (
              <div
                key={phase.label}
                className="bg-white border border-solivana-sand/70 rounded-2xl p-7 md:p-10"
              >
                <div className="flex items-baseline gap-4 flex-wrap mb-2">
                  <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-3 py-1 rounded-full">
                    {phase.label}
                  </span>
                  <span className="eyebrow">{phase.weeks}</span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-solivana-bark mb-3">
                  {phase.title}
                </h2>
                <p className="text-solivana-taupe text-lg leading-relaxed mb-7">
                  {phase.summary}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div>
                    <div className="eyebrow mb-3">A Typical Day</div>
                    <ul className="space-y-2.5">
                      {phase.daily.map((d) => (
                        <li
                          key={d}
                          className="flex gap-3 text-solivana-bark leading-relaxed"
                        >
                          <span className="text-solivana-amber font-semibold mt-0.5">
                            ·
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="eyebrow mb-3">What to Expect</div>
                    <ul className="space-y-2.5">
                      {phase.expect.map((e) => (
                        <li
                          key={e}
                          className="flex gap-3 text-solivana-bark leading-relaxed"
                        >
                          <span className="text-solivana-amber font-semibold mt-0.5">
                            ·
                          </span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Week by week timeline */}
      <section className="border-t border-solivana-sand/40">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-5">The Six-Week Map</div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-solivana-bark mb-10">
            Week-by-week, at a glance.
          </h2>
          <div className="space-y-4">
            {WEEK_BY_WEEK.map((w, i) => (
              <div
                key={w.w}
                className="flex gap-5 items-start bg-white border border-solivana-sand/70 rounded-xl p-5"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-solivana-cream border border-solivana-sand flex items-center justify-center font-display font-semibold text-solivana-bark">
                  {i + 1}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-solivana-bark">
                    {w.w}
                  </div>
                  <p className="text-solivana-taupe leading-relaxed">{w.f}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support included */}
      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-5">The Support That Comes With It</div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-solivana-bark mb-10 max-w-2xl">
            You don&apos;t do this alone.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SUPPORT.map((s) => (
              <div
                key={s.t}
                className="bg-white border border-solivana-sand/70 rounded-xl p-6"
              >
                <h3 className="font-display text-xl font-semibold text-solivana-bark mb-2">
                  {s.t}
                </h3>
                <p className="text-solivana-taupe leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance / safety statement */}
      <section className="border-t border-solivana-sand/40">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-5">A Word on Safety</div>
          <div className="space-y-4 text-solivana-taupe leading-relaxed text-lg">
            <p>
              The Foundation is designed to be gentle. The single most important video
              in the entire program is &ldquo;When to Slow Down&rdquo; in Module 3.6 —
              it teaches the two clear signs that mean you should pause your protocol,
              and the 48-hour reset that puts you safely back on track.
            </p>
            <p>
              You will never lose progress by slowing down. You can lose progress by
              pushing through something your body is asking you to pause for.
            </p>
            <p className="text-solivana-bark font-medium">
              This is an educational program. It is not medical advice. If you are
              pregnant, nursing, taking prescription medications, or managing a chronic
              health condition, consult your physician before beginning.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-solivana-bark mb-5">
            Ready to begin?
          </h2>
          <p className="text-solivana-taupe text-lg mb-8 max-w-xl mx-auto">
            $299, one payment, lifetime access. The first thing you do is take the
            assessment.
          </p>
          <a
            href="/enroll"
            className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-10 py-5 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
          >
            Enroll Now →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
