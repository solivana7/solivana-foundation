'use client';

import { useEffect, useMemo, useState } from 'react';
import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';

const HABITS = [
  { id: 'water', label: 'Water + minerals (morning)' },
  { id: 'movement', label: '10 minutes of movement' },
  { id: 'sunlight', label: '5 minutes of sunlight' },
  { id: 'drainage', label: 'Drainage practice (castor pack, brushing, sauna)' },
  { id: 'binders', label: 'Binders (Phase 2 only — 30 min away from food)' },
  { id: 'diet', label: 'Stayed in current-phase diet' },
  { id: 'wind_down', label: 'Wind-down 60 min before bed' },
  { id: 'sleep_8', label: '8+ hours of sleep' },
];

const SCALES = [
  { id: 'energy', label: 'Energy (1 = drained, 10 = vibrant)' },
  { id: 'sleep', label: 'Sleep quality last night' },
  { id: 'mood', label: 'Mood / emotional steadiness' },
  { id: 'digestion', label: 'Digestion (bloating, regularity)' },
  { id: 'skin', label: 'Skin (clarity, no flares)' },
];

type DayEntry = {
  date: string; // YYYY-MM-DD
  habits: Record<string, boolean>;
  scales: Record<string, number>;
  bowel: number; // count today
  notes: string;
};

const STORAGE_KEY = 'foundation-tracker-v1';

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadAll(): Record<string, DayEntry> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, DayEntry>;
  } catch {
    return {};
  }
}

function saveAll(all: Record<string, DayEntry>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

function emptyDay(date: string): DayEntry {
  return {
    date,
    habits: Object.fromEntries(HABITS.map((h) => [h.id, false])),
    scales: Object.fromEntries(SCALES.map((s) => [s.id, 5])),
    bowel: 0,
    notes: '',
  };
}

export default function TrackerPage() {
  const [all, setAll] = useState<Record<string, DayEntry>>({});
  const today = todayKey();

  useEffect(() => {
    setAll(loadAll());
  }, []);

  const todayEntry = all[today] ?? emptyDay(today);

  function update(next: DayEntry) {
    const updated = { ...all, [today]: next };
    setAll(updated);
    saveAll(updated);
  }

  function toggleHabit(id: string) {
    update({ ...todayEntry, habits: { ...todayEntry.habits, [id]: !todayEntry.habits[id] } });
  }
  function setScale(id: string, value: number) {
    update({ ...todayEntry, scales: { ...todayEntry.scales, [id]: value } });
  }
  function setBowel(value: number) {
    update({ ...todayEntry, bowel: Math.max(0, Math.min(10, value)) });
  }
  function setNotes(value: string) {
    update({ ...todayEntry, notes: value.slice(0, 1000) });
  }

  const habitCount = Object.values(todayEntry.habits).filter(Boolean).length;
  const habitTotal = HABITS.length;
  const habitPct = Math.round((habitCount / habitTotal) * 100);

  // Last 14 days history
  const history = useMemo(() => {
    const days: DayEntry[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      days.push(all[key] ?? emptyDay(key));
    }
    return days.reverse();
  }, [all]);

  function exportData() {
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foundation-tracker-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    if (!confirm('Clear all tracker data? This cannot be undone.')) return;
    setAll({});
    saveAll({});
  }

  return (
    <main className="min-h-screen text-solivana-ink">
      <LibraryTopBar current="/library/tracker" />

      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-6">
        <div className="eyebrow mb-4">Daily Ritual Tracker</div>
        <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.05] text-solivana-bark mb-5">
          Today.
        </h1>
        <p className="text-lg text-solivana-taupe leading-relaxed max-w-2xl">
          Three minutes a day. The single biggest predictor of completion. Your data
          stays on this device — never sent to a server, never shared.
        </p>
      </section>

      {/* Today */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-6">
        <div className="card-soft p-6 md:p-8 mb-6">
          <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
            <div>
              <div className="eyebrow mb-1">Habits Today</div>
              <h2 className="font-display text-2xl font-medium text-solivana-bark">
                {habitCount} of {habitTotal} done
              </h2>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl font-extralight text-solivana-amber">
                {habitPct}%
              </div>
            </div>
          </div>
          <div className="h-2 bg-solivana-sand/30 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-solivana-amber transition-all duration-300"
              style={{ width: `${habitPct}%` }}
            />
          </div>
          <ul className="space-y-2">
            {HABITS.map((h) => {
              const checked = todayEntry.habits[h.id];
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleHabit(h.id)}
                    className="w-full text-left flex gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-solivana-cream/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber"
                  >
                    <span
                      aria-hidden="true"
                      className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        checked
                          ? 'bg-solivana-amber border-solivana-amber'
                          : 'bg-white border-solivana-sand'
                      }`}
                    >
                      {checked && <span className="text-white text-xs font-bold">✓</span>}
                    </span>
                    <span className={`text-[15px] ${checked ? 'text-solivana-bark' : 'text-solivana-taupe'}`}>
                      {h.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Scales */}
        <div className="card-soft p-6 md:p-8 mb-6">
          <div className="eyebrow mb-4">How are you, today?</div>
          <div className="space-y-5">
            {SCALES.map((s) => {
              const value = todayEntry.scales[s.id] ?? 5;
              return (
                <div key={s.id}>
                  <div className="flex items-baseline justify-between mb-2">
                    <label htmlFor={`s-${s.id}`} className="text-sm text-solivana-bark">
                      {s.label}
                    </label>
                    <span className="font-display text-xl text-solivana-amber font-medium">
                      {value}
                    </span>
                  </div>
                  <input
                    id={`s-${s.id}`}
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={value}
                    onChange={(e) => setScale(s.id, Number(e.target.value))}
                    className="w-full accent-solivana-amber"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bowel + notes */}
        <div className="card-soft p-6 md:p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
            <div>
              <div className="eyebrow mb-2">Bowel Movements Today</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setBowel(todayEntry.bowel - 1)}
                  className="w-10 h-10 rounded-full border border-solivana-sand text-solivana-bark hover:border-solivana-bark"
                >
                  −
                </button>
                <span className="font-display text-3xl font-light text-solivana-bark min-w-[2.5rem] text-center">
                  {todayEntry.bowel}
                </span>
                <button
                  type="button"
                  onClick={() => setBowel(todayEntry.bowel + 1)}
                  className="w-10 h-10 rounded-full border border-solivana-sand text-solivana-bark hover:border-solivana-bark"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-solivana-taupe mt-2 max-w-[180px]">
                Target: 1–3 complete movements daily.
              </p>
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-taupe mb-2"
              >
                Notes (optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                value={todayEntry.notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything you want to remember about today — a symptom, a craving, a moment of clarity, a question for office hours."
                className="w-full bg-white border border-solivana-sand/60 rounded-lg px-4 py-3 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 resize-y"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 14-day history */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 border-t border-solivana-sand/40">
        <div className="eyebrow mb-3">Last 14 Days</div>
        <h2 className="font-display text-3xl font-light text-solivana-bark mb-2 leading-tight">
          The shape of your last two weeks.
        </h2>
        <p className="text-solivana-taupe leading-relaxed mb-8 max-w-2xl">
          Each column is a day. Bar height shows habit completion. Color shows energy.
          Patterns are easier to see in two-week windows than day to day.
        </p>
        <div className="card-flat p-5 md:p-7">
          <div className="flex items-end justify-between gap-1 md:gap-2 h-40 mb-3">
            {history.map((d) => {
              const habitDone = Object.values(d.habits).filter(Boolean).length;
              const energy = d.scales.energy ?? 5;
              const heightPct = (habitDone / HABITS.length) * 100;
              const dayNum = Number(d.date.slice(-2));
              return (
                <div key={d.date} className="flex flex-col items-center justify-end flex-1 gap-1.5 min-w-0">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      energy >= 7
                        ? 'bg-solivana-amber'
                        : energy >= 4
                          ? 'bg-solivana-amber/60'
                          : 'bg-solivana-sand/60'
                    }`}
                    style={{ height: `${Math.max(heightPct, 2)}%` }}
                    title={`${d.date}: ${habitDone}/${HABITS.length} habits, energy ${energy}`}
                  />
                  <div className="text-[9px] text-solivana-taupe">{dayNum}</div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-5 text-xs text-solivana-taupe pt-3 border-t border-solivana-sand/40 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-solivana-amber" /> Energy 7–10
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-solivana-amber/60" /> Energy 4–6
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-solivana-sand/60" /> Energy 1–3
            </div>
          </div>
        </div>
      </section>

      {/* Footer actions */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-12">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <button type="button" onClick={exportData} className="btn-secondary">
            ↓ Export My Data (JSON)
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-accent tracking-[0.18em] uppercase text-solivana-taupe hover:text-red-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>
        <div className="bg-solivana-amber/5 border border-solivana-amber/30 rounded-xl p-5 text-sm text-solivana-bark leading-relaxed">
          <strong>Privacy:</strong> Your tracker data lives in this browser only. It
          is never sent to a server, shared with Natasha, or stored in any database.
          Export it to keep a copy. Clearing browser data clears the tracker.
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
