import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Video, Users, Eye, Calendar } from "lucide-react";

const CountUp: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const end = value;
    const duration = 1500; // 1.5 seconds
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);
    const frameDuration = 1000 / fps;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Easing out function for natural slowdown
      const progress = frame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(easeOutProgress * end);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [inView, value]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

interface AboutProps {
  personalInfo: {
    aboutMeBio: string;
    editingPhilosophy: string;
    careerGoals: string;
  };
  stats: Array<{ label: string; value: number; suffix: string }>;
}

export const About: React.FC<AboutProps> = ({ personalInfo, stats }) => {
  const { aboutMeBio, editingPhilosophy, careerGoals } = personalInfo;

  // Icon mapping helper
  const getIcon = (label: string) => {
    switch (label) {
      case "Projects Completed":
        return <Trophy className="h-6 w-6 text-brand-primary" />;
      case "Happy Clients":
        return <Users className="h-6 w-6 text-brand-secondary" />;
      case "Videos Edited":
        return <Video className="h-6 w-6 text-emerald-400" />;
      case "Millions of Views":
      case "Views Generated":
        return <Eye className="h-6 w-6 text-pink-400" />;
      case "Years of Experience":
        return <Calendar className="h-6 w-6 text-amber-400" />;
      default:
        return <Sparkles className="h-6 w-6 text-zinc-400" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="about" className="py-24 border-t border-zinc-900/60 bg-zinc-950/20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-3">About Me</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            Blending narrative craft with visual energy.
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mt-4" />
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glassmorphism rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-zinc-800/80 shadow-md group relative overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              <div className="mb-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/50 group-hover:scale-105 transition-transform duration-300">
                {getIcon(stat.label)}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mb-1">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </h3>
              
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Text Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Biography Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 glassmorphism rounded-2xl p-8 border border-zinc-800/80 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                <h4 className="text-sm font-bold tracking-wider uppercase text-zinc-300">My Story</h4>
              </div>
              <p className="text-zinc-300 font-medium text-base md:text-lg leading-relaxed mb-6">
                {aboutMeBio}
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-zinc-500 font-semibold tracking-wider uppercase block">Current Location</span>
                <span className="text-sm font-bold text-zinc-300">Jabalpur, India (Remote Friendly)</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-500 font-semibold tracking-wider uppercase block">Availability</span>
                <span className="text-sm font-bold text-emerald-400">Available for Freelance & Full-time</span>
              </div>
            </div>
          </motion.div>

          {/* Philosophy & Goals Card */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-6"
          >
            {/* Philosophy */}
            <div className="glassmorphism rounded-2xl p-6 border border-zinc-800/80 relative overflow-hidden group flex-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 blur-2xl -z-10" />
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-secondary" />
                <h4 className="text-sm font-bold tracking-wider uppercase text-zinc-300">Editing Philosophy</h4>
              </div>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                {editingPhilosophy}
              </p>
            </div>

            {/* Career Goals */}
            <div className="glassmorphism rounded-2xl p-6 border border-zinc-800/80 relative overflow-hidden group flex-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary/5 blur-2xl -z-10" />
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                <h4 className="text-sm font-bold tracking-wider uppercase text-zinc-300">Career Goals</h4>
              </div>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                {careerGoals}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
