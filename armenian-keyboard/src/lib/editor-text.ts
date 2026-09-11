export interface EditorResult {
  value: string;
  caret: number;
}

export function applyEditorKey(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  key: string,
): EditorResult {
  const start = Math.max(0, Math.min(selectionStart, value.length));
  const end = Math.max(start, Math.min(selectionEnd, value.length));

  if (key === "Backspace") {
    if (start !== end) {
      return { value: value.slice(0, start) + value.slice(end), caret: start };
    }
    if (start === 0) return { value, caret: 0 };
    return {
      value: value.slice(0, start - 1) + value.slice(end),
      caret: start - 1,
    };
  }

  const insert = key === "Space" ? " " : key === "Enter" ? "\n" : key;
  return {
    value: value.slice(0, start) + insert + value.slice(end),
    caret: start + insert.length,
  };
}

export function countCharacters(value: string): number {
  return [...value].length;
}

export function countWords(value: string): number {
  const matches = value.trim().match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu);
  return matches?.length ?? 0;
}

export function extractArmenianWords(value: string): string[] {
  const matches = value.match(/[\u0531-\u0556\u0561-\u0587]+/gu) ?? [];
  return [...new Set(matches.map((word) => word.trim()).filter(Boolean))];
}
