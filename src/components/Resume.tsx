import React from "react";
import { Download, GraduationCap, Award, Settings, Check } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Resume: React.FC = () => {
  const { certifications, education } = portfolioData;

  const handleDownload = () => {
    // Simulated CV Download action
    alert("Downloading Satendra Patel's Creative Portfolio Resume (PDF)...");
  };

  return (
    <section id="resume" className="py-24 border-t border-zinc-900/60 bg-zinc-950/20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-secondary mb-3">Curriculum</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            Education & Qualifications
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-secondary to-brand-primary mt-4" />
        </div>

        {/* Interactive Resume Board */}
        <div className="glassmorphism rounded-3xl p-8 md:p-12 border border-zinc-800/80 shadow-xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-brand-primary/5 blur-[80px] -z-10" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-secondary/5 blur-[80px] -z-10" />

          {/* Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-900/85 mb-10">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-white">Satendra Patel</h3>
              <span className="text-sm font-semibold text-zinc-400 block mt-0.5">Video Editor & Motion Designer</span>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer group shrink-0"
            >
              <Download className="h-4 w-4 text-zinc-800 group-hover:scale-110 transition-transform" />
              Download Full CV (PDF)
            </button>
          </div>

          {/* Resume Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Left Column: Education & Certs */}
            <div className="space-y-10">
              
              {/* Education */}
              <div>
                <h4 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2.5">
                  <GraduationCap className="h-5 w-5 text-brand-primary" />
                  Education
                </h4>
                <div className="space-y-6 pl-4 border-l border-zinc-800/85">
                  {education.map((edu, idx) => (
                    <div key={idx} className="relative">
                      {/* Left pointer node */}
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-brand-primary" />
                      <h5 className="font-display font-bold text-sm md:text-base text-zinc-200">{edu.degree}</h5>
                      <span className="text-xs text-zinc-400 font-semibold block mt-0.5">{edu.school}</span>
                      <span className="text-[10px] text-zinc-500 font-bold block mt-1 uppercase tracking-wider">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-brand-secondary" />
                  Certifications
                </h4>
                <div className="space-y-6 pl-4 border-l border-zinc-800/85">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="relative">
                      {/* Left pointer node */}
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-brand-secondary" />
                      <h5 className="font-display font-bold text-sm md:text-base text-zinc-200">{cert.name}</h5>
                      <span className="text-xs text-zinc-400 font-semibold block mt-0.5">{cert.issuer}</span>
                      <span className="text-[10px] text-zinc-500 font-bold block mt-1 uppercase tracking-wider">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Skills Breakdown */}
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2.5">
                <Settings className="h-5 w-5 text-emerald-400" />
                Technical Competencies
              </h4>

              <div className="space-y-6">
                
                {/* Editing Tools */}
                <div>
                  <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3.5">Software & Tools</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop", "Illustrator", "CapCut", "Figma"].map((tool, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 font-semibold flex items-center gap-1.5 hover:border-zinc-700 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video Workflow */}
                <div>
                  <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3.5">Video Workflows</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Dynamic Grading", "Spatial Mixing", "Multi-cam sync", "Rough Cutting", "HUD Graphic layouts", "VFX Rotoscoping", "Sub-titling"].map((flow, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 font-semibold flex items-center gap-1.5 hover:border-zinc-700 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5 text-brand-primary" />
                        {flow}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Audience Mechanics */}
                <div>
                  <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3.5">Content Metrics</h5>
                  <div className="flex flex-wrap gap-2">
                    {["CTR Optimization", "Viewer Retention Hooks", "Format Engineering", "Asset Libraries", "A/B Cover Testing"].map((metric, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 font-semibold flex items-center gap-1.5 hover:border-zinc-700 transition-colors"
                      >
                        <Check className="h-3.5 w-3.5 text-brand-secondary" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
