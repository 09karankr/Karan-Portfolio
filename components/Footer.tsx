import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <Container className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
      </Container>
    </footer>
  );
}
