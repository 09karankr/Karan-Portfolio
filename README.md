# Karan Kumar — Portfolio

Personal portfolio + Notion-backed blog. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and the Notion API.

## Stack

- **Next.js 15** (App Router, RSC, ISR)
- **TypeScript**, **Tailwind CSS**, **Framer Motion**, **lucide-react**
- **Notion API** as headless CMS for blog posts (via `@notionhq/client` + `notion-to-md`)
- **react-markdown** + `rehype-highlight` for rendering posts
- **Resend** for the contact form
- Hosted on **Vercel**

## Local development

```bash
npm install
cp .env.example .env.local
# fill in the values (see "Getting secrets" below)
npm run dev
```

Open http://localhost:3000.

The blog page works without Notion configured — it shows an empty state. Wire up the env vars to start pulling real posts.

## Project layout

```
app/
  page.tsx              home
  about/                about + skills + education + certs
  experience/           role timeline
  projects/             from content/projects.ts
  blog/                 list page (Notion)
  blog/[slug]/          single post (Notion, ISR)
  api/revalidate/       on-demand revalidation webhook
  api/contact/          contact form -> Resend
components/             reusable UI
content/
  profile.ts            personal info from resume
  projects.ts           project list (edit me)
lib/
  notion.ts             Notion client + queries
  utils.ts              cn(), formatDate()
.github/workflows/
  revalidate.yml        free cron poller (every 5 min)
```

## Getting secrets

All values go in `.env.local` (local) and Vercel **Project Settings → Environment Variables** (prod).

### 1. `NOTION_TOKEN`

1. Open https://www.notion.so/my-integrations.
2. **+ New integration** → name `Portfolio Blog` → type **Internal**.
3. Capabilities: keep only **Read content** (and optionally **Read user info without email**).
4. **Save** → **Secrets** tab → **Show** → copy. Starts with `secret_` or `ntn_`.

### 2. `NOTION_BLOG_DB_ID` — automated via `npm run notion:setup`

You don't need to build the database by hand. Run the setup script:

1. In Notion, pick or create a regular page that will hold the database (e.g. a page named `Site`).
2. On that page → `...` menu → **Connections** → **Connect to** → search **Portfolio Blog** → confirm.
3. Copy the page ID from the URL — it's the 32-char string at the end:
   `notion.so/Site-2f1a8b3c4d5e6f7a8b9c0d1e2f3a4b5c`
4. Add to `.env.local`:
   ```
   NOTION_TOKEN=ntn_...
   NOTION_PARENT_PAGE_ID=2f1a8b3c4d5e6f7a8b9c0d1e2f3a4b5c
   ```
5. Run:
   ```bash
   npm run notion:setup
   ```
6. The script creates the **Blog Posts** database with all 7 properties (Name, Slug, Status, Published, Tags, Excerpt, Cover) and prints the database ID.
7. Paste that ID into `.env.local` as `NOTION_BLOG_DB_ID=...`.

### Importing existing notes — `npm run notion:import`

Already have notes in Notion you want to publish? You don't have to rewrite them.

1. Open the source note in Notion → `...` → **Connections** → connect your integration to that page (or to a parent that contains it).
2. Copy the note's URL.
3. Run:
   ```bash
   npm run notion:import -- "https://www.notion.so/Your-Note-abc123..."
   # or with a custom slug:
   npm run notion:import -- "https://www.notion.so/Your-Note-abc123..." my-custom-slug
   ```
4. The script duplicates the note's content into Blog Posts as a **Draft** row. Your original is untouched.
5. Open the new draft in Notion, polish the title/excerpt/tags, set **Status = Published**.
6. Hit `/api/revalidate?secret=...` to push it live (or wait up to 1h for ISR).

### 3. `REVALIDATE_SECRET`

Any random 32+ char string. Generate one:

```bash
# bash / git bash
openssl rand -base64 32
```

```powershell
# PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Max 256}))
```

Use the same value in `.env.local`, in Vercel env vars, and in your GitHub Actions secret (see below).

### 4. `RESEND_API_KEY`

1. Sign up at https://resend.com (free: 100 emails/day, 3000/month).
2. **API Keys** → **Create API Key** → name `portfolio-contact`, permission **Sending access**.
3. Copy the `re_...` value (shown once).
4. **Sender**: use `onboarding@resend.dev` until you verify your own domain. Once you own a domain, add it in Resend → add the SPF/DKIM DNS records → switch `RESEND_FROM_EMAIL` to e.g. `hello@karankumar.dev`.

### 5. `CONTACT_EMAIL` / `RESEND_FROM_EMAIL`

- `CONTACT_EMAIL` = where you receive submissions, e.g. `officialkaran39@gmail.com`.
- `RESEND_FROM_EMAIL` = sender. Default `onboarding@resend.dev`. Change after domain verification.

### 6. `NEXT_PUBLIC_SITE_URL`

- Local: `http://localhost:3000`
- Production: your Vercel URL or custom domain, e.g. `https://karankumar.dev`.

## Adding a blog post

1. In your Notion **Blog Posts** database, create a new row.
2. Fill **Name**, **Slug** (URL-safe, e.g. `my-first-post`), **Excerpt**, **Tags**.
3. Write the post body inside the Notion page (any blocks work — headings, code, callouts, images).
4. Set **Status** = `Published` and **Published** = today.
5. Either wait up to an hour (ISR), or call the webhook:

   ```bash
   curl -X POST "https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SECRET&slug=my-first-post"
   ```

The post appears at `/blog/my-first-post`.

## Instant sync — GitHub Actions cron (free)

The workflow at `.github/workflows/revalidate.yml` polls `/api/revalidate` every 5 minutes. To enable:

1. Push the repo to GitHub.
2. **Settings → Secrets and variables → Actions → New repository secret**:
   - `SITE_URL` = `https://your-domain.com` (no trailing slash)
   - `REVALIDATE_SECRET` = same value as in your `.env`
3. Done — first run within 5 minutes.

> Cron uses GitHub's free runner minutes; for a public repo, runner minutes are unlimited.

### Alternative: Notion Automations (paid)

If you have a Notion paid plan, you can replace the cron with an automation:
- In your DB, **Automations** → **New automation** → trigger: `Status` set to `Published` → action: **Send webhook** → URL: `https://YOUR-DOMAIN/api/revalidate?secret=YOUR_SECRET`.

The endpoint is identical — pick whichever fits.

## Deploying to Vercel

1. Push to GitHub.
2. https://vercel.com/new → import the repo.
3. **Environment Variables**: paste every key from `.env.example` with real values. Apply to **Production**, **Preview**, and **Development**.
4. Deploy. Custom domain: **Settings → Domains** → add your domain → follow DNS instructions.

## Editing your content

- **Skills, experience, education, certs** → `content/profile.ts`
- **Projects** → `content/projects.ts` (mark `featured: true` to surface on the home page)
- **Resume PDF** → drop into `public/resume.pdf` (then link from any page)
- **Site colors** → CSS variables in `app/globals.css`

## Scripts

```bash
npm run dev             # dev server
npm run build           # production build
npm run start           # serve production build
npm run lint            # next lint
npm run typecheck       # tsc --noEmit
npm run notion:setup    # one-time: create the Blog Posts DB
npm run notion:import   # copy an existing Notion note in as a Draft
```
