"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/constants";

export function CheckoutSummary() {
  const { items } = useCartStore();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
              <p className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
