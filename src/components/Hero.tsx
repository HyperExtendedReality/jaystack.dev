import { useState, useEffect } from "react";
import { Terminal, Code, Database } from "lucide-react";
import MatrixBackground from "./MatrixBackground";
import Globe3D from "./Globe3D";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const codeSnippets = [
    "Full-Stack Developer", "React Specialist", "Node.js Expert", "Database Architect",
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
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      {/* z-0: The absolute bottom layer */}
      <MatrixBackground />

      {/* 
        DEVELOPER CODE SNIPPET (z-10)
        - Positioned absolutely to sit behind main content but above the matrix.
        - `top-24` leaves space for a potential navbar.
        - `left-4` removes the large implicit margin.
      */}
      <div className="absolute top-24 left-20 p-2 border border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm z-10 w-100% max-w-sm lg:max-w-md hidden lg:block">
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
        - Increased size to 40vw for more presence.
        - `pointer-events-none` on the container allows clicks to pass through.
        - The Globe3D component itself now has `pointer-events-auto` via className.
      */}
      <div className="absolute inset-y-0 -right-20 top-28 w-[40vw] flex items-center justify-center pointer-events-none z-10">
        <div className="w-full aspect-square relative mr-16">
          <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl"></div>
          {/* Globe component is inside a div to manage pointer events */}
          <div className="absolute inset-0 pointer-events-auto">
            <Globe3D />
          </div>
          <div className="absolute top-8 right-12 text-green-400 font-mono text-xs">
            // Global Network
          </div>
        </div>
      </div>

      {/* MAIN CONTENT (z-20) - Sits on top of everything else */}
      <div className="max-w-7xl mx-auto w-full flex justify-center items-center relative z-20">
        {/*
          This container now only holds the central HelloWorld content.
          It's centered using flexbox on the main wrapper.
          The left and right columns are now absolutely positioned.
        */}
        <div className="w-full lg:w-1/2 text-center flex flex-col items-center">
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