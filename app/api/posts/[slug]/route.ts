import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';

export const dynamic = 'force-dynamic';

// Define the expected structure of a blog post
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  content: string;
}

const postsFilePath = path.join(process.cwd(), 'data', 'blog-posts.json');

// Helper function to calculate reading time
async function calculateReadingTime(markdownContent: string): Promise<string> {
  if (!markdownContent) {
    return "0";
  }
  // Parse markdown to HTML
  const html = await marked.parse(markdownContent);
  // Strip HTML tags to get plain text
  const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  // Count words
  const words = plainText.split(' ').filter(Boolean).length;
  // Average reading speed (words per minute)
  const wpm = 225;
  const minutes = Math.ceil(words / wpm);
  return minutes.toString();
}

async function readPosts(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(postsFilePath, 'utf-8');
    return JSON.parse(fileContent) as BlogPost[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Failed to read blog posts file:', error);
    throw new Error('Could not read blog posts data.');
  }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  try {
    await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write blog posts file:', error);
    throw new Error('Could not save blog posts data.');
  }
}

// GET handler for a single post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const posts = await readPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error(`GET /api/posts/${params.slug} - Error:`, error);
    return NextResponse.json({ message: (error instanceof Error ? error.message : 'Error fetching post') }, { status: 500 });
  }
}

// PUT handler for updating a post by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const updatedPostPayload: Partial<Omit<BlogPost, 'slug' | 'readingTime'>> & { content?: string; readingTime?: string; slug?:string } = await request.json();

    // Basic validation
    if (updatedPostPayload.slug && updatedPostPayload.slug !== slug) {
        return NextResponse.json({ message: 'Slug in payload does not match slug in URL. Slug cannot be changed.' }, { status: 400 });
    }

    let posts = await readPosts();
    const postIndex = posts.findIndex(p => p.slug === slug);

    if (postIndex === -1) {
      return NextResponse.json({ message: 'Post not found to update' }, { status: 404 });
    }

    const originalPost = posts[postIndex];
    let newReadingTime = originalPost.readingTime; // Default to original reading time

    // If content is being updated, recalculate reading time
    if (typeof updatedPostPayload.content === 'string') {
      newReadingTime = await calculateReadingTime(updatedPostPayload.content);
    }

    // Update the post: merge existing post with new data
    // Ensure slug is not changed from the original
    // Explicitly construct the updated post to ensure type safety with BlogPost
    const updatedPost: BlogPost = {
      ...originalPost, // Start with the original post
      ...updatedPostPayload, // Apply updates from payload (excluding slug, readingTime initially)
      slug: slug, // Ensure original slug is maintained
      readingTime: newReadingTime, // Apply new or original readingTime
      // Ensure content is not undefined if it wasn't in payload but is required by BlogPost
      // If content was not in payload, originalPost.content will be used.
      // If content was in payload, updatedPostPayload.content will be used.
      content: typeof updatedPostPayload.content === 'string' ? updatedPostPayload.content : originalPost.content,
    };

    posts[postIndex] = updatedPost;

    await writePosts(posts);
    return NextResponse.json(posts[postIndex]);
  } catch (error) {
    console.error(`PUT /api/posts/${params.slug} - Error:`, error);
     if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ message: (error instanceof Error ? error.message : 'Error updating post') }, { status: 500 });
  }
}
