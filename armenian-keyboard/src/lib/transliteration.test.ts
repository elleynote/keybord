import { describe, expect, it } from "vitest";
import { transliterate } from "./transliteration";

describe("transliteration", () => {
  it("handles common Armenian text", () => {
    expect(transliterate("Բարեւ ձեզ", "western").toLowerCase()).toContain("parev");
  });
  it("uses ye for initial ե and e inside a word", () => {
    expect(transliterate("երեկ", "western").toLowerCase()).toBe("yereg");
  });
  it("uses vo for initial ո", () => {
    expect(transliterate("որդի", "eastern").toLowerCase()).toMatch(/^v/);
  });
});
