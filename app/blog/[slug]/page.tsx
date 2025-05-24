import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from 'next/navigation'; 

interface BlogPostData {
  title: string;
  excerpt?: string; 
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  content: string; 
}

async function getPost(slug: string): Promise<BlogPostData | null> {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      return null; 
    }
    console.error(`Failed to fetch post: ${slug}`, res.status, await res.text());
    throw new Error('Failed to fetch post data');
  }
  return res.json();
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) { 
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); 
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Button asChild variant="outline" className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4" />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {post.category}
                </Badge>
              </div>
            </header>

            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
