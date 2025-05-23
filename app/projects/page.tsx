import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";

// Extended project list for the dedicated projects page
const allProjects = [
  {
    title: "E-Commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and customers with real-time analytics.",
    imageSrc: "/placeholder-image.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management solution with drag-and-drop interfaces and team collaboration.",
    imageSrc: "/placeholder-image.jpg",
    tags: ["Next.js", "Redux", "PostgreSQL", "Framer Motion"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "AI Content Generator",
    description: "A tool that leverages AI to help users generate and refine content for various purposes.",
    imageSrc: "/placeholder-image.jpg",
    tags: ["React", "Node.js", "OpenAI API", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and Tailwind CSS featuring dark mode and animations.",
    imageSrc: "/placeholder-image.jpg",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Crypto Dashboard",
    description: "Real-time cryptocurrency dashboard with price charts, news, and portfolio tracking.",
    imageSrc: "/placeholder-image.jpg",
    tags: ["React", "Chart.js", "CoinGecko API", "Firebase"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Social Media App",
    description: "Full-stack social media application with real-time messaging, posts, and user profiles.",
    imageSrc: "/placeholder-image.jpg",
    tags: ["Next.js", "Socket.io", "MongoDB", "AWS S3"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-20">
        <div className="mb-12 text-center">
          <h1 className="font-space-grotesk text-4xl font-bold tracking-tight md:text-5xl">
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A collection of applications, websites, and other projects I've built
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              tags={project.tags}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              index={index}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
