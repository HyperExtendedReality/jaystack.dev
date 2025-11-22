import { motion } from "motion/react";
import { Gauge, BrainCircuit, Terminal, Layers, ShieldCheck, Minus, Square, X } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            About Me
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Professional Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <Terminal className="text-green-400 w-6 h-6" />
              Full-Stack, Software, XR/Game Developer
            </h3>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              I am a versatile developer with expertise spanning <span className="text-green-400 font-medium">full-stack web applications</span>, <span className="text-emerald-400 font-medium">high-performance software</span>, and <span className="text-teal-400 font-medium">immersive XR & game experiences</span>.
              I bridge the gap between complex backend logic, interactive 3D environments, and intuitive frontend interfaces.
            </p>

            <p className="text-gray-400 leading-relaxed">
              My approach is practical and results-driven: write clean, maintainable code that solves real business problems. 
              Whether building scalable web platforms or optimizing real-time rendering engines, I am constantly refining my stack to deliver the best possible solutions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <Gauge className="text-green-400 mb-2 w-5 h-5" />
                <h4 className="text-white font-medium text-sm">Performance First</h4>
                <p className="text-gray-500 text-xs mt-1">Optimized & Efficient Code</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <Layers className="text-cyan-400 mb-2 w-5 h-5" />
                <h4 className="text-white font-medium text-sm">Modern Architecture</h4>
                <p className="text-gray-500 text-xs mt-1">Scalable & Future-Proof</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="text-teal-400 mb-2 w-5 h-5" />
                <h4 className="text-white font-medium text-sm">Robust Engineering</h4>
                <p className="text-gray-500 text-xs mt-1">Type-Safe & Reliable</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <BrainCircuit className="text-emerald-400 mb-2 w-5 h-5" />
                <h4 className="text-white font-medium text-sm">Agile Delivery</h4>
                <p className="text-gray-500 text-xs mt-1">Proactive & Self-Managed</p>
              </div>
            </div>
          </motion.div>
          
          {/* Technical Profile Code Block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-2xl" />
            <div className="relative rounded-xl bg-[#0f1115] border border-white/10 shadow-2xl overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <span className="text-xs text-gray-500 font-mono">profile.ts</span>
                <div className="flex gap-3">
                  <Minus className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  <Square className="w-2.5 h-2.5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  <X className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="block">
                    <span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> <span className="text-white">=</span> <span className="text-white">{`{`}</span>
                  </code>
                  
                  {/* Name */}
                  <code className="block pl-4">
                    <span className="text-sky-300">name:</span> <span className="text-emerald-300">"Jay"</span><span className="text-white">,</span>
                  </code>

                  {/* Fixed: Role is now an array with proper commas */}
                  <code className="block pl-4">
                    <span className="text-sky-300">role:</span> <span className="text-white">[</span>
                    <span className="text-emerald-300">"Full-Stack"</span><span className="text-white">, </span>
                    <span className="text-emerald-300">"Software"</span><span className="text-white">, </span>
                    <span className="text-emerald-300">"XR/Game Dev"</span>
                    <span className="text-white">],</span>
                  </code>

                  {/* Focus Array Start */}
                  <code className="block pl-4">
                    <span className="text-sky-300">focus:</span> <span className="text-white">[</span>
                  </code>
                  
                  {/* Focus Items */}
                  <code className="block pl-8">
                    <span className="text-emerald-300">"React", "Next.js", "React Native", "TypeScript",</span>
                  </code>
                  <code className="block pl-8">
                    <span className="text-emerald-300">"C#", "Python", "PHP", "Golang", "Rust",</span>
                  </code>
                  <code className="block pl-8">
                    <span className="text-emerald-300">"High-performance Back-End Solutions",</span>
                  </code>
                  <code className="block pl-8">
                    <span className="text-emerald-300">"XR / Game Development"</span>
                  </code>
                  
                  {/* Focus Array End */}
                  <code className="block pl-4">
                    <span className="text-white">],</span>
                  </code>

                  {/* Status */}
                  <code className="block pl-4">
                    <span className="text-sky-300">status:</span> <span className="text-emerald-300">"Open to Opportunities"</span>
                  </code>

                  <code className="block">
                    <span className="text-white">{`};`}</span>
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
