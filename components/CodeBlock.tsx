"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const text = extractText(children);
  const language = /language-(\w+)/.exec(className ?? "")?.[1];

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore — clipboard may be blocked
    }
  }

  return (
    <div className="relative group">
      {language && (
        <span className="absolute top-2 left-3 text-[10px] font-mono uppercase tracking-wider text-muted/70 select-none">
          {language}
        </span>
      )}
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy code"
        className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-md border border-border bg-bg/80 backdrop-blur px-2 py-1 text-[11px] font-mono text-muted opacity-0 group-hover:opacity-100 hover:text-fg transition"
      >
        {copied ? (
          <>
            <Check className="size-3 text-accent" /> Copied
          </>
        ) : (
          <>
            <Copy className="size-3" /> Copy
          </>
        )}
      </button>
      <code className={className}>{children}</code>
    </div>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: React.ReactNode } }).props;
    return extractText(props?.children);
  }
  return "";
}
