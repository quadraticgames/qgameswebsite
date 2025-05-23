"use client";

import { motion } from "framer-motion";
import { UnityLogo, UnrealLogo } from "./icons";

type IconType = string | React.ReactNode;

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

const technologies: TechItem[] = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Next.js", icon: "▲", color: "#ffffff" },
  { name: "TypeScript", icon: "𝖳", color: "#3178C6" },
  { name: "Tailwind CSS", icon: "🌊", color: "#38B2AC" },
  { name: "Node.js", icon: "🟢", color: "#68A063" },
  { name: "Unity", icon: <UnityLogo className="w-7 h-7" />, color: "#000000" },
  { name: "Unreal Engine", icon: <UnrealLogo className="w-7 h-7" />, color: "#313131" },
  { name: "GraphQL", icon: "◯", color: "#E535AB" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "Git", icon: "⑂", color: "#F05032" },
];

export function TechStack() {
  return (
    <section className="container mx-auto py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="font-space-grotesk text-3xl font-bold tracking-tight md:text-4xl">
          My <span className="gradient-text">Tech Stack</span>
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          Technologies and tools I work with
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur transition-all hover:border-primary/20 hover:shadow-md"
            style={{ borderColor: `${tech.color}20` }}
          >
            <div 
              className="mb-3 text-4xl"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </div>
            <span className="font-medium">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
