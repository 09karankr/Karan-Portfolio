import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-3">Experience</h1>
      <p className="text-muted mb-10 max-w-prose">
        Roles I&apos;ve held and the work I shipped in each.
      </p>
      <Timeline />
    </Container>
  );
}
