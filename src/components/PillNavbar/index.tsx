import React, { useState, useEffect } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import "./PillNavbar.css";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

const PillNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Default to Home
      let current = "Home";

      // First check if Contact is in view
      const contactEl = document.getElementById("contact");
      if (contactEl && contactEl.getBoundingClientRect().top <= vh * 0.4) {
        current = "Contact";
      } else {
        // Check other sections from bottom to top
        for (let i = navItems.length - 1; i >= 0; i--) {
          const item = navItems[i];

          if (item.href === "#home") {
            if (scrollY < vh * 0.4) {
              current = item.label;
              break;
            }
            continue;
          }

          const id = item.href.substring(1);
          const element = document.getElementById(id);

          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= vh * 0.4) {
              current = item.label;
              break;
            }
          }
        }
      }

      // If scrolled to the very bottom, set Contact as active
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
        current = "Contact";
      }

      // Special case for absolute top
      if (scrollY < 50) {
        current = "Home";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pill-header">
      <nav className="pill-navbar" aria-label="Main navigation">
        <a href="#" className="nav-brand" aria-label="Tutku home">
          <div className="brand-logo-container">
            <img src="/assets/Tutku_Logo.png" alt="" className="brand-logo" />
          </div>
          <span className="brand-name">Tutku</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={activeSection === item.label ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.label);

                  if (item.href === "#home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                  }

                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-contact-shell">
          <a href="#contact" className="nav-contact" onClick={(e) => { e.preventDefault(); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
            <span className="contact-text">Contact</span>
            <PaperPlaneTilt size={20} weight="bold" className="contact-icon" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default PillNavbar;
