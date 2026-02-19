export const SITE_CONFIG = {
  name: "NextJS Ecommerce Store",
  description: "A modern, production-ready e-commerce store built with Next.js 15+",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
};

export const NAV_ITEMS = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Categories", href: "/categories" },
];

export const PRODUCT_SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
] as const;

export const SHIPPING_COST = 9.99;
export const FREE_SHIPPING_THRESHOLD = 75;
