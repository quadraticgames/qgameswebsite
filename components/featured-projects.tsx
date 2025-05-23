"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";

const projects = [
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
];

export function FeaturedProjects() {
  return (
    <section className="container mx-auto py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="font-space-grotesk text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          A selection of my recent work and personal projects
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
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
    </section>
  );
}
