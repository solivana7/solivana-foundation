import { SiteTopBar } from './components/SiteTopBar';
import { SiteFooter } from './components/SiteFooter';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-solivana-cream text-solivana-bark">
      <SiteTopBar />

      <section className="max-w-2xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
        <div className="eyebrow mb-5">404</div>
        <h1 className="font-display text-5xl md:text-6xl font-semibold leading-tight text-solivana-bark mb-6">
          This page wandered off.
        </h1>
        <p className="text-lg text-solivana-taupe leading-relaxed mb-10 max-w-lg mx-auto">
          The page you&apos;re looking for doesn&apos;t exist — or it moved. Here are
          some places that probably do what you wanted.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="inline-block bg-solivana-bark text-solivana-cream font-accent tracking-[0.12em] uppercase text-sm px-8 py-4 rounded-full hover:bg-solivana-amber transition-colors shadow-sm"
          >
            ← Back to The Foundation
          </a>
          <a
            href="/quiz"
            className="inline-block bg-white text-solivana-bark border border-solivana-bark font-accent tracking-[0.12em] uppercase text-sm px-8 py-4 rounded-full hover:bg-solivana-bark hover:text-solivana-cream transition-colors"
          >
            Take the Quiz
          </a>
        </div>
        <p className="mt-10 text-sm text-solivana-taupe">
          Need help?{' '}
          <a
            href="mailto:info@solivana.com"
            className="underline decoration-solivana-sand hover:text-solivana-bark"
          >
            info@solivana.com
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
