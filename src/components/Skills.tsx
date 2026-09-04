import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, BrainCircuit, Cpu, Gamepad2, Layers3, Smartphone } from "lucide-react";
import type { IconType } from "react-icons";
import { SiCplusplus, SiGo, SiJavascript, SiLua, SiPython, SiReact, SiRust, SiSharp, SiTensorflow, SiThreedotjs, SiTypescript, SiWebassembly } from "react-icons/si";

type Capability = {
  number: string;
  title: string;
  label: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  accent: string;
  className: string;
};

type Tool = { label: string; icon: IconType; color: string };

const capabilities: Capability[] = [
  {
    number: "01",
    title: "Full-stack product engineering",
    label: "Core practice",
    description: "I connect the interface, API, data model, and delivery path so the product behaves like one system—not a collection of handoffs.",
    skills: ["React / TypeScript", "APIs + services", "SQL + data", "Production delivery"],
    icon: Layers3,
    accent: "#c8ff4a",
    className: "lg:col-span-7",
  },
  {
    number: "02",
    title: "Mobile products",
    label: "On-device",
    description: "Cross-platform apps that feel focused, fast, and capable—with native integrations and offline workflows when the product needs them.",
    skills: ["React Native", "Expo", "Native APIs", "Offline-first"],
    icon: Smartphone,
    accent: "#69d2ff",
    className: "lg:col-span-5",
  },
  {
    number: "03",
    title: "Applied AI",
    label: "Intelligent systems",
    description: "Useful model-driven features from training and optimization through inference, integration, and the final user experience.",
    skills: ["Computer vision", "TensorFlow", "YOLO", "On-device inference"],
    icon: BrainCircuit,
    accent: "#ff9e80",
    className: "lg:col-span-5",
  },
  {
    number: "04",
    title: "Game + XR engineering",
    label: "Real-time",
    description: "Gameplay systems, physics, spatial interfaces, and interactive 3D work where performance and feel are part of the architecture.",
    skills: ["Unity / Unreal", "Three.js", "WebXR", "Gameplay systems"],
    icon: Gamepad2,
    accent: "#b8a1ff",
    className: "lg:col-span-7",
  },
  {
    number: "05",
    title: "Systems + performance",
    label: "Under the hood",
    description: "Low-level tooling, integrations, profiling, and performance work for software that needs more than the happy path.",
    skills: ["C# / C++ / Rust", "WebAssembly", "Networking", "Profiling"],
    icon: Cpu,
    accent: "#ffd66b",
    className: "lg:col-span-12",
  },
];

const tools: Tool[] = [
  { label: "TypeScript", icon: SiTypescript, color: "#69d2ff" },
  { label: "JavaScript", icon: SiJavascript, color: "#ffd66b" },
  { label: "React", icon: SiReact, color: "#69d2ff" },
  { label: "Python", icon: SiPython, color: "#8fc8ff" },
  { label: "C#", icon: SiSharp, color: "#b8a1ff" },
  { label: "C++", icon: SiCplusplus, color: "#69d2ff" },
  { label: "Rust", icon: SiRust, color: "#ff9e80" },
  { label: "Go", icon: SiGo, color: "#69d2ff" },
  { label: "Lua", icon: SiLua, color: "#b8a1ff" },
  { label: "Three.js", icon: SiThreedotjs, color: "#f4f1e8" },
  { label: "TensorFlow", icon: SiTensorflow, color: "#ff9e80" },
  { label: "WASM", icon: SiWebassembly, color: "#b8a1ff" },
];

const Skills = () => (
  <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
    <div className="pointer-events-none absolute right-[-10rem] top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#69d2ff]/[0.045] blur-3xl" />
    <div className="relative mx-auto max-w-[88rem]">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8ff4a]">What I bring</p>
          <h2 id="skills-title" className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#f4f1e8] sm:text-5xl lg:text-6xl">A full stack that goes <span className="display-serif font-normal italic text-white/38">beyond the browser.</span></h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-white/48 sm:text-lg sm:leading-8 lg:justify-self-end">My strongest value is range with cohesion: I can build the product surface, understand the systems beneath it, and go deeper when the experience calls for AI, mobile, or real-time technology.</p>
      </div>

      <div className="mt-12 grid gap-3 lg:grid-cols-12">
        {capabilities.map(({ number, title, label, description, skills, icon: Icon, accent, className }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ delay: (index % 2) * 0.06 }} className={`group relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#111411]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/18 sm:p-8 ${className}`}>
            <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between gap-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>/{number} · {label}</span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-black/20" style={{ color: accent }}><Icon className="h-5 w-5" /></span>
              </div>
              <h3 className="mt-10 max-w-xl text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45 sm:text-base sm:leading-7">{description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[10px] text-white/50 sm:text-xs">{skill}</span>)}
              </div>
              {index === 0 && (
                <div className="mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 border-t border-white/[0.07] pt-6 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
                  <span>UI</span><ArrowRight className="h-3 w-3 text-[#c8ff4a]" /><span>API</span><ArrowRight className="h-3 w-3 text-[#c8ff4a]" /><span>Data</span><ArrowRight className="h-3 w-3 text-[#c8ff4a]" /><span>Ship</span>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mt-3 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c8ff4a]">Working toolbelt</p><span className="text-xs text-white/28">Polyglot by problem, practical by default</span></div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {tools.map(({ label, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-3.5 transition hover:border-white/15 hover:bg-white/[0.035]"><Icon aria-hidden="true" className="h-4 w-4 shrink-0" style={{ color }} /><span className="truncate text-[11px] text-white/52 sm:text-xs">{label}</span></div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
