"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="font-mono text-sm text-accent mb-4">
          Hi, I&apos;m {profile.name.split(" ")[0]} 👋
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-balance gradient-text leading-[1.05]">
          {profile.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
          {profile.role} at {profile.company}. I work across the stack —
          containers and CI/CD to Next.js services and now LLM-powered tools.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
          >
            See projects <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:border-accent transition-colors"
          >
            Get in touch
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted hover:text-fg transition-colors"
          >
            <Github className="size-4" /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted hover:text-fg transition-colors"
          >
            <Linkedin className="size-4" /> LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
