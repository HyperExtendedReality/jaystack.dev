import { lazy, Suspense, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, type MotionStyle } from "motion/react";
import { ArrowUpRight, Pause, Play, ArrowRight, MessageCircle } from "lucide-react";
import { useScrollVar } from "@/hooks/use-scroll-var";
const AssemblyLine = lazy(() => import("./AssemblyLine"));
// Foreground plane: --d is depth (bigger travels further, reads closer).
const chips = [
  { text: "<Canvas shadows>", d: 1.4 },
  { text: "GET /api/projects", d: 0.8 },
  { text: "cargo build --release", d: 1.1 },
  { text: "useFrame((s, dt) => {})", d: 0.7 },
  { text: "SELECT * FROM players", d: 1.25 },
  { text: "player.respawn()", d: 0.9 },
];
export default function Hero({ onAsk }: { onAsk: () => void }) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(0);
  const hero = useRef<HTMLElement>(null);
  const progress = useScrollVar(hero, ["start start", "end start"]);
  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reducedMotion) return;
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", (((e.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--my", (((e.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
  };
  return (
    <motion.section ref={hero} id="home" className="studio-hero" aria-labelledby="hero-title" style={{ "--p": progress } as MotionStyle} onPointerMove={tilt}>
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-topline mono">
        <span>SOFTWARE ENGINEER · FULL-STACK WEB · GAMES · APPLIED AI</span>
        <span className="location">BASED IN ORLANDO, FL ↗</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <motion.p
            className="hero-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Hey, I’m Jay. I connect the whole product.
          </motion.p>
          <h1 id="hero-title">
            {["Logic meets", "a little"].map((line, i) => (
              <span className="line-mask" key={line}>
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.1 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="line-mask">
              <motion.em
                initial={{ y: reducedMotion ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.95,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                magic<span className="hero-period">.</span>
              </motion.em>
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <p className="hero-description">
              I build web platforms, games and real-time 3D, and mobile AI,
              from the first interface to the systems behind it.
            </p>
            <div className="hero-actions">
              <a className="lime-button" href="#projects">
                Explore my work <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#about">
                Meet the builder <ArrowUpRight size={17} />
              </a>
            </div>
            <ul className="hero-disciplines" aria-label="Engineering focus">
              <li>Full-stack web</li>
              <li>Games & 3D</li>
              <li>Mobile & AI</li>
            </ul>
          </motion.div>
        </div>
        <div className="hero-stage">
        <div className="hero-braces" aria-hidden="true"><span>{"{"}</span><span>{"}"}</span></div>
        <div className="hero-art">
          <div className="art-grid" aria-hidden="true" />
          <div className="factory-topline mono"><span><i className="status-dot" /> SMALL FACTORY. BIG IDEAS.</span><span>EST. IN CURIOSITY</span></div>
          <div className="factory-stages" role="group" aria-label="Software assembly stages">
            {["Design", "Connect", "Ship"].map((label, index) => <button key={label} aria-pressed={stage === index} onClick={() => setStage(index)}><span>0{index + 1}</span>{label}</button>)}
          </div>
          <Suspense
            fallback={<div className="sculpture-fallback" aria-hidden="true" />}
          >
            <AssemblyLine
              paused={paused}
              stage={stage} onStageChange={setStage}
            />
          </Suspense>
          <div className="art-caption">
            <div>
              <span className="mono">THE SOFTWARE FACTORY</span>
              <p>Select a stage. Watch an idea take shape.</p>
            </div>
            <div className="art-controls">
              <button
                aria-label="Advance to next build stage" title="Next build stage"
                onClick={() => setStage((s) => (s + 1) % 3)}
              >
                <ArrowRight size={15} /><span>Next step</span>
              </button>
              <button
                aria-label={
                  paused
                    ? "Play factory animation"
                    : "Pause factory animation"
                }
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
            </div>
          </div>
        </div>
        <div className="hero-chips" aria-hidden="true">
          {chips.map(({ text, d }) => <span key={text} className="mono" style={{ "--d": d } as CSSProperties}>{text}</span>)}
        </div>
        </div>
      </div>
      <div className="meet-pip"><button onClick={onAsk}><MessageCircle size={17} /><span>Questions about my work? Ask Pip</span><ArrowUpRight size={16} /></button></div>
      <div className="hero-bottom mono">
        <span className="availability">
          <span className="status-dot" /> OPEN TO FULL-STACK OPPORTUNITIES
        </span>
        <span className="hero-stack">TYPESCRIPT · REACT · RUST · C++ · LUA · THREE.JS</span>
      </div>
    </motion.section>
  );
}


