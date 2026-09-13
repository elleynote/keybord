import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { OnScreenKeyboard } from "./OnScreenKeyboard";

describe("OnScreenKeyboard", () => {
  it("shows lowercase English helper letters on phonetic keys while keeping Armenian primary", () => {
    const html = renderToStaticMarkup(
      <OnScreenKeyboard
        dialect="western"
        layout="phonetic"
        orthography="traditional"
        shift={false}
        onToggleShift={() => undefined}
        onKeyPress={() => undefined}
      />,
    );

    expect(html).toContain("keyboard-key-primary");
    expect(html).toContain("keyboard-key-helper");
    expect(html).toContain(">խ</span>");
    expect(html).toContain(">x</span>");
    expect(html).toContain(">ը</span>");
    expect(html).toContain(">ë</span>");
    expect(html).toContain(">շ</span>");
    expect(html).toContain(">sh</span>");
  });

  it("does not add English helper letters in standard layout", () => {
    const html = renderToStaticMarkup(
      <OnScreenKeyboard
        dialect="western"
        layout="standard"
        orthography="traditional"
        shift={false}
        onToggleShift={() => undefined}
        onKeyPress={() => undefined}
      />,
    );

    expect(html).not.toContain("keyboard-key-helper");
  });
});
