import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const layoutSource = readFileSync(new URL("./app/layout.tsx", import.meta.url), "utf8");

const expectedTitle = "Online Armenian Keyboard | Eastern, Western & Transliteration";
const expectedDescription = "Free online Armenian keyboard for Eastern and Western Armenian. Type easily with built-in pronunciation guides, instant translation, and transliteration tools.";

describe("homepage SEO and analytics", () => {
  it("uses the client-provided homepage title and description", () => {
    expect(layoutSource).toContain(`title: "${expectedTitle}"`);
    expect(layoutSource).toContain(`description: "${expectedDescription}"`);
  });

  it("loads and configures Google Analytics with the requested measurement ID", () => {
    expect(layoutSource).toContain("https://www.googletagmanager.com/gtag/js?id=G-BZDEYT1LH2");
    expect(layoutSource).toContain("gtag('config', 'G-BZDEYT1LH2')");
  });
});
