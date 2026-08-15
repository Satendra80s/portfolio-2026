import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail, Play } from "lucide-react";

interface HeroProps {
  personalInfo: {
    name: string;
    titles: string[];
    intro: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const { name, titles, intro } = personalInfo;
  const [titleIndex, setTitleIndex] = useState(0);

  // Cycle through titles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [titles.length]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <section 
      id="home" 
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden px-6"
    >
      {/* Floating Background Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-brand-primary/10 blur-[80px] animate-float-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-brand-secondary/10 blur-[100px] animate-float-medium -z-10" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370c_1px,transparent_1px),linear-gradient(to_bottom,#1f29370c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Open to Work Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 mb-8 shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-300">Open to Work</span>
        </motion.div>

        {/* Profile Avatar with Glowing Border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary opacity-75 blur-md group-hover:blur-lg group-hover:scale-105 transition-all duration-300" />
          <div className="relative h-32 w-32 md:h-36 md:w-36 rounded-full border-2 border-zinc-800/80 overflow-hidden bg-zinc-900">
            <img 
              src="/assets/avatar.png" 
              alt={name} 
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Fallback icon in case image is missing
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          {/* Creative Badge overlay on Avatar */}
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-md">
            <Play className="h-3 w-3 text-brand-primary fill-brand-primary translate-x-[1px]" />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-4 text-white"
        >
          Hi, I'm <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">{name}</span>
        </motion.h1>

        {/* Animated Role Text */}
        <div className="h-16 md:h-20 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h2
              key={titleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-2xl md:text-4xl font-display font-bold text-zinc-300 tracking-tight"
            >
              {titles[titleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl text-base md:text-lg text-zinc-400 font-medium leading-relaxed mb-10 px-4"
        >
          {intro}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full px-4"
        >
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold shadow-lg shadow-brand-primary/25 hover:brightness-110 hover:shadow-brand-primary/35 transition-all cursor-pointer group"
          >
            View Portfolio
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleScrollTo("resume")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 text-white font-semibold border border-zinc-800/80 transition-all cursor-pointer group"
          >
            <Download className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
            Download Resume
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-zinc-900/40 text-zinc-300 hover:text-white font-semibold transition-all cursor-pointer group"
          >
            <Mail className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            Contact Me
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => handleScrollTo("about")}
          className="absolute bottom-8 cursor-pointer flex flex-col items-center gap-1.5 group"
        >
          <span className="text-[10px] text-zinc-500 font-semibold tracking-widest uppercase group-hover:text-zinc-300 transition-colors">Scroll Down</span>
          <div className="h-8 w-5 rounded-full border border-zinc-700/80 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-zinc-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
