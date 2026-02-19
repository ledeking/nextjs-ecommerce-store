import { notFound } from "next/navigation";
import { getOrderById } from "@/actions/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface OrderConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { orderId } = await params;
  const order = await getOrderById(orderId).catch(() => null);

  if (!order) {
    notFound();
  }

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-semibold">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold capitalize">{order.status.toLowerCase()}</span>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(Number(item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(order.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              {order.discount && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline">
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/account/orders">
            <Button>
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
