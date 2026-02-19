import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  featured?: boolean;
  inStock?: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  featured,
  inStock = true,
}: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    // In a real app, you'd fetch variant data
    addItem({
      id: `${id}-default`,
      variantId: `${id}-default`,
      productId: id,
      name,
      price: Number(price),
      image,
    });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    toggleItem({
      productId: id,
      name,
      slug,
      price: Number(price),
      image,
    });
    toast({
      title: isInWishlist(id) ? "Removed from wishlist" : "Added to wishlist",
      description: `${name} has been ${
        isInWishlist(id) ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  const discount =
    compareAtPrice && Number(compareAtPrice) > Number(price)
      ? Math.round(
          ((Number(compareAtPrice) - Number(price)) / Number(compareAtPrice)) *
            100
        )
      : null;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {featured && (
            <Badge className="absolute left-2 top-2">Featured</Badge>
          )}
          {discount && (
            <Badge
              variant="destructive"
              className="absolute right-2 top-2"
            >
              -{discount}%
            </Badge>
          )}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold line-clamp-2 hover:underline">
            {name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">{formatPrice(price)}</span>
          {compareAtPrice && Number(compareAtPrice) > Number(price) && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-4 w-4 ${
              isInWishlist(id) ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
