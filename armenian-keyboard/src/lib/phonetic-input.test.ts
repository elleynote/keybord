import { describe, expect, it } from "vitest";
import type { Dialect, Orthography } from "@/types/keyboard";
import { applyPhoneticEditorKey, type PhoneticSession } from "./phonetic-input";

type PhoneticInput = Parameters<typeof applyPhoneticEditorKey>[0];
type AppliedPhoneticInput = NonNullable<ReturnType<typeof applyPhoneticEditorKey>>;

function applySupportedKey(input: PhoneticInput): AppliedPhoneticInput {
  const result = applyPhoneticEditorKey(input);
  expect(result).not.toBeNull();
  if (!result) throw new Error(`Expected ${input.key} to be handled as a phonetic key`);
  return result;
}

function typeKeys(keys: string[], dialect: Dialect = "eastern", orthography: Orthography = "reformed") {
  let value = "";
  let caret = 0;
  let session: PhoneticSession | null = null;

  for (const key of keys) {
    const result = applySupportedKey({ value, selectionStart: caret, selectionEnd: caret, key, dialect, orthography, session });
    value = result.value;
    caret = result.caret;
    session = result.session;
  }

  return { value, caret, session };
}

describe("phonetic Armenian input", () => {
  it("replaces provisional letters when a longer phonetic sequence is completed", () => {
    const first = typeKeys(["s"]);
    expect(first.value).toBe("ս");

    const combined = applySupportedKey({
      value: first.value,
      selectionStart: first.caret,
      selectionEnd: first.caret,
      key: "h",
      dialect: "eastern",
      orthography: "reformed",
      session: first.session,
    });

    expect(combined.value).toBe("շ");
    expect(combined.caret).toBe(1);
  });

  it("uses longest-match-first mappings for common digraphs and trigraphs", () => {
    expect(typeKeys(["z", "h"]).value).toBe("ժ");
    expect(typeKeys(["g", "h"]).value).toBe("ղ");
    expect(typeKeys(["k", "h"]).value).toBe("խ");
    expect(typeKeys(["x"]).value).toBe("խ");
    expect(typeKeys(["r", "r"]).value).toBe("ռ");
    expect(typeKeys(["t", "s"]).value).toBe("ց");
    expect(typeKeys(["o", "o"]).value).toBe("ու");
    expect(typeKeys(["o", "u"]).value).toBe("ու");
    expect(typeKeys(["c", "h", "h"]).value).toBe("չ");
    expect(typeKeys(["t", "s", "h"]).value).toBe("ց");
  });

  it("maps standalone y to schwa after applying contextual y sequences first", () => {
    expect(typeKeys(["y"]).value).toBe("ը");
    expect(typeKeys(["y", "e"]).value).toBe("ե");
    expect(typeKeys(["y", "e", "v"]).value).toBe("և");
  });

  it("handles ev and yev according to selected orthography", () => {
    expect(typeKeys(["e", "v"], "eastern", "reformed").value).toBe("և");
    expect(typeKeys(["y", "e", "v"], "eastern", "reformed").value).toBe("և");
    expect(typeKeys(["e", "v"], "western", "traditional").value).toBe("եւ");
    expect(typeKeys(["y", "e", "v"], "western", "traditional").value).toBe("եւ");
  });

  it("applies word-initial ye and vo rules", () => {
    expect(typeKeys(["y", "e", "s"]).value).toBe("ես");
    expect(typeKeys(["v", "o", "r"]).value).toBe("որ");
    expect(typeKeys(["a", "v", "o"]).value).toBe("ավո");
  });

  it("uses apostrophe as a separator unless it is part of an aspirated sequence", () => {
    expect(typeKeys(["s", "'", "h"]).value).toBe("սհ");
    expect(typeKeys(["p", "'"]).value).toBe("փ");
    expect(typeKeys(["t", "'"]).value).toBe("թ");
    expect(typeKeys(["k", "'"]).value).toBe("ք");
  });

  it("preserves spaces and numbers and converts English comma and full stop", () => {
    expect(typeKeys(["y", "e", "s", " ", "2", ",", " ", "v", "o", "r", "."]).value).toBe("ես 2՝ որ։");
  });

  it("uses natural Armenian title casing", () => {
    expect(typeKeys(["S", "h"]).value).toBe("Շ");
    expect(typeKeys(["G", "h"]).value).toBe("Ղ");
    expect(typeKeys(["B", "a", "r", "e", "v"]).value).toBe("Բարև");
    expect(typeKeys(["B", "A", "R", "E", "V"]).value).toBe("Բարև");
  });

  it("recalculates the active phonetic sequence on Backspace", () => {
    const typed = typeKeys(["s", "h"]);
    const result = applySupportedKey({
      value: typed.value,
      selectionStart: typed.caret,
      selectionEnd: typed.caret,
      key: "Backspace",
      dialect: "eastern",
      orthography: "reformed",
      session: typed.session,
    });

    expect(result.value).toBe("ս");
    expect(result.caret).toBe(1);
  });

  it("supports cursor insertion without corrupting surrounding text", () => {
    let session: PhoneticSession | null = null;
    let result = applySupportedKey({ value: "աբ", selectionStart: 1, selectionEnd: 1, key: "s", dialect: "eastern", orthography: "reformed", session });
    session = result.session;
    result = applySupportedKey({ value: result.value, selectionStart: result.caret, selectionEnd: result.caret, key: "h", dialect: "eastern", orthography: "reformed", session });

    expect(result.value).toBe("աշբ");
    expect(result.caret).toBe(2);
  });

  it("uses selected dialect for deterministic consonants", () => {
    expect(typeKeys(["b"], "eastern").value).toBe("բ");
    expect(typeKeys(["b"], "western").value).toBe("պ");
    expect(typeKeys(["d", "z"], "eastern").value).toBe("ձ");
    expect(typeKeys(["d", "z"], "western").value).toBe("ծ");
  });
});
