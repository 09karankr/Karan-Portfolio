import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "./CodeBlock";

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-invert prose-zinc max-w-prose
      prose-headings:tracking-tight prose-headings:scroll-mt-20
      prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-strong:text-fg
      prose-blockquote:border-l-accent prose-blockquote:text-muted
      prose-img:rounded-lg prose-img:border prose-img:border-border
      prose-hr:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex, rehypeHighlight]}
        components={{
          code(props) {
            const { className, children, ...rest } = props;
            const isBlock = /language-/.test(className ?? "");
            if (!isBlock) {
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            }
            return <CodeBlock className={className}>{children}</CodeBlock>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
