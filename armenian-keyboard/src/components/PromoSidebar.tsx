import { brand } from "@/config/brand";
import type { Dialect } from "@/types/keyboard";

interface PromoSidebarProps {
  transliteration?: string;
  translation?: string;
  dialect?: Dialect;
  hasText?: boolean;
  translating?: boolean;
  onTranslate?: () => void;
}

export function PromoSidebar({ transliteration = "", translation = "", dialect = "western", hasText = false }: PromoSidebarProps) {
  return (
    <aside className="sidebar-column" aria-label="Results and Armenian learning resources">
      <section className="sidebar-card result-card">
        <div className="result-card-heading">
          <span className="mini-flag" aria-hidden="true">🇺🇸</span>
          <div>
            <span>English translation</span>
            <strong>{translation || (hasText ? "Ready when you are" : "Type Armenian to translate")}</strong>
          </div>
        </div>
        <a className="sidebar-translate-button" href="https://translatearmenian.com/" target="_blank" rel="noopener noreferrer">Translate to English</a>
      </section>

      <section className="sidebar-card result-card">
        <div className="result-card-heading">
          <span className="mini-flag" aria-hidden="true">🇦🇲</span>
          <div>
            <span>Transliteration ({dialect === "western" ? "Western" : "Eastern"} Armenian)</span>
            <strong>{transliteration || "Your Latin transliteration will appear here."}</strong>
          </div>
        </div>
      </section>

      <section className="sidebar-card verb-promo">
        <span className="promo-round-icon" aria-hidden="true">↗</span>
        <div>
          <h2>Found a verb?</h2>
          <p>Click on any verb to view its full conjugation, examples and usage.</p>
          <a className="outline-link" href={brand.links.verbs} target="_blank" rel="noopener noreferrer">Go to Verb Conjugator →</a>
        </div>
      </section>

      <section className="sidebar-card school-promo">
        <div className="promo-brand-row">
          <img src={brand.faviconUrl} alt="" aria-hidden="true" />
          <span>Tun Online Armenian School</span>
        </div>
        <h2>Learn Armenian with Tun</h2>
        <p>Join thousands learning Eastern and Western Armenian online.</p>
        <a className="primary-link" href={brand.links.getStarted} target="_blank" rel="noopener noreferrer">Try 4 lessons for $1 →</a>
      </section>
    </aside>
  );
}
