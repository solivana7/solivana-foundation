interface LibraryTopBarProps {
  current?: string;
}

const NAV = [
  { href: '/library', label: 'Home' },
  { href: '/library/foundations', label: 'Foundations' },
  { href: '/library/assessment', label: 'Assessment' },
  { href: '/library/protocol/1', label: 'Protocol' },
  { href: '/library/diet', label: 'Diet' },
  { href: '/library/products', label: 'Products' },
  { href: '/library/office-hours', label: 'Office Hours' },
];

export function LibraryTopBar({ current }: LibraryTopBarProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[rgba(246,241,236,0.9)] border-b border-solivana-sand/30">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        <a
          href="/library"
          className="font-display text-base md:text-lg font-medium tracking-tight text-solivana-ink hover:text-solivana-amber transition-colors shrink-0"
        >
          The Foundation
          <span className="ml-2 hidden sm:inline text-[9px] font-accent tracking-[0.28em] uppercase text-solivana-amber align-middle">
            Member Library
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-6 overflow-x-auto"
          aria-label="Library"
        >
          {NAV.map((item) => {
            const active = current && (item.href === current || (item.href !== '/library' && current?.startsWith(item.href)));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'text-solivana-ink'
                    : 'text-solivana-ink/60 hover:text-solivana-ink'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <form action="/api/library/logout" method="POST" className="shrink-0">
          <button
            type="submit"
            className="text-[11px] font-accent tracking-[0.18em] uppercase text-solivana-taupe hover:text-solivana-ink transition-colors px-3 py-2"
          >
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
