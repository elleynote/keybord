import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArmenianAlphabetPage, { metadata } from "@/app/armenian-alphabet/page";
import { armenianAlphabetRows } from "@/app/armenian-alphabet/alphabet-data";

const pageSource = readFileSync(new URL("./app/armenian-alphabet/page.tsx", import.meta.url), "utf8");
const tableSource = readFileSync(new URL("./app/armenian-alphabet/ArmenianAlphabetTable.tsx", import.meta.url), "utf8");

describe("Armenian alphabet page", () => {
  it("uses the requested route metadata", () => {
    expect(metadata.title).toBe("Armenian Alphabet");
    expect(metadata.alternates).toEqual({ canonical: "/armenian-alphabet" });
  });

  it("reuses the existing Tun shell and includes the client article", () => {
    const html = renderToStaticMarkup(<ArmenianAlphabetPage />);

    expect(html).toContain("Try 4 Armenian lessons for $1");
    expect(html).toContain("Copyright © 2026, Tun Online Armenian School");
    expect(html).toContain("Armenian Alphabet: Letters, Pronunciation &amp; Online Keyboard");
    expect(html).toContain("The Armenian Alphabet");
    expect(html).toContain("Armenian Alphabet Chart");
    expect(html).toContain("Eastern and Western Armenian Alphabet Pronunciation");
    expect(html).toContain("How Many Letters Are in the Armenian Alphabet?");
    expect(html).toContain("English to Armenian Alphabet");
    expect(html).toContain("Frequently Asked Questions About the Armenian Alphabet");
    expect(html).toContain("Learn the Armenian Alphabet by Using It");
  });

  it("includes both client Vimeo pronunciation videos", () => {
    expect(pageSource).toContain("780911329");
    expect(pageSource).toContain("780911379");
  });

  it("contains the full alphabet table with the approved row set", () => {
    expect(armenianAlphabetRows).toHaveLength(40);
    expect(armenianAlphabetRows.some((row) => row.forms === "Ու • ու")).toBe(true);
    expect(armenianAlphabetRows.some((row) => row.forms === "և")).toBe(true);
  });

  it("keeps the requested columns and omits the crossed-out columns", () => {
    for (const label of ["Forms", "Classical", "Reformed", "Eastern", "Western", "ISO 9985"]) {
      expect(tableSource).toContain(label);
    }

    expect(tableSource).not.toContain("Name pronunciation");
    expect(tableSource).not.toContain("Numerical value");
  });
});
