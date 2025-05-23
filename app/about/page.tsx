import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TechStack } from "@/components/tech-stack";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="font-space-grotesk text-4xl font-bold tracking-tight md:text-5xl">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Frontend developer, UI/UX enthusiast, and continuous learner
            </p>
          </div>

          <div className="mb-20 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-space-grotesk text-2xl font-bold">
                My Journey
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate frontend developer with a focus on creating beautiful, user-friendly web applications. My journey in web development began over 5 years ago when I built my first website using plain HTML and CSS.
                </p>
                <p>
                  Since then, I've worked on numerous projects ranging from simple websites to complex web applications, always striving to improve my skills and stay updated with the latest technologies and best practices.
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating intuitive user experiences that solve real problems. My approach combines technical expertise with a keen eye for design and a deep understanding of user needs.
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-6 font-space-grotesk text-2xl font-bold">
                Education & Experience
              </h2>
              <ul className="space-y-6">
                <li className="border-l-2 border-primary pl-4">
                  <span className="block text-sm text-muted-foreground">2020 - Present</span>
                  <h3 className="font-medium">Senior Frontend Developer</h3>
                  <p className="text-muted-foreground">Tech Innovations Inc.</p>
                </li>
                <li className="border-l-2 border-secondary pl-4">
                  <span className="block text-sm text-muted-foreground">2018 - 2020</span>
                  <h3 className="font-medium">Frontend Developer</h3>
                  <p className="text-muted-foreground">Digital Solutions Ltd.</p>
                </li>
                <li className="border-l-2 border-accent pl-4">
                  <span className="block text-sm text-muted-foreground">2014 - 2018</span>
                  <h3 className="font-medium">BSc Computer Science</h3>
                  <p className="text-muted-foreground">University of Technology</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-6 text-center font-space-grotesk text-2xl font-bold">
              What I Do
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur">
                <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="mb-2 font-medium">UI/UX Design</h3>
                <p className="text-sm text-muted-foreground">
                  Creating intuitive and visually appealing interfaces that deliver exceptional user experiences.
                </p>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur">
                <div className="mb-4 inline-block rounded-full bg-secondary/10 p-3">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="mb-2 font-medium">Web Development</h3>
                <p className="text-sm text-muted-foreground">
                  Building responsive, performant, and accessible web applications using modern technologies.
                </p>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur">
                <div className="mb-4 inline-block rounded-full bg-accent/10 p-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="mb-2 font-medium">Mobile-First Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Designing and developing with a mobile-first mindset to ensure great experiences across all devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        <TechStack />
      </main>
      <SiteFooter />
    </div>
  );
}
