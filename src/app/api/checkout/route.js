import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const origin = request.headers.get('origin');

    const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  managed_payments: { enabled: false },
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=false`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}