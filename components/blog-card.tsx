"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
  index: number;
}

export function BlogCard({
  title,
  excerpt,
  date,
  readingTime,
  category,
  slug,
  index,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${slug}`}>
        <Card className="h-full cursor-pointer border-border/40 bg-card/30 backdrop-blur transition-all hover:border-primary/20 hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-muted/50">
                {category}
              </Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(date), "MMM d, yyyy")}</span>
              </div>
            </div>
            <CardTitle className="line-clamp-2 text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-3">{excerpt}</CardDescription>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>{readingTime} min read</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
