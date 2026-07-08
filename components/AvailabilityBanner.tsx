"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, X } from "lucide-react";
import { profile } from "@/content/profile";
import { calBookingUrl } from "@/lib/cal";

const DISMISS_KEY = "availability-banner-dismissed-v1";

export function AvailabilityBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!profile.availability.open) return;
    const dismissed =
      typeof window !== "undefined" &&
      window.localStorage.getItem(DISMISS_KEY) === "1";
    if (!dismissed) setVisible(true);
  }, []);

  if (!profile.availability.open || !visible) return null;

  const { role } = profile.availability;
  const bookingUrl = calBookingUrl();

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  }

  return (
    <div
      data-print-hide
      className="relative z-50 border-b border-accent/20 bg-accent/10 backdrop-blur"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-2 flex items-center justify-center gap-3 text-sm">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        <p className="text-center text-fg/90">
          <span className="hidden sm:inline">Currently open to </span>
          <span className="sm:hidden">Open to </span>
          <span className="font-medium">{role}</span> roles.
        </p>
        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-bg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <CalendarClock className="size-3.5" />
            Book a chat
          </a>
        ) : (
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-bg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Get in touch
          </Link>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-4 text-muted hover:text-fg transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
