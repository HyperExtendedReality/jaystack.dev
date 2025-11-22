import { motion } from "motion/react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiUnity, SiUnrealengine, SiDotnet, SiRust, 
  SiLua, SiDocker, SiCplusplus, SiGraphql, SiMeta, SiPhp, SiBevy,
  SiAstro, SiLaravel, SiMysql, SiMongodb, SiMariadb, SiGo
} from "react-icons/si";
import { Database, Globe, Gamepad2, Terminal, Layers, Award, GraduationCap } from "lucide-react";

const PythonOriginal = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    className={className}
  >
    <path 
      fill="#306998" 
      d="M167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" 
    />
    <path 
      fill="#ffd43b" 
      d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3z" 
    />
  </svg>
);

const Skills = () => {
  const fullStack = {
    title: "Full-Stack Development",
    icon: Layers,
    frontend: [
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "React Native", icon: SiReact, color: "text-cyan-400" },
      { name: "Astro", icon: SiAstro, color: "text-orange-500" },
      { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" }
    ],
    backend: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-300" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "MariaDB", icon: SiMariadb, color: "text-orange-400" },
      { name: "Rust", icon: SiRust, color: "text-orange-500" },
      { name: "C#", icon: SiDotnet, color: "text-purple-500" },
      { name: "Python", icon: PythonOriginal, color: "text-yellow-400" },
      { name: "Go", icon: SiGo, color: "text-cyan-400" },
      { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" }
    ]
  };

  const specialized = [
    {
      id: "software",
      title: "Software Developer",
      icon: Terminal,
      color: "from-green-500 to-emerald-600",
      skills: [
        { name: "C#", icon: SiDotnet, color: "text-purple-500" },
        { name: "Python", icon: PythonOriginal, color: "text-yellow-400" },
        { name: "C++", icon: SiCplusplus, color: "text-blue-500" },
        { name: "Rust", icon: SiRust, color: "text-orange-500" },
      ]
    },
    {
      id: "gamedev",
      title: "XR & Game Developer",
      icon: Gamepad2,
      color: "from-emerald-500 to-teal-600",
      skills: [
        { name: "Unity", icon: SiUnity, color: "text-gray-200" },
        { name: "Unreal", icon: SiUnrealengine, color: "text-gray-200" },
        { name: "Lua", icon: SiLua, color: "text-blue-600" },
        { name: "Bevy", icon: SiBevy, color: "text-white" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-10 px-4 relative flex flex-col justify-center scroll-mt-16">
        {/* Sophisticated Background removed as requested */}

        
        <div className="max-w-5xl mx-auto relative z-10 w-full">
            {/* Professional Title Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    Technical Expertise
                </h2>
                <div className="h-1 w-80 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
                <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
                    Expertise across a versatile stack, utilized to build high-performance websites, scalable software, and immersive experiences.
                </p>
            </motion.div>

            <div className="flex flex-col items-center gap-6">
                
                {/* APEX: Full Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-4xl"
                >
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden hover:border-green-500/30 transition-all duration-500 shadow-2xl shadow-green-900/20 group">
                        {/* Subtle Top Gradient */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
                        
                        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                            {/* Front-End */}
                            <div className="p-8 flex flex-col items-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Globe className="w-5 h-5 text-green-400" />
                                        <h3 className="text-lg md:text-md font-semibold text-white">Front-End</h3>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {fullStack.frontend.map(skill => (
                                            <div key={skill.name} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-gray-300 flex items-center gap-3 hover:bg-white/10 hover:border-white/10 transition-all cursor-default group">
                                                <skill.icon className={`w-4 h-4 ${skill.color} group-hover:scale-110 transition-transform`} />
                                                <span className="group-hover:text-white transition-colors">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Back-End */}
                            <div className="p-8 flex flex-col items-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Database className="w-5 h-5 text-emerald-400" />
                                        <h3 className="text-lg font-semibold text-white">Back-End</h3>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {fullStack.backend.map(skill => (
                                            <div key={skill.name} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-gray-300 flex items-center gap-3 hover:bg-white/10 hover:border-white/10 transition-all cursor-default group">
                                                <skill.icon className={`w-4 h-4 ${skill.color} group-hover:scale-110 transition-transform`} />
                                                <span className="group-hover:text-white transition-colors">{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Unified Label */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-green-500/30 px-4 py-1.5 rounded-full z-20 hidden md:flex items-center gap-2 shadow-xl shadow-green-900/20">
                            <Layers className="w-6.5 h-6.5 text-green-400" />
                            <span className="text-lg font-bold text-white tracking-wider">Full-Stack</span>
                        </div>

                        {/* Docker & PHP Middle Pill */}
                        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl z-20 hidden md:flex flex-col gap-2 shadow-2xl shadow-black/50">
                            <div className="flex items-center gap-3">
                                <SiDocker className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-200">Docker</span>
                            </div>
                            <div className="w-full h-px bg-white/10" />
                            <div className="flex items-center gap-3">
                                <SiPhp className="w-6 h-6 text-indigo-400" />
                                <span className="text-sm font-medium text-gray-200">PHP</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* BASE: Specialized Skills */}
                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {specialized.map((category, idx) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                            className="relative group"
                        >
                            <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/[0.07] hover:border-green-500/20 transition-all duration-300 flex flex-col items-center text-center">
                                
                                {/* Unified Label Style */}
                                <div className="bg-black/80 backdrop-blur-xl border border-green-500/30 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl shadow-green-900/20 mb-6">
                                    <category.icon className={`w-5 h-5 ${idx === 0 ? 'text-green-400' : 'text-emerald-400'}`} />
                                    <span className="text-lg font-bold text-white tracking-wider">{category.title}</span>
                                </div>
                                
                                <div className="flex flex-wrap justify-center gap-3">
                                    {category.skills.map(skill => (
                                        <div key={skill.name} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-base text-gray-300 flex items-center gap-3 hover:bg-white/10 hover:border-white/10 transition-all cursor-default group">
                                            <skill.icon className={`w-5 h-5 ${skill.color} group-hover:scale-110 transition-transform`} />
                                            <span className="group-hover:text-white transition-colors">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-4xl mt-8 mx-auto"
            >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-green-500/20 transition-all duration-300">
                    <div className="flex items-center gap-3 min-w-fit">
                        <Award className="w-6 h-6 text-green-400" />
                        <h3 className="text-xl font-bold text-white">Certifications</h3>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full">
                        {/* Meta */}
                        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-gray-300 flex items-center gap-3 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-all cursor-default group">
                            <div className="flex gap-1">
                                <SiMeta className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-400" />
                                <SiReact className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-400" />
                            </div>
                            <span className="text-sm font-medium">Meta Front-End Developer</span>
                        </div>

                        {/* Python */}
                        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-gray-300 flex items-center gap-3 hover:bg-yellow-500/10 hover:text-yellow-400 hover:border-yellow-500/20 transition-all cursor-default group">
                            <PythonOriginal className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Intermediate Python</span>
                        </div>

                        {/* CS50 */}
                        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-gray-300 flex items-center gap-3 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all cursor-default group">
                            <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Harvard CS50</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

export default Skills;
