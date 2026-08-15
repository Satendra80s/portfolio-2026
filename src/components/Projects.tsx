import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, Calendar, Cpu, CheckCircle2, X, Film, Sparkles, Smartphone, Layers, Plus, Image as ImageIcon, Download } from "lucide-react";
import type { Project } from "../data/portfolioData";

// Inline Custom Premium Vector Art for Project Thumbnails
const ProjectThumbnail: React.FC<{ project: Project; hover: boolean }> = ({ project, hover }) => {
  const hoverClass = hover ? "scale-105" : "scale-100";
  const transitionClass = "transition-all duration-700 ease-out h-full w-full relative overflow-hidden";

  // For custom uploads or uploaded graphics, render the actual image (Base64 or URL)
  if (!["project-1", "project-2", "project-3", "project-4"].includes(project.id)) {
    return (
      <div className={`${transitionClass} ${hoverClass} bg-zinc-950 flex items-center justify-center`}>
        <img 
          src={project.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"} 
          alt={project.title} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out" 
          onError={(e) => {
            // Fallback abstract placeholder if image fails to load
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
          }}
        />
        <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-brand-secondary tracking-wider uppercase z-10 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-brand-secondary animate-pulse" />
          {project.category}
        </div>
      </div>
    );
  }

  // Default Projects use premium inline vector graphics
  switch (project.id) {
    case "project-1": // YouTube Channel Growth System
      return (
        <div className={`${transitionClass} ${hoverClass} bg-gradient-to-br from-indigo-950 via-zinc-950 to-zinc-900 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[radial-gradient(#4B5563_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
          <motion.div 
            animate={hover ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full border border-indigo-500/30 bg-indigo-500/5 flex items-center justify-center z-10"
          >
            <Cpu className="h-10 w-10 text-indigo-400" />
          </motion.div>
          <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-400 tracking-wider uppercase z-10">
            Growth System
          </div>
        </div>
      );
    case "project-2": // Performance Ad Creative Suite
      return (
        <div className={`${transitionClass} ${hoverClass} bg-gradient-to-br from-red-950 via-zinc-950 to-zinc-900 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[radial-gradient(#EF4444_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
          <motion.div 
            animate={hover ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full border border-red-500/30 bg-red-500/5 flex items-center justify-center z-10"
          >
            <Film className="h-10 w-10 text-red-500" />
          </motion.div>
          <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-red-400 tracking-wider uppercase z-10">
            Ad Creatives
          </div>
        </div>
      );
    case "project-3": // SaaS Mobile Fintech App Explainer
      return (
        <div className={`${transitionClass} ${hoverClass} bg-gradient-to-br from-violet-950 via-zinc-950 to-zinc-900 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] bg-[size:20px_20px] opacity-25" />
          <motion.div 
            animate={hover ? { y: -5 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-20 h-32 border border-violet-500/20 bg-zinc-900/90 rounded-2xl p-3 flex flex-col justify-between shadow-lg shadow-violet-500/5 z-10"
          >
            <div className="h-2 w-8 bg-zinc-800 rounded-full mx-auto" />
            <div className="flex-1 flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-violet-400" />
            </div>
            <div className="h-1.5 w-12 bg-violet-500/30 rounded-full mx-auto" />
          </motion.div>
          <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-violet-400 tracking-wider uppercase z-10">
            Product Motion
          </div>
        </div>
      );
    case "project-4": // Apex Legends Season 20 Hype Trailer
      return (
        <div className={`${transitionClass} ${hoverClass} bg-gradient-to-br from-pink-950 via-zinc-950 to-zinc-900 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ec48990c_1px,transparent_1px)] bg-[size:10px_100%] opacity-35" />
          <motion.div 
            animate={hover ? { scale: 1.05, rotate: -2 } : { scale: 1, rotate: 0 }}
            className="w-24 h-24 rounded-2xl border border-pink-500/30 bg-pink-500/5 flex items-center justify-center z-10"
          >
            <Layers className="h-10 w-10 text-pink-400" />
          </motion.div>
          <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-zinc-800/80 px-2.5 py-1 rounded-md text-[10px] font-bold text-pink-400 tracking-wider uppercase z-10">
            Hype Trailer
          </div>
        </div>
      );
    default:
      return (
        <div className="h-full w-full bg-zinc-900 flex items-center justify-center">
          <Film className="h-12 w-12 text-zinc-700" />
        </div>
      );
  }
};

interface ProjectsProps {
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onOpenAdmin?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenAdmin }) => {
  const [filter, setFilter] = useState("All");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewVideoProject, setPreviewVideoProject] = useState<Project | null>(null);

  // List of unique categories + "All"
  // Group categories logically so custom ones can be parsed
  const categories = ["All", "Video Editing", "Motion Graphics", "Graphic Design", "Thumbnail Design"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter((p) => {
        const categoryLower = p.category.toLowerCase();
        const filterLower = filter.toLowerCase();
        
        if (filterLower === "video editing") {
          return Boolean(p.videoUrl && p.videoUrl.trim() !== "") || categoryLower.includes("video") || categoryLower.includes("ad") || categoryLower.includes("vfx") || categoryLower.includes("story") || categoryLower.includes("podcast") || categoryLower.includes("documentary") || categoryLower.includes("shorts");
        }
        if (filterLower === "motion graphics") {
          return categoryLower.includes("motion") || categoryLower.includes("explainer") || categoryLower.includes("typography") || categoryLower.includes("shorts") || categoryLower.includes("reels");
        }
        if (filterLower === "graphic design") {
          return categoryLower.includes("graphic") || categoryLower.includes("concept") || categoryLower.includes("design");
        }
        if (filterLower === "thumbnail design") {
          return categoryLower.includes("thumbnail") || categoryLower.includes("cover");
        }
        return categoryLower.includes(filterLower);
      });

  // Helper to check if video layout should be vertical (YT Shorts, IG Reels)
  const isVerticalVideo = (url: string | undefined) => {
    if (!url) return false;
    const cleanUrl = url.toLowerCase();
    return cleanUrl.includes("shorts/") || cleanUrl.includes("instagram.com/reel/") || cleanUrl.includes("instagram.com/reels/") || cleanUrl.includes("instagram.com/p/");
  };

  // Extract Video Embed Link (supports standard YouTube, YouTube Shorts, and Instagram Reels)
  const getVideoEmbedUrl = (url: string | undefined) => {
    if (!url) return null;
    
    // 1. YouTube standard & watch URLs
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1`;
    }

    // 2. YouTube Shorts (e.g. youtube.com/shorts/VIDEO_ID)
    if (url.includes("youtube.com/shorts/")) {
      const parts = url.split("youtube.com/shorts/");
      if (parts[1]) {
        const id = parts[1].split(/[?#&]/)[0];
        if (id && id.length === 11) {
          return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }
      }
    }
    
    // 3. YouTube Shorts shortened URL (e.g. youtu.be/shorts/VIDEO_ID or youtu.be/VIDEO_ID)
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      if (parts[1]) {
        const path = parts[1].split(/[?#&]/)[0];
        const id = path.includes("shorts/") ? path.split("shorts/")[1] : path;
        if (id && id.length === 11) {
          return `https://www.youtube.com/embed/${id}?autoplay=1`;
        }
      }
    }

    // 4. Instagram Reels (e.g. instagram.com/reel/REEL_ID)
    if (url.includes("instagram.com/reel/") || url.includes("instagram.com/reels/") || url.includes("instagram.com/p/")) {
      const instRegExp = /(?:instagram\.com\/(?:reel|reels|p)\/)([A-Za-z0-9_-]+)/;
      const instMatch = url.match(instRegExp);
      if (instMatch && instMatch[1]) {
        return `https://www.instagram.com/reel/${instMatch[1]}/embed/`;
      }
    }

    return null;
  };

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 border-t border-zinc-900/60 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-3">Portfolio</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            Featured Creative Work
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mt-4" />
        </div>

        {/* Filter Navigation & Add project CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-zinc-900/60">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? "bg-white text-zinc-950 shadow-md"
                    : "bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Upload Button redirects to Admin Dashboard */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary/15 to-brand-secondary/15 hover:from-brand-primary/25 hover:to-brand-secondary/25 border border-brand-primary/30 text-brand-primary font-bold text-xs cursor-pointer transition-all shadow-md"
          >
            <Plus className="h-4 w-4" />
            Upload Custom Showcase
          </button>
        </div>

        {/* Projects Gallery */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glassmorphism rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col group"
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                {/* Thumbnail Container */}
                <div 
                  className="h-60 md:h-72 overflow-hidden relative border-b border-zinc-800/50 cursor-pointer" 
                  onClick={() => {
                    if (project.videoUrl) {
                      setPreviewVideoProject(project);
                    } else {
                      // Clicking on a graphic thumbnail opens image lightbox directly
                      setPreviewVideoProject(project); 
                    }
                  }}
                >
                  <ProjectThumbnail 
                    project={project} 
                    hover={hoveredCardId === project.id} 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {project.videoUrl ? (
                        <Play className="h-6 w-6 fill-zinc-950 translate-x-[2px]" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-zinc-950" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
                        {project.category}
                      </span>
                      <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {project.duration}
                      </span>
                    </div>

                    <h3 
                      onClick={() => handleOpenCaseStudy(project)}
                      className="text-xl md:text-2xl font-display font-bold text-white mb-2 cursor-pointer hover:text-brand-primary transition-colors line-clamp-1"
                    >
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Software tags */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.software.map((sw, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-bold text-zinc-300 px-2 py-1 rounded bg-zinc-900/80 border border-zinc-850">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-zinc-900/60">
                    <button
                      onClick={() => setPreviewVideoProject(project)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 text-white font-bold text-xs border border-zinc-800/80 cursor-pointer transition-colors"
                    >
                      {project.videoUrl ? (
                        <>
                          <Play className="h-3 w-3 fill-white" />
                          Preview
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-3.5 w-3.5 text-brand-secondary" />
                          View Design
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleOpenCaseStudy(project)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 text-white font-bold text-xs border border-zinc-800/80 cursor-pointer transition-colors"
                    >
                      Case Study
                    </button>

                    {project.videoUrl ? (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 text-brand-primary font-bold text-xs border border-brand-primary/20 cursor-pointer transition-all"
                      >
                        Live
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <a
                        href={project.thumbnail}
                        download={`${project.title.toLowerCase().replace(/\s+/g, "_")}_design.png`}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 hover:from-brand-secondary/20 hover:to-brand-primary/20 text-brand-secondary font-bold text-xs border border-brand-secondary/20 cursor-pointer transition-all"
                      >
                        Download
                        <Download className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Preview Lightbox Modal (Supports YouTube video and Base64 graphic images) */}
        <AnimatePresence>
          {previewVideoProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/92 p-4 backdrop-blur-md"
              onClick={() => setPreviewVideoProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/85">
                  <h4 className="font-display font-bold text-base text-white truncate pr-4">{previewVideoProject.title}</h4>
                  <button 
                    onClick={() => setPreviewVideoProject(null)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Player/Lightbox Layout */}
                <div className="bg-black relative overflow-hidden flex items-center justify-center">
                  {previewVideoProject.videoUrl ? (
                    // Render Video embed
                    getVideoEmbedUrl(previewVideoProject.videoUrl) ? (
                      <div className={`w-full ${isVerticalVideo(previewVideoProject.videoUrl) ? "aspect-[9/16] max-h-[70vh] md:max-h-[78vh] max-w-[380px] mx-auto py-4" : "aspect-video"}`}>
                        <iframe
                          className="w-full h-full border-0"
                          src={getVideoEmbedUrl(previewVideoProject.videoUrl) || ""}
                          title={previewVideoProject.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      /* Fallback Simulated Player */
                      <div className="aspect-video w-full flex flex-col items-center justify-center relative group p-6">
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-16">
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [12, Math.random() * 56 + 12, 12] }}
                              transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut" }}
                              className="w-2 rounded-t bg-gradient-to-t from-brand-primary to-brand-secondary"
                            />
                          ))}
                        </div>

                        <Sparkles className="h-16 w-16 text-zinc-600 animate-spin-slow mb-4" />
                        <span className="text-zinc-400 font-semibold text-sm">Simulated Video Playback Demo</span>
                        <span className="text-xs text-zinc-500 mt-1.5">No embeddable video ID was found for this link</span>
                        <span className="text-[10px] text-zinc-500 mt-0.5 select-all break-all">{previewVideoProject.videoUrl}</span>

                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20 group-hover:bg-zinc-950/45 transition-colors">
                          <button className="h-16 w-16 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                            <Play className="h-6 w-6 fill-white translate-x-[2px]" />
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    // Render pure design graphic lightbox zoom
                    <div className="max-h-[75vh] p-2 flex items-center justify-center bg-zinc-950/60 w-full">
                      <img 
                        src={previewVideoProject.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"} 
                        alt={previewVideoProject.title} 
                        className="max-h-[70vh] object-contain rounded-lg border border-zinc-800/40" 
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Case Study Details Drawer/Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-950/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl h-full bg-zinc-900 border-l border-zinc-800 p-8 md:p-12 overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg">
                    Case Study
                  </span>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/60 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Project Header */}
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-bold text-brand-primary mb-8">
                  Client: {selectedProject.client}
                </p>

                {/* Mini details list */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/40 mb-8">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Duration</span>
                    <span className="text-sm font-bold text-zinc-300">{selectedProject.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Tech Stack</span>
                    <span className="text-sm font-bold text-zinc-300">{selectedProject.software.join(", ")}</span>
                  </div>
                </div>

                {/* Challenge, Solution, Result Content Blocks */}
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <X className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white mb-1.5">The Challenge</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-medium">{selectedProject.challenge}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                      <Layers className="h-4 w-4 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white mb-1.5">My Solution</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-medium">{selectedProject.solution}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-white mb-1.5">The Result</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed font-medium">{selectedProject.result}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-800 flex gap-4">
                  {selectedProject.videoUrl ? (
                    <button
                      onClick={() => {
                        setPreviewVideoProject(selectedProject);
                        setSelectedProject(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm shadow-lg shadow-brand-primary/20 cursor-pointer"
                    >
                      <Play className="h-4 w-4 fill-white" />
                      Play Reel
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPreviewVideoProject(selectedProject);
                        setSelectedProject(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-sm shadow-lg shadow-brand-secondary/20 cursor-pointer"
                    >
                      <ImageIcon className="h-4 w-4 text-white" />
                      View Design
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-white font-bold text-sm border border-zinc-700/50 cursor-pointer"
                  >
                    Close Case Study
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
