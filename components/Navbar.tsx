"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { Container } from "./Container";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-print-hide
      className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-border"
    >
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight hover:text-accent transition-colors"
        >
          karan.dev
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-1.5 text-sm transition-colors rounded-md whitespace-nowrap",
                  active
                    ? "text-fg bg-card"
                    : "text-muted hover:text-fg hover:bg-card",
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="ml-1 inline-flex items-center justify-center p-2 text-muted hover:text-fg transition-colors"
          >
            <Github className="size-4" />
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted hover:text-fg hover:bg-card transition-colors"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <Container className="py-2">
            <nav className="flex flex-col">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "px-3 py-2.5 text-sm rounded-md transition-colors",
                      active
                        ? "text-fg bg-card"
                        : "text-muted hover:text-fg hover:bg-card",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/experience"
                className="px-3 py-2.5 text-sm rounded-md text-muted hover:text-fg hover:bg-card"
              >
                Experience
              </Link>
              <Link
                href="/now"
                className="px-3 py-2.5 text-sm rounded-md text-muted hover:text-fg hover:bg-card"
              >
                Now
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2.5 text-sm rounded-md text-muted hover:text-fg hover:bg-card"
              >
                Contact
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
