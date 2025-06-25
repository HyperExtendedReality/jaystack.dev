
import { useState } from "react";
import { Terminal } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [terminalOutput, setTerminalOutput] = useState([
    "$ Welcome to contact terminal",
    "$ Type your message and hit send",
    "$ All communications are encrypted",
    ""
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOutput = [
      ...terminalOutput,
      `$ Sending message from ${formData.name}...`,
      `$ Email: ${formData.email}`,
      `$ Message length: ${formData.message.length} characters`,
      `$ Status: Message queued for transmission`,
      `$ Success: Message sent successfully! ✓`,
      ""
    ];
    setTerminalOutput(newOutput);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-t from-black to-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-green-400 font-mono">
            {">> Contact Me"}
          </h2>
          <div className="w-24 h-1 bg-green-400 mx-auto mb-4"></div>
          <p className="text-green-300/80 font-mono">
            ./connect --with="me" --method="secure"
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="border border-green-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-mono text-green-400 mb-4 flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                Get In Touch
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-green-400 mb-2">
                    $ whoami
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-2 text-green-400 font-mono focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono text-green-400 mb-2">
                    $ echo $EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-2 text-green-400 font-mono focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono text-green-400 mb-2">
                    $ cat message.txt
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-2 text-green-400 font-mono focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 resize-none"
                    placeholder="Type your message here..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 border border-green-400 text-green-400 font-mono hover:bg-green-400 hover:text-black transition-all duration-300 rounded-md"
                >
                  ./send-message.sh
                </button>
              </form>
            </div>
            
            <div className="border border-blue-400/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-lg font-mono text-blue-400 mb-4">Quick Connect</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">→</span>
                  <span className="text-blue-300">email:</span>
                  <span className="text-blue-400">dev@yourname.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">→</span>
                  <span className="text-blue-300">linkedin:</span>
                  <span className="text-blue-400">/in/yourname</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">→</span>
                  <span className="text-blue-300">github:</span>
                  <span className="text-blue-400">@yourname</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">→</span>
                  <span className="text-blue-300">location:</span>
                  <span className="text-blue-400">Your City, Country</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-900/50 px-4 py-2 border-b border-green-400/30 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs font-mono text-green-400 ml-2">terminal</span>
            </div>
            
            <div className="p-4 h-96 overflow-y-auto">
              <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
                <span className="animate-pulse">_</span>
              </pre>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-block p-4 border border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm">
            <p className="text-green-400 font-mono text-sm">
              {"/* Let's build something amazing together */"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
