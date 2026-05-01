import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { Container } from "@/components/Container";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name} — ${profile.role}. Resume.`,
};

export default function ResumePage() {
  return (
    <Container className="py-16">
      <div
        data-print-hide
        className="flex flex-wrap items-baseline justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Resume</h1>
          <p className="text-muted mt-2">
            {profile.role} · {profile.company} · {profile.location}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
          >
            <Download className="size-4" /> Download PDF
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:border-accent transition-colors"
          >
            <ExternalLink className="size-4" /> Open in new tab
          </a>
        </div>
      </div>

      <section data-print-hide className="mb-12">
        <div className="rounded-lg border border-border bg-card/30 overflow-hidden">
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="w-full h-[80vh]"
            aria-label="Resume PDF"
          >
            <div className="p-8 text-center">
              <p className="text-muted mb-2">
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href="/resume.pdf"
                className="text-accent hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open the PDF directly →
              </a>
              <p className="text-xs text-muted mt-4">
                If you&apos;re seeing this and you&apos;re the site owner: drop
                your resume PDF at <code>public/resume.pdf</code>.
              </p>
            </div>
          </object>
        </div>
      </section>

      <section data-print-hide className="grid gap-8 md:grid-cols-2 mb-12">
        <div>
          <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Contact</h2>
          <ul className="space-y-1 text-sm text-muted">
            <li>{profile.email}</li>
            <li>{profile.phone}</li>
            <li>
              <a
                href={profile.github}
                className="hover:text-fg"
                target="_blank"
                rel="noreferrer"
              >
                {profile.github.replace(/^https?:\/\//, "")}
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                className="hover:text-fg"
                target="_blank"
                rel="noreferrer"
              >
                {profile.linkedin.replace(/^https?:\/\//, "")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Education</h2>
          <p className="text-sm">{profile.education.degree}</p>
          <p className="text-sm text-muted">{profile.education.school}</p>
          <p className="text-sm text-muted">
            {profile.education.period} · CGPA {profile.education.cgpa}
          </p>
        </div>
      </section>

      {/* Print-only: full structured resume rendered for browser print. */}
      <article className="hidden print:block text-black">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wider">
            {profile.name}
          </h1>
          <p className="text-sm mt-1">
            {profile.email} · {profile.phone}
          </p>
          <p className="text-sm">
            {profile.github.replace(/^https?:\/\//, "")} ·{" "}
            {profile.linkedin.replace(/^https?:\/\//, "")}
          </p>
        </header>

        <PrintSection title="Professional Summary">
          <p>{profile.summary}</p>
        </PrintSection>

        <PrintSection title="Technical Skills">
          <ul className="space-y-1">
            {Object.entries(profile.skills).map(([cat, items]) => (
              <li key={cat}>
                <strong>{cat}:</strong> {items.join(", ")}
              </li>
            ))}
          </ul>
        </PrintSection>

        <PrintSection title="Professional Experience">
          {profile.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <strong>
                  {exp.company} · {exp.role}
                </strong>
                <span>{exp.period}</span>
              </div>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Key Projects">
          {projects.map((p) => (
            <div key={p.slug} className="mb-3">
              <div className="flex justify-between">
                <strong>{p.title}</strong>
                <span>{p.period}</span>
              </div>
              <p className="italic">{p.stack.join(", ")}</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {p.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Education">
          <div className="flex justify-between">
            <strong>
              {profile.education.degree} · {profile.education.school}
            </strong>
            <span>
              CGPA: {profile.education.cgpa} · {profile.education.period}
            </span>
          </div>
        </PrintSection>

        <PrintSection title="Certifications">
          <ul className="list-disc pl-5 space-y-0.5">
            {profile.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </PrintSection>
      </article>
    </Container>
  );
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4">
      <h2 className="text-sm font-bold uppercase border-b border-black pb-0.5 mb-2">
        {title}
      </h2>
      <div className="text-sm leading-snug">{children}</div>
    </section>
  );
}
