import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("homepage SEO content", () => {
  it("adds the client article above the footer artwork", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("How to Type Armenian Online");
    expect(html).toContain("Type Armenian Online Using Your English Keyboard");
    expect(html).toContain("Eastern and Western Armenian Keyboard");
    expect(html).toContain("Armenian Keyboard &amp; Alphabet FAQs");
    expect(html).toContain("barev → բարև");
    expect(html).toContain("href=\"/armenian-alphabet/\"");
    expect(html).toContain("href=\"/armenian-alphabet/\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>Armenian alphabet</strong>");

    expect(html.indexOf("How to Type Armenian Online")).toBeLessThan(html.indexOf("footer-artwork-wrap"));
  });
});
