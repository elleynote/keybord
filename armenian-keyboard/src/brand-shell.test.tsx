import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/Footer";

const headerSource = readFileSync(new URL("./components/Header.tsx", import.meta.url), "utf8");

describe("Tun shell", () => {
  it("uses the Tun promo strip and 105px logo treatment", () => {
    expect(headerSource).toContain("Try 4 Armenian lessons for $1 →");
    expect(headerSource).toContain('width="105"');
    expect(headerSource).toContain('height="56"');
  });

  it("contains the Tun ecosystem footer and protected newsletter signup", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain("Learn Armenian Online");
    expect(html).toContain("Armenian Translation Tool");
    expect(html).toContain("Armenian Verb Conjugations");
    expect(html).toContain("Armenian Social Network");
    expect(html).toContain("https://tunapp.com/armenian-quizzes");
    expect(html).toContain("hello@tunapp.com");
    expect(html).toContain("Enter your email here");
    expect(html).toContain("Join the community");
    expect(html).toContain('action="/api/newsletter"');
    expect(html).toContain('_newsletter_company');
    expect(html).toContain('_newsletter_started_at');
    expect(html).toContain('data-action="newsletter_signup"');
    expect(html).not.toContain("list-manage.com/subscribe/post");
    expect(html).toContain("Copyright © 2026, Tun Online Armenian School. All rights reserved. For every Armenian who loves their home.");
    expect(html.indexOf("Blog")).toBeLessThan(html.indexOf("Quizzes"));
    expect(html.indexOf("Quizzes")).toBeLessThan(html.indexOf("Contact Us"));
  });
});
