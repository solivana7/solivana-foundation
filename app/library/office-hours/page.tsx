import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';

export const metadata = {
  title: 'Office Hours — The Foundation Library',
};

// Force dynamic so we read env vars at request time — lets you swap the
// Riverside studio URL or GHL calendar URL on Railway without redeploying code.
export const dynamic = 'force-dynamic';

const SCHEDULE = [
  {
    n: 'Recommended Check-In #1',
    when: 'End of Your Week 2',
    focus: 'Foundation check-in',
    prompts: [
      'What is one thing I have noticed shifting in the last two weeks — however small?',
      'What is one thing I am confused about, avoiding, or quietly worried I am doing wrong?',
      'If I could ask Natasha one question, what would it be?',
    ],
  },
  {
    n: 'Recommended Check-In #2',
    when: 'End of Your Week 4',
    focus: 'Cleanse check-in',
    prompts: [
      'What healing-response signals have I had this phase?',
      'Have I had to slow down — and if so, what triggered it?',
      'What is the protocol element I have been least consistent with?',
    ],
  },
  {
    n: 'Recommended Check-In #3',
    when: 'End of Your Week 6',
    focus: 'Maintenance design + Q&A',
    prompts: [
      'What of this work do I want to keep in my life forever?',
      'What was the single most useful insight from these six weeks?',
      'What is the next layer of work I want to pursue?',
    ],
  },
];

const REPLAYS: { title: string; date: string; href: string }[] = [
  // Replays land here after each cohort. Add objects like:
  // { title: 'Call 1 — Spring 2026 Cohort', date: 'May 24, 2026', href: 'https://...' },
];

export default function OfficeHoursPage() {
  // GHL booking widget URL — set GHL_CALENDAR_URL env var on Railway to the
  // full embed URL from your GHL calendar (Calendars → click calendar →
  // "Get Embed Code" → copy the iframe `src`). Looks like:
  //   https://api.leadconnectorhq.com/widget/bookings/foundation-office-hours
  // Without it, a polite placeholder shows.
  const calendarSrc = process.env.GHL_CALENDAR_URL || null;
  // Persistent Riverside studio link for the cohort. Set RIVERSIDE_STUDIO_URL
  // on Railway to the public join URL from your Riverside studio (Pro plan,
  // 8-seat live cap). Members click this to join the live call.
  const riversideUrl = process.env.RIVERSIDE_STUDIO_URL || null;

  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/office-hours" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <div className="eyebrow mb-4">Live · Office Hours</div>
        <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-solivana-bark mb-5">
          Live with Natasha.
        </h1>
        <p className="text-lg md:text-xl text-solivana-taupe leading-relaxed max-w-2xl">
          Live group office hours every other Saturday, 11 a.m. Pacific. Drop in
          whenever — your access doesn&apos;t expire and the calendar repeats. We
          recommend three specific check-ins during your six weeks (below), but every
          session is open to every member.
        </p>
        <p className="text-sm text-solivana-taupe leading-relaxed mt-4 max-w-2xl">
          <strong className="text-solivana-bark">8 live seats per session.</strong>{' '}
          First come, first seated — be a few minutes early. If the room is full,
          the recording posts by Sunday and your questions go in the queue for
          the next call. Local to Redwood City and want to attend in person?
          Email <a href="mailto:info@solivana.com" className="underline decoration-solivana-amber">info@solivana.com</a>{' '}
          — when the live room is open we hold the same 8 at the spa.
        </p>
      </section>

      {/* Live Studio — Riverside join link */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 pt-8">
        <div className="card-soft p-7 md:p-8 border-l-4 border-solivana-amber">
          <div className="eyebrow mb-2 text-solivana-amber">Join the Live Call</div>
          <h2 className="font-display text-xl md:text-2xl font-medium text-solivana-bark mb-3 leading-tight">
            Saturday, 11 a.m. Pacific · 8 seats
          </h2>
          {riversideUrl ? (
            <>
              <p className="text-solivana-taupe leading-relaxed mb-5 max-w-2xl">
                Click below at the start of the call. Cameras on if you&apos;re
                comfortable, mute when you&apos;re not speaking. The link is the
                same every cohort.
              </p>
              <a
                href={riversideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <span aria-hidden="true">●</span>
                <span>Join Office Hours (Riverside)</span>
              </a>
            </>
          ) : (
            <p className="text-solivana-taupe leading-relaxed">
              The live join link will appear here once the cohort starts. If
              you&apos;re looking for it during a scheduled session and
              don&apos;t see it,{' '}
              <a
                href="mailto:info@solivana.com"
                className="underline decoration-solivana-amber"
              >
                email info@solivana.com
              </a>
              .
            </p>
          )}
        </div>
      </section>

      {/* GHL Booking Calendar */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-8">
        <div className="card-soft p-3 md:p-4 overflow-hidden">
          <div className="px-4 pt-3 pb-2 mb-2 border-b border-solivana-sand/40">
            <div className="eyebrow mb-1 text-solivana-amber">Reserve Your Spot</div>
            <h2 className="font-display text-xl md:text-2xl font-medium text-solivana-bark leading-tight">
              Book the next office hours
            </h2>
          </div>
          {calendarSrc ? (
            <iframe
              src={calendarSrc}
              title="Book a Foundation office hours session"
              className="w-full block border-0"
              style={{ minHeight: '720px' }}
              scrolling="no"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="rounded-xl bg-solivana-amber/5 border border-dashed border-solivana-amber/40 p-10 text-center">
              <div className="text-3xl mb-3" aria-hidden="true">
                📅
              </div>
              <h3 className="font-display text-xl font-medium text-solivana-bark mb-2">
                Calendar booking opens shortly
              </h3>
              <p className="text-solivana-taupe leading-relaxed max-w-md mx-auto mb-4">
                Once your cohort starts, the live booking calendar appears here.
                In the meantime, the office-hours schedule is below — and the
                join link is reservable from the live block above.
              </p>
              <p className="text-xs text-solivana-taupe">
                <a
                  href="mailto:info@solivana.com"
                  className="underline decoration-solivana-amber"
                >
                  Email Natasha
                </a>{' '}
                if you need an immediate slot.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Schedule */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-4">Three Recommended Check-ins</div>
        <h2 className="font-display text-3xl md:text-4xl font-light text-solivana-bark mb-4 leading-tight">
          When to come — and what to bring.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-8 max-w-2xl">
          The protocol is six weeks long. Office hours run continuously every other
          Saturday. Pick the session closest to each of these three moments — but
          you&apos;re welcome at any session, anytime.
        </p>
        <div className="space-y-5">
          {SCHEDULE.map((s) => (
            <div key={s.n} className="card-flat p-7">
              <div className="flex items-baseline gap-3 flex-wrap mb-3">
                <span className="text-[10px] font-accent tracking-[0.2em] uppercase text-solivana-amber bg-solivana-amber/10 px-2.5 py-1 rounded-full">
                  {s.n}
                </span>
                <span className="eyebrow">{s.when}</span>
              </div>
              <h3 className="font-display text-xl font-medium text-solivana-bark mb-3">
                {s.focus}
              </h3>
              <div className="text-[11px] font-accent tracking-[0.18em] uppercase text-solivana-taupe mb-2">
                Three prompts to journal before the call
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-solivana-bark text-[15px] leading-relaxed">
                {s.prompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Replays */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-4">Replays</div>
        <h2 className="font-display text-3xl font-light text-solivana-bark mb-6 leading-tight">
          Past office hours.
        </h2>
        {REPLAYS.length === 0 ? (
          <p className="text-solivana-taupe leading-relaxed">
            Recordings will appear here after each live call. Active members get access
            to all replays from the cohort they enrolled in.
          </p>
        ) : (
          <div className="space-y-3">
            {REPLAYS.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-flat p-5 flex items-center justify-between gap-4 hover:border-solivana-amber/60 transition-colors"
              >
                <div>
                  <div className="font-display text-lg font-medium text-solivana-bark">
                    {r.title}
                  </div>
                  <div className="text-sm text-solivana-taupe">{r.date}</div>
                </div>
                <span className="text-solivana-amber text-sm font-accent tracking-wider uppercase">
                  Watch →
                </span>
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12">
        <div className="bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-6 text-sm text-solivana-bark leading-relaxed">
          <strong className="text-solivana-bark">Office hours etiquette:</strong>{' '}
          Cameras on if you&apos;re comfortable. Mute when you&apos;re not speaking.
          Bring real questions, not hypotheticals — Natasha works best with specifics.
          What&apos;s shared in the call stays in the call. Recordings are edited to
          remove names if you ask.
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
