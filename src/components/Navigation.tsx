
import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-black/90 backdrop-blur-md border-b border-green-400/20" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Terminal className="h-8 w-8 text-green-400 mr-2" />
            <span className="text-xl font-mono font-bold text-green-400">
              {"<jaystack.dev />"}
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md text-sm font-mono transition-colors duration-300 hover:bg-green-400/10"
                >
                  .{item}()
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-green-400 hover:text-green-300 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-green-400/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-green-400 hover:text-green-300 block px-3 py-2 rounded-md text-base font-mono w-full text-left transition-colors duration-300 hover:bg-green-400/10"
              >
                .{item}()
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
