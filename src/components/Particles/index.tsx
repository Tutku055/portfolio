import React, { useMemo } from "react";
import "./Particles.css";

type ParticleSeed = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
};

const Particles: React.FC = () => {
  const particleCount = 16;

  const particles = useMemo<ParticleSeed[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const isLeft = i % 2 === 0;
      const leftPos = isLeft ? Math.random() * 18 : 82 + Math.random() * 18;

      return {
        left: leftPos,
        delay: Math.random() * -18,
        duration: 18 + Math.random() * 22,
        size: 12 + Math.random() * 32,
        opacity: 0.3 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 80,
      };
    });
  }, [particleCount]);

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="particle"
          style={
            {
              "--left": `${particle.left}%`,
              "--delay": `${particle.delay}s`,
              "--duration": `${particle.duration}s`,
              "--size": `${particle.size}px`,
              "--opacity": particle.opacity,
              "--drift": `${particle.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Particles;
