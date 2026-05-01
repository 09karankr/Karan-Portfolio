import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-invert prose-zinc max-w-prose
      prose-headings:tracking-tight
      prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-strong:text-fg
      prose-blockquote:border-l-accent prose-blockquote:text-muted
      prose-img:rounded-lg prose-img:border prose-img:border-border
      prose-hr:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
