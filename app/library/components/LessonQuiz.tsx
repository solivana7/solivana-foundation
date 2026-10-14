'use client';

import { useEffect, useRef, useState } from 'react';

export interface QuizQuestion {
  q: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonQuizProps {
  id: string;
  title?: string;
  questions: QuizQuestion[];
}

type Status = 'unanswered' | 'correct' | 'incorrect';

export function LessonQuiz({ id, title = 'Knowledge Check', questions }: LessonQuizProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [statuses, setStatuses] = useState<Record<number, Status>>(() =>
    Object.fromEntries(questions.map((_, i) => [i, 'unanswered' as Status]))
  );

  function pick(qIdx: number, optIdx: number) {
    if (statuses[qIdx] !== 'unanswered') return;
    const correct = optIdx === questions[qIdx].correctIndex;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setStatuses((prev) => ({ ...prev, [qIdx]: correct ? 'correct' : 'incorrect' }));
  }

  function reset(qIdx: number) {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[qIdx];
      return next;
    });
    setStatuses((prev) => ({ ...prev, [qIdx]: 'unanswered' }));
  }

  function openDialog() {
    dialogRef.current?.showModal();
    setOpen(true);
  }
  function closeDialog() {
    dialogRef.current?.close();
    setOpen(false);
  }

  // Close on backdrop click (native dialog doesn't do this by default)
  function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inDialog) closeDialog();
  }

  // Sync open state if user closes via ESC
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onClose() {
      setOpen(false);
    }
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  const total = questions.length;
  const answered = Object.values(statuses).filter((s) => s === 'correct').length;
  const allCorrect = total > 0 && answered === total;

  return (
    <div id={`quiz-${id}`} className="mt-10">
      {/* Trigger */}
      <button
        type="button"
        onClick={openDialog}
        className="group w-full text-left rounded-2xl border border-solivana-amber/40 bg-solivana-amber/[0.04] hover:bg-solivana-amber/[0.08] hover:border-solivana-amber transition-all p-5 md:p-6 flex items-center justify-between gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            aria-hidden="true"
            className="shrink-0 w-12 h-12 rounded-full bg-solivana-amber/15 border border-solivana-amber/40 flex items-center justify-center text-solivana-amber font-display text-xl"
          >
            {allCorrect ? '✓' : '?'}
          </span>
          <div className="min-w-0">
            <div className="eyebrow mb-1 text-solivana-amber">Knowledge Check</div>
            <div className="font-display text-base md:text-lg font-medium text-solivana-bark leading-tight truncate">
              {title}
            </div>
            <div className="text-sm text-solivana-taupe mt-0.5">
              {allCorrect
                ? 'Lesson complete · review your answers →'
                : answered > 0
                  ? `${answered} of ${total} correct so far · continue →`
                  : `${total} question${total === 1 ? '' : 's'} · test yourself →`}
            </div>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 text-[11px] font-accent tracking-[0.2em] uppercase text-solivana-amber group-hover:text-solivana-bark transition-colors"
        >
          Open →
        </span>
      </button>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        className="rounded-2xl p-0 backdrop:bg-solivana-ink/60 backdrop:backdrop-blur-sm w-[min(92vw,640px)] max-h-[85vh] m-auto open:flex open:flex-col bg-transparent"
      >
        <div className="bg-solivana-warm rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
          {/* Header */}
          <div className="px-6 md:px-8 py-5 border-b border-solivana-sand/40 flex items-start justify-between gap-4 sticky top-0 bg-solivana-warm">
            <div className="min-w-0">
              <div className="eyebrow mb-1 text-solivana-amber">Knowledge Check</div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-solivana-bark leading-tight">
                {title}
              </h3>
              <div className="text-xs text-solivana-taupe mt-1">
                {answered}/{total} correct
                {allCorrect && (
                  <span className="ml-3 inline-flex items-center text-[10px] font-accent tracking-[0.2em] uppercase text-green-800 bg-green-100 border border-green-300 px-2.5 py-0.5 rounded-full">
                    ✓ Complete
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close knowledge check"
              className="shrink-0 w-9 h-9 rounded-full border border-solivana-sand text-solivana-bark hover:border-solivana-bark hover:bg-white transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Body — scrollable */}
          <div className="overflow-y-auto px-6 md:px-8 py-6 space-y-7">
            {questions.map((qq, qIdx) => {
              const status = statuses[qIdx];
              const picked = answers[qIdx];
              return (
                <div key={qIdx}>
                  <div className="font-medium text-solivana-bark mb-3 leading-snug">
                    <span className="text-solivana-amber font-semibold mr-2">
                      {qIdx + 1}.
                    </span>
                    {qq.q}
                  </div>
                  <div className="space-y-2 mb-3" role="radiogroup" aria-label={qq.q}>
                    {qq.options.map((opt, optIdx) => {
                      const isPicked = picked === optIdx;
                      const isCorrectAnswer = optIdx === qq.correctIndex;
                      const reveal = status !== 'unanswered';
                      let cls =
                        'w-full text-left px-4 py-3 rounded-lg border transition-all text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-solivana-amber focus-visible:ring-offset-2 ';
                      if (!reveal) {
                        cls +=
                          'bg-white border-solivana-sand/60 text-solivana-bark hover:border-solivana-amber/60 cursor-pointer';
                      } else if (isCorrectAnswer) {
                        cls += 'bg-green-50 border-green-400 text-green-900';
                      } else if (isPicked && !isCorrectAnswer) {
                        cls += 'bg-red-50 border-red-300 text-red-900';
                      } else {
                        cls += 'bg-white border-solivana-sand/40 text-solivana-taupe';
                      }
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          role="radio"
                          aria-checked={isPicked}
                          onClick={() => pick(qIdx, optIdx)}
                          disabled={reveal}
                          className={cls}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                                !reveal
                                  ? isPicked
                                    ? 'bg-solivana-amber border-solivana-amber text-white'
                                    : 'border-solivana-sand bg-white'
                                  : isCorrectAnswer
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : isPicked
                                      ? 'bg-red-400 border-red-400 text-white'
                                      : 'border-solivana-sand/40 bg-white'
                              }`}
                            >
                              {reveal && isCorrectAnswer && '✓'}
                              {reveal && isPicked && !isCorrectAnswer && '✗'}
                            </span>
                            <span>{opt}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {status !== 'unanswered' && (
                    <div
                      className={`rounded-lg p-4 text-sm leading-relaxed ${
                        status === 'correct'
                          ? 'bg-green-50/80 border border-green-200 text-green-900'
                          : 'bg-amber-50/80 border border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="font-medium mb-1">
                        {status === 'correct' ? '✓ Right.' : '✗ Not quite.'}
                      </div>
                      <p>{qq.explanation}</p>
                      {status === 'incorrect' && (
                        <button
                          type="button"
                          onClick={() => reset(qIdx)}
                          className="mt-3 text-xs font-accent tracking-[0.18em] uppercase text-solivana-bark underline decoration-solivana-amber hover:text-solivana-amber"
                        >
                          Try again
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 md:px-8 py-4 border-t border-solivana-sand/40 flex items-center justify-between gap-3 bg-solivana-warm">
            <div className="text-xs text-solivana-taupe">
              {allCorrect
                ? 'All set. Close when you\'re ready.'
                : 'Your progress saves while this dialog stays open.'}
            </div>
            <button
              type="button"
              onClick={closeDialog}
              className="text-xs font-accent tracking-[0.18em] uppercase text-solivana-cream bg-solivana-bark px-5 py-2.5 rounded-full hover:bg-solivana-amber transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      {open ? null : null}
    </div>
  );
}
