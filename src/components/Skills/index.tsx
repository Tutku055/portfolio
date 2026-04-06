import React from "react";
import { motion } from "framer-motion";
import Particles from "../Particles";
import "./Skills.css";

/* ─── Skill Data ─────────────────────────────────────────── */

interface Skill {
  name: string;
  icon: string;
  glowColor?: string;
  glowSecondary?: string;
}

// Alternating teal / cyan glow per item
const teal = "#34f4c2";
const cyan = "#4fd9ff";

const languages: Skill[] = [
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "HTML/CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "SQL",
    icon: "https://api.iconify.design/fa6-solid:database.svg?color=white",
    glowColor: cyan,
    glowSecondary: teal,
  },
];

const tools: Skill[] = [
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "n8n",
    icon: "https://avatars.githubusercontent.com/u/45487711?s=200&v=4",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "Visual Studio",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-plain.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "Antigravity",
    icon: "/portfolio/antigravity_icon.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "Claude Code",
    icon: "https://api.iconify.design/mdi:space-invaders.svg?color=%23d0694b",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "GitHub CLI",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/githubcopilot.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "Gemini CLI",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlegemini.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "MCP Servers",
    icon: "https://avatars.githubusercontent.com/u/182288589?s=200&v=4",
    glowColor: cyan,
    glowSecondary: teal,
  },
];

const frameworks: Skill[] = [
  {
    name: "ASP.NET Core",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "EF Core",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nuget.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
];

const concepts: Skill[] = [
  {
    name: "Clean Architecture",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hexo.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "N-Tier",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/buffer.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "REST API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "DB Design",
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/diagramsdotnet.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "Networking",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
  {
    name: "ML Training",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
    glowColor: cyan,
    glowSecondary: teal,
  },
  {
    name: "Data Mining",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
    glowColor: teal,
    glowSecondary: cyan,
  },
];

/* ─── Category Data ──────────────────────────────────────── */

interface Category {
  label: string;
  skills: Skill[];
}

const categories: Category[] = [
  { label: "Languages", skills: languages },
  { label: "Tools", skills: tools },
  { label: "Frameworks", skills: frameworks },
  { label: "Concepts", skills: concepts },
];

/* ─── Hex Cell Component ─────────────────────────────────── */

const HexCell: React.FC<{ skill: Skill }> = ({ skill }) => {
  const glow1 = skill.glowColor ?? cyan;
  const glow2 = skill.glowSecondary ?? teal;

  return (
    <motion.div
      className="hex-node"
      style={
        {
          "--glow-primary": glow1,
          "--glow-secondary": glow2,
        } as React.CSSProperties
      }
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {/* Crystal facets */}
      <span className="hex-facet hex-facet--top" />
      <span className="hex-facet hex-facet--bottom" />

      {/* Content */}
      <img
        src={skill.icon}
        alt={skill.name}
        className="hex-icon"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="hex-label">{skill.name}</span>

      {/* Animated ring */}
      <span className="hex-ring" />
    </motion.div>
  );
};

/* ─── Hex Grid ───────────────────────────────────────────── */

const HexGrid: React.FC<{ skills: Skill[] }> = ({ skills }) => (
  <div className="hex-grid">
    {skills.map((skill) => (
      <HexCell key={skill.name} skill={skill} />
    ))}
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */

export const Skills: React.FC = () => (
  <section className="skills-section" id="skills">
    <Particles />

    <div className="skills-container">
      <div className="skills-header">
        <h2 className="neon-text-skills">Skills</h2>
      </div>

      {categories.map((cat) => (
        <div key={cat.label} className="skill-category">
          <h3 className="category-title">{cat.label}</h3>
          <HexGrid skills={cat.skills} />
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
