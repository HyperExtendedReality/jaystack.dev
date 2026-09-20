import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Pause, Play, ArrowRight, MessageCircle } from "lucide-react";
const AssemblyLine = lazy(() => import("./AssemblyLine"));
export default function Hero({ onAsk }: { onAsk: () => void }) {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(0);
  return (
    <section id="home" className="studio-hero" aria-labelledby="hero-title">
      <div className="hero-topline mono">
        <span>INDEPENDENT MIND. FULL-STACK ENGINEER.</span>
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
            Hey, I’m Jay. I build things that move you.
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
              Thoughtful interfaces. Powerful systems. A playful edge.
              <br className="desktop-break" /> I turn ambitious ideas into
              software that feels different.
            </p>
            <div className="hero-actions">
              <a className="lime-button" href="#projects">
                Explore my work <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#about">
                A little about me <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>
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
              <p>Scroll to build. A little idea → a real product.</p>
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
      </div>
      <div className="meet-pip"><button onClick={onAsk}><MessageCircle size={17} /><span>Meet Pip, my portfolio sidekick</span><ArrowUpRight size={16} /></button><span>Questions about my work? Ask the little robot.</span></div>
      <div className="hero-bottom mono">
        <a href="#projects">
          <ArrowDown size={14} /> SCROLL TO DISCOVER
        </a>
        <span className="availability">
          <span className="status-dot" /> OPEN TO FULL-STACK OPPORTUNITIES
        </span>
      </div>
    </section>
  );
}


