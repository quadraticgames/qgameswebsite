"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Blob } from "@/components/ui/blob";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-40 opacity-30">
          <Blob color="primary" />
        </div>
        <div className="absolute top-1/3 -right-40 opacity-30">
          <Blob color="secondary" />
        </div>
        <div className="absolute -bottom-64 left-1/4 opacity-30">
          <Blob color="accent" />
        </div>
      </div>

      <div className="container mx-auto flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-6 flex flex-col items-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Developer & Creator
          </span>
        </motion.div>

        <motion.h1
          ref={textRef}
          className="mb-6 font-space-grotesk text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="gradient-text">Building digital </span>
          <br />
          <span>experiences that </span>
          <span className="gradient-text">matter</span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-2xl text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Frontend developer focused on creating beautiful, performant web applications with modern technologies and eye-catching designs.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button asChild size="lg" className="gap-2 bg-primary text-lg hover:bg-primary/90">
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary/20 text-lg">
            <Link href="/about">About Me</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
