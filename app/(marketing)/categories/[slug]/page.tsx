import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/actions/products";
import { ProductCard } from "@/components/features/product-card";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground mt-2">{category.description}</p>
        )}
      </div>

      {category.products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No products in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {category.products.map((product) => (
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
