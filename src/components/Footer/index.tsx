import React from "react";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Heart,
  ArrowUp,
} from "@phosphor-icons/react";
import "./Footer.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/tutku-altinyaprak/";
const GITHUB_URL = "https://github.com/tutku055";
const EMAIL = "tutkualtinyaprak55@gmail.com";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Decorative top border glow */}
      <div className="footer-glow-bar" aria-hidden="true" />

      <div className="footer-inner">
        {/* ── Brand column ── */}
        <div className="footer-brand">
          <a
            href="#"
            className="footer-logo-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <img
              src="/portfolio/Tutku_Logo.png"
              alt=""
              className="footer-logo-img"
            />
          </a>
          <span className="footer-tagline">
            Crafting digital experiences
            <br />
            with <span className="footer-accent">passion</span> &amp; code.
          </span>
        </div>

        {/* ── Nav column ── */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-col-title">Navigation</span>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Contact column ── */}
        <div className="footer-contact-col">
          <span className="footer-col-title">Get in Touch</span>
          <a href={`mailto:${EMAIL}`} className="footer-contact-link">
            <EnvelopeSimple weight="duotone" size={16} />
            {EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <LinkedinLogo weight="duotone" size={16} />
            Tutku Altınyaprak
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <GithubLogo weight="duotone" size={16} />
            tutku055
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Tutku Altınyaprak. Made with{" "}
          <Heart weight="fill" size={13} className="footer-heart" />
        </p>
        <button
          className="footer-scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp weight="bold" size={16} />
          <span>Back to top</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
