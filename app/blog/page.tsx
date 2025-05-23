import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog-card";

// Extended blog posts for the dedicated blog page
const allPosts = [
  {
    title: "Building Accessible React Applications",
    excerpt: "Learn how to create inclusive web experiences using React, focusing on semantic HTML, ARIA, and keyboard navigation.",
    date: "2025-04-15",
    readingTime: "8",
    category: "React",
    slug: "building-accessible-react-applications",
  },
  {
    title: "The Future of Web Development with AI",
    excerpt: "Exploring how AI tools are transforming web development workflows and what that means for developers in 2025.",
    date: "2025-05-02",
    readingTime: "6",
    category: "AI",
    slug: "future-web-development-ai",
  },
  {
    title: "Mastering TypeScript for Large-Scale Applications",
    excerpt: "Advanced TypeScript patterns and techniques to help manage complexity in enterprise-level applications.",
    date: "2025-05-10",
    readingTime: "12",
    category: "TypeScript",
    slug: "mastering-typescript-large-scale-applications",
  },
  {
    title: "State Management in 2025: Beyond Redux",
    excerpt: "Comparing modern state management solutions and when to use each approach in your React applications.",
    date: "2025-03-22",
    readingTime: "10",
    category: "React",
    slug: "state-management-2025-beyond-redux",
  },
  {
    title: "Building a Design System from Scratch",
    excerpt: "A step-by-step guide to creating, documenting, and implementing a design system for your organization.",
    date: "2025-02-18",
    readingTime: "15",
    category: "Design",
    slug: "building-design-system-from-scratch",
  },
  {
    title: "Serverless Architecture Patterns",
    excerpt: "Exploring common patterns and best practices when building serverless applications with AWS Lambda and API Gateway.",
    date: "2025-01-30",
    readingTime: "9",
    category: "Backend",
    slug: "serverless-architecture-patterns",
  },
];

export default function BlogPage() {
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
              index={index}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
