import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { KeyboardApp } from "@/components/KeyboardApp";

describe("KeyboardApp", () => {
  it("surfaces phonetic typing guidance above the keyboard", () => {
    const html = renderToStaticMarkup(<KeyboardApp />);

    expect(html).toContain("Type Armenian phonetically");
    expect(html).toContain("sh → շ · ts → ց · x/kh → խ · gh → ղ · ye → ե");
    expect(html).toContain("Typing help");
  });
});
