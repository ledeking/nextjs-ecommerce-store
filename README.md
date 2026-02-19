# NextJS Ecommerce Store

A modern, production-ready, full-stack e-commerce store built with **Next.js 15+** using the App Router. This project demonstrates best practices for building scalable e-commerce applications with a focus on performance, SEO, and user experience.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.1-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Features

### Core Features
- ✅ **Product Catalog** - Browse products with filtering, sorting, and search
- ✅ **Shopping Cart** - Persistent cart with localStorage and database sync
- ✅ **Wishlist** - Save favorite products for later
- ✅ **User Authentication** - Secure authentication with Clerk (Google + Email/Password)
- ✅ **Checkout & Payments** - Complete checkout flow with Stripe integration
- ✅ **Order Management** - Track orders and view order history
- ✅ **Product Reviews** - Customer reviews and ratings
- ✅ **Admin Dashboard** - Manage products, orders, and view analytics
- ✅ **Responsive Design** - Mobile-first, fully responsive UI
- ✅ **Dark Mode** - System preference-based theme switching
- ✅ **SEO Optimized** - Dynamic metadata, sitemap, robots.txt

### Technical Features
- **Next.js 15+** with App Router and React Server Components
- **TypeScript** with strict mode
- **Prisma ORM** with PostgreSQL
- **Stripe** payment processing with webhooks
- **Clerk** authentication
- **Zustand** for client-side state management
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS v4** for styling
- **Server Actions** for data mutations
- **Optimistic Updates** for better UX
- **Error Boundaries** and loading states
- **Accessibility** - ARIA labels, keyboard navigation

## 📋 Tech Stack

### Frontend
- **Next.js 15.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 4.0** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Next.js Server Actions** - API endpoints
- **Prisma 6.1** - ORM and database toolkit
- **PostgreSQL** - Database
- **Stripe** - Payment processing
- **Clerk** - Authentication

### Development Tools
- **Turbopack** - Fast bundler (dev mode)
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Faker.js** - Seed data generation

## 🏗️ Project Structure

```
nextjs-ecommerce-store/
├── app/                          # Next.js App Router
│   ├── (admin)/                 # Admin route group
│   │   └── admin/               # Admin pages
│   ├── (auth)/                  # Auth route group
│   │   └── sign-in/             # Sign in page
│   ├── (marketing)/             # Marketing route group
│   │   ├── page.tsx             # Home page
│   │   ├── products/            # Product pages
│   │   ├── categories/          # Category pages
│   │   └── search/              # Search page
│   ├── (shop)/                  # Shop route group
│   │   ├── cart/                # Cart page
│   │   ├── checkout/            # Checkout page
│   │   ├── account/             # Account pages
│   │   └── wishlist/            # Wishlist page
│   ├── api/                     # API routes
│   │   └── webhooks/            # Webhook handlers
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── sitemap.ts               # Sitemap generation
│   └── robots.ts                # Robots.txt
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   └── features/                # Feature components
├── lib/                         # Utilities
│   ├── db.ts                    # Prisma client
│   ├── auth.ts                  # Auth utilities
│   ├── stripe.ts                # Stripe client
│   ├── utils.ts                 # Helper functions
│   ├── constants.ts             # Constants
│   └── store/                   # Zustand stores
├── actions/                     # Server actions
│   ├── products.ts              # Product actions
│   ├── cart.ts                  # Cart actions
│   └── orders.ts               # Order actions
├── prisma/                      # Prisma files
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Seed script
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript types
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (local or cloud)
- Clerk account (for authentication)
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-ecommerce-store-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed the database
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📧 Support

- Telegram: https://t.me/ledeking
- Twitter: https://x.com/ledeking_
