"use client";

import Script from "next/script";

export function FooterNewsletterForm() {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <form action="/api/newsletter" method="post" target="_blank">
        <label className="sr-only" htmlFor="footer-email">Email address</label>
        <input
          id="footer-email"
          type="email"
          name="EMAIL"
          placeholder="Enter your email here"
          autoComplete="email"
          required
        />
        <div className="mailchimp-honeypot" aria-hidden="true">
          <input
            type="text"
            name="b_cf919aa58fa15934e1e2a04a0_3feeed30f4"
            tabIndex={-1}
            defaultValue=""
          />
        </div>
        <input
          type="hidden"
          name="_newsletter_started_at"
          defaultValue=""
          ref={(node) => {
            if (node && !node.value) node.value = String(Date.now());
          }}
        />
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
          data-appearance="interaction-only"
        />
        <button type="submit" name="subscribe">Join the community</button>
      </form>
    </>
  );
}
