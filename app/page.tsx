import { SiteTopBar } from './components/SiteTopBar';
import { SiteFooter } from './components/SiteFooter';

const CTA_HREF = '/enroll';

const STATS = [
  { n: '300+', l: 'Clients Coached' },
  { n: '6 Weeks', l: 'Phased Protocol' },
  { n: 'Lifetime', l: 'Access · One Payment' },
];

const PHASES = [
  {
    weeks: 'Weeks 1–2',
    title: 'Build the Foundation',
    body:
      'Open drainage. Repair the gut barrier. Establish minerals, hydration, and the nervous-system base that lets your body actually process what comes next.',
    keys: ['Drainage support', 'Gut barrier prep', 'Mineral & hydration foundation'],
  },
  {
    weeks: 'Weeks 3–4',
    title: 'The Cleanse',
    body:
      'A gentle, phased herbal protocol that works with your body — not against it. Daily binders, diet shifts, symptom tracking. Nothing improvised.',
    keys: ['Phased herbal protocol', 'Binders + diet anchors', 'Healing-response navigation'],
  },
  {
    weeks: 'Weeks 5–6',
    title: 'Protect & Rebuild',
    body:
      'Rebuild the gut. Audit the environment. Install the maintenance habits so the foundation you just built doesn\'t erode in 90 days.',
    keys: ['Probiotic + food reintroduction', 'Environmental audit', 'Lifelong maintenance design'],
  },
];

const INCLUDES = [
  {
    title: 'Personal Foundation Assessment',
    tag: 'Interactive',
    body:
      'A 24-question intake that scores your current detox capacity and maps your starting point. A real readiness plan — not a generic quiz.',
  },
  {
    title: 'The 6-Week Protocol',
    tag: 'Video',
    body: 'Short, phased video modules. No 40-page PDFs. Watch today\'s. Do today\'s. Move on.',
  },
  {
    title: 'The Foundation Diet Blueprint',
    tag: 'Guide',
    body: 'Exactly what to eat in each phase, and why. Not another elimination diet.',
  },
  {
    title: 'Daily Ritual Tracker',
    tag: 'Interactive',
    body: 'Habits, symptom scores, and energy patterns charted week over week. The single biggest predictor of success.',
  },
  {
    title: 'The AI Companion',
    tag: 'AI · Interactive',
    body: 'A private AI assistant trained on Natasha\'s materials. Available 24/7. It is an AI tool, not Natasha — and it won\'t replace office hours, but it will keep you from panicking at 2 a.m.',
  },
  {
    title: 'The Healing Response Guide',
    tag: 'Reference',
    body: 'Week-by-week expectations and the difference between "this is working" and "this is too much."',
  },
  {
    title: 'The Environmental Audit',
    tag: 'Reference',
    body: 'Five things in your home that quietly undo every cleanse — and the simple swaps that protect your work.',
  },
  {
    title: 'Family & Pet Protocol',
    tag: 'Reference',
    body: 'Because reinfection is almost always living in your own house.',
  },
  {
    title: 'Bi-Weekly Office Hours',
    tag: 'Live · 8 Seats',
    body: 'Three live group calls during the protocol — capped at 8 live seats so the room stays intimate and your question actually gets answered. Recordings posted for replay if the room is full.',
  },
  {
    title: 'Lifetime Access',
    tag: 'Forever',
    body: 'Run it again next year. Pass it to your kids in ten. The materials are yours.',
  },
];

const FOR_YOU = [
  'You feel off, and the labs keep coming back "normal."',
  'You\'ve tried a cleanse before and it made you feel worse.',
  'You\'ve read scary things online about parasite cleanses and want one that\'s actually safe.',
  'You have three or more of: fatigue, brain fog, sugar cravings, mood swings, digestive issues, skin flare-ups, or sleep that won\'t repair.',
  'You\'re ready to do the work — but only once, and only in a way that lasts.',
];

const NOT_FOR_YOU = [
  'You\'re pregnant, nursing, or trying to conceive.',
  'You\'re on prescription medications and haven\'t cleared a cleanse with your physician.',
  'You\'re looking for a 3-day detox with dramatic before/after photos.',
  'You want someone to promise you this will cure a disease. No one can.',
];

export default function Home() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <SiteTopBar />

      {/* Hero — asymmetric, premium */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — headline */}
            <div className="lg:col-span-7">
              <div className="text-[11px] font-accent tracking-[0.32em] uppercase text-solivana-amber mb-7">
                The Foundation · A 6-Week Educational Program
              </div>
              <h1 className="display-h1 text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] mb-8 text-solivana-ink">
                You don&apos;t have a parasite problem.
                <br />
                <em>You have a foundation problem.</em>
              </h1>
              <p className="serif text-xl md:text-2xl leading-snug text-solivana-taupe mb-10 max-w-xl font-light">
                Most cleanses fail not because the protocol is wrong — but because nobody
                prepared the body first. Six weeks. Three phases. The sequence that
                respects how your body actually works.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href={CTA_HREF} className="btn-primary">
                  Begin Your Foundation
                </a>
                <a href="#how" className="btn-secondary">
                  How it Works
                </a>
              </div>
              <div className="mt-7 text-sm text-solivana-taupe">
                <span className="text-solivana-ink font-semibold">$299</span> · one
                payment · lifetime access · 14-day refund window
              </div>
              <div className="mt-3 text-[11px] font-accent tracking-[0.22em] uppercase text-solivana-amber">
                Next Cohort Begins · Second Tuesday of Each Month
              </div>
            </div>

            {/* Right — pull quote */}
            <div className="lg:col-span-5 lg:pt-10">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -top-8 -left-2 text-7xl font-light text-solivana-amber/40 serif leading-none"
                >
                  &ldquo;
                </div>
                <div className="border-l-2 border-solivana-amber pl-7 py-3 ml-3">
                  <p className="serif text-2xl md:text-[1.7rem] leading-[1.35] text-solivana-ink italic font-light mb-7">
                    Most people running a parasite cleanse haven&apos;t done a single
                    day of preparation. That&apos;s why they feel worse, not better.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-solivana-amber to-solivana-bark flex items-center justify-center text-white font-display font-medium">
                      N
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-solivana-ink">
                        Natasha Berness
                      </div>
                      <div className="text-[10px] text-solivana-taupe font-accent tracking-[0.22em] uppercase">
                        Holistic Coach · SoliVana Founder
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat row */}
      <section className="border-y border-solivana-sand/30 bg-white/50">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.n}
              className={`text-center md:px-6 ${
                i < STATS.length - 1 ? 'md:border-r md:border-solivana-sand/40' : ''
              }`}
            >
              <div className="font-display text-5xl md:text-6xl font-light text-solivana-ink mb-2 tracking-tight">
                {s.n}
              </div>
              <div className="eyebrow">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The Case — single column, editorial */}
      <section className="bg-solivana-warm">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="eyebrow mb-6">The Case</div>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-ink mb-12 max-w-2xl">
            Here&apos;s what the internet isn&apos;t telling you.
          </h2>
          <div className="space-y-7 text-lg leading-[1.75] text-solivana-taupe">
            <p>
              The reason most cleanses fail — or worse, make people feel sicker for
              months afterward — isn&apos;t the cleanse itself. It&apos;s that nobody
              built the foundation first.
            </p>
            <p>
              Your body has detox pathways. A liver that processes. A lymph system that
              drains. A gut lining that decides what enters your bloodstream and what
              gets walked out the back door.
            </p>
            <p>
              When any of those systems is running below capacity, a cleanse doesn&apos;t
              clean you out.{' '}
              <strong className="text-solivana-ink font-semibold">
                It floods an already-overwhelmed system with the toxic byproducts of
                dying organisms.
              </strong>
            </p>
            <p>
              When parasites die — and they do die during a cleanse — they release
              accumulated waste, heavy metals, and biotoxins into your system at once.
              If your drainage isn&apos;t open, your liver isn&apos;t supported, and
              your gut isn&apos;t resilient, your body cannot keep up. That&apos;s when
              people feel sick for weeks after a cleanse, develop new sensitivities, or
              quietly give up halfway through.
            </p>
            <p className="text-solivana-ink font-medium serif text-2xl italic leading-snug pt-2">
              So when the questions kept coming, I built them a protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Phases — premium card variant */}
      <section id="how" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <div className="eyebrow mb-5">The Method</div>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-ink">
              Three phases. Six weeks. One sequence that holds.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {PHASES.map((phase, i) => (
              <article
                key={phase.title}
                className="card-soft p-8 md:p-9 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-7">
                  <span className="font-display text-5xl font-extralight text-solivana-amber leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow text-solivana-taupe">{phase.weeks}</span>
                </div>
                <h3 className="font-display text-2xl md:text-[1.65rem] font-medium text-solivana-ink mb-4 leading-tight">
                  {phase.title}
                </h3>
                <p className="text-solivana-taupe leading-relaxed mb-6 flex-1">
                  {phase.body}
                </p>
                <ul className="space-y-2 pt-5 border-t border-solivana-sand/40">
                  {phase.keys.map((k) => (
                    <li
                      key={k}
                      className="flex gap-3 text-sm text-solivana-ink/80"
                    >
                      <span aria-hidden="true" className="text-solivana-amber">
                        ◆
                      </span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <div className="eyebrow mb-5">What You Get</div>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-ink">
              Ten components. Built as a single, coherent system.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INCLUDES.map((item, i) => (
              <div
                key={item.title}
                className="card-flat p-6 md:p-7 flex gap-5 hover:border-solivana-amber/50 transition-colors"
              >
                <div
                  aria-hidden="true"
                  className="shrink-0 font-display text-2xl font-extralight text-solivana-amber/70 leading-none w-10"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-display text-lg font-medium text-solivana-ink">
                      {item.title}
                    </h3>
                    <span className="text-[9px] font-accent tracking-[0.22em] uppercase text-solivana-taupe bg-solivana-cream/80 border border-solivana-sand/50 px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-solivana-taupe leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For / Not For — refined */}
      <section className="bg-solivana-warm">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="eyebrow mb-6 text-solivana-amber">This Is For You If</div>
              <ul className="space-y-5">
                {FOR_YOU.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-solivana-ink leading-relaxed text-[1.05rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-solivana-amber"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-10 md:border-l md:border-solivana-sand/40">
              <div className="eyebrow mb-6 text-solivana-taupe">This Is Not For You If</div>
              <ul className="space-y-5">
                {NOT_FOR_YOU.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-solivana-taupe leading-relaxed text-[1.05rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-solivana-sand"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials placeholder — slots fill in as testimonials come in */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="eyebrow mb-5 text-solivana-amber">From the Founding Cohort</div>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-ink mb-12 max-w-3xl">
            What members are saying.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* TODO: replace with real testimonials post-launch. Current entries
                are placeholder voices for layout. Include written release before
                publishing real ones. Format: 1–2 sentence quote + first name + city. */}
            {[
              {
                quote:
                  '"I expected another cleanse. What I got was the first program that explained what was happening in my body week by week — and stopped me from undoing the work."',
                name: 'Megan',
                place: 'San Francisco, CA',
              },
              {
                quote:
                  '"By Week 4 I had energy I hadn\'t felt since my twenties. The honest part: Weeks 2 and 3 were hard. Natasha kept me from quitting."',
                name: 'David',
                place: 'Palo Alto, CA',
              },
              {
                quote:
                  '"The Healing Response Guide alone is worth the price. I finally knew what was normal and what wasn\'t. No more 2 a.m. spirals."',
                name: 'Priya',
                place: 'Mountain View, CA',
              },
            ].map((t, i) => (
              <blockquote key={i} className="card-soft p-7 flex flex-col">
                <p className="serif text-lg italic font-light text-solivana-ink leading-snug flex-1 mb-5">
                  {t.quote}
                </p>
                <footer className="pt-4 border-t border-solivana-sand/40">
                  <div className="text-sm font-medium text-solivana-bark">{t.name}</div>
                  <div className="text-xs text-solivana-taupe font-accent tracking-wider uppercase">
                    {t.place}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="mt-8 text-xs text-solivana-taupe">
            Placeholder voices shown for layout. Verified testimonials post after
            Week 6 of the founding cohort with each member&apos;s written consent.
          </p>
        </div>
      </section>

      {/* About Natasha */}
      <section className="bg-solivana-warm">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Founder portrait — drop in next/image src once asset is ready */}
            <div className="md:col-span-5">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-solivana-amber/30 via-solivana-sand/40 to-solivana-bark/20 border border-solivana-sand/40 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-center p-6">
                  <div className="text-center text-solivana-bark/60 text-xs font-accent tracking-[0.22em] uppercase">
                    Founder Portrait
                  </div>
                </div>
              </div>
              {/* TODO: replace the placeholder above with:
                <Image src="/natasha.jpg" alt="Natasha Berness" width={640} height={800}
                  className="aspect-[4/5] rounded-2xl object-cover shadow-xl" />
              */}
            </div>
            <div className="md:col-span-7">
          <div className="eyebrow mb-6">Meet Your Coach</div>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-ink mb-10">
            I&apos;m Natasha — wellness expert and holistic coach.
          </h2>
          <div className="space-y-6 text-lg leading-[1.75] text-solivana-taupe">
            <p>
              I&apos;m the co-founder and Wellness Director of SoliVana Wellness in
              Redwood City, California. Twenty-five years of holistic study, eight
              healing modalities mastered, and a former life in Silicon Valley
              executive roles — the kind that taught me what chronic stress actually
              costs the body.
            </p>
            <p>
              My credentials are Holistic Wellness Coach, Certified Advanced
              Ayurvedic Practitioner, Master Biofield Tuning &amp; Reiki Energy
              Healer, and Certified Bioenergetic Energy Medicine Practitioner. I&apos;m
              also a member of the American Academy of Anti-Aging Medicine. Every
              modality at SoliVana was earned before it was offered.
            </p>
            <p>
              The therapies I built SoliVana around — REST Floating Therapy, Fire
              &amp; Ice Contrast Therapy (infrared sauna and cold plunge),
              halotherapy, and red light therapy — bridge science and the deeper
              work. I coach people who know something is off, who&apos;ve been told
              their labs are &ldquo;normal&rdquo; while they can barely get through
              the day, and I help them do the work in the right order so it actually
              holds.
            </p>
            <p className="text-solivana-ink font-medium">
              The Foundation is the program I wish every client had run before they
              came to me burnt out from a cleanse that went sideways.
            </p>
            <div className="pt-4">
              <a href="/about" className="btn-secondary">
                More About Natasha
              </a>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — premium treatment */}
      <section className="relative bg-solivana-ink text-solivana-cream overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background:
              'radial-gradient(ellipse 800px 400px at 30% 0%, rgba(236, 146, 71, 0.6), transparent 60%), radial-gradient(ellipse 600px 400px at 80% 100%, rgba(236, 146, 71, 0.4), transparent 60%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="md:col-span-7">
              <div className="eyebrow mb-5 text-solivana-amber">The Offer</div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.1] mb-6 text-solivana-cream">
                The Foundation
              </h2>
              <p className="text-solivana-cream/70 text-lg mb-8 leading-relaxed">
                6 weeks · 3 phases · 10 components · 3 live office hours · lifetime
                access.
              </p>
              <p className="text-solivana-cream/70 leading-relaxed mb-8">
                I&apos;m not promising miracles. I&apos;m telling you that if you&apos;re
                going to do this work, do it in a way that respects how your body
                actually functions — and do it with someone who has walked this sequence
                thousands of times.
              </p>
              <p className="serif italic text-2xl text-solivana-amber mb-2">
                The door is open.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="bg-solivana-cream text-solivana-ink rounded-2xl p-8 md:p-10 shadow-2xl">
                <div className="eyebrow mb-3">One Payment</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display text-7xl font-extralight tracking-tight text-solivana-ink leading-none">
                    $299
                  </span>
                </div>
                <div className="text-sm text-solivana-taupe mb-7">
                  No upsells. No auto-renew. No subscription.
                </div>
                <ul className="space-y-2.5 mb-8 text-sm">
                  {[
                    'Lifetime access — run it again next year',
                    '14-day full refund window',
                    'Three live office hours included',
                    'Foundation Assessment + Daily Tracker',
                  ].map((b) => (
                    <li key={b} className="flex gap-3 text-solivana-ink/85">
                      <span aria-hidden="true" className="text-solivana-amber">
                        ◆
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a href={CTA_HREF} className="btn-primary w-full text-center">
                  Begin Your Foundation
                </a>
                <div className="mt-4 text-center text-[10px] text-solivana-taupe font-accent tracking-[0.22em] uppercase">
                  Secure Checkout · Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
