import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AITools } from "@/components/AITools";
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
      "Check my Armenian",
      "Check text →",
      "https://translatearmenian.com",
      "Convert dialect",
      "Convert →",
      "https://armenianverbs.com",
      "Ask Tun AI",
      "Ask a question →",
      "https://armeniansocialnetwork.com",
      "Save to vocabulary",
      "Save words →",
      "https://tunapp.com/get-started/",
    ]) expect(html).toContain(value);
  });
});
