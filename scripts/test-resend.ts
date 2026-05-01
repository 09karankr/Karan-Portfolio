/**
 * Isolation test for Resend. Bypasses the contact form / API route
 * and calls the Resend SDK directly with the values from .env.local.
 *
 * Run: npm run test:resend
 */

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_EMAIL;
const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

console.log("→ Config:");
console.log(`  RESEND_API_KEY     : ${apiKey ? `${apiKey.slice(0, 8)}... (length ${apiKey.length})` : "MISSING"}`);
console.log(`  CONTACT_EMAIL      : ${to ?? "MISSING"}`);
console.log(`  RESEND_FROM_EMAIL  : ${from}`);
console.log();

if (!apiKey || !to) {
  console.error("✖ RESEND_API_KEY or CONTACT_EMAIL not set in .env.local");
  process.exit(1);
}

const resend = new Resend(apiKey);

async function main() {
  console.log(`→ Sending test email from ${from} to ${to}...`);
  const result = await resend.emails.send({
    from: `Portfolio Test <${from}>`,
    to: to!,
    subject: "[Resend Smoke Test] Hello from your portfolio",
    text: "If you got this, the Resend pipeline is wired correctly.",
  });

  console.log("\n→ Raw response:");
  console.log(JSON.stringify(result, null, 2));

  if (result.error) {
    console.log("\n✖ Resend returned an error. See the JSON above for details.");
    process.exit(1);
  }

  console.log("\n✅ Sent. Check the inbox (and spam folder) for the test email.");
}

main().catch((err) => {
  console.error("\n✖ Unexpected exception:", err);
  process.exit(1);
});
