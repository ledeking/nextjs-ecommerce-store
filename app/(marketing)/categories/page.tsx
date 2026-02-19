import { getCategories } from "@/actions/products";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">All Categories</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-muted">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl font-bold">{category.name}</span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
