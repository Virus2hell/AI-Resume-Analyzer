# Next.js Interview Preparation - Part 1: Fundamentals & Routing

## 1. Introduction to Next.js

**Interview Answer:**

Next.js is a React framework built on top of React that enables developers to build full-stack web applications with server-side rendering, static site generation, and API routes. It provides an opinionated structure that handles routing, optimization, and deployment challenges out of the box. Next.js is built with performance, developer experience, and scalability in mind.

**Key Points to Mention:**
- Built on React for UI components
- File-based routing system
- Server-Side Rendering (SSR) and Static Site Generation (SSG)
- API Routes for backend functionality
- Automatic code splitting and optimization
- Vercel deployment integration

**Code Example:**

```javascript
// /app/page.tsx - Root page component
import React from 'react';

// This is a Server Component by default in App Router
// It runs on the server and sends HTML to the client
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white">
        Welcome to Next.js 15
      </h1>
    </div>
  );
}
```

---

## 2. Project Structure

**Interview Answer:**

Next.js project structure follows a convention-over-configuration approach. The main directories include `/app` (for routing in App Router), `/public` (for static assets), `/src` (optional for source code), and configuration files like `next.config.js` and `package.json`.

**Key Points to Mention:**
- `/app` directory for routing and layouts (App Router)
- `/pages` directory for routing (Pages Router - legacy)
- `/public` for static assets
- `/src` for source code organization
- Configuration files at root level

**Code Example:**

```
my-nextjs-app/
├── app/                      # App Router directory (main routing)
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page (/)
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard layout
│   │   ├── page.tsx         # Dashboard page (/dashboard)
│   │   └── analytics/
│   │       └── page.tsx     # Analytics page (/dashboard/analytics)
│   ├── api/                 # API routes directory
│   │   └── users/
│   │       └── route.ts     # API route (/api/users)
│   └── error.tsx            # Error boundary
├── public/                   # Static assets
│   ├── images/
│   └── icons/
├── src/                      # Optional: Source code organization
│   ├── components/
│   ├── utils/
│   ├── hooks/
│   └── lib/
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── .env.local               # Environment variables
```

**Structure Explanation:**

```typescript
// app/layout.tsx - Root layout
// This wraps all pages in the application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        {/* Navigation bar here */}
        {children} {/* Page content */}
      </body>
    </html>
  );
}

// app/page.tsx - Home page
export default function Home() {
  return <h1>Welcome Home</h1>;
}

// app/dashboard/page.tsx - Dashboard page
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

---

## 3. Routing

**Interview Answer:**

Next.js uses file-based routing where files in the `/app` directory automatically create routes. Each `page.tsx` or `page.js` file represents a route segment. The file path directly corresponds to the URL path. This makes routing intuitive and eliminates the need for manual route configuration.

**Key Points to Mention:**
- File-based routing system
- Each folder represents a route segment
- `page.tsx` files are the actual pages
- `layout.tsx` files create shared layouts
- URL path matches folder structure
- Dynamic and catch-all routes supported

**Code Example:**

```typescript
// File structure creates these routes:
// app/page.tsx                    →  /
// app/about/page.tsx              →  /about
// app/blog/page.tsx               →  /blog
// app/blog/first-post/page.tsx    →  /blog/first-post
// app/api/users/route.ts          →  /api/users (API route)

// app/page.tsx - Root route (/)
export default function Home() {
  return <h1>Home Page</h1>;
}

// app/about/page.tsx - Route: /about
export default function About() {
  return <h1>About Us</h1>;
}

// app/blog/page.tsx - Route: /blog
export default function Blog() {
  return <h1>Blog</h1>;
}

// app/contact/page.tsx - Route: /contact
// This file automatically creates the /contact route
// No need to configure anything manually
export default function Contact() {
  return <h1>Contact Us</h1>;
}
```

---

## 4. Nested Routes

**Interview Answer:**

Nested routes are routes that exist within other routes, creating a hierarchy. In Next.js, nested routes are automatically created by nesting folders within the `/app` directory. Each level of nesting represents a new segment in the URL path, allowing you to build complex application structures with organized folder hierarchies.

**Key Points to Mention:**
- Created by nesting folders in `/app`
- Each folder level adds to the URL path
- Can be infinitely nested
- Share parent layouts automatically
- Enable organized code structure

**Code Example:**

```typescript
// Folder structure:
// app/
//   └── blog/
//       └── [id]/
//           └── page.tsx
// 
// Creates route: /blog/[id]

// app/blog/page.tsx - /blog route
export default function BlogList() {
  return <h1>All Blog Posts</h1>;
}

// app/blog/[id]/page.tsx - /blog/:id route
// [id] is a dynamic segment that captures the URL parameter
export default function BlogPost({ params }: { params: { id: string } }) {
  return <h1>Blog Post ID: {params.id}</h1>;
}

// Accessing /blog/123 will display: "Blog Post ID: 123"
// Accessing /blog/hello will display: "Blog Post ID: hello"

// Example with nested levels:
// app/users/[userId]/posts/[postId]/page.tsx
// Creates route: /users/:userId/posts/:postId
export default function UserPost({ 
  params 
}: { 
  params: { userId: string; postId: string } 
}) {
  return (
    <h1>
      User {params.userId}'s Post {params.postId}
    </h1>
  );
}

// Accessing /users/john/posts/42
// Will display: "User john's Post 42"
```

---

## 5. Dynamic Routes

**Interview Answer:**

Dynamic routes allow you to create routes with variable segments in the URL. In Next.js, dynamic routes are created using square bracket notation `[paramName]` in folder names. These are useful for creating pages that display different content based on URL parameters, such as individual blog posts or user profiles.

**Key Points to Mention:**
- Created with square brackets: `[paramName]`
- Parameters accessible via `params` prop
- Supports multiple dynamic segments
- Type-safe with TypeScript
- Can be combined with static routes

**Code Example:**

```typescript
// app/products/[id]/page.tsx
// Route: /products/:id
// Examples: /products/123, /products/abc

import React from 'react';

// The params prop is automatically provided by Next.js
// It contains all dynamic route parameters
interface Props {
  params: {
    id: string; // The [id] parameter from the URL
  };
}

export default function ProductPage({ params }: Props) {
  const { id } = params;

  // In a real app, fetch product data using the id
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      <p>Showing details for product {id}</p>
    </div>
  );
}

// Example: /products/laptop
// params.id = "laptop"

// Example: /products/456
// params.id = "456"

// ===== Multiple Dynamic Segments =====

// app/blog/[year]/[month]/[slug]/page.tsx
// Route: /blog/:year/:month/:slug
// Example: /blog/2024/november/my-post

interface BlogPostProps {
  params: {
    year: string;
    month: string;
    slug: string;
  };
}

export function BlogPost({ params }: BlogPostProps) {
  return (
    <article>
      <h1>{params.slug}</h1>
      <p>
        Published in {params.month} {params.year}
      </p>
    </article>
  );
}

// ===== Combining Static and Dynamic Routes =====

// app/api/posts/published/page.tsx
// Route: /api/posts/published
// This is a static route

// app/api/posts/[id]/page.tsx
// Route: /api/posts/:id
// This is a dynamic route

// /api/posts/published  → Static route (takes priority)
// /api/posts/123        → Dynamic route
```

---

## 6. Nested Dynamic Routes

**Interview Answer:**

Nested dynamic routes are multiple dynamic segments within nested folder structures. They allow you to create hierarchical URLs with multiple variable parts. This is useful for creating complex routing scenarios, such as viewing a specific comment on a post of a specific user.

**Key Points to Mention:**
- Multiple `[param]` segments at different levels
- Creates hierarchical dynamic URLs
- All parameters accessible in `params` object
- Useful for resource relationships

**Code Example:**

```typescript
// Folder structure:
// app/users/[userId]/posts/[postId]/page.tsx
//
// Creates route: /users/:userId/posts/:postId
// Examples:
// /users/john123/posts/456
// /users/alice/posts/my-first-post

import React from 'react';

interface NestedDynamicProps {
  params: {
    userId: string;    // From [userId]
    postId: string;    // From [postId]
  };
}

// This component receives both dynamic parameters
export default function UserPostPage({ params }: NestedDynamicProps) {
  const { userId, postId } = params;

  return (
    <div className="p-6">
      <h1>User Post</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        <p>
          <strong>Post ID:</strong> {postId}
        </p>
      </div>
      
      {/* Example: Fetch and display post data */}
      <div className="mt-6">
        <h2>Post Content</h2>
        <p>
          Fetching post {postId} from user {userId}...
        </p>
      </div>
    </div>
  );
}

// ===== Three-Level Nested Dynamic Routes =====

// Folder structure:
// app/teams/[teamId]/projects/[projectId]/tasks/[taskId]/page.tsx
//
// Route: /teams/:teamId/projects/:projectId/tasks/:taskId
// Example: /teams/acme/projects/web-app/tasks/task-123

interface TripleDynamicProps {
  params: {
    teamId: string;
    projectId: string;
    taskId: string;
  };
}

export function TeamProjectTask({ params }: TripleDynamicProps) {
  return (
    <section>
      <h1>Task Details</h1>
      <div className="space-y-2">
        <p>Team: {params.teamId}</p>
        <p>Project: {params.projectId}</p>
        <p>Task: {params.taskId}</p>
      </div>
      {/* Fetch task data using all three parameters */}
    </section>
  );
}

// ===== Real-World Example =====

// Folder: app/accounts/[accountId]/settings/[setting]/page.tsx
// Route: /accounts/:accountId/settings/:setting
// Example: /accounts/user-456/settings/notifications

interface AccountSettingProps {
  params: {
    accountId: string;
    setting: string;
  };
}

export function AccountSettingPage({ params }: AccountSettingProps) {
  const { accountId, setting } = params;

  // Render different content based on the setting
  const settings: Record<string, string> = {
    'notifications': 'Notification preferences',
    'privacy': 'Privacy settings',
    'security': 'Security options',
    'billing': 'Billing information',
  };

  const settingName = settings[setting] || 'Unknown setting';

  return (
    <div>
      <h1>{settingName}</h1>
      <p>Account: {accountId}</p>
      {/* Render setting-specific form or content */}
    </div>
  );
}
```

---

## 7. Catch-all Segments

**Interview Answer:**

Catch-all segments are route parameters that match everything, including multiple path segments. They are created using square brackets with three dots: `[...paramName]`. This is useful when you need to capture an entire path or handle variable-depth routes without creating separate route files for each level.

**Key Points to Mention:**
- Created with `[...paramName]` syntax
- Captures all segments at that level and deeper
- Parameter is an array of strings
- Useful for dynamic path structures
- Can be combined with static routes

**Code Example:**

```typescript
// ===== Basic Catch-all Segment =====

// Folder structure:
// app/docs/[...slug]/page.tsx
//
// Matches routes like:
// /docs/getting-started
// /docs/guides/routing
// /docs/api/users/create
// /docs/anything/nested/deeply/here

import React from 'react';

interface CatchAllProps {
  params: {
    slug: string[]; // Array of all segments
  };
}

export default function DocsPage({ params }: CatchAllProps) {
  const { slug } = params;

  // slug is an array of path segments
  // /docs/getting-started        → slug = ['getting-started']
  // /docs/guides/routing         → slug = ['guides', 'routing']
  // /docs/api/users/create       → slug = ['api', 'users', 'create']

  const breadcrumbs = slug.join(' > ');

  return (
    <div>
      <h1>Documentation</h1>
      <p>Current path: {breadcrumbs}</p>
      
      {/* Render content based on slug array */}
      <div>
        <h2>{slug[slug.length - 1]}</h2>
        <p>Segments: {slug.length}</p>
        {slug.map((segment, index) => (
          <div key={index} className="ml-4">
            - {segment}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Optional Catch-all Segment =====

// Folder structure:
// app/blog/[[...slug]]/page.tsx
//
// Note the double brackets [[ ]]
// This makes the catch-all OPTIONAL
//
// Matches:
// /blog                           → slug = undefined
// /blog/2024                       → slug = ['2024']
// /blog/2024/november              → slug = ['2024', 'november']
// /blog/2024/november/my-post     → slug = ['2024', 'november', 'my-post']

interface OptionalCatchAllProps {
  params: {
    slug?: string[]; // Optional array
  };
}

export function OptionalBlogPage({ params }: OptionalCatchAllProps) {
  const { slug } = params;

  // slug might be undefined
  if (!slug || slug.length === 0) {
    return <h1>All Blog Posts</h1>;
  }

  return (
    <div>
      <h1>Blog Post</h1>
      <p>Path: {slug.join('/')}</p>
    </div>
  );
}

// ===== Real-World Example: Nested Documentation =====

// Folder structure:
// app/learn/[...path]/page.tsx

interface LearningPathProps {
  params: {
    path: string[];
  };
}

export function LearningPage({ params }: LearningPathProps) {
  const { path } = params;

  // Example paths:
  // /learn/javascript             → path = ['javascript']
  // /learn/javascript/basics      → path = ['javascript', 'basics']
  // /learn/javascript/basics/variables → path = ['javascript', 'basics', 'variables']

  const category = path[0];
  const subcategory = path[1];
  const topic = path[2];

  return (
    <article>
      <h1>{topic || subcategory || category}</h1>
      <nav>
        <p>Category: {category}</p>
        {subcategory && <p>Sub-category: {subcategory}</p>}
        {topic && <p>Topic: {topic}</p>}
      </nav>
    </article>
  );
}

// ===== 404 Handling with Catch-all =====

// Even though catch-all routes catch everything,
// you might want to explicitly handle unmatched routes

// app/[...notFound]/page.tsx
// This catches ANY unmatched route

export function NotFoundPage({ params }: { params: { notFound: string[] } }) {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Could not find: /{params.notFound.join('/')}</p>
    </div>
  );
}
```

---

## 8. Not Found Page

**Interview Answer:**

The `not-found.tsx` file in Next.js is used to handle routes that don't exist or when you explicitly call the `notFound()` function. It provides a custom UI for 404 errors instead of the default error page. When a route doesn't match any page segment, Next.js automatically renders the `not-found.tsx` component.

**Key Points to Mention:**
- Created as `not-found.tsx` file
- Automatically shown for unmatched routes
- Can be called manually with `notFound()` function
- Works with custom error UI
- Can be nested in different route segments

**Code Example:**

```typescript
// app/not-found.tsx - Global Not Found Page
// This is displayed when no route matches

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Page Not Found
        </p>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn't exist.
        </p>
        
        <Link 
          href="/" 
          className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

// ===== Segment-Specific Not Found Page =====

// app/blog/not-found.tsx - Blog Section 404
// Only shown for unmatched routes in /blog/*
// More specific than the root not-found.tsx

export default function BlogNotFound() {
  return (
    <div className="p-6">
      <h1>Blog Post Not Found</h1>
      <p>The blog post you're looking for doesn't exist.</p>
      <Link href="/blog">View all posts</Link>
    </div>
  );
}

// ===== Using notFound() Function =====

// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Simulate fetching a product
  const product = await fetchProduct(params.id);

  // If product doesn't exist, show the not-found page
  if (!product) {
    notFound(); // Calls the not-found.tsx file for this segment
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// Helper function (would typically call a database)
async function fetchProduct(id: string) {
  // Mock data
  const products: Record<string, any> = {
    '1': { id: '1', name: 'Laptop', description: 'High-performance laptop' },
    '2': { id: '2', name: 'Phone', description: 'Latest smartphone' },
  };

  return products[id] || null;
}

// ===== Nested Not Found Pages =====

// app/dashboard/not-found.tsx
// Shows custom 404 for /dashboard/* routes

export default function DashboardNotFound() {
  return (
    <div className="dashboard-layout">
      <h1>Dashboard Section Not Found</h1>
      <p>The dashboard page you requested is not available.</p>
    </div>
  );
}

// app/api/posts/[id]/not-found.tsx
// Shows custom 404 for /api/posts/[id]/* routes

export default function PostNotFound() {
  return (
    <div>
      <h1>Post Not Found</h1>
      <p>The requested post could not be found.</p>
    </div>
  );
}
```

---

## 9. File Colocation

**Interview Answer:**

File colocation is a Next.js feature that allows you to store non-routable files (components, styles, tests) directly within route segments alongside `page.tsx` files. Only files with specific names like `page.tsx`, `layout.tsx`, `route.ts`, etc. create routes. Other files are private and can be organized within the same folder.

**Key Points to Mention:**
- Private files stay within their folder
- Only special files create routes
- Improves code organization
- Reduces folder nesting
- Files are bundled with their route

**Code Example:**

```typescript
// ===== File Colocation Example =====

// Folder structure demonstrating colocation:
// app/
//   └── products/
//       ├── page.tsx              ← Creates route /products
//       ├── ProductList.tsx       ← Private component (no route)
//       ├── ProductCard.tsx       ← Private component (no route)
//       ├── products.styles.ts    ← Private styles (no route)
//       └── utils.ts              ← Private utilities (no route)

// These files DON'T create routes - they're private to this segment

// app/products/ProductCard.tsx - Private component
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
}

export function ProductCard({ id, name, price }: ProductCardProps) {
  return (
    <div className="border p-4 rounded">
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}

// app/products/ProductList.tsx - Private component
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

// app/products/page.tsx - Creates the /products route
import { ProductList } from './ProductList';

async function getProducts() {
  // Fetch products
  return [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Phone', price: 699 },
    { id: '3', name: 'Tablet', price: 499 },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}

// Only /products route is created
// /ProductCard, /ProductList, /products.styles are NOT accessible as routes

// ===== File Colocation with Tests =====

// app/users/
//   ├── page.tsx
//   ├── UserList.tsx
//   ├── UserList.test.tsx        ← Test file (not a route)
//   └── UserList.styles.ts       ← Style file (not a route)

// app/users/UserList.test.tsx - Jest test file (no route)
import { render, screen } from '@testing-library/react';
import { UserList } from './UserList';

describe('UserList', () => {
  it('renders user list', () => {
    const users = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];

    render(<UserList users={users} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });
});

// ===== Private Folder vs File Colocation =====

// File Colocation (no underscore):
// app/blog/
//   ├── page.tsx
//   ├── BlogCard.tsx             ← Available to /blog and subfolders
//   └── components/
//       └── BlogHeader.tsx

// Private Folder (underscore prefix):
// app/_utils/
//   └── helpers.ts               ← NOT accessible to any route file

// The difference:
// - File colocation: Private files within the same segment
// - Private folders: Explicitly marked private across the entire app

// ===== Organizing Private Components =====

// app/dashboard/
//   ├── page.tsx
//   ├── components/              ← Subfolder for organization
//   │   ├── Sidebar.tsx
//   │   ├── Header.tsx
//   │   └── StatsCard.tsx
//   ├── hooks/                   ← Custom hooks
//   │   └── useDashboardData.ts
//   └── utils/                   ← Utilities
//       └── formatting.ts

// app/dashboard/page.tsx
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { useDashboardData } from './hooks/useDashboardData';

export default function Dashboard() {
  const data = useDashboardData();

  return (
    <div>
      <Header />
      <Sidebar />
      {/* Content */}
    </div>
  );
}
```

---

## 10. Private Folders

**Interview Answer:**

Private folders are a naming convention in Next.js where folder names prefixed with an underscore `_` are excluded from the routing system. Unlike regular folders that become route segments, private folders don't create routes but remain part of the project structure. This is useful for organizing shared components and utilities that shouldn't be directly accessible as routes.

**Key Points to Mention:**
- Prefixed with underscore: `_folderName`
- Not included in routing system
- Don't create URL segments
- Useful for shared components across multiple routes
- Improved organization without route pollution

**Code Example:**

```typescript
// ===== Private Folder Example =====

// Folder structure showing private folders:
// app/
//   ├── page.tsx                 ← /
//   ├── _components/             ← Private (not a route)
//   │   ├── Button.tsx
//   │   ├── Card.tsx
//   │   └── Layout.tsx
//   ├── _utils/                  ← Private (not a route)
//   │   ├── helpers.ts
//   │   └── constants.ts
//   ├── blog/
//   │   ├── page.tsx             ← /blog
//   │   └── [id]/
//   │       └── page.tsx         ← /blog/[id]
//   └── shop/
//       ├── page.tsx             ← /shop
//       └── products/
//           └── page.tsx         ← /shop/products

// The _components and _utils folders are NOT routes
// Routes created: /, /blog, /blog/[id], /shop, /shop/products

// ===== Using Private Components =====

// app/_components/Button.tsx - Private component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  const styles = variant === 'primary' 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-300 text-black';

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded ${styles}`}
    >
      {label}
    </button>
  );
}

// app/_components/Card.tsx - Private component
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}

// app/_utils/helpers.ts - Private utilities
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function calculateDiscount(
  original: number,
  discount: number
): number {
  return original * (1 - discount / 100);
}

// app/blog/page.tsx - Using private components and utilities
import { Card, Button } from '@/_components';
import { formatDate, formatPrice } from '@/_utils/helpers';

async function getBlogPosts() {
  return [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn the basics...',
      date: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Advanced Routing',
      excerpt: 'Master complex routing...',
      date: new Date('2024-02-20'),
    },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="p-6">
      <h1>Blog</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} title={post.title}>
            <p>{post.excerpt}</p>
            <p className="text-sm text-gray-500">
              {formatDate(post.date)}
            </p>
            <Button 
              label="Read More" 
              onClick={() => console.log(`Reading post ${post.id}`)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

// app/shop/products/page.tsx - Also using same private components
import { Card, Button } from '@/_components';
import { formatPrice } from '@/_utils/helpers';

async function getProducts() {
  return [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Phone', price: 699.99 },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1>Products</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} title={product.name}>
            <p className="text-lg font-bold">
              {formatPrice(product.price)}
            </p>
            <Button
              label="Add to Cart"
              onClick={() => console.log(`Added ${product.name}`)}
              variant="primary"
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== Private Folder vs File Colocation =====

// Private Folder (_components):
// - Can be accessed from ALL route segments
// - Shared across the application
// - Prevents folder from becoming a route

// File Colocation (ProductCard.tsx):
// - Private to the segment where it's defined
// - Not accessible from other route segments (unless imported)
// - Better for component-specific utilities

// ===== Importing from Private Folders =====

// Path aliases can be configured in tsconfig.json:
// {
//   "compilerOptions": {
//     "paths": {
//       "@/*": ["./*"]
//     }
//   }
// }

// This allows:
import { Button } from '@/_components/Button';
import { formatPrice } from '@/_utils/helpers';

// Instead of:
// import { Button } from '../../../_components/Button';
```

---

## 11. Route Groups

**Interview Answer:**

Route groups are a naming convention using parentheses `(groupName)` around folder names. They allow you to organize routes logically without affecting the URL path. This means you can group related routes together in the file structure while keeping clean, organized URLs. Route groups are useful for creating mental organization, separate layouts for different sections, or organizing features.

**Key Points to Mention:**
- Created with parentheses: `(groupName)`
- Don't affect URL paths
- Enable logical code organization
- Can have separate layouts
- Useful for feature-based organization

**Code Example:**

```typescript
// ===== Route Groups Example =====

// Folder structure with route groups:
// app/
//   ├── page.tsx                 ← / (home)
//   ├── (auth)/
//   │   ├── login/
//   │   │   └── page.tsx         ← /login (not /(auth)/login)
//   │   ├── signup/
//   │   │   └── page.tsx         ← /signup (not /(auth)/signup)
//   │   ├── forgot-password/
//   │   │   └── page.tsx         ← /forgot-password
//   │   └── layout.tsx           ← Layout for auth pages
//   └── (dashboard)/
//       ├── layout.tsx           ← Layout for dashboard pages
//       ├── page.tsx             ← /dashboard
//       ├── analytics/
//       │   └── page.tsx         ← /analytics
//       └── settings/
//           └── page.tsx         ← /settings

// Notice:
// - (auth) and (dashboard) folders don't appear in URLs
// - /login is at /login, not /(auth)/login
// - This organizes code without affecting routes

// ===== Auth Route Group =====

// app/(auth)/layout.tsx - Shared layout for auth pages
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

// app/(auth)/login/page.tsx - Login page at /login
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input 
            type="email" 
            className="w-full border rounded px-3 py-2"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input 
            type="password" 
            className="w-full border rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
}

// app/(auth)/signup/page.tsx - Signup page at /signup
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input 
            type="email" 
            className="w-full border rounded px-3 py-2"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input 
            type="password" 
            className="w-full border rounded px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Sign Up
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}

// ===== Dashboard Route Group =====

// app/(dashboard)/layout.tsx - Shared layout for dashboard
import React from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link 
            href="/dashboard" 
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Overview
          </Link>
          <Link 
            href="/analytics" 
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Analytics
          </Link>
          <Link 
            href="/settings" 
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

// app/(dashboard)/page.tsx - Dashboard overview at /dashboard
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow">
          <h3>Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3>Revenue</h3>
          <p className="text-3xl font-bold">$45,678</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3>Orders</h3>
          <p className="text-3xl font-bold">567</p>
        </div>
      </div>
    </div>
  );
}

// app/(dashboard)/analytics/page.tsx - Analytics at /analytics
export default function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <p>Analytics data and charts here</p>
    </div>
  );
}

// app/(dashboard)/settings/page.tsx - Settings at /settings
export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>Application settings here</p>
    </div>
  );
}

// ===== Multiple Route Groups =====

// You can have multiple route groups with different layouts
// app/
//   ├── (marketing)/
//   │   ├── layout.tsx          ← Marketing layout
//   │   ├── page.tsx            ← /
//   │   ├── about/page.tsx      ← /about
//   │   └── contact/page.tsx    ← /contact
//   ├── (admin)/
//   │   ├── layout.tsx          ← Admin layout
//   │   ├── page.tsx            ← /admin (or organize differently)
//   │   └── users/page.tsx      ← /admin/users

// Each group can have its own layout, styling, and navigation
```

---
# Next.js Interview Preparation - Part 2: Layouts, Metadata & Advanced Routing

## 12. Layouts

**Interview Answer:**

Layouts in Next.js are components that wrap pages and define shared UI that persists across route changes. The `layout.tsx` file in the App Router creates a layout for that segment and all its nested routes. Layouts don't remount on navigation, preserving component state, and are essential for creating consistent application structures with headers, navigation bars, and sidebars.

**Key Points to Mention:**
- Created as `layout.tsx` file
- Wraps pages and nested layouts
- Persists across route changes
- State is preserved during navigation
- Can be nested at multiple levels
- Must include `children` prop

**Code Example:**

```typescript
// app/layout.tsx - Root layout
// Wraps the entire application

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Welcome to my Next.js application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Metadata is automatically injected here */}
      </head>
      <body>
        {/* This div wraps all pages */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer visible on all pages */}
        <footer className="bg-gray-900 text-white text-center py-4">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

// ===== Page Using Root Layout =====

// app/page.tsx - Home page
export default function Home() {
  return (
    <div className="p-6">
      <h1>Welcome Home</h1>
      <p>This page is wrapped by the root layout</p>
    </div>
  );
}

// When you visit /, you see:
// - RootLayout (HTML structure)
//   - Home page content
//   - Footer

// ===== Nested Layout Example =====

// app/dashboard/layout.tsx - Dashboard layout
// This layout only wraps /dashboard and its children

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      {/* Navigation Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="hover:bg-gray-700 p-2 block rounded">
              Overview
            </a>
          </li>
          <li>
            <a href="/dashboard/users" className="hover:bg-gray-700 p-2 block rounded">
              Users
            </a>
          </li>
          <li>
            <a href="/dashboard/settings" className="hover:bg-gray-700 p-2 block rounded">
              Settings
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <p>This page has the dashboard layout with sidebar</p>
    </div>
  );
}

// app/dashboard/users/page.tsx
export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <p>This page also has the dashboard layout with sidebar</p>
    </div>
  );
}

// When you visit /dashboard:
// - RootLayout (HTML + Footer)
//   - DashboardLayout (Sidebar + Main)
//     - Dashboard page content

// ===== Preserving State in Layouts =====

// app/layout.tsx - Layout with state (counter)
'use client'; // Client component to use useState

import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  // When you navigate between pages, the counter state is PRESERVED
  // This is a key benefit of layouts

  return (
    <html>
      <body>
        <header className="bg-blue-500 text-white p-4">
          <h1>My App</h1>
          <p>Counter: {counter}</p>
          <button onClick={() => setCounter(c => c + 1)}>
            Increment
          </button>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

// If you navigate /page1 → /page2 → /page3
// The counter persists across all navigations
// The layout component doesn't remount
```

---

## 13. Nested Layouts

**Interview Answer:**

Nested layouts are multiple layout files at different levels in the route hierarchy. Each folder can have its own `layout.tsx` file that wraps its children. Pages are wrapped by all parent layouts, creating a composition chain. This allows you to have different UI structures and behaviors at different levels of your application.

**Key Points to Mention:**
- Multiple `layout.tsx` files at different levels
- Each layout wraps its nested routes
- Layouts don't remount on sibling navigation
- State preserved through navigation
- Can have separate navigation for each level

**Code Example:**

```typescript
// ===== Multi-Level Nested Layout Structure =====

// File structure:
// app/
//   ├── layout.tsx                    (Root layout)
//   ├── page.tsx
//   ├── (marketing)/
//   │   ├── layout.tsx                (Marketing layout)
//   │   ├── page.tsx
//   │   ├── about/page.tsx
//   │   └── contact/page.tsx
//   └── (dashboard)/
//       ├── layout.tsx                (Dashboard layout)
//       ├── page.tsx
//       ├── users/
//       │   ├── layout.tsx            (Users layout)
//       │   ├── page.tsx
//       │   └── [id]/page.tsx
//       └── settings/page.tsx

// ===== Root Layout =====

// app/layout.tsx
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="font-sans">
        {/* Root level elements */}
        {children}
        {/* This wraps EVERYTHING */}
      </body>
    </html>
  );
}

// ===== Marketing Section Layout =====

// app/(marketing)/layout.tsx
// Wraps all marketing pages: /, /about, /contact

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Marketing Header */}
      <header className="bg-white shadow">
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="font-bold">MyApp</h1>
          <ul className="flex space-x-4">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Marketing Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>

      {/* Marketing Footer */}
      <footer className="bg-gray-100 text-center py-4 mt-8">
        <p>&copy; 2024 MyApp - Marketing</p>
      </footer>
    </div>
  );
}

// app/(marketing)/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is the home page inside marketing layout</p>
    </div>
  );
}

// app/(marketing)/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>About page wrapped by marketing layout</p>
    </div>
  );
}

// ===== Dashboard Section Layout =====

// app/(dashboard)/layout.tsx
// Wraps all dashboard pages

'use client'; // Client component for interactivity

import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all`}>
        <div className="p-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-4 p-2 bg-gray-800 rounded"
          >
            {sidebarOpen ? '<<' : '>>'}
          </button>
          
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-2 rounded hover:bg-gray-800">
              {sidebarOpen ? 'Dashboard' : 'D'}
            </a>
            <a href="/dashboard/users" className="block p-2 rounded hover:bg-gray-800">
              {sidebarOpen ? 'Users' : 'U'}
            </a>
            <a href="/dashboard/settings" className="block p-2 rounded hover:bg-gray-800">
              {sidebarOpen ? 'Settings' : 'S'}
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Dashboard Header */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h2>Dashboard</h2>
          <div>Admin User</div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}

// app/(dashboard)/page.tsx
export default function DashboardHome() {
  return (
    <div>
      <h1>Dashboard Home</h1>
      <p>Main dashboard content</p>
    </div>
  );
}

// ===== Sub-Level Layout within Dashboard =====

// app/(dashboard)/users/layout.tsx
// This wraps /dashboard/users and /dashboard/users/[id]

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Users section header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-gray-600">Manage system users</p>
      </div>

      {/* Users content */}
      {children}
    </div>
  );
}

// app/(dashboard)/users/page.tsx
export default function UsersList() {
  return (
    <div>
      <h2>Users List</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">1</td>
            <td className="border p-2">John</td>
            <td className="border p-2"><a href="/dashboard/users/1">View</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// app/(dashboard)/users/[id]/page.tsx
export default function UserDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {params.id}</p>
      {/* User detail form */}
    </div>
  );
}

// Navigation flow example:
// 1. User visits /about
//    - RootLayout
//      - MarketingLayout
//        - About page

// 2. User visits /dashboard/users
//    - RootLayout
//      - DashboardLayout
//        - UsersLayout
//          - UsersList page

// 3. User visits /dashboard/users/1
//    - RootLayout
//      - DashboardLayout
//        - UsersLayout
//          - UserDetail page

// When navigating /dashboard/users → /dashboard/users/1:
// - RootLayout is NOT remounted
// - DashboardLayout is NOT remounted (state preserved)
// - UsersLayout is NOT remounted
// - Only the page component changes
```

---

## 14. Multiple Root Layouts

**Interview Answer:**

In Next.js, you can have multiple root-level layouts by using route groups with parallel routes. However, in the standard App Router, you typically have one root `layout.tsx`. If you want different layouts for different sections (like marketing vs dashboard), you use route groups `(groupName)` to create separate layout hierarchies that all start from the root layout.

**Key Points to Mention:**
- Use route groups to create logical layout separation
- Each route group can have its own layout
- All layouts still compose with root layout
- Useful for multi-domain or multi-tenant apps
- Cannot have multiple `layout.tsx` at app root level

**Code Example:**

```typescript
// ===== Multiple Root Layouts Using Route Groups =====

// File structure:
// app/
//   ├── layout.tsx              (Actual root layout)
//   ├── (admin)/
//   │   ├── layout.tsx          (Admin "root" layout within group)
//   │   └── page.tsx
//   └── (public)/
//       ├── layout.tsx          (Public "root" layout within group)
//       └── page.tsx

// ===== Actual Root Layout =====

// app/layout.tsx
// This wraps the entire application

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>MultiLayout App</title>
      </head>
      <body className="antialiased">
        {/* This wraps both admin and public sections */}
        {children}
      </body>
    </html>
  );
}

// ===== Admin Route Group Layout =====

// app/(admin)/layout.tsx
// This is the "root" layout for admin section

'use client';

import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user] = useState({ role: 'admin', name: 'Admin User' });

  return (
    <div className="flex h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            <a 
              href="/dashboard" 
              className="block p-2 rounded hover:bg-indigo-800"
            >
              Dashboard
            </a>
            <a 
              href="/users" 
              className="block p-2 rounded hover:bg-indigo-800"
            >
              Users
            </a>
            <a 
              href="/settings" 
              className="block p-2 rounded hover:bg-indigo-800"
            >
              Settings
            </a>
          </nav>
        </div>
        <div className="absolute bottom-4 left-4 text-sm">
          <p>Logged in as:</p>
          <p className="font-bold">{user.name}</p>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <header className="bg-white border-b p-4">
          <h2>Admin Dashboard</h2>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

// app/(admin)/page.tsx
export default function AdminHome() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel</p>
    </div>
  );
}

// ===== Public Route Group Layout =====

// app/(public)/layout.tsx
// This is the "root" layout for public section

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Public Header */}
      <header className="bg-white shadow-md">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MyBrand</h1>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
            <li><a href="/login" className="hover:text-blue-600">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Public Content */}
      <main>
        {children}
      </main>

      {/* Public Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p>&copy; 2024 MyBrand. All rights reserved.</p>
      </footer>
    </div>
  );
}

// app/(public)/page.tsx
export default function PublicHome() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="text-lg text-gray-600">
        This is the public home page with its own layout
      </p>
    </div>
  );
}

// ===== URL Routing =====

// Routes created:
// / or /public           → Uses (public) layout
// /about                 → Uses (public) layout
// /contact               → Uses (public) layout
// /admin or /dashboard   → Uses (admin) layout
// /users                 → Uses (admin) layout
// /settings              → Uses (admin) layout

// Each route group has its own layout structure
// But all start with the root layout

// ===== Real-World Example: Multi-Tenant App =====

// app/(tenant-a)/layout.tsx
export function TenantALayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50">
      <header className="bg-red-600 text-white p-4">
        <h1>Tenant A - Red Theme</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

// app/(tenant-b)/layout.tsx
export function TenantBLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50">
      <header className="bg-blue-600 text-white p-4">
        <h1>Tenant B - Blue Theme</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

// This creates completely separate experiences for different route groups
// Useful for SaaS, multi-brand, or multi-tenant applications
```

---

## 15. Routing Metadata

**Interview Answer:**

Metadata in Next.js refers to information about your pages that gets added to the HTML `<head>` tag. This includes page titles, descriptions, OG tags for social sharing, and more. Metadata improves SEO, helps with social media sharing, and provides better page information to browsers and search engines. In Next.js App Router, you export a `metadata` object from page and layout files.

**Key Points to Mention:**
- Exported as `metadata` object
- Improves SEO and social sharing
- Includes title, description, OG tags
- Can be dynamic using `generateMetadata()` function
- Cascades from parent to child pages
- Vercel provides `generateMetadata` for dynamic metadata

**Code Example:**

```typescript
// ===== Static Metadata =====

// app/page.tsx - Home page with static metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - MyApp',
  description: 'Welcome to MyApp, your favorite platform',
  keywords: ['nextjs', 'react', 'web-development'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Home - MyApp',
    description: 'Welcome to MyApp',
    url: 'https://myapp.com',
    siteName: 'MyApp',
    images: [
      {
        url: 'https://myapp.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home - MyApp',
    description: 'Welcome to MyApp',
    images: ['https://myapp.com/twitter-image.png'],
  },
};

export default function Home() {
  return <h1>Welcome to MyApp</h1>;
}

// This generates HTML:
// <head>
//   <title>Home - MyApp</title>
//   <meta name="description" content="Welcome to MyApp, your favorite platform" />
//   <meta property="og:title" content="Home - MyApp" />
//   <!-- ... other meta tags ... -->
// </head>

// ===== Dynamic Metadata =====

// app/blog/[slug]/page.tsx

import type { Metadata } from 'next';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Define generateMetadata function
// This runs before the page component and can access params
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  // Fetch blog post data
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

// Mock function
async function fetchBlogPost(slug: string) {
  // In real app, fetch from database
  return {
    title: 'Understanding React Server Components',
    excerpt: 'Learn how React Server Components improve performance...',
    publishedAt: '2024-01-15',
    author: 'John Doe',
    featuredImage: 'https://example.com/image.png',
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  return <h1>Blog Post</h1>;
}

// ===== Metadata in Layouts =====

// app/blog/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MyBlog', // %s is replaced by page title
    default: 'Blog - MyBlog',
  },
  description: 'Read our latest blog posts',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// When you visit /blog/my-post with page metadata:
// export const metadata: Metadata = { title: 'React Tips' }
//
// The final title becomes: "React Tips | MyBlog"

// ===== Complex Metadata Example =====

// app/products/[id]/page.tsx

import type { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await fetchProduct(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const url = `https://myshop.com/products/${params.id}`;

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: url, // Canonical URL for SEO
    },
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'product',
      url: url,
      images: product.images.map((img: string) => ({
        url: img,
        width: 1200,
        height: 630,
      })),
    },
    twitter: {
      card: 'product',
      title: product.name,
      description: product.description,
    },
  };
}

async function fetchProduct(id: string) {
  return {
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    images: ['https://example.com/laptop1.jpg', 'https://example.com/laptop2.jpg'],
    price: 1299,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return <h1>Product Page</h1>;
}

// ===== Robots and Sitemap Metadata =====

// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://myapp.com/sitemap.xml',
  };
}

// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://myapp.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://myapp.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://myapp.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
```

---

## 16. title Metadata

**Interview Answer:**

The `title` metadata field sets the HTML page title that appears in the browser tab and search engine results. It's one of the most important metadata fields for SEO. In Next.js, you can set static titles or use the `title` object with template patterns to create consistent naming across pages.

**Key Points to Mention:**
- HTML `<title>` tag in browser tab
- Important for SEO and bookmarks
- Can use template pattern with `%s` placeholder
- Can be absolute or relative to layout template
- Each page/layout can override parent title

**Code Example:**

```typescript
// ===== Static Title =====

// app/about/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - MyApp',
  description: 'Learn more about MyApp',
};

export default function About() {
  return <h1>About Us</h1>;
}

// Browser tab shows: "About Us - MyApp"
// Google search results show: "About Us - MyApp"

// ===== Title Template Pattern =====

// app/blog/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MyBlog',
    default: 'MyBlog - Thoughts and Ideas',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// app/blog/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Articles', // Just the page-specific part
};

export default function BlogHome() {
  return <h1>Latest Articles</h1>;
}

// Browser tab shows: "Latest Articles | MyBlog"

// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = await fetchPost(params.slug);

  return {
    title: post.title, // Gets template applied automatically
  };
}

async function fetchPost(slug: string) {
  return {
    title: 'Understanding React Hooks',
    content: '...',
  };
}

export default function BlogPost() {
  return <h1>Blog Post</h1>;
}

// Browser tab shows: "Understanding React Hooks | MyBlog"

// ===== Nested Layout Title Templates =====

// app/layout.tsx - Root layout
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MyApp',
    default: 'MyApp - Welcome',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html>{children}</html>;
}

// app/dashboard/layout.tsx - Dashboard layout
export const metadata: Metadata = {
  title: {
    template: '%s - Dashboard',
    default: 'Dashboard',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// app/dashboard/users/page.tsx
export const metadata: Metadata = {
  title: 'Users',
};

export default function Users() {
  return <h1>Users</h1>;
}

// Final browser tab: "Users - Dashboard | MyApp"
// Templates are chained from root to page

// ===== Dynamic Title from URL Parameters =====

// app/products/[id]/page.tsx

import type { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Fetch product data using the URL parameter
  const product = await fetchProduct(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  // Use product data in title
  return {
    title: `${product.name} - Shop`,
    description: `Buy ${product.name} for $${product.price}`,
  };
}

async function fetchProduct(id: string) {
  const products: Record<string, any> = {
    '1': { name: 'Laptop', price: 999 },
    '2': { name: 'Phone', price: 699 },
  };
  return products[id];
}

export default function ProductPage() {
  return <h1>Product</h1>;
}

// /products/1 → Browser tab: "Laptop - Shop"
// /products/2 → Browser tab: "Phone - Shop"

// ===== Mobile and Dynamic Title =====

// Different title lengths for different contexts

interface DocPageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const doc = await fetchDocument(params.page);

  return {
    title: {
      absolute: doc.title, // Ignore parent templates, use exactly this
      // vs
      // title: doc.title // Would apply parent templates
    },
  };
}

async function fetchDocument(page: string) {
  return {
    title: 'Complete Documentation',
  };
}
```

---

## 17. Linking Component Navigation

**Interview Answer:**

The `Link` component is Next.js's way of implementing client-side navigation. It prefetches linked pages in the background and enables fast navigation without full page reloads. Unlike HTML anchor tags, `Link` preserves component state and enables a SPA-like experience while still allowing SEO benefits. It's a wrapper around the HTML `<a>` element with Next.js specific optimizations.

**Key Points to Mention:**
- Use `next/link` component
- Enables client-side navigation
- Automatically prefetches linked pages
- Better UX than `<a>` tags
- Still generates valid HTML `<a>` elements
- Preserves scroll position and state

**Code Example:**

```typescript
// ===== Basic Link Component =====

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex space-x-6 p-4">
      {/* Basic link to home page */}
      <Link href="/">
        Home
      </Link>

      {/* Link to about page */}
      <Link href="/about">
        About
      </Link>

      {/* Link to blog */}
      <Link href="/blog">
        Blog
      </Link>

      {/* Link to contact */}
      <Link href="/contact">
        Contact
      </Link>
    </nav>
  );
}

// Renders as:
// <a href="/">Home</a>
// <a href="/about">About</a>
// etc.

// When user clicks a link:
// 1. Next.js intercepts the click
// 2. Prefetches the page in background
// 3. Performs client-side navigation
// 4. Updates URL without full page reload
// 5. Preserves component state

// ===== Links with Dynamic Routes =====

import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.id}>
          {/* Link with dynamic parameter */}
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// /blog/1 → Link href="/blog/1"
// /blog/2 → Link href="/blog/2"
// etc.

// ===== Links with Query Parameters =====

export function Search() {
  return (
    <form className="space-y-4">
      <input type="text" placeholder="Search..." />
      
      {/* Link with query parameters */}
      <Link href="/search?q=nextjs&sort=latest">
        Search Next.js
      </Link>

      {/* Multiple parameters */}
      <Link href="/products?category=electronics&sort=price&limit=10">
        Electronics on Sale
      </Link>
    </form>
  );
}

// Creates links like:
// /search?q=nextjs&sort=latest
// /products?category=electronics&sort=price&limit=10

// ===== Links with Styling =====

import Link from 'next/link';

export function StyledLinks() {
  return (
    <div className="space-y-4">
      {/* Link with className */}
      <Link 
        href="/about"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        About Page
      </Link>

      {/* Link with inline styles */}
      <Link 
        href="/services"
        style={{
          color: 'blue',
          textDecoration: 'underline',
        }}
      >
        Our Services
      </Link>

      {/* Link as a button */}
      <Link 
        href="/signup"
        className="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign Up
      </Link>

      {/* Link with custom component */}
      <Link 
        href="/features"
        className="block p-4 border rounded hover:shadow-lg transition"
      >
        <h3>Features</h3>
        <p>Explore our features</p>
      </Link>
    </div>
  );
}

// ===== Shallow Links vs Deep Links =====

import Link from 'next/link';

export function NavigationExamples() {
  return (
    <nav className="space-y-2">
      {/* Shallow link - navigate up one level */}
      <Link href="../">
        Back
      </Link>

      {/* Deep link - navigate to nested path */}
      <Link href="/dashboard/settings/notifications">
        Notification Settings
      </Link>

      {/* Root link */}
      <Link href="/">
        Home
      </Link>

      {/* External-looking but internal link */}
      <Link href="/docs/getting-started">
        Getting Started
      </Link>
    </nav>
  );
}

// ===== Link with Scroll Behavior =====

// app/layout.tsx
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Link with scroll to top (default behavior) */}
          <Link href="/">
            Home
          </Link>

          {/* Link to section (with hash) */}
          <Link href="/docs#installation">
            Installation Guide
          </Link>

          {/* Link that preserves scroll position (advanced) */}
          <Link href="/another-page">
            Another Page
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

// When navigating:
// - By default, Next.js scrolls to top
// - Hash links scroll to element with that id
// - You can customize this behavior

// ===== Real-World Navigation Example =====

import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface HeaderProps {
  items: NavItem[];
}

export function Header({ items }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MyApp
          </Link>

          {/* Navigation Links */}
          <nav className="flex space-x-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/signin"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}

// Usage:
// <Header 
//   items={[
//     { label: 'Home', href: '/' },
//     { label: 'About', href: '/about' },
//     { label: 'Blog', href: '/blog' },
//     { label: 'Contact', href: '/contact' },
//   ]}
// />
```

---
# Next.js Interview Preparation - Part 3: Advanced Routing, Handlers & Data Fetching

## 18. Active Links

**Interview Answer:**

Active links are navigation links that show the user which page they're currently on. Since Next.js's `Link` component doesn't provide built-in active state detection, you need to use the `usePathname()` hook from `next/navigation` to check if the current URL matches the link's href. This helps create visual feedback in navigation menus.

**Key Points to Mention:**
- Use `usePathname()` hook to get current URL
- Compare current path with link href
- Apply active styling when paths match
- Useful for navigation menus and breadcrumbs
- Client component needed for interactive behavior

**Code Example:**

```typescript
// app/components/NavLink.tsx
// Custom component for active link detection

'use client'; // Client component needed for usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavLink({
  href,
  children,
  className = 'text-gray-700 hover:text-blue-600',
  activeClassName = 'text-blue-600 font-bold',
}: NavLinkProps) {
  // Get the current pathname
  const pathname = usePathname();

  // Check if the link is active
  // Exact match: pathname === href
  // Prefix match: pathname.startsWith(href) && href !== '/'
  const isActive = pathname === href || (pathname.startsWith(href) && href !== '/');

  // Apply active class if link matches current path
  const linkClassName = isActive ? activeClassName : className;

  return (
    <Link href={href} className={linkClassName}>
      {children}
    </Link>
  );
}

// ===== Usage in Navigation =====

// app/components/Navigation.tsx

'use client';

import { NavLink } from './NavLink';

export function Navigation() {
  return (
    <nav className="flex space-x-6 p-4 bg-white shadow">
      <NavLink href="/">
        Home
      </NavLink>

      <NavLink href="/about">
        About
      </NavLink>

      <NavLink href="/blog">
        Blog
      </NavLink>

      <NavLink href="/contact">
        Contact
      </NavLink>
    </nav>
  );
}

// When you visit /about:
// - Home link: default styling
// - About link: active styling (text-blue-600 font-bold)
// - Blog link: default styling
// - Contact link: default styling

// ===== Advanced Active Link Detection =====

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdvancedNavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean; // Exact match only
  icon?: React.ReactNode;
}

export function AdvancedNavLink({
  href,
  children,
  exact = true,
  icon,
}: AdvancedNavLinkProps) {
  const pathname = usePathname();

  // Exact match
  let isActive = pathname === href;

  // If not exact match, check if pathname starts with href
  if (!exact) {
    isActive = pathname.startsWith(href) && href !== '/';
  }

  return (
    <Link
      href={href}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded transition
        ${isActive 
          ? 'bg-blue-500 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}

// ===== Sidebar Navigation with Active Indicator =====

'use client';

import { NavLink } from './NavLink';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-8">Dashboard</h2>

      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block px-4 py-2 rounded transition
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
                }
              `}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// Usage:
// <Sidebar items={[
//   { label: 'Dashboard', href: '/dashboard', icon: '📊' },
//   { label: 'Users', href: '/dashboard/users', icon: '👥' },
//   { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
// ]} />

// ===== Breadcrumb with Active States =====

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Breadcrumb() {
  const pathname = usePathname();

  // Convert pathname to breadcrumb items
  // /blog/posts/my-post → ['/', '/blog', '/blog/posts', '/blog/posts/my-post']
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      return { label, href };
    }),
  ];

  return (
    <nav className="flex space-x-2 text-gray-600 py-2">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center space-x-2">
          {index > 0 && <span>/</span>}

          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-semibold">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-blue-600 hover:underline">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// When visiting /blog/posts/my-post:
// Home / Blog / Posts / My Post
//  ↑     ↑      ↑        ↑ (current, not clickable)
//  |_____|______|_________ (all clickable)

// ===== Tab Navigation with Active Indicator =====

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TabItem {
  label: string;
  href: string;
}

interface TabsProps {
  items: TabItem[];
  basePath?: string;
}

export function Tabs({ items, basePath = '' }: TabsProps) {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-gray-200">
      {items.map((item) => {
        const fullHref = basePath ? `${basePath}${item.href}` : item.href;
        const isActive = pathname === fullHref;

        return (
          <Link
            key={item.href}
            href={fullHref}
            className={`
              px-6 py-3 font-medium border-b-2 transition
              ${isActive
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-700 border-transparent hover:text-blue-600'
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

// Usage:
// <Tabs 
//   basePath="/account"
//   items={[
//     { label: 'Profile', href: '/profile' },
//     { label: 'Settings', href: '/settings' },
//     { label: 'Security', href: '/security' },
//   ]}
// />

// When visiting /account/profile:
// Profile tabs gets active indicator
```

---

## 19. params and searchParams

**Interview Answer:**

`params` and `searchParams` are props passed to page and layout components in Next.js App Router. `params` contains dynamic route segments (from `[id]` or `[...slug]`), while `searchParams` contains URL query string parameters. These props are automatically provided by Next.js and update when the URL changes, allowing you to access and use URL data in your components.

**Key Points to Mention:**
- `params` for dynamic route segments `[id]`, `[...slug]`
- `searchParams` for query string parameters `?key=value`
- Both are passed as component props
- `params` is synchronous, `searchParams` is async in layouts
- Useful for filtering, sorting, and pagination
- Read-only, don't modify directly

**Code Example:**

```typescript
// ===== Using params with Dynamic Routes =====

// app/blog/[slug]/page.tsx
// Route: /blog/my-post → params = { slug: 'my-post' }
// Route: /blog/nextjs-tips → params = { slug: 'nextjs-tips' }

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>Showing content for post "{slug}"</p>
    </div>
  );
}

// ===== Using searchParams for Query Strings =====

// app/search/page.tsx
// Route: /search?q=nextjs&sort=date&page=1

interface SearchPageProps {
  searchParams: {
    q?: string;
    sort?: string;
    page?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const sort = searchParams.sort || 'relevance';
  const page = searchParams.page || '1';

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      <p>Sort by: {sort}</p>
      <p>Page: {page}</p>
    </div>
  );
}

// Visiting /search?q=nextjs&sort=date&page=2 displays:
// Query: nextjs
// Sort by: date
// Page: 2

// ===== Multiple params with Nested Routes =====

// app/users/[userId]/posts/[postId]/page.tsx
// Route: /users/john/posts/42

interface UserPostPageProps {
  params: {
    userId: string;
    postId: string;
  };
}

export default function UserPostPage({ params }: UserPostPageProps) {
  return (
    <div>
      <h1>User Post</h1>
      <p>User ID: {params.userId}</p>
      <p>Post ID: {params.postId}</p>
    </div>
  );
}

// ===== Combining params and searchParams =====

// app/products/[category]/page.tsx
// Route: /products/electronics?sort=price&filter=in-stock

interface ProductsPageProps {
  params: {
    category: string;
  };
  searchParams: {
    sort?: string;
    filter?: string;
    limit?: string;
  };
}

export default function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { category } = params;
  const { sort = 'popularity', filter, limit = '20' } = searchParams;

  return (
    <div>
      <h1>Products - {category}</h1>
      <div className="space-y-2">
        <p>Category: {category}</p>
        <p>Sort by: {sort}</p>
        {filter && <p>Filter: {filter}</p>}
        <p>Items per page: {limit}</p>
      </div>
    </div>
  );
}

// ===== Real-World Example: Product Listing with Filters =====

interface ProductListProps {
  params: {
    category: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ProductListPage({
  params,
  searchParams,
}: ProductListProps) {
  const { category } = params;

  // Extract filters from query string
  const page = Number(searchParams.page) || 1;
  const sort = (searchParams.sort as string) || 'popularity';
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : 0;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : 10000;

  // Fetch products based on filters
  const products = await fetchProducts({
    category,
    page,
    sort,
    minPrice,
    maxPrice,
  });

  return (
    <div className="p-6">
      <h1>Products - {category}</h1>

      {/* Filters Section */}
      <div className="mb-6 space-y-4">
        <div>
          <label>Sort by:</label>
          <select name="sort" defaultValue={sort}>
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div>
          <label>Price Range:</label>
          <input
            type="number"
            placeholder="Min"
            defaultValue={minPrice}
            name="minPrice"
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={maxPrice}
            name="maxPrice"
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex space-x-2">
        {[1, 2, 3, 4, 5].map((p) => (
          <a
            key={p}
            href={`/products/${category}?page=${p}&sort=${sort}`}
            className={`px-3 py-1 ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {p}
          </a>
        ))}
      </div>
    </div>
  );
}

async function fetchProducts(filters: any) {
  // Mock data
  return [
    { id: 1, name: 'Product 1', price: 99 },
    { id: 2, name: 'Product 2', price: 199 },
  ];
}

// ===== Type-Safe searchParams =====

// For better type safety with searchParams
type ProductFilters = {
  sort?: 'popularity' | 'price-low' | 'price-high' | 'newest';
  minPrice?: string;
  maxPrice?: string;
  page?: string;
};

interface ProductPageProps {
  params: { category: string };
  searchParams: ProductFilters;
}

export default function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const sort = searchParams.sort || 'popularity';
  const page = Number(searchParams.page) || 1;

  return <div>{/* Component */}</div>;
}

// ===== Layout with searchParams =====

// In Next.js 15+, searchParams is async in layouts
// app/layout.tsx

interface RootLayoutProps {
  children: React.ReactNode;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RootLayout({ children, searchParams }: RootLayoutProps) {
  // searchParams is a Promise in layouts
  const resolvedParams = await searchParams;
  const theme = resolvedParams.theme || 'light';

  return (
    <html data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 20. Navigating Programmatically

**Interview Answer:**

Programmatic navigation means navigating to a route using JavaScript code instead of clicking a link. Next.js provides the `useRouter()` hook from `next/navigation` that allows you to navigate programmatically. This is useful for redirecting after form submission, conditional navigation, or navigating based on user actions other than link clicks.

**Key Points to Mention:**
- Use `useRouter()` hook from `next/navigation`
- `push()` for normal navigation
- `replace()` to replace history entry
- `back()` and `forward()` for history navigation
- Must be in Client component (`'use client'`)
- Can navigate after async operations

**Code Example:**

```typescript
// ===== Basic Programmatic Navigation =====

'use client'; // Must be client component

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login API call
      const response = await fetch('/api/login', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
        // Navigate to dashboard after successful login
        // push() adds to browser history
        router.push('/dashboard');
      } else {
        console.error('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}

// ===== router.push() vs router.replace() =====

'use client';

import { useRouter } from 'next/navigation';

export function NavigationExample() {
  const router = useRouter();

  const handlePush = () => {
    // push() adds the new page to browser history
    // User can click back to return to current page
    // /page1 → push to /page2 → back returns to /page1
    router.push('/page2');
  };

  const handleReplace = () => {
    // replace() replaces the current history entry
    // User cannot use back to return to current page
    // /page1 → replace with /page2 → back skips /page2, goes to page before /page1
    router.replace('/page2');
  };

  return (
    <div className="space-y-4">
      <button onClick={handlePush}>
        Navigate with History (push)
      </button>
      <button onClick={handleReplace}>
        Replace History Entry
      </button>
    </div>
  );
}

// Use replace() for:
// - Login redirects (no reason to go back to login page)
// - Form redirects (don't want to return to blank form)
// - Unauthorized access redirects

// Use push() for:
// - Normal navigation
// - Category selection
// - Pagination

// ===== Navigation with Parameters =====

'use client';

import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleViewDetails = () => {
    // Navigate with dynamic route parameter
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    // Navigate with query parameters
    router.push(`/checkout?item=${product.id}&quantity=1`);
  };

  return (
    <div className="border p-4 rounded">
      <h3>{product.name}</h3>
      <button onClick={handleViewDetails}>View Details</button>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

// ===== Conditional Navigation =====

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ConditionalNavigation() {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);

  const handleNavigate = async () => {
    // Check condition before navigating
    if (hasChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmed) return; // Don't navigate if user cancels
    }

    // Navigate if condition is met
    router.push('/another-page');
  };

  return (
    <button onClick={handleNavigate}>
      Go to Another Page
    </button>
  );
}

// ===== Browser History Navigation =====

'use client';

import { useRouter } from 'next/navigation';

export function HistoryNavigation() {
  const router = useRouter();

  return (
    <div className="space-x-2">
      {/* Go back in browser history */}
      <button onClick={() => router.back()}>
        Back
      </button>

      {/* Go forward in browser history */}
      <button onClick={() => router.forward()}>
        Forward
      </button>

      {/* Refresh current page */}
      <button onClick={() => router.refresh()}>
        Refresh
      </button>
    </div>
  );
}

// router.back() equivalent to browser back button
// router.forward() equivalent to browser forward button
// router.refresh() refetches data and re-renders without navigation

// ===== Real-World Example: Multi-Step Form =====

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Step = 1 | 2 | 3;

export function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as Step);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    // Send form data to server
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Navigate to success page
      // Use replace so user can't go back to form
      router.replace('/success');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step 1</span>
          <span>Step 2</span>
          <span>Step 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <h2>Step 1: Your Name</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2>Step 2: Your Email</h2>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <h2>Step 3: Your Message</h2>
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-2 mt-6">
        {step > 1 && (
          <button
            onClick={handlePrevious}
            className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
        )}

        <button
          onClick={handleNext}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {step === 3 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// ===== Navigation with Loading State =====

'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function NavigationWithLoading() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigate = () => {
    // useTransition provides isPending state during navigation
    startTransition(() => {
      router.push('/next-page');
    });
  };

  return (
    <button
      onClick={handleNavigate}
      disabled={isPending}
      className={`px-4 py-2 rounded ${
        isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      } text-white`}
    >
      {isPending ? 'Loading...' : 'Navigate'}
    </button>
  );
}
```
# Next.js Interview Preparation - Part 4: Server Components, Rendering & Data Fetching

## 21. Templates

**Interview Answer:**

Templates are like layouts but they create a new instance for each navigation. While layouts persist their state across navigations, templates remount completely every time you navigate to them. They're useful for features that need to reset state on every navigation, such as animation enter states, form resets, or analytics tracking on each page visit.

**Key Points to Mention:**
- Similar syntax to layouts (`template.tsx`)
- Remount on every navigation (unlike layouts)
- State not preserved between navigations
- Useful for animations and state resets
- Executed after layouts
- Wraps children and page components

**Code Example:**

```typescript
// app/template.tsx - Root template

'use client';

import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  // This effect runs every time the page changes
  useEffect(() => {
    console.log('Template mounted - page changed');
    // Perfect for animations or analytics tracking
  }, []);

  return (
    <div className="transition-opacity duration-300 opacity-100">
      {/* Fade-in animation on page change */}
      {children}
    </div>
  );
}

// When navigating:
// /page1 → /page2
// - Template unmounts from /page1
// - Template mounts for /page2
// - useEffect runs again
// - Animation triggers

// ===== Animation Example with Templates =====

'use client';

import { useEffect, useState } from 'react';

export default function AnimatedTemplate({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset animation state
    setIsVisible(false);
    
    // Trigger animation after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 50);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array - runs once per mount

  return (
    <div
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

// ===== Template vs Layout Comparison =====

// app/layout.tsx - PERSISTS state
'use client';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  // Counter is preserved when navigating between pages
  return (
    <html>
      <body>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(c => c + 1)}>+</button>
        {children}
      </body>
    </html>
  );
}

// app/template.tsx - RESETS state
'use client';
import { useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  // Counter resets to 0 when navigating to a new page
  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(c => c + 1)}>+</button>
      {children}
    </div>
  );
}

// ===== Form Reset with Template =====

'use client';

import { useEffect, useState } from 'react';

export default function FormTemplate({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render of form by changing key
    // This ensures form is reset on page change
    setKey(prev => prev + 1);
  }, []);

  return <div key={key}>{children}</div>;
}

// When navigating between pages with forms:
// The key changes → all form inputs reset
// User sees fresh form on each page

// ===== Analytics Tracking with Template =====

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view every time template mounts
    console.log(`Page viewed: ${pathname}`);
    
    // In real app, send to analytics service
    // analytics.pageView(pathname);
  }, []); // Runs once per mount (once per page change)

  return <>{children}</>;
}
```

---

## 22. Loading UI

**Interview Answer:**

Loading UI in Next.js is shown while page content is being fetched or rendered. The `loading.tsx` file displays a fallback UI while the page component loads. This works particularly well with `<Suspense>` boundaries and streaming, allowing you to show skeleton screens or spinners to users while data is being fetched. Loading states improve perceived performance and user experience.

**Key Points to Mention:**
- Create `loading.tsx` file
- Shows while page/components are loading
- Works with Suspense boundaries
- Can use skeleton screens
- Improves perceived performance
- Automatically wrapped with Suspense

**Code Example:**

```typescript
// ===== Basic Loading UI =====

// app/dashboard/loading.tsx

export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        {/* Skeleton for header */}
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>

        {/* Skeleton for content */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Skeleton for cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// app/dashboard/page.tsx

async function fetchDashboardData() {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { title: 'Dashboard', stats: [1, 2, 3] };
}

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded shadow">
            <p className="text-3xl font-bold">{stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// When visiting /dashboard:
// 1. Loading UI appears
// 2. Simulated 2 second delay
// 3. Dashboard content appears

// ===== Component-Level Loading with Suspense =====

import { Suspense } from 'react';

// app/products/page.tsx

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
        </div>
      ))}
    </div>
  );
}

async function ProductsList() {
  // This component can now suspend
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product: any) => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      
      {/* Show skeleton while ProductsList loads */}
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}

// ===== Multiple Suspense Boundaries =====

async function HeaderData() {
  await new Promise(r => setTimeout(r, 500));
  return { title: 'Welcome' };
}

async function MainContent() {
  await new Promise(r => setTimeout(r, 1500));
  return { content: 'Main content here' };
}

async function Sidebar() {
  await new Promise(r => setTimeout(r, 1000));
  return { items: ['Item 1', 'Item 2'] };
}

export default function Page() {
  return (
    <div className="flex">
      {/* Header loads first (500ms) */}
      <Suspense fallback={<div>Loading header...</div>}>
        <HeaderComponent />
      </Suspense>

      {/* Main content loads after header (1500ms total) */}
      <Suspense fallback={<div>Loading content...</div>}>
        <MainContentComponent />
      </Suspense>

      {/* Sidebar loads in parallel (1000ms) */}
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <SidebarComponent />
      </Suspense>
    </div>
  );
}

// Users see:
// 1. All three skeletons initially
// 2. Header content appears after ~500ms
// 3. Sidebar content appears after ~1000ms
// 4. Main content appears after ~1500ms
```

---

## 23. Error Handling

**Interview Answer:**

Error handling in Next.js is managed through `error.tsx` files that catch errors in their route segment and display a fallback UI. Errors can be caught at any level of the route hierarchy, allowing you to display error boundaries for specific sections. The `error.tsx` component receives an `error` prop with the error details and a `reset` function to retry.

**Key Points to Mention:**
- Create `error.tsx` file
- Catches errors in segment and children
- Must be Client component
- Receives `error` and `reset` props
- Can be nested at multiple levels
- Only catches server-side errors in async components

**Code Example:**

```typescript
// ===== Basic Error Boundary =====

// app/error.tsx - Global error handler

'use client'; // Error components must be client components

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-700 mb-2">
          {error.message || 'An unexpected error occurred'}
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

// ===== Segment-Specific Error Handler =====

// app/blog/error.tsx - Blog section errors

'use client';

export default function BlogError({ error, reset }: ErrorProps) {
  return (
    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded">
      <h2 className="text-lg font-bold text-yellow-800">Blog Loading Error</h2>
      <p className="text-yellow-700 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded"
      >
        Retry Blog Loading
      </button>
    </div>
  );
}

// When error occurs in /blog/* routes:
// This error.tsx handles it instead of global error.tsx

// ===== Data Fetching with Error Handling =====

// app/posts/[id]/page.tsx

async function getPost(id: string) {
  const res = await fetch(`https://api.example.com/posts/${id}`);
  
  // Error thrown here will be caught by error.tsx
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.statusText}`);
  }
  
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  // This error will be caught by error.tsx
  const post = await getPost(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// If fetch fails:
// 1. Error is thrown
// 2. Caught by nearest error.tsx
// 3. Error UI is displayed

// ===== Nested Error Boundaries =====

// File structure:
// app/
//   ├── error.tsx              (Global error handler)
//   └── dashboard/
//       ├── error.tsx          (Dashboard error handler)
//       └── analytics/
//           ├── error.tsx      (Analytics error handler)
//           └── page.tsx

// app/dashboard/error.tsx
'use client';

export default function DashboardError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// app/dashboard/analytics/error.tsx
'use client';

export default function AnalyticsError({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Analytics Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry Analytics</button>
    </div>
  );
}

// Error priority (nearest to farthest):
// 1. analytics/error.tsx   ← Catches errors in analytics
// 2. dashboard/error.tsx   ← Catches errors in dashboard (not analytics)
// 3. error.tsx             ← Global catch-all

// ===== Recovering from Errors =====

// app/settings/error.tsx

'use client';

import { useEffect } from 'react';

interface RecoveryErrorProps {
  error: Error;
  reset: () => void;
}

export default function SettingsError({ error, reset }: RecoveryErrorProps) {
  useEffect(() => {
    // Log error for monitoring
    console.error('Settings error:', error);
    // Could also send to error tracking service
  }, [error]);

  return (
    <div className="p-6 bg-red-50 border-l-4 border-red-600">
      <h2 className="text-lg font-bold text-red-800">Settings Error</h2>
      <p className="text-red-700 mt-2">
        {error.message || 'Failed to load settings'}
      </p>
      <div className="mt-4 space-x-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

// reset() function:
// - Re-renders the error boundary and its children
// - Attempts to recover from the error
// - Often involves retrying a failed fetch
```

---

## 24. Handling Errors in Nested Routes

**Interview Answer:**

When errors occur in nested routes, Next.js uses the nearest `error.tsx` file to handle them. This creates a granular error handling system where you can have specific error boundaries at each level of your route hierarchy. Errors bubble up from child routes to parent routes until they're caught by an `error.tsx` file.

**Key Points to Mention:**
- Nearest `error.tsx` catches errors
- Errors bubble up to parent boundaries
- Different error handlers per segment
- Can provide segment-specific error UI
- Useful for feature-based error handling

**Code Example:**

```typescript
// ===== Nested Error Handling Example =====

// File structure:
// app/
//   ├── error.tsx                           (Root error handler)
//   └── admin/
//       ├── error.tsx                       (Admin error handler)
//       ├── users/
//       │   ├── error.tsx                   (Users error handler)
//       │   ├── page.tsx
//       │   └── [id]/
//       │       ├── error.tsx               (User detail error handler)
//       │       └── page.tsx
//       └── settings/
//           ├── page.tsx

// app/error.tsx - Global error handler
'use client';

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-red-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600">Critical Error</h1>
            <p className="mt-2 text-gray-700">{error.message}</p>
            <button
              onClick={reset}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded"
            >
              Recovery
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

// app/admin/error.tsx - Admin section error handler
'use client';

export default function AdminError({ error, reset }: ErrorProps) {
  return (
    <div className="p-6 bg-yellow-50 border-l-4 border-yellow-600">
      <h2 className="text-lg font-bold text-yellow-800">Admin Error</h2>
      <p className="text-yellow-700">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded">
        Retry Admin
      </button>
    </div>
  );
}

// app/admin/users/error.tsx - Users list error handler
'use client';

export default function UsersError({ error, reset }: ErrorProps) {
  return (
    <div className="p-6 bg-orange-50 border-l-4 border-orange-600">
      <h2 className="text-lg font-bold text-orange-800">Users List Error</h2>
      <p className="text-orange-700">{error.message}</p>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-orange-600 text-white rounded">
        Reload Users
      </button>
    </div>
  );
}

// app/admin/users/[id]/error.tsx - Single user error handler
'use client';

import Link from 'next/link';

export default function UserDetailError({ error, reset }: ErrorProps) {
  return (
    <div className="p-6 bg-red-50 border-l-4 border-red-600">
      <h2 className="text-lg font-bold text-red-800">User Details Error</h2>
      <p className="text-red-700">{error.message}</p>
      <div className="mt-4 space-x-3">
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
        <Link
          href="/admin/users"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
}

// app/admin/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers(); // Error caught by admin/users/error.tsx

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <Link href={`/admin/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// app/admin/users/[id]/page.tsx
async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id); // Error caught by admin/users/[id]/error.tsx

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

// ===== Error Flow Example =====

// When visiting /admin/users:
// - getUsers() fails
// - admin/users/error.tsx catches it (nearest handler)
// - Shows "Users List Error"
// - admin/error.tsx is NOT used

// When visiting /admin/users/123:
// - getUser() fails
// - admin/users/[id]/error.tsx catches it (nearest handler)
// - Shows "User Details Error"
// - admin/users/error.tsx is NOT used
// - admin/error.tsx is NOT used

// Error always caught by NEAREST error.tsx file
```

---

## 25. Handling Errors in Layouts

**Interview Answer:**

Layout errors need special handling because errors in layout components affect all pages using that layout. You can create an `error.tsx` file at the layout level, but it will only catch errors from pages, not from the layout itself. Errors directly in layout code might require app-level error handling. It's important to keep layouts stable and minimize logic that could throw errors.

**Key Points to Mention:**
- `error.tsx` catches errors from pages, not the layout itself
- Keep layouts free from error-prone operations
- Use async layout carefully
- Segment-specific error handling
- Root layout requires `error.tsx` as separate file

**Code Example:**

```typescript
// ===== Layout Error Handling =====

// app/dashboard/layout.tsx

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Avoid operations that throw here
  // Instead, keep layout code simple and stable

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        {/* Stable sidebar content */}
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

// app/dashboard/error.tsx
// Catches errors from pages in /dashboard/*, not from the layout itself

'use client';

export default function DashboardError({ error, reset }: ErrorProps) {
  return (
    <div className="p-6">
      <h2>Dashboard Page Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// ===== Async Layout with Error Handling =====

// app/admin/layout.tsx - Layout with async data

async function getAdminConfig() {
  try {
    const res = await fetch('https://api.example.com/admin/config');
    if (!res.ok) throw new Error('Failed to load config');
    return res.json();
  } catch (error) {
    // Handle error gracefully instead of throwing
    console.error('Config error:', error);
    return { defaultTheme: 'light' }; // Fallback value
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Fetch with error handling built-in
  const config = await getAdminConfig();

  return (
    <div data-theme={config.defaultTheme}>
      <header>Admin Panel</header>
      <main>{children}</main>
    </div>
  );
}

// ===== Root Layout Error Considerations =====

// app/layout.tsx - Root layout
// Cannot have error.tsx at the same level (structural limitation)

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyApp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Keep root layout extremely stable */}
        {/* Errors here are critical and need app-level error.tsx */}
        {children}
      </body>
    </html>
  );
}

// app/error.tsx - Catches errors from child pages/layouts
'use client';

export default function Error({ error, reset }: ErrorProps) {
  return (
    <html>
      <body>
        <div>
          <h1>Application Error</h1>
          <p>{error.message}</p>
          <button onClick={reset}>Try Again</button>
        </div>
      </body>
    </html>
  );
}

// ===== Suspense in Layouts with Error Boundaries =====

import { Suspense } from 'react';

interface PropsWithChildren {
  children: React.ReactNode;
}

// app/dashboard/layout.tsx

async function LoadNavigation() {
  const nav = await fetch('https://api.example.com/nav');
  if (!nav.ok) throw new Error('Nav failed');
  return nav.json();
}

function NavigationSkeleton() {
  return <div className="animate-pulse h-16 bg-gray-300"></div>;
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      {/* Navigation with error boundary */}
      <Suspense fallback={<NavigationSkeleton />}>
        <Navigation />
      </Suspense>

      <main>{children}</main>
    </div>
  );
}

async function Navigation() {
  const nav = await LoadNavigation();
  return <nav>{/* Navigation content */}</nav>;
}

// If Navigation throws error:
// - Suspense boundary catches it
// - NavigationSkeleton is shown instead
// - Page content still renders
```

---

## 26. Handling Global Errors

**Interview Answer:**

Global errors are handled by the `app/error.tsx` file at the root level of your application. This acts as a fallback catch-all for errors that occur anywhere in your app and aren't caught by more specific error boundaries. For truly global/critical errors that happen in the root layout, you use `app/global-error.tsx` which must include full HTML structure since it replaces the entire app.

**Key Points to Mention:**
- `error.tsx` at root level is global error handler
- `global-error.tsx` for root layout errors
- Must define full HTML structure in `global-error.tsx`
- Acts as ultimate fallback
- Should be safe and reliable
- Can log errors for monitoring

**Code Example:**

```typescript
// ===== Global Error Handler =====

// app/error.tsx - Global fallback error handler

'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service
    console.error('Global error:', error);
    
    // Send to monitoring service
    // errorTracking.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>

          <p className="text-center text-gray-600 mb-4">
            We're sorry for the inconvenience. Our team has been notified.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              <p className="font-mono">{error.message}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Try Again
            </button>

            <a
              href="/"
              className="block w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium text-center"
            >
              Go to Home
            </a>
          </div>

          {error.digest && (
            <p className="text-xs text-gray-500 text-center mt-4">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Global Error for Root Layout =====

// app/global-error.tsx
// Handles errors in the root layout itself
// Must include full HTML structure (can't use root layout)

'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-red-600">Critical Error</h1>
            <p className="text-gray-700 mt-4">
              {error.message || 'A critical error has occurred'}
            </p>
            <button
              onClick={reset}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Recover Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

// ===== Error Monitoring Integration =====

// app/error.tsx - With error monitoring

'use client';

import { useEffect } from 'react';
import { reportError } from '@/lib/errorReporting';

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Send to error tracking service
    reportError({
      type: 'APPLICATION_ERROR',
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// lib/errorReporting.ts

export async function reportError(errorData: any) {
  try {
    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    });
  } catch (err) {
    console.error('Failed to report error:', err);
  }
}

// ===== Specific Error Handling =====

// app/error.tsx - Handle different error types

'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Handle different errors differently
    if (error.message.includes('UNAUTHORIZED')) {
      // Redirect to login
      window.location.href = '/login';
    } else if (error.message.includes('NOT_FOUND')) {
      // Show 404
      console.log('Resource not found');
    } else if (error.message.includes('RATE_LIMIT')) {
      // Show rate limit message
      console.log('Too many requests');
    }
  }, [error]);

  const getErrorTitle = () => {
    if (error.message.includes('UNAUTHORIZED')) return 'Access Denied';
    if (error.message.includes('NOT_FOUND')) return 'Not Found';
    if (error.message.includes('RATE_LIMIT')) return 'Too Many Requests';
    return 'Something Went Wrong';
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">{getErrorTitle()}</h1>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
```
# Next.js Interview Preparation - Part 5: Parallel Routes, Intercepting Routes & Advanced Patterns

## 27. Parallel Routes

**Interview Answer:**

Parallel routes allow you to render multiple routes simultaneously in the same layout. Using the `@` symbol convention to create named slots, you can display different content side-by-side that can be navigated independently. This is particularly useful for dashboards with multiple independent sections, modal overlays over content, or split-pane interfaces where different parts update separately.

**Key Points to Mention:**
- Use `@` convention for named slots
- Render multiple routes simultaneously
- Independent navigation for each slot
- Useful for dashboards and complex layouts
- Can have different error boundaries
- Supports loading and error states per slot

**Code Example:**

```typescript
// ===== Basic Parallel Routes =====

// File structure:
// app/
//   ├── layout.tsx
//   ├── @sidebar/
//   │   └── page.tsx
//   ├── @main/
//   │   └── page.tsx
//   └── page.tsx

// app/layout.tsx - Root layout with slots

import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;  // Named slot @sidebar
  main: React.ReactNode;     // Named slot @main
}

export default function RootLayout({
  children,
  sidebar,
  main,
}: RootLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar slot - rendered from @sidebar folder */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        {sidebar}
      </aside>

      {/* Main slot - rendered from @main folder */}
      <main className="flex-1 overflow-auto">
        {main}
      </main>
    </div>
  );
}

// app/@sidebar/page.tsx - Sidebar content

export default function SidebarPage() {
  return (
    <div>
      <h2>Sidebar</h2>
      <nav className="space-y-2">
        <a href="/dashboard" className="block hover:bg-gray-800 p-2 rounded">
          Dashboard
        </a>
        <a href="/users" className="block hover:bg-gray-800 p-2 rounded">
          Users
        </a>
        <a href="/settings" className="block hover:bg-gray-800 p-2 rounded">
          Settings
        </a>
      </nav>
    </div>
  );
}

// app/@main/page.tsx - Main content

export default function MainPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Main content here</p>
    </div>
  );
}

// ===== Dashboard with Multiple Parallel Routes =====

// File structure for complex dashboard:
// app/dashboard/
//   ├── layout.tsx
//   ├── @header/page.tsx
//   ├── @sidebar/page.tsx
//   ├── @content/page.tsx
//   └── @footer/page.tsx

// app/dashboard/layout.tsx

interface DashboardLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}

export default function DashboardLayout({
  children,
  header,
  sidebar,
  content,
  footer,
}: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header slot */}
      <header className="bg-white border-b p-4">
        {header}
      </header>

      <div className="flex flex-1">
        {/* Sidebar slot */}
        <aside className="w-64 bg-gray-100 border-r p-4">
          {sidebar}
        </aside>

        {/* Content slot */}
        <main className="flex-1 overflow-auto p-6">
          {content}
        </main>
      </div>

      {/* Footer slot */}
      <footer className="bg-gray-100 border-t p-4">
        {footer}
      </footer>
    </div>
  );
}

// app/dashboard/@header/page.tsx
export default function Header() {
  return (
    <div>
      <h1>Dashboard Header</h1>
    </div>
  );
}

// app/dashboard/@sidebar/page.tsx
export default function DashboardSidebar() {
  return (
    <nav className="space-y-2">
      <a href="/dashboard" className="block p-2 hover:bg-gray-200">Overview</a>
      <a href="/dashboard/analytics" className="block p-2 hover:bg-gray-200">Analytics</a>
    </nav>
  );
}

// ===== Parallel Routes with Independent Navigation =====

// File structure:
// app/social/
//   ├── layout.tsx
//   ├── @feed/page.tsx
//   ├── @trending/page.tsx
//   └── @notifications/page.tsx

// app/social/layout.tsx

interface SocialLayoutProps {
  feed: React.ReactNode;
  trending: React.ReactNode;
  notifications: React.ReactNode;
}

export default function SocialLayout({
  feed,
  trending,
  notifications,
}: SocialLayoutProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Each slot navigates independently */}
      <div className="col-span-2">{feed}</div>
      <aside className="space-y-4">
        {trending}
        {notifications}
      </aside>
    </div>
  );
}

// app/social/@feed/page.tsx
export default function FeedPage() {
  return (
    <div className="border rounded p-4">
      <h2>Feed</h2>
      {/* Feed content - navigates independently */}
    </div>
  );
}

// app/social/@trending/page.tsx
export default function TrendingPage() {
  return (
    <div className="border rounded p-4">
      <h2>Trending</h2>
      {/* Trending content - navigates independently */}
    </div>
  );
}

// ===== Error Boundaries in Parallel Routes =====

// app/dashboard/@content/error.tsx
// If content slot throws error, only it shows error, not other slots

'use client';

export default function ContentError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 bg-red-50 rounded">
      <h3>Content Error</h3>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// app/dashboard/@sidebar/error.tsx
// Sidebar error doesn't affect content

'use client';

export default function SidebarError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 bg-yellow-50 rounded">
      <h3>Sidebar Error</h3>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// ===== Parallel Routes with Loading States =====

// app/dashboard/@content/loading.tsx
export default function ContentLoading() {
  return <div className="animate-pulse p-6 bg-gray-300 rounded h-96"></div>;
}

// app/dashboard/@sidebar/loading.tsx
export default function SidebarLoading() {
  return <div className="animate-pulse p-6 bg-gray-300 rounded"></div>;
}

// Each slot shows its own loading state independently
```

---

## 28. Unmatched Routes & Conditional Routes

**Interview Answer:**

Unmatched routes occur when a URL doesn't match any defined route structure. Conditional routes are routes that are shown or hidden based on certain conditions. Both can be handled using parallel routes with `default.tsx` files or by using the `notFound()` function. This allows you to create complex routing logic where content changes based on conditions, user authentication, or feature flags.

**Key Points to Mention:**
- Use `default.tsx` for fallback UI in parallel routes
- Handle unmatched parallel route segments
- `notFound()` function for explicit 404s
- Conditional rendering based on routes
- Feature flags and role-based routing

**Code Example:**

```typescript
// ===== Default Route in Parallel Routes =====

// File structure:
// app/
//   ├── layout.tsx
//   ├── @sidebar/
//   │   ├── page.tsx
//   │   └── default.tsx
//   └── @main/
//       ├── page.tsx
//       └── default.tsx

// app/@sidebar/default.tsx - Fallback for unmatched sidebar routes

export default function SidebarDefault() {
  return (
    <div>
      <p>Sidebar (default)</p>
    </div>
  );
}

// app/@main/default.tsx - Fallback for unmatched main routes

export default function MainDefault() {
  return (
    <div>
      <p>Main content (default)</p>
    </div>
  );
}

// When you visit a route that doesn't have a matching slot file,
// the default.tsx is rendered instead

// ===== Unmatched Route Handling =====

// File structure:
// app/
//   ├── (marketing)/
//   │   └── page.tsx
//   ├── (admin)/
//   │   ├── page.tsx
//   │   └── [...notFound]/default.tsx
//   └── not-found.tsx

// app/(admin)/[...notFound]/default.tsx
// Catches unmatched routes within admin group

export default function AdminNotFoundDefault() {
  return (
    <div className="p-6">
      <h1>Admin Section Not Found</h1>
      <p>The page you're looking for doesn't exist in the admin section.</p>
    </div>
  );
}

// ===== Conditional Routes Using Parallel Routes =====

// File structure:
// app/
//   ├── @modal/
//   │   ├── page.tsx
//   │   ├── settings/page.tsx
//   │   └── default.tsx
//   └── layout.tsx

// app/layout.tsx

interface RootLayoutProps {
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default function RootLayout({ modal, children }: RootLayoutProps) {
  return (
    <div>
      {children}
      {modal} {/* Modal shows conditionally */}
    </div>
  );
}

// app/@modal/default.tsx - No modal by default

export default function ModalDefault() {
  return null; // Nothing rendered when not at modal route
}

// app/@modal/settings/page.tsx - Show modal at /settings

export default function SettingsModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2>Settings Modal</h2>
        <p>Modal content only shows when visiting /settings</p>
      </div>
    </div>
  );
}

// ===== Conditional Rendering Based on Authentication =====

// app/@auth/layout.tsx
// This slot shows based on authentication status

'use client';

import { useSession } from '@/lib/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (!session) {
    return <div>Please log in</div>;
  }

  return <>{children}</>;
}

// ===== Feature Flag Based Routes =====

// app/@beta/page.tsx
// Shows only if beta feature enabled

export default function BetaPage() {
  const isBetaEnabled = process.env.NEXT_PUBLIC_BETA_ENABLED === 'true';

  if (!isBetaEnabled) {
    return <div>Beta feature is not available</div>;
  }

  return <div>Beta Feature Content</div>;
}

// ===== Role-Based Route Display =====

// app/@admin/page.tsx

'use client';

import { useUserRole } from '@/lib/useUserRole';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const role = useUserRole();

  if (role !== 'admin') {
    redirect('/');
  }

  return <div>Admin-only content</div>;
}
```

---

## 29. Intercepting Routes

**Interview Answer:**

Intercepting routes allow you to load a route from another part of your application while keeping the user in their current context. They use the `(..)` convention in folder names to intercept routes. This is useful for showing modals, sidebars, or other overlays that appear when navigating to certain routes while still displaying the underlying page. They're particularly powerful for building photo gallery light boxes or modal dialogs.

**Key Points to Mention:**
- Use `(..)` prefix in folder names
- Intercepts routes during client-side navigation
- Doesn't intercept direct URL access
- Great for modals and overlays
- Can show route content differently based on navigation path
- Soft navigation when intercepted

**Code Example:**

```typescript
// ===== Basic Intercepting Routes =====

// File structure for intercepting:
// app/
//   ├── layout.tsx
//   ├── photos/
//   │   ├── page.tsx
//   │   └── [id]/
//   │       └── page.tsx
//   └── (..)photos/
//       └── [id]/
//           ├── page.tsx
//           └── modal.tsx

// app/layout.tsx

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}

// app/photos/page.tsx - Photo gallery

import Link from 'next/link';

interface Photo {
  id: string;
  url: string;
  title: string;
}

async function getPhotos(): Promise<Photo[]> {
  return [
    { id: '1', url: '/photo1.jpg', title: 'Photo 1' },
    { id: '2', url: '/photo2.jpg', title: 'Photo 2' },
    { id: '3', url: '/photo3.jpg', title: 'Photo 3' },
  ];
}

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="p-6">
      <h1>Photo Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Link key={photo.id} href={`/photos/${photo.id}`}>
            <div className="border rounded overflow-hidden hover:shadow-lg transition cursor-pointer">
              <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
              <p className="p-2">{photo.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// app/photos/[id]/page.tsx - Full-page photo view (direct access)

export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="max-w-4xl">
        <img
          src={`/photo${params.id}.jpg`}
          alt={`Photo ${params.id}`}
          className="w-full"
        />
        <p className="text-white mt-4">Photo {params.id}</p>
      </div>
    </div>
  );
}

// app/(..)photos/[id]/modal.tsx - Intercepted modal view

'use client';

import { useRouter } from 'next/navigation';

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div
        className="relative bg-white rounded-lg max-w-2xl max-h-96 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center z-10"
        >
          ×
        </button>

        <img
          src={`/photo${params.id}.jpg`}
          alt={`Photo ${params.id}`}
          className="w-full h-96 object-cover"
        />
      </div>
    </div>
  );
}

// Behavior:
// 1. User visits /photos (gallery)
// 2. User clicks photo link (/photos/1)
//    - Route is intercepted
//    - Modal shows over gallery
//    - URL is /photos/1 but still showing gallery behind
// 3. User visits /photos/1 directly (not from gallery)
//    - Route is NOT intercepted
//    - Full-page view shows (no modal)

// ===== Parallel + Intercepting Routes =====

// File structure:
// app/
//   ├── layout.tsx
//   ├── @modal/
//   │   ├── (..)posts/
//   │   │   └── [id]/
//   │   │       └── page.tsx
//   │   └── default.tsx
//   ├── posts/
//   │   └── [id]/page.tsx
//   └── page.tsx

// app/layout.tsx

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

// app/@modal/default.tsx

export default function ModalDefault() {
  return null;
}

// app/@modal/(..)posts/[id]/page.tsx - Modal when from posts list

'use client';

import { useRouter } from 'next/navigation';

export default function PostModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => router.back()}
    >
      <div className="bg-white p-6 rounded-lg max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2>Post {params.id}</h2>
        <p>Modal view of post</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ===== Intercepting Multiple Levels =====

// (..) = one level up
// (...) = two levels up (some versions)

// File structure:
// app/
//   ├── blog/
//   │   └── posts/
//   │       └── [id]/page.tsx
//   └── (..)blog/
//       └── posts/
//           └── [id]/page.tsx (this gets intercepted)
```

---

## 30. Route Handlers - GET & POST Requests

**Interview Answer:**

Route Handlers are serverless functions that handle HTTP requests in Next.js. Created as `route.ts` files, they allow you to handle different HTTP methods (GET, POST, PUT, DELETE, etc.). Route Handlers run only on the server and can access databases, APIs, and other server-only resources. They're powerful for creating API endpoints within your Next.js application without needing a separate backend server.

**Key Points to Mention:**
- Created as `route.ts` or `route.js` files
- Handle HTTP methods (GET, POST, PATCH, DELETE, etc.)
- Run on the server only
- Access to databases and secrets
- Can use Middleware
- Automatic caching for GET requests (in older versions)
- Returns Response object

**Code Example:**

```typescript
// ===== Basic GET Request Handler =====

// app/api/hello/route.ts
// Endpoint: GET /api/hello

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // GET handler

  // Send JSON response
  return NextResponse.json(
    { message: 'Hello from GET route handler' },
    { status: 200 }
  );
}

// Usage:
// fetch('/api/hello')
// Response: { message: 'Hello from GET route handler' }

// ===== GET with Query Parameters =====

// app/api/users/route.ts
// Endpoint: GET /api/users?page=1&limit=10

export async function GET(request: NextRequest) {
  // Extract query parameters
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  // Mock database query
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];

  return NextResponse.json(
    {
      data: users,
      page: parseInt(page),
      limit: parseInt(limit),
    },
    { status: 200 }
  );
}

// ===== Basic POST Request Handler =====

// app/api/users/route.ts (also handles POST)
// Endpoint: POST /api/users

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email } = body;

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Mock database insert
    const newUser = {
      id: Math.random(),
      name,
      email,
      createdAt: new Date(),
    };

    // Return created resource
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Usage:
// fetch('/api/users', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ name: 'John', email: 'john@example.com' })
// })

// ===== GET with Dynamic Routes =====

// app/api/users/[id]/route.ts
// Endpoint: GET /api/users/123

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // Mock fetch from database
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
  };

  return NextResponse.json(user);
}

// ===== Combined GET and POST Handlers =====

// app/api/posts/route.ts

export async function GET(request: NextRequest) {
  // GET /api/posts - Get all posts
  const posts = [
    { id: 1, title: 'Post 1', content: '...' },
    { id: 2, title: 'Post 2', content: '...' },
  ];

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  // POST /api/posts - Create new post
  const body = await request.json();

  const newPost = {
    id: Math.random(),
    ...body,
    createdAt: new Date(),
  };

  return NextResponse.json(newPost, { status: 201 });
}

// ===== Real-World Example: Todo API =====

// app/api/todos/route.ts

import { NextRequest, NextResponse } from 'next/server';

// In-memory store (replace with database)
let todos: any[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
];

// GET /api/todos - Get all todos
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const completed = searchParams.get('completed');

  let filtered = todos;

  if (completed !== null) {
    filtered = todos.filter(t => t.completed === (completed === 'true'));
  }

  return NextResponse.json(filtered);
}

// POST /api/todos - Create new todo
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;

  if (!title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }

  const newTodo = {
    id: Math.max(...todos.map(t => t.id), 0) + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

// ===== Error Handling in Route Handlers =====

export async function GET(request: NextRequest) {
  try {
    // Simulate API call
    const externalData = await fetch('https://api.example.com/data').then(r => r.json());

    return NextResponse.json(externalData);
  } catch (error) {
    console.error('API error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// ===== Request Headers and Cookies =====

export async function GET(request: NextRequest) {
  // Get headers
  const authHeader = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');

  // Get cookies
  const sessionToken = request.cookies.get('session')?.value;

  // Check authentication
  if (!authHeader || !sessionToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: 'Authenticated',
    auth: authHeader,
    session: sessionToken,
  });
}
```

---

## 31. Route Handlers - PATCH & DELETE Requests

**Interview Answer:**

PATCH and DELETE route handlers are used to update and delete resources respectively. PATCH is for partial updates to existing resources, while DELETE removes resources entirely. These handlers follow the same pattern as GET and POST, receiving the request object and optionally route parameters, and returning a Response object with appropriate status codes.

**Key Points to Mention:**
- PATCH for partial updates
- DELETE for removing resources
- Follow same pattern as GET/POST
- Use appropriate HTTP status codes
- Return updated/deleted resource
- Validate input before updating
- Handle not found (404) errors

**Code Example:**

```typescript
// ===== Basic PATCH Handler =====

// app/api/posts/[id]/route.ts
// Endpoint: PATCH /api/posts/123

import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const body = await request.json();
    const { title, content } = body;

    // Mock database update
    const post = {
      id,
      title: title || 'Existing Title',
      content: content || 'Existing Content',
      updatedAt: new Date(),
    };

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// Usage:
// fetch('/api/posts/123', {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ title: 'Updated Title' })
// })

// ===== Basic DELETE Handler =====

// app/api/posts/[id]/route.ts
// Endpoint: DELETE /api/posts/123

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    // Mock database delete
    const deletedPost = { id, deleted: true };

    // 204 No Content is appropriate for DELETE
    return NextResponse.json(deletedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

// Usage:
// fetch('/api/posts/123', { method: 'DELETE' })

// ===== GET, PATCH, DELETE Combined =====

// app/api/posts/[id]/route.ts

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // GET /api/posts/123 - Get single post
  const post = { id: params.id, title: 'Post', content: '...' };
  return NextResponse.json(post);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // PATCH /api/posts/123 - Update post
  const body = await request.json();
  const updatedPost = { id: params.id, ...body, updatedAt: new Date() };
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // DELETE /api/posts/123 - Delete post
  return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
}

// ===== Real-World Todo API with All Methods =====

// app/api/todos/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Mock database
const todoStore: Map<string, any> = new Map([
  ['1', { id: '1', title: 'Learn Next.js', completed: false }],
]);

// GET - Retrieve single todo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = todoStore.get(params.id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

// PATCH - Update todo (partial or complete)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = todoStore.get(params.id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  const body = await request.json();

  // Update fields that are provided
  if (body.title !== undefined) todo.title = body.title;
  if (body.completed !== undefined) todo.completed = body.completed;

  todoStore.set(params.id, todo);

  return NextResponse.json(todo);
}

// DELETE - Remove todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = todoStore.get(params.id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  todoStore.delete(params.id);

  return NextResponse.json(
    { message: 'Todo deleted', id: params.id },
    { status: 200 }
  );
}

// ===== Status Codes Best Practices =====

export async function GET(request: NextRequest) {
  // 200 OK - Success
  return NextResponse.json({ data: 'success' }, { status: 200 });
}

export async function POST(request: NextRequest) {
  // 201 Created - Resource created
  return NextResponse.json({ id: 1 }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  // 200 OK - Successfully updated
  return NextResponse.json({ updated: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  // 204 No Content - Successful delete, no response body
  // or 200 OK with confirmation
  return new NextResponse(null, { status: 204 });
}

// Error status codes:
// 400 Bad Request - Invalid input
// 401 Unauthorized - Not authenticated
// 403 Forbidden - Authenticated but not allowed
// 404 Not Found - Resource doesn't exist
// 500 Internal Server Error - Server error
```

---

## 32. Dynamic Route Handlers

**Interview Answer:**

Dynamic route handlers use URL parameters (created with square brackets like `[id]`) to handle different resources. They allow you to create single handler file that processes requests for different resource IDs. This keeps code DRY by avoiding multiple handler files for each resource variation.

**Key Points to Mention:**
- Use `[paramName]` in folder structure
- Access params from handler function
- Can have multiple dynamic segments
- Useful for resource-based APIs
- Common pattern for REST APIs

**Code Example:**

```typescript
// ===== Single Dynamic Parameter =====

// File: app/api/users/[id]/route.ts
// Matches: /api/users/123, /api/users/456, etc.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // Mock fetch from database
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
  };

  return NextResponse.json(user);
}

// GET /api/users/123 → { id: '123', name: 'User 123', ... }
// GET /api/users/abc → { id: 'abc', name: 'User abc', ... }

// ===== Multiple Dynamic Parameters =====

// File: app/api/users/[userId]/posts/[postId]/route.ts
// Matches: /api/users/123/posts/456

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; postId: string } }
) {
  const { userId, postId } = params;

  const post = {
    userId,
    postId,
    title: `Post ${postId} by User ${userId}`,
  };

  return NextResponse.json(post);
}

// GET /api/users/123/posts/456
// → { userId: '123', postId: '456', title: 'Post 456 by User 123' }

// ===== Dynamic PATCH Handler =====

// File: app/api/users/[id]/route.ts

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const body = await request.json();

  // Validate input
  if (!body.name && !body.email) {
    return NextResponse.json(
      { error: 'At least one field required' },
      { status: 400 }
    );
  }

  // Mock update
  const updatedUser = {
    id: userId,
    name: body.name || 'Existing Name',
    email: body.email || 'existing@example.com',
  };

  return NextResponse.json(updatedUser);
}

// PATCH /api/users/123
// body: { name: 'John' }
// → Updated user 123

// ===== Dynamic DELETE Handler =====

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // Mock delete
  const deleted = await mockDatabase.delete('users', userId);

  if (!deleted) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: 'User deleted' });
}

// ===== Catch-All Dynamic Routes =====

// File: app/api/files/[...path]/route.ts
// Matches: /api/files/documents/2024/report.pdf

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const filePath = params.path.join('/');

  return NextResponse.json({
    filePath,
    segments: params.path,
  });
}

// GET /api/files/documents/2024/report.pdf
// → { filePath: 'documents/2024/report.pdf', segments: ['documents', '2024', 'report.pdf'] }
```
# Next.js Interview Preparation - Part 6: Middleware, Data Fetching & Advanced Rendering

## 33. Middleware

**Interview Answer:**

Middleware in Next.js runs on the Edge Runtime before requests are processed. It allows you to intercept requests and responses, modifying headers, redirecting routes, or implementing logic like authentication checks and rate limiting. Middleware is defined in a `middleware.ts` file at the root of your project and can run for all routes or specific route patterns using matchers.

**Key Points to Mention:**
- Runs on Edge Runtime before request processing
- Can intercept requests and responses
- Useful for authentication, redirects, headers
- Define in `middleware.ts` at root level
- Use `matcher` to specify which routes to run on
- Returns Response or NextResponse

**Code Example:**

```typescript
// ===== Basic Middleware =====

// middleware.ts (at root level, not in /app)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs on ALL routes by default
export function middleware(request: NextRequest) {
  // Log request info
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`);

  // Continue to next handler
  return NextResponse.next();
}

// ===== Middleware with Route Matching =====

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if user is accessing protected routes
  if (pathname.startsWith('/admin')) {
    // Get auth token from cookie
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Specify which routes this middleware applies to
export const config = {
  matcher: [
    '/admin/:path*',      // All admin routes
    '/dashboard/:path*',  // All dashboard routes
    '/api/:path*',        // All API routes
  ],
};

// ===== Authentication Middleware =====

// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require auth
  const publicRoutes = ['/', '/login', '/signup', '/about'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protected routes - check authentication
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const verified = await verifyToken(token);

  if (!verified) {
    // Token invalid, redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token'); // Clear invalid token
    return response;
  }

  // Add user info to headers for use in route handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', verified.userId as string);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
  ],
};

// ===== Redirect Middleware =====

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Old route → New route redirect
  if (pathname.startsWith('/old-blog')) {
    return NextResponse.redirect(
      new URL(pathname.replace('/old-blog', '/blog'), request.url),
      { status: 301 } // Permanent redirect
    );
  }

  // Redirect old API to new API version
  if (pathname.startsWith('/api/v1')) {
    return NextResponse.redirect(
      new URL(pathname.replace('/api/v1', '/api/v2'), request.url)
    );
  }

  return NextResponse.next();
}

// ===== Header Manipulation Middleware =====

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add custom headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Add request ID for tracking
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);

  return response;
}

// ===== Role-Based Access Control Middleware =====

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin-only routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const user = await getUserFromToken(token);

    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

async function getUserFromToken(token: string) {
  // Mock implementation
  return { userId: '123', role: 'admin' };
}

export const config = {
  matcher: ['/admin/:path*'],
};

// ===== Conditional Middleware Logic =====

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && request.nextUrl.protocol === 'http:') {
    return NextResponse.redirect(
      new URL(request.url.replace('http://', 'https://')),
      { status: 307 }
    );
  }

  // Redirect based on user preference
  const preferredLanguage = request.headers.get('accept-language');
  if (preferredLanguage?.includes('fr') && pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  return NextResponse.next();
}
```

---

## 34. URL Query Parameters & Headers in Route Handlers

**Interview Answer:**

Route handlers can access URL query parameters through `request.nextUrl.searchParams` and HTTP headers through `request.headers`. Query parameters come from the URL string (`?key=value`), while headers are metadata sent with the HTTP request. Both are essential for handling various types of input in API endpoints.

**Key Points to Mention:**
- Access query params via `request.nextUrl.searchParams`
- Access headers via `request.headers`
- Use `.get()` to retrieve specific values
- Headers include standard HTTP headers and custom headers
- Query params are for filtering and pagination
- Headers for authentication and metadata

**Code Example:**

```typescript
// ===== Accessing Query Parameters =====

// app/api/search/route.ts
// URL: /api/search?q=nextjs&sort=date&limit=10

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get search params from URL
  const searchParams = request.nextUrl.searchParams;

  // Get individual parameters
  const query = searchParams.get('q'); // 'nextjs'
  const sort = searchParams.get('sort'); // 'date'
  const limit = searchParams.get('limit'); // '10'

  // Get all values for a parameter (if multiple)
  const tags = searchParams.getAll('tag'); // ['tag1', 'tag2']

  // Check if parameter exists
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter required' },
      { status: 400 }
    );
  }

  const results = [
    { title: 'Next.js Guide', score: 0.95 },
    { title: 'Learning Next.js', score: 0.87 },
  ];

  return NextResponse.json({
    query,
    sort,
    limit: parseInt(limit || '10'),
    results,
  });
}

// ===== Accessing Request Headers =====

// app/api/protected/route.ts

export async function GET(request: NextRequest) {
  // Access standard HTTP headers
  const contentType = request.headers.get('content-type');
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');

  // Access authentication headers
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Validate token format (Bearer token)
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return NextResponse.json(
      { error: 'Invalid authorization header' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: 'Authorized',
    contentType,
    userAgent,
    token: token.substring(0, 10) + '...', // Masked for security
  });
}

// ===== Custom Headers =====

export async function GET(request: NextRequest) {
  // Get custom headers (often prefixed with X-)
  const apiKey = request.headers.get('x-api-key');
  const clientId = request.headers.get('x-client-id');
  const requestId = request.headers.get('x-request-id');

  if (!apiKey || !clientId) {
    return NextResponse.json(
      { error: 'Missing required headers' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    apiKey: apiKey.substring(0, 5) + '...',
    clientId,
    requestId,
  });
}

// ===== Filtering with Query Parameters =====

// app/api/products/route.ts
// URL: /api/products?category=electronics&minPrice=100&maxPrice=1000

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const category = params.get('category');
  const minPrice = parseInt(params.get('minPrice') || '0');
  const maxPrice = parseInt(params.get('maxPrice') || '10000');
  const page = parseInt(params.get('page') || '1');
  const limit = parseInt(params.get('limit') || '20');

  // Mock filter
  let products = [
    { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
    { id: 2, name: 'Phone', price: 699, category: 'electronics' },
    { id: 3, name: 'Book', price: 20, category: 'books' },
  ];

  // Apply filters
  if (category) {
    products = products.filter(p => p.category === category);
  }

  products = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

  // Apply pagination
  const total = products.length;
  const skip = (page - 1) * limit;
  products = products.slice(skip, skip + limit);

  return NextResponse.json({
    total,
    page,
    limit,
    products,
  });
}

// ===== Combining Query Params and Headers =====

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const authHeader = request.headers.get('authorization');
  const apiVersion = request.headers.get('x-api-version');

  const userId = params.get('userId');
  const format = params.get('format') || 'json';

  // Validate inputs
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json(
      { error: 'userId required' },
      { status: 400 }
    );
  }

  const data = {
    userId,
    version: apiVersion || '1.0',
    format,
  };

  // Return different format if requested
  if (format === 'xml') {
    return new Response(convertToXML(data), {
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  return NextResponse.json(data);
}

function convertToXML(data: any): string {
  return `<?xml version="1.0"?><data>${JSON.stringify(data)}</data>`;
}
```

---

## 35. Cookies in Route Handlers

**Interview Answer:**

Cookies are small pieces of data stored on the client that are sent with every HTTP request. In Next.js route handlers, you can read cookies from the request and set new cookies in the response. Cookies are commonly used for authentication tokens, session management, and user preferences.

**Key Points to Mention:**
- Read cookies via `request.cookies.get()`
- Set cookies via `response.cookies.set()`
- Delete cookies by setting max-age to 0
- Cookies sent with every request (within domain)
- Used for auth tokens and sessions
- Consider security (httpOnly, secure flags)

**Code Example:**

```typescript
// ===== Reading Cookies =====

// app/api/user/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get single cookie
  const sessionToken = request.cookies.get('session')?.value;
  const userPreference = request.cookies.get('theme')?.value;

  // Get all cookies
  const allCookies = request.cookies.getAll(); // Returns array of all cookies

  if (!sessionToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    sessionToken: sessionToken.substring(0, 10) + '...',
    theme: userPreference || 'light',
    allCookies: allCookies.map(c => c.name),
  });
}

// ===== Setting Cookies =====

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  // Mock authentication
  if (email && password) {
    const token = 'mock-token-' + Date.now();

    const response = NextResponse.json(
      { message: 'Login successful', token },
      { status: 200 }
    );

    // Set cookie in response
    response.cookies.set({
      name: 'session',
      value: token,
      httpOnly: true, // Prevents JS access (security)
      secure: true, // Only sent over HTTPS
      sameSite: 'lax', // CSRF protection
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  );
}

// ===== Deleting Cookies =====

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });

  // Delete cookie by setting maxAge to 0
  response.cookies.set({
    name: 'session',
    value: '',
    maxAge: 0, // Expires immediately
  });

  return response;
}

// ===== Cookie Patterns =====

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });

  // Set multiple cookies
  response.cookies.set('theme', 'dark', {
    maxAge: 365 * 24 * 60 * 60, // 1 year
  });

  response.cookies.set('language', 'en-US', {
    maxAge: 365 * 24 * 60 * 60,
  });

  response.cookies.set('session', 'token123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 1 day
  });

  return response;
}

// ===== Cookie Attributes Explained =====

// httpOnly: true  → Cannot be accessed by JavaScript (XSS protection)
// secure: true    → Only sent over HTTPS
// sameSite: 'lax' → Sent on same-site or top-level cross-site requests (CSRF protection)
// maxAge: seconds → How long cookie lasts (in seconds from now)
// path: '/'       → Cookie path scope
// domain: '.example.com' → Cookie domain scope

// ===== Real-World Auth Example =====

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  // Validate credentials (in real app, check against database)
  const isValid = username === 'admin' && password === 'password123';

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // Generate session token
  const sessionToken = generateToken();

  const response = NextResponse.json(
    { message: 'Login successful', username },
    { status: 200 }
  );

  // Set secure session cookie
  response.cookies.set('sessionId', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return response;
}

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value;

  if (!sessionId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Validate session token
  const isValid = validateSessionToken(sessionId);

  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function validateSessionToken(token: string): boolean {
  // Mock validation
  return token.startsWith('sessionId');
}

// ===== Reading Cookies in Client Components =====

// This is in a client component
'use client';

import { useEffect, useState } from 'react';

export function UserPreferences() {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    // Read cookie from client
    const themeCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1];

    if (themeCookie) {
      setTheme(themeCookie);
    }
  }, []);

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  );
}
```

---

## 36. Redirects in Route Handlers

**Interview Answer:**

Redirects in route handlers send the client to a different URL, typically using the `redirect()` function or by returning a redirect response with status 301 or 302. Redirects are useful after form submissions, failed authentications, or when moving content to a new URL. They tell the browser to navigate to a different page, updating the URL and loading new content.

**Key Points to Mention:**
- Use `redirect()` function for simple redirects
- Use `NextResponse.redirect()` for more control
- 301 = permanent redirect
- 302/307 = temporary redirect
- Can redirect after POST, PUT, PATCH operations
- Useful for authentication and form handling

**Code Example:**

```typescript
// ===== Basic Redirect =====

// app/api/old-url/route.ts

import { redirect } from 'next/navigation';

export async function GET() {
  // Redirect to new URL
  redirect('/new-url');
}

// Visiting /api/old-url redirects to /new-url

// ===== Redirect with Status Code =====

import { NextResponse } from 'next/server';

export async function GET() {
  // 301 Permanent redirect
  return NextResponse.redirect(new URL('/new-url', 'https://example.com'), {
    status: 301,
  });

  // 302 Temporary redirect (more common)
  // return NextResponse.redirect(
  //   new URL('/new-url', 'https://example.com'),
  //   { status: 302 }
  // );
}

// ===== Redirect After Login =====

// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  // Validate credentials
  const user = await authenticateUser(email, password);

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // Set session cookie
  const response = NextResponse.redirect(new URL('/dashboard', request.url), {
    status: 302,
  });

  response.cookies.set('session', 'token-' + user.id, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}

async function authenticateUser(email: string, password: string) {
  // Mock authentication
  if (email === 'test@example.com' && password === 'password') {
    return { id: '123', email };
  }
  return null;
}

// ===== Redirect After Logout =====

export async function POST(request: NextRequest) {
  // Clear session and redirect
  const response = NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  });

  response.cookies.delete('session');

  return response;
}

// ===== Conditional Redirect =====

// app/api/check-subscription/route.ts

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    // Not logged in - redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!user.hasSubscription) {
    // Not subscribed - redirect to pricing
    return NextResponse.redirect(new URL('/pricing', request.url));
  }

  // Redirect to dashboard if all checks pass
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  if (!token) return null;
  // Validate token and return user
  return { id: '123', hasSubscription: true };
}

// ===== Redirect Based on User Role =====

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request);

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Route based on role
  if (user.role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  } else if (user.role === 'moderator') {
    return NextResponse.redirect(new URL('/mod/dashboard', request.url));
  } else {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }
}

// ===== Redirect with Query Parameters =====

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, quantity } = body;

  if (!productId || !quantity) {
    // Redirect back with error
    const url = new URL('/cart', request.url);
    url.searchParams.append('error', 'Missing product or quantity');
    return NextResponse.redirect(url);
  }

  // Add to cart then redirect with success
  const cartId = await addToCart(productId, quantity);
  
  const url = new URL('/checkout', request.url);
  url.searchParams.append('cartId', cartId);
  url.searchParams.append('success', 'Item added to cart');

  return NextResponse.redirect(url);
}

async function addToCart(productId: string, quantity: number): Promise<string> {
  return 'cart-' + Date.now();
}

// ===== Redirect with Relative URLs =====

export async function GET(request: NextRequest) {
  // Absolute URL (full domain)
  const absolute = new URL('/dashboard', 'https://example.com');

  // Relative to current host (recommended)
  const relative = new URL('/dashboard', request.url);

  return NextResponse.redirect(relative);
}
```

---

## 37. Caching in Route Handlers

**Interview Answer:**

Caching in route handlers controls how responses are cached by browsers and CDNs. In Next.js 15+, GET route handlers are not cached by default. You can control caching using the `revalidate` export (for ISR - Incremental Static Regeneration), `cache: 'force-cache'` in fetch options, or HTTP cache headers. Proper caching improves performance and reduces server load for frequently accessed data.

**Key Points to Mention:**
- GET requests not cached by default (Next.js 15+)
- Use `export const revalidate` for ISR
- Use `export const dynamic` for rendering behavior
- HTTP cache headers in responses
- Vary header for different cache versions
- Useful for APIs that serve mostly static data

**Code Example:**

```typescript
// ===== Non-Cached GET (Default in Next.js 15+) =====

// app/api/posts/route.ts
// Every request fetches fresh data

export async function GET() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return Response.json(posts);
}

// Each GET request fetches fresh data from API

// ===== Static Caching with revalidate =====

// Cache for 60 seconds then revalidate
export const revalidate = 60;

export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }, // Cache for 60 seconds
  }).then(r => r.json());

  return Response.json(data);
}

// ===== Force Cache =====

export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // Always cache
  }).then(r => r.json());

  return Response.json(data);
}

// ===== No Cache =====

export async function GET() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Never cache, always fresh
  }).then(r => r.json());

  return Response.json(data);
}

// ===== Dynamic vs Static =====

// Static route (cached by default)
export const dynamic = 'force-static';

export async function GET() {
  return Response.json({ status: 'static' });
}

// Dynamic route (not cached)
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ status: 'dynamic', timestamp: Date.now() });
}

// ===== Cache Headers =====

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data: 'cached data' });

  // Cache in browser for 1 hour
  response.headers.set('Cache-Control', 'public, max-age=3600');

  return response;
}

// ===== Vary Header for Different Content =====

export async function GET(request: NextRequest) {
  const userPreference = request.headers.get('x-user-preference');

  const response = NextResponse.json({
    preference: userPreference,
  });

  // Cache separately based on user preference header
  response.headers.set('Vary', 'x-user-preference');
  response.headers.set('Cache-Control', 'public, max-age=3600');

  return response;
}

// ===== Conditional Caching =====

export const revalidate = 3600; // 1 hour default

export async function GET(request: NextRequest) {
  const freshData = request.nextUrl.searchParams.get('fresh') === 'true';

  const options = freshData
    ? { cache: 'no-store' as const }
    : { next: { revalidate: 3600 } };

  const data = await fetch('https://api.example.com/data', options)
    .then(r => r.json());

  return Response.json(data);
}

// GET /api/data → Returns cached data
// GET /api/data?fresh=true → Returns fresh data

// ===== Incremental Static Regeneration (ISR) =====

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 },
  }).then(r => r.json());

  return Response.json(posts);
}

// First request: Fetches from API and caches
// Requests within 60 seconds: Serves cached data
// After 60 seconds: Next request triggers revalidation
// Meanwhile: Stale cache served to other users

// ===== POST/PUT/DELETE Not Cached =====

export async function POST(request: NextRequest) {
  // POST requests are never cached
  const body = await request.json();

  const result = await fetch('https://api.example.com/data', {
    method: 'POST',
    body: JSON.stringify(body),
    // Note: cache option ignored for non-GET requests
  }).then(r => r.json());

  return Response.json(result, { status: 201 });
}

// ===== Real-World Caching Example =====

// app/api/products/route.ts

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');

  const url = new URL('https://api.example.com/products');
  if (category) {
    url.searchParams.append('category', category);
  }

  const products = await fetch(url.toString(), {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  }).then(r => r.json());

  const response = NextResponse.json(products);

  // Set cache headers
  response.headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  response.headers.set('Vary', 'category'); // Cache separately by category

  return response;
}

// First request /api/products?category=electronics
// → Fetches from API, caches for 5 minutes
// → Future requests within 5 minutes serve from cache
// → Vary header ensures different categories are cached separately
```

# Next.js Interview Preparation - Part 7: Rendering Strategies & Server Components

## 38. Client-side Rendering (CSR)

**Interview Answer:**

Client-side Rendering (CSR) means the browser downloads minimal HTML, then JavaScript renders the page content. In traditional React SPAs, all rendering happens on the client. While Next.js primarily uses Server-Side Rendering, CSR is useful for interactive components that don't need SEO or initial content visibility. CSR causes slower First Contentful Paint (FCP) but enables rich interactivity without server load.

**Key Points to Mention:**
- Content rendered by browser JavaScript
- Slower initial page load
- Better user interactions after load
- Not ideal for SEO
- Useful for dashboards and interactive tools
- Can co-exist with SSR in Next.js

**Code Example:**

```typescript
// ===== Pure Client-Side Component =====

'use client'; // Required for client-side features

import { useState, useEffect } from 'react';

// This component renders entirely on the client
export default function ClientCounter() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // This runs ONLY on the client
  useEffect(() => {
    setMounted(true);
    console.log('Component mounted on client');
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h2>Client-Side Counter</h2>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}

// ===== Data Fetching on Client =====

'use client';

import { useEffect, useState } from 'react';

export function ClientDataFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch happens AFTER page loads
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty deps - runs once on mount

  if (loading) return <div>Loading data on client...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{JSON.stringify(data)}</div>;
}

// Performance implications:
// 1. Browser downloads HTML (empty or minimal content)
// 2. Browser downloads JavaScript bundle
// 3. JavaScript executes
// 4. React renders components
// 5. useEffect runs
// 6. API call made
// 7. Data fetched and state updated
// 8. Component re-renders with data

// This causes:
// ❌ Slower First Contentful Paint (FCP)
// ❌ Slower Time to Interactive (TTI)
// ❌ Content not visible until JS executes
// ❌ Hydration mismatch if server renders different content
// ✅ But enables rich interactivity
```

---

## 39. Server-side Rendering (SSR)

**Interview Answer:**

Server-Side Rendering (SSR) generates HTML on the server for each request, sending fully rendered pages to the browser. This improves initial page load, SEO, and user experience. The browser receives complete HTML content immediately. SSR is the default in Next.js App Router, combining server processing with automatic optimization.

**Key Points to Mention:**
- HTML generated on server per request
- Faster initial page load
- Better SEO (content immediately visible to crawlers)
- Higher server load
- Dynamic content based on request (headers, cookies, etc.)
- HTML hydrated with React on client
- Default behavior in Next.js 13+

**Code Example:**

```typescript
// ===== Server-Side Rendering (Default) =====

// app/page.tsx
// This is a Server Component by default (no 'use client')

import { Suspense } from 'react';

// Fetch data directly in server component
async function getPostData() {
  // This runs on server BEFORE HTML is sent to browser
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return posts;
}

export default async function PostsPage() {
  // This function runs on server
  const posts = await getPostData();

  // HTML is fully rendered on server with data already present
  return (
    <div className="p-6">
      <h1>Blog Posts</h1>
      
      {/* Data is already available - no loading state needed */}
      <div className="space-y-4">
        {posts.map((post: any) => (
          <article
            key={post.id}
            className="border p-4 rounded hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// Performance flow with SSR:
// 1. Request comes to server
// 2. Server processes request
// 3. Server fetches data (getPostData)
// 4. Server renders React components to HTML
// 5. HTML sent to browser (complete with data)
// 6. Browser displays HTML immediately
// 7. JavaScript downloads and hydrates
// 8. React takes over for interactivity

// Result:
// ✅ Fast First Contentful Paint - HTML immediately visible
// ✅ Better SEO - search engines see all content
// ✅ Content available instantly
// ✅ No loading spinner on first load
// ❌ Higher server load
// ❌ Not suitable for very dynamic content

// ===== SSR with Request-Specific Data =====

import { headers, cookies } from 'next/headers';

export default async function UserPage() {
  // Access request-specific data on server
  const headersList = await headers();
  const cookiesList = await cookies();

  const userPreference = cookiesList.get('theme')?.value || 'light';
  const userAgent = headersList.get('user-agent');

  return (
    <div>
      <h1>User Profile</h1>
      <p>Theme: {userPreference}</p>
      <p>Logged in from: {userAgent}</p>
      
      {/* Content is personalized based on request */}
    </div>
  );
}

// This data is request-specific and can't be cached
// Each request generates new HTML with specific user data

// ===== Comparison: CSR vs SSR =====

// CSR Flow:
// User Request
//   ↓
// Server sends minimal HTML + JS bundle
//   ↓
// Browser downloads & parses JS
//   ↓
// React renders in browser
//   ↓
// useEffect runs
//   ↓
// API call made
//   ↓
// Data received & rendered
// Result: Slower initial load, but interactive after

// SSR Flow:
// User Request
//   ↓
// Server fetches data
//   ↓
// Server renders complete HTML
//   ↓
// Server sends HTML to browser
//   ↓
// Browser displays content immediately
//   ↓
// JS hydrates for interactivity
// Result: Faster initial load, good SEO
```

---

## 40. Suspense SSR

**Interview Answer:**

Suspense is a React feature that allows you to "suspend" rendering while data is being fetched, showing a fallback UI. In Next.js, Suspense with SSR enables streaming HTML to the browser as components finish loading, improving perceived performance. Instead of waiting for all data to load, you can show the page structure immediately and stream content as it becomes available.

**Key Points to Mention:**
- Streaming HTML to browser
- Show fallback UI while loading
- Improved perceived performance
- Progressive content rendering
- Works with async components
- Can wrap multiple Suspense boundaries
- Better user experience than blocking all rendering

**Code Example:**

```typescript
// ===== Basic Suspense with SSR =====

// app/page.tsx

import { Suspense } from 'react';

// Component that suspends (throws promise while loading)
async function SlowComponent() {
  // Simulate slow data fetching
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Slow content loaded</div>;
}

// Fallback UI while SlowComponent loads
function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-4 bg-gray-300 rounded h-20"></div>
  );
}

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      <h1>Page with Suspense SSR</h1>

      {/* Header loads immediately */}
      <section className="bg-blue-100 p-4 rounded">
        <h2>Fast Section</h2>
        <p>This loads immediately</p>
      </section>

      {/* Suspense wraps slow component */}
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>

      {/* Footer loads immediately */}
      <section className="bg-green-100 p-4 rounded">
        <h2>Footer</h2>
        <p>This also loads immediately</p>
      </section>
    </div>
  );
}

// With Suspense + SSR:
// 1. Server renders fast content immediately
// 2. Browser receives HTML with fast sections + skeleton fallback
// 3. User sees page structure immediately
// 4. Server continues fetching slow content
// 5. As slow component finishes, HTML is streamed
// 6. Browser inserts slow content into placeholder
// 7. User sees complete page

// Without Suspense:
// 1. Server waits for ALL data to load
// 2. Browser gets nothing until everything ready
// 3. Slow data blocks fast content
// 4. Poor perceived performance

// ===== Multiple Suspense Boundaries =====

async function Header() {
  await new Promise(r => setTimeout(r, 500));
  return <h1 className="text-3xl">Header</h1>;
}

async function MainContent() {
  await new Promise(r => setTimeout(r, 2000));
  return <p className="text-lg">Main content</p>;
}

async function Sidebar() {
  await new Promise(r => setTimeout(r, 1500));
  return <aside>Sidebar content</aside>;
}

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Header loads in ~500ms */}
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>

      {/* Main content loads in ~2000ms */}
      <Suspense fallback={<div>Loading content...</div>}>
        <MainContent />
      </Suspense>

      {/* Sidebar loads in ~1500ms */}
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
    </div>
  );
}

// Progressive rendering:
// ~500ms: Header appears
// ~1500ms: Sidebar appears
// ~2000ms: Main content appears
// User never sees complete loading screen

// ===== Suspense with Streaming Response =====

import { ReadableStream } from 'stream';

// In route handlers:
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial HTML
      controller.enqueue('<!DOCTYPE html><html><body>');

      // Send header immediately
      controller.enqueue('<header>Header Content</header>');

      // Wait and send main content
      await new Promise(r => setTimeout(r, 2000));
      controller.enqueue('<main>Main Content</main>');

      // Close stream
      controller.enqueue('</body></html>');
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html',
      'Transfer-Encoding': 'chunked',
    },
  });
}
```

---

## 41. React Server Components

**Interview Answer:**

React Server Components (RSCs) are components that run exclusively on the server and never send code to the browser. They allow you to access databases, APIs, and secrets directly without exposing them to the client. RSCs improve performance, reduce bundle size, and enable cleaner architecture by separating server and client logic. They're the default in Next.js 13+ App Router.

**Key Points to Mention:**
- Run only on server (no code sent to browser)
- Can access databases and secrets
- Never have hooks or browser APIs
- Can be async
- Return serializable data/JSX
- Reduce JavaScript bundle size
- Enable secure data access
- Default in App Router

**Code Example:**

```typescript
// ===== Basic Server Component =====

// app/page.tsx
// No 'use client' = Server Component

import { db } from '@/lib/database';

// Async function is possible only in Server Components
async function getUsers() {
  // Access database directly (server-only)
  const users = await db.users.findAll();
  return users;
}

export default async function UsersPage() {
  // Call async function directly
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// This component:
// ✅ Accesses database on server
// ✅ No database credentials sent to client
// ✅ Async function executes on server
// ✅ Only JSX sent to browser
// ✅ No JavaScript bundle overhead

// ===== Server Component with Secrets =====

async function FetchSecretData() {
  // Server-only secrets are safe here
  const apiKey = process.env.SECRET_API_KEY;
  const database = process.env.DATABASE_URL;

  // These never reach the browser
  const data = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  }).then(r => r.json());

  return data;
}

export default async function Page() {
  const data = await FetchSecretData();

  // data is rendered as HTML
  // apiKey never exposed to client
  return <div>{JSON.stringify(data)}</div>;
}

// Browser receives:
// <div>{"key": "value"}</div>
// 
// Browser never sees:
// - API keys
// - Database URLs
// - Secrets
// - Backend logic

// ===== Passing Data from Server to Client Components =====

// Server Component
async function ServerFetcher() {
  // This runs on server
  const data = await fetch('https://api.example.com/data')
    .then(r => r.json());

  // Pass data to Client Component as props
  return (
    <ClientDisplayComponent data={data} />
  );
}

// Client Component
'use client';

export function ClientDisplayComponent({ data }: { data: any }) {
  // Receives data from server
  // Makes it interactive
  const [filter, setFilter] = useState('');

  const filtered = data.filter((item: any) =>
    item.name.includes(filter)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filtered.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Data flow:
// 1. Server fetches from API
// 2. Server passes data to Client Component
// 3. Client Component makes it interactive
// 4. Client never calls original API
// 5. Data is secure, performance optimized

// ===== Server Component Restrictions =====

// ❌ CANNOT do these in Server Components:
// - Use hooks (useState, useEffect, etc)
// - Use browser APIs (localStorage, window, etc)
// - Use event listeners (onClick, onChange, etc)
// - Use context (useContext doesn't work)

// ✅ CAN do these in Server Components:
// - Access databases
// - Access APIs directly
// - Use secrets and environment variables
// - Perform computations
// - Render to HTML
```

---

## 42. Server and Client Components

**Interview Answer:**

Server and Client Components work together in Next.js. Server Components handle data fetching and logic, while Client Components handle interactivity. You can nest Client Components inside Server Components and pass data down as props. This composition pattern optimizes performance by keeping server-side logic on the server and only sending interactive code to the browser.

**Key Points to Mention:**
- Server Components by default
- Client Components with `'use client'`
- Can mix both in same page
- Pass data from server to client via props
- Client can't directly call Server Components
- Proper composition improves performance
- Clear separation of concerns

**Code Example:**

```typescript
// ===== Server Component with Client Child =====

// app/products/page.tsx
// Server Component

import { db } from '@/lib/database';
import { ProductClient } from './ProductClient';

async function getProducts() {
  // Server-only operation
  return await db.products.findAll();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1>Products</h1>
      
      {/* Pass server data to client component */}
      <ProductClient products={products} />
    </div>
  );
}

// ===== Client Component =====

// app/products/ProductClient.tsx
'use client';

import { useState } from 'react';

interface ProductClientProps {
  products: any[];
}

export function ProductClient({ products }: ProductClientProps) {
  // Client interactivity
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filtered = products.filter(p =>
    selectedCategory === 'all' || p.category === selectedCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <div className="space-y-4">
      {/* Interactive filters */}
      <div className="flex gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Categories</option>
          {[...new Set(products.map(p => p.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Display filtered and sorted products */}
      <div className="grid grid-cols-3 gap-4">
        {sorted.map(product => (
          <div key={product.id} className="border p-4 rounded hover:shadow-lg">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Data flow:
// 1. Server fetches products from database
// 2. Server passes products to ProductClient as props
// 3. ProductClient renders with interactive features
// 4. No database access on client
// 5. Database credentials never exposed

// ===== Multiple Levels of Composition =====

// app/dashboard/page.tsx (Server)
async function DashboardPage() {
  const userData = await fetchUserData();
  const analyticsData = await fetchAnalytics();

  return (
    <Dashboard
      user={userData}
      analytics={analyticsData}
    />
  );
}

// app/dashboard/Dashboard.tsx (Client)
'use client';

import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

export function Dashboard({ user, analytics }: any) {
  const [theme, setTheme] = useState('light');

  return (
    <div className="flex">
      <Sidebar user={user} theme={theme} />
      <MainContent data={analytics} onThemeChange={setTheme} />
    </div>
  );
}

// app/dashboard/Sidebar.tsx (Client)
'use client';

export function Sidebar({ user, theme }: any) {
  return (
    <aside className={`sidebar ${theme}`}>
      <p>Welcome, {user.name}</p>
    </aside>
  );
}

// ===== When to Use Each =====

// Use Server Components for:
// ✅ Fetching data from databases
// ✅ Accessing secure environments
// ✅ Large dependencies
// ✅ Server-only utilities
// ✅ Authorization checks

// Use Client Components for:
// ✅ Event listeners (onClick, onChange, etc)
// ✅ Hooks (useState, useEffect, etc)
// ✅ Browser APIs (localStorage, etc)
// ✅ User interactions
// ✅ Real-time updates

// ===== Anti-patterns to Avoid =====

// ❌ WRONG: Fetching on client when server available
'use client';
useEffect(() => {
  fetch('/api/data'); // Unnecessary, do this on server
}, []);

// ✅ RIGHT: Fetch on server
async function Page() {
  const data = await fetch('/api/data');
  return <ClientComponent data={data} />;
}

// ❌ WRONG: Using context for all state
export const AppContext = createContext(); // Heavy for everything

// ✅ RIGHT: Pass data as props when possible
export function Layout({ children }: any) {
  return children; // Props > Context
}
```

---

## 43. Rendering Lifecycle in RSCs

**Interview Answer:**

The rendering lifecycle in React Server Components involves several phases: rendering on the server, serialization of the result, sending to the browser, and hydration with client components. Understanding this lifecycle helps optimize performance by knowing when code runs and what's sent to the browser. Each phase has specific characteristics affecting bundle size, performance, and functionality.

**Key Points to Mention:**
- Server rendering phase (async operations)
- Serialization phase (convert to transmittable format)
- Network transmission
- Client hydration phase
- Component interactivity
- Optimization opportunities at each phase

**Code Example:**

```typescript
// ===== RSC Rendering Lifecycle =====

// Phase 1: Server Rendering
// app/page.tsx

import { Suspense } from 'react';

async function fetchUserData() {
  console.log('[SERVER] Fetching user data...');
  const res = await fetch('https://api.example.com/user');
  return res.json();
}

function UserDisplay({ user }: { user: any }) {
  console.log('[CLIENT] UserDisplay rendering'); // Runs on client during hydration
  return <div>User: {user.name}</div>;
}

export default async function Page() {
  console.log('[SERVER] Page rendering starts');

  // Phase 1: Server-side async operations
  const user = await fetchUserData();

  console.log('[SERVER] Page rendering complete, sending to browser');

  // Phase 2: Serialization
  // React converts this JSX to a JSON-like format that can be transmitted
  return (
    <div>
      <h1>Dashboard</h1>
      {/* This data is now serialized and sent to browser */}
      <UserDisplay user={user} />
    </div>
  );
}

// Timeline:
// [SERVER] Page rendering starts
// [SERVER] Fetching user data...
// [SERVER] Page rendering complete, sending to browser
// [BROWSER] Receives serialized component tree
// [CLIENT] UserDisplay rendering (hydration)

// ===== Lifecycle Phases Detailed =====

// Phase 1: REQUEST
// - User requests /dashboard
// - Request reaches server
// - Middleware processes

// Phase 2: SERVER RENDERING
// - Server Component evaluates
// - Async functions execute
// - Data fetched
// - Component tree built

async function ServerPhase() {
  // This code ONLY runs on server
  const dbData = await database.query('...');
  const secretData = process.env.SECRET_KEY;

  return { dbData, secretData }; // Never reaches client
}

// Phase 3: SERIALIZATION
// - React converts component tree to serializable format
// - No functions, only data and JSX
// - Client Components marked for client execution
// - Environment variables stripped

// Phase 4: TRANSMISSION
// - Server sends HTML + component metadata
// - Client JavaScript bundle sent separately
// - Network transfer

// Phase 5: CLIENT HYDRATION
// - Browser receives HTML, displays immediately
// - JavaScript bundle loads
// - React attaches event listeners
// - Components become interactive

'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  // This runs during hydration
  const [count, setCount] = useState(0);

  // Event listeners attached here
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Phase 6: INTERACTIVITY
// - User can interact with page
// - Event handlers work
// - State changes trigger re-renders

// ===== What Gets Sent to Browser =====

// Server Component
async function ServerOnly() {
  const data = await fetch('...');
  return <div>{data.secret}</div>;
}

// What DOES get sent to browser:
// - HTML: <div>secret_value</div>

// What DOESN'T get sent to browser:
// - fetch function
// - async logic
// - database credentials
// - environment variables
// - API keys

// Client Component
'use client';

export function ClientOnly() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// What DOES get sent to browser:
// - Entire component code
// - useState hook implementation
// - Event handler logic
// - 100% of this component's JavaScript

// ===== Performance Implications =====

// Smaller bundle example:
async function Page() {
  const data = await ServerFetch(); // Doesn't add to bundle
  return <ClientComponent data={data} />;
}

// Larger bundle example:
'use client';
export function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/data') // Bundle includes fetch, useState, useEffect
      .then(r => r.json())
      .then(setData);
  }, []);
  return <ClientComponent data={data} />;
}

// Server approach:
// Bundle size: Smaller (client components only)
// Performance: Faster initial load

// Client approach:
// Bundle size: Larger (includes all logic)
// Performance: Slower initial load

// ===== Optimization Tips =====

// ✅ Do: Keep expensive operations on server
async function Page() {
  const heavyComputation = await doHeavyWork(); // Server-side
  return <Display data={heavyComputation} />;
}

// ❌ Don't: Send heavy libraries to client unnecessarily
'use client';
import lodash from 'lodash'; // Entire lodash sent to browser
export function Component() {
  const result = lodash.map(...); // Could have been on server
  return <div>{result}</div>;
}

// ✅ Do: Use Suspense for progressive rendering
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ExpensiveComponent />
    </Suspense>
  );
}

// ✅ Do: Mark Client Components low in tree
// Server
export default function Page() {
  return (
    <Layout>
      <Content /> {/* Potentially Server Component */}
      <InteractiveWidget /> {/* Client Component */}
    </Layout>
  );
}
```

---

## 44. Static Rendering

**Interview Answer:**

Static Rendering pre-generates HTML pages at build time, serving the same HTML to all users. This is the fastest and most efficient rendering method, with HTML cached on CDN. Static pages have no dynamic content. They're ideal for blogs, documentation, marketing pages, and any content that doesn't need per-request customization. Next.js automatically static-renders pages when possible.

**Key Points to Mention:**
- Build-time HTML generation
- Identical page served to all users
- Fastest performance
- Ideal for blogs, docs, marketing
- Can be revalidated with ISR
- Cannot use dynamic data per request
- CDN cacheable
- Zero server load for requests

**Code Example:**

```typescript
// ===== Automatic Static Rendering =====

// app/blog/page.tsx

import Link from 'next/link';

// No dynamic content = automatically static
export const metadata = {
  title: 'Blog',
  description: 'My blog posts',
};

async function getPosts() {
  // This is called at BUILD time, not request time
  const res = await fetch('https://api.example.com/posts', {
    // Cache by default for static rendering
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  // HTML is generated at build time
  // Same HTML served to all users
  // No request-time computation
  return (
    <div className="p-6">
      <h1>Blog Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <article key={post.id} className="border p-4 rounded">
            <h2>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p>{post.excerpt}</p>
            <time className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </div>
  );
}

// Build time process:
// 1. next build command runs
// 2. getPosts() executes once
// 3. HTML generated with posts
// 4. HTML stored as file
// 5. On every request: serve same HTML instantly

// Benefits:
// ✅ Extremely fast (no server computation)
// ✅ Works on static hosts (Netlify, Vercel, etc)
// ✅ CDN cacheable globally
// ✅ Zero server load
// ✅ Instant time to first byte

// ===== Static with ISR (Incremental Static Regeneration) =====

// app/blog/[slug]/page.tsx

export const revalidate = 60; // Revalidate every 60 seconds

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

// Tell Next.js which paths to pre-render
export async function generateStaticParams() {
  // Called at build time
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json());

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  return (
    <article className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <time>{new Date(post.date).toLocaleDateString()}</time>
      <div className="mt-6 prose">
        {post.content}
      </div>
    </article>
  );
}

// Build process:
// 1. generateStaticParams called
// 2. Gets list of all blog post slugs
// 3. Pre-renders HTML for each slug
// 4. Creates pages like: /blog/first-post.html, /blog/second-post.html

// ISR process:
// 1. Initial request within 60s: serves cached HTML instantly
// 2. After 60 seconds: marks cache as stale
// 3. Next request: serves stale HTML while regenerating in background
// 4. After generation: serves new HTML to subsequent requests

// Perfect for:
// - Blog posts
// - Product pages
// - Documentation
// - News articles
// - Any mostly-static content that changes occasionally

// ===== Static vs Dynamic Rendering Decision =====

// STATIC: Use when...
// ✅ Content doesn't change per request
// ✅ Same for all users
// ✅ Can be generated at build time
// ✅ No cookies or headers needed

// DYNAMIC: Use when...
// ✅ Content changes per request
// ✅ Different for each user
// ✅ Depends on cookies/headers/search params
// ✅ Real-time content needed

// ===== Forcing Static Rendering =====

export const dynamic = 'force-static';

export default async function Page() {
  // Even if this looks dynamic, it's static
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache',
  });

  return <div>{JSON.stringify(data)}</div>;
}

// ===== Static Export for Static Hosting =====

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Exports static HTML only
};

module.exports = nextConfig;

// With output: 'export':
// - Only static pages supported
// - No API routes, no revalidate
// - Deploys to GitHub Pages, S3, etc
// - Can run on any static hosting
```

---

## 45. Dynamic Rendering

**Interview Answer:**

Dynamic Rendering generates pages on-demand for each request based on request-specific data like cookies, headers, or query parameters. This is necessary when content must be personalized or changes frequently. Dynamic rendering means pages can't be cached and require server computation for each request, trading some performance for flexibility and freshness.

**Key Points to Mention:**
- Per-request HTML generation
- Uses request-specific data (cookies, headers, params)
- Cannot be pre-generated at build time
- Not CDN cacheable
- Server processes each request
- More flexible than static
- Slower than static rendering
- Triggered automatically when using dynamic features

**Code Example:**

```typescript
// ===== Automatic Dynamic Rendering =====

// app/dashboard/page.tsx

import { cookies } from 'next/headers';
import { headers } from 'next/headers';

// Using cookies/headers automatically makes this dynamic
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const headersList = await headers();

  // These make the page DYNAMIC (per-request rendering)
  const userPreference = cookieStore.get('theme')?.value || 'light';
  const userId = cookieStore.get('userId')?.value;
  const userAgent = headersList.get('user-agent');

  // This page is generated fresh for EVERY request
  // Because content depends on request cookies

  return (
    <div data-theme={userPreference}>
      <h1>Your Dashboard</h1>
      <p>User ID: {userId}</p>
      <p>Device: {userAgent}</p>
    </div>
  );
}

// Build time: No HTML generated
// Request time: HTML generated with user-specific data
// Each user gets personalized HTML

// ===== Forced Dynamic Rendering =====

export const dynamic = 'force-dynamic';

// Even without cookies/headers, this is dynamic
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Always fetch fresh
  });

  // Always fresh data, generated per request
  return <div>{JSON.stringify(data)}</div>;
}

// ===== Query Parameters Make Pages Dynamic =====

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const page = searchParams.page || '1';

  // Fetch different content based on query
  const results = await fetch(
    `https://api.example.com/search?q=${query}&page=${page}`
  ).then(r => r.json());

  // Different users with different queries get different pages
  // Each combination generated fresh
  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <div className="space-y-4">
        {results.map((result: any) => (
          <div key={result.id} className="border p-4">
            <h2>{result.title}</h2>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== User-Specific Content (Always Dynamic) =====

// app/profile/page.tsx

import { getSession } from '@/lib/auth';

export default async function ProfilePage() {
  // Calling auth function makes this dynamic
  const session = await getSession();

  if (!session) {
    return <div>Not logged in</div>;
  }

  // Each user gets personalized content
  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      {/* User-specific content */}
    </div>
  );
}

// This is ALWAYS dynamic because:
// - Content changes based on who's logged in
// - Can't pre-generate for unknown users
// - Must run per-request

// ===== Real-Time Data (Dynamic) =====

export const dynamic = 'force-dynamic';

async function getStockPrice() {
  // Always fresh, never cached
  const res = await fetch('https://api.example.com/stock/AAPL', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function StockPage() {
  const price = await getStockPrice();

  // Every request gets latest stock price
  return (
    <div>
      <h1>AAPL Stock Price</h1>
      <p className="text-3xl font-bold">${price.current}</p>
      <p>Updated: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

// vs Static version:
// Static: Same price for all users until revalidation
// Dynamic: Latest price for every request

// ===== Static vs Dynamic Comparison =====

// STATIC BLOG POST
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('...').then(r => r.json());
  return posts.map(p => ({ slug: p.slug }));
}

export default async function Post({ params }: any) {
  const post = await fetch(`/api/posts/${params.slug}`);
  return <article>{post.content}</article>;
}
// Build time: 1000 HTML files generated
// Request time: Serve cached HTML instantly
// Performance: Excellent, zero compute

// DYNAMIC VERSION OF SAME ENDPOINT
// app/blog/[slug]/page.tsx
export const dynamic = 'force-dynamic';

export default async function Post({ params }: any) {
  const userId = cookies().get('userId')?.value; // Dynamic!
  const post = await fetch(
    `/api/posts/${params.slug}?userId=${userId}` // Personalized
  );
  return <article>{post.content}</article>;
}
// Build time: Nothing generated
// Request time: Generate personalized HTML per user
// Performance: Slower, but personalized

// ===== When to Use Dynamic =====

// ✅ Use Dynamic when:
// - Content changes per request
// - Depends on user/cookies
// - Real-time data needed
// - Personalization required
// - No way to pre-generate

// ❌ Avoid Dynamic when:
// - Can be static (cache on CDN)
// - Content rarely changes
// - Same for all users
// - Performance critical
```
# Next.js Interview Preparation - Part 8: Data Fetching, Server Actions & Authentication

## 46. generateStaticParams

**Interview Answer:**

`generateStaticParams` is a function that tells Next.js which dynamic route segments to pre-render at build time. It returns an array of param objects corresponding to all possible values for that dynamic segment. This enables static rendering of dynamic routes by pre-generating HTML for each variant, combining the flexibility of dynamic routes with the performance of static rendering.

**Key Points to Mention:**
- Pre-generates dynamic routes at build time
- Returns array of param combinations
- Works with `[id]` and `[...slug]` routes
- Dramatically improves performance
- Combined with ISR for updates
- Called once at build time
- Essential for large product catalogs, blog posts

**Code Example:**

```typescript
// ===== Basic generateStaticParams =====

// app/blog/[slug]/page.tsx

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Called at build time to generate static params
export async function generateStaticParams() {
  // Fetch all blog posts
  const posts = await fetch('https://api.example.com/posts')
    .then(r => r.json());

  // Return array of possible param values
  // Each object represents one page to pre-render
  return posts.map((post: any) => ({
    slug: post.slug, // Must match the dynamic segment name [slug]
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await fetch(
    `https://api.example.com/posts/${params.slug}`
  ).then(r => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Build time:
// 1. generateStaticParams() runs
// 2. Gets posts: ['first-post', 'second-post', 'third-post']
// 3. Returns: [{ slug: 'first-post' }, { slug: 'second-post' }, { slug: 'third-post' }]
// 4. Pre-renders: /blog/first-post.html, /blog/second-post.html, /blog/third-post.html
// 5. Stores in CDN

// Request time:
// User visits /blog/first-post
// Serves: pre-rendered HTML instantly from cache

// ===== Multiple Dynamic Segments =====

// app/products/[category]/[id]/page.tsx

interface ProductPageProps {
  params: {
    category: string;
    id: string;
  };
}

export async function generateStaticParams() {
  // Fetch products
  const products = await fetch('https://api.example.com/products')
    .then(r => r.json());

  // Return all combinations of category + id
  return products.map((product: any) => ({
    category: product.category,
    id: product.id,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetch(
    `https://api.example.com/products/${params.category}/${params.id}`
  ).then(r => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-xl font-bold">${product.price}</p>
    </div>
  );
}

// Build time: Generates combinations
// /products/electronics/1
// /products/electronics/2
// /products/clothing/1
// /products/clothing/2
// etc.

// ===== Catch-all Routes with generateStaticParams =====

// app/docs/[...slug]/page.tsx

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  // Generate all documentation paths
  const docs = [
    { slug: ['getting-started'] },
    { slug: ['api', 'overview'] },
    { slug: ['api', 'methods', 'get'] },
    { slug: ['api', 'methods', 'post'] },
    { slug: ['guides', 'authentication'] },
    { slug: ['guides', 'deployment'] },
  ];

  return docs;
}

export default async function DocPage({ params }: DocPageProps) {
  const path = params.slug.join('/');

  return (
    <div>
      <h1>Documentation: {path}</h1>
      <p>Content for {path}</p>
    </div>
  );
}

// Pre-renders:
// /docs/getting-started
// /docs/api/overview
// /docs/api/methods/get
// /docs/api/methods/post
// etc.

// ===== Dynamic generateStaticParams =====

// Handles cases where you can't fetch all possible values upfront

export async function generateStaticParams() {
  // Fetch a subset (e.g., top 100 products)
  const topProducts = await fetch(
    'https://api.example.com/products?top=100'
  ).then(r => r.json());

  return topProducts.map((product: any) => ({
    id: product.id,
  }));
}

// With dynamicParams:
export const dynamicParams = true; // Allow fallback to dynamic

// Build: Pre-renders top 100 products
// Request: If user visits non-pre-rendered product
//   → Uses dynamic rendering as fallback
//   → Not pre-rendered, but still works

// ===== With ISR (Incremental Static Regeneration) =====

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Only generate most popular posts at build
  return await fetch('https://api.example.com/posts?popular=true')
    .then(r => r.json())
    .then(posts => posts.map((p: any) => ({ slug: p.slug })));
}

export default async function Post({ params }: { params: { slug: string } }) {
  return <article>Blog post</article>;
}

// Build: Pre-renders popular posts
// Each hour: Regenerates in background
// On demand: If new post created, user sees it within 1 hour max
```

---

## 47. dynamicParams

**Interview Answer:**

`dynamicParams` controls whether a dynamic route can generate pages for param values not in `generateStaticParams`. When `true` (default), Next.js generates pages on-demand for new param values. When `false`, only pre-generated params work; others return 404. This provides fallback behavior for dynamic routes.

**Key Points to Mention:**
- Controls fallback behavior for dynamic routes
- `true` = generate on-demand (default)
- `false` = only pre-generated params work
- Useful with ISR
- Balances performance with flexibility
- Prevents unexpected pages

**Code Example:**

```typescript
// ===== dynamicParams = true (Default) =====

// app/products/[id]/page.tsx

export const dynamicParams = true; // Or omit, it's default

export async function generateStaticParams() {
  // Pre-render only top 10 products
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    // ... only top 10
  ];
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(
    `https://api.example.com/products/${params.id}`
  ).then(r => r.json());

  return <div>{product.name}</div>;
}

// Build: Pre-renders /products/1, /products/2, /products/3, etc.
// Request /products/1: Serves pre-rendered HTML instantly
// Request /products/999 (not pre-rendered):
//   → Generates on-demand
//   → Takes time but works
//   → Subsequent requests are cached

// Behavior:
// Pre-rendered IDs: Instant response (static)
// Non-pre-rendered IDs: Dynamic generation on first request, then cached

// ===== dynamicParams = false =====

export const dynamicParams = false;

export async function generateStaticParams() {
  // Only these will work
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(
    `https://api.example.com/products/${params.id}`
  ).then(r => r.json());

  return <div>{product.name}</div>;
}

// Build: Pre-renders only /products/1, /products/2, /products/3
// Request /products/1: Works instantly (pre-rendered)
// Request /products/2: Works instantly (pre-rendered)
// Request /products/3: Works instantly (pre-rendered)
// Request /products/999: Returns 404 (not pre-rendered and no fallback)

// Useful when:
// ✅ Only specific paths should exist
// ✅ Products indexed by specific IDs
// ✅ Want to prevent random page generation
// ❌ Blocks legitimate requests not pre-generated

// ===== Real-World Example: Blog with dynamicParams =====

export const dynamicParams = true;
export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  // Pre-render published posts only
  const publishedPosts = await fetch(
    'https://api.example.com/posts?status=published'
  ).then(r => r.json());

  return publishedPosts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await fetch(
    `https://api.example.com/posts/${params.slug}`
  ).then(r => r.json());

  if (!post) {
    return notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Build: Pre-renders all published posts
// User visits published post: Instant (pre-rendered)
// User visits draft post: Generated on-demand (with dynamicParams: true)
// If draft later published: Within 1 hour (revalidate: 3600)
// New draft visits: Works dynamically with dynamicParams: true
```

---

## 48. Streaming

**Interview Answer:**

Streaming in Next.js sends HTML to the browser in chunks as it's generated, rather than waiting for all content. This improves perceived performance - users see content progressively appear. Streaming works with Server Components and Suspense, allowing you to show Suspense fallbacks while server components load. Modern browsers support incremental HTML rendering.

**Key Points to Mention:**
- Progressive HTML delivery
- Works with Suspense boundaries
- Improves perceived performance
- Shows content while loading
- Reduces Time to First Byte
- Progressive enhancement
- Works with async components

**Code Example:**

```typescript
// ===== Streaming with Suspense =====

// app/dashboard/page.tsx

import { Suspense } from 'react';

// Simulate slow loading
async function SlowWidget() {
  await new Promise(r => setTimeout(r, 3000));
  return <div className="bg-blue-100 p-4">Slow Widget Loaded</div>;
}

function LoadingFallback() {
  return <div className="bg-gray-300 animate-pulse p-4 h-20"></div>;
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4">
      {/* This content streams first */}
      <h1>Dashboard</h1>
      <p>This is the header content</p>

      {/* Streaming in action */}
      <Suspense fallback={<LoadingFallback />}>
        <SlowWidget />
      </Suspense>

      {/* This footer also streams quickly */}
      <footer className="bg-green-100 p-4">Footer</footer>
    </div>
  );
}

// Streaming flow:
// ~0ms: Server starts rendering
// ~50ms: Browser receives header HTML + skeleton
//        User sees: "Dashboard" + loading skeleton + footer
// ~3000ms: SlowWidget finishes loading
//          Browser receives SlowWidget HTML
//          Browser replaces skeleton with actual widget
//          User sees complete page

// Without streaming (waiting for all):
// ~3000ms: Browser gets everything at once
//          User sees nothing until fully ready
//          Bad perceived performance

// ===== Multiple Streaming Boundaries =====

async function Header() {
  await new Promise(r => setTimeout(r, 500));
  return <header className="bg-blue-500 text-white p-4">Header</header>;
}

async function Sidebar() {
  await new Promise(r => setTimeout(r, 1500));
  return <aside className="bg-gray-200 p-4">Sidebar</aside>;
}

async function MainContent() {
  await new Promise(r => setTimeout(r, 2000));
  return <main className="flex-1 p-4">Main Content</main>;
}

export default function LayoutPage() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>

      <div className="flex">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>

        <Suspense fallback={<div>Loading content...</div>}>
          <MainContent />
        </Suspense>
      </div>
    </div>
  );
}

// Streaming timeline:
// ~500ms: Header appears
// ~1500ms: Sidebar appears
// ~2000ms: Main content appears
// User sees progressive loading, not blocked by slowest part

// ===== Streaming API Response =====

// app/api/stream/route.ts

import { ReadableStream } from 'stream';

export async function GET() {
  // Create streaming response
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial HTML
        controller.enqueue(`<!DOCTYPE html>
<html>
<head>
  <title>Streaming Demo</title>
  <style>body { font-family: Arial; }</style>
</head>
<body>
`);

        // Send header
        controller.enqueue('<header><h1>Streaming Page</h1></header>');
        controller.enqueue('<main>');

        // Send content chunks
        for (let i = 1; i <= 5; i++) {
          // Wait between chunks
          await new Promise(r => setTimeout(r, 1000));

          controller.enqueue(`
<section>
  <h2>Section ${i}</h2>
  <p>This section loaded at ${new Date().toLocaleTimeString()}</p>
</section>
`);
        }

        // Send closing HTML
        controller.enqueue('</main></body></html>');
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}

// Browser receives chunks progressively:
// ~0ms: HTML skeleton
// ~1000ms: Section 1 inserted
// ~2000ms: Section 2 inserted
// ~3000ms: Section 3 inserted
// etc.

// ===== Streaming with Server Components =====

// app/posts/page.tsx

import { Suspense } from 'react';

async function PostList() {
  // This async component will stream its content
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <article key={post.id} className="border p-4">
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

function PostListLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="border p-4 animate-pulse bg-gray-200 h-24"></div>
      ))}
    </div>
  );
}

export default function PostsPage() {
  return (
    <div className="p-6">
      <h1>All Posts</h1>

      {/* Streaming happens here */}
      <Suspense fallback={<PostListLoading />}>
        <PostList />
      </Suspense>
    </div>
  );
}

// Streaming benefits:
// ✅ Page title appears first (SEO)
// ✅ User sees layout immediately
// ✅ Content fills in progressively
// ✅ Better perceived performance
// ✅ User interaction possible while loading
```

---

## 49. Server and Client Composition Patterns

**Interview Answer:**

Composition Patterns describe how to structure and combine Server and Client Components effectively. Key patterns include moving `'use client'` down the tree to only interactive components, wrapping Client Components with Server Components for data, and using children prop to inject interactive parts. Proper composition optimizes bundle size, security, and performance.

**Key Points to Mention:**
- Keep `'use client'` at leaves of tree
- Server wraps Client for data
- Use children prop for composition
- Avoid wrapping entire app as Client
- Pass data down as props
- Composition over Context
- Performance and security considerations

**Code Example:**

```typescript
// ===== Pattern 1: Server Wraps Client =====

// app/dashboard/page.tsx (Server)
async function getDashboardData() {
  return await fetch('https://api.example.com/dashboard')
    .then(r => r.json());
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  // Server fetches data
  // Server passes to Client Component as prop
  return <DashboardClient data={data} />;
}

// app/dashboard/DashboardClient.tsx (Client)
'use client';

import { useState } from 'react';

export function DashboardClient({ data }: { data: any }) {
  const [filter, setFilter] = useState('all');

  // Client handles interactivity
  const filtered = data.filter((item: any) =>
    filter === 'all' || item.category === filter
  );

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {filtered.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Pattern:
// Server              Client
// fetch data    ──→  receive as prop
// render                       ↓
// pass to client ──→  handle interaction
//
// Result: Small bundle, secure, interactive

// ===== Pattern 2: Using Children Prop =====

// app/layout.tsx (Server)
import { Providers } from './Providers';

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        {/* Providers is Client, but receives children (Server Components) */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// app/Providers.tsx (Client)
'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/theme';

export function Providers({ children }: { children: ReactNode }) {
  // Client setup (Context, Providers, etc)
  return (
    <ThemeProvider>
      {children}
      {/* Children are Server Components that get wrapped */}
    </ThemeProvider>
  );
}

// Pattern:
// Server sends children to Client
// Client wraps children with Providers
// All children remain Server Components
// Children execute on server, rendered to HTML

// Result: Minimal Client Component, most code on server

// ===== Pattern 3: Keeping Client Components at Leaves =====

// ❌ WRONG: Client Component wraps everything
'use client';

export default function Page() {
  // Entire page is Client Component
  // All Server Component code moved here
  // Large bundle
  return (
    <div>
      {/* All children become Client Components */}
    </div>
  );
}

// ✅ RIGHT: Client Component only for interaction
// app/page.tsx (Server)
export default function Page() {
  // Fetch on server
  const data = await fetch('...');

  return (
    <div>
      {/* Most of page is Server Component */}
      <Content>{data}</Content>

      {/* Only interactive part is Client */}
      <InteractiveWidget />
    </div>
  );
}

// app/InteractiveWidget.tsx (Client)
'use client';

export function InteractiveWidget() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}

// Pattern:
// Server Component (large)
//   │
//   ├── Static Content
//   ├── Server Data
//   │
//   └── Client Component (small)
//       └── Interactive Part

// Result: Small Client bundle, most code on server

// ===== Pattern 4: Avoiding Unnecessary Context =====

// ❌ WRONG: Using Context for everything
'use client';

const AppContext = createContext();

export function App({ children }: any) {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  return (
    <AppContext.Provider value={{ theme, user, notifications }}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ RIGHT: Pass data as props from Server
// app/layout.tsx (Server)
async function getUser() {
  return await fetch('...').then(r => r.json());
}

export default async function Layout({ children }: any) {
  const user = await getUser();

  return (
    <html>
      <body>
        <Header user={user} /> {/* Pass as prop */}
        {children}
      </body>
    </html>
  );
}

// Pattern:
// Server fetches user
// Server passes to Server Component (Header)
// Header passes to Client Component if needed
// No Context needed

// Result: No Context overhead, cleaner code

// ===== Pattern 5: Composition with Slots =====

// app/dashboard/layout.tsx (Server)
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

export default async function DashboardLayout({ children }: any) {
  const user = await getUser();
  const menu = await getMenu();

  return (
    <div className="flex">
      {/* Pass server data to interactive components */}
      <DashboardSidebar menu={menu} />

      <main>
        <DashboardHeader user={user} />
        {children}
      </main>
    </div>
  );
}

// app/dashboard/DashboardSidebar.tsx (Client)
'use client';

export function DashboardSidebar({ menu }: { menu: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={expanded ? 'expanded' : 'collapsed'}>
      {menu.map(item => (
        <a key={item.id} href={item.href}>
          {item.label}
        </a>
      ))}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
    </aside>
  );
}

// Pattern: Slots receive server data, add interactivity
```

---

## 50. Server-only Code

**Interview Answer:**

Server-only code is backend logic that should never reach the client - databases, private APIs, secrets. Next.js provides the `'server-only'` package to mark code for server execution, throwing errors if imported on client. This prevents accidental client-side exposure of sensitive code and helps catch mistakes during development or build time.

**Key Points to Mention:**
- Use `'server-only'` package
- Prevents client import errors
- Marks database and secret code
- Build-time error checking
- Better security posture
- Clear intent in codebase

**Code Example:**

```typescript
// ===== Using 'server-only' Package =====

// npm install server-only

// lib/database.ts
import 'server-only'; // Marks as server-only

// Any import of this file on client will throw error
export async function queryDatabase(sql: string) {
  const connection = await Database.connect({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD, // Secrets!
  });

  return connection.query(sql);
}

// lib/auth.ts
import 'server-only';

// Server-only authentication logic
export async function getCurrentUser() {
  const session = getSession(); // Only works on server
  return session.user;
}

export async function verifyToken(token: string) {
  return await jwt.verify(token, process.env.JWT_SECRET); // Secret!
}

// ===== Attempting to Use Server-Only Code on Client =====

// app/user/page.tsx (Server Component - OK)
import { queryDatabase } from '@/lib/database';

export default async function Page() {
  // This is fine - server-only code in server context
  const user = await queryDatabase('SELECT * FROM users');
  return <div>{user.name}</div>;
}

// app/UserProfile.tsx (Client Component - ERROR)
'use client';

import { queryDatabase } from '@/lib/database';
// ❌ ERROR: Cannot use server-only module on client!
// Even importing causes build error

export function UserProfile() {
  // Would never reach here - error thrown at import
  return <div>Profile</div>;
}

// ===== Real-World Example: Auth Utilities =====

// lib/auth.server.ts (or with 'server-only')
import 'server-only';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}

export async function getServerSession() {
  // Only runs on server
  const token = cookies().get('auth')?.value;
  if (!token) return null;
  return verifyAuth(token);
}

// app/page.tsx (Server Component)
import { getServerSession } from '@/lib/auth.server';

export default async function Page() {
  const session = await getServerSession();
  // Server-only code can be imported here
  return <div>User: {session?.user?.name}</div>;
}

// app/components/UserCard.tsx (Client Component)
'use client';

// import { getServerSession } from '@/lib/auth.server';
// ❌ Would throw error if uncommented!

// Instead, pass data from server:
interface UserCardProps {
  userName: string; // Passed from server
}

export function UserCard({ userName }: UserCardProps) {
  return <div>User: {userName}</div>;
}

// app/page.tsx passes data correctly
export default async function Page() {
  const session = await getServerSession();
  return <UserCard userName={session?.user?.name} />;
}

// ===== Preventing Accidental Exposure =====

// lib/secrets.ts
import 'server-only';

export const DATABASE_URL = process.env.DATABASE_URL;
export const API_KEY = process.env.API_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;

// Prevents this from working:
// 'use client';
// import { API_KEY } from '@/lib/secrets';
// fetch('...', { headers: { 'X-API-Key': API_KEY } })
// ❌ Build error - can't import server-only module

// ===== Comparison: With vs Without 'server-only' =====

// WITHOUT 'server-only' (vulnerable)
// lib/database.ts
export async function queryDatabase(sql: string) {
  return await db.query(sql);
}

// app/component.tsx
'use client';

import { queryDatabase } from '@/lib/database';

// This would compile and attempt to run on client
// Exposing database credentials and queries!

// WITH 'server-only' (safe)
// lib/database.ts
import 'server-only';

export async function queryDatabase(sql: string) {
  return await db.query(sql);
}

// app/component.tsx
'use client';

import { queryDatabase } from '@/lib/database';
// ❌ Immediate build error caught at compile time!

// ===== Best Practices =====

// Structure:
// app/
//   lib/
//     server-only/
//       database.ts        (import 'server-only')
//       auth.ts            (import 'server-only')
//       email.ts           (import 'server-only')
//     client/
//       utils.ts           (safe on client)
//       hooks.ts           (client hooks)
//     shared/
//       types.ts           (types only, safe anywhere)

// Always mark sensitive utilities:
import 'server-only';

export { queryDatabase, sendEmail, verifyPayment };
```

# Next.js Interview Preparation - Part 9: Server Actions, Clerk Auth & Deployment

## 51. Data Fetching in Server Components

**Interview Answer:**

Server Components can directly fetch data from APIs and databases using async/await. This is the recommended approach in Next.js as it keeps data fetching logic on the server, reduces client-side bundle size, improves security, and enables better caching. Fetching in Server Components eliminates waterfalls and allows parallel data fetching naturally.

**Key Points to Mention:**
- Async functions in Server Components
- Direct database access without API layer
- Automatic caching with fetch options
- No N+1 query problems
- Security - no credentials exposed
- Enables ISR and streaming
- Better SEO and performance

**Code Example:**

```typescript
// ===== Basic Data Fetching in Server Component =====

// app/posts/page.tsx

async function getPosts() {
  // This runs on server ONLY
  // Database credentials never reach client
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // Cache indefinitely
  });

  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="p-6">
      <h1>All Posts</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: any) => (
          <article key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// ===== Direct Database Access =====

// lib/database.ts
import 'server-only';
import { db } from '@/lib/db';

export async function getUserById(id: string) {
  // Query database directly from server
  const user = await db.users.findUnique({
    where: { id },
  });
  return user;
}

// app/profile/page.tsx
import { getUserById } from '@/lib/database';

export default async function ProfilePage({ params }: any) {
  const user = await getUserById(params.userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ===== Parallel Data Fetching =====

async function getUser(id: string) {
  return fetch(`/api/users/${id}`).then(r => r.json());
}

async function getPosts(userId: string) {
  return fetch(`/api/users/${userId}/posts`).then(r => r.json());
}

async function getComments(userId: string) {
  return fetch(`/api/users/${userId}/comments`).then(r => r.json());
}

export default async function UserDashboard({ params }: any) {
  // These run in PARALLEL (not sequential)
  const [user, posts, comments] = await Promise.all([
    getUser(params.userId),
    getPosts(params.userId),
    getComments(params.userId),
  ]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Posts: {posts.length}</p>
      <p>Comments: {comments.length}</p>
    </div>
  );
}

// Without Promise.all (WRONG):
// const user = await getUser(); // ~300ms
// const posts = await getPosts(); // ~300ms (waits for user first)
// const comments = await getComments(); // ~300ms (waits for posts)
// Total: ~900ms

// With Promise.all (RIGHT):
// All three fetch simultaneously
// Total: ~300ms

// ===== Sequential Data Fetching (When Needed) =====

export default async function PostWithComments({ params }: any) {
  // Step 1: Get post
  const post = await fetch(`/api/posts/${params.id}`)
    .then(r => r.json());

  // Step 2: Get comments for THIS post (depends on step 1)
  const comments = await fetch(`/api/posts/${post.id}/comments`)
    .then(r => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <section>
        <h2>Comments ({comments.length})</h2>
        {comments.map((c: any) => (
          <div key={c.id} className="border p-2">{c.text}</div>
        ))}
      </section>
    </article>
  );
}

// Sequential is necessary here because comments depend on post.id
// But use parallel when possible for performance

// ===== Caching Strategies =====

// Cache indefinitely (good for static content)
fetch(url, { cache: 'force-cache' });

// Revalidate every 60 seconds (ISR)
fetch(url, { next: { revalidate: 60 } });

// Never cache (always fresh)
fetch(url, { cache: 'no-store' });

// Default behavior (30 seconds for data)
fetch(url);

// ===== Error Handling =====

async function getPostSafe(id: string) {
  try {
    const res = await fetch(`/api/posts/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error; // Error boundary will catch
  }
}

// ===== With Suspense and Error Boundaries =====

import { Suspense } from 'react';

async function PostContent({ id }: { id: string }) {
  const post = await fetch(`/api/posts/${id}`).then(r => r.json());
  return <div>{post.content}</div>;
}

async function PostComments({ id }: { id: string }) {
  const comments = await fetch(`/api/posts/${id}/comments`)
    .then(r => r.json());
  return comments.map((c: any) => <div key={c.id}>{c.text}</div>);
}

export default function PostPage({ params }: any) {
  return (
    <div>
      <h1>Post {params.id}</h1>

      {/* Content loads independently */}
      <Suspense fallback={<div>Loading content...</div>}>
        <PostContent id={params.id} />
      </Suspense>

      {/* Comments load independently */}
      <Suspense fallback={<div>Loading comments...</div>}>
        <PostComments id={params.id} />
      </Suspense>
    </div>
  );
}
```

---

## 52. Server Actions

**Interview Answer:**

Server Actions are functions that run on the server and can be called from Client Components. They handle mutations (POST, PUT, DELETE) and form submissions securely. Server Actions automatically handle serialization, security with CSRF tokens, and type safety. They eliminate the need for API routes for simple mutations while providing better developer experience with direct server function calls from the client.

**Key Points to Mention:**
- Functions marked with `'use server'`
- Called from Client Components
- Handle form submissions and mutations
- Automatic CSRF protection
- Type-safe (TypeScript)
- No API route boilerplate
- Can directly access databases
- Return data back to client

**Code Example:**

```typescript
// ===== Basic Server Action =====

// app/actions.ts
'use server'; // Mark entire file as server actions

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Database operation on server
  const post = await db.posts.create({
    data: { title, content },
  });

  return { success: true, post };
}

// app/posts/CreatePostForm.tsx
'use client';

import { createPost } from '@/app/actions';
import { useFormStatus } from 'react-dom';

export function CreatePostForm() {
  return (
    <form action={createPost}>
      <input type="text" name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}

// Usage:
// 1. User fills form and clicks submit
// 2. Form data sent to server
// 3. createPost() runs on server
// 4. Database updated
// 5. Result sent back to client

// ===== Server Action with Type Safety =====

// app/actions.ts
'use server';

interface CreatePostInput {
  title: string;
  content: string;
  published: boolean;
}

export async function createPost(input: CreatePostInput) {
  // Validate input
  if (!input.title || input.title.length < 3) {
    throw new Error('Title must be at least 3 characters');
  }

  // Create post
  const post = await db.posts.create({
    data: input,
  });

  return post;
}

// app/posts/NewPostForm.tsx
'use client';

import { createPost } from '@/app/actions';
import { useState } from 'react';

export function NewPostForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const post = await createPost({
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        published: formData.get('published') === 'on',
      });

      console.log('Post created:', post);
      // Type-safe! TypeScript knows post structure
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      <label>
        <input type="checkbox" name="published" />
        Publish now
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}

// ===== Server Actions for Mutations =====

// app/actions.ts
'use server';

export async function updatePost(id: string, data: any) {
  const post = await db.posts.update({
    where: { id },
    data,
  });
  return post;
}

export async function deletePost(id: string) {
  await db.posts.delete({ where: { id } });
  return { success: true };
}

export async function likePost(postId: string) {
  const post = await db.posts.findUnique({ where: { id: postId } });
  await db.posts.update({
    where: { id: postId },
    data: { likes: post.likes + 1 },
  });
  return { likes: post.likes + 1 };
}

// app/components/PostCard.tsx
'use client';

import { deletePost, updatePost, likePost } from '@/app/actions';

export function PostCard({ post }: any) {
  async function handleDelete() {
    await deletePost(post.id);
    // Revalidate page or update UI
  }

  async function handleLike() {
    const result = await likePost(post.id);
    // Update like count
  }

  return (
    <div className="border p-4">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div className="space-x-2">
        <button onClick={handleLike}>
          👍 {post.likes}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

// ===== Revalidating After Server Action =====

// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  const post = await db.posts.create({
    data: { title },
  });

  // Revalidate the posts page to show new post
  revalidatePath('/posts');

  return post;
}

// Or redirect after action:
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const post = await db.posts.create({
    data: { title: formData.get('title') as string },
  });

  redirect(`/posts/${post.id}`);
}

// ===== Server Action with Clerk Authentication =====

// app/actions.ts
'use server';

import { auth } from '@clerk/nextjs';

export async function createPost(formData: FormData) {
  // Get authenticated user
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const post = await db.posts.create({
    data: {
      title: formData.get('title') as string,
      userId, // Associate with user
    },
  });

  revalidatePath('/posts');
  return post;
}

// ===== Progressive Form Submission =====

'use client';

import { createPost } from '@/app/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Post'}
    </button>
  );
}

export function PostForm() {
  return (
    <form action={createPost}>
      <input type="text" name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <SubmitButton />
    </form>
  );
}
```

---

## 53. Clerk Authentication Setup

**Interview Answer:**

Clerk is a modern authentication platform providing sign-in, sign-up, and user management. Next.js integration involves installing Clerk SDK, setting environment variables, wrapping the app with `<ClerkProvider>`, and using middleware to protect routes. Clerk handles security, session management, and provides pre-built UI components. It's production-ready and requires minimal setup compared to building auth from scratch.

**Key Points to Mention:**
- Clerk SDK integration
- Environment variables setup
- `<ClerkProvider>` wrapper
- Middleware for route protection
- Pre-built UI components
- Session management
- Type-safe authentication
- Easy sign-in/sign-up flows

**Code Example:**

```typescript
// ===== 1. Installation and Setup =====

// npm install @clerk/nextjs

// .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

// ===== 2. Wrap App with ClerkProvider =====

// app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

// ===== 3. Protect Routes with Middleware =====

// middleware.ts (at root level)

import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Routes that require authentication
  protectedRoutes: ['/dashboard', '/settings', '/api/protected'],
  
  // Routes that are public (don't require auth)
  publicRoutes: ['/', '/sign-in', '/sign-up', '/about'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

// ===== 4. Access Current User =====

// app/page.tsx

import { currentUser } from '@clerk/nextjs';

export default async function HomePage() {
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.firstName}!</h1>
      ) : (
        <h1>Welcome to our app</h1>
      )}
    </div>
  );
}

// ===== 5. Client-Side User Access =====

// app/components/UserProfile.tsx

'use client';

import { useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) return <div>Sign in to continue</div>;

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}

// ===== 6. Sign-In Component =====

// app/sign-in/page.tsx

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  );
}

// ===== 7. Sign-Out =====

// app/components/SignOutButton.tsx

'use client';

import { useClerk } from '@clerk/nextjs';

export function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}

// ===== 8. Protected API Route with Clerk =====

// app/api/user/profile/route.ts

import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress,
    name: `${user.firstName} ${user.lastName}`,
  });
}

// ===== 9. Conditional UI Based on Auth =====

// app/components/Navigation.tsx

import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { SignOutButton } from './SignOutButton';

export async function Navigation() {
  const user = await currentUser();

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/">Logo</Link>

      <div>
        {user ? (
          <>
            <span>{user.firstName}</span>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// ===== 10. Protecting a Page =====

// app/dashboard/page.tsx

import { currentUser, redirectToSignIn } from '@clerk/nextjs';

export default async function DashboardPage() {
  const user = await currentUser();

  // Redirect to sign-in if not authenticated
  if (!user) {
    return redirectToSignIn();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Only {user.firstName} can see this</p>
    </div>
  );
}

// ===== 11. User Metadata =====

'use client';

import { useUser } from '@clerk/nextjs';

export function UserMetadata() {
  const { user } = useUser();

  // Access user metadata
  const preferences = user?.publicMetadata?.preferences || {};
  const role = user?.publicMetadata?.role || 'user';

  return (
    <div>
      <p>Role: {role}</p>
      <p>Theme: {preferences.theme}</p>
    </div>
  );
}

// ===== 12. Organization Support =====

// For multi-tenancy with Clerk

import { currentUser } from '@clerk/nextjs';

export async function getOrgContext() {
  const user = await currentUser();
  const activeOrgId = user?.organizationId;

  return { user, activeOrgId };
}
```

---

## 54. Deploying Next.js Apps

**Interview Answer:**

Next.js apps deploy to various platforms with automatic optimization. Vercel is the official platform with zero-config deployment and best Next.js support. Other options include Docker, traditional Node servers, static hosting, and edge networks. Deployment considerations include environment variables, database connections, file storage, caching headers, and monitoring. Modern deployments leverage Edge Functions for faster execution and better performance at scale.

**Key Points to Mention:**
- Vercel (official, recommended)
- Docker containerization
- Node.js servers
- Static export option
- Environment variables
- Build optimization
- Database and storage setup
- Edge Functions
- Monitoring and logging

**Code Example:**

```typescript
// ===== 1. Vercel Deployment (Easiest) =====

// Simply push to GitHub
// Vercel auto-detects Next.js
// Zero configuration needed
// Auto-deploys on push

// vercel.json (optional configuration)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}

// ===== 2. Environment Variables Setup =====

// .env.local (development)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="dev-secret-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"

// .env.production (production)
DATABASE_URL="postgresql://user:password@prod-host:5432/mydb"
JWT_SECRET="very-long-production-secret-key"
NEXT_PUBLIC_API_URL="https://myapp.com"

// app/config.ts
export const config = {
  database: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};

// ===== 3. Docker Deployment =====

// Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app
COPY . .

# Build app
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]

// .dockerignore
node_modules
.next
.git
.gitignore
README.md
.env*

// docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/mydb
      NODE_ENV: production
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

// ===== 4. Node.js Server Deployment =====

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production settings
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

// npm run build (builds optimized app)
// npm start (starts production server on port 3000)

// Or use PM2 for process management:
// pm2 start npm --name "nextjs" -- start
// pm2 save
// pm2 startup

// ===== 5. Static Export (For Static Hosting) =====

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export
};

module.exports = nextConfig;

// npm run build
// Generates .next/standalone directory
// Deploy to: GitHub Pages, Netlify, S3, CloudFront, etc.

// Limitations with static export:
// ❌ No API routes
// ❌ No getServerSideProps
// ❌ No ISR
// ❌ No middleware

// ===== 6. Build Optimization =====

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // SWC minification
  swcMinify: true,

  // Production logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Rewrites and redirects
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://api.example.com/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;

// ===== 7. Database Connection Pooling =====

// lib/db.ts
import 'server-only';
import { Pool } from 'pg';

// Use connection pooling for production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function query(text: string, params?: any[]) {
  const result = await pool.query(text, params);
  return result.rows;
}

// ===== 8. Monitoring and Logging =====

// lib/logger.ts
import 'server-only';

export function logError(error: Error, context: string) {
  console.error(`[${context}] ${error.message}`, error.stack);

  // Send to monitoring service
  if (process.env.SENTRY_DSN) {
    // Sentry.captureException(error);
  }
}

export function logInfo(message: string, data?: any) {
  console.log(`[${new Date().toISOString()}] ${message}`, data);
}

// ===== 9. Cache Headers =====

// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/public')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Cache API responses
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'public, max-age=300');
  }

  return response;
}

// ===== 10. Security Headers =====

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'",
        },
      ],
    },
  ],
};

module.exports = nextConfig;

// ===== 11. Analytics Integration =====

// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        {children}
        <Analytics /> {/* Track page views and performance */}
      </body>
    </html>
  );
}

// ===== 12. Deployment Checklist =====

// ✅ Environment variables configured
// ✅ Database migrations run
// ✅ Build command successful
// ✅ No console errors or warnings
// ✅ Security headers set
// ✅ HTTPS enabled
// ✅ Monitoring configured
// ✅ Error tracking setup
// ✅ Database backups configured
// ✅ Performance optimized
// ✅ CDN configured for static assets
```

This comprehensive guide now covers all 54 essential Next.js concepts with production-ready examples and interview-style explanations.












