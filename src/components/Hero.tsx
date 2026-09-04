import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Braces,
  Boxes,
  Check,
  Code2,
  Gamepad2,
  MapPin,
  Smartphone,
} from "lucide-react";

const disciplines = [
  { label: "Web platforms", icon: Code2, color: "text-[#c8ff4a]" },
  { label: "Mobile apps", icon: Smartphone, color: "text-[#69d2ff]" },
  { label: "Applied AI", icon: BrainCircuit, color: "text-[#ff9e80]" },
  { label: "Game + XR", icon: Gamepad2, color: "text-[#b8a1ff]" },
];

const modules = [
  { code: "01", title: "Interface", detail: "Web + mobile", icon: Code2 },
  { code: "02", title: "Intelligence", detail: "AI + vision", icon: BrainCircuit },
  { code: "03", title: "Systems", detail: "APIs + data", icon: Braces },
  { code: "04", title: "Experience", detail: "Game + XR", icon: Boxes },
];

const Hero = () => (
  <section id="home" aria-labelledby="hero-title" className="relative min-h-[100svh] overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-20">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8ff4a]/60 to-transparent" />
    <div className="relative mx-auto grid min-h-[calc(100svh-9rem)] max-w-[88rem] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
      <div className="relative z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c8ff4a]/25 bg-[#c8ff4a]/[0.07] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d8ff7f]">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8ff4a] opacity-40" /><span className="relative h-2 w-2 rounded-full bg-[#c8ff4a]" /></span>
            Open to full-stack roles
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/35"><MapPin className="h-3.5 w-3.5" /> Orlando, FL · Remote friendly</span>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/45 sm:text-sm">
          Jay · Full-Stack Software Engineer
        </motion.p>
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.58, delay: 0.1, ease: "easeOut" }} className="max-w-5xl text-balance text-[clamp(3.15rem,10vw,7.4rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-[#f4f1e8]">
          I turn hard ideas into <span className="display-serif font-normal italic tracking-[-0.055em] text-[#c8ff4a]">working software.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-xl sm:leading-8">
          Product-minded engineering across the full stack—from polished interfaces and reliable backends to mobile AI and real-time 3D systems.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.28 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#c8ff4a] px-6 py-3.5 text-sm font-semibold text-[#0b0d0c] transition hover:bg-[#d8ff78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff4a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d0c]">
            See what I&apos;ve built <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 py-3.5 text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff4a]">
            Start a conversation <ArrowDownRight className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.36 }} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/[0.08] pt-6 sm:flex sm:flex-wrap sm:gap-6" aria-label="Engineering disciplines">
          {disciplines.map(({ label, icon: Icon, color }) => (
            <span key={label} className="inline-flex items-center gap-2 text-xs text-white/45 sm:text-sm"><Icon className={`h-4 w-4 ${color}`} /> {label}</span>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, x: 26, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }} className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
        <div className="absolute -inset-12 rounded-full bg-[#c8ff4a]/[0.06] blur-3xl" />
        <div className="absolute -right-5 top-8 h-[90%] w-full rotate-3 rounded-[2rem] border border-[#69d2ff]/15 bg-[#69d2ff]/[0.025]" />
        <div className="absolute -left-5 top-4 h-[94%] w-full -rotate-2 rounded-[2rem] border border-[#ff9e80]/12 bg-[#ff9e80]/[0.02]" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#111411]/95 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff725e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffd66b]" /><span className="h-2.5 w-2.5 rounded-full bg-[#c8ff4a]" /></div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">Build system · v1.0</span>
          </div>

          <div className="p-5 sm:p-7">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c8ff4a]">End-to-end ownership</p><h2 className="mt-2 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#f4f1e8] sm:text-3xl">One connected product system.</h2></div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c8ff4a]/25 bg-[#c8ff4a]/10 text-[#c8ff4a]"><Boxes className="h-5 w-5" /></span>
            </div>

            <div className="relative grid grid-cols-2 gap-2.5">
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#111411] bg-[#c8ff4a] text-[9px] font-black uppercase tracking-[0.12em] text-[#0b0d0c] shadow-[0_0_30px_rgba(200,255,74,0.22)]">Ship</div>
              {modules.map(({ code, title, detail, icon: Icon }) => (
                <div key={code} className="min-h-32 rounded-2xl border border-white/[0.08] bg-black/20 p-4 transition hover:border-white/15 hover:bg-white/[0.035] sm:min-h-36 sm:p-5">
                  <div className="flex items-center justify-between"><span className="text-[9px] font-semibold text-white/20">/{code}</span><Icon className="h-4 w-4 text-white/35" /></div>
                  <p className="mt-7 text-sm font-semibold text-white sm:text-base">{title}</p><p className="mt-1 text-[11px] text-white/35 sm:text-xs">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#c8ff4a]/15 bg-[#c8ff4a]/[0.055] px-4 py-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#c8ff4a] text-[#0b0d0c]"><Check className="h-4 w-4 stroke-[3]" /></span>
              <div className="min-w-0"><p className="text-xs font-semibold text-white">Product question → production software</p><p className="mt-0.5 truncate text-[10px] text-white/35">Design · engineer · integrate · optimize</p></div>
              <span className="ml-auto hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-[#c8ff4a] sm:block">Online</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
