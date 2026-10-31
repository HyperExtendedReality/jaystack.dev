import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { ArrowUpRight, Github, X, ArrowRight, Check } from "lucide-react";
import { PIN_QUERY, useMediaQuery, useScrollVar } from "@/hooks/use-scroll-var";
import FungEyeDemo from "./fungeye_demo/fungeye-demo";
import phoneHome from "../assets/home-dark.webp";
import phoneResults from "../assets/results.webp";

const work = [
  {
    title: "Infiniv",
    category: "SYSTEMS ENGINEERING",
    detail: "Rethinking the infrastructure behind multiplayer worlds.",
    tech: "C++ / RUST / SPACETIMEDB",
    art: "infiniv",
    status: "In development",
    href: "https://github.com/HyperExtendedReality/infiniv/tree/master",
  },
  {
    title: "r3f-jolt",
    category: "OPEN SOURCE · 3D PHYSICS",
    detail: "Real-world physics. React-world simplicity.",
    tech: "REACT / THREE.JS / WEBASSEMBLY",
    art: "physics",
    status: "In development",
    href: "https://github.com/HyperExtendedReality/r3f-jolt",
  },
  {
    title: "CodeWalker",
    category: "DESKTOP · GAME-WORLD TOOLING",
    detail: "Modern tools for building worlds worth getting lost in.",
    tech: "C# / .NET 9 / DIRECTXTEXNET",
    art: "world",
    status: "Open source",
    href: "https://github.com/HyperExtendedReality/CodeWalker",
  },
];
const phases = ["SCAFFOLDING", "WIRING", "POLISHING"];
export default function Projects() {
  const [demo, setDemo] = useState(false);
  const demoTrigger = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const featured = useRef<HTMLElement>(null);
  const featuredProgress = useScrollVar(featured, ["start end", "end start"]);
  const assembly = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery(PIN_QUERY);
  const { scrollYProgress: assemblyProgress } = useScroll({ target: assembly, offset: ["start start", "end end"] });
  return (
    <section
      id="projects"
      className="work-section section-shell"
      aria-labelledby="work-title"
    >
      <div className="section-kicker mono">
        <span>
          <i /> SELECTED WORK
        </span>
      </div>
      <div className="section-heading">
        <h2 id="work-title">
          A few things
          <br />
          <em>I’ve built.</em>
        </h2>
        <p>
          From on-device intelligence to multiplayer infrastructure.
          Explore the demos, dig into the code, and see how the pieces connect.
        </p>
      </div>
      <motion.article
        ref={featured}
        style={{ "--p": featuredProgress } as MotionStyle}
        className="featured-work"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
      >
        <div className="featured-copy">
          <div className="mono work-label">
            <span>FEATURED PROJECT</span>
            <span>↗</span>
          </div>
          <div>
            <span className="eyebrow mono">MOBILE MEETS MACHINE LEARNING</span>
            <h3>
              FungEye<span>✳</span>
            </h3>
            <p>
              Computer vision.
              <br />Made for the outdoors.
            </p>
            <div className="project-description">
              An offline mushroom identifier that puts optimized computer vision
              in your pocket. Built from the first interface to on-device
              inference.
            </div>
            <div className="tech-tags">
              <span>React Native</span>
              <span>TensorFlow</span>
              <span>YOLO</span>
            </div>
            <div className="featured-actions">
              <button ref={demoTrigger} className="lime-button" onClick={() => setDemo(true)}>
                Try the interactive demo <ArrowUpRight size={17} />
              </button>
              <a
                href="https://github.com/HyperExtendedReality/FungEye"
                target="_blank"
                rel="noreferrer"
                aria-label="View FungEye source on GitHub"
              >
                <Github size={18} /><span>Source code</span>
              </a>
            </div>
          </div>
          <span className="mono project-footnote">
            ON-DEVICE AI. OFF THE GRID.
          </span>
        </div>
        <div className="featured-art">
          <div className="nature-ring ring-a" />
          <div className="nature-ring ring-b" />
          <span className="nature-word" aria-hidden="true">
            discover.
          </span>
          <img
            className="project-phone phone-secondary"
            src={phoneResults}
            loading="lazy"
            alt="FungEye mushroom identification results"
          />
          <img
            className="project-phone phone-primary"
            src={phoneHome}
            loading="lazy"
            alt="FungEye mobile home screen"
          />
          <span className="art-sticker mono">
            <span>✳</span> BUILT TO
            <br />
            EXPLORE.
          </span>
          <span className="visual-caption mono">
            PRODUCT DESIGN + MOBILE DEVELOPMENT + AI
          </span>
        </div>
      </motion.article>
      <div className="assembly" ref={assembly}>
        <div className="assembly-stage">
          <h3 className="assembly-title">Open source, <em>on the workbench.</em></h3>
          <div className="work-grid">
            {work.map((project, index) => (
              <BuildCard key={project.title} project={project} index={index} pinned={pinned} section={assemblyProgress} />
            ))}
          </div>
        </div>
      </div>
      <motion.article
        className="platform-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div>
          <span className="mono eyebrow">
            MULTIPLAYER EXPERIENCES
          </span>
          <h3>
            Behind the worlds.
            <br />
            <em>Across the stack.</em>
          </h3>
          <p>
            Server architecture, gameplay systems, and the interfaces that bring
            communities together.
          </p>
        </div>
        <div>
          <div className="platform-row">
            <div>
              <h4>GTA:Rewind</h4>
              <span>Lead developer · Lua, C#, React, PostgreSQL</span>
            </div>
          </div>
          <div className="platform-row">
            <div>
              <h4>UnleashedRP</h4>
              <span>Lead developer · Svelte, TypeScript, SQL, Lua</span>
            </div>
          </div>
          <a className="text-link" href="#contact">
            Let’s talk about the details <ArrowRight size={16} />
          </a>
        </div>
      </motion.article>
      {demo && (
        <DemoDialog onClose={() => setDemo(false)} triggerRef={demoTrigger} />
      )}
    </section>
  );
}

type Project = (typeof work)[number];
function BuildCard({ project, index, pinned, section }: { project: Project; index: number; pinned: boolean; section: MotionValue<number> }) {
  const card = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: own } = useScroll({ target: card, offset: ["start 0.95", "start 0.4"] });
  // Pinned: cards bolt together one after another inside the held frame.
  const start = 0.06 + index * 0.17;
  const staged = useTransform(section, [start, start + 0.42], [0, 1]);
  const assembled = pinned ? staged : own;
  const amount = useTransform(assembled, (v) => v.toFixed(4));
  const percent = useTransform(assembled, (v) => `${Math.round(v * 100)}%`);
  const phaseOf = (v: number) => (v > 0.995 ? 3 : Math.min(2, Math.floor(v * 3)));
  const [phase, setPhase] = useState(() => phaseOf(assembled.get()));
  useMotionValueEvent(assembled, "change", (v) => setPhase(phaseOf(v)));
  const done = reduced || phase === 3;
  return (
    <motion.article ref={card} className={`work-card build-card work-${project.art}`} style={reduced ? undefined : ({ "--a": amount } as MotionStyle)}>
      <a
        className="project-art-link"
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.title} source on GitHub`}
      >
        <span className="build-guides" aria-hidden="true" />
        <div className={`project-visual visual-${project.art}`}>
          <span className="project-status mono">{project.status}</span>
          <div className="build-art" aria-hidden="true">
            {project.art === "infiniv" ? (
              <div className="infinity-art">
                ∞<span>CONNECTED BY POSSIBILITY</span>
              </div>
            ) : project.art === "physics" ? (
              <div className="physics-art">
                <span className="physics-floor" />
                <i className="ball ball-one" />
                <i className="ball ball-two" />
                <i className="ball ball-three" />
                <i className="physics-cube" />
                <span className="physics-label mono">
                  GRAVITY IS JUST THE BEGINNING.
                </span>
              </div>
            ) : (
              <div className="world-art">
                {Array.from({ length: 18 }, (_, i) => (
                  <i
                    key={i}
                    style={{ height: `${30 + ((i * 37) % 95)}px` }}
                  />
                ))}
                <span className="world-label mono">
                  BUILD YOUR OWN WORLD.
                </span>
              </div>
            )}
          </div>
          <span className="project-open">
            <ArrowUpRight size={21} />
          </span>
        </div>
      </a>
      <p className={`build-line mono${done ? " is-done" : ""}`} aria-hidden="true">
        <span className="build-bar"><i /></span>
        {done ? <><Check size={13} /> ASSEMBLED</> : <>{phases[phase]} <motion.span>{percent}</motion.span></>}
      </p>
      <div className="project-meta">
        <div>
          <span className="mono eyebrow">{project.category}</span>
          <h3><a href={project.href} target="_blank" rel="noreferrer">{project.title}<ArrowUpRight size={19} /></a></h3>
          <p>{project.detail}</p>
        </div>
        <span className="mono project-tech">{project.tech}</span>
      </div>
    </motion.article>
  );
}

function DemoDialog({ onClose, triggerRef }: { onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [triggerRef]);
  return (
    <dialog
      className="demo-dialog"
      ref={dialog}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="demo-title"
    >
      <div className="demo-content">
        <div className="demo-heading">
          <div>
            <span className="mono eyebrow">CLICK THROUGH THE EXPERIENCE</span>
            <h3 id="demo-title">Explore FungEye</h3>
          </div>
          <button
            autoFocus
            className="close-demo"
            aria-label="Close FungEye demo"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <FungEyeDemo />
        <p className="demo-note">
          Interactive product preview · uses sample screens
        </p>
      </div>
    </dialog>
  );
}
