import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Activity, BrainCircuit, Cpu, Gamepad2, Layers3, Network, Smartphone } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiGo,
  SiJavascript,
  SiLua,
  SiPython,
  SiReact,
  SiRust,
  SiSharp,
  SiTensorflow,
  SiThreedotjs,
  SiTypescript,
  SiWebassembly,
} from "react-icons/si";

type Specialization = {
  code: string;
  title: string;
  eyebrow: string;
  description: string;
  signal: string;
  icon: LucideIcon;
  skills: string[];
  desktopPosition: string;
  accent: string;
  iconColor: string;
};

type Tool = {
  label: string;
  icon: IconType;
  color: string;
};

const specializations: Specialization[] = [
  {
    code: "01",
    title: "Full-Stack Web",
    eyebrow: "Product systems",
    description: "Interfaces, APIs, and data designed as one dependable product.",
    signal: "Interface ↔ infrastructure",
    icon: Layers3,
    skills: ["React / Next.js", "APIs", "Data systems"],
    desktopPosition: "left-[4%] top-[8%] w-[29%]",
    accent: "from-green-400/20 via-green-400/5 to-transparent",
    iconColor: "text-green-300",
  },
  {
    code: "02",
    title: "AI / ML Systems",
    eyebrow: "Applied intelligence",
    description: "From model training and optimization to useful production inference.",
    signal: "Training ↔ inference",
    icon: BrainCircuit,
    skills: ["Model training", "Computer vision", "Inference"],
    desktopPosition: "right-[4%] top-[8%] w-[29%]",
    accent: "from-cyan-400/20 via-cyan-400/5 to-transparent",
    iconColor: "text-cyan-300",
  },
  {
    code: "03",
    title: "Game Development + XR",
    eyebrow: "Real-time worlds",
    description: "Gameplay, physics, spatial interfaces, and immersive 3D experiences.",
    signal: "Simulation ↔ interaction",
    icon: Gamepad2,
    skills: ["Unity / Unreal", "Gameplay + physics", "WebXR / spatial"],
    desktopPosition: "left-[3%] top-[56%] w-[30%]",
    accent: "from-violet-400/20 via-violet-400/5 to-transparent",
    iconColor: "text-violet-300",
  },
  {
    code: "04",
    title: "Mobile Products",
    eyebrow: "On-device",
    description: "Focused cross-platform apps with native and offline capabilities.",
    signal: "Product ↔ device",
    icon: Smartphone,
    skills: ["React Native / Expo", "Native APIs", "On-device ML"],
    desktopPosition: "right-[3%] top-[56%] w-[30%]",
    accent: "from-lime-400/20 via-lime-400/5 to-transparent",
    iconColor: "text-lime-300",
  },
  {
    code: "05",
    title: "Systems Engineering",
    eyebrow: "Performance layer",
    description: "Tooling, integrations, and low-level work for demanding software.",
    signal: "Performance ↔ reliability",
    icon: Cpu,
    skills: ["C# / C++ / Rust", "WebAssembly", "Profiling"],
    desktopPosition: "bottom-[3%] left-1/2 w-[29%] -translate-x-1/2",
    accent: "from-sky-400/20 via-sky-400/5 to-transparent",
    iconColor: "text-sky-300",
  },
];

const tools: Tool[] = [
  { label: "TypeScript", icon: SiTypescript, color: "#60a5fa" },
  { label: "JavaScript", icon: SiJavascript, color: "#facc15" },
  { label: "Python", icon: SiPython, color: "#60a5fa" },
  { label: "C#", icon: SiSharp, color: "#c084fc" },
  { label: "C++", icon: SiCplusplus, color: "#38bdf8" },
  { label: "Rust", icon: SiRust, color: "#fdba74" },
  { label: "Go", icon: SiGo, color: "#22d3ee" },
  { label: "Lua", icon: SiLua, color: "#818cf8" },
  { label: "React", icon: SiReact, color: "#67e8f9" },
  { label: "Three.js", icon: SiThreedotjs, color: "#f8fafc" },
  { label: "TensorFlow", icon: SiTensorflow, color: "#fb923c" },
  { label: "WebAssembly", icon: SiWebassembly, color: "#a78bfa" },
];

const connections = [
  { path: "M 500 316 C 416 274, 352 184, 205 140", x: 205, y: 140 },
  { path: "M 500 316 C 584 274, 648 184, 795 140", x: 795, y: 140 },
  { path: "M 500 316 C 410 360, 334 438, 190 486", x: 190, y: 486 },
  { path: "M 500 316 C 590 360, 666 438, 810 486", x: 810, y: 486 },
  { path: "M 500 316 C 500 410, 500 486, 500 585", x: 500, y: 585 },
];

const SpecializationCard = ({ specialization, index, desktop = false }: { specialization: Specialization; index: number; desktop?: boolean }) => {
  const Icon = specialization.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={`group z-10 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#070907]/95 p-4 shadow-xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-5 ${desktop ? `absolute ${specialization.desktopPosition}` : "relative"}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${specialization.accent} opacity-70 transition-opacity group-hover:opacity-100`} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className={`font-mono text-[9px] ${specialization.iconColor}`}>{specialization.code}</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/[0.32]">{specialization.eyebrow}</span>
          </div>
          <span className={`rounded-xl border border-white/10 bg-black/30 p-2.5 ${specialization.iconColor}`}>
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white sm:text-xl">{specialization.title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/[0.48]">{specialization.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {specialization.skills.map((skill) => (
            <span key={skill} className="rounded-md border border-white/[0.07] bg-black/30 px-2.5 py-1 text-[11px] text-white/60">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3 font-mono text-[8px] uppercase tracking-[0.13em] text-white/25">
          <Activity className={`h-3 w-3 ${specialization.iconColor}`} /> {specialization.signal}
        </div>
      </div>
    </motion.article>
  );
};

const CoreNode = ({ compact = false }: { compact?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.5 }}
    className={`z-20 flex items-center justify-center ${compact ? "relative mx-auto mb-8 h-44 w-44" : "absolute left-1/2 top-[47%] h-44 w-44 -translate-x-1/2 -translate-y-1/2"}`}
  >
    <div className="absolute -inset-8 rounded-full bg-green-400/[0.08] blur-2xl" />
    <div className="absolute inset-0 rounded-full border border-dashed border-green-300/25 motion-safe:animate-[spin_24s_linear_infinite]" />
    <div className="absolute inset-4 rounded-full border border-cyan-300/10 motion-safe:animate-[spin_18s_linear_infinite_reverse]" />
    <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
    <span className="absolute right-4 top-5 h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.75)]" />
    <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-green-300/25 bg-black/90 text-center shadow-[0_0_55px_rgba(74,222,128,0.18)] backdrop-blur-xl">
      <Network className="mb-3 h-6 w-6 text-green-300" />
      <span className="text-sm font-semibold text-white">Product Engineer</span>
      <span className="mt-1 max-w-24 font-mono text-[7px] uppercase leading-3 tracking-[0.16em] text-green-300/60">Design · build · ship</span>
    </div>
  </motion.div>
);

const Skills = () => (
  <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
    <div className="pointer-events-none absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-green-400/[0.035] blur-3xl" />
    <div className="relative mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-green-400">Specialization map</p>
        <h2 id="skills-title" className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          A connected engineering practice.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          Five disciplines working as one system—from interface and inference to simulation and infrastructure.
        </p>
      </motion.div>

      <div className="relative hidden h-[42rem] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#040604] shadow-2xl shadow-black/35 lg:block">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.09),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(139,92,246,0.07),transparent_30%),radial-gradient(circle_at_90%_8%,rgba(34,211,238,0.06),transparent_26%)]" />
        <div className="absolute left-5 top-4 z-20 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-green-300 opacity-40" /><span className="relative h-2 w-2 rounded-full bg-green-300" /></span> Capability constellation
        </div>
        <div className="absolute right-5 top-4 z-20 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">05 domains · 01 practice</div>

        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 660" preserveAspectRatio="none">
          <defs>
            <linearGradient id="skill-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#4ade80" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.28" />
            </linearGradient>
            <filter id="skill-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="orbit-fade">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="500" cy="316" rx="185" ry="132" fill="none" stroke="rgba(134,239,172,0.11)" strokeWidth="1" strokeDasharray="5 9" />
          <ellipse cx="500" cy="316" rx="305" ry="225" fill="none" stroke="rgba(103,232,249,0.055)" strokeWidth="1" />
          <circle cx="500" cy="316" r="230" fill="url(#orbit-fade)" opacity="0.32" />
          {connections.map(({ path, x, y }, index) => (
            <g key={path}>
              <motion.path
                d={path}
                fill="none"
                stroke="url(#skill-line)"
                strokeWidth="1.35"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.85, delay: 0.12 + index * 0.08 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill="#86efac"
                filter="url(#skill-glow)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.9, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 + index * 0.08, duration: 0.35 }}
              />
              <motion.circle
                r="2.5"
                fill="#ffffff"
                opacity="0.65"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 3.4 + index * 0.4, repeat: Infinity, ease: "linear", delay: index * 0.35 }}
                style={{ offsetPath: `path('${path}')` }}
              />
            </g>
          ))}
        </svg>
        {specializations.map((specialization, index) => (
          <SpecializationCard key={specialization.title} specialization={specialization} index={index} desktop />
        ))}
        <CoreNode />
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#040604] p-4 shadow-2xl shadow-black/25 sm:p-5 lg:hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="relative mb-5 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-300" /> Capability constellation</span>
          <span>05 domains</span>
        </div>
        <CoreNode compact />
        <div className="absolute bottom-8 left-9 top-64 w-px bg-gradient-to-b from-green-300/45 via-cyan-300/25 to-transparent sm:left-11" />
        <div className="relative space-y-3">
          {specializations.map((specialization, index) => (
            <div key={specialization.title} className="relative pl-9 sm:pl-11">
              <span className={`absolute left-[1.05rem] top-8 h-2 w-2 -translate-x-1/2 rounded-full border border-white/20 bg-current shadow-[0_0_12px_rgba(74,222,128,0.3)] sm:left-[1.3rem] ${specialization.iconColor}`} />
              <span className="absolute left-[1.05rem] top-[2.15rem] h-px w-5 bg-gradient-to-r from-green-300/40 to-transparent sm:left-[1.3rem] sm:w-7" />
              <SpecializationCard specialization={specialization} index={index} />
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-green-300/75">Languages & core tools</p>
          <span className="hidden text-xs text-white/30 sm:block">A practical, polyglot toolbelt</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {tools.map(({ label, icon: Icon, color }) => (
            <motion.div
              key={label}
              whileHover={{ y: -3 }}
              className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-black/25 px-3 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              title={label}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" style={{ color }} />
              <span className="min-w-0 truncate text-[11px] text-white/[0.58] sm:text-xs">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
