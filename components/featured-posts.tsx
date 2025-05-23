"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";

// Sample blog posts
const posts = [
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
];

export function FeaturedPosts() {
  return (
    <section className="container mx-auto py-20 bg-muted/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="font-space-grotesk text-3xl font-bold tracking-tight md:text-4xl">
          Latest <span className="gradient-text">Blog Posts</span>
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Thoughts, insights, and tutorials on web development
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
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

      <div className="mt-16 text-center">
        <Button asChild size="lg" variant="outline" className="gap-2 border-primary/20">
          <Link href="/blog">
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
