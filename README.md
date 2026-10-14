# The Foundation — SoliVana Wellness

**Live:** [foundation.solivana.ai](https://foundation.solivana.ai)

The Foundation is a $299, 6-week **educational** parasite-cleanse program from
SoliVana Wellness — "AI instruments that measure wellness." This repo powers both
the public marketing site and the gated member experience:

- **Marketing site** — landing page, curriculum outline, FAQ, readiness quiz,
  press kit, and contact form
- **Member library** — a magic-link-gated portal with the full 6-week protocol,
  phase-based diet blueprint, healing-response guide, 24-question Foundation
  Assessment, per-lesson quizzes, daily ritual tracker, and downloadable
  protocol PDFs
- **Streaming AI companion** — a Claude-powered assistant trained on the
  program materials, available to members 24/7 inside the library
- **Live office hours** — GHL-calendar-backed scheduling for the group call
  series

Educational program — not medical advice.

## Engineering highlights

- **Prompt caching** — the companion's system prompt is sent with
  `cache_control: { type: 'ephemeral' }`, so repeat conversations hit
  Anthropic's prompt cache and per-message cost stays low
- **Magic-link auth via Resend** — members sign in with a 60-minute,
  HMAC-SHA256-signed magic link emailed via Resend; a signed session cookie
  (90-day TTL) gates `/library` in edge middleware; a shared-password fallback
  exists but magic link is the primary path
- **GHL tagging** — sign-in and free-code redemption look the member up in
  GoHighLevel and require the `foundation-active-cohort` tag before granting
  access; redemption also stamps `foundation-tier-comp`
- **Stripe checkout + webhooks** — server-side Checkout Sessions; webhooks
  verify signatures and fan purchase/refund events out to a Make.com webhook
  for the rest of the ops stack
- **GitHub Actions CI** — type-check + production build on every push, seeded
  with the same env-var shape Railway uses so missing config surfaces in CI,
  not at deploy time

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS 3
- Anthropic Claude (streaming, prompt caching)
- Resend (transactional email) · Stripe (checkout + webhooks) · GoHighLevel
  (CRM tags) · Make.com (automation fan-out)
- Deployed on Railway via Dockerfile (Next.js standalone output)

## Layout

```
app/            marketing pages + gated /library member area
app/api/        checkout, Stripe webhook, magic-link auth, AI companion
lib/            GHL client, session/magic-link HMAC auth, base-URL helper
```

Secrets are environment variables only — see `.env.local.example` for the
full shape. No keys are committed.

Portfolio — code shared for review, not licensed for reuse.
