import { profile } from "@/content/profile";

/**
 * Returns the cal.com booking URL if a username is configured, else null.
 * Configure via profile.availability.calUsername + calEvent.
 */
export function calBookingUrl(): string | null {
  const { calUsername, calEvent } = profile.availability;
  if (!calUsername) return null;
  const event = calEvent?.trim() || "15min";
  return `https://cal.com/${calUsername}/${event}`;
}
