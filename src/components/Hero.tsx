import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Code2,
  Gamepad2,
  MapPin,
  Smartphone,
  Terminal,
} from "lucide-react";
import MatrixBackground from "./MatrixBackground";

const Globe3D = lazy(() => import("./Globe3D"));

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Game & XR Developer",
  "Mobile Developer",
];

const disciplines = [
  { label: "Web", icon: Code2 },
  { label: "AI / ML", icon: BrainCircuit },
  { label: "Game + XR", icon: Gamepad2 },
  { label: "Mobile", icon: Smartphone },
];

const SnapshotLine = ({ number, children }: { number: number; children?: React.ReactNode }) => (
  <div className="grid min-h-5 grid-cols-[2rem_minmax(0,1fr)] font-mono sm:grid-cols-[2.35rem_minmax(0,1fr)]">
    <span className="select-none border-r border-white/[0.05] pr-2 text-right text-[8px] leading-5 text-white/18 sm:text-[9px]">
      {number}
    </span>
    <code className="min-w-0 whitespace-pre-wrap break-words px-2.5 text-[9px] leading-5 text-[#d6deeb] sm:px-3.5 sm:text-[10px]">
      {children || " "}
    </code>
  </div>
);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-hidden px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-12"
    >
      <MatrixBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(34,197,94,0.12),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.08),#000_92%)]" />

      <div className="relative z-20 mx-auto grid min-h-[calc(100svh-9rem)] max-w-7xl items-center gap-7 sm:gap-10 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-green-400/20 bg-green-400/[0.06] px-3.5 py-2 font-mono text-[11px] text-green-300 backdrop-blur-md sm:mb-7 sm:gap-3 sm:px-4 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for ambitious builds
            <span className="hidden h-3 w-px bg-green-300/20 sm:block" />
            <span className="hidden items-center gap-1.5 text-white/[0.45] sm:flex">
              <MapPin className="h-3 w-3" /> Orlando, FL
            </span>
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/[0.45] sm:mb-4 sm:text-sm sm:tracking-[0.24em]">
            JayStack / Product Engineer
          </p>
          <h1
            id="hero-title"
            className="max-w-4xl text-balance text-[clamp(2.55rem,12vw,4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
          >
            I build intelligent products across{" "}
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              web, mobile & immersive worlds.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.58] sm:mt-7 sm:text-xl sm:leading-8">
            I design and ship full-stack products, production AI, mobile apps,
            and real-time Game + XR experiences.
          </p>

          <div className="mt-6 flex min-h-7 min-w-0 items-center gap-2 overflow-hidden font-mono text-xs text-green-300 sm:mt-7 sm:text-sm" aria-live="polite">
            <Terminal className="h-4 w-4" />
            <span className="text-white/[0.35]">currently:</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[currentIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="min-w-0 truncate"
              >
                {roles[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-2.5" aria-label="Core disciplines">
            {disciplines.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs text-white/70 backdrop-blur-sm sm:px-3.5 sm:text-sm"
              >
                <Icon className="h-4 w-4 text-green-400" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 font-medium text-black transition hover:bg-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto sm:px-6 sm:py-3.5"
            >
              Explore selected work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-3 font-medium text-white/80 transition hover:border-green-400/[0.35] hover:bg-green-400/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 sm:w-auto sm:px-6 sm:py-3.5"
            >
              Start a conversation
              <ArrowDownRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto h-[24rem] w-full max-w-[36rem] sm:h-[31rem] lg:h-[43rem]">
          <div className="absolute inset-[-10%] rounded-full bg-green-400/[0.07] blur-3xl" />
          <div className="absolute inset-0 opacity-75">
            <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-green-400/[0.03]" />}>
              <Globe3D cameraZ={19} />
            </Suspense>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
            className="absolute bottom-2 left-1/2 w-[min(98%,30rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-white/[0.13] bg-[#080b0a]/94 shadow-2xl shadow-black/75 backdrop-blur-xl sm:bottom-6 sm:w-[min(96%,30rem)] lg:bottom-14 lg:left-0 lg:translate-x-0"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-300/70 to-transparent" />
            <div className="relative flex h-8 items-center border-b border-white/[0.07] bg-[#101513] px-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/28 sm:text-[9px]">
                jaystack.dev — editor
              </span>
              <span className="ml-auto font-mono text-[7px] uppercase tracking-[0.14em] text-green-300/45 sm:text-[8px]">Employer snapshot</span>
            </div>

            <div className="flex h-8 items-end border-b border-white/[0.06] bg-[#090c0b]">
              <div className="flex h-8 items-center gap-2 border-r border-white/[0.06] border-t border-t-green-300 bg-[#0c100f] px-3 font-mono text-[9px] text-white/62 sm:px-4 sm:text-[10px]">
                <Code2 className="h-3 w-3 text-blue-300" />
                capabilities.ts
                <span className="ml-1 h-1 w-1 rounded-full bg-white/30" />
              </div>
            </div>

            <div className="flex h-6 items-center gap-1 border-b border-white/[0.045] bg-[#0b0f0e] px-3 font-mono text-[8px] text-white/22 sm:px-4">
              <span>src</span><span>›</span><span className="text-white/42">capabilities.ts</span><span>›</span><span className="text-green-300/50">engineer</span>
            </div>

            <div className="py-2 sm:py-2.5">
              <SnapshotLine number={1}><span className="text-[#637777]">// Employer-facing build profile</span></SnapshotLine>
              <SnapshotLine number={2}><span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">engineer</span> <span className="text-white/40">= {`{`}</span></SnapshotLine>
              <SnapshotLine number={3}>{"  "}<span className="text-[#f07178]">name</span><span className="text-white/40">: </span><span className="text-[#c3e88d]">&quot;Jay&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={4}>{"  "}<span className="text-[#f07178]">role</span><span className="text-white/40">: </span><span className="text-[#c3e88d]">&quot;Product Engineer&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={5}>{"  "}<span className="text-[#f07178]">location</span><span className="text-white/40">: </span><span className="text-[#c3e88d]">&quot;Orlando, FL&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={6}>{"  "}<span className="text-[#f07178]">builds</span><span className="text-white/40">: [</span></SnapshotLine>
              <SnapshotLine number={7}>{"    "}<span className="text-[#c3e88d]">&quot;Full-stack systems&quot;</span><span className="text-white/40">, </span><span className="text-[#c3e88d]">&quot;Applied AI&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={8}>{"    "}<span className="text-[#c3e88d]">&quot;Game + XR&quot;</span><span className="text-white/40">, </span><span className="text-[#c3e88d]">&quot;Mobile products&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={9}>{"  "}<span className="text-white/40">],</span></SnapshotLine>
              <SnapshotLine number={10}>{"  "}<span className="text-[#f07178]">outcome</span><span className="text-white/40">: </span><span className="text-[#c3e88d]">&quot;production-ready products&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={11}>{"  "}<span className="text-[#f07178]">status</span><span className="text-white/40">: </span><span className="text-[#c3e88d]">&quot;open_to_build&quot;</span><span className="text-white/40">,</span></SnapshotLine>
              <SnapshotLine number={12}><span className="text-white/40">{`}`}</span> <span className="text-[#c792ea]">satisfies</span> <span className="text-[#82aaff]">Candidate</span><span className="text-white/40">;</span></SnapshotLine>
            </div>

            <div className="flex h-6 items-center bg-green-700/90 px-2.5 font-mono text-[8px] text-white/75 sm:px-3">
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-200" /> main*</span>
              <span className="ml-3">✓ 0 problems</span>
              <span className="ml-auto hidden sm:inline">Ln 12, Col 22&nbsp;&nbsp; TypeScript</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
