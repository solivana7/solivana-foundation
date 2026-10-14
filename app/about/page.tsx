import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

export const metadata = {
  title: 'About Natasha Berness — The Foundation',
  description:
    'Wellness expert, holistic coach, and founder of SoliVana Wellness in Redwood City, California.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-12">
        <div className="eyebrow mb-5">About</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-6">
          Hi, I&apos;m Natasha.
        </h1>
        <p className="text-xl text-solivana-taupe leading-relaxed">
          Wellness expert. Holistic coach. Founder of SoliVana Wellness in Redwood
          City, California. I built this program because my clients kept asking the
          same question — &ldquo;Should I do a parasite cleanse?&rdquo; — and I was
          tired of telling them &ldquo;don&apos;t do *that* one&rdquo; without having
          something better to send them.
        </p>
      </section>

      {/* Story */}
      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-5">My Story</div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-solivana-bark mb-8">
            How I got here.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-solivana-taupe">
            <p>
              I didn&apos;t set out to be a wellness expert. I set out to feel better.
            </p>
            <p>
              For years I lived inside the same loop a lot of women I work with now know
              well — the loop where the labs come back &ldquo;normal&rdquo; while you
              can barely get through your day. Where doctors say it&apos;s stress, or
              age, or maybe try this antidepressant. Where every test is fine and
              nothing is fine.
            </p>
            <p>
              The way out wasn&apos;t a single supplement, a single diet, or a single
              practitioner. It was learning, slowly and painfully, that the body works
              in a specific order. Drainage before cleansing. Gut repair before
              die-off. Nervous system before everything. When you respect the order,
              you get better. When you skip steps, you stay stuck — sometimes for
              years.
            </p>
            <p>
              That sequence became the spine of every protocol I run. And it became
              the spine of The Foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="border-t border-solivana-sand/40">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-5">The Work</div>
          <h2 className="font-display text-3xl md:text-5xl font-light leading-[1.1] text-solivana-bark mb-4 max-w-3xl">
            One philosophy. Three places to find me.
          </h2>
          <p className="text-lg text-solivana-taupe leading-relaxed mb-12 max-w-2xl">
            A spa where every method earns its place. A signature program built from
            thousands of private sessions. And a small private practice for clients
            ready to go further.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card-soft p-8">
              <div className="eyebrow mb-3 text-solivana-amber">Flagship · Spa</div>
              <h3 className="font-display text-2xl font-medium text-solivana-bark mb-4 leading-tight">
                SoliVana Wellness
              </h3>
              <p className="text-solivana-taupe leading-relaxed">
                My flagship in Redwood City, California — and the wellness laboratory
                where every protocol I teach has to earn its place. REST Floating Therapy
                (1,100 lbs of Epsom salt, clinical-grade buoyancy), infrared sauna,
                contrast therapy, halotherapy, red light, pressotherapy, and bioenergetic
                scans, all under one roof.{' '}
                <strong className="text-solivana-bark font-medium">
                  If a method doesn&apos;t hold up here, on real bodies, week after
                  week — it never makes it into a program I write or sell.
                </strong>
              </p>
            </div>
            <div className="card-soft p-8 border-solivana-amber/30">
              <div className="eyebrow mb-3 text-solivana-amber">Signature · Program</div>
              <h3 className="font-display text-2xl font-medium text-solivana-bark mb-4 leading-tight">
                The Foundation
              </h3>
              <p className="text-solivana-taupe leading-relaxed">
                Six weeks. Three phases. The exact sequence I&apos;ve walked thousands
                of private clients through — finally distilled into a program anyone,
                anywhere can run without missing a step.{' '}
                <strong className="text-solivana-bark font-medium">
                  What the internet sells you as a parasite cleanse — done in the order
                  your body actually needs.
                </strong>
              </p>
            </div>
            <div className="card-soft p-8">
              <div className="eyebrow mb-3 text-solivana-amber">By Application · Coaching</div>
              <h3 className="font-display text-2xl font-medium text-solivana-bark mb-4 leading-tight">
                1:1 Holistic Practice
              </h3>
              <p className="text-solivana-taupe leading-relaxed">
                A handful of private clients each year. The slow, layered, fully personal
                work that no self-paced program can deliver — built around your body,
                your history, your goals.{' '}
                <strong className="text-solivana-bark font-medium">
                  Reserved for Foundation graduates and existing SoliVana clients ready
                  to go deeper.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-solivana-sand/40 bg-white/50">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="eyebrow mb-5">What I Believe</div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-solivana-bark mb-8">
            The five principles I work from.
          </h2>
          <div className="space-y-6">
            {[
              {
                t: 'The order matters more than the protocol.',
                b: 'A perfect supplement stack in the wrong order will make most people worse. A simple sequence in the right order works for almost everyone.',
              },
              {
                t: 'The body is intelligent. Get out of its way.',
                b: 'Most healing happens when we stop overriding the body and start supporting what it’s already trying to do.',
              },
              {
                t: 'Slow is fast.',
                b: 'I have never seen a real, lasting recovery happen in 30 days. Six weeks is the floor. A year is normal. Permanent is the goal.',
              },
              {
                t: 'You are not your labs.',
                b: '“Normal” on a chart and “well” in your body are not the same thing. Your symptoms are real even when the data says you’re fine.',
              },
              {
                t: 'No miracles, no shortcuts, no medical claims.',
                b: 'I will never tell you this cures anything. I will tell you what I’ve seen, in thousands of cases, when people respect the sequence.',
              },
            ].map((p, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 w-9 h-9 rounded-full bg-solivana-amber/15 border border-solivana-amber/40 text-solivana-amber flex items-center justify-center font-display font-semibold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-solivana-bark mb-1.5">
                    {p.t}
                  </h3>
                  <p className="text-solivana-taupe leading-relaxed">{p.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-solivana-sand/40">
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-solivana-bark mb-5">
            Ready to start?
          </h2>
          <p className="text-solivana-taupe text-lg mb-8 max-w-xl mx-auto">
            The Foundation is the program I&apos;ve been pointing clients toward for
            years. It&apos;s here now.
          </p>
          <a
            href="/enroll"
            className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-10 py-5 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
          >
            Enroll Now →
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
