
const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      color: "green",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 78 }
      ]
    },
    {
      title: "Backend",
      color: "blue",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Express", level: 85 },
        { name: "Python", level: 82 },
        { name: "GraphQL", level: 75 },
        { name: "REST APIs", level: 93 }
      ]
    },
    {
      title: "Database & Cloud",
      color: "purple",
      skills: [
        { name: "MongoDB", level: 87 },
        { name: "PostgreSQL", level: 83 },
        { name: "AWS", level: 80 },
        { name: "Docker", level: 78 },
        { name: "Redis", level: 72 }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: { border: "border-green-400/30", bg: "bg-green-400/10", text: "text-green-400", bar: "bg-green-400" },
      blue: { border: "border-blue-400/30", bg: "bg-blue-400/10", text: "text-blue-400", bar: "bg-blue-400" },
      purple: { border: "border-purple-400/30", bg: "bg-purple-400/10", text: "text-purple-400", bar: "bg-purple-400" }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-green-400 font-mono">
            {"/* Technical Skills */"}
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-4"></div>
          <p className="text-green-300/80 font-mono">
            const skills = require('./my-expertise.json');
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const colors = getColorClasses(category.color);
            return (
              <div key={category.title} className={`border ${colors.border} rounded-lg p-6 ${colors.bg} backdrop-blur-sm`}>
                <h3 className={`text-xl font-mono ${colors.text} mb-6 flex items-center`}>
                  <span className="mr-2">{categoryIndex + 1}.</span>
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`font-mono text-sm ${colors.text}`}>
                          {skill.name}
                        </span>
                        <span className={`font-mono text-xs ${colors.text}/80`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`${colors.bar} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={`mt-6 p-3 bg-black/30 rounded border border-${category.color}-400/20`}>
                  <pre className={`text-xs ${colors.text}/60 font-mono`}>
{`// ${category.title.toLowerCase()}_stack.config
module.exports = {
  tools: ${category.skills.length},
  expertise: "advanced",
  status: "active"
};`}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
