'use client';

import { useEffect, useRef, useState } from 'react';
import { LibraryTopBar } from '../components/LibraryTopBar';
import { SiteFooter } from '../../components/SiteFooter';

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'I am on Day 4 of Week 3 and I have a headache. Is this normal?',
  'How do I know if my drainage is open enough to start Phase 2?',
  'Can I drink coffee during Phase 2 of the cleanse?',
  'What does it mean if my skin breaks out in Week 3?',
  'I have not been sweating during sauna. What should I add?',
];

export default function CompanionPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, streaming]);

  async function send(prompt?: string) {
    const text = (prompt ?? input).trim();
    if (!text || streaming) return;

    setInput('');
    setError('');

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: text },
    ];
    setMessages(newMessages);
    setStreaming(true);

    try {
      const res = await fetch('/api/library/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages([
          ...newMessages,
          { role: 'assistant', content: assistantText },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setStreaming(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setError('');
  }

  return (
    <main className="min-h-screen flex flex-col text-solivana-ink">
      <LibraryTopBar current="/library/companion" />

      <section className="max-w-3xl mx-auto w-full px-5 md:px-8 pt-10 md:pt-12 pb-4">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <div className="eyebrow mb-3 text-solivana-amber">AI · Always On</div>
            <h1 className="font-display text-3xl md:text-5xl font-light leading-[1.05] text-solivana-bark mb-3">
              The AI Companion.
            </h1>
            <p className="text-solivana-taupe leading-relaxed max-w-xl">
              A private AI assistant trained on Natasha&apos;s Foundation materials.
              Ask anything about the protocol. It&apos;s an AI tool, not Natasha — and
              not a replacement for office hours or your physician.
            </p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              className="text-[11px] font-accent tracking-[0.18em] uppercase text-solivana-taupe hover:text-solivana-bark"
            >
              ↻ New Conversation
            </button>
          )}
        </div>
      </section>

      {/* Chat area */}
      <section className="flex-1 max-w-3xl mx-auto w-full px-5 md:px-8 pb-4">
        <div
          ref={scrollRef}
          className="card-soft p-5 md:p-7 min-h-[420px] max-h-[60vh] overflow-y-auto space-y-5"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <div>
              <p className="text-solivana-taupe leading-relaxed mb-5">
                A few questions members commonly ask. Tap one to start, or type your
                own below.
              </p>
              <div className="space-y-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="block w-full text-left px-4 py-3 rounded-xl border border-solivana-sand/60 bg-white hover:border-solivana-amber hover:bg-solivana-amber/5 transition-colors text-solivana-bark text-[15px] leading-snug"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 leading-relaxed text-[15.5px] whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-solivana-bark text-solivana-cream rounded-br-md'
                      : 'bg-solivana-cream/80 border border-solivana-sand/40 text-solivana-bark rounded-bl-md'
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? '...' : '')}
                </div>
              </div>
            ))
          )}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Input */}
      <section className="max-w-3xl mx-auto w-full px-5 md:px-8 pb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={streaming ? 'Companion is responding…' : 'Ask anything about the protocol…'}
            disabled={streaming}
            className="flex-1 bg-white border border-solivana-sand/60 rounded-full px-5 py-3.5 text-solivana-bark placeholder:text-solivana-sand focus:outline-none focus:border-solivana-amber focus:ring-2 focus:ring-solivana-amber/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {streaming ? 'Thinking…' : 'Send'}
          </button>
        </form>
        <p className="text-xs text-solivana-taupe mt-3 leading-relaxed text-center max-w-xl mx-auto">
          The Companion is for educational support only. It is not medical advice and
          will not diagnose or treat conditions. For urgent symptoms (severe pain,
          vomiting, bleeding, suicidal thoughts), call your physician or 911. Your
          chats are private — not stored, not used for training.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
