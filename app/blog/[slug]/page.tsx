import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// In a real app, you would fetch this data from a database or CMS
const blogPosts = {
  "building-accessible-react-applications": {
    title: "Building Accessible React Applications",
    date: "2025-04-15",
    readingTime: "8",
    category: "React",
    content: `
# Building Accessible React Applications

Accessibility is not just a nice-to-have feature—it's essential for ensuring that your applications are usable by everyone, including people with disabilities. In this post, we'll explore best practices for creating accessible React applications.

## Why Accessibility Matters

Web accessibility ensures that websites and applications are designed and developed so that people with disabilities can use them. This includes:

- People with visual impairments who use screen readers
- People with motor impairments who use keyboard navigation
- People with hearing impairments who need captions for audio content
- People with cognitive disabilities who benefit from clear, simple interfaces

## Semantic HTML: The Foundation of Accessibility

One of the most important aspects of building accessible applications is using semantic HTML. React makes it easy to use semantic elements:

\`\`\`jsx
// Bad example
<div onClick={handleClick}>Click me</div>

// Good example
<button onClick={handleClick}>Click me</button>
\`\`\`

Using the correct semantic elements ensures that assistive technologies understand the purpose and functionality of elements on your page.

## ARIA Attributes

When HTML semantics aren't enough, ARIA (Accessible Rich Internet Applications) attributes can help. These attributes provide additional information to assistive technologies.

\`\`\`jsx
const [isExpanded, setIsExpanded] = useState(false);

return (
  <button
    aria-expanded={isExpanded}
    onClick={() => setIsExpanded(!isExpanded)}
  >
    Toggle Section
  </button>
);
\`\`\`

## Keyboard Navigation

Many users navigate websites using only their keyboard. Ensure that all interactive elements are focusable and that the focus order makes sense.

\`\`\`jsx
// Make custom components focusable
const CustomButton = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    tabIndex={0}
    role="button"
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        props.onClick(e);
      }
    }}
    {...props}
  >
    {props.children}
  </div>
));
\`\`\`

## Implementing Accessible Forms

Forms are a crucial part of many applications. Here are some tips for making forms accessible:

1. Always use labels with form controls
2. Associate labels with inputs using the 'htmlFor' attribute
3. Provide clear error messages
4. Use fieldsets and legends for grouping related controls

\`\`\`jsx
function AccessibleForm() {
  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

## Testing Accessibility

Testing is essential to ensure your application is truly accessible. Here are some testing methods:

1. Manual testing with keyboard navigation
2. Using screen readers (NVDA, VoiceOver, JAWS)
3. Automated tools like axe-core, jest-axe, or React's built-in accessibility linter
4. Contrast checking for color combinations

## Conclusion

Building accessible React applications requires thoughtful planning and implementation, but the benefits are immense. By following these best practices, you'll create applications that can be used by everyone, regardless of their abilities.

Remember that accessibility is not a one-time task but an ongoing commitment. Stay informed about best practices and regularly test your applications to ensure they remain accessible as they evolve.
    `,
  },
  "future-web-development-ai": {
    title: "The Future of Web Development with AI",
    date: "2025-05-02",
    readingTime: "6",
    category: "AI",
    content: "This is a placeholder for the blog content about AI in web development.",
  },
  "mastering-typescript-large-scale-applications": {
    title: "Mastering TypeScript for Large-Scale Applications",
    date: "2025-05-10",
    readingTime: "12",
    category: "TypeScript",
    content: "This is a placeholder for the blog content about TypeScript.",
  },
  "state-management-2025-beyond-redux": {
    title: "State Management in 2025: Beyond Redux",
    date: "2025-03-22",
    readingTime: "10",
    category: "React",
    content: "This is a placeholder for the blog content about state management.",
  },
  "building-design-system-from-scratch": {
    title: "Building a Design System from Scratch",
    date: "2025-02-18",
    readingTime: "15",
    category: "Design",
    content: "This is a placeholder for the blog content about design systems.",
  },
  "serverless-architecture-patterns": {
    title: "Serverless Architecture Patterns",
    date: "2025-01-30",
    readingTime: "9",
    category: "Backend",
    content: "This is a placeholder for the blog content about serverless architecture.",
  },
};

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: PageProps) {
  const { slug } = params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  // If post doesn't exist, this would be handled better in a real app
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-20">
        <div className="mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>

          <article>
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 bg-muted/50">
                {post.category}
              </Badge>
              <h1 className="mb-4 font-space-grotesk text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {/* In a real app, you would use a markdown renderer here */}
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
