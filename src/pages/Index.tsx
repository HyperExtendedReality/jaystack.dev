
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-green-400">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-green-300 px-4 py-2 font-medium text-black transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black pointer-events-none z-0"></div>
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
