import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Stripe webhooks need the raw body for signature verification.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL || '';

  if (!secret || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe environment is not configured.' },
      { status: 500 }
    );
  }

  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Bad signature';
    console.error('[stripe webhook] verify failed:', msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await forwardToMake(makeWebhookUrl, {
          event: 'foundation.purchase.completed',
          stripe_session_id: session.id,
          stripe_customer_id: session.customer,
          stripe_payment_intent: session.payment_intent,
          customer_email: session.customer_details?.email || session.customer_email || null,
          customer_name: session.customer_details?.name || null,
          customer_phone: session.customer_details?.phone || null,
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          metadata: session.metadata || {},
          created: session.created,
        });
        break;
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await forwardToMake(makeWebhookUrl, {
          event: 'foundation.purchase.refunded',
          stripe_charge_id: charge.id,
          stripe_payment_intent: charge.payment_intent,
          customer_email: charge.billing_details?.email || null,
          customer_name: charge.billing_details?.name || null,
          amount_refunded: charge.amount_refunded,
          currency: charge.currency,
          metadata: charge.metadata || {},
        });
        break;
      }
      default:
        // Ignore unhandled event types — Stripe will retry only on non-2xx responses.
        break;
    }
  } catch (err) {
    console.error('[stripe webhook] handler error:', err);
    // Still 200 — we don't want Stripe to retry forever on Make.com hiccups.
  }

  return NextResponse.json({ received: true });
}

async function forwardToMake(url: string, payload: Record<string, unknown>) {
  if (!url) {
    console.warn('[stripe webhook] MAKE_WEBHOOK_URL not set — skipping forward');
    return;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[stripe webhook] make.com forward non-2xx:', res.status, text);
  }
}
