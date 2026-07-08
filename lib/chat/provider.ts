/**
 * LLM provider abstraction. Both Groq and OpenAI expose the same
 * OpenAI-compatible /chat/completions streaming API, so switching is just a
 * matter of base URL + model + key.
 *
 * Priority: GROQ_API_KEY (free, fast, LLaMA 3.3-70B) -> OPENAI_API_KEY.
 */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

type ProviderConfig = {
  url: string;
  model: string;
  apiKey: string;
  label: string;
};

export function getProvider(): ProviderConfig | null {
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    return {
      url: "https://api.groq.com/openai/v1/chat/completions",
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      apiKey: groqKey,
      label: "groq",
    };
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    return {
      url: "https://api.openai.com/v1/chat/completions",
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      apiKey: openaiKey,
      label: "openai",
    };
  }

  return null;
}

export const chatEnabled = Boolean(
  process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
);

/**
 * Calls the provider with streaming enabled and returns a ReadableStream of
 * plain-text tokens (the deltas, unwrapped from SSE). Throws on a non-OK
 * upstream response.
 */
export async function streamCompletion(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const provider = getProvider();
  if (!provider) throw new Error("No chat provider configured");

  const upstream = await fetch(provider.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      messages,
      stream: true,
      temperature: 0.3,
      max_tokens: 600,
    }),
    signal,
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(
      `Provider ${provider.label} returned ${upstream.status}: ${detail.slice(0, 200)}`,
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // partial JSON line — ignore, will be completed next chunk
            }
          }
        }
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });
}
