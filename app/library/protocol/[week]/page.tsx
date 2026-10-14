import { notFound } from 'next/navigation';
import { LibraryTopBar } from '../../components/LibraryTopBar';
import { SiteFooter } from '../../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../../components/LessonQuiz';
import { Checklist } from '../../components/Checklist';
import { DownloadButton } from '../../components/DownloadActions';

const WEEK_QUIZZES: Record<string, QuizQuestion[]> = {
  '1': [
    {
      q: 'What is the single focus of Week 1?',
      options: ['Killing parasites', 'Drainage', 'Cutting all calories', 'Maximum supplement loading'],
      correctIndex: 1,
      explanation: 'Week 1 is drainage. Bowels, urine, sweat, breath, lymph. Nothing comes out unless these are flowing — so we open them before anything else.',
    },
    {
      q: 'A member with three bowel movements a day already, sweating regularly, and steady sleep is doing Week 1. How should they expect it to feel?',
      options: ['Like a tune-up rather than a major rebuild', 'Like the hardest week of their life', 'Identical to someone with sluggish drainage', 'Like a fast'],
      correctIndex: 0,
      explanation: 'Week 1 scales to where you start. Strong drainage already? It will feel like a tune-up. Sluggish drainage? It is the whole game — do not rush it.',
    },
  ],
  '2': [
    {
      q: 'Why are binders introduced in Week 2 (not earlier)?',
      options: [
        'Because they taste bad and we want to delay them',
        'Drainage needs to be flowing first; binders without drainage cause backup',
        'They only work after 7 days of foundation',
        'They are for emergencies only',
      ],
      correctIndex: 1,
      explanation: 'Binders pick up what the liver drops into the gut. If your bowels are not moving, binders sit and reabsorb. Drainage first, then binders.',
    },
    {
      q: 'Binder timing rule:',
      options: [
        'Take with food for absorption',
        '30 minutes away from food, supplements, AND coffee',
        'Take before bed',
        'Take only on empty stomach in morning',
      ],
      correctIndex: 1,
      explanation: 'Binders are non-selective. Taken too close to food or supplements, they bind those nutrients too. 30-min spacing is non-negotiable.',
    },
  ],
  '3': [
    {
      q: 'What single video should be watched BEFORE taking any new herb on Day 1 of Week 3?',
      options: [
        'The diet blueprint',
        'Module 3.1 (What to Expect This Phase) and 3.6 (When to Slow Down)',
        'The bioenergetics overview',
        'The press kit',
      ],
      correctIndex: 1,
      explanation: 'Phase 2 has the highest healing-response load of the program. Watching the safety lessons before starting protects you from confusion if symptoms arise.',
    },
    {
      q: 'Phase 2 dietary changes include:',
      options: [
        'No fermented foods, no nightshades, no alcohol',
        'Adding fermented foods aggressively',
        'Eating only raw foods',
        'Skipping breakfast',
      ],
      correctIndex: 0,
      explanation: 'Counter-intuitively, fermented foods come OUT in Phase 2 (let the binders work). Nightshades come out (lower inflammation). Alcohol is fully out. Bitter herbs come in.',
    },
    {
      q: 'A member feels mild fatigue and a low-grade headache responding to water + minerals on Day 4. This is:',
      options: ['A red-zone signal', 'A yellow-zone signal requiring slowdown', 'A green-zone signal — keep going', 'A reason to stop the protocol'],
      correctIndex: 2,
      explanation: 'That cluster is classic green zone — the work landing. Yellow is when the headache does NOT respond to water + minerals after 2 hours, or fatigue prevents daily activities.',
    },
  ],
  '4': [
    {
      q: 'Week 4 is described as:',
      options: [
        'The easiest week',
        'The deep middle — where most programs lose people',
        'A week off',
        'Time to re-introduce all foods',
      ],
      correctIndex: 1,
      explanation: 'The middle of any healing work is unglamorous. The work has gone quiet. Members who recognize this is a feature, not a failure, complete the program at higher rates.',
    },
    {
      q: 'If a Week 4 member starts hitting yellow-zone signals at full dose, the right move is:',
      options: [
        'Push through to maintain results',
        'Stop the protocol entirely',
        'Drop herbs to half-dose for 48 hrs, double water + minerals, add binder 2x',
        'Skip ahead to Week 5',
      ],
      correctIndex: 2,
      explanation: 'Slowing down is never failure. The 48-hour reset protocol is the safe response. You will never lose progress by pulling back; you can lose progress by pushing through.',
    },
  ],
  '5': [
    {
      q: 'Why do we wait until Week 5 — not earlier — to introduce probiotics?',
      options: [
        'Probiotics are expensive and we save them for last',
        'During the cleanse, the gut environment is shifting and probiotics seed best after the major herbal layer winds down',
        'Probiotics never matter',
        'We do not wait — they go in Week 1',
      ],
      correctIndex: 1,
      explanation: 'Probiotics in Phase 2 get caught up in the herbal layer and binder load. Phase 3 is where they take and seed.',
    },
    {
      q: 'Phase 3 staple foods include:',
      options: [
        'Bone broth daily, collagen, fermented foods returning, prebiotic-rich produce',
        'Only raw smoothies',
        'Carnivore protocol',
        'Liquid fast for one week',
      ],
      correctIndex: 0,
      explanation: 'The rebuild phase is gut-priming and seeding. Bone broth, collagen, prebiotics (onion, garlic, leeks, asparagus), and now-tolerated fermented foods are the core.',
    },
  ],
  '6': [
    {
      q: 'What is the recommended food reintroduction cadence in Week 6?',
      options: [
        'Add everything back at once on Day 1',
        'One new food every 3 days, journal reactions for 48 hours',
        'Stay strict on Phase 2 diet permanently',
        'Add foods only after 30 days post-program',
      ],
      correctIndex: 1,
      explanation: 'One food every 3 days lets you actually identify reactions. Adding multiple at once means you cannot tell which food caused what — a wasted reintroduction.',
    },
    {
      q: 'Order of reintroduction (most recommended):',
      options: [
        'Gluten first, then dairy, then nightshades',
        'Nightshades, then dairy (if you tolerate), then gluten last',
        'Reintroduce alphabetically',
        'Only reintroduce foods you crave',
      ],
      correctIndex: 1,
      explanation: 'Nightshades first because they are most commonly tolerated again. Dairy next, optional. Gluten last — many people discover they tolerate it less than they thought.',
    },
    {
      q: 'After Week 6, the most-skipped element that members should NOT skip is:',
      options: [
        'Maintenance design — building the daily practice that holds the work',
        'The final office hour',
        'Posting on social media',
        'Buying more supplements',
      ],
      correctIndex: 0,
      explanation: 'Maintenance is what makes the difference between a 6-week experience and a permanent shift. Without it, most cleanses unwind within 90 days.',
    },
  ],
};

interface PageProps {
  params: Promise<{ week: string }>;
}

type Lesson = {
  num: string;
  title: string;
  duration: string;
  body: string;
  // TODO: Replace with real Vimeo/YouTube unlisted video URLs as Natasha records them.
  videoUrl?: string;
  pdfUrl?: string;
};

type Week = {
  n: number;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3';
  title: string;
  intent: string;
  lessons: Lesson[];
  daily: string[];
};

const WEEKS: Record<string, Week> = {
  '1': {
    n: 1,
    phase: 'Phase 1',
    title: 'Open the Drainage',
    intent:
      'This week is about exits. Bowels, urine, sweat, breath, lymph. Nothing comes out unless these are flowing — so before we ask anything else of your body, we make sure it can let go.',
    lessons: [
      {
        num: '2.1',
        title: 'Week 1 Protocol — Daily Rhythm',
        duration: '12 min',
        body:
          'Walk through the morning ritual, the drainage practice, and the daily structure. Watch this on Day 1, then refer back as needed.',
      },
      {
        num: '2.4',
        title: 'Morning & Evening Rituals',
        duration: '6 min',
        body:
          'Specific rituals: water + minerals + sunlight + movement + breath in the morning; wind-down protocol in the evening.',
      },
      {
        num: '2.5',
        title: 'Minerals & Electrolytes 101',
        duration: '6 min',
        body:
          'Why minerals are the unsung hero of drainage. Sodium, potassium, magnesium basics. How to layer them in safely.',
      },
    ],
    daily: [
      'Warm water + sea salt + lemon, first thing',
      '10 minutes of movement (walk, gentle yoga, rebounder)',
      '5 minutes of direct sunlight on skin and eyes',
      'Castor oil pack over the liver, evening (45 min)',
      'Dry brush before shower (toward the heart, 5 min)',
      'Bowel-movement check-in (frequency, completeness, ease)',
      'Hydration target: half your body weight (lbs) in ounces of filtered water',
      'Lights low + screens off 60 min before bed',
    ],
  },
  '2': {
    n: 2,
    phase: 'Phase 1',
    title: 'Layer in the Binders',
    intent:
      'Drainage is moving. This week we add gentle binders so anything mobilized has somewhere to go. Lymph movement scales up. We stay in foundation foods. Office hours 1 lands at the end of this week.',
    lessons: [
      {
        num: '2.2',
        title: 'Week 2 Protocol — Adding Binders',
        duration: '8 min',
        body:
          'Activated charcoal, chlorella, or zeolite — when, how much, and how to time them away from food and supplements.',
      },
      {
        num: '2.6',
        title: 'Foundation Products to Have on Hand',
        duration: '5 min',
        body:
          'Quick reference for the supplements you should be ordering now if you haven\'t already. Full library lives in the Product Protocols section.',
      },
    ],
    daily: [
      'Continue everything from Week 1',
      'Activated charcoal or chlorella: 1 dose daily, 30 min away from food/supplements/coffee',
      'Lymph movement increase: rebound, walk briskly, or sauna 4x this week',
      'Sleep check: are you getting 8+ hours of dark, cool sleep?',
      'Tracker: log bowel movements, water, sleep quality, energy 1–10',
      'Office Hours #1 this Saturday — bring three questions',
    ],
  },
  '3': {
    n: 3,
    phase: 'Phase 2',
    title: 'The Cleanse Begins',
    intent:
      'Phase 2. This is the week the protocol starts working on organisms and metabolic waste your body has been carrying. Watch the safety video before you start the herbs. Binders are not optional this phase.',
    lessons: [
      {
        num: '3.1',
        title: 'What to Expect This Phase',
        duration: '6 min',
        body:
          'The healing-response window, what is normal, what is not, and the specific signs that mean slow down. Watch this BEFORE you take a single new herb today.',
      },
      {
        num: '3.2',
        title: 'Week 3 Protocol — Herbal Layer',
        duration: '12 min',
        body:
          'The specific antimicrobial herbs, dosing, timing, and rotation. Diet shifts to Phase 2 today (no fermented foods, no nightshades).',
      },
      {
        num: '3.6',
        title: 'When to Slow Down',
        duration: '5 min',
        body:
          'The two clear signs that mean pause your protocol, and the 48-hour reset that puts you back on track safely. The most important video in the program.',
      },
    ],
    daily: [
      'All Week 1–2 elements continue',
      'Herbal antimicrobial layer per the protocol video — start at half-dose for the first 3 days',
      'Binders 2x daily — alarmed, 30 min away from everything else',
      'Diet shift to Phase 2 (see Diet Blueprint)',
      'Sweat practice: sauna or hot Epsom bath 4x this week minimum',
      'Tracker entry every evening — symptoms 1–10, sleep, mood, anything new',
      'If symptoms hit yellow zone, follow the slow-down protocol',
    ],
  },
  '4': {
    n: 4,
    phase: 'Phase 2',
    title: 'The Deep Middle',
    intent:
      'The week most programs lose people. This is the unglamorous middle, where the work has gotten quiet and you have to trust the process. Office hours 2 happens at the end of this week — come.',
    lessons: [
      {
        num: '3.3',
        title: 'Week 4 Protocol — Continuation & Adjustments',
        duration: '10 min',
        body:
          'How to recognize what is and isn\'t working in week 4. Common adjustments. Full-dose herbal layer. Troubleshooting.',
      },
      {
        num: '3.5',
        title: 'Healing Response Guide (deep dive)',
        duration: '7 min',
        body:
          'Walk through the green/yellow/red signal chart in detail. Each signal type, what it means, what to do.',
      },
    ],
    daily: [
      'All Week 3 elements continue',
      'Herbal layer at full dose if tolerated — drop back to half if anything yellow appears',
      'Hydration up: 70–80% of body weight in ounces this week',
      'Skin support: gentle dry brushing, infrared sauna if available',
      'Emotional support: this week tends to surface old material — journal, walk, sleep',
      'Office Hours #2 this Saturday — bring what is hard',
    ],
  },
  '5': {
    n: 5,
    phase: 'Phase 3',
    title: 'Rebuild Begins',
    intent:
      'Cleanse winds down. Probiotics return. Fermented foods return. We start asking your gut to host beneficial life again. Phase 3 diet begins today.',
    lessons: [
      {
        num: '4.1',
        title: 'Rebuilding the Gut',
        duration: '10 min',
        body:
          'Why we don\'t rebuild during the cleanse, and why this week matters more than most programs admit. Probiotics, prebiotics, fermented foods, bone broth, glutamine.',
      },
      {
        num: '4.2',
        title: 'Week 5 Protocol — Probiotic Reintroduction',
        duration: '8 min',
        body:
          'Specific strains, timing, and the order to add things back in. What to add first; what to hold for week 6.',
      },
    ],
    daily: [
      'Continue drainage support and minerals — these never stop',
      'Reduce herbal antimicrobial layer to half dose, taper through this week',
      'Probiotic introduction per the protocol video — start with one strain',
      'Bone broth: 1 cup daily',
      'Collagen: 10–20g in coffee, smoothie, or broth',
      'Diet shifts to Phase 3 — fermented foods small amounts, prebiotics in',
      'Sleep is non-negotiable — this is when rebuild happens',
    ],
  },
  '6': {
    n: 6,
    phase: 'Phase 3',
    title: 'Maintenance & Reintroduction',
    intent:
      'Final week. Foods come back online one at a time. You learn what actually disagrees with your body and what was a non-issue all along. Office hours 3 — graduation — closes the cohort.',
    lessons: [
      {
        num: '4.3',
        title: 'Week 6 Protocol — Reintroduction',
        duration: '8 min',
        body:
          'Order: nightshades first, then dairy (if you choose), then gluten last (if you choose). One food every 3 days. Track reactions for 48 hours.',
      },
      {
        num: '4.5',
        title: 'Nervous System Repair',
        duration: '6 min',
        body:
          'Vagal tone, HRV, breathwork. REST Floating Therapy, red light, halotherapy. Why the nervous system is the glue.',
      },
      {
        num: '4.6',
        title: 'Sleep Restoration',
        duration: '5 min',
        body:
          'Magnesium, glycine, apigenin basics. Why your cleanse will partially unwind without good sleep, forever.',
      },
    ],
    daily: [
      'Drainage support continues',
      'Probiotic and bone broth daily',
      'Reintroduce one new food every 3 days, journal reactions for 48 hours',
      'Nervous system practice: 10 min breathwork or float, daily',
      'Build the maintenance plan — what stays in your life forever from this',
      'Office Hours #3 — graduation — bring what you\'ve learned',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(WEEKS).map((week) => ({ week }));
}

export default async function ProtocolWeekPage({ params }: PageProps) {
  const { week } = await params;
  const data = WEEKS[week];
  if (!data) notFound();

  const prev = data.n > 1 ? `/library/protocol/${data.n - 1}` : null;
  const next = data.n < 6 ? `/library/protocol/${data.n + 1}` : null;

  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current={`/library/protocol/${week}`} />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-6">
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-2.5 py-1 rounded-full">
            {data.phase}
          </span>
          <span className="eyebrow">Week {data.n} of 6</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.05] text-solivana-bark mb-5">
          {data.title}
        </h1>
        <p className="serif text-xl text-solivana-taupe italic font-light leading-snug max-w-2xl">
          {data.intent}
        </p>
      </section>

      {/* Lessons */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-8">
        <div className="eyebrow mb-4">Lessons This Week</div>
        <div className="space-y-5">
          {data.lessons.map((l) => (
            <article key={l.num} className="card-soft p-7 md:p-8">
              <div className="flex items-baseline gap-3 flex-wrap mb-3">
                <span className="font-display text-2xl font-extralight text-solivana-amber leading-none">
                  {l.num}
                </span>
                <span className="eyebrow">{l.duration}</span>
              </div>
              <h2 className="font-display text-2xl font-medium text-solivana-bark mb-3 leading-tight">
                {l.title}
              </h2>
              <p className="text-solivana-taupe leading-relaxed mb-5">{l.body}</p>

              {/* Video embed slot */}
              <div className="aspect-video bg-solivana-bark/95 rounded-xl flex items-center justify-center text-solivana-cream/60 mb-3">
                {l.videoUrl ? (
                  <iframe
                    src={l.videoUrl}
                    title={l.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <div className="text-center px-6">
                    <div className="text-3xl mb-2" aria-hidden="true">🎥</div>
                    <div className="text-sm font-accent tracking-wider uppercase text-solivana-cream/70">
                      Video coming soon
                    </div>
                    <div className="text-xs text-solivana-cream/50 mt-2 max-w-sm">
                      Lesson {l.num} will be embedded here when Natasha&apos;s recording is live.
                    </div>
                  </div>
                )}
              </div>
              {l.pdfUrl && (
                <a
                  href={l.pdfUrl}
                  className="inline-flex items-center gap-2 text-sm text-solivana-amber font-accent tracking-wider uppercase hover:text-solivana-bark"
                >
                  Download PDF →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Knowledge Check */}
      {WEEK_QUIZZES[week] && (
        <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
          <LessonQuiz
            id={`week-${week}`}
            title={`Week ${data.n} · ${data.title}`}
            questions={WEEK_QUIZZES[week]}
          />
        </section>
      )}

      {/* Daily checklist */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-4">
          <div className="eyebrow">Daily This Week</div>
          <DownloadButton
            label="Download Checklist (PDF)"
            targetId="pdf-target-week-checklist"
            filename={`the-foundation-week-${data.n}-checklist.pdf`}
            title={`Week ${data.n}: ${data.title}`}
            subtitle={`${data.phase} · daily checklist`}
          />
        </div>
        <h2 className="font-display text-3xl font-light text-solivana-bark mb-7 leading-tight">
          Your daily checklist.
        </h2>
        <div id="pdf-target-week-checklist">
          <Checklist
            id={`protocol-week-${week}`}
            title="Today's protocol"
            items={data.daily}
            persist={false}
          />
        </div>
        <p className="text-xs text-solivana-taupe mt-3">
          Resets every visit. Use the Daily Tracker for permanent habit history.
        </p>
      </section>

      {/* Nav */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {prev ? (
            <a
              href={prev}
              className="text-solivana-taupe hover:text-solivana-bark font-accent tracking-wider text-sm uppercase"
            >
              ← Previous Week
            </a>
          ) : (
            <a
              href="/library/assessment"
              className="text-solivana-taupe hover:text-solivana-bark font-accent tracking-wider text-sm uppercase"
            >
              ← Foundation Assessment
            </a>
          )}
          {next ? (
            <a href={next} className="btn-primary">
              Week {data.n + 1} →
            </a>
          ) : (
            <a href="/library" className="btn-primary">
              Finish · Back to Library
            </a>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
