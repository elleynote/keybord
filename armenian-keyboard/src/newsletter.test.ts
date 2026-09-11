import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  NewsletterRateLimiter,
  hasMailExchange,
  isDisposableEmailDomain,
  normalizeNewsletterEmail,
  validateNewsletterSubmission,
} from "@/lib/newsletter-spam";
import { verifyTurnstileToken } from "@/lib/newsletter-turnstile";
import {
  mailchimpSubscriberHash,
  subscribeAndTagMailchimp,
} from "@/lib/newsletter-mailchimp";

const routeUrl = new URL("./app/api/newsletter/route.ts", import.meta.url);
const formUrl = new URL("./components/FooterNewsletterForm.tsx", import.meta.url);
const footerUrl = new URL("./components/Footer.tsx", import.meta.url);

describe("keyboard newsletter protection", () => {
  it("normalizes and validates newsletter emails", () => {
    const now = 1_800_000_000_000;
    expect(normalizeNewsletterEmail(" Learner@Example.COM ")).toBe("learner@example.com");
    expect(validateNewsletterSubmission({ email: "bad", honeypot: "", startedAt: String(now - 5_000), now })).toEqual({ ok: false, reason: "invalid_email" });
    expect(validateNewsletterSubmission({ email: "person@gmail.com", honeypot: "bot", startedAt: String(now - 5_000), now })).toEqual({ ok: false, reason: "honeypot" });
    expect(validateNewsletterSubmission({ email: "person@gmail.com", honeypot: "", startedAt: String(now - 200), now })).toEqual({ ok: false, reason: "too_fast" });
    expect(validateNewsletterSubmission({ email: "person@mailinator.com", honeypot: "", startedAt: String(now - 5_000), now })).toEqual({ ok: false, reason: "disposable_domain" });
  });

  it("handles disposable domains, MX checks, and rate limits", async () => {
    expect(isDisposableEmailDomain("mailinator.com")).toBe(true);
    expect(isDisposableEmailDomain("sub.mailinator.com")).toBe(true);
    expect(isDisposableEmailDomain("gmail.com")).toBe(false);
    expect(await hasMailExchange("example.com", async () => [{ exchange: "mx.example.com", priority: 10 }])).toBe(true);
    expect(await hasMailExchange("missing.invalid", async () => [])).toBe(false);
    expect(await hasMailExchange("missing.invalid", async () => { throw Object.assign(new Error("missing"), { code: "ENOTFOUND" }); })).toBe(false);
    expect(await hasMailExchange("temporary.example", async () => { throw Object.assign(new Error("temporary"), { code: "EAI_AGAIN" }); })).toBe(true);

    const limiter = new NewsletterRateLimiter();
    const now = 1_800_000_000_000;
    expect(limiter.allow("ip:test", 2, 60_000, now)).toBe(true);
    expect(limiter.allow("ip:test", 2, 60_000, now + 1)).toBe(true);
    expect(limiter.allow("ip:test", 2, 60_000, now + 2)).toBe(false);
    expect(limiter.allow("ip:test", 2, 60_000, now + 60_001)).toBe(true);
  });

  it("verifies Turnstile only for armeniankeyboard.com", async () => {
    expect(await verifyTurnstileToken({
      token: "token",
      secret: "secret",
      remoteIp: "203.0.113.10",
      expectedHostname: "armeniankeyboard.com",
      fetchImpl: async () => new Response(JSON.stringify({ success: true, hostname: "armeniankeyboard.com" }), { status: 200 }),
    })).toBe(true);
    expect(await verifyTurnstileToken({
      token: "token",
      secret: "secret",
      remoteIp: "203.0.113.10",
      expectedHostname: "armeniankeyboard.com",
      fetchImpl: async () => new Response(JSON.stringify({ success: true, hostname: "wrong.example" }), { status: 200 }),
    })).toBe(false);
  });

  it("upserts Mailchimp and adds the exact Armenian Keyboard tag", async () => {
    expect(mailchimpSubscriberHash(" Learner@Example.COM ")).toBe("d62f0f9be3b74a18cd1e01044d91c5d7");
    const calls: Array<{ url: string; init: RequestInit }> = [];
    const result = await subscribeAndTagMailchimp({
      email: "learner@example.com",
      apiKey: "key-us5",
      serverPrefix: "us5",
      audienceId: "3feeed30f4",
      sourceTag: "Armenian Keyboard",
      fetchImpl: async (url, init) => {
        calls.push({ url: String(url), init: init ?? {} });
        return new Response("{}", { status: 200 });
      },
    });
    expect(result).toEqual({ ok: true });
    expect(calls).toHaveLength(2);
    expect(JSON.parse(String(calls[0].init.body))).toMatchObject({ email_address: "learner@example.com", status_if_new: "subscribed", status: "subscribed" });
    expect(JSON.parse(String(calls[1].init.body))).toEqual({ tags: [{ name: "Armenian Keyboard", status: "active" }] });
  });

  it("uses a protected local route and footer form", () => {
    expect(existsSync(routeUrl)).toBe(true);
    expect(existsSync(formUrl)).toBe(true);
    const routeSource = readFileSync(routeUrl, "utf8");
    const formSource = readFileSync(formUrl, "utf8");
    const footerSource = readFileSync(footerUrl, "utf8");

    expect(routeSource).toContain('const NEWSLETTER_SOURCE_TAG = "Armenian Keyboard"');
    expect(routeSource).toContain('const EXPECTED_TURNSTILE_HOSTNAME = "armeniankeyboard.com"');
    expect(routeSource).toContain('formData.get("cf-turnstile-response")');
    expect(routeSource).toContain("verifyTurnstileToken");
    expect(routeSource).toContain("subscribeAndTagMailchimp");
    expect(routeSource).not.toContain("list-manage.com/subscribe/post");

    expect(formSource).toContain('action="/api/newsletter"');
    expect(formSource).toContain('name="EMAIL"');
    expect(formSource).toContain('name="_newsletter_started_at"');
    expect(formSource).toContain("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
    expect(formSource).toContain("interaction-only");
    expect(formSource).toContain("challenges.cloudflare.com/turnstile/v0/api.js");
    expect(footerSource).toContain("<FooterNewsletterForm />");
    expect(footerSource).not.toContain("list-manage.com/subscribe/post");
  });
});
