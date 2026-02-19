import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export async function createCheckoutSession({
  orderId,
  orderNumber,
  items,
  customerEmail,
}: {
  orderId: string;
  orderNumber: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  customerEmail: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation/${orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    customer_email: customerEmail,
    metadata: {
      orderId,
      orderNumber,
    },
  });

  return session;
}
