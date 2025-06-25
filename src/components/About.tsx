
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
  background: "Computer Science Graduate",
  experience: "5+ years in web development",
  passion: "Creating efficient, scalable solutions",
  currentFocus: [
    "Modern React applications",
    "RESTful API design",
    "Cloud architecture",
    "Performance optimization"
  ],
  hobbies: ["Open source", "Tech blogging", "Gaming"],
  coffee: "☕".repeat(Math.floor(Math.random() * 5) + 1)
};`}
              </pre>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="border border-green-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-mono text-green-400 mb-4">$ cat philosophy.txt</h3>
              <p className="text-green-300/80 leading-relaxed font-mono text-sm">
                I believe in writing clean, maintainable code that solves real-world problems. 
                My approach combines technical excellence with user-centered design, ensuring 
                that every application I build is both powerful and intuitive.
              </p>
              <div className="mt-4 p-3 bg-green-400/10 rounded border-l-4 border-green-400">
                <p className="text-green-400 font-mono text-xs">
                  "Code is like humor. When you have to explain it, it's bad." - Cory House
                </p>
              </div>
            </div>
            
            <div className="border border-blue-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-mono text-blue-400 mb-4">$ ls achievements/</h3>
              <ul className="space-y-2 text-blue-300/80 font-mono text-sm">
                <li>→ 50+ projects deployed to production</li>
                <li>→ Led development teams of 5+ engineers</li>
                <li>→ Reduced load times by 60% through optimization</li>
                <li>→ Active contributor to open-source projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
