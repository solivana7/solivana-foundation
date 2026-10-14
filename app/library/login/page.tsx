import { SiteFooter } from '../../components/SiteFooter';
import { LoginForm } from './LoginForm';

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export const metadata = {
  title: 'Sign In — The Foundation Library',
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;
  return (
    <main className="min-h-screen text-solivana-bark">
      <header className="border-b border-solivana-sand/30">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <a
            href="/"
            className="font-display text-base md:text-lg font-medium tracking-tight text-solivana-ink hover:text-solivana-amber transition-colors"
          >
            The Foundation
            <span className="ml-2 hidden sm:inline text-[9px] font-accent tracking-[0.28em] uppercase text-solivana-taupe align-middle">
              by SoliVana
            </span>
          </a>
          <a
            href="/contact"
            className="text-[11px] font-accent tracking-[0.18em] uppercase text-solivana-taupe hover:text-solivana-ink"
          >
            Need Help?
          </a>
        </div>
      </header>

      <section className="max-w-md mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <div className="eyebrow mb-4">Member Library</div>
          <h1 className="font-display text-4xl md:text-5xl font-light leading-tight text-solivana-bark mb-4">
            Welcome back.
          </h1>
          <p className="text-solivana-taupe leading-relaxed">
            Sign in with the email you used at checkout — we&apos;ll send a one-tap
            link.
          </p>
        </div>

        <LoginForm initialNext={next} initialError={error} />
      </section>

      <SiteFooter />
    </main>
  );
}
