import { motion } from "motion/react";
import { ArrowDown, Compass, Layers3, Rocket, SlidersHorizontal } from "lucide-react";

const process = [
  { number: "01", title: "Frame", description: "Find the real product problem and define what success looks like.", icon: Compass },
  { number: "02", title: "Architect", description: "Choose the smallest durable system that can grow with the idea.", icon: Layers3 },
  { number: "03", title: "Build", description: "Move fluidly from interface to API, data, infrastructure, and device.", icon: SlidersHorizontal },
  { number: "04", title: "Refine", description: "Profile, test, polish, and ship an experience people can trust.", icon: Rocket },
];

const About = () => (
  <section id="about" aria-labelledby="about-title" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
    <div className="mx-auto max-w-[88rem]">
      <div className="grid gap-10 border-y border-white/[0.08] py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8ff4a]">How I think</p>
          <div className="mt-8 flex items-center gap-3 text-xs text-white/30"><ArrowDown className="h-4 w-4 text-[#c8ff4a]" /> The shortest path from idea to value</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.08 }}>
          <h2 id="about-title" className="max-w-5xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-[#f4f1e8] sm:text-5xl lg:text-7xl">
            Broad technical range. <span className="display-serif font-normal italic text-white/38">One product mindset.</span>
          </h2>
          <div className="mt-8 grid gap-5 text-base leading-7 text-white/50 sm:grid-cols-2 sm:text-lg sm:leading-8">
            <p>I’m a full-stack software engineer who enjoys owning the whole problem—not just the layer where it first appears.</p>
            <p>That range lets me connect product decisions to technical ones, whether the result lives in a browser, on a phone, inside a model, or in a real-time world.</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {process.map(({ number, title, description, icon: Icon }, index) => (
          <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.06 }} className="group rounded-[1.6rem] border border-white/[0.08] bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.04] sm:p-6">
            <div className="flex items-center justify-between"><span className="text-[10px] font-semibold tracking-[0.18em] text-white/25">/{number}</span><Icon className="h-5 w-5 text-[#c8ff4a] transition-transform group-hover:rotate-6" /></div>
            <h3 className="mt-12 text-xl font-semibold tracking-[-0.025em] text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/42">{description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default About;
