"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="font-space-grotesk text-4xl font-bold tracking-tight md:text-5xl">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Have a question or want to work together? Drop me a message!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg border border-border/40 bg-card/30 p-8 backdrop-blur"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-32 bg-background/50"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid gap-8 text-center md:grid-cols-3"
          >
            <div className="rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="mb-2 font-medium">Email</h3>
              <p className="text-sm text-muted-foreground">
                contact@example.com
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur">
              <div className="mb-4 inline-block rounded-full bg-secondary/10 p-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="mb-2 font-medium">Phone</h3>
              <p className="text-sm text-muted-foreground">
                +1 (555) 123-4567
              </p>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur">
              <div className="mb-4 inline-block rounded-full bg-accent/10 p-3">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="mb-2 font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">
                San Francisco, CA
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
