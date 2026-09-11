"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

const navItems = [
  ["Lessons", brand.links.lessons],
  ["Translate", brand.links.translator],
  ["Tutoring", brand.links.tutoring],
  ["Workbooks and Flashcards", brand.links.shop],
  ["Speaking Practice", brand.links.socialNetwork],
  ["Contact Us", brand.links.contact],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <>
      <div className="brand-strip">
        <a href={brand.links.getStarted} target="_blank" rel="noopener noreferrer">Try 4 Armenian lessons for $1 →</a>
      </div>
      <header className="site-header">
        <div className="header-shell">
          <a className="tun-logo-link" href="/" aria-label="Armenian Keyboard home">
            {logoFailed ? <span className="tun-logo-fallback">tun</span> : (
              <img className="tun-logo" src={brand.logoUrl} width="105" height="56" alt="Tun" onError={() => setLogoFailed(true)} />
            )}
          </a>
          <nav className={`header-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
          <button type="button" className="menu-button" aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)}>
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </header>
    </>
  );
}
