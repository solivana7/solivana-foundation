import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';
import { LessonQuiz, type QuizQuestion } from '../components/LessonQuiz';
import { Checklist } from '../components/Checklist';
import { DownloadButton } from '../components/DownloadActions';

export const metadata = {
  title: 'Family & Pet Protocol — The Foundation Library',
};

const QUIZ: QuizQuestion[] = [
  {
    q: 'Where does most reinfection actually come from?',
    options: ['Foreign travel', 'Restaurants', 'Your own household', 'Public bathrooms'],
    correctIndex: 2,
    explanation: 'Roughly 90% of reinfection traces to the household — shared beds, pets, toothbrushes, kissing. The Family & Pet Protocol exists to address that.',
  },
  {
    q: 'Can children safely run The Foundation as written?',
    options: [
      'Yes, identically to adults',
      'No — the protocol is designed for adults 18+; children need a pediatric functional-medicine practitioner',
      'Yes, at half dose',
      'Only after age 12',
    ],
    correctIndex: 1,
    explanation: 'The Foundation is not designed for pediatric protocols. For children, the higher-leverage moves are clean water, fragrance-free environment, hand-washing, organic dirty-dozen produce, and working with a pediatric specialist.',
  },
  {
    q: 'A herbal antiparasitic safe for dogs is automatically safe for cats. True or false?',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: 'False — and dangerously so. Cats are far more sensitive than dogs and many herbs (especially essential oils, certain phytochemicals) that are dog-safe are toxic to cats. Always defer to your vet for cats.',
  },
];

const HOUSEHOLD = [
  'Wash bedding in hot water weekly during your cleanse weeks (Phase 2 especially)',
  'Disinfect doorknobs, faucets, and shared surfaces after Phase 1',
  'Replace your toothbrush at the start of Phase 2 and again at the start of Phase 3',
  'Don\'t share towels during Phase 2 — even with a partner',
  'Wash hands after pet contact, before meals, after using the bathroom (yes, the basics — they matter)',
  'If you garden, gloves on. If you walk barefoot in soil, wash thoroughly afterward.',
];

const KIDS = [
  'Talk to your pediatrician before adapting any of this for a child. The Foundation is not designed for pediatric protocols.',
  'Children have lower tolerance for cleansing herbs. The kid-friendly version of this work is mostly food, sleep, and removing inputs (sugar, dyes, fragrance).',
  'Higher-leverage swaps for kids: clean water, fragrance-free everything in their environment, organic for the dirty-dozen produce, hand-washing routine, no glyphosate-laden grains as staples.',
  'For specific concerns (gut issues, recurring infections, behavioral changes after antibiotics), work with a pediatric functional-medicine practitioner. SoliVana can refer you.',
];

const PETS = [
  {
    title: 'Dogs',
    items: [
      'Annual fecal panel at the vet — most parasite issues in dogs are caught here',
      'Pumpkin seeds (raw, ground, 1/4 tsp per 10 lbs body weight, 1–2x daily for 1 week) — natural mild antiparasitic, ask your vet first if your dog is on medications',
      'Diatomaceous earth (food grade only) is sometimes used by holistic vets — verify dose with your vet before use',
      'Filtered water in their bowl, not tap',
      'Wash beds and toys monthly',
      'For active treatment of confirmed parasites, work with your vet — natural support is adjunct, not replacement',
    ],
  },
  {
    title: 'Cats',
    items: [
      'Cats are more sensitive than dogs. Most herbal antiparasitics safe for dogs are NOT safe for cats — never assume.',
      'Annual fecal panel at the vet',
      'Filtered water (cats often drink less when water tastes off)',
      'Quality protein-forward food without fillers',
      'For confirmed parasites, see your vet. Do not improvise.',
    ],
  },
];

export default function FamilyPetsPage() {
  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/family-pets" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Reference · Household</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          Family &amp; Pet Protocol.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          Reinfection is almost always living in your own house. The good news: most of
          what protects your foundation also protects everyone else under your roof.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-4">
        <div className="flex justify-end">
          <DownloadButton
            label="Download Family & Pet Protocol (PDF)"
            targetId="pdf-target-family-pets"
            filename="the-foundation-family-pet-protocol.pdf"
            title="Family & Pet Protocol"
            subtitle="Reinfection lives in your house. Protect your work."
          />
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-4">
        <div id="pdf-target-family-pets">
          <div className="card-soft p-7 md:p-9">
            <div className="eyebrow mb-3 text-solivana-amber">Whole-Household Hygiene</div>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-solivana-bark mb-5 leading-tight">
              Six small habits that protect your work.
            </h2>
            <Checklist id="family-household-hygiene" items={HOUSEHOLD} />
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-8">
        <div className="card-soft p-7 md:p-9">
          <div className="eyebrow mb-3 text-solivana-amber">Kids</div>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-solivana-bark mb-5 leading-tight">
            What translates, what doesn&apos;t.
          </h2>
          <ul className="space-y-3">
            {KIDS.map((k) => (
              <li
                key={k}
                className="flex gap-3 text-solivana-bark leading-relaxed text-[15px]"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-solivana-amber"
                />
                <span>{k}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-solivana-amber/10 border-l-4 border-solivana-amber rounded-r-lg p-4 text-sm">
            <strong className="text-solivana-bark">Important:</strong> The Foundation
            is designed for adults 18+. For children, consult a pediatric
            functional-medicine practitioner. SoliVana does not prescribe pediatric
            protocols.
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PETS.map((p) => (
            <article key={p.title} className="card-soft p-7">
              <div className="eyebrow mb-3 text-solivana-amber">Pet Protocol</div>
              <h2 className="font-display text-2xl font-medium text-solivana-bark mb-4 leading-tight">
                {p.title}
              </h2>
              <ul className="space-y-2.5">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-3 text-solivana-bark leading-relaxed text-sm"
                  >
                    <span aria-hidden="true" className="text-solivana-amber mt-0.5">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-5 text-sm text-solivana-bark leading-relaxed">
          <strong className="text-solivana-bark">A note on pet care:</strong> The pet
          guidance here is general support, not veterinary advice. For confirmed
          parasites, infections, or any change in your pet&apos;s condition, see your
          veterinarian. Holistic vets exist and are often worth the drive.
        </div>
        <LessonQuiz id="family-pets" title="Family & Pet Protocol" questions={QUIZ} />
      </section>

      <SiteFooter />
    </main>
  );
}
