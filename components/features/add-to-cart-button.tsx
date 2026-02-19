"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  variants?: Array<{
    id: string;
    name: string;
    price?: number | null;
    stock: number;
  }>;
  inStock: boolean;
}

export function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  variants,
  inStock,
}: AddToCartButtonProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    variants && variants.length > 0 ? variants[0].id : null
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    const variant = variants?.find((v) => v.id === selectedVariant);
    const price = variant?.price ? Number(variant.price) : productPrice;
    const variantId = selectedVariant || `${productId}-default`;

    addItem({
      id: variantId,
      variantId,
      productId,
      name: productName,
      price,
      image: productImage,
      quantity,
      attributes: variant
        ? (variant as any).attributes
        : undefined,
    });

    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  if (!inStock) {
    return (
      <Button disabled className="w-full" size="lg">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {variants && variants.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            Select Variant
          </label>
          <div className="space-y-2">
            {variants.map((variant) => (
              <Button
                key={variant.id}
                variant={selectedVariant === variant.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedVariant(variant.id)}
                disabled={variant.stock === 0}
              >
                <div className="flex w-full items-center justify-between">
                  <span>{variant.name}</span>
                  <span>
                    {variant.price
                      ? `$${Number(variant.price).toFixed(2)}`
                      : `$${productPrice.toFixed(2)}`}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          className="flex-1"
          size="lg"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
