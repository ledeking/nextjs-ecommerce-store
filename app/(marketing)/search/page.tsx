import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/features/product-card";
import { ProductSort } from "@/components/features/product-sort";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; sort?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1");

  if (!query) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Search Products</h1>
          <p className="text-muted-foreground">
            Enter a search term to find products
          </p>
        </div>
      </div>
    );
  }

  const { products, total } = await getProducts({
    search: query,
    sort: params.sort || "newest",
    page,
    limit: 12,
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Search Results for &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground mt-2">
          {total} product{total !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <ProductSort />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No products found for &quot;{query}&quot;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      )}
    </div>
  );
}
