import { useEffect, useRef, useState } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AiLab from "@/components/AiLab";
import StackMarquee from "@/components/StackMarquee";
import Navigation from "@/components/Navigation";
import "./portfolio.css";
export default function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animations.push(entry.target.animate(
          [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 750, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" },
        ));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    root.current.querySelectorAll(".section-kicker, .section-heading, .about-art, .process-strip > div, .build-card-lg, .commerce-lab, .ai-card")
      .forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); };
  }, [reduced]);
  return (
    <MotionConfig reducedMotion="user">
    <div className="portfolio" ref={root}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero onAsk={() => setChatOpen(true)} />
        <StackMarquee />
        <Projects />
        <AiLab onAsk={() => setChatOpen(true)} />
        <About />
        <Skills />
        <Contact />
      </main>
      <PortfolioAssistant open={chatOpen} onOpenChange={setChatOpen} />
    </div>
    </MotionConfig>
  );
}

