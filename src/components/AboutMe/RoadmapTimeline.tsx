import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import milestoneData, { MilestoneData } from "./milestoneData";
import MilestoneMarker from "./MilestoneMarker";
import MilestoneModal from "./MilestoneModal";
import "./Roadmap.css";

/* ── helpers ── */
const PAD = 15; // 15% padding on each end

function milestonePercent(index: number, total: number): number {
  if (total <= 1) return 50;
  return PAD + ((100 - 2 * PAD) * index) / (total - 1);
}

/* ── Road constants ── */
const VB_W = 1000;
const VB_H = 300;
const Y = 150; // road center
const HW = 24; // road half-width (total 48)
const AHW = 46; // arrow half-width
const X_START = 4.5; // Left edge (no vertical border so it merges seamlessly)
const ARROW_X = 933; // arrow base
const TIP_X = 993; // arrow tip (pulled back to touch green line perfectly)

// We define the outline of the entire road (including arrow)
// This lets us fill it with dark colors, and stroke the outline with neon.
const roadShape = `
  M ${X_START},${Y - HW}
  L ${ARROW_X},${Y - HW}
  L ${ARROW_X},${Y - AHW}
  L ${TIP_X},${Y}
  L ${ARROW_X},${Y + AHW}
  L ${ARROW_X},${Y + HW}
  L ${X_START},${Y + HW}
`;

const RoadmapTimeline: React.FC = () => {
  const [selected, setSelected] = useState<MilestoneData | null>(null);

  const handleOpen = useCallback((m: MilestoneData) => setSelected(m), []);
  const handleClose = useCallback(() => setSelected(null), []);

  const total = milestoneData.length;

  return (
    <>
      <div className="roadmap-wrapper">
        {/* ─── Desktop: Straight Road ─── */}
        <div className="roadmap-desktop">
          <div className="roadmap-road-container">
            <svg
              className="roadmap-svg"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Main gradient: cyan/blue → pink → purple → blue → green */}
                <linearGradient
                  id="roadGrad"
                  x1="0"
                  y1="0"
                  x2="1000"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#00c8ff" stopOpacity="0.9" />
                  <stop offset="15%" stopColor="#00c8ff" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#ff2d75" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="80%" stopColor="#f8e912" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00ffa6" stopOpacity="0.95" />
                </linearGradient>

                <filter
                  id="roadGlow"
                  x="-10%"
                  y="-50%"
                  width="120%"
                  height="200%"
                >
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                </filter>
              </defs>

              {/* 1) Road Outer Glow (thick blurred stroke) */}
              <path
                d={roadShape}
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="12"
                strokeLinejoin="round"
                filter="url(#roadGlow)"
                opacity="0.6"
              />

              {/* 2) Main Road Dark Surface */}
              <path
                d={roadShape}
                fill="rgba(15,20,35,0.95)"
                stroke="rgba(15,20,35,0.95)"
                strokeWidth="6"
                strokeLinejoin="round"
              />

              {/* 3) Inner Darker Surface */}
              <path
                d={roadShape}
                fill="rgba(10,14,26,0.97)"
                stroke="rgba(10,14,26,0.97)"
                strokeWidth="2"
              />

              {/* 4) Bright Neon Outline (Edge Highlight) */}
              <path
                d={roadShape}
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="3.5"
                strokeLinejoin="round"
                opacity="1"
              />

              {/* 5) Dashed Center Line ("strip lines") */}
              {/* It runs all the way to the tip of the arrow */}
              <line
                x1={X_START}
                y1={Y}
                x2={TIP_X - 10}
                y2={Y}
                stroke="url(#roadGrad)"
                strokeWidth="3"
                strokeDasharray="16 12"
                opacity="0.9"
                strokeLinecap="round"
              />
            </svg>

            {/* Milestone markers overlaid on the SVG */}
            <div className="roadmap-markers">
              {milestoneData.map((m, i) => (
                <MilestoneMarker
                  key={m.stepNumber}
                  milestone={m}
                  above={i % 2 === 0}
                  onClick={() => handleOpen(m)}
                  index={i}
                  leftPercent={milestonePercent(i, total)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── Mobile: Vertical Timeline ─── */}
        <div className="roadmap-mobile">
          <div className="roadmap-vertical-line" />
          {milestoneData.map((m, i) => (
            <motion.button
              key={m.stepNumber}
              className="roadmap-v-item"
              style={{ "--ms-glow": m.glowColor } as React.CSSProperties}
              onClick={() => handleOpen(m)}
              whileHover={{ scale: 1.03 }}
            >
              <div className="roadmap-v-pin">
                <span>{String(m.stepNumber).padStart(2, "0")}</span>
              </div>
              <div className="roadmap-v-content">
                <span className="roadmap-v-title">{m.title}</span>
                <span className="roadmap-v-period">{m.period}</span>
                <span className="roadmap-v-position">{m.position}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <MilestoneModal milestone={selected} onClose={handleClose} />
    </>
  );
};

export default RoadmapTimeline;
