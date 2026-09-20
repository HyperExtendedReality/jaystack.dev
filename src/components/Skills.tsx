import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
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
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <section
      id="skills"
      className="skills-section section-shell"
      aria-labelledby="skills-title"
    >
      <div className="section-kicker mono">
        <span>
          <i /> MY TOOLKIT
        </span>
      </div>
      <div className="skills-layout">
        <div>
          <h2 id="skills-title">
            Different layers.
            <br />
            <em>Same obsession.</em>
          </h2>
          <p>
            Whatever the medium, the goal stays the same:
            <br />
            make something that works beautifully.
          </p>
          <ArrowUpRight className="skills-arrow" strokeWidth={0.7} />
        </div>
        <div className="capability-list">
          {capabilities.map((item, index) => (
            <div
              key={item.title}
              className={`capability ${active === index ? "is-open" : ""}`}
            >
              <h3>
                <button
                  aria-expanded={active === index}
                  aria-controls={`capability-${index}`}
                  onClick={() => setActive(active === index ? null : index)}
                >
                  {item.title}
                  {active === index ? <Minus size={19} /> : <Plus size={19} />}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    id={`capability-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <div className="capability-body">
                      <span className="mono eyebrow">{item.label}</span>
                      <p>{item.description}</p>
                      <div className="tech-tags">
                        {item.tools.map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
