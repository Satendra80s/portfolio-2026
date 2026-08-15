import React, { useRef } from "react";
import { Star, CheckCircle, Quote, Sparkles, Eye, Trophy, Heart } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Testimonials: React.FC = () => {
  const testimonials = portfolioData.testimonials;
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Duplicate the array to ensure seamless infinite loop
  const doubleTestimonials = [...testimonials, ...testimonials];

  // 3D Tilt handler for testimonial cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Client Avatar vector/letter styling helper
  const renderClientAvatar = (name: string, idx: number) => {
    const colors = [
      "from-blue-500 to-indigo-500",
      "from-violet-500 to-fuchsia-500",
      "from-emerald-500 to-teal-500",
      "from-pink-500 to-rose-500"
    ];
    const color = colors[idx % colors.length];
    const initials = name.split(" ").map(n => n[0]).join("");

    return (
      <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xs shadow-md border border-zinc-800/60`}>
        {initials}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 border-t border-zinc-900/60 bg-zinc-950/20 overflow-hidden relative">
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-secondary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-secondary mb-3">Client Trust</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            What Content Directors Say
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-secondary to-brand-primary mt-4" />
        </div>

        {/* Achievement Counters Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          <div className="glassmorphism rounded-2xl p-6 border border-zinc-800/80 text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <Trophy className="h-5 w-5 text-brand-primary mb-3" />
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mb-1">80+</h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Projects Completed</span>
          </div>

          <div className="glassmorphism rounded-2xl p-6 border border-zinc-800/80 text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <Heart className="h-5 w-5 text-brand-secondary mb-3" />
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mb-1">25+</h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Happy Clients</span>
          </div>

          <div className="glassmorphism rounded-2xl p-6 border border-zinc-800/80 text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <Sparkles className="h-5 w-5 text-emerald-400 mb-3" />
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mb-1">98%</h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Client Satisfaction</span>
          </div>

          <div className="glassmorphism rounded-2xl p-6 border border-zinc-800/80 text-center flex flex-col items-center justify-center relative overflow-hidden group">
            <Eye className="h-5 w-5 text-pink-400 mb-3" />
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mb-1">10M+</h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Views Generated</span>
          </div>
        </div>

      </div>

      {/* Testimonials Infinite Marquee Wall */}
      <div className="relative w-full py-4 overflow-hidden marquee-mask">
        <div 
          ref={marqueeRef}
          className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] transition-all duration-300"
        >
          {doubleTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="interactive-glow-card w-[350px] md:w-[400px] shrink-0 glassmorphism rounded-3xl p-8 border border-zinc-800/80 cursor-default transition-all duration-300 ease-out flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {/* Quote icon overlay */}
                  <Quote className="h-8 w-8 text-zinc-800 opacity-60" />
                </div>

                {/* Testimonial body */}
                <p className="text-sm md:text-base text-zinc-300 font-medium leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Client Profile details */}
              <div className="flex items-center justify-between border-t border-zinc-900/60 pt-5 relative z-10">
                <div className="flex items-center gap-3">
                  {renderClientAvatar(testimonial.clientName, idx)}
                  <div>
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                      {testimonial.clientName}
                      {testimonial.verified && (
                        <CheckCircle className="h-4 w-4 text-brand-primary fill-brand-primary/10 animate-pulse" />
                      )}
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-semibold tracking-wide">
                      {testimonial.position} @ {testimonial.company}
                    </span>
                  </div>
                </div>
                
                {/* Category indicator badge */}
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-950 border border-zinc-800 px-2 py-1 rounded">
                  {testimonial.projectCategory}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
