
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="site-grid relative min-h-screen overflow-x-hidden bg-[#0b0d0c] text-[#f4f1e8]">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-[#c8ff4a] px-4 py-2 text-sm font-semibold text-[#0b0d0c] transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_75%_12%,rgba(200,255,74,0.09),transparent_24%),radial-gradient(circle_at_8%_50%,rgba(105,210,255,0.055),transparent_28%)]" />
      <div className="page-grain pointer-events-none fixed inset-0 z-0 opacity-30" />
      <div className="relative z-10">
        <Navigation />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Index;
