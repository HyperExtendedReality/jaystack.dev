import { useState, useEffect } from "react";
import { Terminal, Code, Minus, Square, X, Gamepad2, ArrowRight } from "lucide-react";
import MatrixBackground from "./MatrixBackground";
import Globe3D from "./Globe3D";

const codeSnippets = [
  "Full-Stack Developer",
  "Software Engineer",
  "XR/Game Developer"
];

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentText = codeSnippets[currentIndex];
    const typeSpeed = 120;
    const waitTime = 1000;

    if (displayText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
      }, waitTime);
      return () => clearTimeout(timeout);
    }
  }, [displayText, currentIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative px-4 py-16 lg:py-0"
    >
      <MatrixBackground />

      {/* 
        MAIN CONTENT (Text)
        Desktop: Left side
        Mobile: Middle (order-2)
      */}
      <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-12 flex justify-center lg:justify-start items-center relative z-20 order-2 lg:order-1 mt-8 lg:mt-0">
        <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            <span className="text-green-400">{'<HelloWorld />'}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light max-w-2xl leading-relaxed">
            Building <span className="text-green-400 font-mono">high-performance web apps</span>, <span className="text-emerald-400 font-mono">robust software</span>, and <span className="text-teal-400 font-mono">immersive games</span>.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 border border-green-500/30 rounded-full bg-green-500/5 backdrop-blur-sm hover:bg-green-500/10 transition-colors">
              <Code className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">Full-Stack Developer</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-emerald-500/30 rounded-full bg-emerald-500/5 backdrop-blur-sm hover:bg-emerald-500/10 transition-colors">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">Software Engineer</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-teal-500/30 rounded-full bg-teal-500/5 backdrop-blur-sm hover:bg-teal-500/10 transition-colors">
              <Gamepad2 className="h-4 w-4 text-teal-400" />
              <span className="text-sm text-teal-300 font-medium">
                XR & Game Developer
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-8 py-3 bg-white/5 border border-green-500/30 text-green-300 font-mono rounded-lg overflow-hidden transition-all duration-300 hover:bg-green-500/10 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
      {/* 
        RIGHT SIDE (Code Window & Globe)
        Desktop: Right side
        Mobile: Code is order-1
      */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center order-1 lg:order-2 h-[50vh] lg:h-screen">
        
        {/* GLOBE SECTION (Background of Right Side) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="relative w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] lg:translate-y-20 lg:-translate-x-40">
                <div className="absolute inset-0 bg-green-500/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 pointer-events-auto">
                    <Globe3D cameraZ={22} />
                </div>
            </div>
        </div>

        {/* MOCK CODE WINDOW - Foreground element */}
        <div className="w-full max-w-sm lg:max-w-sm relative z-30 lg:absolute lg:right-6 lg:top-[35%] lg:-translate-y-1/2 transform transition-all hover:scale-[1.02] duration-300">
            {/* Windows-like Glass Container */}
            <div className="rounded-xl overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/5">
              {/* Title Bar */}
              <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
                <div className="text-xs text-white/40 font-sans select-none">developer.tsx</div>
                <div className="flex gap-3">
                  <Minus className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  <Square className="w-2.5 h-2.5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  <X className="w-3 h-3 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-4 bg-black/50">
                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap leading-snug">
{`const developer = {
  name: "Jay",
  location: "Orlando, FL",
  role: ["Full-Stack Developer", "Software Engineer", "XR/Game Developer"],
  status: "Open to Opportunities",
  focus: [
    "Modern Front-End Web Architecture",
    "High-Performance Back-End Systems",
    "FiveM Server Infrastructure",
    "XR & Game Development"
  ]
};`}
                </pre>
              </div>
            </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
