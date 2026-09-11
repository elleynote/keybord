import type { AIAction, Dialect, Orthography } from "@/types/keyboard";

interface PromptContext {
  dialect: Dialect;
  orthography: Orthography;
  targetDialect?: Dialect;
  question?: string;
}

const dialectName = (dialect: Dialect) => dialect === "western" ? "Western Armenian" : "Eastern Armenian";
const orthographyName = (orthography: Orthography) => orthography === "traditional" ? "Traditional Armenian orthography" : "Reformed Armenian orthography";

export function buildAIInstructions(action: AIAction, context: PromptContext): string {
  const source = dialectName(context.dialect);
  const orthography = orthographyName(context.orthography);

  if (action === "translate") {
    return `Translate the supplied ${source} text into natural, accurate English. Respect ${orthography}. Return only the English translation, with no preamble.`;
  }
  if (action === "check") {
    return `Act as a careful ${source} language tutor. Check the supplied Armenian text for spelling and grammar while respecting ${orthography}. Return a concise corrected version first, then short bullet explanations. Do not silently switch Armenian variety.`;
  }
  if (action === "convert") {
    const target = dialectName(context.targetDialect ?? (context.dialect === "western" ? "eastern" : "western"));
    return `Convert the supplied text from ${source} to ${target}. Preserve meaning, tone and punctuation. Respect ${orthography}. Return only the converted Armenian text, with no preamble or notes. If a form is genuinely uncertain, choose the most standard learner-friendly form.`;
  }
  return `Answer the learner's question about the supplied ${source} text. Respect ${orthography}. Be concise, educational and explicit when a linguistic point is uncertain. Learner question: ${context.question ?? "Explain this Armenian text."}`;
}
