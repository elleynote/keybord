import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PromoSidebar } from "@/components/PromoSidebar";

describe("client requested Tun promotions", () => {
  it("contains all six requested destinations", () => {
    const html = renderToStaticMarkup(<PromoSidebar />);
    for (const value of [
      "Tun Online Armenian School",
      "https://tunapp.com/get-started",
      "Armenian Translation Tool",
      "https://translatearmenian.com",
      "Armenian Verb Conjugations",
      "https://armenianverbs.com",
      "Armenian Social Network",
      "https://armeniansocialnetwork.com",
      "Learn Armenian Online",
      "mailto:hello@tunapp.com",
    ]) expect(html).toContain(value);
  });
});
