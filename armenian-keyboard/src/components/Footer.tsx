import { brand } from "@/config/brand";
import { FooterNewsletterForm } from "@/components/FooterNewsletterForm";

const footerColumns = [
  {
    heading: "Learn",
    links: [
      ["My Lessons", brand.links.lessons],
      ["Learn Armenian Online", brand.links.getStarted],
      ["Courses, Flashcards and Workbooks", brand.links.shop],
      ["Armenian Social Network", brand.links.socialNetwork],
      ["Western Armenian Tutors", brand.links.tutoring],
      ["Armenian Translation Tool", brand.links.translator],
      ["Armenian Verb Conjugations", brand.links.verbs],
      ["Armenian Keyboard", brand.links.keyboard],
      ["Armenian ChatGPT", brand.links.chatbot],
    ],
  },
  {
    heading: "Account",
    links: [
      ["My Account", brand.links.account],
      ["Downloads", brand.links.downloads],
      ["Subscriptions", brand.links.subscriptions],
      ["Payment Methods", brand.links.paymentMethods],
      ["Password Recovery", brand.links.passwordRecovery],
    ],
  },
  {
    heading: "Company",
    links: [
      ["Privacy Policy", brand.links.privacy],
      ["Website Terms", brand.links.terms],
      ["Affiliate Program", brand.links.affiliate],
      ["Blog", brand.links.blog],
      ["Contact Us", brand.links.contact],
    ],
  },
] as const;

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}
function TikTokIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.2a4.2 4.2 0 1 1-3-4V13a1.6 1.6 0 1 0 1 1.5V4h2Zm0 0c.5 2.2 1.8 3.6 4 4.2v2.6c-1.5-.2-2.8-.8-4-1.7V4Z" /></svg>;
}
function YouTubeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.2a3 3 0 0 0-2.1-2.1C17 5.6 12 5.6 12 5.6s-5 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10 15V9l5 3-5 3Z" /></svg>;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-artwork-wrap" aria-hidden="true">
        <img className="footer-artwork" src={brand.footerArtworkUrl} alt="" loading="lazy" />
      </div>
      <div className="footer-bar">
        <div className="footer-content">
          <div className="footer-links-grid">
            {footerColumns.map((column) => (
              <div className="footer-column" key={column.heading}>
                <h2>{column.heading}</h2>
                <div className="footer-link-list">
                  {column.links.map(([label, href]) => (
                    <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{label}</a>
                  ))}
                </div>
                {column.heading === "Company" ? (
                  <>
                    <div className="footer-socials">
                      <a href={brand.links.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                      <a href={brand.links.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer"><TikTokIcon /></a>
                      <a href={brand.links.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><YouTubeIcon /></a>
                    </div>
                    <div className="footer-newsletter">
                      <FooterNewsletterForm />
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
          <p className="footer-copyright">Copyright © 2026, Tun Online Armenian School. All rights reserved. For every Armenian who loves their home.</p>
        </div>
      </div>
    </footer>
  );
}
