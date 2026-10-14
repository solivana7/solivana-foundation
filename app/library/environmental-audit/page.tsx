import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../components/LessonQuiz';
import { Checklist } from '../components/Checklist';
import { DownloadButton } from '../components/DownloadActions';

export const metadata = {
  title: 'Environmental Audit — The Foundation Library',
};

const QUIZ: QuizQuestion[] = [
  {
    q: 'If you can only audit ONE room, which has the highest leverage?',
    options: ['Kitchen', 'Bathroom', 'Bedroom', 'Garage'],
    correctIndex: 2,
    explanation: 'You spend a third of your life in the bedroom. Phone airplane mode at night, blackout, fragrance-free laundry, cool 65–68°F — these are the highest-leverage swaps in the home.',
  },
  {
    q: 'Which is FALSE about scented candles and plug-ins?',
    options: [
      'They are among the most chemically loaded products in any home',
      'They release VOCs and fragrance chemicals continuously',
      'They are essentially harmless because they are "natural" if labeled so',
      'They should be removed during the protocol',
    ],
    correctIndex: 2,
    explanation: '"Natural fragrance" is unregulated and often contains the same chemicals as synthetic. The advice during Phase 1 onward is: drop conventional candles + plug-ins entirely.',
  },
  {
    q: 'When is professional mold testing (ERMI / HERTSMI-2) worth the ~$200–300?',
    options: [
      'Only if mold is visibly growing on the wall',
      'Any time there has been visible water damage, musty smell, or prior flooding history',
      'Never; just buy an air filter',
      'Only after a doctor demands it',
    ],
    correctIndex: 1,
    explanation: 'Hidden mold can be the single highest-leverage finding in chronic, unexplained illness. Visible mold is rare; suspected exposure is common. Test before guessing.',
  },
];

const ROOMS = [
  {
    name: 'Bedroom',
    tag: 'Highest priority',
    items: [
      'Phone on airplane mode at night, or charged at least 6 feet from your head',
      'Wi-Fi router on a timer that turns off 11 p.m.–6 a.m. (most routers support this in their app)',
      'Blackout curtains or eye mask — total darkness is non-negotiable',
      'Cool room — 65–68°F (18–20°C) is the sleep-research sweet spot',
      'No scented candles, plug-ins, or air fresheners',
      'No dry-cleaned clothes hanging in the closet (off-gas perchloroethylene)',
      'Mattress: if it\'s older than 10 years and you\'ve been sleeping poorly, this is one of the highest-leverage upgrades you can make',
    ],
  },
  {
    name: 'Kitchen',
    tag: 'Second priority',
    items: [
      'Replace teflon and aluminum cookware with cast iron, stainless steel, ceramic, or enameled cast iron',
      'No plastic in contact with hot food — no heating in plastic, no plastic ladles in hot pots',
      'Filtered water for drinking AND cooking — even pasta water (chlorine evaporates into your food)',
      'Glass food storage containers (Pyrex, Weck) — phase out plastic Tupperware',
      'Wooden cutting boards over plastic',
      'Conventional dish soap to fragrance-free (Dr. Bronner\'s, Branch Basics, ECOS)',
    ],
  },
  {
    name: 'Bathroom',
    tag: 'Third priority',
    items: [
      'Switch deodorant to aluminum-free (Native, Crystal, Schmidt\'s)',
      'Shampoo + conditioner: EWG-verified or Skin Deep low-rated (Innersense, Acure, Rahua)',
      'Toothpaste without SLS or artificial sweeteners',
      'Skincare: read the label — if a cat wouldn\'t lick it, don\'t put it on your skin',
      'Tampons + pads to organic cotton (the conventional ones include pesticide residues you do not want there)',
      'Skip fragranced body lotion entirely; use straight oils (jojoba, argan, almond) or fragrance-free brands',
    ],
  },
  {
    name: 'Laundry',
    tag: 'Easy win',
    items: [
      'Switch detergent to fragrance-free (Molly\'s Suds, ECOS Free & Clear, Branch Basics, Seventh Generation Free & Clear)',
      'Drop dryer sheets entirely — replace with wool dryer balls',
      'Skip fabric softener (it leaves a film on every fiber that touches your skin and gets heated to release "freshness")',
      'No bleach unless absolutely necessary; use oxygen bleach or hydrogen peroxide',
    ],
  },
  {
    name: 'Living Areas',
    tag: 'Background',
    items: [
      'HEPA air filter in your most-used room (Austin Air, IQAir HealthPro, Molekule, Coway Mighty for budget)',
      'Houseplants for low-effort air support (peace lily, snake plant, pothos, spider plant)',
      'No scented candles, plug-ins, or sprays — these are among the most chemically loaded products in any home',
      'Dust regularly with a damp cloth — household dust holds flame retardants, phthalates, and other persistent chemicals',
      'Vacuum with a HEPA-filter vacuum',
      'Take shoes off at the door — keeps lawn pesticides and street grime out of the house',
    ],
  },
];

const PROFESSIONAL = [
  {
    title: 'Mold testing',
    body:
      'If you have any visible water damage, musty smells, or have lived in a home with prior flooding — get an ERMI or HERTSMI-2 dust test. Mycometrics and Envirobiomics ship the kits. ~$200–300. Single highest-leverage test for chronic, unexplained illness in a building you suspect.',
  },
  {
    title: 'Tap water test',
    body:
      'Tap Score and EWG Tap Water Database give you a starting picture. Most of California\'s water has chlorine, fluoride, and detectable amounts of legacy contaminants. A whole-house carbon filter is a one-time investment that pays back forever.',
  },
  {
    title: 'EMF survey',
    body:
      'For most people the bedroom-priority list above is enough. If you have severe sensitivity, an EMF surveyor (Building Biology certified) can map your home and recommend specific shielding. Worth it for sensitive bodies; overkill otherwise.',
  },
];

export default function EnvironmentalAuditPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/environmental-audit" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Reference · Environment</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          The Environmental Audit.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          The five things in your home that quietly undo every cleanse — and the simple
          swaps that protect your work. Don&apos;t do all of this at once. Pick one
          room, work through it, move to the next.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-8">
        <div className="flex justify-end">
          <DownloadButton
            label="Download Full Audit (PDF)"
            targetId="pdf-target-env-audit"
            filename="the-foundation-environmental-audit.pdf"
            title="The Environmental Audit"
            subtitle="Five rooms. Five priorities. Walk through one at a time."
          />
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-16">
        <div id="pdf-target-env-audit" className="space-y-6">
          {ROOMS.map((r, i) => (
            <article key={r.name} className="card-soft p-7 md:p-9">
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-5">
                <h2 className="font-display text-2xl md:text-3xl font-medium text-solivana-bark leading-tight">
                  <span className="text-solivana-amber font-light mr-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {r.name}
                </h2>
                <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-taupe bg-solivana-cream px-2.5 py-1 rounded-full border border-solivana-sand/40">
                  {r.tag}
                </span>
              </div>
              <Checklist
                id={`env-audit-${r.name.toLowerCase().replace(/\s+/g, '-')}`}
                items={r.items}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-4">When to call a professional</div>
        <h2 className="font-display text-3xl font-light text-solivana-bark mb-8 leading-tight">
          Three tests worth paying for.
        </h2>
        <div className="space-y-5">
          {PROFESSIONAL.map((p) => (
            <div key={p.title} className="card-flat p-5 md:p-6">
              <h3 className="font-display text-xl font-medium text-solivana-bark mb-2">
                {p.title}
              </h3>
              <p className="text-solivana-taupe leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12">
        <LessonQuiz id="environmental-audit" title="The Environmental Audit" questions={QUIZ} />
        <div className="mt-10 bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-6 md:p-7 text-solivana-bark leading-relaxed">
          <strong className="text-solivana-bark">A note on overwhelm:</strong> If this
          list makes your shoulders rise, do this instead — pick the bedroom items.
          That&apos;s where you spend a third of your life. Get the bedroom right and
          you&apos;ve done 60% of the work. Everything else is icing.
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
