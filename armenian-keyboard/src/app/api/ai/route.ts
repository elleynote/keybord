import { NextRequest, NextResponse } from "next/server";
import { buildAIInstructions } from "@/lib/ai-prompts";
import type { AIAction, Dialect, Orthography } from "@/types/keyboard";

const actions: AIAction[] = ["translate", "check", "convert", "ask"];
const dialects: Dialect[] = ["western", "eastern"];
const orthographies: Orthography[] = ["reformed", "traditional"];

function extractResponseText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const output = (payload as { output?: unknown }).output;
  if (!Array.isArray(output)) return "";
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (part && typeof part === "object" && typeof (part as { text?: unknown }).text === "string") {
        return (part as { text: string }).text.trim();
      }
    }
  }
  return "";
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "This feature is temporarily unavailable." }, { status: 503 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const action = data.action as AIAction;
  const text = typeof data.text === "string" ? data.text.trim() : "";
  const dialect = data.dialect as Dialect;
  const orthography = data.orthography as Orthography;
  const targetDialect = data.targetDialect as Dialect | undefined;
  const question = typeof data.question === "string" ? data.question.trim().slice(0, 500) : undefined;

  if (!actions.includes(action) || !dialects.includes(dialect) || !orthographies.includes(orthography) || !text || text.length > 5000) {
    return NextResponse.json({ error: "Please provide valid Armenian text and options." }, { status: 400 });
  }
  if (action === "convert" && targetDialect && !dialects.includes(targetDialect)) {
    return NextResponse.json({ error: "Invalid target dialect." }, { status: 400 });
  }

  const instructions = buildAIInstructions(action, { dialect, orthography, targetDialect, question });

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4",
        instructions,
        input: text,
        reasoning: { effort: "low" },
        max_output_tokens: 1200,
        store: false,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI request failed", response.status);
      return NextResponse.json({ error: "This feature is temporarily unavailable." }, { status: 502 });
    }

    const payload = await response.json() as unknown;
    const result = extractResponseText(payload);
    if (!result) return NextResponse.json({ error: "No response was returned." }, { status: 502 });
    return NextResponse.json({ result });
  } catch (error) {
    console.error("OpenAI request error", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "This feature is temporarily unavailable." }, { status: 502 });
  }
}
