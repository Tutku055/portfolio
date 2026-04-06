import React from "react";
import { motion } from "framer-motion";
import type { MilestoneData } from "./milestoneData";

interface MilestoneMarkerProps {
  milestone: MilestoneData;
  /** Whether the label sits above (true) or below (false) the road */
  above: boolean;
  onClick: () => void;
  index: number;
  /** Horizontal position along the road (0-100) */
  leftPercent: number;
}

const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  milestone,
  above,
  onClick,
  index,
  leftPercent,
}) => {
  const stepLabel = String(milestone.stepNumber).padStart(2, "0");

  return (
    <motion.button
      className={`ms-marker ${above ? "ms-marker--above" : "ms-marker--below"}`}
      onClick={onClick}
      style={
        {
          "--ms-glow": milestone.glowColor,
          left: `${leftPercent}%`,
          transform: "translateX(-50%)",
        } as React.CSSProperties
      }
      aria-label={`${milestone.title} — ${milestone.position}`}
    >
      {above ? (
        <>
          {/* Label above, pin below (pin sits on road) */}
          <div className="ms-label">
            <span className="ms-label-step">
              {stepLabel}.{milestone.title.toUpperCase()}
            </span>
            <span className="ms-label-period">{milestone.period}</span>
            <span className="ms-label-position">{milestone.position}</span>
          </div>
          <div className="ms-pin">
            <span className="ms-pin-number">{stepLabel}</span>
          </div>
        </>
      ) : (
        <>
          {/* Pin on road, label below */}
          <div className="ms-pin">
            <span className="ms-pin-number">{stepLabel}</span>
          </div>
          <div className="ms-label">
            <span className="ms-label-step">
              {stepLabel}.{milestone.title.toUpperCase()}
            </span>
            <span className="ms-label-period">{milestone.period}</span>
            <span className="ms-label-position">{milestone.position}</span>
          </div>
        </>
      )}
    </motion.button>
  );
};

export default MilestoneMarker;
