import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return Response.json({ paid: true });
    }
    return Response.json({ paid: false });
  } catch (error) {
    return Response.json({ paid: false });
  }
}