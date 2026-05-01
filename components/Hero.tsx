"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { profile } from "@/content/profile";

export function Hero() {
  const [before, after] = profile.intro.split("{company}");

  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
          {profile.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
          {before}
          <CompanyPill />
          {after}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
          >
            See projects <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:border-muted transition-colors"
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

function CompanyPill() {
  const { company, companyUrl, companyColor } = profile;
  return (
    <a
      href={companyUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 font-medium hover:underline"
      style={{ color: companyColor }}
    >
      <span
        aria-hidden
        className="inline-block size-3 rounded-sm"
        style={{ backgroundColor: companyColor }}
      />
      {company}
    </a>
  );
}
