import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { COMPANION_SYSTEM_PROMPT } from '@/lib/companion-system-prompt';
import { verifySession, SESSION_COOKIE } from '@/lib/library-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = 'claude-sonnet-4-5';
const MAX_HISTORY = 12; // last 12 turns kept

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  // Re-verify session at the API level (middleware also gates /library, but
  // /api/library is mounted under /api so we double-check here).
  const cookieHeader = req.headers.get('cookie') || '';
  const cookieValue = cookieHeader
    .split('; ')
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.split('=')[1];
  const authed = await verifySession(cookieValue);
  if (!authed) {
    return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'AI Companion not configured.' },
      { status: 500 }
    );
  }

  let body: { messages: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request body.' }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages = incoming
    .filter(
      (m): m is ChatMessage =>
        m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 4000),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json(
      { error: 'Provide at least one user message.' },
      { status: 400 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const stream = await anthropic.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: [
            {
              type: 'text',
              text: COMPANION_SYSTEM_PROMPT,
              cache_control: { type: 'ephemeral' },
            },
          ],
          messages,
        });

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'AI error';
        console.error('[companion] error:', msg);
        controller.enqueue(
          encoder.encode(
            `\n\n[The companion ran into a problem: ${msg}. Please try again or email info@solivana.com.]`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
