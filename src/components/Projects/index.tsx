import React, { useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import "./Projects.css";

import NeonLights from "../NeonLights";
import projectsData, { ProjectData } from "./projectsData";
import DataNode from "./DataNode";
import DataNodeCanvas from "./DataNodeCanvas";
import ProjectModal from "./ProjectModal";

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );

  /* Scroll-driven opacity */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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

  const handleOpen = useCallback((p: ProjectData) => setSelectedProject(p), []);
  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section
        ref={sectionRef}
        className="projects-section"
        id="projects"
      >
        <NeonLights opacity={backgroundOpacity} />

        <div
          className="projects-container"
          style={{ opacity: contentOpacity as any }}
        >
          <div className="projects-header">
            <h2 className="projects-title">Projects</h2>
          </div>

          {/* Scene */}
          <div className="projects-scene">
            {/* Canvas particle streams (hidden on mobile) */}
            <DataNodeCanvas projects={projectsData} activeId={null} />

            {/* Data nodes — wraps automatically for any number of projects */}
            <div className="nodes-grid">
              {projectsData.map((p) => (
                <DataNode
                  key={p.id}
                  project={p}
                  onClick={() => handleOpen(p)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal — rendered outside section so it overlays everything */}
      <ProjectModal project={selectedProject} onClose={handleClose} />
    </>
  );
};

export default Projects;
