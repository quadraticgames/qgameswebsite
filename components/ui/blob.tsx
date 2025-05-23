"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function Blob({ color = "primary" }: { color?: "primary" | "secondary" | "accent" }) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const blob = blobRef.current;
      if (!blob) return;
      
      // Calculate distance from cursor, with some dampening
      const rect = blob.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = (clientX - centerX) * 0.03;
      const distY = (clientY - centerY) * 0.03;
      
      blob.style.transform = `translate(${distX}px, ${distY}px) scale(1)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  let colorClass = "bg-primary/30";
  if (color === "secondary") colorClass = "bg-secondary/30";
  if (color === "accent") colorClass = "bg-accent/30";

  return (
    <motion.div
      ref={blobRef}
      className={`absolute -z-10 h-72 w-72 rounded-full blur-3xl filter ${colorClass} animate-blob`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}
