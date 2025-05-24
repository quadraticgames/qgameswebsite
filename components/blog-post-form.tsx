"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Using next/navigation for App Router

// Re-using the BlogPost interface (consider moving to a shared types file later)
// And adding a 'content' field, which will be the main body of the post.
export interface BlogPostData {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  content: string; // Main content for the blog post
}

interface BlogPostFormProps {
  onSubmit: (data: BlogPostData) => Promise<void>;
  initialData?: Partial<BlogPostData>; // Partial because slug might be auto-generated or fixed
  isEditing?: boolean;
}

export function BlogPostForm({ onSubmit, initialData = {}, isEditing = false }: BlogPostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPostData>({
    title: initialData.title || '',
    excerpt: initialData.excerpt || '',
    date: initialData.date || new Date().toISOString().split('T')[0], // Default to today
    readingTime: initialData.readingTime || '',
    category: initialData.category || '',
    slug: initialData.slug || '', // Slug might be auto-generated from title if not editing
    content: initialData.content || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If not editing, auto-generate slug from title (simple version)
    if (!isEditing && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, ''); // Remove non-word characters except hyphens
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isEditing]);
  
  // Update form data if initialData changes (e.g., when navigating to edit another post)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
        setFormData({
            title: initialData.title || '',
            excerpt: initialData.excerpt || '',
            date: initialData.date || new Date().toISOString().split('T')[0],
            readingTime: initialData.readingTime || '',
            category: initialData.category || '',
            slug: initialData.slug || '',
            content: initialData.content || '',
        });
    }
  }, [initialData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
      // On successful submission, you might want to redirect or show a success message.
      // For now, let's assume the onSubmit handler (or the page using this form) handles redirection.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-foreground">Slug</label>
        <input
          type="text"
          name="slug"
          id="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          disabled={isEditing} // Slug should not be changed when editing
          className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm disabled:bg-muted/50"
        />
        {!isEditing && <p className="mt-1 text-xs text-muted-foreground">Auto-generated from title. Can be manually adjusted.</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-foreground">Excerpt</label>
        <textarea
          name="excerpt"
          id="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-foreground">Content (Markdown supported)</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={handleChange}
          rows={10}
          required
          className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Write your blog post content here. You can use Markdown."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-foreground">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="readingTime" className="block text-sm font-medium text-foreground">Reading Time (mins)</label>
          <input
            type="number"
            name="readingTime"
            id="readingTime"
            value={formData.readingTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-input bg-background p-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
            type="button"
            onClick={() => router.back()} // Or router.push('/admin/blog-editor')
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
            Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Post')}
        </button>
      </div>
    </form>
  );
}
