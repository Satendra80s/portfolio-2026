import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight, Film } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Resume", id: "resume" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-zinc-950/75 backdrop-blur-md border-b border-zinc-800/50 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary custom-progress-bar"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleLinkClick("home")}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-md shadow-brand-primary/20 group-hover:scale-105 transition-transform">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight block text-white">SATENDRA PATEL</span>
            <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase block -mt-1 group-hover:text-brand-primary transition-colors">Creative Reel</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer relative ${
                activeSection === link.id
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-zinc-800/40 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleLinkClick("contact")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer group"
          >
            Hire Me
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-4 space-y-2 mt-3"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold cursor-pointer ${
                activeSection === link.id
                  ? "bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 text-brand-primary border-l-2 border-brand-primary"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick("contact")}
            className="w-full text-center py-3 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold text-base shadow-lg shadow-brand-primary/20 hover:brightness-110 transition-all cursor-pointer"
          >
            Hire Me
          </button>
        </motion.div>
      )}
    </motion.header>
  );
};
