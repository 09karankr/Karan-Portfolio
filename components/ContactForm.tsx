"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");
        setError(null);

        const fd = new FormData(form);
        const payload = {
          name: String(fd.get("name") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          message: String(fd.get("message") ?? "").trim(),
        };

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data?.error ?? "Failed to send");
          }
          setStatus("ok");
          form.reset();
        } catch (err) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Failed to send");
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Message" name="message" textarea required />

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <Send className="size-3.5" />
        </button>
        {status === "ok" && (
          <span className="text-sm text-accent">Sent — talk soon.</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400">{error}</span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseCls =
    "w-full rounded-md border border-border bg-card/50 px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
  return (
    <label className="block">
      <span className="block text-xs font-mono text-muted mb-1.5">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={baseCls} />
      ) : (
        <input type={type} name={name} required={required} className={baseCls} />
      )}
    </label>
  );
}
