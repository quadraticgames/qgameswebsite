import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// Define the expected structure of a blog post
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  content?: string;
}

const postsFilePath = path.join(process.cwd(), 'data', 'blog-posts.json');

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
    const updatedPostData: Partial<BlogPost> = await request.json(); // Use Partial as not all fields might be sent

    // Basic validation
    if (updatedPostData.slug && updatedPostData.slug !== slug) {
        return NextResponse.json({ message: 'Slug in payload does not match slug in URL. Slug cannot be changed.' }, { status: 400 });
    }

    let posts = await readPosts();
    const postIndex = posts.findIndex(p => p.slug === slug);

    if (postIndex === -1) {
      return NextResponse.json({ message: 'Post not found to update' }, { status: 404 });
    }

    // Update the post: merge existing post with new data
    // Ensure slug is not changed from the original
    posts[postIndex] = { ...posts[postIndex], ...updatedPostData, slug: slug }; 

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
