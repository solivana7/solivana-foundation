import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

export const metadata = {
  title: 'FAQ — The Foundation',
  description:
    'Common questions about The Foundation — what it includes, how it works, who it\'s for, and what it costs.',
};

const FAQ_GROUPS = [
  {
    heading: 'About the Program',
    items: [
      {
        q: 'What is The Foundation?',
        a: 'A 6-week educational wellness program built around the sequence Natasha walks her clients through: prepare the body\'s drainage pathways and gut barrier first, run a gentle herbal parasite cleanse second, then rebuild and install maintenance habits. It includes ~40 short video lessons, an interactive assessment, a daily tracker, three live group calls, and a product protocol library.',
      },
      {
        q: 'How long does it take?',
        a: 'Six weeks of active protocol. You can re-run it once a year (most people do). Lifetime access means you keep the materials forever.',
      },
      {
        q: 'How much time per day does it require?',
        a: 'About 30–45 minutes total — split between a morning ritual, a couple of mid-day check-ins, and an evening wind-down. Plus 10–15 minutes of video content most days. Office hours are 60 minutes, three times during the program.',
      },
      {
        q: 'Is this a cleanse?',
        a: 'Phase 2 (Weeks 3–4) is a cleanse. Phases 1 and 3 are not. The reason most cleanses fail is that they skip Phases 1 and 3 entirely. The Foundation is what those programs are missing.',
      },
    ],
  },
  {
    heading: 'Is This For Me',
    items: [
      {
        q: 'I don\'t have any specific symptoms. Is this still useful?',
        a: 'Yes — and the Phase 1 work especially. Most people benefit from running a foundation reset annually as a maintenance practice. You don\'t need to be sick to do it.',
      },
      {
        q: 'Aren\'t parasite cleanses dangerous?',
        a: 'Aggressive ones can be — especially when run on a body that hasn\'t been prepared. The risk is the die-off load: when organisms die during a cleanse, they release accumulated waste and biotoxins into your system. If your drainage and gut barrier aren\'t ready, that load overwhelms you and you feel worse for weeks. The Foundation\'s entire first two weeks exist to prevent that. The cleanse phase itself uses gentle, supported herbal compounds — not the aggressive purgative protocols you\'ll find online.',
      },
      {
        q: 'Can I do this if I\'m on prescription medications?',
        a: 'Possibly — but only after consulting your physician. Several elements of the protocol can interact with common medications. You should not begin without clearing the program with your doctor or pharmacist.',
      },
      {
        q: 'Can I do this if I\'m pregnant or nursing?',
        a: 'No. The cleanse phase is contraindicated during pregnancy and nursing. Wait until after weaning and clear it with your physician.',
      },
      {
        q: 'I have a chronic condition. Can I do this?',
        a: 'Many people with chronic conditions benefit, but the answer depends on the condition and the medications involved. Always consult your physician first. The Foundation is educational; it does not replace medical care.',
      },
    ],
  },
  {
    heading: 'Logistics',
    items: [
      {
        q: 'When does it start?',
        a: 'You can begin the day you enroll. The course is self-paced, with a recommended weekly cadence. Live office hours align with cohort schedules — check the course for the next live call dates after you enroll.',
      },
      {
        q: 'Is there a community?',
        a: 'Yes — a small private community for active members. Live office hours are the main connection point. We keep the community intentionally small and quiet.',
      },
      {
        q: 'What if I need to pause?',
        a: 'You can pause at any point. Lifetime access means the materials are there when you\'re ready to resume. If a medical event interrupts the program, email us and we\'ll work with you.',
      },
      {
        q: 'Will I need to buy supplements?',
        a: 'Yes. The protocol uses minerals, drainage support, gentle herbs, binders, and probiotics across the three phases. Total supplement cost varies by what you already have on hand and which brands you choose — typically $150–$350 across the six weeks. The Product Protocols module gives you specific recommendations and substitutions.',
      },
    ],
  },
  {
    heading: 'Practical & Payment',
    items: [
      {
        q: 'What does it cost?',
        a: '$299, one-time payment. Lifetime access. No upsells inside the program. No auto-renewal.',
      },
      {
        q: 'Is there a refund?',
        a: 'Yes — full refund within 14 days, as long as you have not begun Phase 2 (Week 3). See the Refund Policy for details.',
      },
      {
        q: 'How do I pay?',
        a: 'Through SoliVana\'s secure checkout. We accept major credit and debit cards.',
      },
      {
        q: 'Is my health data private?',
        a: 'Yes. Your assessment answers, tracker entries, and office-hours questions are not shared outside SoliVana and the platforms required to deliver the program. See our Privacy Policy.',
      },
    ],
  },
  {
    heading: 'About Natasha',
    items: [
      {
        q: 'Is Natasha a doctor?',
        a: 'No. Natasha is a wellness expert and holistic coach, not a licensed physician. No doctor-patient relationship is created by enrolling. The program is educational. Your physician remains your primary medical resource.',
      },
      {
        q: 'Has Natasha worked with people like me?',
        a: 'Probably. Over the past decade she\'s walked thousands of clients through the same sequence, primarily women in their 30s–60s who have been told their labs are "normal" while feeling far from well. Specifics vary.',
      },
      {
        q: 'Will I get personal access to Natasha?',
        a: 'In office hours, yes — three live group calls during the program where you can bring specific questions. For 1:1 work, Natasha sees a small number of private clients each year through SoliVana Wellness; that is separate from the program.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-12">
        <div className="eyebrow mb-5">FAQ</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-6">
          Questions, answered.
        </h1>
        <p className="text-lg text-solivana-taupe leading-relaxed">
          Don&apos;t see yours?{' '}
          <a
            href="/contact"
            className="underline decoration-solivana-amber hover:text-solivana-bark"
          >
            Send it directly
          </a>
          . We respond within one business day.
        </p>
      </section>

      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <div className="space-y-12">
            {FAQ_GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="font-display text-2xl font-semibold text-solivana-bark mb-6 pb-3 border-b border-solivana-sand/50">
                  {group.heading}
                </h2>
                <div className="space-y-6">
                  {group.items.map((item) => (
                    <details
                      key={item.q}
                      className="group bg-white border border-solivana-sand/70 rounded-xl"
                    >
                      <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg font-semibold text-solivana-bark leading-snug">
                          {item.q}
                        </h3>
                        <span className="shrink-0 text-solivana-amber font-semibold text-xl mt-0.5 group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-solivana-taupe leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-solivana-sand/40">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-solivana-bark mb-5">
            Still on the fence?
          </h2>
          <p className="text-solivana-taupe text-lg mb-8 max-w-xl mx-auto">
            Reach out. I&apos;ll answer your specific question — no pitch, no pressure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-block bg-white text-solivana-bark border border-solivana-bark font-accent tracking-[0.12em] uppercase text-sm px-8 py-4 rounded-full hover:bg-solivana-bark hover:text-solivana-cream transition-colors"
            >
              Ask a Question
            </a>
            <a
              href="/enroll"
              className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-8 py-4 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
            >
              Enroll Now →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
