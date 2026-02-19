import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "@/actions/products";
import { ProductCard } from "@/components/features/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/features/add-to-cart-button";
import { ProductReviews } from "@/components/features/product-reviews";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount =
    product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price)
      ? Math.round(
          ((Number(product.compareAtPrice) - Number(product.price)) /
            Number(product.compareAtPrice)) *
            100
        )
      : null;

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount && (
              <Badge
                variant="destructive"
                className="absolute left-4 top-4"
              >
                -{discount}%
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md border bg-muted"
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category.name}</Badge>
              {product.featured && <Badge>Featured</Badge>}
            </div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice &&
                Number(product.compareAtPrice) > Number(product.price) && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {product.variants.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Variants</h3>
              <div className="space-y-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">{variant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {variant.stock}
                      </p>
                    </div>
                    <span className="font-semibold">
                      {variant.price
                        ? formatPrice(variant.price)
                        : formatPrice(product.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AddToCartButton
            productId={product.id}
            productName={product.name}
            productPrice={Number(product.price)}
            productImage={product.images[0] || "/placeholder-product.jpg"}
            variants={product.variants}
            inStock={product.inStock}
          />

          {product.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16 space-y-4">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                slug={relatedProduct.slug}
                price={Number(relatedProduct.price)}
                compareAtPrice={relatedProduct.compareAtPrice}
                image={
                  relatedProduct.images[0] || "/placeholder-product.jpg"
                }
                featured={relatedProduct.featured}
                inStock={relatedProduct.inStock}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-16">
        <ProductReviews
          productId={product.id}
          reviews={product.reviews}
        />
      </div>
    </div>
  );
}
