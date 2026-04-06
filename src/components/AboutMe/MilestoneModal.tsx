import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { MilestoneData } from "./milestoneData";

interface MilestoneModalProps {
  milestone: MilestoneData | null;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 30,
    transition: { duration: 0.2 },
  },
};

const MilestoneModal: React.FC<MilestoneModalProps> = ({
  milestone,
  onClose,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (milestone) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [milestone, handleKeyDown]);

  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          className="milestone-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="milestone-modal"
            style={
              {
                "--ms-glow": milestone.glowColor,
              } as React.CSSProperties
            }
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={milestone.title}
          >
            {/* Close button */}
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Step badge */}
            <div className="ms-modal-step-badge" aria-hidden>
              {String(milestone.stepNumber).padStart(2, "0")}
            </div>

            {/* Header */}
            <div className="ms-modal-header">
              <h2 className="ms-modal-title">{milestone.title}</h2>
              <span className="ms-modal-period">{milestone.period}</span>
              <span className="ms-modal-position">{milestone.position}</span>
            </div>

            {/* Description */}
            <div className="modal-section">
              <h3 className="modal-section-title">About</h3>
              <p className="modal-description">{milestone.description}</p>
            </div>

            {/* Technologies */}
            {milestone.technologies && milestone.technologies.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Technologies</h3>
                <div className="modal-tech-grid">
                  {milestone.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-badge"
                      style={
                        {
                          "--modal-glow": milestone.glowColor,
                        } as React.CSSProperties
                      }
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MilestoneModal;
