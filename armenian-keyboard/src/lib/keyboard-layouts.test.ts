import { describe, expect, it } from "vitest";
import type { Dialect } from "@/types/keyboard";
import { getKeyboardRows } from "./keyboard-layouts";

function helperFor(value: string, dialect: Dialect): string | undefined {
  return getKeyboardRows("phonetic", dialect, "traditional", false)
    .flat()
    .find((key) => key.value === value)
    ?.helper;
}

describe("keyboard layouts", () => {
  it("uses Eastern helper labels requested by the client", () => {
    expect(helperFor("տ", "eastern")).toBe("t");
    expect(helperFor("գ", "eastern")).toBe("g");
    expect(helperFor("յ", "eastern")).toBe("y");
    expect(helperFor("ծ", "eastern")).toBe("tz");
    expect(helperFor("ճ", "eastern")).toBe("ch");
    expect(helperFor("ջ", "eastern")).toBe("j");
    expect(helperFor("ձ", "eastern")).toBe("dz");
    expect(helperFor("է", "eastern")).toBe("e");
    expect(helperFor("փ", "eastern")).toBe("p");
    expect(helperFor("օ", "eastern")).toBe("o");
    expect(helperFor("չ", "eastern")).toBe("ch");
    expect(helperFor("պ", "eastern")).toBe("p");
    expect(helperFor("կ", "eastern")).toBe("k");
    expect(helperFor("բ", "eastern")).toBe("b");
    expect(helperFor("ը", "eastern")).toBe("ë");
  });

  it("uses Western helper labels requested by the client", () => {
    expect(helperFor("տ", "western")).toBe("d");
    expect(helperFor("գ", "western")).toBe("k");
    expect(helperFor("ծ", "western")).toBe("dz");
    expect(helperFor("ճ", "western")).toBe("j");
    expect(helperFor("ջ", "western")).toBe("ch");
    expect(helperFor("ձ", "western")).toBe("tz");
    expect(helperFor("պ", "western")).toBe("b");
    expect(helperFor("կ", "western")).toBe("g");
    expect(helperFor("բ", "western")).toBe("p");
  });
});
