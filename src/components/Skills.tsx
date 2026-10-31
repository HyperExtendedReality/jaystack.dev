import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion, type MotionStyle } from "motion/react";
import { ArrowUpRight, Cpu, Gamepad2, Layers, Smartphone } from "lucide-react";
import { PAN_QUERY, useMediaQuery, useScrollVar } from "@/hooks/use-scroll-var";
const icons = [Layers, Smartphone, Gamepad2, Cpu];
const capabilities = [
  {
    title: "Full-stack engineering",
    label: "FROM INTERFACE TO INFRASTRUCTURE",
    description:
      "Polished product interfaces, practical APIs, and dependable data systems. I connect the pieces into one cohesive experience.",
    tools: [
      "React",
      "TypeScript",
      "Svelte",
      "Node.js",
      "PostgreSQL",
      "C# / .NET",
    ],
  },
  {
    title: "Mobile & applied AI",
    label: "INTELLIGENCE, IN YOUR POCKET",
    description:
      "Device-native experiences and useful machine learning, including optimized computer vision that works without a network connection.",
    tools: [
      "React Native",
      "Python",
      "TensorFlow",
      "YOLO",
      "On-device inference",
    ],
  },
  {
    title: "Games & immersive worlds",
    label: "BEYOND THE BROWSER",
    description:
      "Real-time worlds, multiplayer systems, and interactive 3D. Engineering that brings complex experiences to life.",
    tools: [
      "Three.js",
      "React Three Fiber",
      "C++",
      "Lua",
      "WebAssembly",
      "VR / XR",
    ],
  },
  {
    title: "Systems & developer tools",
    label: "BUILDING WHAT BUILDERS NEED",
    description:
      "Practical libraries, modern desktop tooling, and performant infrastructure. Going deeper when the problem calls for it.",
    tools: ["Rust", "C++", "SpacetimeDB", ".NET", "Git", "WebView2"],
  },
];
export default function Skills() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const progress = useScrollVar(section, ["start start", "end end"]);
  const panning = useMediaQuery(PAN_QUERY);
  const [travel, setTravel] = useState(0);
  useLayoutEffect(() => {
    const element = rail.current;
    if (!panning || !element) return setTravel(0);
    const measure = () => setTravel(Math.max(0, element.offsetWidth - (element.parentElement?.clientWidth ?? 0)));
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [panning]);
  return (
    <motion.section
      ref={section}
      id="skills"
      className="skills-section"
      aria-labelledby="skills-title"
      style={{ "--p": progress, "--travel": `${travel}px`, height: panning ? `calc(100vh + ${travel}px)` : undefined } as MotionStyle}
    >
      <div className="skills-stage">
        <div className="skills-rail" ref={rail}>
          <div className="skills-intro">
            <h2 id="skills-title">
              Different layers.
              <br />
              <em>Same obsession.</em>
            </h2>
            <p>
              Whatever the medium, the goal stays the same: make something that
              works beautifully.
            </p>
          </div>
          {capabilities.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.title} className="capability-card" style={{ "--i": index + 1 } as CSSProperties}>
                <Icon className="capability-icon" size={30} strokeWidth={1.4} aria-hidden="true" />
                <span className="mono eyebrow">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tech-tags">
                  {item.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            );
          })}
          <div className="skills-outro" style={{ "--i": capabilities.length + 1 } as CSSProperties}>
            <p>Pick a layer. <em>I’ll connect the rest.</em></p>
            <a className="text-link" href="#contact">
              Let’s talk <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
