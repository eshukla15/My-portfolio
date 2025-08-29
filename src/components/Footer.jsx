import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 px-6 py-10 mt-20 bg-white/2 backdrop-blur-[1px] border-t border-white/10 rounded-t-3xl shadow-xl overflow-hidden">
      {/* Tiny subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-6">
        {/* Left text */}
        <p className="text-sm text-gray-400 text-center md:text-left tracking-wide font-medium">
          © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">Eshan Shukla</span> — All rights reserved.
        </p>

        {/* Scroll-to-top button */}
        <button
          onClick={scrollToTop}
          className="group relative w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1"
        >
          <ArrowUp className="mx-auto text-white group-hover:animate-bounce" size={20} />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Top
          </span>
        </button>
      </div>
    </footer>
  );
};