"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { resolvedTheme } = useTheme();

  const spawnParticle = useCallback(
    (x: number, y: number, speedX = 0, speedY = 0) => {
      return {
        x,
        y,
        size: Math.random() * 2 + 1,
        speedX: speedX || Math.random() * 2 - 1,
        speedY: speedY || Math.random() * 2 - 1,
        opacity: Math.random() * 0.4 + 0.1,
      };
    },
    []
  );

  const initParticles = useCallback(() => {
    if (typeof window === "undefined") return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < quantity; i++) {
      newParticles.push(
        spawnParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        )
      );
    }
    setParticles(newParticles);
    setIsInitialized(true);
  }, [quantity, spawnParticle]);

  const updateParticles = useCallback(() => {
    if (typeof window === "undefined") return;

    setParticles((currentParticles) =>
      currentParticles.map((particle) => {
        let { x, y, speedX, speedY, opacity } = particle;

        // Update position based on speed
        x += speedX;
        y += speedY;

        // Slowly decrease opacity for fade-out effect
        opacity -= 0.001;

        // Bounce off edges with some randomization
        if (x < 0 || x > window.innerWidth) {
          speedX *= -1;
          speedX += (Math.random() - 0.5) * 0.2;
        }
        if (y < 0 || y > window.innerHeight) {
          speedY *= -1;
          speedY += (Math.random() - 0.5) * 0.2;
        }

        // Reset particle if it fades out completely
        if (opacity <= 0) {
          return spawnParticle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          );
        }

        return { ...particle, x, y, speedX, speedY, opacity };
      })
    );
  }, [spawnParticle]);

  useEffect(() => {
    if (!isInitialized) {
      initParticles();
    }

    const intervalId = setInterval(updateParticles, 50);
    return () => clearInterval(intervalId);
  }, [initParticles, updateParticles, isInitialized]);

  useEffect(() => {
    if (refresh) {
      initParticles();
    }
  }, [refresh, initParticles]);

  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none",
        className
      )}
    >
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
            transition: `opacity 0.5s ease, transform 0.5s ease`,
          }}
        />
      ))}
    </div>
  );
}
