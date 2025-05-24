"use client"; // This page uses client-side hooks for form submission

import { useRouter } from 'next/navigation';
import { BlogPostForm, BlogPostData } from '@/components/blog-post-form';
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useState } from 'react';

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BlogPostData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/posts', { // We'll create this POST endpoint next
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      // Invalidate cache or re-fetch posts on the editor page if needed,
      // or simply redirect. For now, redirecting.
      router.push('/admin/blog-editor'); 
      router.refresh(); // Recommended to refresh server components after mutation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during submission.');
      setIsSubmitting(false); // Ensure button is re-enabled on error
    }
    // No need to setIsSubmitting(false) on success because of navigation
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-12">
        <div className="mb-8">
          <h1 className="font-space-grotesk text-3xl font-bold">Create New Blog Post</h1>
        </div>
        {error && <p className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <BlogPostForm onSubmit={handleSubmit} isEditing={false} />
      </main>
      <SiteFooter />
    </div>
  );
}
