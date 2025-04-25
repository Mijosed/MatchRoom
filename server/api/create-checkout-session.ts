export default defineEventHandler(async (event) => {
  if (!process.server) return;

  const { default: Stripe } = await import("stripe");
  const config = useRuntimeConfig();

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2025-03-31.basil",
  });

  const body = await readBody(event);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: body.hotelName,
          },
          unit_amount: body.amount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${body.origin}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${body.origin}/paiement/annule`,
  });

  return { sessionId: session.id };
});
