'use client';

import { useMemo, useState } from 'react';
import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

type SingleQuestion = {
  kind: 'single';
  id: string;
  prompt: string;
  context?: string;
  options: { label: string; score: number }[];
};

type MultiQuestion = {
  kind: 'multi';
  id: string;
  prompt: string;
  context?: string;
  perOption: number;
  options: string[];
};

type Question = SingleQuestion | MultiQuestion;

const FREQ_OPTIONS: { label: string; score: number }[] = [
  { label: 'Never', score: 0 },
  { label: 'Rarely', score: 1 },
  { label: 'Sometimes (weekly)', score: 2 },
  { label: 'Often (daily or near-daily)', score: 3 },
];

const QUESTIONS: Question[] = [
  {
    kind: 'single',
    id: 'energy',
    prompt: 'How often do you wake up tired, even after 7+ hours of sleep?',
    context:
      'Persistent low morning energy is one of the most common signals that your drainage and gut pathways are running below capacity.',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'brainfog',
    prompt: 'How often do you experience brain fog, difficulty concentrating, or mental fatigue?',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'cravings',
    prompt: 'How often do you have intense sugar or carb cravings — especially in the afternoon or evening?',
    context:
      'Cravings are often a downstream symptom of imbalanced gut flora and unstable blood-sugar rhythms — both of which a foundation reset addresses directly.',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'sleep',
    prompt: 'How often do you wake between 1 and 4 a.m. and have trouble falling back asleep?',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'digestion',
    prompt: 'How often do you experience bloating, gas, or irregular bowel movements?',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'skin',
    prompt: 'How often do you experience unexplained skin issues — rashes, itchy skin, breakouts, or eczema?',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'mood',
    prompt: 'How often do mood swings, irritability, or anxiety feel out of proportion to what is actually happening?',
    options: FREQ_OPTIONS,
  },
  {
    kind: 'single',
    id: 'priorcleanse',
    prompt: 'Have you ever tried a cleanse, detox, or elimination diet that left you feeling worse — not better?',
    context:
      'A common sign that you have a foundation-readiness gap, not a discipline problem.',
    options: [
      { label: 'No, never tried one', score: 0 },
      { label: 'Tried one, it went fine', score: 0 },
      { label: 'Yes, once', score: 2 },
      { label: 'Yes, more than once', score: 3 },
    ],
  },
  {
    kind: 'multi',
    id: 'exposure',
    prompt: 'Which of the following apply to you? (Select all that fit.)',
    context:
      'These are common lifestyle and environmental factors that can put cumulative load on the body\'s detox pathways.',
    perOption: 1,
    options: [
      'Traveled internationally in the last 5 years',
      'Live with pets (dogs, cats, or both)',
      'Eat raw or undercooked fish, sushi, or meat regularly',
      'Drink unfiltered tap water (or mostly bottled water)',
      'Have visible mold or water damage in current or recent home',
      'Have been on antibiotics 2+ times in the last 3 years',
      'Eat conventionally grown produce most of the time',
    ],
  },
  {
    kind: 'single',
    id: 'normallabs',
    prompt:
      'Have your doctors told you your lab work is "normal" while you continued to feel unwell?',
    context:
      'This is the experience that brings most clients to The Foundation. You are not imagining it.',
    options: FREQ_OPTIONS,
  },
];

const TOTAL_MAX = QUESTIONS.reduce((acc, q) => {
  if (q.kind === 'single') {
    return acc + Math.max(...q.options.map((o) => o.score));
  }
  return acc + q.options.length * q.perOption;
}, 0);

interface Tier {
  min: number;
  max: number;
  label: string;
  headline: string;
  body: string;
  ctaText: string;
}

const TIERS: Tier[] = [
  {
    min: 0,
    max: 9,
    label: 'Foundation Seems Strong',
    headline: 'Your foundation appears to be in good shape.',
    body:
      "Based on what you shared, your body is showing fewer of the signals we typically see in people who would benefit most from The Foundation. That's a good thing. If you've never run a structured reset, the program is still useful as an annual maintenance practice — many of our strongest-foundation members run it once a year as preventive care.",
    ctaText: 'Learn About Annual Maintenance',
  },
  {
    min: 10,
    max: 19,
    label: 'Several Common Signals',
    headline: "You're showing several signals that often respond well to a foundation reset.",
    body:
      "Some of what you described — the energy patterns, the cravings, the digestion, the moments where you can't quite tell why you feel off — are exactly the cluster of symptoms that brought most of our members to this work. The Foundation was designed for this profile. The 6-week sequence walks through what your body is most likely asking for, in the order that actually works.",
    ctaText: 'See How The Foundation Works',
  },
  {
    min: 20,
    max: 999,
    label: 'Multiple Signals',
    headline: 'You\'re showing the cluster of signals that brought most of our members to this work.',
    body:
      "What you described is what Natasha hears, almost word for word, from the women who walk into SoliVana feeling off and can't get clear answers. The Foundation was built for exactly this profile — people whose labs come back \"normal\" while their bodies tell a different story. Most members in this score range report meaningful change by the end of Week 4, and lasting change by Week 6 — when the work is done in the right order, with the right support.",
    ctaText: 'Begin the Foundation',
  },
];

function tierFor(score: number): Tier {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0];
}

export default function QuizPage() {
  const [step, setStep] = useState<number>(0); // 0 = intro, 1..N = questions, N+1 = results
  // Track the chosen option *index* (not score) so options sharing a score don't both highlight.
  const [singleAnswers, setSingleAnswers] = useState<Record<string, number>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<string, Set<number>>>({});

  const totalSteps = QUESTIONS.length;

  const score = useMemo(() => {
    let s = 0;
    for (const q of QUESTIONS) {
      if (q.kind === 'single') {
        const idx = singleAnswers[q.id];
        if (idx !== undefined) s += q.options[idx]?.score ?? 0;
      } else {
        const selected = multiAnswers[q.id];
        if (selected) s += selected.size * q.perOption;
      }
    }
    return s;
  }, [singleAnswers, multiAnswers]);

  function answerSingle(id: string, idx: number) {
    setSingleAnswers((prev) => ({ ...prev, [id]: idx }));
  }

  function toggleMulti(id: string, idx: number) {
    setMultiAnswers((prev) => {
      const current = new Set(prev[id] ?? []);
      if (current.has(idx)) current.delete(idx);
      else current.add(idx);
      return { ...prev, [id]: current };
    });
  }

  function next() {
    setStep((s) => Math.min(s + 1, totalSteps + 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function reset() {
    setSingleAnswers({});
    setMultiAnswers({});
    setStep(0);
  }

  // Whether the current question has been answered (for "Next" button enablement)
  const currentQuestion = step >= 1 && step <= totalSteps ? QUESTIONS[step - 1] : null;
  const currentAnswered = (() => {
    if (!currentQuestion) return true;
    if (currentQuestion.kind === 'single') {
      return singleAnswers[currentQuestion.id] !== undefined;
    }
    // multi: always allow next (selecting nothing is a valid "none of these")
    return true;
  })();

  const tier = step === totalSteps + 1 ? tierFor(score) : null;

  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar rightCta={{ href: '/enroll', label: 'Enroll Now →' }} />

      <section className="max-w-2xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Progress */}
        {step >= 1 && step <= totalSteps && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2">
              <span>
                Question {step} of {totalSteps}
              </span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-solivana-sand/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-solivana-amber transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Intro */}
        {step === 0 && (
          <div className="text-center">
            <div className="eyebrow mb-5">The Foundation Quiz</div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-6">
              Is your body asking for a foundation reset?
            </h1>
            <p className="text-lg text-solivana-taupe leading-relaxed mb-8 max-w-xl mx-auto">
              Ten honest questions. Three minutes. We&apos;ll show you which of the
              signals we look for are showing up for you — and what (if anything) tends
              to help.
            </p>
            <div className="bg-white border border-solivana-sand/70 rounded-xl p-5 mb-8 max-w-xl mx-auto text-left">
              <p className="text-sm text-solivana-taupe leading-relaxed">
                <strong className="text-solivana-bark">Important:</strong> This is an
                educational tool. It is not a medical diagnosis. The questions ask
                about lifestyle and symptom patterns — they cannot detect parasites,
                infections, or any disease. Your symptoms could have many possible
                causes. Always consult your physician about your health.
              </p>
            </div>
            <button
              type="button"
              onClick={next}
              className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-10 py-5 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
            >
              Begin Quiz →
            </button>
          </div>
        )}

        {/* Questions */}
        {currentQuestion && (
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold leading-snug text-solivana-bark mb-4">
              {currentQuestion.prompt}
            </h2>
            {currentQuestion.context && (
              <p className="text-solivana-taupe leading-relaxed mb-7">
                {currentQuestion.context}
              </p>
            )}

            {currentQuestion.kind === 'single' && (
              <div
                className="space-y-3 mb-10"
                role="radiogroup"
                aria-label={currentQuestion.prompt}
              >
                {currentQuestion.options.map((opt, i) => {
                  const selected = singleAnswers[currentQuestion.id] === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => answerSingle(currentQuestion.id, i)}
                      className={`w-full text-left p-5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2 ${
                        selected
                          ? 'bg-solivana-amber/10 border-solivana-amber text-solivana-bark shadow-sm'
                          : 'bg-white border-solivana-sand/70 text-solivana-bark hover:border-solivana-amber/60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className={`shrink-0 w-5 h-5 rounded-full border-2 ${
                            selected
                              ? 'bg-solivana-amber border-solivana-amber'
                              : 'border-solivana-sand'
                          }`}
                        />
                        <span className="text-base">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQuestion.kind === 'multi' && (
              <div
                className="space-y-3 mb-10"
                role="group"
                aria-label={currentQuestion.prompt}
              >
                {currentQuestion.options.map((label, i) => {
                  const selected = (multiAnswers[currentQuestion.id] ?? new Set()).has(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      role="checkbox"
                      aria-checked={selected}
                      onClick={() => toggleMulti(currentQuestion.id, i)}
                      className={`w-full text-left p-5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2 ${
                        selected
                          ? 'bg-solivana-amber/10 border-solivana-amber text-solivana-bark shadow-sm'
                          : 'bg-white border-solivana-sand/70 text-solivana-bark hover:border-solivana-amber/60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selected
                              ? 'bg-solivana-amber border-solivana-amber'
                              : 'border-solivana-sand'
                          }`}
                        >
                          {selected && (
                            <span className="text-white text-xs font-bold">✓</span>
                          )}
                        </span>
                        <span className="text-base">{label}</span>
                      </div>
                    </button>
                  );
                })}
                <p className="text-xs text-solivana-taupe mt-2">
                  Select all that apply. If none, just click Next.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={back}
                className="text-sm font-accent uppercase tracking-[0.15em] text-solivana-taupe hover:text-solivana-bark transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!currentAnswered}
                className="bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-8 py-3.5 rounded-full hover:bg-solivana-amber transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === totalSteps ? 'See Results →' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {tier && (
          <div>
            <div className="text-center mb-10">
              <div className="eyebrow mb-3">Your Result</div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-solivana-bark mb-3">
                {tier.label}
              </h2>
              <div className="inline-flex items-baseline gap-2 mt-3">
                <span className="font-display text-5xl font-semibold text-solivana-amber">
                  {score}
                </span>
                <span className="text-solivana-taupe text-lg">/ {TOTAL_MAX}</span>
              </div>
            </div>

            <div className="bg-white border border-solivana-sand/70 rounded-2xl p-7 md:p-9 mb-8">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-solivana-bark mb-4 leading-snug">
                {tier.headline}
              </h3>
              <p className="text-solivana-taupe leading-relaxed text-lg">{tier.body}</p>
            </div>

            <div className="text-center mb-10">
              <a
                href="/enroll"
                className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-10 py-5 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
              >
                {tier.ctaText} →
              </a>
              <div className="mt-5">
                <a
                  href="/how-it-works"
                  className="text-sm text-solivana-taupe underline decoration-solivana-sand underline-offset-4 hover:text-solivana-bark"
                >
                  Read how the program actually works →
                </a>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm text-solivana-taupe underline decoration-solivana-sand underline-offset-4 hover:text-solivana-bark"
                >
                  Retake the quiz
                </button>
              </div>
            </div>

            <div className="bg-solivana-amber/5 border border-solivana-amber/40 rounded-xl p-6">
              <div className="eyebrow mb-3 text-solivana-amber">Important</div>
              <p className="text-sm text-solivana-bark leading-relaxed">
                This quiz is for educational purposes only. It does not diagnose
                parasites, infections, or any health condition. Your symptoms could have
                many possible causes — including conditions that require medical
                evaluation. Always discuss persistent symptoms with your physician
                before beginning any cleanse or supplement protocol. The Foundation is
                an educational wellness program, not a medical treatment.
              </p>
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
