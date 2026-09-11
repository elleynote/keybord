import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AITools } from "@/components/AITools";
import { Footer } from "@/components/Footer";
import { KeyboardApp } from "@/components/KeyboardApp";
import { PromoSidebar } from "@/components/PromoSidebar";

describe("client requested Tun promotions", () => {
  it("keeps the school promo in the sidebar without the duplicate tools/help block", () => {
    const html = renderToStaticMarkup(<PromoSidebar />);
    expect(html).toContain("Tun Online Armenian School");
    expect(html).toContain("https://tunapp.com/get-started");
    expect(html).not.toContain("More Armenian tools");
    expect(html).not.toContain("Need help?");
  });

  it("maps the four smart-tool CTAs to the client-requested destinations", () => {
    const html = renderToStaticMarkup(<AITools />);
    for (const value of [
      "English to Armenian translation",
      "Check text →",
      "https://translatearmenian.com",
      "Try Armenian verb tool",
      "Convert →",
      "https://armenianverbs.com",
      "Join Armenian Social Network",
      "Ask a question →",
      "https://armeniansocialnetwork.com",
      "Try 4 lessons for $1",
      "Save words →",
      "https://tunapp.com/get-started/",
    ]) expect(html).toContain(value);
  });

  it("links the translate button to the standalone translation website", () => {
    const html = renderToStaticMarkup(<PromoSidebar hasText onTranslate={() => undefined} />);
    expect(html).toContain("Translate to English");
    expect(html).toContain("https://translatearmenian.com/");
  });

  it("renames the help card to Contact us", () => {
    const html = renderToStaticMarkup(<KeyboardApp />);
    expect(html).toContain("Contact us");
    expect(html).not.toContain("Need help?");
  });

  it("removes My Lessons from the footer menu", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).not.toContain("My Lessons");
  });
});
