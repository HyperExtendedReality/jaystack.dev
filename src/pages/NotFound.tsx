import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="site-grid flex min-h-screen items-center justify-center bg-[#0b0d0c] px-5 text-[#f4f1e8]">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#111411] p-8 text-center shadow-2xl sm:p-12">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#c8ff4a] text-sm font-black text-[#0b0d0c]">404</span>
        <h1 className="mt-7 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">This page took a wrong turn.</h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-white/45">The route doesn&apos;t exist, but the rest of the work is right where you left it.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-[#c8ff4a] px-5 py-3 text-sm font-semibold text-[#0b0d0c] transition hover:bg-[#d8ff78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff4a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111411]">
          Back to portfolio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
