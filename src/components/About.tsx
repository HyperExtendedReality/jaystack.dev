import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Gauge, Layers3, ShieldCheck } from "lucide-react";

const principles: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Start with the product", description: "Make the useful thing clear before adding complexity.", icon: Layers3 },
  { title: "Engineer for reality", description: "Design around performance, reliability, and real constraints.", icon: Gauge },
  { title: "Ship with confidence", description: "Keep systems understandable, testable, and easy to evolve.", icon: ShieldCheck },
];

const About = () => (
  <section id="about" aria-labelledby="about-title" className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
    <div className="pointer-events-none absolute left-[-8rem] top-1/3 h-80 w-80 rounded-full bg-green-400/[0.04] blur-3xl" />
    <div className="relative mx-auto max-w-7xl">
      <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-green-400">About / approach</p>
          <h2 id="about-title" className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Product thinking backed by deep implementation.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.58] sm:text-lg sm:leading-8">
            I build across interface, infrastructure, intelligent systems, and real-time experiences—so the final product feels coherent, not stitched together.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
            I’m most useful on ambitious projects that need technical range, clear decisions, and a strong path from idea to production.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Product-minded", "Performance-aware", "End-to-end ownership"].map((quality) => (
              <span key={quality} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-2 text-xs text-white/[0.55]">
                {quality}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 via-transparent to-cyan-400/[0.06] blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-white/[0.03] p-3 backdrop-blur-sm sm:p-4">
            <div className="flex items-center justify-between px-3 pb-3 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-green-300/70">How I work</span>
              <span className="h-2 w-2 rounded-full bg-green-300 shadow-[0_0_12px_rgba(134,239,172,0.65)]" />
            </div>
            <div className="space-y-2">
              {principles.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + index * 0.08 }}
                  className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-black/25 p-4 transition-colors hover:border-green-300/15 hover:bg-white/[0.035] sm:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-green-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-white sm:text-base">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
