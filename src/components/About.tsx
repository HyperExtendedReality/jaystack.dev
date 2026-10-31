import { useRef } from "react";
import { motion, useReducedMotion, type MotionStyle } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useScrollVar } from "@/hooks/use-scroll-var";
export default function About() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const progress = useScrollVar(section, ["start end", "center center"]);
  return (
    <motion.section
      ref={section}
      id="about"
      className="about-section section-shell"
      aria-labelledby="about-title"
      style={{ "--p": progress } as MotionStyle}
    >
      <div className="about-layout">
        <div className="about-art" aria-hidden="true">
          <div className="about-orbit orbit-one" />
          <div className="about-orbit orbit-two" />
          <div className="about-orbit orbit-three" />
          <span className="about-asterisk">✳</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 id="about-title" className="about-reveal">
            Engineer by trade.
            <br />
            <em>Builder by nature.</em>
          </h2>
          <p className="about-lead">
            I’m Jay, a software engineer who works across the full web stack and
            game development, with a product mindset and a soft spot for the unexpected.
          </p>
          <p>
            I like connecting things: elegant interfaces to reliable backends,
            ambitious ideas to practical solutions, and a little imagination to
            a lot of engineering.
          </p>
          <p>
            From mobile AI to multiplayer worlds, I own the whole problem and
            follow it wherever it leads.
          </p>
          <a
            className="text-link"
            href="https://github.com/HyperExtendedReality"
            target="_blank"
            rel="noreferrer"
          >
            Find me in the source <ArrowUpRight size={17} />
          </a>
        </motion.div>
      </div>
      <div className="process-strip">
        {[
          { title: "Understand", desc: "Start with the right question." },
          { title: "Architect", desc: "Find the simplest strong foundation." },
          { title: "Build", desc: "Connect every layer with intention." },
          { title: "Refine", desc: "The details make the difference." },
        ].map((step) => (
          <div key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
