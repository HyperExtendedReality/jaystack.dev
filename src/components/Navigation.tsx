import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Expertise" },
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <header className="studio-header">
      <a href="#home" className="wordmark" aria-label="Jaystack home">
        <img
          className="brand-symbol"
          src={`${import.meta.env.BASE_URL}jaystack-mark.svg`}
          alt=""
          width="44"
          height="33"
        />
        jaystack<span className="brand-dev">.dev</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav-contact">
        Let’s talk <ArrowUpRight size={17} />
      </a>
      <button
        className="mobile-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...links, { id: "contact", label: "Let’s talk" }].map(
            ({ id, label }) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
