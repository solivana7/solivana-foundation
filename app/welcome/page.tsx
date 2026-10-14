import { SiteTopBar } from '../components/SiteTopBar';
import { SiteFooter } from '../components/SiteFooter';

// TODO: Replace with actual GHL course login URL once course is live in GHL.
const COURSE_URL = 'https://members.solivana.com/the-foundation';

const NEXT_STEPS = [
  {
    title: 'Check your email',
    body:
      'Your welcome email (from info@solivana.com) contains your course login link and your first-day action items. If you don\'t see it within 10 minutes, check your spam folder.',
  },
  {
    title: 'Take your Foundation Assessment',
    body:
      'Inside the course, start with Module 0 (Welcome) — it includes a 24-question assessment that scores your readiness and maps your starting point. This is the single most important thing to do today.',
  },
  {
    title: 'Mark your calendar',
    body:
      'Three live office hours happen at the end of Weeks 2, 4, and 6. Dates are posted inside your course. Add them to your calendar so you don\'t miss them.',
  },
  {
    title: 'Do nothing else today',
    body:
      'Don\'t order supplements. Don\'t change your diet. Don\'t start the protocol. Just watch the Welcome videos and take the assessment. Week 1 begins Monday.',
  },
];

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar rightCta={{ href: COURSE_URL, label: 'Go to Course →' }} />

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="eyebrow mb-5">You&apos;re in</div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-solivana-bark mb-6">
          Welcome to The Foundation.
        </h1>
        <p className="text-lg text-solivana-taupe leading-relaxed mb-10">
          Your body is about to get some of your best attention. Before you do anything
          else, here are the four things that matter in the next 24 hours.
        </p>

        {/* Next steps */}
        <div className="space-y-4 mb-12">
          {NEXT_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-5 bg-white border border-solivana-sand/70 rounded-xl p-6 shadow-sm"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-solivana-amber text-white flex items-center justify-center font-display font-semibold">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-xl font-semibold text-solivana-bark mb-2">
                  {step.title}
                </h3>
                <p className="text-solivana-taupe leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to course */}
        <div className="bg-white border border-solivana-sand rounded-2xl p-7 md:p-9 shadow-sm text-center mb-10">
          <div className="eyebrow mb-3">Your Course Access</div>
          <h2 className="font-display text-2xl font-semibold text-solivana-bark mb-3">
            Everything you need lives inside.
          </h2>
          <p className="text-solivana-taupe mb-6 leading-relaxed">
            Videos, the Foundation Assessment, the Diet Blueprint, the Daily Tracker,
            live call links, and the Product Protocols library.
          </p>
          <a
            href={COURSE_URL}
            className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-8 py-4 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
          >
            Open Your Course →
          </a>
        </div>

        {/* A note from Natasha */}
        <div className="bg-solivana-amber/5 border-l-4 border-solivana-amber rounded-r-xl p-6 md:p-7 mb-10">
          <div className="eyebrow mb-3">A note from Natasha</div>
          <p className="text-solivana-bark leading-relaxed italic">
            &ldquo;If you do nothing today except watch the Welcome video and take the
            assessment — that&apos;s enough. This work is slow and it is intentional.
            You don&apos;t need to sprint. You need to start, and keep going. I&apos;ll
            see you at the first office hours.&rdquo;
          </p>
          <p className="mt-3 text-sm text-solivana-taupe">— Natasha</p>
        </div>

        <div className="text-center text-sm text-solivana-taupe">
          Need help? Email{' '}
          <a href="mailto:info@solivana.com" className="underline decoration-solivana-sand hover:text-solivana-bark">
            info@solivana.com
          </a>{' '}
          and we&apos;ll get back to you within 1 business day.
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
