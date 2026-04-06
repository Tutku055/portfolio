import React, { useEffect, useState } from "react";
import "./HomeEntrance.css";
import Particles from "../Particles";

const HomeEntrance: React.FC = () => {
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll percentage of viewport height
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Start fading immediately, reach full black around 80-100% of a screen height
      const opacity = Math.min(y / (vh * 0.8), 1);
      setFadeOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="home-entrance" id="home">
      {/* Black overlay that fades in as user scrolls down */}
      <div
        className="home-fade-overlay"
        style={{ opacity: fadeOpacity }}
        aria-hidden="true"
      />
      <Particles />
      <section className="hero-center" aria-label="Portfolio hero section">
        <div className="hero-image-shell">
          <div className="hero-image-stage" aria-hidden="true" />
          <div className="hero-image-blend">
            <img
              src="/portfolio/images/Tutku_Hero.png"
              alt="Tutku hero portrait"
            />
          </div>
        </div>

        <div className="title-wrap">
          <h1>
            <span>Tutku ALTINYAPRAK</span>
          </h1>
          <h2 className="hero-role">Backend Developer</h2>
          <p>
            I don't just write code!
            <br /> I engineer the quiet machinery behind the scenes.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomeEntrance;
