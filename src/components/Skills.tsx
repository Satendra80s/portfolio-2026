import React from "react";
import { motion } from "framer-motion";
import { Video, Sparkles, Palette, Volume2, Image, TrendingUp } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Skills: React.FC = () => {
  const { skillCategories, software } = portfolioData;

  // Icon mapping helper
  const getCategoryIcon = (iconName: string) => {
    const props = { className: "h-6 w-6 text-brand-primary group-hover:text-brand-secondary transition-colors duration-300" };
    switch (iconName) {
      case "Video":
        return <Video {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "Volume2":
        return <Volume2 {...props} />;
      case "Image":
        return <Image {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      default:
        return <Video {...props} />;
    }
  };

  // Custom Inline SVG Logos for Software
  const getSoftwareLogo = (name: string) => {
    switch (name) {
      case "Adobe Premiere Pro":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#1b002c" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="6.5" stroke="#9A66FF" strokeWidth="3" />
            <text x="10" y="32" fill="#E6C2FF" fontSize="20" fontWeight="bold" fontFamily="sans-serif">Pr</text>
          </svg>
        );
      case "After Effects":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#001833" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="6.5" stroke="#007ACC" strokeWidth="3" />
            <text x="10" y="32" fill="#99D6FF" fontSize="20" fontWeight="bold" fontFamily="sans-serif">Ae</text>
          </svg>
        );
      case "Photoshop":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#001a1c" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="6.5" stroke="#00C4CC" strokeWidth="3" />
            <text x="10" y="32" fill="#99F5F8" fontSize="20" fontWeight="bold" fontFamily="sans-serif">Ps</text>
          </svg>
        );
      case "Illustrator":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#261000" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="6.5" stroke="#FF9B00" strokeWidth="3" />
            <text x="11" y="32" fill="#FFE2B3" fontSize="20" fontWeight="bold" fontFamily="sans-serif">Ai</text>
          </svg>
        );
      case "DaVinci Resolve":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#18181B" />
            <circle cx="24" cy="24" r="16" stroke="#27272A" strokeWidth="2" />
            <path d="M24 12C28.4183 12 32 15.5817 32 20C32 24.4183 24 36 24 36C24 36 16 24.4183 16 20C16 15.5817 19.5817 12 24 12Z" fill="#ff4d4d" opacity="0.8" />
            <path d="M14 26C18.4183 26 22 29.5817 22 34C22 38.4183 14 44 14 44C14 44 6 38.4183 6 34C6 29.5817 9.5817 26 14 26Z" fill="#3b82f6" opacity="0.8" />
            <path d="M34 26C38.4183 26 42 29.5817 42 34C42 38.4183 34 44 34 44C34 44 26 38.4183 26 34C26 29.5817 29.5817 26 34 26Z" fill="#10b981" opacity="0.8" />
            <circle cx="24" cy="24" r="6" fill="#18181B" />
          </svg>
        );
      case "Figma":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 12C17 9.23858 19.2386 7 22 7H27V17H22C19.2386 17 17 14.7614 17 12Z" fill="#F24E1E" />
            <path d="M17 22C17 19.2386 19.2386 17 22 17H27V27H22C19.2386 27 17 24.7614 17 22Z" fill="#A259FF" />
            <path d="M17 32C17 29.2386 19.2386 27 22 27H27V32C27 34.7614 24.7614 37 22 37C19.2386 37 17 34.7614 17 32Z" fill="#0ACF83" />
            <path d="M27 17H32C34.7614 17 37 14.7614 37 12C37 9.23858 34.7614 7 32 7C29.2386 7 27 9.23858 27 12V17Z" fill="#FF7262" />
            <path d="M37 22C37 24.7614 34.7614 27 32 27C29.2386 27 27 24.7614 27 22C27 19.2386 29.2386 17 32 17C34.7614 17 37 19.2386 37 22Z" fill="#1ABC9C" />
          </svg>
        );
      case "CapCut Desktop":
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#0A0A0A" stroke="#27272A" strokeWidth="2" />
            <circle cx="24" cy="24" r="14" stroke="#22d3ee" strokeWidth="3" strokeDasharray="3 3" />
            <path d="M18 18L30 30M30 18L18 30" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <circle cx="24" cy="24" r="5" fill="#22d3ee" />
          </svg>
        );
      default:
        return (
          <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="8" fill="#27272A" />
          </svg>
        );
    }
  };

  // Performant Mouse Glow & 3D Tilt handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Pitch (rotated Y axis)
    const rotateY = ((x - centerX) / centerX) * 8; // Yaw (rotated X axis)

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-zinc-900/60 px-6 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-secondary mb-3">Core Expertise</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            My Creative Skillset & Tools
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-secondary to-brand-primary mt-4" />
        </div>

        {/* Skill Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="interactive-glow-card glassmorphism rounded-2xl p-8 border border-zinc-800/80 cursor-default transition-all duration-300 ease-out group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Content Wrapper to isolate from 3D scaling issues */}
              <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-brand-primary transition-colors">
                    {category.name}
                  </h3>
                </div>

                <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Subskills chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skillsList.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/50 text-zinc-300 font-semibold hover:border-brand-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Software Stack Sub-section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-8">Software Toolkit</h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap items-center justify-center gap-4 max-w-5xl"
          >
            {software.map((soft, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphism rounded-xl px-5 py-4 border border-zinc-800/60 flex items-center gap-3.5 hover:border-zinc-700/80 hover:bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div>
                  {getSoftwareLogo(soft.name)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{soft.name}</h4>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block mt-0.5">
                    {soft.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
