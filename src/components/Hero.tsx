
import { useState, useEffect } from "react";
import { Terminal, Code, Database } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const codeSnippets = [
    "Full-Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "Database Architect"
  ];
  
  useEffect(() => {
    const currentText = codeSnippets[currentIndex];
    
    if (displayText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
      }, 2000);
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
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-block p-4 border border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm mb-6">
            <pre className="text-sm text-green-400 font-mono">
{`class Developer {
  constructor() {
    this.name = "Your Name";
    this.role = "${displayText}${showCursor ? '|' : ' '}";
    this.location = "Your City";
  }
  
  getSkills() {
    return ['React', 'Node.js', 'TypeScript', 'MongoDB'];
  }
}`}
            </pre>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-400">
          {"<Hello World />"}
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
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
