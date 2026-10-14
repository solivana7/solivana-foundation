'use client';

import { useEffect, useState } from 'react';

interface ChecklistProps {
  id: string;
  title?: string;
  items: string[];
  // If true, the checklist persists checked state in localStorage.
  // If false, state resets every visit (good for daily-checklist style use).
  persist?: boolean;
}

export function Checklist({ id, title, items, persist = true }: ChecklistProps) {
  const storageKey = `foundation-checklist-${id}`;
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (!persist) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as boolean[];
        if (Array.isArray(saved) && saved.length === items.length) {
          setChecked(saved);
        }
      }
    } catch {
      // ignore
    }
  }, [storageKey, items.length, persist]);

  function toggle(idx: number) {
    setChecked((prev) => {
      const next = prev.map((v, i) => (i === idx ? !v : v));
      if (persist) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  }

  function reset() {
    const next = items.map(() => false);
    setChecked(next);
    if (persist) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  }

  const doneCount = checked.filter(Boolean).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const allDone = total > 0 && doneCount === total;

  return (
    <div className="card-flat p-5 md:p-6 print:border print:border-solivana-sand">
      {(title || total > 0) && (
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-4">
          <div className="min-w-0">
            {title && (
              <h3 className="font-display text-base md:text-lg font-medium text-solivana-bark leading-tight">
                {title}
              </h3>
            )}
            <div className="text-xs text-solivana-taupe mt-0.5 print:hidden">
              {hydrated ? `${doneCount} of ${total} done` : `${total} item${total === 1 ? '' : 's'}`}
              {allDone && hydrated && <span className="ml-2 text-green-700">· ✓ complete</span>}
            </div>
          </div>
          {hydrated && doneCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="text-[10px] font-accent tracking-[0.18em] uppercase text-solivana-taupe hover:text-solivana-bark print:hidden"
            >
              Reset
            </button>
          )}
        </div>
      )}
      {hydrated && total > 0 && (
        <div className="h-1.5 bg-solivana-sand/30 rounded-full overflow-hidden mb-4 print:hidden">
          <div
            className="h-full bg-solivana-amber transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
      <ul className="space-y-2">
        {items.map((item, idx) => {
          const isChecked = checked[idx];
          return (
            <li key={idx}>
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(idx)}
                className="w-full text-left flex gap-3 items-start px-2 py-2 rounded-lg hover:bg-solivana-cream/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber group"
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-solivana-amber border-solivana-amber'
                      : 'bg-white border-solivana-sand group-hover:border-solivana-bark'
                  }`}
                >
                  {isChecked && (
                    <span className="text-white text-[11px] font-bold leading-none">✓</span>
                  )}
                </span>
                <span
                  className={`text-[15px] leading-relaxed ${
                    isChecked ? 'text-solivana-taupe line-through' : 'text-solivana-bark'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                  }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
