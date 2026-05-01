import Link from "next/link";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-border">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight hover:text-accent transition-colors"
        >
          karan.dev
        </Link>
        <nav className="flex items-center gap-1">
          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-muted hover:text-fg transition-colors rounded-md hover:bg-card"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
