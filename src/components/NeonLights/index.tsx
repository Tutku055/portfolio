import React from "react";
import { motion, MotionValue } from "framer-motion";
import "./NeonLights.css";

interface NeonLightsProps {
  opacity: MotionValue<number>;
}

const NeonLights: React.FC<NeonLightsProps> = ({ opacity }) => {
  return (
    <>
      <motion.div
        className="neon-bg-overlay"
        style={{ opacity }}
        aria-hidden="true"
      />
      <motion.div
        className="neon-pillars-wrapper"
        style={{ opacity }}
        aria-hidden="true"
      >
        <div className="neon-pillar left-pillar">
          <div className="neon-tube"></div>
          <div className="particle-cloud"></div>
          <div className="energy-flow"></div>
        </div>
        <div className="neon-pillar right-pillar">
          <div className="neon-tube"></div>
          <div className="particle-cloud"></div>
          <div className="energy-flow"></div>
        </div>
      </motion.div>
    </>
  );
};

export default NeonLights;
