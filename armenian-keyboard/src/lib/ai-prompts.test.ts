import { describe, expect, it } from "vitest";
import { buildAIInstructions } from "./ai-prompts";

describe("AI prompts", () => {
  it("distinguishes dialect conversion direction", () => {
    const prompt = buildAIInstructions("convert", { dialect: "western", orthography: "reformed", targetDialect: "eastern" });
    expect(prompt).toContain("Western Armenian");
    expect(prompt).toContain("Eastern Armenian");
  });
  it("asks for English translation only for translate action", () => {
    expect(buildAIInstructions("translate", { dialect: "western", orthography: "reformed" })).toContain("English");
  });
});
