import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
    { id: "about", label: "Approach" },
    { id: "skills", label: "Capabilities" },
    { id: "projects", label: "Work" },
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
    <div className="pointer-events-none fixed left-0 top-[env(safe-area-inset-top)] z-50 flex w-full justify-center px-3 sm:px-5">
      <motion.nav
        aria-label="Primary navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrolled ? 14 : 0,
          opacity: 1,
          width: "100%",
          maxWidth: scrolled ? "54rem" : "100%",
          borderRadius: scrolled ? "999px" : "0px",
          backgroundColor: scrolled ? "rgba(11, 13, 12, 0.88)" : "rgba(11, 13, 12, 0)",
          borderColor: scrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pointer-events-auto relative flex min-h-16 items-center justify-between border border-transparent px-3 py-2 shadow-2xl shadow-black/10 sm:px-5"
      >
        {/* Logo */}
        <div
          className="group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full pr-2"
          onClick={() => scrollToSection("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") scrollToSection("home");
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}jaystack-mark.svg`}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
          />
          <span className="text-sm font-semibold tracking-[-0.02em] text-[#f4f1e8]">jaystack<span className="text-white/35">.dev</span></span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-3.5 py-2 text-xs font-medium text-white/55 transition-colors hover:text-white"
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
          <a href="#contact" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#c8ff4a] px-4 py-2 text-xs font-semibold text-[#0b0d0c] transition hover:bg-[#d7ff76]">
            Let&apos;s talk <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff4a]"
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
              className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[#111411]/95 p-2 shadow-2xl shadow-black/70 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={`min-h-12 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c8ff4a] ${
                      activeSection === item.id ? "bg-[#c8ff4a]/10 text-[#c8ff4a]" : "text-white/70"
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
