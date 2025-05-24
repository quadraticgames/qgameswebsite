import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog-card";

// Define the expected structure of a blog post (can be moved to a shared types file later)
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  content?: string; // Matching the API
  // Add any other fields that BlogCard might expect, e.g., index if it's still used
}

async function getPosts(): Promise<BlogPost[]> {
  // In a server component, you can use a relative path for fetch
  // For client components, you'd need the full URL (e.g., http://localhost:3000/api/posts)
  // or set up an environment variable for the base URL.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/posts`, { cache: 'no-store' }); // 'no-store' to ensure fresh data

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch blog posts');
  }
 
  return res.json();
}

export default async function BlogPage() {
  const allPosts = await getPosts();

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-20">
        <div className="mb-12 text-center">
          <h1 className="font-space-grotesk text-4xl font-bold tracking-tight md:text-5xl">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on web development
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readingTime={post.readingTime}
              category={post.category}
              slug={post.slug}
              index={index} // Assuming BlogCard still uses index for some reason, otherwise it can be removed
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
