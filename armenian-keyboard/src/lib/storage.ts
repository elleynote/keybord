import type { Preferences, VocabularyEntry } from "@/types/keyboard";

const PREFERENCES_KEY = "tun-keyboard-preferences";
const VOCABULARY_KEY = "tun-keyboard-vocabulary";

export const defaultPreferences: Preferences = {
  dialect: "western",
  layout: "standard",
  orthography: "reformed",
  text: "",
};

function resolveStorage(storage?: Storage): Storage | null {
  if (storage) return storage;
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function loadPreferences(storage?: Storage): Preferences {
  const target = resolveStorage(storage);
  if (!target) return defaultPreferences;
  try {
    const parsed = JSON.parse(target.getItem(PREFERENCES_KEY) ?? "null") as Partial<Preferences> | null;
    return { ...defaultPreferences, ...(parsed ?? {}) };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(preferences: Preferences, storage?: Storage): void {
  resolveStorage(storage)?.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}

export function loadVocabulary(storage?: Storage): VocabularyEntry[] {
  const target = resolveStorage(storage);
  if (!target) return [];
  try {
    const parsed = JSON.parse(target.getItem(VOCABULARY_KEY) ?? "[]") as unknown;
    return Array.isArray(parsed) ? parsed as VocabularyEntry[] : [];
  } catch {
    return [];
  }
}

export function saveVocabulary(entries: VocabularyEntry[], storage?: Storage): void {
  resolveStorage(storage)?.setItem(VOCABULARY_KEY, JSON.stringify(entries));
}
