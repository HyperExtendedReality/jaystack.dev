
import { useState } from "react";
import { Code, Database, Terminal } from "lucide-react";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      type: "Full-Stack Application",
      description: "A complete e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
      features: ["User authentication", "Payment integration", "Admin panel", "Real-time updates"],
      status: "Production",
      lines: "15,000+"
    },
    {
      id: 2,
      title: "Task Management API",
      type: "Backend Service",
      description: "RESTful API with GraphQL support for team collaboration and project management with real-time notifications.",
      tech: ["Node.js", "GraphQL", "PostgreSQL", "Docker", "AWS"],
      features: ["GraphQL API", "Real-time sync", "Team collaboration", "Cloud deployment"],
      status: "Active",
      lines: "8,500+"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      type: "Frontend Application",
      description: "Interactive data visualization dashboard with custom charts, filters, and export functionality.",
      tech: ["React", "TypeScript", "D3.js", "Tailwind", "Vite"],
      features: ["Interactive charts", "Data export", "Custom filters", "Responsive design"],
      status: "Beta",
      lines: "12,000+"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-green-400 font-mono">
            {"<Projects />"}
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-4"></div>
          <p className="text-green-300/80 font-mono">
            git log --oneline --decorate --graph
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`border border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-400/20 cursor-pointer ${
                activeProject === index ? 'ring-2 ring-green-400/50' : ''
              }`}
              onClick={() => setActiveProject(index)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-mono text-green-400">{project.title}</h3>
                  <div className="flex items-center gap-1">
                    {project.type.includes('Full-Stack') && <Code className="h-4 w-4 text-green-400" />}
                    {project.type.includes('Backend') && <Database className="h-4 w-4 text-blue-400" />}
                    {project.type.includes('Frontend') && <Terminal className="h-4 w-4 text-purple-400" />}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs font-mono text-green-300/60 bg-green-400/10 px-2 py-1 rounded">
                    {project.type}
                  </span>
                  <span className="text-xs font-mono text-green-400 bg-black/50 px-2 py-1 rounded ml-2">
                    {project.status}
                  </span>
                </div>
                
                <p className="text-green-300/80 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-mono text-green-400 mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs font-mono bg-green-400/10 text-green-300 px-2 py-1 rounded border border-green-400/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-mono text-green-400 mb-2">Key Features:</h4>
                    <ul className="text-xs font-mono text-green-300/70 space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>→ {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-green-400/20">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-green-400/60">Lines of code:</span>
                    <span className="text-green-400">{project.lines}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-400/5 p-4 border-t border-green-400/20">
                <pre className="text-xs text-green-400/60 font-mono overflow-x-auto">
{`$ git status
On branch main
Your branch is up to date with 'origin/main'
nothing to commit, working tree clean`}
                </pre>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-green-400/50 text-green-400 font-mono hover:bg-green-400/10 transition-all duration-300 rounded-md">
            git clone --all-projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
