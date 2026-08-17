import { motion } from "motion/react";
import { AlertTriangle, ArrowUpRight, Github, Layers, ScanLine, Sparkles } from "lucide-react";
import FungEyeDemo from "./fungeye_demo/fungeye-demo";

type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  contribution: string;
  tech: string[];
  color: string;
  type: string;
  link?: string;
  wip?: boolean;
};

const featuredProject: Project = {
  id: 7,
  title: "FungEye",
  subtitle: "AI Mushroom Identifier",
  description:
    "An offline-first mobile vision app using an optimized YOLO model for fast mushroom identification without depending on a network connection.",
  contribution:
    "Designed the mobile product, integrated on-device inference, and built the capture-to-identification experience.",
  tech: ["React Native", "TensorFlow", "YOLO", "On-device ML"],
  color: "from-green-400 to-lime-400",
  type: "Mobile AI",
  link: "https://github.com/HyperExtendedReality/FungEye",
};

const projects: Project[] = [
  {
    id: 4,
    title: "Infiniv",
    subtitle: "Next-Gen FiveM Fork",
    description:
      "Reworking FiveM infrastructure around faster networking, a modern data layer, and a leaner embedded UI.",
    contribution:
      "Exploring a systems-level architecture that pairs C++ and Rust with SpacetimeDB and WebView2.",
    tech: ["C++", "Rust", "SpacetimeDB", "WebView2"],
    color: "from-violet-400 to-fuchsia-500",
    type: "Systems",
    link: "https://github.com/HyperExtendedReality/infiniv/tree/master",
    wip: true,
  },
  {
    id: 5,
    title: "Codewalker",
    subtitle: "Game World Editor",
    description:
      "Modernizing a GTA V world editor with .NET 9, upgraded texture handling, and faster asset workflows.",
    contribution:
      "Updated the toolchain and core rendering dependencies while preserving a mature desktop workflow.",
    tech: ["C#", ".NET 9.0", "DirectXTexNET", "WinForms"],
    color: "from-blue-400 to-indigo-500",
    type: "Tooling",
    link: "https://github.com/HyperExtendedReality/CodeWalker",
  },
  {
    id: 6,
    title: "r3f-jolt",
    subtitle: "React Three Fiber Physics",
    description:
      "A WebAssembly bridge bringing high-performance Jolt rigid-body physics into React Three Fiber.",
    contribution:
      "Connecting a low-level physics engine to React's declarative 3D ecosystem through a practical library API.",
    tech: ["React", "Three.js", "Jolt Physics", "WASM"],
    color: "from-cyan-400 to-sky-500",
    type: "Open source",
    link: "https://github.com/HyperExtendedReality/r3f-jolt",
    wip: true,
  },
  {
    id: 2,
    title: "GTA:Rewind",
    subtitle: "Lead Developer · FiveM Infrastructure",
    description:
      "Led backend and gameplay development for a high-concurrency FiveM roleplay environment.",
    contribution:
      "Owned server architecture and shipped gameplay systems across Lua, C#, React, and PostgreSQL.",
    tech: ["Lua", "C#", "React", "PostgreSQL"],
    color: "from-emerald-400 to-teal-500",
    type: "Game systems",
  },
  {
    id: 9,
    title: "UnleashedRP",
    subtitle: "Lead Developer · Roleplay Platform",
    description:
      "Built gameplay systems, server resources, admin tooling, and interactive NUI across the full stack.",
    contribution:
      "Led delivery from data and game logic through the player-facing Svelte interfaces.",
    tech: ["Svelte", "TypeScript", "SQL", "Lua"],
    color: "from-rose-400 to-orange-500",
    type: "Full stack",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
    whileHover={{ y: -4 }}
    className="group relative mb-5 inline-block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080a08] p-5 align-top shadow-xl shadow-black/15 transition-colors hover:border-white/20 sm:p-6"
  >
    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.045] transition-opacity duration-500 group-hover:opacity-[0.1]`} />
    <div className="relative">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${project.color} p-2.5 shadow-lg shadow-black/25`}>
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
            {project.type}
          </span>
          {project.wip && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/15 bg-amber-300/[0.07] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-200/70">
              <AlertTriangle className="h-3 w-3" /> In progress
            </span>
          )}
        </div>
      </div>

      <p className={`mb-2 bg-gradient-to-r ${project.color} bg-clip-text text-[11px] font-medium uppercase tracking-[0.13em] text-transparent`}>
        {project.subtitle}
      </p>
      <h3 className="text-2xl font-semibold tracking-[-0.025em] text-white">{project.title}</h3>
      <p className="mt-4 text-sm leading-6 text-white/52">{project.description}</p>

      <div className="my-5 h-px bg-gradient-to-r from-white/10 to-transparent" />
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">My work</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{project.contribution}</p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-md border border-white/[0.07] bg-black/30 px-2.5 py-1 text-[10px] text-white/50">
            {tech}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white/55 transition-colors hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
          aria-label={`View ${project.title} source on GitHub`}
        >
          <Github className="h-4 w-4" /> View source <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  </motion.article>
);

const Projects = () => (
  <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
    <div className="pointer-events-none absolute left-1/2 top-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-green-500/[0.055] blur-3xl sm:h-[55rem] sm:w-[55rem]" />

    <div className="relative z-10 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-green-400">Selected projects / 06</p>
        <h2 id="projects-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
          Work that shows how I build.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50">
          Real products, open-source tools, and production systems spanning mobile AI, real-time 3D, and game infrastructure.
        </p>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="group relative mb-5 grid overflow-hidden rounded-[2rem] border border-green-300/15 bg-[#070a07] shadow-2xl shadow-black/30 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.8fr)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(132,204,22,0.12),transparent_34%)]" />
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-300/15 bg-green-300/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-green-200/75">
              <Sparkles className="h-3 w-3" /> Featured project
            </span>
            <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
              {featuredProject.type}
            </span>
          </div>

          <p className={`mb-3 bg-gradient-to-r ${featuredProject.color} bg-clip-text text-[11px] font-medium uppercase tracking-[0.16em] text-transparent`}>
            {featuredProject.subtitle}
          </p>
          <h3 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">{featuredProject.title}</h3>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/55">{featuredProject.description}</p>

          <div className="mt-7 border-l border-green-300/25 pl-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-200/45">My work</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/68">{featuredProject.contribution}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {featuredProject.tech.map((tech) => (
              <span key={tech} className="rounded-md border border-white/[0.08] bg-black/25 px-2.5 py-1 text-[10px] text-white/55">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={featuredProject.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-medium text-white/75 transition hover:border-green-300/25 hover:bg-green-300/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
            >
              <Github className="h-4 w-4" /> View source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
              <ScanLine className="h-3.5 w-3.5 text-green-300/60" /> Try the live preview
            </span>
          </div>
        </div>

        <div className="relative flex min-h-[34rem] items-center justify-center overflow-hidden border-t border-white/[0.07] bg-black/25 px-5 py-8 sm:min-h-[42rem] sm:px-10 lg:min-h-0 lg:border-l lg:border-t-0 lg:px-8 xl:px-12">
          <div className="pointer-events-none absolute inset-x-[12%] top-[14%] h-[58%] rounded-full bg-lime-300/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-5 rounded-[1.5rem] border border-white/[0.045]" />
          <div className="relative z-10 w-full max-w-[15.5rem] sm:max-w-[18rem] lg:max-w-[17rem] xl:max-w-[19rem]">
            <FungEyeDemo />
          </div>
        </div>
      </motion.article>

      <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
