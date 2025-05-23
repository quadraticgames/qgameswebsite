import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { FeaturedPosts } from "@/components/featured-posts";
import { TechStack } from "@/components/tech-stack";
import { Particles } from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Particles quantity={50} />
      <SiteHeader />
      <main className="mx-auto max-w-screen-2xl">
        <HeroSection />
        <FeaturedProjects />
        <FeaturedPosts />
        <TechStack />
      </main>
      <SiteFooter />
    </div>
  );
}
