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
    // If file doesn't exist or other read error, return empty array or handle as appropriate
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // File not found, treat as no posts
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

// GET handler 
export async function GET() {
  try {
    const posts = await readPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('GET /api/posts - Error:', error);
    return NextResponse.json({ message: (error instanceof Error ? error.message : 'Error fetching blog posts') }, { status: 500 });
  }
}

// POST handler 
export async function POST(request: NextRequest) {
  try {
    // Explicitly type the incoming data, content is now mandatory
    const newPostDataRequest: Omit<BlogPost, 'readingTime'> & { readingTime?: string } = await request.json();

    // Basic validation (more can be added)
    if (!newPostDataRequest.title || !newPostDataRequest.slug || !newPostDataRequest.content) {
      return NextResponse.json({ message: 'Missing required fields (title, slug, content)' }, { status: 400 });
    }

    const calculatedReadingTime = await calculateReadingTime(newPostDataRequest.content);

    const newPost: BlogPost = {
      ...newPostDataRequest,
      date: newPostDataRequest.date || new Date().toISOString().split('T')[0], // Default to today if not provided
      excerpt: newPostDataRequest.excerpt || newPostDataRequest.content.substring(0, 150) + '...', // Auto-generate excerpt if not provided
      readingTime: calculatedReadingTime,
    };

    const posts = await readPosts();

    // Check for duplicate slug
    if (posts.some(post => post.slug === newPost.slug)) {
      return NextResponse.json({ message: `Slug '${newPost.slug}' already exists.` }, { status: 409 }); // 409 Conflict
    }

    posts.push(newPost);
    await writePosts(posts);

    return NextResponse.json(newPost, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('POST /api/posts - Error:', error);
    if (error instanceof SyntaxError) { // JSON parsing error
        return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ message: (error instanceof Error ? error.message : 'Error creating post') }, { status: 500 });
  }
}
