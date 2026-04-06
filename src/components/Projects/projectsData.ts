export interface ProjectData {
  id: string;
  title: string;
  /** Short tagline shown on the node */
  tagline: string;
  /** Full description shown in the modal */
  description: string;
  /** Phosphor icon identifier */
  icon: "brain" | "graph" | "bookOpen";
  /** Technologies / tools used */
  technologies: string[];
  /** Image URLs or paths for the gallery */
  images: string[];
  /** Auto-assigned at runtime — do NOT set manually */
  glowColor?: string;
  glowColorSecondary?: string;
}

/**
 * Neon colour cycle: blue → green → blue → green → …
 * Projects with an index that falls on (index % 3 === 2) get a mixed glow.
 */
const COLOR_CYCLE = [
  { primary: "#0088ff", secondary: "#0088ff" },   // blue
  { primary: "#00ffa6", secondary: "#00ffa6" },   // green
  { primary: "#0088ff", secondary: "#00ffa6" },   // mixed
];

/** Raw project entries — add as many as you want here */
const rawProjects: Omit<ProjectData, "glowColor" | "glowColorSecondary">[] = [
  {
    id: "neurotasker",
    title: "NeuroTasker",
    tagline: "AI-Powered Task Management",
    description:
      "AI-powered task management with brain-computer interface (BCI) integration. Uses .NET & Python backend with Clean Architecture. Features intelligent task prioritisation, EEG-based focus detection, and natural language processing for task creation.",
    icon: "brain",
    technologies: [".NET 8", "Python", "Clean Architecture", "SignalR", "SQLite", "EEG/BCI"],
    images: [],
  },
  {
    id: "p2p-network",
    title: "P2P Network",
    tagline: "Decentralised Connectivity",
    description:
      "Decentralised peer-to-peer connectivity layer with NAT traversal, STUN/TURN servers, and SignalR relay fallback. Enables direct communication between peers on different networks with automatic connection negotiation.",
    icon: "graph",
    technologies: ["C#", "SignalR", "WebRTC", "UDP/TCP", "Blazor", "STUN/TURN"],
    images: [],
  },
  {
    id: "scientific-paper",
    title: "Scientific Paper",
    tagline: "Research & Publication Platform",
    description:
      "Research publication platform with LaTeX rendering, interactive graphs, and collaborative review workflows. Supports real-time co-editing, version control for manuscripts, and automated citation management.",
    icon: "bookOpen",
    technologies: ["React", "LaTeX", "D3.js", "Node.js", "PostgreSQL", "WebSocket"],
    images: [],
  },
];

/** Apply the blue-green-blue colour cycle automatically */
const projectsData: ProjectData[] = rawProjects.map((p, i) => {
  const colors = COLOR_CYCLE[i % COLOR_CYCLE.length];
  return {
    ...p,
    glowColor: colors.primary,
    glowColorSecondary: colors.secondary,
  };
});

export default projectsData;
