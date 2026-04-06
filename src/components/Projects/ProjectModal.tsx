import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import type { ProjectData } from "./projectsData";

interface ProjectModalProps {
  project: ProjectData | null;
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

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  /* Close on ESC */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImg) {
          setLightboxImg(null);
        } else {
          onClose();
        }
      }
    },
    [onClose, lightboxImg],
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="project-modal"
            style={
              {
                "--modal-glow": project.glowColor,
                "--modal-glow-secondary": project.glowColorSecondary,
              } as React.CSSProperties
            }
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* Close button */}
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">{project.title}</h2>
              <span className="modal-tagline">{project.tagline}</span>
            </div>

            {/* Description */}
            <div className="modal-section">
              <h3 className="modal-section-title">About</h3>
              <p className="modal-description">{project.description}</p>
            </div>

            {/* Technologies */}
            <div className="modal-section">
              <h3 className="modal-section-title">Technologies</h3>
              <div className="modal-tech-grid">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            {project.images.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Gallery</h3>
                <div className="modal-gallery">
                  {project.images.map((src, i) => (
                    <button
                      key={i}
                      className="gallery-thumb"
                      onClick={() => setLightboxImg(src)}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Lightbox for full-size image viewing */}
          <AnimatePresence>
            {lightboxImg && (
              <motion.div
                className="lightbox-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImg(null);
                }}
              >
                <img
                  src={lightboxImg}
                  alt="Full size preview"
                  className="lightbox-image"
                />
                <button
                  className="lightbox-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImg(null);
                  }}
                  aria-label="Close image"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
