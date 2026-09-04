import { motion } from "motion/react";
import { AlertTriangle, ArrowUpRight, Github, Layers3, MousePointer2, ScanLine, Sparkles } from "lucide-react";
import FungEyeDemo from "./fungeye_demo/fungeye-demo";

type Project = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  contribution: string;
  tech: string[];
  accent: string;
  type: string;
  link?: string;
  wip?: boolean;
};

const featuredProject: Project = {
  number: "01",
  title: "FungEye",
  subtitle: "Offline mobile vision",
  description: "A mobile mushroom identifier built around an optimized YOLO model—fast, focused, and designed to work without a network connection.",
  contribution: "Designed the product, integrated on-device inference, and built the complete capture-to-identification experience.",
  tech: ["React Native", "TensorFlow", "YOLO", "On-device ML"],
  accent: "#c8ff4a",
  type: "Mobile AI",
  link: "https://github.com/HyperExtendedReality/FungEye",
};

const projects: Project[] = [
  {
    number: "02",
    title: "Infiniv",
    subtitle: "Next-generation FiveM infrastructure",
    description: "A systems-level rethinking of FiveM infrastructure around faster networking, a modern data layer, and a leaner embedded UI.",
    contribution: "Exploring an architecture that connects C++ and Rust with SpacetimeDB and WebView2.",
    tech: ["C++", "Rust", "SpacetimeDB", "WebView2"],
    accent: "#b8a1ff",
    type: "Systems",
    link: "https://github.com/HyperExtendedReality/infiniv/tree/master",
    wip: true,
  },
  {
    number: "03",
    title: "CodeWalker",
    subtitle: "Game-world tooling",
    description: "Modernizing a mature GTA V world editor with a current .NET toolchain, upgraded texture handling, and faster asset workflows.",
    contribution: "Updated core rendering dependencies while preserving the desktop workflows users rely on.",
    tech: ["C#", ".NET 9", "DirectXTexNET", "WinForms"],
    accent: "#69d2ff",
    type: "Desktop tooling",
    link: "https://github.com/HyperExtendedReality/CodeWalker",
  },
  {
    number: "04",
    title: "r3f-jolt",
    subtitle: "Declarative 3D physics",
    description: "A WebAssembly bridge that brings high-performance Jolt rigid-body physics into React Three Fiber.",
    contribution: "Connecting a low-level physics engine to React’s declarative 3D ecosystem through a practical library API.",
    tech: ["React", "Three.js", "Jolt", "WASM"],
    accent: "#69d2ff",
    type: "Open source",
    link: "https://github.com/HyperExtendedReality/r3f-jolt",
    wip: true,
  },
  {
    number: "05",
    title: "GTA:Rewind",
    subtitle: "High-concurrency game platform",
    description: "Backend and gameplay development for a high-concurrency FiveM roleplay environment.",
    contribution: "Led server architecture and shipped gameplay systems across Lua, C#, React, and PostgreSQL.",
    tech: ["Lua", "C#", "React", "PostgreSQL"],
    accent: "#ff9e80",
    type: "Lead developer",
  },
  {
    number: "06",
    title: "UnleashedRP",
    subtitle: "Full-stack roleplay platform",
    description: "Gameplay systems, server resources, admin tooling, and interactive NUI built as one connected platform.",
    contribution: "Led delivery from data and game logic through player-facing Svelte interfaces.",
    tech: ["Svelte", "TypeScript", "SQL", "Lua"],
    accent: "#ffd66b",
    type: "Lead developer",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
    className="group relative flex min-h-[27rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#111411]/85 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/18 sm:p-8"
  >
    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.07] blur-3xl transition-opacity group-hover:opacity-[0.13]" style={{ backgroundColor: project.accent }} />
    <div className="absolute inset-x-0 top-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} />
    <div className="relative flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: project.accent }}>/{project.number} · {project.type}</span>
        <div className="flex items-center gap-2">
          {project.wip && <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/15 bg-amber-200/[0.06] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-amber-100/60"><AlertTriangle className="h-3 w-3" /> Building</span>}
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-black/20" style={{ color: project.accent }}><Layers3 className="h-4 w-4" /></span>
        </div>
      </div>
      <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/28">{project.subtitle}</p>
      <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#f4f1e8] sm:text-4xl">{project.title}</h3>
      <p className="mt-5 max-w-xl text-sm leading-6 text-white/45 sm:text-base sm:leading-7">{project.description}</p>
      <div className="my-6 h-px bg-white/[0.07]" />
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/22">My role</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{project.contribution}</p>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
        <div className="flex flex-wrap gap-1.5">{project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/[0.075] bg-black/20 px-2.5 py-1 text-[9px] text-white/45">{tech}</span>)}</div>
        {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 transition hover:text-white focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff4a]" aria-label={`View ${project.title} source on GitHub`}><Github className="h-4 w-4" /> Source <ArrowUpRight className="h-3.5 w-3.5" /></a>}
      </div>
    </div>
  </motion.article>
);

const Projects = () => (
  <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
    <div className="relative mx-auto max-w-[88rem]">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8ff4a]">Selected work · 06</p><h2 id="projects-title" className="mt-4 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#f4f1e8] sm:text-6xl lg:text-7xl">Built across layers. <span className="display-serif font-normal italic text-white/38">Shipped as products.</span></h2></div>
        <p className="max-w-xl text-base leading-7 text-white/45 lg:justify-self-end">A cross-section of mobile AI, open-source libraries, desktop tooling, real-time infrastructure, and full-stack game platforms.</p>
      </motion.div>

      <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} className="relative grid overflow-hidden rounded-[2rem] border border-[#c8ff4a]/18 bg-[#10130f] shadow-[0_35px_100px_rgba(0,0,0,0.3)] lg:grid-cols-[1.04fr_0.96fr]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(200,255,74,0.11),transparent_30%)]" />
        <div className="relative flex flex-col justify-center p-6 sm:p-9 lg:p-12 xl:p-16">
          <div className="flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-2 rounded-full bg-[#c8ff4a] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0b0d0c]"><Sparkles className="h-3 w-3" /> Featured build</span><span className="rounded-full border border-white/[0.08] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">{featuredProject.type}</span></div>
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c8ff4a]">/{featuredProject.number} · {featuredProject.subtitle}</p>
          <h3 className="mt-3 text-5xl font-semibold tracking-[-0.06em] text-[#f4f1e8] sm:text-6xl">{featuredProject.title}</h3>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/48 sm:text-lg sm:leading-8">{featuredProject.description}</p>
          <div className="mt-7 border-l border-[#c8ff4a]/35 pl-4"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">My role</p><p className="mt-2 max-w-xl text-sm leading-6 text-white/68">{featuredProject.contribution}</p></div>
          <div className="mt-7 flex flex-wrap gap-2">{featuredProject.tech.map((tech) => <span key={tech} className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[10px] text-white/50">{tech}</span>)}</div>
          <a href={featuredProject.link} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:border-[#c8ff4a]/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff4a]"><Github className="h-4 w-4" /> Explore the source <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>

        <div className="relative flex min-h-[36rem] items-center justify-center overflow-hidden border-t border-white/[0.07] bg-black/20 p-8 sm:min-h-[44rem] lg:min-h-0 lg:border-l lg:border-t-0">
          <div className="absolute left-6 top-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/25"><ScanLine className="h-3.5 w-3.5 text-[#c8ff4a]" /> Interactive product preview</div>
          <div className="absolute bottom-6 right-6 hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/20 sm:flex"><MousePointer2 className="h-3.5 w-3.5" /> Try it</div>
          <div className="relative z-10 w-full max-w-[16rem] sm:max-w-[19rem]"><FungEyeDemo /></div>
        </div>
      </motion.article>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}
      </div>
    </div>
  </section>
);

export default Projects;
