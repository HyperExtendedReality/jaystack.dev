
const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-green-400 font-mono">
            {"// About Me"}
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="border border-green-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`const aboutMe = {
  background: [
    "Self-Taught Programmer",
    "Harvard CS50 Certified",
    "Meta Front-End Developer Certified"
  ],
  web_xp: "1+ years",
  gamedev_xp: "3+ years",
  passion: "Building immersive digital experiences",
  currentFocus: [
    "Full-Stack Web Development",
    "Mobile App Development",
    "Unreal Engine & XR",
    "Unity (C#)",
    "Headless Web Architecture"
    "FiveM Server Development (Lua & C#)"
  ],
  coffee: "☕".repeat(Math.floor(Math.random() * 5) + 1)
};`}
              </pre>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="border border-green-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-mono text-green-400 mb-4">$ cat ./dev_philosophy.md</h3>
              <p className="text-green-300/80 leading-relaxed font-mono text-sm">
                My journey is rooted in a passion for creating interactive worlds. I apply game design principles to web development, focusing on performance, user engagement, and clean, scalable code. Whether it's a game mechanic or a UI component, I build with purpose and precision.
              </p>
              <div className="mt-4 p-3 bg-green-400/10 rounded border-l-4 border-green-400">
                <p className="text-green-400 font-mono text-xs">
                "Programming isn't about what you know; it's about what you can figure out.” - Chris Pine
                </p>
              </div>
            </div>
            
            <div className="border border-blue-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-mono text-blue-400 mb-4">$ ls ./achievements/</h3>
              <ul className="space-y-2 text-blue-300/80 font-mono text-sm">
                <li>→ Freelance developer for multiple FiveM communities</li>
                <li>→ Shipped numerous self-directed game projects</li>
                <li>→ Developed full-stack headless e-commerce sites</li>
                <li>→ Harvard's CS50 & Meta's Front-End Development Certified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
