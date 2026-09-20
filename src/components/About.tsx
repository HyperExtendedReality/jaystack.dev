import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
export default function About() {
  const reduced = useReducedMotion();
  return (
    <section
      id="about"
      className="about-section section-shell"
      aria-labelledby="about-title"
    >
      <div className="section-kicker mono">
        <span>
          <i /> THE PERSON BEHIND THE PIXELS
        </span>
      </div>
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
          <h2 id="about-title">
            Engineer by trade.
            <br />
            <em>Builder by nature.</em>
          </h2>
          <p className="about-lead">
            I’m Jay, a full-stack software engineer with a product mindset and a
            soft spot for the unexpected.
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
    </section>
  );
}
