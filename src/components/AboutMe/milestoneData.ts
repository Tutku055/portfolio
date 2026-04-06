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
  "#00c8ff", // cyan (matches 15% road position)
  "#a855f7", // purple (matches 50% road position)
  "#f8e912", // blue (matches 85% road position)
  "#00ffa6", // cyan-green (matches end of road)
  "#ff2d75", // hot pink
];

/** Raw milestone entries — add as many as you want here */
const rawMilestones: Omit<MilestoneData, "stepNumber" | "glowColor">[] = [
  {
    title: "Haliç University",
    period: "2022 – Expected 2027",
    position: "3rd Year Computer Engineering Student",
    description:
      "I study Computer Engineering at this university, where I keep my academic performance high with a 3.79 GPA.",
  },
  {
    title: "Tezmaksan Makina",
    period: "2025 Jun – 2025 Aug",
    position: "Backend Developer Intern",
    description:
      "During my internship, I built a high-performance, multi-threaded CNC monitoring service in C++ from scratch to replace a legacy C# system. I managed the entire process, from ensuring real-time data flow and SQL integration to testing and deploying the system in a live factory environment.",
    technologies: [
      "C++",
      "C#",
      "SQL",
      "Multi-threading",
      "Real-time Systems",
      "Data Processing",
      "Software Architecture",
      "Software Testing",
      "Technical Documentation",
    ],
  },
  {
    title: "Google Developer Groups",
    period: "2025 – Present",
    position: "Backend Developer",
    description:
      "I collaborate with a dynamic team to brainstorm and design scalable backend architectures for community-driven, open-source projects. I actively contribute to the system design and feature ideation, particularly focusing on real-time interactive platforms.",
    technologies: [
      "C#",
      ".NET",
      "TypeScript",
      "Electron.js",
      "Backend Architecture",
      "System Design",
      "Real-time Systems",
      "Open-source Development",
    ],
  },
];

/** Apply step numbers and glow colours automatically */
const milestoneData: MilestoneData[] = rawMilestones.map((m, i) => ({
  ...m,
  stepNumber: i + 1,
  glowColor: COLOR_CYCLE[i % COLOR_CYCLE.length],
}));

export default milestoneData;
