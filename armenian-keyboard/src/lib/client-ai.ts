import type { AIAction, Dialect, Orthography } from "@/types/keyboard";

interface AIRequest {
  action: AIAction;
  text: string;
  dialect: Dialect;
  orthography: Orthography;
  targetDialect?: Dialect;
  question?: string;
}

export async function runAIAction(payload: AIRequest): Promise<string> {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => null) as { result?: string; error?: string } | null;
  if (!response.ok) throw new Error(data?.error || "This feature is temporarily unavailable.");
  if (!data?.result) throw new Error("No response was returned.");
  return data.result;
}
