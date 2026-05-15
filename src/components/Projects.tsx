import { useState } from "react";
import { motion } from "motion/react";
import { Github, Layers, AlertTriangle } from "lucide-react";
import FungEyeDemo from "./fungeye_demo/fungeye-demo";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      id: 4,
      title: "Infiniv",
      subtitle: "Next-Gen FiveM Fork",
      description:
        "A high-performance fork of FiveM upgrading the netcode to use SpacetimeDB and replacing the embedded CEF UI with WebView2 for maximum efficiency.",
      tech: ["C++", "Rust", "SpacetimeDB", "WebView2"],
      color: "from-violet-500 to-purple-600",
      stats: { type: "Software Dev" },
      link: "https://github.com/HyperExtendedReality/infiniv/tree/master",
      wip: true,
    },
    {
      id: 5,
      title: "Codewalker",
      subtitle: "Game World Editor",
      description:
        "A fork of the GTA V 3D Map Editor upgrading DDS handling to DirectXTexNET and migrating to .NET 9.0. Features WIP optimizations for faster world and asset loading.",
      tech: ["C#", ".NET 9.0", "DirectXTexNET", "WinForms"],
      color: "from-blue-500 to-indigo-600",
      stats: { lines: "Fork", type: "Tooling" },
      link: "https://github.com/HyperExtendedReality/CodeWalker",
    },
    {
      id: 6,
      title: "r3f-jolt",
      subtitle: "React Three Fiber Physics",
      description:
        "A high-performance bridge between React Three Fiber and Jolt Physics, enabling complex rigid body simulations in the browser via WebAssembly.",
      tech: ["React", "Three.js", "Jolt Physics", "WASM"],
      color: "from-blue-400 to-cyan-500",
      stats: { type: "Library", lines: "Open Source" },
      link: "https://github.com/HyperExtendedReality/r3f-jolt",
      wip: true,
    },
    {
      id: 8,
      title: "r3f-ammo",
      subtitle: "React Three Fiber Physics",
      description:
        "A comprehensive wrapper for Ammo.js in React Three Fiber, providing a robust physics engine integration for complex 3D web simulations.",
      tech: ["React", "Three.js", "Ammo.js", "WASM"],
      color: "from-orange-500 to-red-600",
      stats: { type: "Library" },
      link: "https://github.com/HyperExtendedReality/r3f-ammo/tree/main",
    },
    {
      id: 7,
      title: "FungEye",
      subtitle: "AI Mushroom Identifier",
      description:
        "Real-time mushroom identification using on-device machine learning (YOLO). Features offline support, community data collection, and a sleek mobile-first UI.",
      tech: ["React Native", "TensorFlow", "YOLO", "Expo"],
      color: "from-green-500 to-lime-500",
      stats: { type: "Mobile App" },
      link: "https://github.com/HyperExtendedReality/FungEye",
      demo: (
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="scale-[0.425] transform-gpu origin-center">
            <FungEyeDemo />
          </div>
        </div>
      ),
      customWidth: "lg:w-[38.5%]",
    },
    {
      id: 1,
      title: "Munchi",
      subtitle: "Headless E-Commerce",
      description:
        "An exotic snacks e-commerce platform built with a headless WordPress backend. Features dynamic inventory management, Stripe integration, and sub-second page loads.",
      tech: ["Next.js", "WordPress", "GraphQL", "Stripe"],
      color: "from-green-500 to-emerald-600",
      stats: { type: "Full-Stack" },
    },
    {
      id: 2,
      subtitle: "FiveM Server Infrastructure",
      title: "GTA:Rewind Lead Developer",
      description:
        "Led FiveM Lua backend development for GTA:Rewind, building gameplay systems, server-side resources, database-backed features, and performance-focused client/server workflows for a high-concurrency roleplay environment.",
      tech: [
        "Lua",
        "C#",
        "React",
        "TypeScript",
        "JavaScript",
        "HTML/CSS",
        "jQuery",
        "MariaDB",
        "MongoDB",
        "PostgreSQL",
      ],
      color: "from-emerald-500 to-teal-600",
      stats: { type: "Game Dev" },
    },
    {
      id: 9,
      title: "UnleashedRP Lead Developer",
      subtitle: "FiveM Roleplay Server",
      description:
        "Led full-stack development for UnleashedRP, building gameplay systems, database-backed server resources, admin tooling, and interactive NUI experiences across client and server workflows.",
      tech: ["Svelte", "React", "TypeScript", "SQL", "Lua", "JavaScript"],
      color: "from-rose-500 to-orange-500",
      stats: { type: "Full-Stack" },
    },
    {
      id: 3,
      title: "Portfolio V3",
      subtitle: "Web Portfolio",
      description:
        "The site you're viewing now. A showcase of modern web capabilities featuring 3D elements, glassmorphism, and smooth framer motion animations.",
      tech: ["React", "Three.js", "Tailwind", "Vite"],
      color: "from-teal-500 to-cyan-600",
      stats: { type: "Front-End" },
    },
  ];

  return (
    <section id="projects" className="py-4 px-4 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of work demonstrating full-stack capabilities and
            attention to detail.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() =>
                project.link && window.open(project.link, "_blank")
              }
              className={`group relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden w-full ${
                project.customWidth || "lg:w-[30%]"
              } ${project.link ? "cursor-pointer" : ""}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <div
                className={`p-8 relative z-10 h-full flex ${
                  project.demo
                    ? "flex-col lg:flex-row gap-8 items-center"
                    : "flex-col"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    project.demo ? "lg:w-[55%]" : "w-full"
                  } h-full`}
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-10 inline-block`}
                      >
                        <Layers className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/5">
                          {project.stats.type}
                        </span>
                        {/* @ts-ignore */}
                        {project.wip && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            WIP
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      {project.title}
                      {project.link && (
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      )}
                    </h3>

                    <p
                      className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${project.color}`}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-gray-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Demo Content Container */}
                {project.demo && (
                  <div className="lg:w-[45%] w-full aspect-[4/3] lg:aspect-square relative bg-black/50 rounded-xl overflow-hidden border border-white/5 shadow-inner flex items-center justify-center self-center lg:self-stretch">
                    {project.demo}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
