import type { Orthography } from "@/types/keyboard";

export function applyOrthographyPreference(text: string, orthography: Orthography): string {
  // Conservative transformation only: the ligature և is a reformed spelling convenience,
  // while traditional orthography writes the same sequence as եւ. Other spelling changes
  // are lexical/contextual and intentionally left for linguistic review or the AI helper.
  if (orthography === "traditional") return text.replaceAll("և", "եւ").replaceAll("ԵՎ", "ԵՒ");
  return text.replaceAll("եւ", "և").replaceAll("Եւ", "Եվ").replaceAll("ԵՒ", "ԵՎ");
}
