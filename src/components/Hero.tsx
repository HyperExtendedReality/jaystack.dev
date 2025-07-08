import { useState, useEffect } from "react";
import { Terminal, Code, Database } from "lucide-react";
import MatrixBackground from "./MatrixBackground";
import Globe3D from "./Globe3D";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // No changes needed in the state or effects
  const codeSnippets = [
    "Game Developer", "XR Specialist", "FiveM & Lua Expert", "Full-Stack Developer",
  ];

  useEffect(() => {
    const currentText = codeSnippets[currentIndex];
    const typeSpeed = 100;
    const waitTime = 2000;

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
  }, [displayText, currentIndex, codeSnippets]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    // MODIFICATION: Changed to flex-col for mobile-first layout.
    // lg:relative is crucial for absolute positioning to work relative to the section on desktop.
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden py-16 lg:py-0">
      <MatrixBackground />

      {/* 
        DEVELOPER CODE SNIPPET (z-10)
        MODIFICATION: Becomes a normal block on mobile and absolute only on desktop.
        - `order-1` places it first on mobile.
        - Responsive classes like `lg:absolute` apply the desktop layout.
        - Removed `hidden` to make it visible on mobile.
      */}
      <div className="w-full max-w-sm p-2 border border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm z-10 
                       lg:absolute lg:top-24 lg:left-20 lg:max-w-md order-1 lg:order-none">
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
{`import { useState } from "react";

export function hireDeveloper() {
  const name = "Jay";
  const role = "${displayText}${showCursor ? "|" : " "}";
  const location = 'Orlando, FL';

  const getSkills = () => [
    "React", "TypeScript",
    "jQuery", "WordPress",
    "GraphQL", "MySQL",
    "PostgreSQL"
  ];

  return { name, role, location, getSkills };
}`}
          </pre>
      </div>

      {/* 
        GLOBE SECTION (z-10)
        MODIFICATION: Now responsive. It's a normal block on mobile and absolute on desktop.
        - `order-3` places it last on mobile.
        - Sizing and positioning are now responsive (`w-[80vw]` on mobile, `lg:w-[40vw]` on desktop).
      */}
      <div className="relative w-[80vw] sm:w-[60vw] max-w-xs mt-8 
                       lg:absolute lg:inset-y-0 lg:-right-20 lg:w-[40vw] lg:max-w-none 
                       flex items-center justify-center pointer-events-none z-10 
                       order-3 lg:order-none">
        <div className="w-full aspect-square relative lg:mr-16">
          <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 pointer-events-auto">
            <Globe3D />
          </div>
          <div className="absolute top-8 right-12 text-green-400 font-mono text-xs hidden lg:block">
            // Global Network
          </div>
        </div>
      </div>

      {/* 
        MAIN CONTENT (z-20)
        MODIFICATION: Container width is now constrained on desktop to prevent overlap.
        - `lg:max-w-3xl` stops the container from covering the globe.
        - `order-2` places it in the middle on mobile.
      */}
      <div className="w-full lg:max-w-3xl mx-auto flex justify-center items-center relative z-20 order-2 lg:order-none mt-8 lg:mt-0">
        <div className="w-full text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-400 text-center">
            {"<HelloWorld />"}
          </h1>
          
          <p className="text-xl md:text-2xl text-green-300/80 mb-8 font-mono">
            console.log("Building the future, one line of code at a time");
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 border border-green-400/30 rounded-md bg-green-400/10">
              <Code className="h-5 w-5 text-green-400" />
              <span className="font-mono text-sm">Frontend</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-blue-400/30 rounded-md bg-blue-400/10">
              <Terminal className="h-5 w-5 text-blue-400" />
              <span className="font-mono text-sm text-blue-400">Backend</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-purple-400/30 rounded-md bg-purple-400/10">
              <Database className="h-5 w-5 text-purple-400" />
              <span className="font-mono text-sm text-purple-400">Database</span>
            </div>
          </div>
          
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-green-400 text-green-400 font-mono hover:bg-green-400 hover:text-black transition-all duration-300 rounded-md transform hover:scale-105"
          >
            ./view-projects.sh
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator - No changes needed */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;