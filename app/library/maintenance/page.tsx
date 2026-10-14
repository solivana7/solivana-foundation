import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../components/LessonQuiz';
import { Checklist } from '../components/Checklist';
import { DownloadButton, ANNUAL_REVIEW_HTML } from '../components/DownloadActions';

const MORNING_CHECKIN = [
  'How did I sleep, on a 1–10?',
  'Where am I holding tension right now?',
  'What is my energy at, on a 1–10?',
  'What does my body want today — more rest, more movement, more food, less food?',
];

const WEEKLY_INVENTORY = [
  'Bowel movements this week — frequency, completeness?',
  'Sleep — average hours and quality?',
  'Skin — clear or reactive?',
  'Mood — steady or volatile?',
  'Energy patterns — afternoon crash or stable through the day?',
];


export const metadata = {
  title: 'Maintenance & Next Steps — The Foundation Library',
};

const QUIZZES: Record<string, QuizQuestion[]> = {
  '8.1': [
    {
      q: 'What is the recommended baseline cadence for re-running The Foundation?',
      options: ['Every 3 months', 'Every 6 months', 'Once a year', 'Once every 5 years'],
      correctIndex: 2,
      explanation: 'Once a year is the floor. Spring or early fall are the most natural windows. The second time through is faster, easier, and more revealing.',
    },
    {
      q: 'Which is NOT a recommended trigger to re-run the protocol?',
      options: [
        'After international travel',
        'After a course of antibiotics',
        'After a stressful month at work with no other change',
        'When you feel "off" for 6+ weeks with no obvious cause',
      ],
      correctIndex: 2,
      explanation: 'A normal stressful month does not warrant a full reset — strengthen the daily ritual instead. Antibiotics, travel, or persistent unexplained symptoms are real signals.',
    },
  ],
  '8.2': [
    {
      q: 'Which is the recommended NEXT step beyond The Foundation for a member who wants targeted assessment?',
      options: ['Bioenergetic scan at scan.solivana.ai', 'A different parasite cleanse', 'A fast', 'Switching to keto'],
      correctIndex: 0,
      explanation: 'The Foundation is broad-spectrum support; the bioenergetic scan is targeted assessment. Together they let you build a precise follow-on protocol.',
    },
    {
      q: 'Where do peptide protocols sit in the sequence?',
      options: [
        'Before The Foundation as preparation',
        'In place of The Foundation',
        'On top of foundation work — the order matters: foundation, cleanse, rebuild, then peptides',
        'They are unrelated to The Foundation',
      ],
      correctIndex: 2,
      explanation: 'Peptides are powerful but never replace the foundation. They sit on top of it. Members can use peptides.solivana.ai to generate a personalized protocol — always in consultation with a practitioner.',
    },
  ],
  '8.3': [
    {
      q: 'How many minutes per morning does Natasha recommend for the daily check-in?',
      options: ['30 seconds', '3 minutes', '20 minutes', '1 hour'],
      correctIndex: 1,
      explanation: 'Three minutes. Before phone, before coffee. The practice of asking trains your interoception — your awareness of internal state.',
    },
    {
      q: 'In the weekly inventory, what should you do if a metric (sleep, mood, energy) declines for 2 weeks straight?',
      options: [
        'Ignore it; the body fluctuates',
        'Pull back into Phase 1 foods and rituals for a week',
        'Run the full 6-week protocol again immediately',
        'Order the heaviest cleanse you can find',
      ],
      correctIndex: 1,
      explanation: 'A short Phase 1 reset is often all you need. The annual full protocol is for bigger shifts; a one-week pullback handles the normal ups and downs.',
    },
  ],
  '8.4': [
    {
      q: 'What does Natasha ask graduates to do, if anything?',
      options: [
        'Buy a more expensive program next',
        'Reply with one specific thing the program changed for you',
        'Post on social media tagging her',
        'Recruit five friends',
      ],
      correctIndex: 1,
      explanation: 'One specific reply, when the timing feels right. Not for marketing — for her. Real specificity > generic praise every time.',
    },
  ],
};

const LESSONS = [
  {
    num: '8.1',
    title: 'Annual Reset Cadence',
    summary: 'How often to come back. When to know you need it.',
    sections: [
      {
        h: 'Once a year is the floor',
        body: [
          'Most members run The Foundation once a year as a maintenance practice. Spring is the most natural rhythm — your body is shifting out of winter conservation mode and into the activity of the warmer months. Early fall is the second-best window — the transition before the holidays, before colder, more sedentary months.',
          'You will notice: the second time through is faster, easier, and more revealing. You catch things you missed the first time. The protocol becomes less about recovery and more about refinement.',
        ],
      },
      {
        h: 'Signals it is time again',
        body: [
          'You do not need to wait for the calendar. Run The Foundation again when:',
          '• Your sleep starts to decline noticeably for 2+ weeks with no obvious cause',
          '• Your skin develops new sensitivities or your old reactions return',
          '• You travel internationally — schedule a reset 4–8 weeks after returning',
          '• You finish a course of antibiotics — wait 2 weeks, then run',
          '• A major life stressor (loss, move, new diagnosis) takes you off your foundation for several months',
          '• You simply feel "off" for 6+ weeks and cannot identify why',
        ],
      },
      {
        h: 'What changes between runs',
        body: [
          'Some elements stay the same: drainage, hydration, minerals, environmental hygiene. These are forever practices.',
          'Some elements adjust: the herbal cleanse layer rotates between runs (your body adapts to anything you keep doing). Your binders may shift. Your specific food sensitivities may reveal themselves more clearly the second time.',
          'Office hours always welcome members back. There is no time limit on access.',
        ],
      },
    ],
  },
  {
    num: '8.2',
    title: 'When to Do More',
    summary: 'Three paths beyond The Foundation when you want to go deeper.',
    sections: [
      {
        h: 'Bioenergetic scan',
        body: [
          'If you have not yet had a bioenergetic scan, this is the next step. The Foundation is broad-spectrum support; the scan is targeted assessment. You will see exactly which organisms, metals, organ systems, or imbalances are showing up energetically — and you can build a targeted follow-on protocol from there.',
          'Members receive 20% off at scan.solivana.ai.',
        ],
      },
      {
        h: 'Peptide protocol',
        body: [
          'For members who want the next level of clinical specificity, peptides are a powerful adjunct. Peptides are research compounds — short chains of amino acids — that work with specific cellular pathways. We use them in 1:1 work for tissue repair (BPC-157, TB-500), gut healing (BPC-157), longevity (Epithalon, NAD+), and a handful of other targets.',
          'Peptides are not a replacement for the foundation work. They are a layer on top of it. A protocol that respects the order: foundation, cleanse, rebuild, then peptides.',
          'The SoliVana Peptides matcher at peptides.solivana.ai produces personalized protocols based on your symptoms and goals. Bring the result to a practitioner before sourcing or starting any peptide.',
        ],
      },
      {
        h: '1:1 Holistic Coaching',
        body: [
          'A small number of clients each year work with Natasha 1:1. The work goes beyond what any program can deliver — slow, layered, personal. We may use bioenergetic scanning, peptide protocols, peptide-microdosing strategies, and lifestyle redesign over 6–12 month engagements.',
          'Reserved for Foundation graduates and existing SoliVana clients ready to go further. To inquire, email info@solivana.com with subject line "1:1 Coaching Inquiry" and include a brief description of where you are now and what you are trying to address.',
        ],
      },
    ],
  },
  {
    num: '8.3',
    title: 'Staying In Touch With Your Body',
    summary: 'Daily practices that keep you in dialogue with your system between cleanses.',
    sections: [
      {
        h: 'The morning check-in',
        body: [
          'Three minutes, every morning. Before phone, before coffee, before the day. Sit on the edge of the bed and ask:',
          '• How did I sleep, on a 1–10?',
          '• Where am I holding tension right now?',
          '• What is my energy at, on a 1–10?',
          '• What does my body want today — more rest, more movement, more food, less food?',
          'You do not have to answer "correctly." You just have to ask. The practice of asking trains your interoception — your awareness of your internal state — and that awareness is the single biggest protective factor against the slow drift back into dysregulation.',
        ],
      },
      {
        h: 'The weekly inventory',
        body: [
          'Once a week — Sundays work for most people — sit with these:',
          '• Bowel movements this week — frequency, completeness?',
          '• Sleep — average hours and quality?',
          '• Skin — clear or reactive?',
          '• Mood — steady or volatile?',
          '• Energy patterns — afternoon crash or stable through the day?',
          'If any of these decline for 2 weeks straight, it is a signal to pull back into Phase 1 foods and rituals for a week — sometimes that\'s all you need.',
        ],
      },
      {
        h: 'The annual review',
        body: [
          'Once a year — birthday, new year, equinox, your choice — write down what is different from a year ago. Specific. Concrete. Sleep. Mood. Energy. Reactions to foods or environments. What used to bother you that no longer does. What still does.',
          'This is the only way to see the long arc of this work. The day-to-day is always uneven. The year-to-year is what matters.',
        ],
      },
    ],
  },
  {
    num: '8.4',
    title: 'What Comes Next',
    summary: 'The path beyond The Foundation.',
    sections: [
      {
        h: 'You are not finished',
        body: [
          'The Foundation is a beginning, not a destination. The body is dynamic. Your environment changes. Stress shows up. Travel happens. New stages of life bring new demands. The work continues — but you now have the framework to meet it.',
          'What you have built in six weeks: a stronger drainage system, a more resilient gut, a settled nervous system, a working knowledge of how your body responds to specific inputs, and a relationship with practices you can return to anytime.',
        ],
      },
      {
        h: 'The community',
        body: [
          'Office hours stay open to members forever. Drop in any time you want — even a year from now, even as preventive maintenance. Recordings are archived. New members will be in those calls; you may find yourself being the experienced voice for someone earlier in their work. That part is unexpectedly meaningful.',
        ],
      },
      {
        h: 'Stay close',
        body: [
          'Natasha sends a short weekly note about what she is learning and seeing in her practice — sometimes a research finding, sometimes a clinical pattern she is noticing, sometimes an adjustment to a recommendation. If you would like to keep receiving emails beyond the program drip, you do not need to do anything — you are already on the list.',
          'If you ever want to unsubscribe, every email has a link at the bottom. No hard feelings.',
        ],
      },
      {
        h: 'One last thing',
        body: [
          'If The Foundation made a difference for you — any difference, however small — Natasha would love to hear the specifics. Not for marketing. For her. Email info@solivana.com when you have a moment and tell her one thing.',
          'Until next time.',
        ],
      },
    ],
  },
];

export default function MaintenancePage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/maintenance" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Module 8 · After Week 6</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          Maintenance & Next Steps.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          You finished. Now what? Four lessons on how to keep the work alive — and how
          to know when to come back.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
        <div className="space-y-8">
          {LESSONS.map((l) => (
            <article key={l.num} className="card-soft p-7 md:p-10">
              <div className="flex items-baseline gap-3 flex-wrap mb-4">
                <span className="font-display text-3xl font-extralight text-solivana-amber leading-none">
                  {l.num}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-solivana-bark mb-3 leading-tight">
                {l.title}
              </h2>
              <p className="serif text-xl text-solivana-taupe italic font-light leading-snug mb-7 max-w-2xl">
                {l.summary}
              </p>
              <div className="space-y-7">
                {l.sections.map((s) => (
                  <div key={s.h}>
                    <h3 className="font-display text-lg font-medium text-solivana-bark mb-3">
                      {s.h}
                    </h3>
                    <div className="space-y-4 text-solivana-bark/90 leading-[1.75] text-[15.5px]">
                      {s.body.map((p, i) => (
                        <p
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: p
                              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-solivana-bark font-semibold">$1</strong>'),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {l.num === '8.3' && (
                <div className="mt-8 space-y-5">
                  <div className="eyebrow text-solivana-amber">Your Rituals</div>
                  <Checklist
                    id="maintenance-morning-checkin"
                    title="Morning Check-In (3 minutes, daily)"
                    items={MORNING_CHECKIN}
                    persist={false}
                  />
                  <Checklist
                    id="maintenance-weekly-inventory"
                    title="Weekly Inventory (Sundays)"
                    items={WEEKLY_INVENTORY}
                    persist={false}
                  />
                  <div className="flex justify-start">
                    <DownloadButton
                      label="Download Annual Review (PDF)"
                      htmlBody={ANNUAL_REVIEW_HTML}
                      filename="the-foundation-annual-review.pdf"
                      bare
                    />
                  </div>
                </div>
              )}
              {QUIZZES[l.num] && (
                <LessonQuiz
                  id={`maintenance-${l.num}`}
                  title={l.title}
                  questions={QUIZZES[l.num]}
                />
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 flex-wrap">
          <a
            href="/library"
            className="text-solivana-taupe hover:text-solivana-bark font-accent tracking-wider text-sm uppercase"
          >
            ← Library Home
          </a>
          <a
            href="https://scan.solivana.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Get Your Bioenergetic Scan →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
