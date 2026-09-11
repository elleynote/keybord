import { describe, expect, it } from "vitest";
import { applyEditorKey, countCharacters, countWords } from "./editor-text";

describe("editor text helpers", () => {
  it("inserts at the caret", () => {
    expect(applyEditorKey("աբ", 1, 1, "գ")).toEqual({ value: "ագբ", caret: 2 });
  });
  it("replaces selected text", () => {
    expect(applyEditorKey("աբգ", 1, 3, "դ")).toEqual({ value: "ադ", caret: 2 });
  });
  it("backspaces one character", () => {
    expect(applyEditorKey("աբգ", 2, 2, "Backspace")).toEqual({ value: "ագ", caret: 1 });
  });
  it("counts characters and words", () => {
    expect(countCharacters("Բարեւ ձեզ")).toBe(9);
    expect(countWords("  Բարեւ   ձեզ  ")).toBe(2);
  });
});
