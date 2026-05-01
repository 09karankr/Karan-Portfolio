/**
 * Creates the "Blog Posts" database inside NOTION_PARENT_PAGE_ID.
 *
 * Prereqs:
 *   1. NOTION_TOKEN set in .env.local (rotate any token that was shared elsewhere)
 *   2. NOTION_PARENT_PAGE_ID set in .env.local — the page that will own the database
 *   3. Your integration is connected to that parent page
 *      (open the page -> ... -> Connections -> Connect to -> your integration)
 *
 * Run:
 *   npm run notion:setup
 */

import { Client, isFullDatabase } from "@notionhq/client";

const token = process.env.NOTION_TOKEN;
const parentId = process.env.NOTION_PARENT_PAGE_ID;

if (!token) {
  console.error("✖ NOTION_TOKEN is not set in .env.local");
  process.exit(1);
}
if (!parentId) {
  console.error("✖ NOTION_PARENT_PAGE_ID is not set in .env.local");
  console.error("  Pick or create a page in Notion to hold the database, then");
  console.error("  copy its 32-char ID from the URL.");
  process.exit(1);
}

const notion = new Client({ auth: token });

async function main() {
  console.log("→ Verifying integration access to parent page...");
  try {
    await notion.pages.retrieve({ page_id: parentId! });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✖ Could not read parent page: ${msg}`);
    console.error(
      "  Make sure the integration is connected to that page in Notion's UI:",
    );
    console.error(
      "  open the page -> ... menu -> Connections -> Connect to -> your integration.",
    );
    process.exit(1);
  }
  console.log("✓ Integration has access to the parent page");

  console.log("→ Creating 'Blog Posts' database...");
  const db = await notion.databases.create({
    parent: { type: "page_id", page_id: parentId! },
    title: [{ type: "text", text: { content: "Blog Posts" } }],
    properties: {
      Name: { title: {} },
      Slug: { rich_text: {} },
      Status: {
        select: {
          options: [
            { name: "Draft", color: "gray" },
            { name: "Published", color: "green" },
          ],
        },
      },
      Published: { date: {} },
      Tags: { multi_select: { options: [] } },
      Excerpt: { rich_text: {} },
      Cover: { files: {} },
    },
  });

  if (!isFullDatabase(db)) {
    console.error("✖ Database creation returned a partial response");
    process.exit(1);
  }

  console.log("\n✅ Database created");
  console.log("──────────────────────────────────────────");
  console.log(`Database URL : ${db.url}`);
  console.log(`Database ID  : ${db.id}`);
  console.log("──────────────────────────────────────────");
  console.log("\nNext steps:");
  console.log(
    `  1. Add this to your .env.local:  NOTION_BLOG_DB_ID=${db.id.replace(/-/g, "")}`,
  );
  console.log("  2. (optional) npm run notion:import <notion-page-url>  — copy a note in as a draft");
  console.log("  3. npm run dev — your /blog page will pull from this DB");
}

main().catch((err) => {
  console.error("✖ Setup failed:", err);
  process.exit(1);
});
