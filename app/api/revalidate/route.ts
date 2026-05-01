import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug");

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET not set on server" },
      { status: 500 },
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 },
    );
  }

  revalidatePath("/blog");
  revalidatePath("/");
  revalidateTag("blog");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    revalidated: ["/", "/blog", slug ? `/blog/${slug}` : null].filter(Boolean),
    at: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST /api/revalidate?secret=...&slug=optional-slug",
  });
}
