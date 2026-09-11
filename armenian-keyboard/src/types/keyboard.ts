export type Dialect = "western" | "eastern";
export type KeyboardLayout = "standard" | "phonetic";
export type Orthography = "reformed" | "traditional";
export type AIAction = "translate" | "check" | "convert" | "ask";

export interface Preferences {
  dialect: Dialect;
  layout: KeyboardLayout;
  orthography: Orthography;
  text: string;
}

export interface VocabularyEntry {
  id: string;
  armenian: string;
  transliteration: string;
  english?: string;
  createdAt: string;
}
