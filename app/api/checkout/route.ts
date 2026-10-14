import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/base-url';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_FOUNDATION_PRICE_ID;
    const baseUrl = getBaseUrl(req);

    if (!secret) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured.' },
        { status: 500 }
      );
    }
    if (!priceId) {
      return NextResponse.json(
        { error: 'STRIPE_FOUNDATION_PRICE_ID is not configured.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/enroll?canceled=1`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        product: 'the-foundation',
        source: 'foundation.solivana.ai',
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 }
      );
    }

    // Form POST → 303 redirect; fetch/JSON → return URL.
    const accept = req.headers.get('accept') || '';
    if (accept.includes('application/json')) {
      return NextResponse.json({ url: session.url, id: session.id });
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Checkout error';
    console.error('[checkout] error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
