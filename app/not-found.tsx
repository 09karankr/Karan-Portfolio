import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-mono text-sm text-accent mb-3">404</p>
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
      >
        Back home
      </Link>
    </Container>
  );
}
