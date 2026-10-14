import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';

export const metadata = {
  title: 'Product Protocols — The Foundation Library',
};

type Item = { need: string; product: string; dose: string; timing: string; notes?: string };

const TIMING_LAW = [
  { time: 'AM (with first meal, fat-containing)', items: 'All B-vitamins, omega-3, vitamin D3+K2, selenium, zinc, copper, carnitine, CoQ10/MitoQ, curcumin, ALA, glutathione, NAD+, rhodiola, antioxidants, BergaMet' },
  { time: 'PM (with dinner or before bed)', items: 'All magnesium, NAC, ashwagandha (KSM-66), progesterone, sleep peptides, melatonin, glycine, cortisol manager' },
];

const PHASE_1_LIVER: Item[] = [
  {
    need: 'Active B-complex (5-MTHF + methyl-B12 + P5P + riboflavin + TMG)',
    product: 'Seeking Health Homocysteine Nutrients',
    dose: '1 cap',
    timing: 'AM with breakfast',
    notes: 'Supports liver detox phase II conjugation. If sensitive to methylated forms, switch to a hydroxy-B12 form (consult).',
  },
  {
    need: 'Vitamin D3 + K2',
    product: 'Seeking Health D3K2 or Quicksilver Liposomal D3K2',
    dose: '5,000 IU D3',
    timing: 'AM with fat',
    notes: 'If gut absorption is compromised, use the liposomal.',
  },
  {
    need: 'Magnesium (foundational)',
    product: 'Biogena Magnesium 7-Salt',
    dose: 'Per label',
    timing: 'PM (bedtime)',
    notes: 'First-line magnesium for nearly every Foundation member.',
  },
];

const PHASE_1_DRAINAGE: { practice: string; gear: string; frequency: string; notes?: string }[] = [
  {
    practice: 'Castor oil pack over the liver',
    gear: 'Queen of Thrones-style organic castor oil + flannel + hot water bottle',
    frequency: '30–45 min, 4× per week, evenings',
    notes: 'Skip if pregnant or actively trying to conceive.',
  },
  {
    practice: 'Dry brushing',
    gear: 'Natural-bristle dry brush',
    frequency: '5 min, daily, pre-shower',
    notes: 'Always toward the heart.',
  },
  {
    practice: 'Coffee enema (optional, advanced)',
    gear: 'Organic light-roast coffee + enema kit',
    frequency: '1× per week max during Phase 1',
    notes: 'If new to enemas, do not start here. Consider trying after Week 2 with practitioner guidance.',
  },
  {
    practice: 'Lymph movement (rebound)',
    gear: 'Mini trampoline',
    frequency: '5–10 min, daily',
    notes: 'Walking + sauna count if you do not have a rebounder.',
  },
];

const PHASE_2_ANTIOX: Item[] = [
  {
    need: 'Glutathione (liposomal — primary detox antioxidant)',
    product: 'Quicksilver Liposomal Glutathione',
    dose: '1–2 tsp',
    timing: 'AM, fasted (30 min before food)',
    notes: 'Foundational during cleanse. Tastes intense — chase with water.',
  },
  {
    need: 'NAC (overnight glutathione synthesis)',
    product: 'Thorne NAC',
    dose: '600 mg',
    timing: 'PM (bedtime)',
    notes: 'Do not take AM — disrupts the daytime/nighttime detox rhythm.',
  },
  {
    need: 'Alpha-lipoic acid (R-form preferred)',
    product: 'Quicksilver Liposomal R-ALA or Thorne ALA',
    dose: 'Per label',
    timing: 'AM, fasted',
    notes: 'Recycles glutathione + supports liver.',
  },
  {
    need: 'Selenium (thyroid + liver support)',
    product: 'Pharma Nord SelenoPrecise',
    dose: 'Per label',
    timing: 'AM with breakfast',
    notes: 'Only selenium form with clinical RCT evidence.',
  },
  {
    need: 'Curcumin (anti-inflammatory)',
    product: 'Thorne Curcumin Phytosome (Meriva)',
    dose: 'Per label',
    timing: 'AM with fat',
    notes: 'Phase 2 only — supports liver under herbal load.',
  },
];

const PHASE_2_BINDERS: Item[] = [
  {
    need: 'Activated charcoal (broad-spectrum)',
    product: 'Practitioner-grade brand',
    dose: '500–1,000 mg',
    timing: '1× daily, between meals & supplements (30 min away)',
    notes: 'Practitioner sourcing. SoliVana does not currently stock binders — practitioner grade brands like Quicksilver Ultra Binder, Cellcore HM-ET Binder.',
  },
  {
    need: 'Bentonite clay (heavy metals)',
    product: 'Living-clay food-grade',
    dose: '1 tsp in water',
    timing: '1× daily, alternate days with charcoal',
  },
  {
    need: 'Chlorella (gentle, nutrient-rich)',
    product: 'Cracked-cell-wall, organic',
    dose: '1–2 g',
    timing: '1× daily, with binders or separately',
  },
];

const PHASE_3_GUT: Item[] = [
  {
    need: 'Probiotic (multi-strain)',
    product: 'Practitioner-grade (Seeking Health ProBiota HistaminX or similar)',
    dose: 'Per label',
    timing: 'AM or PM, away from food',
    notes: 'Start low. Histamine-sensitive members: choose histamine-friendly strains.',
  },
  {
    need: 'L-glutamine (gut barrier)',
    product: 'Pure-form powder',
    dose: '5 g',
    timing: '2× daily, between meals',
    notes: 'Supports intestinal lining repair.',
  },
  {
    need: 'Collagen peptides',
    product: 'Grass-fed, unflavored',
    dose: '10–20 g',
    timing: 'AM in coffee or smoothie',
    notes: 'Skin, hair, gut — all benefit.',
  },
  {
    need: 'Bone broth',
    product: 'Homemade or pasture-raised store-bought',
    dose: '1 cup daily',
    timing: 'Anytime',
    notes: 'The single best food for Phase 3.',
  },
];

const PHASE_3_MITO: Item[] = [
  {
    need: 'CoQ10 / Ubiquinol',
    product: 'Biogena CoQ10 Ubiquinol GOLD or MitoQ (performance)',
    dose: 'Per label',
    timing: 'AM with fat',
    notes: 'MitoQ for active/athletic members.',
  },
  {
    need: 'NAD+ precursor',
    product: 'Quicksilver NAD+ Gold',
    dose: '1 pump',
    timing: 'AM, fasted',
    notes: 'Mitochondrial energy + cellular repair. Optional but loved.',
  },
  {
    need: 'Acetyl-L-Carnitine',
    product: 'Seeking Health ALCAR',
    dose: 'Per label',
    timing: 'AM',
    notes: 'Cognitive + mitochondrial.',
  },
  {
    need: 'Omega-3 EPA/DHA',
    product: 'Nordic Naturals ProOmega',
    dose: 'Per label',
    timing: 'AM with breakfast',
    notes: 'Continue this throughout the program and after.',
  },
];

const PHASE_3_CORTISOL: Item[] = [
  {
    need: 'Non-melatonin cortisol/sleep',
    product: 'Integrative Therapeutics Cortisol Manager',
    dose: 'Per label',
    timing: 'PM (bedtime)',
  },
  {
    need: 'Ashwagandha (cortisol-lowering)',
    product: 'Protocol for Life Balance KSM-66',
    dose: 'Per label',
    timing: 'PM (bedtime); AM only if flat cortisol curve',
  },
  {
    need: 'Sleep peptides',
    product: 'Designs for Health BioSleep Peptides',
    dose: 'Per label',
    timing: 'PM (bedtime)',
  },
];

const ALWAYS_ON: Item[] = [
  {
    need: 'Zinc',
    product: 'Thorne Zinc Bisglycinate',
    dose: '15–30 mg',
    timing: 'AM with food',
  },
  {
    need: 'Copper (if zinc long-term)',
    product: 'Thorne Copper Bisglycinate',
    dose: '1–2 mg',
    timing: 'AM, opposite day from zinc',
  },
  {
    need: 'Vitamin C (immune + collagen)',
    product: 'Whole-food or buffered',
    dose: '500–1,000 mg',
    timing: 'AM and/or PM, divided',
  },
];

const ENVIRONMENTAL = [
  { cat: 'Water', items: ['Whole-house carbon + sediment filter (Aquasana, Pelican)', 'Countertop reverse osmosis (AquaTru, Berkey)', 'Add minerals back if RO: Concentrace Trace Mineral Drops or Quinton Hypertonic'] },
  { cat: 'Air', items: ['HEPA air filter in bedroom (Austin Air, Molekule, IQAir HealthPro)', 'Mold testing: ERMI or HERTSMI-2 dust test (Mycometrics, Envirobiomics)'] },
  { cat: 'EMF', items: ['Phone airplane mode at night, or ≥6 ft from head', 'Router on a timer 11 p.m.–6 a.m.', 'Avoid Wi-Fi smart-meter exposure where possible'] },
  { cat: 'Cookware', items: ['Cast iron, stainless steel, glass, ceramic — replace teflon and aluminum', 'No plastic in contact with hot food'] },
  { cat: 'Personal care', items: ['Fragrance-free laundry (Molly\'s Suds, Branch Basics, ECOS Free)', 'Drop conventional candles + plug-ins', 'Aluminum-free deodorant (Native, Crystal, Schmidt\'s)', 'EWG-verified shampoo/conditioner (Innersense, Acure, Rahua)'] },
];

function ItemTable({ items }: { items: Item[] }) {
  return (
    <div className="space-y-4">
      {items.map((it) => (
        <div key={it.need} className="card-flat p-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:gap-6 gap-2 items-start mb-3">
            <div>
              <div className="text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-1">
                Need
              </div>
              <div className="font-display text-base font-medium text-solivana-bark mb-2">
                {it.need}
              </div>
              <div className="text-[15px] text-solivana-bark">
                <strong className="text-solivana-amber font-semibold">{it.product}</strong>
              </div>
            </div>
            <div className="md:text-right">
              <div className="text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-1">
                Dose · Timing
              </div>
              <div className="text-sm text-solivana-bark">{it.dose}</div>
              <div className="text-sm text-solivana-taupe">{it.timing}</div>
            </div>
          </div>
          {it.notes && (
            <p className="text-sm text-solivana-taupe leading-relaxed pt-3 border-t border-solivana-sand/40">
              {it.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/products" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Module 5 · Reference</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          Product Protocols.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          The exact brands, doses, and timing I recommend — pulled from the SoliVana
          stocked catalog. Reference this anytime. Print it, screenshot it, bring it
          to office hours.
        </p>
      </section>

      {/* Compliance */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-4">
        <div className="bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-5 text-sm text-solivana-bark leading-relaxed">
          <strong>Educational only.</strong> Statements have not been evaluated by the
          FDA. Not intended to diagnose, treat, cure, or prevent any disease. Consult
          your physician before beginning any supplement protocol — especially if
          pregnant, nursing, taking medications, or managing a chronic condition.
        </div>
      </section>

      {/* Timing law */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12">
        <div className="eyebrow mb-4">Timing Law</div>
        <h2 className="font-display text-3xl font-light text-solivana-bark mb-3 leading-tight">
          Print this. Tape it to the fridge.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-7 max-w-2xl">
          Most timing-related supplement mistakes come from one rule: AM versus PM.
          When in doubt, follow this.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TIMING_LAW.map((t) => (
            <div key={t.time} className="card-soft p-6">
              <div className="eyebrow mb-3 text-solivana-amber">{t.time}</div>
              <p className="text-solivana-bark leading-relaxed">{t.items}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-solivana-taupe leading-relaxed mt-5 max-w-2xl">
          <strong>Binders are an exception</strong> — dose 30 minutes away from food,
          supplements, AND coffee.
        </p>
      </section>

      {/* Phase 1 */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-3 py-1 rounded-full">
            Phase 1
          </span>
          <span className="eyebrow">Weeks 1–2 · Foundation</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-3 leading-tight">
          Liver, drainage, minerals.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-10 max-w-2xl">
          Open the exits. Settle the system. Build the floor everything else stands on.
        </p>

        <h3 className="font-display text-xl font-medium text-solivana-bark mb-4">
          Liver & Detox Pathway Support
        </h3>
        <p className="text-solivana-taupe leading-relaxed mb-5 text-sm">
          Start Day 1 and continue through the entire program.
        </p>
        <ItemTable items={PHASE_1_LIVER} />

        <h3 className="font-display text-xl font-medium text-solivana-bark mt-12 mb-4">
          Drainage Practices
        </h3>
        <p className="text-solivana-taupe leading-relaxed mb-5 text-sm">
          Equipment and rituals to open the body&apos;s elimination pathways.
        </p>
        <div className="space-y-4">
          {PHASE_1_DRAINAGE.map((d) => (
            <div key={d.practice} className="card-flat p-5">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 mb-2">
                <div>
                  <div className="text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-1">
                    Practice
                  </div>
                  <div className="font-display text-base font-medium text-solivana-bark mb-2">
                    {d.practice}
                  </div>
                  <div className="text-[15px] text-solivana-bark">{d.gear}</div>
                </div>
                <div className="md:text-right">
                  <div className="text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-1">
                    Frequency
                  </div>
                  <div className="text-sm text-solivana-bark">{d.frequency}</div>
                </div>
              </div>
              {d.notes && (
                <p className="text-sm text-solivana-taupe leading-relaxed pt-3 border-t border-solivana-sand/40">
                  {d.notes}
                </p>
              )}
            </div>
          ))}
        </div>

        <h3 className="font-display text-xl font-medium text-solivana-bark mt-12 mb-4">
          Hydration & Mineral Foundation
        </h3>
        <ul className="space-y-2.5 text-solivana-bark text-[15px] leading-relaxed">
          <li>• <strong>Water target</strong>: half your bodyweight (lbs) in ounces, daily. Filtered, room-temp.</li>
          <li>• <strong>Electrolytes</strong>: pinch unrefined sea salt + squeeze of lemon in first morning glass. Mid-day repeat if you sweat or drink coffee.</li>
          <li>• <strong>Bone broth or mineral broth</strong>: 1 cup daily, mid-afternoon (warming, gut-priming).</li>
        </ul>
      </section>

      {/* Phase 2 */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-3 py-1 rounded-full">
            Phase 2
          </span>
          <span className="eyebrow">Weeks 3–4 · The Cleanse</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-3 leading-tight">
          Antioxidants, binders, gentle herbal layer.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-10 max-w-2xl">
          Continue the Phase 1 stack. Add these.
        </p>

        <h3 className="font-display text-xl font-medium text-solivana-bark mb-4">
          Antioxidant + Detox Support
        </h3>
        <ItemTable items={PHASE_2_ANTIOX} />

        <h3 className="font-display text-xl font-medium text-solivana-bark mt-12 mb-4">
          Binders <span className="text-solivana-amber text-sm">— non-negotiable in Phase 2</span>
        </h3>
        <ItemTable items={PHASE_2_BINDERS} />
      </section>

      {/* Phase 3 */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-3 py-1 rounded-full">
            Phase 3
          </span>
          <span className="eyebrow">Weeks 5–6 · Protect & Rebuild</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-3 leading-tight">
          Gut rebuild. Mitochondria. Sleep.
        </h2>

        <h3 className="font-display text-xl font-medium text-solivana-bark mt-8 mb-4">
          Gut Rebuild
        </h3>
        <ItemTable items={PHASE_3_GUT} />

        <h3 className="font-display text-xl font-medium text-solivana-bark mt-12 mb-4">
          Mitochondrial / Energy Support
        </h3>
        <ItemTable items={PHASE_3_MITO} />

        <h3 className="font-display text-xl font-medium text-solivana-bark mt-12 mb-4">
          Cortisol & Sleep <span className="text-solivana-taupe text-sm">— if Phase 2 disrupted sleep</span>
        </h3>
        <ItemTable items={PHASE_3_CORTISOL} />
      </section>

      {/* Always-on */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-3">Always-On Support</div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-3 leading-tight">
          Background nutrients across all 6 weeks.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-8 max-w-2xl">
          These do not change phase to phase. Run them throughout.
        </p>
        <ItemTable items={ALWAYS_ON} />
      </section>

      {/* Environmental */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-3">Environmental Tools</div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-3 leading-tight">
          One-time investments. Lifetime payoff.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-8 max-w-2xl">
          Not consumables. The full audit is in{' '}
          <a
            href="/library/environmental-audit"
            className="underline decoration-solivana-amber hover:text-solivana-bark"
          >
            Environmental Audit
          </a>
          .
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ENVIRONMENTAL.map((e) => (
            <div key={e.cat} className="card-flat p-6">
              <div className="eyebrow mb-3 text-solivana-amber">{e.cat}</div>
              <ul className="space-y-2 text-sm text-solivana-bark leading-relaxed">
                {e.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="text-solivana-amber">·</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / cross-links */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-6 text-sm text-solivana-bark leading-relaxed mb-8">
          <strong>For practitioner-grade peptide alternatives</strong> beyond what
          SoliVana stocks for the Foundation protocol, members are welcome to use the
          full SoliVana Peptides matcher at{' '}
          <a
            href="https://peptides.solivana.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-solivana-amber"
          >
            peptides.solivana.ai
          </a>
          . That tool produces personalized peptide protocols and is intended for
          practitioner use.
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <a
            href="/library"
            className="text-solivana-taupe hover:text-solivana-bark font-accent tracking-wider text-sm uppercase"
          >
            ← Library Home
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
