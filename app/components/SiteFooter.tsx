export function SiteFooter() {
  return (
    <footer className="bg-solivana-ink text-solivana-cream/85">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
          <div className="md:col-span-5">
            <div className="font-display text-2xl text-solivana-cream font-light mb-3">
              The Foundation
              <span className="ml-2 text-[10px] font-accent tracking-[0.28em] uppercase text-solivana-amber align-middle">
                by SoliVana
              </span>
            </div>
            <p className="text-solivana-cream/60 leading-relaxed text-sm max-w-sm">
              A 6-week educational program from SoliVana Wellness — the foundation
              that lets a parasite cleanse actually work, and last.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] font-accent tracking-[0.28em] uppercase text-solivana-amber mb-4">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/how-it-works" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/quiz" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  Take the Quiz
                </a>
              </li>
              <li>
                <a href="/about" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  About Natasha
                </a>
              </li>
              <li>
                <a href="/faq" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/enroll" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  Enroll
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] font-accent tracking-[0.28em] uppercase text-solivana-amber mb-4">
              Contact & Legal
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:info@solivana.com"
                  className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink"
                >
                  info@solivana.com
                </a>
              </li>
              <li>
                <a href="/contact" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  Contact
                </a>
              </li>
              <li>
                <a href="/terms" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refunds" className="text-solivana-cream/80 hover:text-solivana-cream rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-4 focus-visible:ring-offset-solivana-ink">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline opacity-30 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <div className="text-[10px] font-accent tracking-[0.28em] uppercase text-solivana-amber mb-3">
              Important
            </div>
            <p className="text-xs leading-relaxed text-solivana-cream/65">
              <strong className="text-solivana-cream">
                The Foundation is an educational wellness program.
              </strong>{' '}
              All content is provided for educational purposes only. Not medical
              advice. Not intended to diagnose, treat, cure, or prevent any disease.
              Statements have not been evaluated by the FDA.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-accent tracking-[0.28em] uppercase text-solivana-amber mb-3">
              Before You Begin
            </div>
            <p className="text-xs leading-relaxed text-solivana-cream/65">
              Always consult your physician before any cleanse, supplement, or dietary
              protocol — especially if pregnant, nursing, taking medications, or
              managing a chronic health condition. Individual results vary.
            </p>
          </div>
        </div>

        <div className="hairline opacity-30 mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-solivana-cream/60 font-accent tracking-wider">
          <div>
            SoliVana Wellness · 1922 El Camino Real, Redwood City, CA 94063 · (650)
            564-4325
          </div>
          <div>© {new Date().getFullYear()} SoliVana Wellness. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
