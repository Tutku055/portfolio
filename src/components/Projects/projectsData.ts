export interface ProjectData {
  id: string;
  title: string;
  /** Short tagline shown on the node */
  tagline: string;
  /** Full description shown in the modal */
  description: string;
  /** Phosphor icon identifier */
  icon: "calendar" | "cpu" | "factory";
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
 */
const COLOR_CYCLE = [
  { primary: "#0088ff", secondary: "#0088ff" }, // blue
  { primary: "#00ffa6", secondary: "#00ffa6" }, // green
];

/** Raw project entries — add as many as you want here */
const rawProjects: Omit<ProjectData, "glowColor" | "glowColorSecondary">[] = [
  {
    id: "leave-management-system",
    title: "Leave Management System",
    tagline: "Visualized HR Management",
    description:
      "A robust desktop application developed for an industrial firm to automate and streamline the management and scheduling of employee leave requests. Built with WPF and MSSQL, the system ensures secure data persistence and an intuitive interface for optimizing administrative HR workflows.",
    icon: "calendar",
    technologies: [
      ".NET",
      "WPF",
      "C#",
      "MSSQL",
      "SQL Server",
      "Desktop Development",
    ],
    images: [
      "/portfolio/images/LMS/LMS1.jpeg",
      "/portfolio/images/LMS/LMS2.jpeg",
      "/portfolio/images/LMS/LMS3.jpeg",
      "/portfolio/images/LMS/LMS4.jpeg",
      "/portfolio/images/LMS/LMS5.jpeg",
      "/portfolio/images/LMS/LMS6.jpeg",
    ],
  },
  {
    id: "5g-resource-allocation-optimizer",
    title: "5G Resource Allocation Optimizer",
    tagline: "AI-Driven Network Efficiency",
    description:
      "Developed a machine learning-based optimizer that dynamically allocates 5G network resources based on application requirements and real-time metrics. Leveraging FastAPI for the backend and Scikit-learn for predictive modeling, the project features comprehensive performance comparisons to ensure high-efficiency allocation.",
    icon: "cpu",
    technologies: [
      "Python",
      "FastAPI",
      "Machine Learning",
      "Scikit-learn",
      "5G Networks",
      "Data Analysis",
    ],
    images: [
      "/portfolio/images/5G/M5G1.png",
      "/portfolio/images/5G/M5G2.png",
      "/portfolio/images/5G/M5G3.png",
      "/portfolio/images/5G/M5G4.png",
    ],
  },
  {
    id: "cnc-monitoring-service",
    title: "CNC Monitoring Service",
    tagline: "Real-Time Industry Monitoring",
    description:
      "A high-performance C++ API designed for real-time monitoring of multiple CNC machines via the FANUC library. It utilizes multi-threading to track efficiency metrics, production counts, and alarm statuses, logging processed data to MSSQL for industrial analytics.",
    icon: "factory",
    technologies: [
      "C++",
      "MSSQL",
      "Multithreading",
      "Industrial IoT",
      "FANUC FOCAS",
      "Real-time Systems",
    ],
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
