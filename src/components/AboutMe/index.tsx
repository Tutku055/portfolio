import React, { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import "./AboutMe.css";

import NeonLights from "../NeonLights";
import RoadmapTimeline from "./RoadmapTimeline";

const cvFile = "/portfolio/Tutku_Altınyaprak_CV.pdf";

const AboutMe: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll durumunu takip ediyoruz (element viewporta girdiğinden çıktığı ana kadar)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Top/Bottom gradient geçişi ve siyah arka plan animasyonu
  // 0 -> 0.25 (Ekrana girerken transparent'tan siyaha geçiş)
  // 0.25 -> 0.75 (Ekranda tamamen görünürken, tamamen siyah)
  // 0.75 -> 1.0 (Ekrandan çıkarken siyahtan transparent'a geçiş)
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <NeonLights opacity={backgroundOpacity} />

      <div
        className="about-container"
        style={{ opacity: contentOpacity as any }}
      >
        <div className="about-header">
          <h2 className="neon-text">About Me</h2>
        </div>

        <div className="about-content">
          <div className="about-text-column">
            <p className="about-description">
              I am a{" "}
              <span className="glow-word">3rd-year Computer Engineering </span>
              student with a core expertise in{" "}
              <span className="glow-word">backend development</span>, primarily
              using <span className="glow-word">.NET Core </span>. While my main
              focus is on building{" "}
              <span className="glow-word">scalable systems</span> and applying
              solid software architecture principles, my skill set also covers
              SQL, React, and modern developer tools. With a previous{" "}
              <span className="glow-word">internship experience </span>
              and a strong drive for continuous learning, my goal is to write{" "}
              <span className="glow-word">clean, maintainable code</span> that
              solves real problems. I am currently seeking an opportunity to
              contribute to a{" "}
              <span className="glow-word">strong engineering team</span>.
            </p>
            <a
              href={cvFile}
              download="Tutku_Altınyaprak_CV.pdf"
              className="download-cv-btn"
            >
              <span>Download CV</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="download-icon"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div>
          <RoadmapTimeline />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
