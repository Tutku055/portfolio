export interface MilestoneData {
  /** Auto-assigned step number — do NOT set manually */
  stepNumber?: number;
  /** Organisation / company name */
  title: string;
  /** Time period, e.g. "2022-Expected 2027" */
  period: string;
  /** Role / position title */
  position: string;
  /** Detailed description shown in the modal */
  description: string;
  /** Optional technologies / tools */
  technologies?: string[];
  /** Auto-assigned glow colour */
  glowColor?: string;
}

/**
 * Neon colour cycle following the roadmap gradient:
 * pink → purple → blue → teal → cyan
 */
const COLOR_CYCLE = [
  "#00c8ff",  // cyan (matches 15% road position)
  "#a855f7",  // purple (matches 50% road position)
  "#f8e912",  // blue (matches 85% road position)
  "#00ffa6",  // cyan-green (matches end of road)
  "#ff2d75",  // hot pink
];

/** Raw milestone entries — add as many as you want here */
const rawMilestones: Omit<MilestoneData, "stepNumber" | "glowColor">[] = [
  {
    title: "Haliç University",
    period: "2022 – Expected 2027",
    position: "3rd Year Computer Engineering Student",
    description:
      "Pursuing a Bachelor's degree in Computer Engineering. Focused on software architecture, algorithms, data structures, and system design. Active participant in university tech communities and hackathons.",
    technologies: ["C#", "Python", "Java", "SQL", "Data Structures", "Algorithms"],
  },
  {
    title: "Tezmaksan Makina",
    period: "2025 Jun – 2025 Aug",
    position: "Backend Developer Intern",
    description:
      "Summer internship focused on backend development. Contributed to internal tooling and API development, working with enterprise-level codebases and agile development practices.",
    technologies: [".NET", "C#", "REST API", "SQL Server", "Git"],
  },
  {
    title: "Google Developer Groups",
    period: "2025 – Present",
    position: "Backend Developer",
    description:
      "Active member and backend developer within Google Developer Groups. Building community-driven projects, organising workshops, and contributing to open-source initiatives.",
    technologies: ["Node.js", "Go", "Cloud", "Firebase", "Docker"],
  },
];

/** Apply step numbers and glow colours automatically */
const milestoneData: MilestoneData[] = rawMilestones.map((m, i) => ({
  ...m,
  stepNumber: i + 1,
  glowColor: COLOR_CYCLE[i % COLOR_CYCLE.length],
}));

export default milestoneData;
