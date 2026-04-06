import React from "react";
import { motion } from "framer-motion";
import { Calendar, Cpu, Factory } from "@phosphor-icons/react";
import type { ProjectData } from "./projectsData";

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  cpu: Cpu,
  factory: Factory,
};

interface DataNodeProps {
  project: ProjectData;
  onClick: () => void;
}

const DataNode: React.FC<DataNodeProps> = ({ project, onClick }) => {
  const Icon = iconMap[project.icon] ?? Calendar;
  const glowPrimary = project.glowColor ?? "#0088ff";
  const glowSecondary = project.glowColorSecondary ?? glowPrimary;

  return (
    <motion.button
      className="data-node"
      style={
        {
          "--glow-primary": glowPrimary,
          "--glow-secondary": glowSecondary,
        } as React.CSSProperties
      }
      onClick={onClick}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      aria-label={`Open project: ${project.title}`}
    >
      {/* Crystal facets (decorative) */}
      <span className="crystal-facet crystal-facet--top" />
      <span className="crystal-facet crystal-facet--bottom" />

      {/* Icon */}
      <span className="node-icon">
        <Icon size={36} weight="duotone" />
      </span>

      {/* Label */}
      <span className="node-label">{project.title}</span>
      <span className="node-tagline">{project.tagline}</span>

      {/* Animated ring */}
      <span className="node-ring" />
    </motion.button>
  );
};

export default DataNode;
