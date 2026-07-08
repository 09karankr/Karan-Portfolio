import type { Metadata } from "next";
import { CalendarClock, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/content/profile";
import { calBookingUrl } from "@/lib/cal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const bookingUrl = calBookingUrl();

  return (
    <Container className="py-16 max-w-2xl">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Contact</h1>
      <p className="text-muted mb-10">
        Open to interesting roles, collaborations, and conversations. The form
        below emails me directly.
      </p>

      {bookingUrl && (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-4 rounded-lg border border-accent/30 bg-accent/5 p-5 mb-6 hover:border-accent/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <CalendarClock className="size-5 text-accent shrink-0" />
            <div>
              <p className="text-sm font-medium">Book a 15-min intro call</p>
              <p className="text-xs text-muted">
                Pick a time that works — no back-and-forth.
              </p>
            </div>
          </div>
          <span className="text-sm text-accent group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </a>
      )}

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
