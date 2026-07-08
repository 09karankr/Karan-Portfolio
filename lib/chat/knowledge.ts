import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { BlogPostMeta } from "@/lib/notion";

export type KnowledgeDoc = {
  id: string;
  title: string;
  /** The retrievable/searchable body text. */
  text: string;
};

/**
 * Builds the knowledge corpus the chatbot retrieves over. Everything here is
 * derived from the same content files that render the site, so the bot can
 * never contradict the pages. Blog posts are optional (fetched at request time).
 */
export function buildKnowledgeBase(posts: BlogPostMeta[] = []): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];

  // --- Identity / summary (always relevant) ---
  docs.push({
    id: "profile",
    title: "About Karan",
    text: [
      `${profile.name} is a ${profile.role} at ${profile.company}, based in ${profile.location}.`,
      profile.summary,
      `Contact: email ${profile.email}, GitHub ${profile.github}, LinkedIn ${profile.linkedin}.`,
      profile.availability.open
        ? `Karan is currently open to ${profile.availability.role} roles.`
        : "",
    ]
      .filter(Boolean)
      .join(" "),
  });

  // --- Skills ---
  docs.push({
    id: "skills",
    title: "Technical skills",
    text: Object.entries(profile.skills)
      .map(([category, items]) => `${category}: ${items.join(", ")}.`)
      .join(" "),
  });

  // --- Experience ---
  for (const [i, exp] of profile.experience.entries()) {
    docs.push({
      id: `experience-${i}`,
      title: `Experience: ${exp.role} at ${exp.company}`,
      text: `${exp.role} at ${exp.company} (${exp.period}). ${exp.bullets.join(" ")}`,
    });
  }

  // --- Projects (rich — include case study) ---
  for (const p of projects) {
    const parts = [
      `Project: ${p.title} (${p.period}, category ${p.category}).`,
      p.summary,
      `Tech stack: ${p.stack.join(", ")}.`,
      ...p.bullets,
    ];
    if (p.metrics.length) {
      parts.push(
        `Key metrics: ${p.metrics.map((m) => `${m.value} ${m.label}`).join(", ")}.`,
      );
    }
    if (p.caseStudy) {
      parts.push(`Problem: ${p.caseStudy.problem}`);
      parts.push(`Approach: ${p.caseStudy.approach.join(" ")}`);
      parts.push(`Outcomes: ${p.caseStudy.outcomes.join(" ")}`);
      if (p.caseStudy.learnings) parts.push(`Learnings: ${p.caseStudy.learnings}`);
    }
    if (p.github) parts.push(`GitHub: ${p.github}`);
    if (p.demo) parts.push(`Live demo: ${p.demo}`);
    docs.push({ id: `project-${p.slug}`, title: p.title, text: parts.join(" ") });
  }

  // --- Education ---
  docs.push({
    id: "education",
    title: "Education",
    text: `${profile.education.degree} from ${profile.education.school} (${profile.education.period}), CGPA ${profile.education.cgpa}.`,
  });

  // --- Certifications ---
  docs.push({
    id: "certifications",
    title: "Certifications",
    text: `Certifications: ${profile.certifications.join(", ")}.`,
  });

  // --- Now / currently learning ---
  docs.push({
    id: "now",
    title: "Currently working on and learning",
    text: [
      `Working on: ${profile.now.workingOn.join("; ")}.`,
      `Learning: ${profile.now.learning.join("; ")}.`,
    ].join(" "),
  });

  // --- Reading / courses ---
  if (profile.reading.courses.length) {
    docs.push({
      id: "reading",
      title: "Courses and learning log",
      text: `Courses and study: ${profile.reading.courses
        .map((c) => `${c.title} (${c.source}, ${c.status})`)
        .join("; ")}.`,
    });
  }

  // --- Blog posts (optional, metadata only) ---
  for (const post of posts) {
    docs.push({
      id: `blog-${post.slug}`,
      title: `Blog post: ${post.title}`,
      text: [
        `Blog post titled "${post.title}".`,
        post.excerpt ?? "",
        post.tags.length ? `Tags: ${post.tags.join(", ")}.` : "",
        `Read at /blog/${post.slug}.`,
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  return docs;
}
