import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github, X, ArrowRight } from "lucide-react";
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
export default function Projects() {
  const [demo, setDemo] = useState(false);
  const reducedMotion = useReducedMotion();
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
          Less talk.
          <br />
          <em>More shipped.</em>
        </h2>
        <p>
          A curious mind, a versatile toolkit.
          <br />
          Real projects across the web, mobile,
          <br />
          and the worlds in between.
        </p>
      </div>
      <motion.article
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
              A little curiosity.
              <br />A whole new way to see nature.
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
              <button className="lime-button" onClick={() => setDemo(true)}>
                Try the interactive demo <ArrowUpRight size={17} />
              </button>
              <a
                href="https://github.com/HyperExtendedReality/FungEye"
                target="_blank"
                rel="noreferrer"
                aria-label="View FungEye source on GitHub"
              >
                <Github size={21} />
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
      <div className="work-grid">
        {work.map((project, index) => (
          <motion.article
            key={project.title}
            className={`work-card work-${project.art}`}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
          >
            <a
              className="project-art-link"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
            >
              <div className={`project-visual visual-${project.art}`}>
                <span className="project-status mono">{project.status}</span>
                {project.art === "infiniv" ? (
                  <div className="infinity-art" aria-hidden="true">
                    ∞<span>CONNECTED BY POSSIBILITY</span>
                  </div>
                ) : project.art === "physics" ? (
                  <div className="physics-art" aria-hidden="true">
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
                  <div className="world-art" aria-hidden="true">
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
                <span className="project-open">
                  <ArrowUpRight size={21} />
                </span>
              </div>
            </a>
            <div className="project-meta">
              <div>
                <span className="mono eyebrow">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.detail}</p>
              </div>
              <span className="mono project-tech">{project.tech}</span>
            </div>
          </motion.article>
        ))}
        <motion.article
          className="platform-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
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
        </motion.article>
      </div>
      {demo && (
        <div
          className="demo-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDemo(false);
          }}
        >
          <DemoDialog onClose={() => setDemo(false)} />
        </div>
      )}
    </section>
  );
}

function DemoDialog({ onClose }: { onClose: () => void }) {
  return (
    <dialog
      className="demo-dialog"
      ref={(element) => {
        if (element && !element.open) element.showModal();
      }}
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
