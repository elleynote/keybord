import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { KeyboardApp, shouldHandlePhysicalPhoneticInput } from "@/components/KeyboardApp";

describe("KeyboardApp", () => {
  it("surfaces phonetic typing guidance above the keyboard", () => {
    const html = renderToStaticMarkup(<KeyboardApp />);

    expect(html).toContain("Type Armenian phonetically");
    expect(html).toContain("sh → շ · ts → ց · x/kh → խ · gh → ղ · ye → ե");
    expect(html).toContain("Typing help");
    expect(html).not.toContain("Listen");
  });

  it("handles laptop Latin typing even when the visual keyboard layout is Standard", () => {
    expect(shouldHandlePhysicalPhoneticInput({ layout: "standard", ctrlKey: false, metaKey: false, altKey: false })).toBe(true);
    expect(shouldHandlePhysicalPhoneticInput({ layout: "phonetic", ctrlKey: false, metaKey: false, altKey: false })).toBe(true);
    expect(shouldHandlePhysicalPhoneticInput({ layout: "standard", ctrlKey: true, metaKey: false, altKey: false })).toBe(false);
  });
});
