import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.05, 0.2, 0.5] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="fixed left-0 top-[env(safe-area-inset-top)] z-50 flex w-full justify-center px-3 pointer-events-none sm:px-4">
      <motion.nav
        aria-label="Primary navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrolled ? 12 : 0,
          opacity: 1,
          width: "100%",
          maxWidth: scrolled ? "48rem" : "100%",
          borderRadius: scrolled ? "28px" : "0px",
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.82)" : "rgba(0, 0, 0, 0)",
          borderColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pointer-events-auto relative flex min-h-14 items-center justify-between border border-transparent px-3 py-2 shadow-lg shadow-green-900/5 sm:px-6 sm:py-3"
      >
        {/* Logo */}
        <div
          className="group flex min-h-11 items-center gap-2 rounded-full pr-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") scrollToSection("home");
          }}
        >
          <div className="p-1.5 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors">
            <Terminal className="h-4 w-4 text-green-400" />
          </div>
          <span className="text-sm font-mono font-bold text-green-400/90 group-hover:text-green-400 transition-colors">
            jaystack.dev
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 shadow-2xl shadow-black/70 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={`min-h-12 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-300 ${
                      activeSection === item.id ? "bg-green-400/10 text-green-300" : "text-white/70"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navigation;
