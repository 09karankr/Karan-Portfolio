import type { KnowledgeDoc } from "./knowledge";

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "being", "of", "to", "in", "on", "for", "with", "at", "by", "from",
  "about", "as", "into", "his", "her", "he", "she", "it", "its", "they",
  "them", "you", "your", "i", "me", "my", "we", "us", "do", "does", "did",
  "have", "has", "had", "can", "could", "would", "should", "will", "what",
  "which", "who", "whom", "how", "when", "where", "why", "tell", "know",
  "any", "some", "this", "that", "these", "those", "there", "their",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/**
 * Lightweight retrieval: score each doc by term-frequency overlap with the
 * query (title matches weighted higher), return the top-k. For a corpus this
 * small with distinctive vocabulary (Kubernetes, RAG, TimescaleDB...), keyword
 * scoring retrieves as well as embeddings, with zero cost or latency. Swap this
 * function for an embedding-based reranker if the corpus grows large.
 */
export function retrieve(
  query: string,
  docs: KnowledgeDoc[],
  k = 5,
): KnowledgeDoc[] {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) {
    // Generic query ("tell me about yourself") — return the core docs.
    return docs.filter((d) =>
      ["profile", "skills", "now"].includes(d.id),
    );
  }

  const termSet = new Set(queryTerms);

  const scored = docs.map((doc) => {
    const bodyTokens = tokenize(doc.text);
    const titleTokens = new Set(tokenize(doc.title));

    let score = 0;
    for (const token of bodyTokens) {
      if (termSet.has(token)) score += 1;
    }
    // Title matches are strong signals.
    for (const term of termSet) {
      if (titleTokens.has(term)) score += 3;
    }
    // Normalize slightly by length so long docs don't always win.
    const normalized = score / Math.sqrt(bodyTokens.length + 1);
    return { doc, score: normalized };
  });

  const ranked = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.doc);

  // Always include the profile doc so the bot has baseline identity context.
  const profileDoc = docs.find((d) => d.id === "profile");
  if (profileDoc && !ranked.some((d) => d.id === "profile")) {
    ranked.unshift(profileDoc);
  }

  return ranked.length > 0 ? ranked : docs.slice(0, k);
}
