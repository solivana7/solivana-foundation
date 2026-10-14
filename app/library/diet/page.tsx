import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../components/LessonQuiz';
import {
  DownloadButton,
  FOOD_REINTRODUCTION_JOURNAL_HTML,
} from '../components/DownloadActions';

export const metadata = {
  title: 'Diet Blueprint — The Foundation Library',
};

const QUIZ: QuizQuestion[] = [
  {
    q: 'Which fat sources are encouraged across all three phases?',
    options: ['Seed oils (canola, soy, sunflower)', 'Olive oil, ghee, avocado, pasture-raised butter, coconut oil', 'Margarine and shortening', 'Fat-free everything'],
    correctIndex: 1,
    explanation: 'Quality fats are foundational across all phases. Seed oils stay out — they are inflammatory and a setup for poor outcomes during cleansing.',
  },
  {
    q: 'In Phase 2, which is correctly OUT of the diet?',
    options: ['Bone broth', 'Bitter greens', 'Fermented foods AND nightshades', 'Pasture-raised proteins'],
    correctIndex: 2,
    explanation: 'Phase 2 is the only phase where fermented foods come out (so binders can work uninterrupted) and nightshades come out (to lower inflammation under herbal load).',
  },
  {
    q: 'The recommended overnight fast across all phases is:',
    options: ['No overnight fasting', '6 hours', '12 hours', '24 hours'],
    correctIndex: 2,
    explanation: 'A 12-hour overnight fast (e.g., 7 p.m. → 7 a.m.) gives the digestive system rest. It is sustainable and supports the body\'s repair cycles.',
  },
  {
    q: 'What is the recommendation for foods you discover bother you during Phase 3 reintroduction?',
    options: [
      'Force them back in; the body adapts',
      'Listen to your body and pause that food; reintroduce later or not at all',
      'Take more probiotics and ignore the reaction',
      'Switch to keto',
    ],
    correctIndex: 1,
    explanation: 'Reintroduction reveals what actually agrees with you. If a food causes bloating, skin reaction, or mood dips within 48 hrs, that is information — pause it.',
  },
];

const PHASES = [
  {
    label: 'Phase 1',
    weeks: 'Weeks 1–2',
    title: 'Build the Foundation',
    intent:
      'Open drainage. Settle the gut. Stabilize blood sugar. Make the body easy to live in before we ask anything hard of it.',
    include: [
      'Clean proteins (pasture-raised meat, wild fish, organic poultry, eggs if tolerated)',
      'Cooked leafy greens (spinach, chard, kale, collards) — 1+ cup per day',
      'Root vegetables (beets, carrots, sweet potato, parsnip)',
      'Quality fats (olive oil, ghee, avocado, pasture-raised butter, coconut oil)',
      'Mineral-rich broths (bone broth or vegetable mineral broth) — 1 cup daily',
      'Small amounts of fermented foods (sauerkraut, kefir) — if you tolerate them',
      'Filtered water with sea salt and lemon — 1 glass first thing in the morning',
      'Bitter greens (dandelion, arugula, endive) — daily, even small amounts',
    ],
    avoid: [
      'Seed oils (soy, corn, canola, sunflower, safflower, "vegetable")',
      'Refined sugar (cane, agave, syrups, baked goods, sodas)',
      'Alcohol (entirely, this phase)',
      'Cold raw foods in excess (large smoothies, big salads on an empty stomach)',
      'Conventional dairy (organic full-fat dairy in small amounts may be OK)',
      'Gluten',
      'Fast food, packaged snacks, energy drinks',
    ],
    rhythm: [
      'Three meals, no grazing',
      '12-hour overnight fast (e.g., 7 p.m. → 7 a.m.)',
      'Last meal at least 3 hours before bed',
      'Eat sitting down. Chew thoroughly. Put the fork down between bites.',
    ],
    sample: {
      morning: 'Warm water with lemon and a pinch of unrefined sea salt. Coffee or matcha (if you drink it) with breakfast, not before.',
      breakfast: '2 pasture-raised eggs scrambled in ghee + 1/2 avocado + 1 cup sautéed spinach with garlic',
      lunch: 'Wild salmon, roasted carrots and beets, side of arugula with olive oil and lemon',
      snack: '1 cup mineral broth, optional handful of soaked almonds',
      dinner: 'Slow-braised grass-fed beef with mashed sweet potato (ghee) and steamed kale',
    },
  },
  {
    label: 'Phase 2',
    weeks: 'Weeks 3–4',
    title: 'The Cleanse',
    intent:
      'Stricter than Phase 1 — and counter-intuitive in two ways. Fermented foods come out (let the binders work). Nightshades come out (lower inflammation). Bitters and antiparasitic foods come in.',
    include: [
      'Everything from Phase 1, MINUS fermented foods and nightshades',
      'Pumpkin seeds (1/4 cup daily — natural antiparasitic)',
      'Raw garlic (1 clove daily, crushed and rested 10 min before eating, if you tolerate)',
      'Fresh papaya or papaya seeds (small amounts) — natural antiparasitic',
      'Coconut oil (cooking and 1 tsp daily — lauric acid)',
      'Bitter herbs daily (dandelion tea, gentian tincture, or food-form bitters)',
      'Cilantro and parsley — generously, in everything',
      'Ginger and turmeric — fresh, daily',
    ],
    avoid: [
      'All Phase 1 avoids',
      'Fermented foods (sauerkraut, kefir, kombucha, miso) — pause this phase only',
      'Nightshades (tomato, eggplant, peppers, white potato, paprika)',
      'Sugar of all kinds — including natural sugars in excess (limit fruit to berries and small green apples)',
      'Caffeine after 2 p.m. — your liver is working harder than usual',
      'Cold foods straight from the fridge — warm or room-temp only',
    ],
    rhythm: [
      'Same as Phase 1, plus:',
      'Binders 30 minutes away from food, supplements, and coffee — set phone alarms',
      'Sauna or sweat practice 3+ times per week',
      'Sleep is non-negotiable. 8+ hours, dark room, cool.',
    ],
    sample: {
      morning: 'Warm water with lemon, sea salt, and 1 tsp of fresh-grated ginger. Optional 1 tsp coconut oil.',
      breakfast: 'Sautéed greens (chard, spinach) with 2 eggs, 1/2 cup pumpkin seeds, parsley',
      lunch: 'Roasted chicken thigh with steamed cabbage, carrots, and a generous handful of cilantro. Drizzle olive oil + lemon.',
      snack: '1 cup bone broth + 1 raw garlic clove (crushed, in the broth)',
      dinner: 'Wild salmon, sautéed bok choy with ginger, mashed sweet potato (ghee). Dandelion tea after.',
    },
  },
  {
    label: 'Phase 3',
    weeks: 'Weeks 5–6',
    title: 'Protect & Rebuild',
    intent:
      'The rebuild. Probiotics return. Fermented foods return. Bone broth and collagen come in heavy. We reintroduce previously-eliminated foods one at a time and learn what actually agrees with you.',
    include: [
      'Everything from Phase 1',
      'Fermented foods are back — small amounts of one type at a time (raw sauerkraut, kefir, kombucha)',
      'Bone broth daily (1+ cup), homemade or pasture-raised',
      'Collagen peptides (10–20g) in coffee, smoothie, or broth',
      'Prebiotic foods — onions, garlic, leeks, asparagus, dandelion greens',
      'Berries (1/2 cup daily) — antioxidant + lower-glycemic',
      'Dark chocolate (85%+) — small amounts',
      'Reintroduce: nightshades first (week 5), then dairy, then gluten if you choose (week 6)',
    ],
    avoid: [
      'Same as Phase 1',
      'Don\'t reintroduce too many foods at once — one new food every 3 days',
      'Watch for delayed reactions (24–48 hrs) — bloating, skin, mood, joint pain, energy dip',
    ],
    rhythm: [
      'Continue 12-hour overnight fast',
      'Slower meals. Bigger lunch, lighter dinner.',
      'Add gentle movement back if you pulled it during the cleanse',
      'Journal what you reintroduce and any reactions — Food Journal template in the library',
    ],
    sample: {
      morning: 'Same as Phase 2, optional collagen in your coffee or matcha',
      breakfast: 'Greek yogurt or coconut yogurt with berries, ground flax, and a small handful of walnuts',
      lunch: 'Roasted chicken with quinoa, sautéed leeks, asparagus, side salad with sauerkraut on top',
      snack: 'Bone broth + apple slices with almond butter',
      dinner: 'Grass-fed steak (small portion) with roasted root vegetables, kimchi, dark leafy greens',
    },
  },
];

export default function DietPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/diet" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Reference · Diet</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          The Diet Blueprint.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl mb-7">
          Three phases. Specific lists. No calorie counting, no apps, no perfection. The
          food carries half the protocol — get this right and the rest is easier.
        </p>
        <div className="flex flex-wrap gap-3">
          <DownloadButton
            label="Download Diet Blueprint (PDF)"
            targetId="pdf-target-diet"
            filename="the-foundation-diet-blueprint.pdf"
            title="The Diet Blueprint"
            subtitle="Three phases. What to include, what to avoid, sample days."
          />
          <DownloadButton
            label="Download Reintroduction Journal (PDF)"
            htmlBody={FOOD_REINTRODUCTION_JOURNAL_HTML}
            filename="the-foundation-reintroduction-journal.pdf"
            bare
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
        <div id="pdf-target-diet">
        <div className="space-y-12">
          {PHASES.map((p) => (
            <article key={p.label} className="card-soft p-7 md:p-10">
              <div className="flex items-baseline gap-4 flex-wrap mb-3">
                <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-3 py-1 rounded-full">
                  {p.label}
                </span>
                <span className="eyebrow">{p.weeks}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-4 leading-tight">
                {p.title}
              </h2>
              <p className="serif text-xl text-solivana-taupe italic font-light leading-snug mb-8 max-w-2xl">
                {p.intent}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="eyebrow mb-3 text-solivana-amber">Include</div>
                  <ul className="space-y-2.5">
                    {p.include.map((i) => (
                      <li key={i} className="flex gap-3 text-solivana-bark text-[15px] leading-relaxed">
                        <span aria-hidden="true" className="text-solivana-amber font-medium mt-0.5">+</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="eyebrow mb-3 text-solivana-taupe">Avoid</div>
                  <ul className="space-y-2.5">
                    {p.avoid.map((i) => (
                      <li key={i} className="flex gap-3 text-solivana-taupe text-[15px] leading-relaxed">
                        <span aria-hidden="true" className="text-solivana-sand font-medium mt-0.5">—</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-solivana-sand/40 pt-6 mb-6">
                <div className="eyebrow mb-3">Rhythm</div>
                <ul className="space-y-2 text-solivana-bark text-[15px] leading-relaxed">
                  {p.rhythm.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span aria-hidden="true" className="text-solivana-amber">◆</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-solivana-sand/40 pt-6">
                <div className="eyebrow mb-3">A Sample Day</div>
                <dl className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-3 text-[15px]">
                  {Object.entries(p.sample).map(([slot, text]) => (
                    <div key={slot} className="contents">
                      <dt className="font-accent tracking-wider uppercase text-xs text-solivana-taupe pt-1">
                        {slot}
                      </dt>
                      <dd className="text-solivana-bark leading-relaxed">{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-6 text-sm text-solivana-bark leading-relaxed">
          <strong className="text-solivana-bark">A note on individual variation:</strong>{' '}
          These lists are a starting point, not a verdict. If a food on the include list
          doesn&apos;t agree with your body, listen. If you&apos;re working with a
          registered dietitian or physician on a different protocol, defer to them. This
          blueprint is educational; it is not medical nutrition therapy and not intended
          for management of diagnosed disease.
        </div>
        </div>

        <LessonQuiz id="diet" title="The Diet Blueprint" questions={QUIZ} />
      </section>

      <SiteFooter />
    </main>
  );
}
