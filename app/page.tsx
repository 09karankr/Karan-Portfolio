import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { featuredProjects } from "@/content/projects";
import { getAllPosts, getPostBySlug } from "@/lib/notion";
import { readingTimeMinutes } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentMeta = posts.slice(0, 3);
  const recentPosts = await Promise.all(
    recentMeta.map(async (m) => {
      const full = await getPostBySlug(m.slug);
      return {
        meta: m,
        minutes: full ? readingTimeMinutes(full.markdown) : undefined,
      };
    }),
  );

  return (
    <Container>
      <Hero />

      <section className="py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Featured projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted hover:text-fg transition-colors inline-flex items-center gap-1"
          >
            All projects <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="py-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest writing
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-fg transition-colors inline-flex items-center gap-1"
            >
              All posts <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-4">
            {recentPosts.map(({ meta, minutes }) => (
              <BlogCard key={meta.id} post={meta} readingMinutes={minutes} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
