import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../components/LessonQuiz';
import { Checklist } from '../components/Checklist';
import { DownloadButton } from '../components/DownloadActions';

// Interactive checklists per lesson. Persist to localStorage.
const LESSON_CHECKLISTS: Record<string, { title: string; items: string[] }[]> = {
  '1.5': [
    {
      title: 'Order this week',
      items: [
        'High-quality magnesium (Biogena Magnesium 7-Salt is my first choice)',
        'Methylated B-complex (Seeking Health Homocysteine Nutrients)',
        'Vitamin D3 + K2 (Seeking Health D3K2 or Quicksilver Liposomal D3K2)',
        'Mineral drops or unrefined sea salt (Quinton Hypertonic, Concentrace, or Celtic sea salt)',
        'Activated charcoal capsules (any practitioner brand — for Week 2 onward)',
        'Castor oil + flannel cloth + hot water bottle',
        'Natural-bristle dry brush',
      ],
    },
    {
      title: 'Stock your kitchen',
      items: [
        'Bone broth (homemade or pasture-raised store-bought)',
        'Pasture-raised proteins for the week (chicken, eggs, wild fish, grass-fed beef)',
        'Cooked leafy greens (chard, kale, spinach)',
        'Root vegetables (sweet potato, beet, carrot, parsnip)',
        'Quality fats (ghee, avocado, olive oil, coconut oil)',
        'Lemons (you will use them daily)',
        'Filtered water (countertop carbon or RO filter at minimum)',
      ],
    },
    {
      title: 'Walk through your home',
      items: [
        '**Bedroom**: candles or plug-ins out, phone airplane mode at night, window covered for darkness',
        '**Kitchen**: teflon out, plastic-in-hot-food out, water filter on (or bottled water on hand)',
        '**Bathroom**: switch shampoo/conditioner/deodorant to fragrance-free if you haven\'t already',
        '**Laundry**: switch to fragrance-free detergent (Molly\'s Suds, ECOS Free)',
      ],
    },
    {
      title: 'Three questions to sit with before you start',
      items: [
        'Why am I doing this? (Write the answer down. Post it where you drink your morning water.)',
        'What does success look like for me at the end of six weeks?',
        'What am I willing to give up to do this work properly?',
      ],
    },
  ],
};

export const metadata = {
  title: 'Foundations — Pre-Work · The Foundation Library',
};

const QUIZZES: Record<string, QuizQuestion[]> = {
  '1.1': [
    {
      q: 'Why does the program spend two weeks doing "nothing but opening the plumbing" before any cleansing?',
      options: [
        'To delay the protocol so members commit more deeply.',
        'Because if drainage pathways are not open, mobilized toxins get reabsorbed instead of exiting.',
        'Because the body needs time to fast before a cleanse.',
        'To allow the herbs to be ordered.',
      ],
      correctIndex: 1,
      explanation:
        'The plumbing analogy: cleaning solution poured into a clogged sink stays in the sink. The Phase 1 work opens the drainage so what gets mobilized later can actually leave the body.',
    },
    {
      q: 'Which is NOT one of the four foundation systems we prepare in Phase 1?',
      options: [
        'Drainage pathways',
        'Gut barrier',
        'Cardiovascular endurance',
        'Mineral status',
      ],
      correctIndex: 2,
      explanation:
        'The four are drainage, gut barrier, nervous system, and mineral status. Cardiovascular endurance is not the focus — gentle movement supports lymph, but the protocol is not a fitness program.',
    },
    {
      q: 'A friend wants to skip Phase 1 and start directly with the herbal cleanse. What is the most likely outcome?',
      options: [
        'Faster, cleaner results.',
        'Reabsorption of die-off products and feeling worse for weeks.',
        'No difference if the dose is correct.',
        'Better gut barrier from the start.',
      ],
      correctIndex: 1,
      explanation:
        'Without prepared drainage, mobilized waste circulates instead of leaving. People then often quit the protocol convinced "cleansing made them sick" — when the real issue was missing prep.',
    },
  ],
  '1.2': [
    {
      q: 'What is "die-off" in the context of a parasite cleanse?',
      options: [
        'The end of a member\'s commitment to the protocol.',
        'When organisms die and release their accumulated waste, biotoxins, and metals into the body at once.',
        'A marketing term invented by cleanse companies.',
        'The point at which all parasites are gone.',
      ],
      correctIndex: 1,
      explanation:
        'Die-off is the toxic load released when organisms die during the cleanse. Without strong drainage and binders, that load overwhelms the body — which is the entire reason Phase 1 matters.',
    },
    {
      q: 'Which is FALSE about parasite exposure?',
      options: [
        'Walking barefoot in soil can be an exposure route.',
        'Only people who travel internationally are exposed.',
        'Pets can be a source of household exposure.',
        'Raw or undercooked fish and meat can be exposure routes.',
      ],
      correctIndex: 1,
      explanation:
        'Parasite exposure is widespread and does not require travel. Most adults have measurable exposure histories from common, everyday sources.',
    },
    {
      q: 'The paradox of parasite cleansing is:',
      options: [
        'The longer you wait, the worse it gets.',
        'The more parasites you have, the gentler your cleanse needs to be.',
        'Cleansing only works in spring.',
        'Symptoms always get worse before they get better.',
      ],
      correctIndex: 1,
      explanation:
        'Higher parasite load means higher die-off load. The aggressive protocols you find online are most dangerous for the people who need them most — which is exactly why The Foundation cleanses gently.',
    },
  ],
  '1.3': [
    {
      q: 'How many elimination pathways does the body use to move things out?',
      options: ['Three', 'Four', 'Six', 'Eight'],
      correctIndex: 2,
      explanation:
        'The six exits: bowels, urine, sweat, breath, lymph, and skin. If any one is sluggish, the others get overloaded.',
    },
    {
      q: 'A member reports they "do not sweat at all, even in a sauna." Which best supports this pathway?',
      options: [
        'Skip the sauna; force sweating is harmful.',
        'Build up gradually with hot Epsom baths first, then sauna.',
        'Take more vitamin C.',
        'Drink less water so the body conserves heat.',
      ],
      correctIndex: 1,
      explanation:
        'A body that has stopped sweating needs gradual support, not forcing. Hot baths with Epsom salts are gentler than dry sauna and help the body re-learn to thermoregulate. Hydration is essential, never restricted.',
    },
    {
      q: 'Which is TRUE about lymph?',
      options: [
        'Lymph has its own pump that runs continuously.',
        'Lymph moves through muscle contraction, breath, and gravity.',
        'Lymph only matters for athletes.',
        'Lymph cannot be supported with movement.',
      ],
      correctIndex: 1,
      explanation:
        'Lymph has no pump of its own. If you are sedentary, your lymph is sluggish — which is why rebounding, walking, and dry brushing matter more than people realize.',
    },
  ],
  '1.4': [
    {
      q: 'Bioenergetics looks at what aspect of the body that conventional medicine often misses?',
      options: [
        'Genetic mutations.',
        'The body as an electromagnetic system communicating via frequency.',
        'Caloric intake.',
        'Skin tone changes.',
      ],
      correctIndex: 1,
      explanation:
        'The body is biochemical AND electromagnetic. Bioenergetic scans read patterns of energetic stress — often surfacing signals before they show up on standard labs.',
    },
    {
      q: 'When is the most useful time for a Foundation member to consider a bioenergetic scan?',
      options: [
        'Only after Week 6 is complete.',
        'Before Week 3 — it can surface specific stressors to tailor the cleanse around.',
        'Only if labs come back abnormal.',
        'Never; it is unrelated to the protocol.',
      ],
      correctIndex: 1,
      explanation:
        'Pre-Week-3 timing lets the scan inform the cleanse. Members with severe symptoms or extended-prep readiness scores benefit most from this layered approach.',
    },
    {
      q: 'What discount do Foundation members receive on scan.solivana.ai?',
      options: [
        'No discount — members pay full price.',
        '20% off as a member benefit.',
        '50% off as a member benefit.',
        'A free scan with every enrollment.',
      ],
      correctIndex: 1,
      explanation:
        'Members receive 20% off the bioenergetic scan as a member benefit. The scan is non-invasive, takes about 30 minutes, and produces a detailed report that can be discussed in office hours.',
    },
  ],
  '1.5': [
    {
      q: 'What is Natasha\'s first-line magnesium recommendation for the Phase 1 stack?',
      options: [
        'Magnesium oxide from any drugstore.',
        'Biogena Magnesium 7-Salt.',
        'Whatever is on sale at Whole Foods.',
        'Epsom salts taken orally.',
      ],
      correctIndex: 1,
      explanation:
        'Biogena Magnesium 7-Salt — taken in the evening, it is the foundation magnesium for nearly every Foundation member. Full product reference is in /library/products.',
    },
    {
      q: 'Which environmental swap delivers the most leverage if you can only do one?',
      options: [
        'Replace the toaster.',
        'Audit and clean up the bedroom (where you spend a third of your life).',
        'Switch to organic shampoo.',
        'Buy new bath towels.',
      ],
      correctIndex: 1,
      explanation:
        'The bedroom is where you spend the most uninterrupted hours. Phone on airplane mode, no scented candles, blackout curtains, cool temperature, fragrance-free laundry — these are the highest-leverage swaps.',
    },
    {
      q: 'Which question is NOT one of the three Natasha asks members to sit with before they start?',
      options: [
        'Why am I doing this?',
        'What does success look like at the end of six weeks?',
        'What am I willing to give up to do this work properly?',
        'How fast can I be done?',
      ],
      correctIndex: 3,
      explanation:
        'Speed is not a useful intention for this work. The three real questions are about purpose, vision of success, and what you are willing to commit. Members who write down answers complete the program at higher rates.',
    },
  ],
};

const LESSONS = [
  {
    num: '1.1',
    title: 'The Foundation Before the Cleanse',
    duration: '8 min',
    summary: 'Why most cleanses fail — and how this one is different.',
    sections: [
      {
        h: 'The plumbing analogy',
        body: [
          'Imagine you decided to deep-clean a building. You bought industrial cleaning solution, expensive equipment, the whole setup. You poured the cleaning solution into a sink — and the sink was clogged. Now the cleaning solution sits in the sink, slowly seeping back out into the building.',
          'This is what happens when a cleanse is run on a body whose drainage pathways are not open. Your body has six exits: bowels, urine, sweat, breath, lymph, and skin. If any are running below capacity — and for most people, several are — then the things you mobilize during a cleanse have nowhere to go. They get reabsorbed. You feel worse, often for weeks.',
          'The Foundation begins with two weeks of doing nothing but opening the plumbing. Boring on the surface. The most important work of the entire program underneath.',
        ],
      },
      {
        h: 'What "foundation" means here',
        body: [
          'When I say foundation, I mean four specific systems running well enough to carry the work of the cleanse:',
          '• **Drainage** — your bowels move 1+ times per day, you sweat with effort, your lymph circulates, your liver processes',
          '• **Gut barrier** — the lining of your intestines decides what enters your bloodstream and what leaves the body. A compromised barrier means die-off products get systemically absorbed instead of escorted out.',
          '• **Nervous system** — sleep, vagal tone, parasympathetic capacity. Your body cannot detoxify in fight-or-flight.',
          '• **Mineral status** — sodium, potassium, magnesium, trace minerals. Without these, every other system fails. Mineral repletion is the unsung hero of every protocol I run.',
        ],
      },
      {
        h: 'What happens when you skip this',
        body: [
          'I have seen it many times. Someone reads a parasite cleanse blog, buys an aggressive herbal kit, and starts on day one with full doses. By day three they have a headache that will not quit, their skin breaks out, they cannot sleep, and they assume something is wrong with them.',
          'Nothing was wrong with them. Their drainage was not open and their gut barrier was not ready, and the cleanse moved faster than their body could keep up. That experience often becomes a story they tell themselves — "cleansing made me sick" — and they never try again.',
          'The Foundation prevents that. Two weeks of preparation. Then a gentle, supported cleanse. Then two weeks of rebuild. The protocol that respects the system you are working with.',
        ],
      },
    ],
  },
  {
    num: '1.2',
    title: 'What Parasites Actually Do',
    duration: '10 min',
    summary: 'The biology, the exposure paths, and the die-off problem nobody warns you about.',
    sections: [
      {
        h: 'Where they come from',
        body: [
          'Common exposure routes that surprise people: drinking unfiltered water (even in the United States), eating raw or undercooked fish and meat, walking barefoot in soil, gardening without gloves, kissing pets near the mouth, eating produce that was not properly washed, swimming in lakes or rivers, and traveling to regions with different sanitation.',
          'You do not need to be careless or unhygienic. You just need to be alive in a body that interacts with the world. Most adults have measurable exposure histories.',
        ],
      },
      {
        h: 'What they do once they are inside',
        body: [
          'Living organisms in the gut and elsewhere consume nutrients meant for you, release waste products into your system, and irritate the tissues they live in. Some can travel beyond the gut. The body responds with inflammation — which is helpful in the short term and harmful when it becomes chronic.',
          'Symptoms that often correlate (without claiming causation): persistent fatigue, brain fog, sugar cravings, sleep disruption (especially 1–4 a.m. wake-ups), skin issues, mood swings, and unexplained weight changes.',
        ],
      },
      {
        h: 'The die-off problem',
        body: [
          'When organisms die during a cleanse — and they do — they release their accumulated waste, byproducts, and any heavy metals or biotoxins they were storing all at once. Your detox pathways have to absorb that load on top of the body\'s normal daily work.',
          'If your drainage is open and your liver has support, you process it. Maybe a mild headache, slightly more vivid dreams, transient fatigue — all signs the work is landing.',
          'If your drainage is not open, you do not process it. You reabsorb it. You feel sick for weeks. And the irony: the more parasites you have, the more gentle your cleanse needs to be — because more die-off means more load.',
        ],
      },
      {
        h: 'The paradox',
        body: [
          'The aggressive parasite cleanses you find on the internet are often most dangerous for the people who need them most. The Foundation\'s entire architecture exists to solve that paradox: prepare the system thoroughly, cleanse gently, rebuild fully, maintain forever.',
        ],
      },
    ],
  },
  {
    num: '1.3',
    title: 'Your Drainage Pathways',
    duration: '7 min',
    summary: 'Six exits your body uses to move things out — and how to tell which one is stuck.',
    sections: [
      {
        h: 'The six exits',
        body: [
          '**1. Bowels.** The big one. 1–3 complete movements per day, formed but not hard, no straining. If you are not having a bowel movement every day, this is your starting point — fix this first, before anything else.',
          '**2. Urine.** Light yellow, mild odor, frequent enough that you are paying attention to hydration. Dark or strong urine consistently = under-hydrated or over-loaded.',
          '**3. Sweat.** You should sweat when you exercise or are warm. Some people have stopped sweating at all — a strong signal that lymphatic and skin pathways need attention.',
          '**4. Breath.** Deep, full, in through the nose. Most adults are mouth-breathers, especially during sleep. Breath is more eliminative than people realize.',
          '**5. Lymph.** Has no pump of its own. Moves through muscle contraction, breath, and gravity. If you are sedentary, your lymph is sluggish.',
          '**6. Skin.** Largest organ. Should not be where major detox happens (that means the others are overloaded), but it is a real pathway and worth supporting with dry brushing and clean inputs.',
        ],
      },
      {
        h: 'Which one is most often stuck',
        body: [
          'In my practice, the most common combination is sluggish bowels + sluggish lymph + diminished sweat. Hydration and movement solve a remarkable amount of this without any supplements at all.',
          'Less common but more serious: a body that has stopped sweating entirely, or a person with chronic constipation (less than one bowel movement per day). For either, the foundation work is mandatory and may need to extend beyond two weeks.',
        ],
      },
      {
        h: 'How to support each',
        body: [
          '**Bowels**: Hydration (half body weight in ounces), magnesium (especially citrate or oxide for the bowel-loosening effect, both PM), fiber from cooked vegetables, castor oil packs over the liver, gentle daily movement.',
          '**Urine**: Just drink enough water. Filtered. With minerals.',
          '**Sweat**: Sauna 3+ times per week, hot baths with Epsom salts, exercise that actually makes you sweat. If you cannot sweat, start with hot baths and work up.',
          '**Breath**: 5 minutes of nasal breathing every morning. Tape your mouth at night if mouth breathing is severe.',
          '**Lymph**: Rebound (mini trampoline), brisk walks, dry brushing, body work.',
          '**Skin**: Dry brushing, clean personal care products, infrared sauna.',
        ],
      },
    ],
  },
  {
    num: '1.4',
    title: 'Bioenergetics 101',
    duration: '8 min',
    summary: 'Your body runs on frequency, not just chemistry. Why this matters for cleansing.',
    sections: [
      {
        h: 'Beyond chemistry',
        body: [
          'Most of conventional medicine treats the body as a chemistry experiment. You have a deficiency, we add a substance. You have an excess, we remove a substance. This works for some things — emergencies, broken bones, acute infections.',
          'It does not work as well for chronic, persistent, multi-system imbalances. Because the body is also an electromagnetic system. Your cells communicate via frequency, not just molecules. Your nervous system runs on tiny voltages. Your DNA expresses or silences in response to electrical and field-based signals.',
        ],
      },
      {
        h: 'Bioenergetic stressors',
        body: [
          'Stressors show up energetically before they show up clinically. By the time a parasite, heavy metal, or chronic infection is detectable on a standard lab, it has been affecting your system for some time. Bioenergetic scans (the kind we offer at SoliVana) read patterns of energetic stress and give us early signals.',
          'This is not magic. It is well-established in functional and integrative practice. The science is younger than antibiotic chemistry, but the clinical results are repeatable.',
        ],
      },
      {
        h: 'Why this matters for The Foundation',
        body: [
          'If you are doing this work and you have not yet had a bioenergetic scan, consider getting one before Week 3. The scan often surfaces hidden stressors — a specific organism, a heavy metal load, an organ system asking for more support — that lets us tailor the cleanse to your body specifically.',
          'You can run The Foundation without a scan. Many members do. But for clients with severe symptoms or extended-prep readiness scores, a scan is one of the most useful interventions available.',
        ],
      },
      {
        h: 'How to get a scan',
        body: [
          'Visit **scan.solivana.ai** for our bioenergetic scan service. As a Foundation member you receive 20% off. The scan is non-invasive, takes about 30 minutes, and produces a detailed report of energetic patterns we can discuss in office hours.',
        ],
      },
    ],
  },
  {
    num: '1.5',
    title: 'What You Need Before Week 1',
    duration: '5 min · Checklist',
    summary: 'A quiet checklist of what to gather, prep, and order this week.',
    sections: [
      {
        h: 'Order this week',
        body: [
          '• High-quality magnesium (Biogena Magnesium 7-Salt is my first choice — see Product Protocols)',
          '• Methylated B-complex (Seeking Health Homocysteine Nutrients)',
          '• Vitamin D3 + K2 (Seeking Health D3K2 or Quicksilver Liposomal D3K2)',
          '• Mineral drops or unrefined sea salt for water (Quinton Hypertonic, Concentrace, or Celtic sea salt)',
          '• Activated charcoal capsules (any practitioner brand — for Week 2 onward)',
          '• Castor oil + flannel cloth + hot water bottle',
          '• Natural-bristle dry brush',
        ],
      },
      {
        h: 'Stock your kitchen',
        body: [
          '• Bone broth (homemade is best; pasture-raised store-bought is fine)',
          '• Pasture-raised proteins for the week (chicken, eggs, wild fish, grass-fed beef)',
          '• Cooked leafy greens (chard, kale, spinach)',
          '• Root vegetables (sweet potato, beet, carrot, parsnip)',
          '• Quality fats (ghee, avocado, olive oil, coconut oil)',
          '• Lemons (you will use them daily)',
          '• Filtered water (countertop carbon or RO filter at minimum)',
        ],
      },
      {
        h: 'Walk through your home',
        body: [
          'Quick environmental sweep before Week 1 — five minutes per room:',
          '• **Bedroom**: candles or plug-ins out, phone moves to airplane mode at night, window covered for darkness',
          '• **Kitchen**: teflon out, plastic-in-hot-food out, water filter on (or bottled water on hand)',
          '• **Bathroom**: switch shampoo/conditioner/deodorant to fragrance-free if you have not already',
          '• **Laundry**: switch to fragrance-free detergent (Molly\'s Suds, ECOS Free)',
          'Full audit lives in /library/environmental-audit. Do not try to overhaul everything in one weekend. Bedroom first.',
        ],
      },
      {
        h: 'Three questions to sit with before you start',
        body: [
          '1. Why am I doing this? (Write the answer down. Post it where you drink your morning water.)',
          '2. What does success look like for me at the end of six weeks? (Be specific. Symptoms changed? Sleep improved? Energy?)',
          '3. What am I willing to give up to do this work properly? (Caffeine after 2 p.m.? Late-night scrolling? Restaurant dinners?)',
          'These are not throwaway questions. Members who write them down complete the program at meaningfully higher rates than members who do not.',
        ],
      },
    ],
  },
];

export default function FoundationsPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/foundations" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Module 1 · Pre-Work</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          Foundations.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          The WHY before the WHAT. Five short lessons that prepare your mind for what
          your body is about to do. Read these before you start Week 1 — even if it
          delays you by a day or two. Worth it.
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
                <span className="eyebrow">{l.duration}</span>
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
                              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-solivana-bark font-semibold">$1</strong>')
                              .replace(/\n/g, '<br />'),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {LESSON_CHECKLISTS[l.num] && (
                <div className="mt-10 space-y-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="eyebrow text-solivana-amber">Your Checklists</div>
                    <DownloadButton
                      label="Download Checklist (PDF)"
                      targetId={`pdf-target-foundations-${l.num}`}
                      filename={`the-foundation-${l.num}-checklist.pdf`}
                      title={l.title}
                      subtitle={`Module 1 · Lesson ${l.num}`}
                    />
                  </div>
                  <div id={`pdf-target-foundations-${l.num}`} className="space-y-5">
                    {LESSON_CHECKLISTS[l.num].map((cl, ci) => (
                      <Checklist
                        key={ci}
                        id={`foundations-${l.num}-${ci}`}
                        title={cl.title}
                        items={cl.items}
                      />
                    ))}
                  </div>
                </div>
              )}
              {QUIZZES[l.num] && (
                <LessonQuiz
                  id={`foundations-${l.num}`}
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
          <a href="/library/protocol/1" className="btn-primary">
            Begin Week 1 →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
