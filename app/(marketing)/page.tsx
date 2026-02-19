import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/features/product-card";
import { getFeaturedProducts, getCategories } from "@/actions/products";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="container relative flex flex-col items-center justify-center gap-8 py-20 md:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Welcome to NextJS Store
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Discover amazing products at unbeatable prices. Shop the latest
            trends and find everything you need in one place.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <Button size="lg">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      {categories.length > 0 && (
        <section className="container space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link href="/categories">
              <Button variant="ghost">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative aspect-square overflow-hidden rounded-lg border bg-muted transition-transform hover:scale-105"
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="ghost">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={Number(product.price)}
                compareAtPrice={product.compareAtPrice}
                image={product.images[0] || "/placeholder-product.jpg"}
                featured={product.featured}
                inStock={product.inStock}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="container border-y py-12">
        <div className="mx-auto flex max-w-[600px] flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter to get the latest updates and exclusive
            offers.
          </p>
          <form className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
