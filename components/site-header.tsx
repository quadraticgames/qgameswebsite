"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/40 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="font-space-grotesk text-2xl font-bold tracking-tight"
              >
                <span className="gradient-text">Portfolio</span>
              </motion.div>
            </Link>
            <nav className="hidden gap-6 md:flex">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <motion.span
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="default" size="sm" className="ml-4 bg-primary hover:bg-primary/80">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
