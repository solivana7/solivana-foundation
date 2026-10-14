'use client';

import { useMemo, useState } from 'react';
import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';

type Q = {
  id: string;
  category: string;
  prompt: string;
  options: { label: string; score: number }[];
};

const FREQ: { label: string; score: number }[] = [
  { label: 'Never', score: 0 },
  { label: 'Rarely', score: 1 },
  { label: 'Sometimes', score: 2 },
  { label: 'Often', score: 3 },
];

const QUESTIONS: Q[] = [
  // Methylation & Energy (5)
  { id: 'q1', category: 'Energy & Recovery', prompt: 'I wake up tired, even after 7+ hours of sleep.', options: FREQ },
  { id: 'q2', category: 'Energy & Recovery', prompt: 'I experience brain fog or difficulty concentrating.', options: FREQ },
  { id: 'q3', category: 'Energy & Recovery', prompt: 'I feel sensitive to fragrances, chemicals, or cigarette smoke.', options: FREQ },
  { id: 'q4', category: 'Energy & Recovery', prompt: 'Supplements or new foods make me feel noticeably worse before better.', options: FREQ },
  { id: 'q5', category: 'Energy & Recovery', prompt: 'My mood or irritability feels out of proportion to what is happening.', options: FREQ },
  // Drainage Pathways (5)
  { id: 'q6', category: 'Drainage Pathways', prompt: 'I have fewer than 1 complete bowel movement per day.', options: FREQ },
  { id: 'q7', category: 'Drainage Pathways', prompt: 'I rarely sweat, even with exercise or heat.', options: FREQ },
  { id: 'q8', category: 'Drainage Pathways', prompt: 'My urine has a strong odor or unusual color.', options: FREQ },
  { id: 'q9', category: 'Drainage Pathways', prompt: 'I have visible puffiness or water retention, especially in the morning.', options: FREQ },
  { id: 'q10', category: 'Drainage Pathways', prompt: 'I hold tension in my lymph (soreness behind ears, swollen neck, heaviness).', options: FREQ },
  // Nervous System (4)
  { id: 'q11', category: 'Nervous System', prompt: 'I have trouble falling asleep or staying asleep past 3 a.m.', options: FREQ },
  { id: 'q12', category: 'Nervous System', prompt: 'I crash in the afternoon and rely on caffeine or sugar to push through.', options: FREQ },
  { id: 'q13', category: 'Nervous System', prompt: 'My heart rate feels elevated at rest, or I have trouble relaxing.', options: FREQ },
  { id: 'q14', category: 'Nervous System', prompt: 'Stress hits me harder than it used to — or I feel wired but tired.', options: FREQ },
  // Gut & Digestion (4)
  { id: 'q15', category: 'Gut & Digestion', prompt: 'I bloat after meals, regardless of what I eat.', options: FREQ },
  { id: 'q16', category: 'Gut & Digestion', prompt: 'I react to multiple foods (dairy, gluten, eggs, nightshades, etc.).', options: FREQ },
  { id: 'q17', category: 'Gut & Digestion', prompt: 'I have intense cravings — especially for sugar, salt, or carbs.', options: FREQ },
  { id: 'q18', category: 'Gut & Digestion', prompt: 'I have been on antibiotics 2+ times in the last 3 years.', options: FREQ },
  // Toxic Load Signals (3)
  { id: 'q19', category: 'Toxic Load', prompt: 'I have unexplained skin issues (acne, eczema, rashes, itching).', options: FREQ },
  { id: 'q20', category: 'Toxic Load', prompt: 'I struggle to lose weight despite diet and exercise.', options: FREQ },
  { id: 'q21', category: 'Toxic Load', prompt: 'I have three or more persistent symptoms that don\'t respond to usual care.', options: FREQ },
  // Environmental Load (3)
  { id: 'q22', category: 'Environmental Load', prompt: 'I have lived in a home with visible mold, water damage, or musty smells.', options: FREQ },
  { id: 'q23', category: 'Environmental Load', prompt: 'I drink unfiltered tap water or rely mostly on bottled water.', options: FREQ },
  { id: 'q24', category: 'Environmental Load', prompt: 'My home has strong scented products (candles, cleaners, laundry).', options: FREQ },
];

const TOTAL_MAX = 24 * 3; // 72

const TIERS = [
  {
    min: 0,
    max: 17,
    label: 'Strong Foundation',
    headline: 'Your foundation is in good shape.',
    body: 'You can run the full 6-week program as designed. Phase 1 will likely feel like a tune-up rather than a rebuild — that\'s a good sign. Pay attention anyway. Your body will tell you what\'s ready to come up.',
    pace: 'Run all six weeks at the standard pace.',
  },
  {
    min: 18,
    max: 40,
    label: 'Standard Path',
    headline: 'You\'re in the sweet spot for this program.',
    body: 'Most members fall here. Run the program as designed. Expect Phase 1 to feel significant — that\'s the work landing. Stay in close conversation with your tracker and bring questions to the first office hours.',
    pace: 'Six weeks at the standard pace. Track daily.',
  },
  {
    min: 41,
    max: 999,
    label: 'Extended Prep',
    headline: 'Slow down. Foundation work matters most for you.',
    body: 'Your body is showing strong signals that drainage and gut barrier are running below capacity. Spend four weeks in Phase 1 instead of two. Do not rush into the cleanse. If you have access to bioenergetic scanning at SoliVana, this is the right moment to use it. Consider booking a 1:1 consultation.',
    pace: 'Eight weeks total. Four in Phase 1, two in Phase 2, two in Phase 3.',
  },
];

function tierFor(score: number) {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0];
}

const STORAGE_KEY = 'foundation-assessment-v1';

export default function AssessmentPage() {
  const [step, setStep] = useState(0); // 0 intro, 1..24 questions, 25 results
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const score = useMemo(() => {
    let s = 0;
    for (const q of QUESTIONS) {
      const idx = answers[q.id];
      if (idx !== undefined) s += q.options[idx]?.score ?? 0;
    }
    return s;
  }, [answers]);

  const categoryScores = useMemo(() => {
    const map: Record<string, { total: number; max: number }> = {};
    for (const q of QUESTIONS) {
      if (!map[q.category]) map[q.category] = { total: 0, max: 0 };
      map[q.category].max += 3;
      const idx = answers[q.id];
      if (idx !== undefined) map[q.category].total += q.options[idx]?.score ?? 0;
    }
    return map;
  }, [answers]);

  function answer(id: string, idx: number) {
    setAnswers((prev) => ({ ...prev, [id]: idx }));
  }

  const currentQ = step >= 1 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;
  const currentAnswered = currentQ ? answers[currentQ.id] !== undefined : true;

  function next() {
    if (step === QUESTIONS.length) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ answers, score, savedAt: new Date().toISOString() })
        );
      } catch {
        // localStorage unavailable — proceed anyway
      }
    }
    setStep((s) => Math.min(s + 1, QUESTIONS.length + 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function reset() {
    setAnswers({});
    setStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  const tier = step === QUESTIONS.length + 1 ? tierFor(score) : null;

  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/assessment" />

      <section className="max-w-2xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {step >= 1 && step <= QUESTIONS.length && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2">
              <span>
                Question {step} of {QUESTIONS.length}{' '}
                <span className="text-solivana-amber">· {currentQ?.category}</span>
              </span>
              <span>{Math.round((step / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-solivana-sand/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-solivana-amber transition-all duration-300"
                style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {step === 0 && (
          <div>
            <div className="eyebrow mb-5">Foundation Assessment</div>
            <h1 className="font-display text-4xl md:text-5xl font-light leading-tight text-solivana-bark mb-6">
              Twenty-four questions. Your readiness map.
            </h1>
            <p className="text-lg text-solivana-taupe leading-relaxed mb-6">
              The most important thing you do this week. Your answers determine which
              phase needs the most attention, what to expect during the cleanse, and
              whether your body wants you to slow down.
            </p>
            <p className="text-solivana-taupe leading-relaxed mb-8">
              Six categories: <em className="text-solivana-bark not-italic font-medium">Energy & Recovery</em>,{' '}
              <em className="text-solivana-bark not-italic font-medium">Drainage Pathways</em>,{' '}
              <em className="text-solivana-bark not-italic font-medium">Nervous System</em>,{' '}
              <em className="text-solivana-bark not-italic font-medium">Gut & Digestion</em>,{' '}
              <em className="text-solivana-bark not-italic font-medium">Toxic Load</em>, and{' '}
              <em className="text-solivana-bark not-italic font-medium">Environmental Load</em>. Answer
              honestly. There are no wrong answers and the score is for you, not for
              anyone else to see.
            </p>
            <div className="card-flat p-5 mb-8 text-sm text-solivana-taupe leading-relaxed">
              <strong className="text-solivana-bark">Reminder:</strong> This is an
              educational tool — not a medical diagnosis. Persistent or severe symptoms
              should be discussed with your physician.
            </div>
            <button type="button" onClick={next} className="btn-primary">
              Begin Assessment →
            </button>
          </div>
        )}

        {currentQ && (
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-medium leading-snug text-solivana-bark mb-7">
              {currentQ.prompt}
            </h2>
            <div className="space-y-3 mb-10" role="radiogroup" aria-label={currentQ.prompt}>
              {currentQ.options.map((opt, i) => {
                const selected = answers[currentQ.id] === i;
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => answer(currentQ.id, i)}
                    className={`w-full text-left p-5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2 ${
                      selected
                        ? 'bg-solivana-amber/10 border-solivana-amber shadow-sm'
                        : 'bg-white border-solivana-sand/70 hover:border-solivana-amber/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className={`shrink-0 w-5 h-5 rounded-full border-2 ${
                          selected ? 'bg-solivana-amber border-solivana-amber' : 'border-solivana-sand'
                        }`}
                      />
                      <span className="text-base text-solivana-bark">{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={back}
                className="text-sm font-accent uppercase tracking-[0.15em] text-solivana-taupe hover:text-solivana-bark"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!currentAnswered}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === QUESTIONS.length ? 'See Your Result →' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {tier && (
          <div>
            <div className="text-center mb-10">
              <div className="eyebrow mb-3">Your Result</div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-3">
                {tier.label}
              </h2>
              <div className="inline-flex items-baseline gap-2">
                <span className="font-display text-6xl font-extralight text-solivana-amber">
                  {score}
                </span>
                <span className="text-solivana-taupe text-lg">/ {TOTAL_MAX}</span>
              </div>
            </div>

            <div className="card-soft p-7 md:p-9 mb-8">
              <h3 className="font-display text-2xl font-medium text-solivana-bark mb-4 leading-snug">
                {tier.headline}
              </h3>
              <p className="text-solivana-taupe leading-relaxed text-lg mb-5">
                {tier.body}
              </p>
              <div className="bg-solivana-amber/10 border-l-4 border-solivana-amber rounded-r-lg p-4">
                <div className="text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-amber mb-1">
                  Recommended Pace
                </div>
                <div className="text-solivana-bark font-medium">{tier.pace}</div>
              </div>
            </div>

            <div className="card-flat p-7 mb-10">
              <h3 className="font-display text-xl font-medium text-solivana-bark mb-5">
                By Category
              </h3>
              <div className="space-y-4">
                {Object.entries(categoryScores).map(([cat, { total, max }]) => {
                  const pct = (total / max) * 100;
                  const flag = total / max >= 0.6;
                  return (
                    <div key={cat}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <div className="text-sm font-medium text-solivana-bark">
                          {cat}
                          {flag && (
                            <span className="ml-2 text-[10px] font-accent tracking-[0.18em] uppercase text-solivana-amber">
                              · Focus area
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-solivana-taupe">
                          {total} / {max}
                        </div>
                      </div>
                      <div className="h-1.5 bg-solivana-sand/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${flag ? 'bg-solivana-amber' : 'bg-solivana-taupe/60'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-xs text-solivana-taupe leading-relaxed">
                <strong>Focus area</strong> = a category scoring 60% or more of its
                maximum. Pay extra attention to that domain in the protocol.
              </p>
            </div>

            <div className="text-center mb-10">
              <a href="/library/protocol/1" className="btn-primary">
                Begin Week 1 →
              </a>
              <div className="mt-5 flex items-center justify-center gap-4 text-sm">
                <button
                  type="button"
                  onClick={reset}
                  className="text-solivana-taupe underline decoration-solivana-sand underline-offset-4 hover:text-solivana-bark"
                >
                  Retake assessment
                </button>
                <span className="text-solivana-sand">·</span>
                <a
                  href="/library"
                  className="text-solivana-taupe underline decoration-solivana-sand underline-offset-4 hover:text-solivana-bark"
                >
                  Back to library
                </a>
              </div>
            </div>

            <div className="bg-solivana-amber/5 border border-solivana-amber/40 rounded-xl p-5 text-sm text-solivana-bark leading-relaxed">
              Your answers are saved on this device only. They are not sent to a server,
              shared with Natasha, or stored in any database. Persistent or severe
              symptoms should be discussed with your physician.
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
