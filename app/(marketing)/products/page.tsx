import { Suspense } from "react";
import { getProducts, getCategories } from "@/actions/products";
import { ProductCard } from "@/components/features/product-card";
import { ProductFilters } from "@/components/features/product-filters";
import { ProductSort } from "@/components/features/product-sort";
import { Button } from "@/components/ui/button";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const { products, total, pages } = await getProducts({
    category: params.category,
    search: params.search,
    sort: params.sort || "newest",
    page,
    limit: 12,
  });

  const categories = await getCategories();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Discover our complete collection of products
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full lg:w-64">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilters categories={categories} />
          </Suspense>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {total} product{total !== 1 ? "s" : ""} found
            </p>
            <ProductSort />
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
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

              {pages > 1 && (
                <div className="flex justify-center gap-2">
                  {page > 1 && (
                    <Button
                      variant="outline"
                      asChild
                    >
                      <a href={`/products?page=${page - 1}`}>Previous</a>
                    </Button>
                  )}
                  {page < pages && (
                    <Button
                      variant="outline"
                      asChild
                    >
                      <a href={`/products?page=${page + 1}`}>Next</a>
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
