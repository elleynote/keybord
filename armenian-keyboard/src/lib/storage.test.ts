import { describe, expect, it } from "vitest";
import { defaultPreferences, loadPreferences, loadVocabulary, savePreferences, saveVocabulary } from "./storage";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe("storage", () => {
  it("defaults to Western traditional phonetic typing", () => {
    expect(defaultPreferences).toMatchObject({ dialect: "western", layout: "phonetic", orthography: "traditional" });
  });

  it("migrates old saved default layouts to phonetic typing", () => {
    const storage = new MemoryStorage();
    storage.setItem("tun-keyboard-preferences", JSON.stringify({ dialect: "western", layout: "standard", orthography: "traditional", text: "" }));

    expect(loadPreferences(storage)).toEqual({ dialect: "western", layout: "phonetic", orthography: "traditional", text: "" });
  });

  it("round-trips preferences", () => {
    const storage = new MemoryStorage();
    savePreferences({ dialect: "eastern", layout: "standard", orthography: "traditional", text: "Բարեւ" }, storage);
    expect(loadPreferences(storage)).toEqual({ dialect: "eastern", layout: "standard", orthography: "traditional", text: "Բարեւ" });
  });
  it("round-trips vocabulary", () => {
    const storage = new MemoryStorage();
    const items = [{ id: "1", armenian: "Բարեւ", transliteration: "Parev", createdAt: "2026-09-11T00:00:00.000Z" }];
    saveVocabulary(items, storage);
    expect(loadVocabulary(storage)).toEqual(items);
  });
});
