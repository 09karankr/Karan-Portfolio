import type { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Container className="py-16 max-w-2xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Contact</h1>
      <p className="text-muted mb-10">
        Open to interesting roles, collaborations, and conversations. The form
        below emails me directly.
      </p>

      <div className="grid gap-3 mb-10 sm:grid-cols-3">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 hover:border-accent/60 transition-colors"
        >
          <Mail className="size-4 text-accent" />
          <span className="text-sm truncate">{profile.email}</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 hover:border-accent/60 transition-colors"
        >
          <Github className="size-4 text-accent" />
          <span className="text-sm">GitHub</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 hover:border-accent/60 transition-colors"
        >
          <Linkedin className="size-4 text-accent" />
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>

      <ContactForm />
    </Container>
  );
}
