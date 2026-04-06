import React, { useRef, useState, FormEvent } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  LinkedinLogo,
  GithubLogo,
  MapPin,
  EnvelopeSimple,
  PaperPlaneTilt,
  NavigationArrow,
  CheckCircle,
} from "@phosphor-icons/react";

import Particles from "../Particles";
import "./Contact.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/tutku-altinyaprak/";
const GITHUB_URL = "https://github.com/tutku055";
const EMAIL = "tutkualtinyaprak55@gmail.com";
const MAPS_URL =
  "https://www.google.com/maps/place/Istanbul,+Turkey/@41.0082,28.9784,12z";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [1, 1, 1, 1],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data
    const mailtoSubject = encodeURIComponent(
      formState.subject || "Portfolio Contact",
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
    );
    window.open(
      `mailto:${EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`,
      "_self",
    );
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <Particles />

      <div
        className="contact-container"
        style={{ opacity: contentOpacity as any }}
      >
        {/* ─── Header ─── */}
        <div className="contact-header">
          <h2 className="neon-text-contact">Contact</h2>
        </div>

        {/* ─── Body ─── */}
        <div className="contact-body">
          {/* Left – Info Cards */}
          <div className="contact-info">
            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              aria-label="LinkedIn Profile"
            >
              <div className="contact-card-icon icon-linkedin">
                <LinkedinLogo weight="duotone" size={26} />
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">Tutku Altınyaprak</span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
              aria-label="GitHub Profile"
            >
              <div className="contact-card-icon icon-github">
                <GithubLogo weight="duotone" size={26} />
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">GitHub</span>
                <span className="contact-card-value">tutku055</span>
              </div>
            </a>

            {/* Location */}
            <div className="contact-card" style={{ cursor: "default" }}>
              <div className="contact-card-icon icon-location">
                <MapPin weight="duotone" size={26} />
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">Location</span>
                <span className="contact-card-value">Istanbul, Turkey</span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  <NavigationArrow weight="bold" size={12} />
                  Show on Map
                </a>
              </div>
            </div>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="contact-card"
              aria-label="Send Email"
            >
              <div className="contact-card-icon icon-mail">
                <EnvelopeSimple weight="duotone" size={26} />
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">{EMAIL}</span>
              </div>
            </a>
          </div>

          {/* Right – Mail Form */}
          <div className="contact-form-wrapper">
            <h3 className="form-title">
              <PaperPlaneTilt
                weight="duotone"
                size={22}
                className="form-title-icon"
              />
              Send Me a Message
            </h3>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className={`send-btn${sent ? " sent" : ""}`}
              >
                {sent ? (
                  <>
                    <CheckCircle weight="bold" size={20} />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <PaperPlaneTilt weight="bold" size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer tagline */}
        <div className="contact-footer"></div>
      </div>
    </section>
  );
};

export default Contact;
