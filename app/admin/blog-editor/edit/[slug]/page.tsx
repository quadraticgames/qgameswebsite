"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogPostForm, BlogPostData } from '@/components/blog-post-form';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string; // Type assertion

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
          // API endpoint to fetch a single post by slug (we'll create this)
          const response = await fetch(`/api/posts/${slug}`, { cache: 'no-store' }); 
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch post: ${slug}`);
          }
          const data: BlogPostData = await response.json();
          setPost(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load post data.');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug]);

  const handleSubmit = async (data: BlogPostData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // API endpoint to update a post (we'll create this PUT endpoint)
      const response = await fetch(`/api/posts/${slug}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }
      router.push('/admin/blog-editor');
      router.refresh(); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="relative min-h-screen bg-background flex items-center justify-center">
        <p>Loading post data...</p>
    </div>
  );
  if (error && !post) return ( // Show error prominently if post data couldn't be loaded
    <div className="relative min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto py-12">
            <p className="rounded-md bg-destructive/10 p-3 text-center text-destructive">Error loading post: {error}</p>
        </main>
        <SiteFooter />
    </div>
  );


  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-12">
        <div className="mb-8">
          <h1 className="font-space-grotesk text-3xl font-bold">Edit Blog Post</h1>
          {post?.title && <p className="text-muted-foreground">Editing: {post.title}</p>}
        </div>
        {error && <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        {post ? (
          <BlogPostForm onSubmit={handleSubmit} initialData={post} isEditing={true} />
        ) : (
          // This case should ideally be covered by the error check above, but as a fallback:
          <p>Post data could not be loaded.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
