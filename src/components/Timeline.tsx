import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Award, CheckCircle } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Timeline: React.FC = () => {
  const timelineData = portfolioData.timeline;

  const cardVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="experience" className="py-24 border-t border-zinc-900/60 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-3">Journey</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            Professional Timeline
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mt-4" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-zinc-800/80 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          
          {/* Animated Glowing Indicator Line overlay (subtle) */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent -translate-x-[0.5px]" />

          {timelineData.map((item) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="relative group"
            >
              {/* Node Indicator Dot */}
              <div className="absolute -left-[41px] md:-left-[49px] top-1.5 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center group-hover:border-brand-primary transition-colors duration-300 z-10">
                <div className="h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300" />
              </div>

              {/* Glowing Ambient light behind node */}
              <div className="absolute -left-[49px] md:-left-[57px] top-0.5 h-10 w-10 rounded-full bg-brand-primary/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* Card Container */}
              <div className="glassmorphism rounded-2xl p-6 md:p-8 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 relative overflow-hidden">
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-primary/5 to-transparent blur-xl -z-10" />
                
                {/* Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-brand-primary transition-colors">
                      {item.role}
                    </h3>
                    <span className="text-sm text-zinc-400 font-bold block mt-0.5">
                      {item.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-semibold w-fit h-fit">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.duration}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-zinc-400 font-medium text-xs md:text-sm leading-relaxed flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 mt-1.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div>
                    <h4 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-brand-secondary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-zinc-300 font-semibold text-xs md:text-sm leading-relaxed flex items-start gap-2.5">
                          <CheckCircle className="h-4.5 w-4.5 text-brand-secondary mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
