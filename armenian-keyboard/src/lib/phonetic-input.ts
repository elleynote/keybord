import { applyEditorKey } from "@/lib/editor-text";
import type { Dialect, Orthography } from "@/types/keyboard";

export interface PhoneticSession {
  start: number;
  end: number;
  latin: string;
  output: string;
}

interface ApplyPhoneticEditorKeyInput {
  value: string;
  selectionStart: number;
  selectionEnd: number;
  key: string;
  dialect: Dialect;
  orthography: Orthography;
  session: PhoneticSession | null;
}

interface PhoneticEditorResult {
  value: string;
  caret: number;
  session: PhoneticSession | null;
}

interface Mapping {
  sequence: string;
  eastern: string;
  western?: string;
}

const ARMENIAN_COMMA = "՝";
const ARMENIAN_FULL_STOP = "։";

const mappings: Mapping[] = [
  { sequence: "yev", eastern: "և", western: "եւ" },
  { sequence: "chh", eastern: "չ" },
  { sequence: "tsh", eastern: "ց" },
  { sequence: "ts'", eastern: "ց" },
  { sequence: "ch'", eastern: "չ" },
  { sequence: "khh", eastern: "ք" },
  { sequence: "p'", eastern: "փ" },
  { sequence: "k'", eastern: "ք" },
  { sequence: "t'", eastern: "թ" },
  { sequence: "ph", eastern: "փ" },
  { sequence: "th", eastern: "թ" },
  { sequence: "sh", eastern: "շ" },
  { sequence: "zh", eastern: "ժ" },
  { sequence: "kh", eastern: "խ" },
  { sequence: "gh", eastern: "ղ" },
  { sequence: "dz", eastern: "ձ", western: "ծ" },
  { sequence: "ts", eastern: "ց" },
  { sequence: "ch", eastern: "ճ", western: "ջ" },
  { sequence: "rr", eastern: "ռ" },
  { sequence: "ee", eastern: "է" },
  { sequence: "oo", eastern: "ու" },
  { sequence: "ou", eastern: "ու" },
  { sequence: "ev", eastern: "և", western: "եւ" },
  { sequence: "ye", eastern: "յե" },
  { sequence: "vo", eastern: "վո" },
];

const easternLetters: Record<string, string> = {
  a: "ա",
  b: "բ",
  c: "ծ",
  d: "դ",
  e: "ե",
  f: "ֆ",
  g: "գ",
  h: "հ",
  i: "ի",
  j: "ջ",
  k: "կ",
  l: "լ",
  m: "մ",
  n: "ն",
  o: "ո",
  p: "պ",
  q: "ք",
  r: "ր",
  s: "ս",
  t: "տ",
  u: "ու",
  v: "վ",
  w: "ւ",
  x: "խ",
  y: "ը",
  z: "զ",
};

const westernLetters: Record<string, string> = {
  ...easternLetters,
  b: "պ",
  d: "տ",
  g: "կ",
  j: "ճ",
  k: "գ",
  p: "բ",
  t: "դ",
};

const boundaryCharacters: Record<string, string> = {
  " ": " ",
  Enter: "\n",
  ",": ARMENIAN_COMMA,
  ".": ARMENIAN_FULL_STOP,
};

function isLatinLetter(value: string): boolean {
  return /^[a-z]$/i.test(value);
}

function isSupportedPhoneticCharacter(value: string): boolean {
  return isLatinLetter(value) || value === "'";
}

function isSessionCurrent(session: PhoneticSession | null, value: string, caret: number): session is PhoneticSession {
  if (!session || caret !== session.end) return false;
  if (session.start < 0 || session.end < session.start || session.end > value.length) return false;
  return value.slice(session.start, session.end) === session.output;
}

function uppercaseFirstArmenian(value: string): string {
  const chars = [...value];
  if (chars.length === 0) return value;
  chars[0] = chars[0].toLocaleUpperCase("hy-AM");
  return chars.join("");
}

function resolveMapping(mapping: Mapping, dialect: Dialect, orthography: Orthography): string {
  const value = dialect === "western" ? mapping.western ?? mapping.eastern : mapping.eastern;
  if (value === "և" && orthography === "traditional") return "եւ";
  if (value === "եւ" && orthography === "reformed") return "և";
  return value;
}

function getLetterTable(dialect: Dialect): Record<string, string> {
  return dialect === "western" ? westernLetters : easternLetters;
}

function transliterateLowerLatin(latin: string, dialect: Dialect, orthography: Orthography): string {
  const lower = latin.toLowerCase();
  let result = "";
  let index = 0;

  while (index < lower.length) {
    if (lower[index] === "'") {
      index += 1;
      continue;
    }

    if (index === 0 && lower.startsWith("yev", index)) {
      result += orthography === "traditional" || dialect === "western" ? "եւ" : "և";
      index += 3;
      continue;
    }

    if (index === 0 && lower.startsWith("ye", index)) {
      result += "ե";
      index += 2;
      continue;
    }

    if (index === 0 && lower.startsWith("vo", index)) {
      result += "ո";
      index += 2;
      continue;
    }

    const mapping = mappings.find((candidate) => lower.startsWith(candidate.sequence, index));
    if (mapping) {
      result += resolveMapping(mapping, dialect, orthography);
      index += mapping.sequence.length;
      continue;
    }

    const table = dialect === "western" ? westernLetters : easternLetters;
    result += table[lower[index]] ?? lower[index];
    index += 1;
  }

  return result;
}

function transliterateLatinWord(latin: string, dialect: Dialect, orthography: Orthography): string {
  const output = transliterateLowerLatin(latin, dialect, orthography);
  const letters = [...latin].filter(isLatinLetter);
  if (letters.length === 0) return output;
  if (letters[0] === letters[0].toUpperCase()) return uppercaseFirstArmenian(output);
  return output;
}

function insertBoundary(value: string, selectionStart: number, selectionEnd: number, key: string): PhoneticEditorResult {
  const insert = boundaryCharacters[key] ?? key;
  const result = applyEditorKey(value, selectionStart, selectionEnd, insert);
  return { ...result, session: null };
}

function applySession(value: string, session: PhoneticSession, latin: string, dialect: Dialect, orthography: Orthography): PhoneticEditorResult {
  const output = transliterateLatinWord(latin, dialect, orthography);
  const nextValue = value.slice(0, session.start) + output + value.slice(session.end);
  const caret = session.start + output.length;
  return {
    value: nextValue,
    caret,
    session: latin ? { start: session.start, end: caret, latin, output } : null,
  };
}

function findRecoverableSession(value: string, start: number, end: number, key: string, dialect: Dialect, orthography: Orthography): PhoneticSession | null {
  if (start !== end || !isLatinLetter(key)) return null;

  const candidates = Object.keys(getLetterTable(dialect))
    .map((latin) => [latin, latin.toUpperCase()])
    .flat()
    .map((latin) => ({ latin, output: transliterateLatinWord(latin, dialect, orthography) }))
    .sort((a, b) => b.output.length - a.output.length);

  for (const candidate of candidates) {
    const sessionStart = start - candidate.output.length;
    if (sessionStart < 0 || value.slice(sessionStart, start) !== candidate.output) continue;

    const nextLatin = candidate.latin + key;
    const combinedOutput = transliterateLatinWord(nextLatin, dialect, orthography);
    const separateOutput = candidate.output + transliterateLatinWord(key, dialect, orthography);
    if (combinedOutput === separateOutput) continue;

    return {
      start: sessionStart,
      end: start,
      latin: candidate.latin,
      output: candidate.output,
    };
  }

  return null;
}

export function applyPhoneticEditorKey(input: ApplyPhoneticEditorKeyInput): PhoneticEditorResult | null {
  const { value, selectionStart, selectionEnd, key, dialect, orthography, session } = input;
  const start = Math.max(0, Math.min(selectionStart, value.length));
  const end = Math.max(start, Math.min(selectionEnd, value.length));

  if (key === "Backspace") {
    if (start !== end || !isSessionCurrent(session, value, start)) {
      return { ...applyEditorKey(value, start, end, "Backspace"), session: null };
    }
    return applySession(value, session, session.latin.slice(0, -1), dialect, orthography);
  }

  if (key in boundaryCharacters || /^[0-9]$/.test(key)) {
    return insertBoundary(value, start, end, key);
  }

  if (!isSupportedPhoneticCharacter(key)) return null;

  const activeSession = start === end && isSessionCurrent(session, value, start)
    ? session
    : findRecoverableSession(value, start, end, key, dialect, orthography) ?? { start, end, latin: "", output: "" };
  const nextLatin = activeSession.latin + key;

  return applySession(value, activeSession, nextLatin, dialect, orthography);
}
