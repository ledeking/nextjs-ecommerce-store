"use server";

import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

export async function getProducts({
  category,
  search,
  sort = "newest",
  page = 1,
  limit = 12,
}: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  const where: any = {
    inStock: true,
  };

  if (category) {
    where.category = {
      slug: category,
    };
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { tags: { has: search } },
    ];
  }

  const orderBy: any = {};
  switch (sort) {
    case "price_asc":
      orderBy.price = "asc";
      break;
    case "price_desc":
      orderBy.price = "desc";
      break;
    case "name_asc":
      orderBy.name = "asc";
      break;
    case "name_desc":
      orderBy.name = "desc";
      break;
    case "oldest":
      orderBy.createdAt = "asc";
      break;
    default:
      orderBy.createdAt = "desc";
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: {
          take: 1,
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      inStock: true,
    },
    take: 4,
    include: {
      variants: {
        take: 1,
      },
    },
  });

  return {
    ...product,
    relatedProducts,
  };
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
      inStock: true,
    },
    take: 8,
    include: {
      category: true,
      variants: {
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: {
          inStock: true,
        },
        include: {
          variants: {
            take: 1,
          },
        },
        take: 20,
      },
    },
  });
}
