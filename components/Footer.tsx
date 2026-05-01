import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Compass,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "./Container";

const moreLinks = [
  {
    href: "/experience",
    label: "Experience",
    desc: "Roles I've held and what I shipped",
    Icon: Briefcase,
  },
  {
    href: "/reading",
    label: "Reading",
    desc: "Courses, papers, and books I'm working through",
    Icon: BookOpen,
  },
  {
    href: "/now",
    label: "/now",
    desc: "What I'm focused on this month",
    Icon: Compass,
  },
  {
    href: "/contact",
    label: "Contact",
    desc: "Send me a message",
    Icon: Send,
  },
];

export function Footer() {
  return (
    <footer data-print-hide className="border-t border-border mt-24">
      <Container className="py-12">
        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-5">
          More
        </p>
        <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {moreLinks.map(({ href, label, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3 rounded-lg border border-border bg-card/40 p-4 hover:border-muted hover:bg-card transition-colors"
            >
              <Icon className="size-4 mt-0.5 text-muted group-hover:text-fg transition-colors shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-sm font-medium">
                  {label}
                  <ArrowRight className="size-3 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
                <p className="text-xs text-muted leading-snug mt-0.5">
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-fg transition-colors"
            >
              <Github className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-fg transition-colors"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-muted hover:text-fg transition-colors"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
