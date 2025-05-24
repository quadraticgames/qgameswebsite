import Link from 'next/link';
import { SiteHeader } from "@/components/site-header"; // Assuming you want the same header
import { SiteFooter } from "@/components/site-footer"; // Assuming you want the same footer

// Re-using the BlogPost interface (consider moving to a shared types file later)
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  content?: string;
}

async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/posts`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts for editor');
  }
  return res.json();
}

export default async function BlogEditorPage() {
  const posts = await getPosts();

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-space-grotesk text-3xl font-bold">Blog Post Editor</h1>
          <Link href="/admin/blog-editor/new" legacyBehavior>
            <a className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Create New Post
            </a>
          </Link>
        </div>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.slug} className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="space-x-2">
                  <Link href={`/admin/blog-editor/edit/${post.slug}`} legacyBehavior>
                     <a className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                       Edit
                     </a>
                  </Link>
                  {/* Delete button can be added later */}
                </div>
              </div>
            ))
          ) : (
            <p>No posts found. Create one!</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
