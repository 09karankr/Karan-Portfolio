import { Container } from "@/components/Container";

export default function BlogPostLoading() {
  return (
    <Container className="py-16">
      <div className="h-4 w-24 rounded bg-card animate-pulse mb-8" />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <div>
          <div className="h-10 w-3/4 rounded-md bg-card animate-pulse mb-4" />
          <div className="flex gap-3 mb-10">
            <div className="h-3.5 w-20 rounded bg-card/70 animate-pulse" />
            <div className="h-3.5 w-24 rounded bg-card/70 animate-pulse" />
          </div>
          <div className="space-y-3 max-w-prose">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-card/40 animate-pulse"
                style={{ width: `${70 + ((i * 13) % 30)}%` }}
              />
            ))}
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="h-3 w-24 rounded bg-card animate-pulse mb-3" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-card/40 animate-pulse"
                style={{ width: `${60 + ((i * 17) % 35)}%` }}
              />
            ))}
          </div>
        </aside>
      </div>
    </Container>
  );
}
