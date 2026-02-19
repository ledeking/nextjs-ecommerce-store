"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cart-store";
import { createOrder } from "@/actions/orders";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
  couponCode: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "US",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const orderItems = items.map((item) => ({
        variantId: item.variantId,
        productId: item.productId,
        quantity: item.quantity,
      }));

      const shippingAddress = {
        firstName: data.firstName,
        lastName: data.lastName,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        phone: data.phone,
      };

      const { checkoutUrl } = await createOrder({
        items: orderItems,
        shippingAddress,
        billingAddress: shippingAddress, // Simplified - same as shipping
        couponCode: data.couponCode,
      });

      if (checkoutUrl) {
        clearCart();
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="address1">Address</Label>
            <Input id="address1" {...register("address1")} />
            {errors.address1 && (
              <p className="text-sm text-destructive mt-1">
                {errors.address1.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
            <Input id="address2" {...register("address2")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register("state")} />
              {errors.state && (
                <p className="text-sm text-destructive mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" {...register("postalCode")} />
              {errors.postalCode && (
                <p className="text-sm text-destructive mt-1">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register("country")} />
              {errors.country && (
                <p className="text-sm text-destructive mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coupon Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="couponCode">Enter coupon code</Label>
            <Input id="couponCode" {...register("couponCode")} />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Processing..." : "Complete Order"}
      </Button>
    </form>
  );
}
