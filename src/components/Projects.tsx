import { useState } from "react";
import { motion } from "motion/react";
import { Github, Layers, Zap } from "lucide-react";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects = [
    {
      id: 4,
      title: "Infiniv",
      subtitle: "Next-Gen FiveM Fork",
      description: "A high-performance fork of FiveM upgrading the netcode to use SpacetimeDB and replacing the embedded CEF UI with Ultralight for maximum efficiency.",
      tech: ["C++", "Rust", "SpacetimeDB", "Ultralight"],
      color: "from-violet-500 to-purple-600",
      stats: {type: "Software Dev" },
      link: "https://github.com/HyperExtendedReality/infiniv/tree/master"
    },
    {
      id: 5,
      title: "Codewalker",
      subtitle: "Game World Editor",
      description: "A fork of the GTA V 3D Map Editor upgrading DDS handling to DirectXTexNET and migrating to .NET 9.0. Features WIP optimizations for faster world and asset loading.",
      tech: ["C#", ".NET 9.0", "DirectXTexNET", "WinForms"],
      color: "from-blue-500 to-indigo-600",
      stats: { lines: "Fork", type: "Tooling" },
      link: "https://github.com/HyperExtendedReality/CodeWalker"
    },
    {
      id: 1,
      title: "Munchi",
      subtitle: "Headless E-Commerce",
      description: "An exotic snacks e-commerce platform built with a headless WordPress backend. Features dynamic inventory management, Stripe integration, and sub-second page loads.",
      tech: ["Next.js", "WordPress", "GraphQL", "Stripe"],
      color: "from-green-500 to-emerald-600",
      stats: { type: "Full-Stack" }
    },
    {
      id: 2,
      title: "GTA:Rewind Lead Developer",
      subtitle: "FiveM Server Infrastructure",
      description: "Engineered a high-concurrency server architecture for GTA:Rewind, optimizing Lua/C# and NUI/DUI interfaces across both client and server to sustain peak performance under heavy loads, while fortifying the network via a custom Cloudflare Proxy and Tunnel system to ensure resilient DDoS mitigation without compromising latency.",
      tech: ["Lua", "C#", "React", "TypeScript", "JavaScript", "HTML/CSS", "jQuery", "MariaDB", "MongoDB", "PostgreSQL"],
      color: "from-emerald-500 to-teal-600",
      stats: {type: "Game Dev" }
    },
    {
      id: 3,
      title: "Portfolio V3",
      subtitle: "Web Portfolio",
      description: "The site you're viewing now. A showcase of modern web capabilities featuring 3D elements, glassmorphism, and smooth framer motion animations.",
      tech: ["React", "Three.js", "Tailwind", "Vite"],
      color: "from-teal-500 to-cyan-600",
      stats: {type: "Front-End" }
    }
  ];

  return (
    <section id="projects" className="py-4 px-4 relative">
      {/* Background Gradients */}
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
            A selection of work demonstrating full-stack capabilities and attention to detail.
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
              /* 1. Added onClick handler to open link */
              onClick={() => project.link && window.open(project.link, '_blank')}
              /* 2. Added cursor-pointer only if link exists */
              className={`group relative rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden w-full lg:w-[30%] ${
                project.link ? "cursor-pointer" : ""
              }`}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="p-8 relative z-10 h-full flex flex-col">
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
                    </div>
                  </div>

                  {/* 3. Updated h3 to use flexbox for alignment */}
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {project.title}
                    {project.link && (
                      /* Moved Icon here. Removed nested <a> tag since parent div is clickable, 
                        but kept visual styles */
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

                <div className="space-y-6">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
