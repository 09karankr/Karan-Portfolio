import { Container } from "@/components/Container";

export default function BlogLoading() {
  return (
    <Container className="py-16">
      <div className="h-9 w-32 rounded-md bg-card animate-pulse mb-3" />
      <div className="h-5 w-full max-w-prose rounded-md bg-card/60 animate-pulse mb-2" />
      <div className="h-5 w-2/3 max-w-prose rounded-md bg-card/60 animate-pulse mb-10" />

      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-20 rounded-md bg-card/60 animate-pulse"
          />
        ))}
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </Container>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card/30 p-6">
      <div className="h-6 w-3/4 rounded-md bg-card animate-pulse mb-3" />
      <div className="flex gap-3 mb-4">
        <div className="h-3.5 w-20 rounded bg-card/70 animate-pulse" />
        <div className="h-3.5 w-24 rounded bg-card/70 animate-pulse" />
      </div>
      <div className="h-4 w-full rounded bg-card/60 animate-pulse mb-2" />
      <div className="h-4 w-5/6 rounded bg-card/60 animate-pulse mb-4" />
      <div className="flex gap-1.5">
        <div className="h-5 w-14 rounded-md bg-card/60 animate-pulse" />
        <div className="h-5 w-16 rounded-md bg-card/60 animate-pulse" />
      </div>
    </div>
  );
}
