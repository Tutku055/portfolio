import React, { useRef, useEffect, useCallback } from "react";
import type { ProjectData } from "./projectsData";

/* ------------------------------------------------------------------ */
/*  Lightweight canvas that draws flowing particles between the neon   */
/*  pillars and auto-computed node positions, plus inter-node lines.   */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
  progress: number;
}

interface Props {
  projects: ProjectData[];
  activeId: string | null;
}

const PARTICLE_COUNT_PER_NODE = 14;
const LINE_ALPHA = 0.06;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

/**
 * Auto-compute target positions for each project evenly across the canvas.
 * Distributes them horizontally with slight vertical variation.
 */
function computeNodePositions(count: number, w: number, h: number) {
  const positions: { x: number; y: number }[] = [];
  const paddingX = w * 0.15;
  const usable = w - paddingX * 2;
  for (let i = 0; i < count; i++) {
    const x =
      count === 1 ? w / 2 : paddingX + (usable * i) / (count - 1);
    // Alternate y slightly for visual interest
    const y = h * 0.5 + (i % 2 === 0 ? -h * 0.08 : h * 0.08);
    positions.push({ x, y });
  }
  return positions;
}

const DataNodeCanvas: React.FC<Props> = ({ projects, activeId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const visibleRef = useRef(true);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  const spawnParticles = useCallback(
    (w: number, h: number) => {
      const positions = computeNodePositions(projects.length, w, h);
      positionsRef.current = positions;

      const particles: Particle[] = [];
      projects.forEach((p, idx) => {
        const tx = positions[idx].x;
        const ty = positions[idx].y;

        const glowColor = p.glowColor ?? "#0088ff";
        const isBlue = glowColor === "#0088ff";
        const isGreen = glowColor === "#00ffa6";
        const isMixed =
          p.glowColorSecondary && p.glowColorSecondary !== glowColor;

        for (let i = 0; i < PARTICLE_COUNT_PER_NODE; i++) {
          let sx: number;
          let color: string;

          if (isMixed) {
            if (i % 2 === 0) {
              sx = Math.random() * w * 0.08;
              color = "#0088ff";
            } else {
              sx = w - Math.random() * w * 0.08;
              color = "#00ffa6";
            }
          } else if (isBlue) {
            sx = Math.random() * w * 0.08;
            color = "#0088ff";
          } else if (isGreen) {
            sx = w - Math.random() * w * 0.08;
            color = "#00ffa6";
          } else {
            sx = Math.random() * w * 0.08;
            color = glowColor;
          }

          const sy = Math.random() * h;

          particles.push({
            x: sx,
            y: sy,
            targetX: tx,
            targetY: ty,
            speed: 0.0008 + Math.random() * 0.0025,
            size: 1 + Math.random() * 1.8,
            color,
            alpha: 0.25 + Math.random() * 0.4,
            progress: Math.random(),
          });
        }
      });
      particlesRef.current = particles;
    },
    [projects],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      spawnParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current) return;

      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const positions = positionsRef.current;

      // Inter-node connection lines
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.strokeStyle = `rgba(79,217,255,${LINE_ALPHA})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Particles
      particlesRef.current.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          const isLeftSource = p.x < w * 0.2;
          p.x = isLeftSource
            ? Math.random() * w * 0.08
            : w - Math.random() * w * 0.08;
          p.y = Math.random() * h;
        }

        const t = p.progress;
        const cx = p.x + (p.targetX - p.x) * t;
        const cy = p.y + (p.targetY - p.y) * t;

        const fadeFactor =
          t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
        const { r, g, b: bl } = hexToRgb(p.color);

        ctx.beginPath();
        ctx.arc(cx, cy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bl},${p.alpha * fadeFactor})`;
        ctx.fill();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [projects, activeId, spawnParticles]);

  return <canvas ref={canvasRef} className="node-canvas" />;
};

export default DataNodeCanvas;
