import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/features/checkout-form";
import { CheckoutSummary } from "@/components/features/checkout-summary";

export default function CheckoutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </div>
  );
}
