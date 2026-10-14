import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../components/LessonQuiz';
import { DownloadButton } from '../components/DownloadActions';

export const metadata = {
  title: 'Healing Response Guide — The Foundation Library',
};

const QUIZ: QuizQuestion[] = [
  {
    q: 'A member reports a brief, low-grade headache on Day 3 of Week 3 that responds to water + minerals within 30 minutes. This is:',
    options: ['Red zone — stop immediately', 'Yellow zone — slow down protocol', 'Green zone — keep going', 'Unrelated to the protocol'],
    correctIndex: 2,
    explanation: 'Mild, transient symptoms responding to water + minerals are green-zone signals — the work landing. Pay attention, but no protocol changes needed.',
  },
  {
    q: 'A member has watery diarrhea more than 3 times in a single day, lasting over 24 hours. This is:',
    options: ['Green zone — keep going', 'Yellow zone — slow down protocol', 'Red zone — stop and call physician', 'Means the cleanse is working faster'],
    correctIndex: 1,
    explanation: 'Persistent diarrhea is yellow zone. Pull back: drop Phase 2 herbs for 48 hrs, double water + minerals, add binder 2x daily, return to Phase 1 foods. If it persists past another 72 hrs, escalate.',
  },
  {
    q: 'Which is a RED-zone signal that means stop the protocol immediately and contact your physician?',
    options: ['Slightly worse skin in Week 3', 'Vivid dreams', 'Severe abdominal pain that wakes you from sleep', 'Mild fatigue on Day 4'],
    correctIndex: 2,
    explanation: 'Severe abdominal pain (especially waking from sleep), bloody/black stool, vomiting >12 hrs, high fever, chest pain, suicidal thoughts, or severe allergic reaction are all red-zone — stop the protocol and seek care.',
  },
  {
    q: 'The two rules of the Healing Response are:',
    options: [
      '1) Push through. 2) Power through faster.',
      '1) Slowing down is never failure. 2) When in doubt, ask.',
      '1) Skip days. 2) Take double doses.',
      '1) Quit when uncomfortable. 2) Restart from scratch.',
    ],
    correctIndex: 1,
    explanation: 'Slowing down is never failure — you cannot lose progress by pulling back, but you can lose progress by pushing through something the body asked you to pause for. Bring questions to office hours, info@solivana.com, or your physician for red-zone.',
  },
];

const SIGNALS = [
  {
    light: 'green',
    label: 'Green · Keep going',
    items: [
      'More frequent bowel movements (1–3/day, formed)',
      'Slightly more vivid dreams or earlier wake-ups in week 3',
      'Mild fatigue lasting 1–3 days, especially around day 3–5 of Phase 2',
      'Brief, low-grade headache that responds to water + minerals',
      'Mood shifts you can name (irritable, weepy, foggy) but that pass within a day',
      'Skin looking slightly worse before it looks better',
      'Mild, transient muscle achiness or weakness',
    ],
  },
  {
    light: 'yellow',
    label: 'Yellow · Slow down',
    items: [
      'Headache that does not respond to water + minerals after 2 hours',
      'Diarrhea more than 3 times in a day, or watery stool for >24 hours',
      'New skin rash spreading or worsening past 48 hours',
      'Sleep loss more than 2 nights in a row',
      'Fatigue that prevents you from doing daily activities',
      'Persistent nausea or loss of appetite >24 hours',
      'Brain fog severe enough that you can\'t safely drive',
    ],
    action:
      'Pause new layers. Drop Phase 2 herbs for 48 hours. Double water and minerals. Add a binder (charcoal or chlorella) 2x daily. Stay in Phase 1 foods. If symptoms persist past 72 hours of slowdown, drop into yellow → red protocol below.',
  },
  {
    light: 'red',
    label: 'Red · Stop the protocol and contact your physician',
    items: [
      'Severe abdominal pain that wakes you from sleep',
      'Vomiting that you cannot keep water down for >12 hours',
      'Black, tarry, or bloody stool',
      'High fever (>101°F / 38.3°C) lasting >24 hours',
      'New chest pain, shortness of breath, or significant dizziness',
      'Suicidal thoughts or sudden severe mood collapse',
      'Severe allergic reaction (hives, swelling, throat tightness)',
    ],
    action:
      'Stop The Foundation protocol immediately. Contact your physician or seek urgent care. Tell them you have been taking herbal antimicrobials and what they are. Do not resume the protocol without medical clearance.',
  },
];

const WEEKS = [
  { w: 'Week 1', expect: 'Increased bowel movements, more thirst, possible afternoon fatigue (days 2–4). New vivid dreams. Cravings spike around day 3 — ride them.' },
  { w: 'Week 2', expect: 'Energy starts to stabilize. Sleep often improves. Skin may look slightly worse before week 3. Some people get mild irritability — a sign drainage is starting to land.' },
  { w: 'Week 3', expect: 'Phase 2 begins. Days 3–5 are the most common "healing response" window — mild fatigue, headache, mood. Lean on binders and water. This is the work landing.' },
  { w: 'Week 4', expect: 'The deep middle. Some people feel notably better by mid-week 4. Others feel quiet, slow, or emotionally surfaced. Both are normal. Office hours 2 happens this week.' },
  { w: 'Week 5', expect: 'Rebuild begins. Sleep often deepens. Skin starts to clear. You may feel an unfamiliar steadiness. Reintroduce probiotics carefully.' },
  { w: 'Week 6', expect: 'Maintenance design. Foods come back online one at a time. You\'ll learn which actually disagree with you (often a surprise). Energy stabilizes at a new baseline.' },
];

const lightStyles: Record<string, string> = {
  green: 'border-green-500/50 bg-green-50/50',
  yellow: 'border-amber-500/60 bg-amber-50/60',
  red: 'border-red-500/60 bg-red-50/50',
};
const dotStyles: Record<string, string> = {
  green: 'bg-green-500',
  yellow: 'bg-amber-500',
  red: 'bg-red-500',
};

export default function HealingResponsePage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/healing-response" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Reference · Safety</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          The Healing Response Guide.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl mb-6">
          The most important reference in the program. The difference between
          discomfort that means the work is landing — and a signal your body is asking
          you to slow down. Bookmark this. Print it. You will use it.
        </p>
        <DownloadButton
          label="Download Signal Chart (PDF)"
          targetId="pdf-target-healing-response"
          filename="the-foundation-healing-response-guide.pdf"
          title="The Healing Response Guide"
          subtitle="Green / Yellow / Red signals · what to do for each."
        />
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-12">
        <div id="pdf-target-healing-response" className="space-y-5">
          {SIGNALS.map((s) => (
            <div
              key={s.light}
              className={`border-l-4 rounded-r-2xl p-7 md:p-8 ${lightStyles[s.light]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className={`w-3 h-3 rounded-full ${dotStyles[s.light]}`} />
                <h2 className="font-display text-2xl md:text-3xl font-medium text-solivana-bark leading-tight">
                  {s.label}
                </h2>
              </div>
              <ul className="space-y-2.5 mb-5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-solivana-bark leading-relaxed">
                    <span aria-hidden="true" className="text-solivana-taupe">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {s.action && (
                <div className="bg-white/70 border border-solivana-sand/60 rounded-lg p-4 text-sm">
                  <div className="eyebrow mb-1.5">What to do</div>
                  <p className="text-solivana-bark leading-relaxed">{s.action}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-4">Week by Week</div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-8 leading-tight">
          What to expect, when.
        </h2>
        <div className="space-y-3">
          {WEEKS.map((w, i) => (
            <div key={w.w} className="card-flat p-5 flex gap-5">
              <div
                aria-hidden="true"
                className="shrink-0 w-12 h-12 rounded-full bg-solivana-cream border border-solivana-sand flex items-center justify-center font-display font-medium text-solivana-bark"
              >
                {i + 1}
              </div>
              <div>
                <div className="font-display text-lg font-medium text-solivana-bark mb-1">
                  {w.w}
                </div>
                <p className="text-solivana-taupe leading-relaxed">{w.expect}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12">
        <LessonQuiz id="healing-response" title="The Healing Response Guide" questions={QUIZ} />
        <div className="mt-10 bg-solivana-amber/5 border border-solivana-amber/40 rounded-xl p-6 md:p-8">
          <div className="eyebrow mb-3 text-solivana-amber">The Two Rules</div>
          <ol className="space-y-3 text-solivana-bark leading-relaxed list-decimal list-inside">
            <li><strong>Slowing down is never failure.</strong> You will never lose progress by pulling back. You can lose progress by pushing through something your body asked you to pause for.</li>
            <li><strong>When in doubt, ask.</strong> Email <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">info@solivana.com</a>, bring it to the next office hours, or — for anything red-zone — call your physician first.</li>
          </ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
