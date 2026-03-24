// backend/src/services/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export const createCheckoutSession = async (userId: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PREMIUM_PRICE_ID!,
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/premium?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/premium?cancelled=true`,
    metadata: { userId }
  });

  return session.url;
};

export const webhookHandler = async (signature: string, body: string) => {
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  
  if (event.type === 'checkout.session.completed') {
    const userId = event.data.object.metadata.userId;
    // Upgrade user to premium
    await User.findByIdAndUpdate(userId, { premium: true });
  }
};
