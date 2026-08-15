import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Film, Image as ImageIcon, User, Save, 
  Trash2, ArrowLeft, RefreshCw, Upload, Download, 
  CheckCircle2, Sparkles, AlertCircle, FileText,
  ArrowUp, ArrowDown
} from "lucide-react";
import type { Project } from "../data/portfolioData";
import confetti from "canvas-confetti";

interface AdminPanelProps {
  projects: Project[];
  stats: Array<{ label: string; value: number; suffix: string }>;
  personalInfo: {
    name: string;
    titles: string[];
    intro: string;
    aboutMeBio: string;
    editingPhilosophy: string;
    careerGoals: string;
  };
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateStats: (stats: any[]) => void;
  onUpdatePersonalInfo: (info: any) => void;
  onClose: () => void;
  onResetAll: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  projects,
  stats,
  personalInfo,
  onUpdateProjects,
  onUpdateStats,
  onUpdatePersonalInfo,
  onClose,
  onResetAll,
}) => {
  const [activeTab, setActiveTab] = useState<"videos" | "graphics" | "profile" | "system">("videos");
  
  // Video Form State
  const [videoForm, setVideoForm] = useState<Partial<Project>>({
    id: "",
    title: "",
    category: "Video Editing & VFX",
    client: "",
    duration: "1 Week",
    software: [],
    videoUrl: "",
    description: "",
    challenge: "",
    solution: "",
    result: "",
    thumbnail: ""
  });
  const [videoSoftwareText, setVideoSoftwareText] = useState("");
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  // Graphic Form State
  const [graphicForm, setGraphicForm] = useState<Partial<Project>>({
    id: "",
    title: "",
    category: "Graphic Design",
    client: "",
    duration: "3 Days",
    software: [],
    description: "",
    challenge: "",
    solution: "",
    result: "",
    thumbnail: "" // Holds Base64 Data URL
  });
  const [graphicSoftwareText, setGraphicSoftwareText] = useState("");
  const [editingGraphicId, setEditingGraphicId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: personalInfo.name,
    titlesText: personalInfo.titles.join(", "),
    intro: personalInfo.intro,
    aboutMeBio: personalInfo.aboutMeBio,
    editingPhilosophy: personalInfo.editingPhilosophy,
    careerGoals: personalInfo.careerGoals,
  });

  // Stats Form State
  const [statsForm, setStatsForm] = useState(
    stats.map(s => ({ label: s.label, value: s.value, suffix: s.suffix }))
  );

  // Status notifications
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  // Helper to extract YouTube video ID or Instagram ID to get a preview image
  const getVideoThumbnailUrl = (url: string) => {
    // 1. YouTube standard & shorts
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let ytId = null;
      if (url.includes("shorts/")) {
        const parts = url.split("shorts/");
        if (parts[1]) ytId = parts[1].split(/[?#&]/)[0];
      } else {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) ytId = match[2];
      }
      
      if (!ytId && url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        if (parts[1]) {
          const path = parts[1].split(/[?#&]/)[0];
          ytId = path.includes("shorts/") ? path.split("shorts/")[1] : path;
        }
      }
      
      if (ytId && ytId.length === 11) {
        return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }
    }

    // 2. Instagram Reels Fallback Image
    if (url.includes("instagram.com")) {
      return "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop";
    }

    return "";
  };

  // Auto-generate video thumbnail from URL if YouTube/Instagram
  const handleVideoUrlChange = (url: string) => {
    const thumbnail = getVideoThumbnailUrl(url);
    setVideoForm(prev => ({ ...prev, videoUrl: url, thumbnail: prev.thumbnail || thumbnail }));
  };

  // Handle Video Form Submit
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.description) {
      showNotification("error", "Title and Description are required!");
      return;
    }

    const softwareList = videoSoftwareText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    // If no custom thumbnail was uploaded/chosen and there's a video link, extract thumbnail
    let finalThumbnail = videoForm.thumbnail || "";
    if (!finalThumbnail && videoForm.videoUrl) {
      finalThumbnail = getVideoThumbnailUrl(videoForm.videoUrl);
    }

    const updatedProject: Project = {
      id: editingVideoId || `video-${Date.now()}`,
      title: videoForm.title,
      category: videoForm.category || "Video Editing",
      client: videoForm.client || "Independent Creator",
      duration: videoForm.duration || "1 Week",
      software: softwareList.length > 0 ? softwareList : ["Premiere Pro"],
      videoUrl: videoForm.videoUrl || "",
      description: videoForm.description,
      challenge: videoForm.challenge || "Deliver performance video visuals.",
      solution: videoForm.solution || "Paced storytelling and customized hooks.",
      result: videoForm.result || "Achieved strong organic retention rates.",
      thumbnail: finalThumbnail || "/assets/project-custom.jpg"
    };

    let newProjectsList: Project[];
    if (editingVideoId) {
      newProjectsList = projects.map(p => p.id === editingVideoId ? updatedProject : p);
      showNotification("success", "Video project updated successfully!");
    } else {
      newProjectsList = [updatedProject, ...projects];
      showNotification("success", "New video project published!");
      confetti({ particleCount: 50, spread: 45, colors: ["#3B82F6", "#FFFFFF"] });
    }

    onUpdateProjects(newProjectsList);
    // Reset Form
    setVideoForm({
      id: "", title: "", category: "Video Editing & VFX", client: "",
      duration: "1 Week", software: [], videoUrl: "", description: "",
      challenge: "", solution: "", result: "", thumbnail: ""
    });
    setVideoSoftwareText("");
    setEditingVideoId(null);
  };

  // Image Upload handler (Base64)
  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showNotification("error", "Please upload an image file (PNG, JPG, WebP)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setGraphicForm(prev => ({ ...prev, thumbnail: e.target!.result as string }));
        showNotification("success", "Image uploaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Handle Graphic Form Submit
  const handleSaveGraphic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!graphicForm.title || !graphicForm.description) {
      showNotification("error", "Title and Description are required!");
      return;
    }
    if (!graphicForm.thumbnail) {
      showNotification("error", "Please upload a graphic design image!");
      return;
    }

    const softwareList = graphicSoftwareText
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const updatedProject: Project = {
      id: editingGraphicId || `graphic-${Date.now()}`,
      title: graphicForm.title,
      category: graphicForm.category || "Graphic Design",
      client: graphicForm.client || "Self Project",
      duration: graphicForm.duration || "3 Days",
      software: softwareList.length > 0 ? softwareList : ["Photoshop"],
      description: graphicForm.description,
      challenge: graphicForm.challenge || "Create eye-catching digital visual design.",
      solution: graphicForm.solution || "High-contrast visual hierarchy and layout theory.",
      result: graphicForm.result || "Boosted CTR metrics and client response rates.",
      thumbnail: graphicForm.thumbnail, // base64 string
      videoUrl: "" // No videoUrl for pure graphics showcase
    };

    let newProjectsList: Project[];
    if (editingGraphicId) {
      newProjectsList = projects.map(p => p.id === editingGraphicId ? updatedProject : p);
      showNotification("success", "Graphic design project updated successfully!");
    } else {
      newProjectsList = [updatedProject, ...projects];
      showNotification("success", "New graphic design published!");
      confetti({ particleCount: 50, spread: 45, colors: ["#8B5CF6", "#FFFFFF"] });
    }

    onUpdateProjects(newProjectsList);
    // Reset Form
    setGraphicForm({
      id: "", title: "", category: "Graphic Design", client: "",
      duration: "3 Days", software: [], description: "",
      challenge: "", solution: "", result: "", thumbnail: ""
    });
    setGraphicSoftwareText("");
    setEditingGraphicId(null);
  };

  // Handle Profile & Stats Save
  const handleSaveProfileAndStats = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save Profile Info
    const titlesArray = profileForm.titlesText
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const updatedInfo = {
      name: profileForm.name,
      titles: titlesArray.length > 0 ? titlesArray : personalInfo.titles,
      intro: profileForm.intro,
      aboutMeBio: profileForm.aboutMeBio,
      editingPhilosophy: profileForm.editingPhilosophy,
      careerGoals: profileForm.careerGoals,
    };

    onUpdatePersonalInfo(updatedInfo);

    // Save Stats
    onUpdateStats(statsForm);

    showNotification("success", "Profile and stats updated successfully!");
    confetti({ particleCount: 30, spread: 30, colors: ["#3B82F6", "#8B5CF6"] });
  };

  // Delete Project handler
  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const filtered = projects.filter(p => p.id !== id);
      onUpdateProjects(filtered);
      showNotification("success", "Project deleted successfully!");
    }
  };

  // Move Project handler (reordering)
  const handleMoveProject = (id: string, direction: "up" | "down") => {
    const isVideo = projects.find(p => p.id === id)?.videoUrl ? true : false;
    const groupItems = projects.filter(p => isVideo ? (p.videoUrl && p.videoUrl.trim() !== "") : (!p.videoUrl || p.videoUrl.trim() === ""));
    const indexInGroup = groupItems.findIndex(p => p.id === id);

    if (direction === "up" && indexInGroup === 0) return;
    if (direction === "down" && indexInGroup === groupItems.length - 1) return;

    const swapWithIndex = direction === "up" ? indexInGroup - 1 : indexInGroup + 1;
    const targetItem = groupItems[indexInGroup];
    const swapItem = groupItems[swapWithIndex];

    const newProjects = [...projects];
    const masterIdx1 = newProjects.findIndex(p => p.id === targetItem.id);
    const masterIdx2 = newProjects.findIndex(p => p.id === swapItem.id);

    if (masterIdx1 !== -1 && masterIdx2 !== -1) {
      newProjects[masterIdx1] = swapItem;
      newProjects[masterIdx2] = targetItem;
      onUpdateProjects(newProjects);
      showNotification("success", "Reordered successfully!");
    }
  };

  // Edit action helper
  const handleStartEditVideo = (project: Project) => {
    setEditingVideoId(project.id);
    setVideoForm(project);
    setVideoSoftwareText(project.software.join(", "));
    setActiveTab("videos");
    // Scroll to form
    const el = document.getElementById("video-form-anchor");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartEditGraphic = (project: Project) => {
    setEditingGraphicId(project.id);
    setGraphicForm(project);
    setGraphicSoftwareText(project.software.join(", "));
    setActiveTab("graphics");
    // Scroll to form
    const el = document.getElementById("graphic-form-anchor");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // JSON Export Data
  const handleExportData = () => {
    const dataToExport = {
      projects,
      stats,
      personalInfo
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `satendra_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("success", "Backup configuration exported!");
  };

  // JSON Import Data
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.projects && parsed.stats && parsed.personalInfo) {
            onUpdateProjects(parsed.projects);
            onUpdateStats(parsed.stats);
            onUpdatePersonalInfo(parsed.personalInfo);
            
            // Sync values in form
            setProfileForm({
              name: parsed.personalInfo.name,
              titlesText: parsed.personalInfo.titles.join(", "),
              intro: parsed.personalInfo.intro,
              aboutMeBio: parsed.personalInfo.aboutMeBio,
              editingPhilosophy: parsed.personalInfo.editingPhilosophy,
              careerGoals: parsed.personalInfo.careerGoals,
            });
            setStatsForm(parsed.stats);

            showNotification("success", "Config backup imported successfully!");
            confetti({ particleCount: 100, spread: 80 });
          } else {
            showNotification("error", "Invalid file structure. Must contain projects, stats, and personalInfo.");
          }
        } catch (error) {
          showNotification("error", "Error parsing backup file. Make sure it is valid JSON.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetDataClick = () => {
    if (window.confirm("Are you sure you want to reset all modifications? This restores default mock records and clears local uploads.")) {
      onResetAll();
      showNotification("success", "Portfolio content reset to default!");
    }
  };

  // Filter video projects and graphics
  const videoProjects = projects.filter(p => p.videoUrl && p.videoUrl.trim() !== "");
  const graphicProjects = projects.filter(p => !p.videoUrl || p.videoUrl.trim() === "");

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/98 backdrop-blur-md overflow-y-auto px-6 py-8 md:py-12 selection:bg-brand-primary/20">
      
      {/* Floating Status Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl border shadow-xl ${
              notification.type === "success" 
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-400" 
                : "bg-red-950/80 border-red-500/30 text-red-400"
            }`}
          >
            {notification.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            <span className="text-sm font-semibold">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-900/80 mb-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/10">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-2xl tracking-tight text-white">Creator Dashboard</h1>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded border border-brand-primary/20">
                  CMS Mode
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Control portfolio stats, video showreel embeds, and design thumbnails</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer transition-all shadow-inner"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Live Site
          </button>
        </div>

        {/* Console layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Tab Navigation Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-3 px-4.5 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-left cursor-pointer transition-all ${
                activeTab === "videos"
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/15"
                  : "bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Film className="h-4.5 w-4.5" />
              Video Showcase
            </button>
            <button
              onClick={() => setActiveTab("graphics")}
              className={`flex items-center gap-3 px-4.5 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-left cursor-pointer transition-all ${
                activeTab === "graphics"
                  ? "bg-brand-secondary text-white shadow-md shadow-brand-secondary/15"
                  : "bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <ImageIcon className="h-4.5 w-4.5" />
              Graphics & Design
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4.5 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-left cursor-pointer transition-all ${
                activeTab === "profile"
                  ? "bg-brand-accent text-white shadow-md shadow-brand-accent/15"
                  : "bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <User className="h-4.5 w-4.5" />
              Profile & Stats
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center gap-3 px-4.5 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-left cursor-pointer transition-all ${
                activeTab === "system"
                  ? "bg-zinc-800 text-white border border-zinc-750"
                  : "bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/60 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <RefreshCw className="h-4.5 w-4.5" />
              System Settings
            </button>

            {/* Quick Stats Panel */}
            <div className="mt-8 p-5 rounded-2xl glassmorphism border border-zinc-800/60 hidden lg:block">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-brand-primary" />
                Live Counters
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-semibold">Video Samples</span>
                  <span className="font-bold text-white">{videoProjects.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-semibold">Graphic Samples</span>
                  <span className="font-bold text-white">{graphicProjects.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-semibold">Total Projects</span>
                  <span className="font-bold text-brand-primary">{projects.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Workspace Panel */}
          <div className="lg:col-span-3">
            
            {/* TABS CONTAINER */}
            <div className="space-y-8">
              
              {/* VIDEOS MANAGER TAB */}
              {activeTab === "videos" && (
                <div className="space-y-8">
                  {/* Form Card */}
                  <div id="video-form-anchor" className="glassmorphism rounded-3xl p-6 md:p-8 border border-zinc-800/80">
                    <h2 className="font-display font-extrabold text-xl text-white mb-6 flex items-center gap-2">
                      <Film className="h-5 w-5 text-brand-primary" />
                      {editingVideoId ? "Edit Video Showcase Project" : "Publish New Video Project"}
                    </h2>

                    <form onSubmit={handleSaveVideo} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Project Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Creator Growth Reel 2026"
                            value={videoForm.title || ""}
                            onChange={e => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Category Tag *</label>
                          <select
                            value={videoForm.category || ""}
                            onChange={e => setVideoForm(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-zinc-300 font-medium focus:outline-none transition-colors cursor-pointer"
                          >
                            <option value="Video Strategy & SEO">Video Strategy & SEO</option>
                            <option value="Ad Editing & Motion Design">Ad Editing & Motion Design</option>
                            <option value="Product Motion Graphics">Product Motion Graphics</option>
                            <option value="Video Editing & VFX">Video Editing & VFX</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Client Partner</label>
                          <input
                            type="text"
                            placeholder="e.g. Respawn, Marketing Agency"
                            value={videoForm.client || ""}
                            onChange={e => setVideoForm(prev => ({ ...prev, client: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Project Duration</label>
                          <input
                            type="text"
                            placeholder="e.g. 2 Weeks, Ongoing"
                            value={videoForm.duration || ""}
                            onChange={e => setVideoForm(prev => ({ ...prev, duration: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">YouTube or Vimeo Video Link *</label>
                        <input
                          type="url"
                          required
                          placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          value={videoForm.videoUrl || ""}
                          onChange={e => handleVideoUrlChange(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors"
                        />
                        {videoForm.thumbnail && videoForm.thumbnail.startsWith("http") && (
                          <div className="mt-2.5 flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-900">
                            <img src={videoForm.thumbnail} alt="YouTube Cover" className="h-12 w-20 object-cover rounded-md border border-zinc-800" />
                            <span className="text-[10px] text-zinc-500 font-semibold">YouTube thumbnail preview loaded successfully.</span>
                          </div>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Software Tools (comma-separated)</label>
                          <input
                            type="text"
                            placeholder="e.g. Premiere Pro, After Effects, DaVinci"
                            value={videoSoftwareText}
                            onChange={e => setVideoSoftwareText(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Custom Thumbnail Image URL (Optional)</label>
                          <input
                            type="text"
                            placeholder="Overwrite auto-YouTube thumbnail URL..."
                            value={videoForm.thumbnail || ""}
                            onChange={e => setVideoForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Short Project Summary *</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="State the core pacing hook or storytelling dynamic used..."
                          value={videoForm.description || ""}
                          onChange={e => setVideoForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-primary text-sm text-white font-medium focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Case Study details */}
                      <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900 space-y-4">
                        <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase block border-b border-zinc-900 pb-2">
                          Interactive Case Study Data (Optional)
                        </span>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">The Challenge</label>
                            <textarea
                              rows={2}
                              placeholder="Describe the initial problem..."
                              value={videoForm.challenge || ""}
                              onChange={e => setVideoForm(prev => ({ ...prev, challenge: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-brand-primary resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">My Solution</label>
                            <textarea
                              rows={2}
                              placeholder="Pacing modifications or hooks..."
                              value={videoForm.solution || ""}
                              onChange={e => setVideoForm(prev => ({ ...prev, solution: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-brand-primary resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">The Result</label>
                            <textarea
                              rows={2}
                              placeholder="Stats achieved (e.g. 50K subscribers)..."
                              value={videoForm.result || ""}
                              onChange={e => setVideoForm(prev => ({ ...prev, result: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-brand-primary resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4 pt-4 border-t border-zinc-900/60">
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-xl bg-brand-primary hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-brand-primary/10 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Save className="h-4.5 w-4.5" />
                          {editingVideoId ? "Update Project" : "Publish Video Project"}
                        </button>
                        {editingVideoId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingVideoId(null);
                              setVideoForm({
                                id: "", title: "", category: "Video Editing & VFX", client: "",
                                duration: "1 Week", software: [], videoUrl: "", description: "",
                                challenge: "", solution: "", result: "", thumbnail: ""
                              });
                              setVideoSoftwareText("");
                            }}
                            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm border border-zinc-700 cursor-pointer"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Active Videos List */}
                  <div className="glassmorphism rounded-3xl p-6 border border-zinc-800/80">
                    <h3 className="font-display font-extrabold text-base text-white mb-4">Current Video Showcase ({videoProjects.length})</h3>
                    <motion.div layout className="space-y-3.5">
                      {videoProjects.map((proj, groupIdx) => (
                        <motion.div 
                          layout
                          key={proj.id} 
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Up/Down buttons for order */}
                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                disabled={groupIdx === 0}
                                onClick={() => handleMoveProject(proj.id, "up")}
                                className={`p-1 rounded-md border border-zinc-800/80 hover:bg-zinc-900 hover:text-white cursor-pointer transition-colors ${groupIdx === 0 ? "text-zinc-700 hover:text-zinc-700 cursor-not-allowed bg-zinc-950" : "text-zinc-400 bg-zinc-900/60"}`}
                                title="Move Up"
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={groupIdx === videoProjects.length - 1}
                                onClick={() => handleMoveProject(proj.id, "down")}
                                className={`p-1 rounded-md border border-zinc-800/80 hover:bg-zinc-900 hover:text-white cursor-pointer transition-colors ${groupIdx === videoProjects.length - 1 ? "text-zinc-700 hover:text-zinc-700 cursor-not-allowed bg-zinc-950" : "text-zinc-400 bg-zinc-900/60"}`}
                                title="Move Down"
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {proj.thumbnail ? (
                              <img src={proj.thumbnail} alt={proj.title} className="h-11 w-20 object-cover rounded-lg border border-zinc-800/60 flex-shrink-0" />
                            ) : (
                              <div className="h-11 w-20 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-850 flex-shrink-0">
                                <Film className="h-5 w-5 text-zinc-600" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-white truncate max-w-[240px] md:max-w-[360px]">{proj.title}</h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-[9px] font-bold text-brand-primary uppercase tracking-wide bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded">
                                  {proj.category}
                                </span>
                                <span className="text-[9px] font-semibold text-zinc-500">
                                  {proj.client} • {proj.duration}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => handleStartEditVideo(proj)}
                              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                              title="Edit"
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 text-zinc-500 hover:text-red-400 cursor-pointer transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* GRAPHICS TAB */}
              {activeTab === "graphics" && (
                <div className="space-y-8">
                  {/* Form Card */}
                  <div id="graphic-form-anchor" className="glassmorphism rounded-3xl p-6 md:p-8 border border-zinc-800/80">
                    <h2 className="font-display font-extrabold text-xl text-white mb-6 flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-brand-secondary" />
                      {editingGraphicId ? "Edit Graphic Project" : "Publish New Graphic Design"}
                    </h2>

                    <form onSubmit={handleSaveGraphic} className="space-y-5">
                      {/* Drag & Drop Upload Zone */}
                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Upload Design Image *</label>
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-full min-h-[160px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
                            dragActive 
                              ? "border-brand-secondary bg-brand-secondary/5" 
                              : "border-zinc-800 bg-zinc-950/50 hover:bg-zinc-950/90 hover:border-zinc-700"
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />

                          {graphicForm.thumbnail ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10 group">
                              <img 
                                src={graphicForm.thumbnail} 
                                alt="Preview" 
                                className="w-full h-full object-contain max-h-[160px]" 
                              />
                              <div className="absolute inset-0 bg-zinc-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setGraphicForm(prev => ({ ...prev, thumbnail: "" }));
                                  }}
                                  className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                                >
                                  <Trash2 className="h-4.5 w-4.5" />
                                </button>
                                <span className="text-xs text-white font-bold">Remove Image</span>
                              </div>
                            </div>
                          ) : null}

                          <Upload className="h-8 w-8 text-zinc-500 mb-3" />
                          <p className="text-sm font-semibold text-zinc-300 mb-1">Drag & drop your graphic file here or <span className="text-brand-secondary">browse</span></p>
                          <p className="text-[10px] text-zinc-500 font-medium">Supports PNG, JPG, WebP. Max suggested resolution 1920x1080.</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Graphic Project Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. YouTube Retention Thumbnail Design"
                            value={graphicForm.title || ""}
                            onChange={e => setGraphicForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-secondary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Category *</label>
                          <select
                            value={graphicForm.category || ""}
                            onChange={e => setGraphicForm(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-secondary text-sm text-zinc-300 font-medium focus:outline-none transition-colors cursor-pointer"
                          >
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Thumbnail Design">Thumbnail Design</option>
                            <option value="Concept Art">Concept Art</option>
                            <option value="Vector motion graphics">Vector motion graphics</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Client / Brand</label>
                          <input
                            type="text"
                            placeholder="e.g. Independent Creation, Gaming Creator"
                            value={graphicForm.client || ""}
                            onChange={e => setGraphicForm(prev => ({ ...prev, client: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-secondary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Software Tools used</label>
                          <input
                            type="text"
                            placeholder="e.g. Photoshop, Figma, Illustrator"
                            value={graphicSoftwareText}
                            onChange={e => setGraphicSoftwareText(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-secondary text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Short Project Summary *</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="Describe the typography contrast or visual psychology model used..."
                          value={graphicForm.description || ""}
                          onChange={e => setGraphicForm(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-secondary text-sm text-white font-medium focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Case Study details */}
                      <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900 space-y-4">
                        <span className="text-[10px] font-bold text-brand-secondary tracking-widest uppercase block border-b border-zinc-900 pb-2">
                          Interactive Case Study Data (Optional)
                        </span>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">The Challenge</label>
                            <textarea
                              rows={2}
                              placeholder="Problem statements..."
                              value={graphicForm.challenge || ""}
                              onChange={e => setGraphicForm(prev => ({ ...prev, challenge: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-brand-secondary resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">My Solution</label>
                            <textarea
                              rows={2}
                              placeholder="Contrast rules and framing..."
                              value={graphicForm.solution || ""}
                              onChange={e => setGraphicForm(prev => ({ ...prev, solution: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-brand-secondary resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">The Result</label>
                            <textarea
                              rows={2}
                              placeholder="CTR boosts or audience response..."
                              value={graphicForm.result || ""}
                              onChange={e => setGraphicForm(prev => ({ ...prev, result: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-850 text-xs text-white focus:outline-none focus:border-brand-secondary resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4 pt-4 border-t border-zinc-900/60">
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-xl bg-brand-secondary hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-brand-secondary/10 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Save className="h-4.5 w-4.5" />
                          {editingGraphicId ? "Update Project" : "Publish Graphic Design"}
                        </button>
                        {editingGraphicId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingGraphicId(null);
                              setGraphicForm({
                                id: "", title: "", category: "Graphic Design", client: "",
                                duration: "3 Days", software: [], description: "",
                                challenge: "", solution: "", result: "", thumbnail: ""
                              });
                              setGraphicSoftwareText("");
                            }}
                            className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm border border-zinc-700 cursor-pointer"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Active Graphics List */}
                  <div className="glassmorphism rounded-3xl p-6 border border-zinc-800/80">
                    <h3 className="font-display font-extrabold text-base text-white mb-4">Current Graphic Designs ({graphicProjects.length})</h3>
                    <motion.div layout className="space-y-3.5">
                      {graphicProjects.map((proj, groupIdx) => (
                        <motion.div 
                          layout
                          key={proj.id} 
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Up/Down buttons for order */}
                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                disabled={groupIdx === 0}
                                onClick={() => handleMoveProject(proj.id, "up")}
                                className={`p-1 rounded-md border border-zinc-800/80 hover:bg-zinc-900 hover:text-white cursor-pointer transition-colors ${groupIdx === 0 ? "text-zinc-700 hover:text-zinc-700 cursor-not-allowed bg-zinc-950" : "text-zinc-400 bg-zinc-900/60"}`}
                                title="Move Up"
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={groupIdx === graphicProjects.length - 1}
                                onClick={() => handleMoveProject(proj.id, "down")}
                                className={`p-1 rounded-md border border-zinc-800/80 hover:bg-zinc-900 hover:text-white cursor-pointer transition-colors ${groupIdx === graphicProjects.length - 1 ? "text-zinc-700 hover:text-zinc-700 cursor-not-allowed bg-zinc-950" : "text-zinc-400 bg-zinc-900/60"}`}
                                title="Move Down"
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {proj.thumbnail ? (
                              <img src={proj.thumbnail} alt={proj.title} className="h-11 w-20 object-cover rounded-lg border border-zinc-800/60 flex-shrink-0 bg-zinc-900" />
                            ) : (
                              <div className="h-11 w-20 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-850 flex-shrink-0">
                                <ImageIcon className="h-5 w-5 text-zinc-600" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-white truncate max-w-[240px] md:max-w-[360px]">{proj.title}</h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-[9px] font-bold text-brand-secondary uppercase tracking-wide bg-brand-secondary/10 border border-brand-secondary/20 px-2 py-0.5 rounded">
                                  {proj.category}
                                </span>
                                <span className="text-[9px] font-semibold text-zinc-500">
                                  {proj.client} • {proj.duration}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => handleStartEditGraphic(proj)}
                              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors"
                              title="Edit"
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 text-zinc-500 hover:text-red-400 cursor-pointer transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* PROFILE & STATS TAB */}
              {activeTab === "profile" && (
                <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-zinc-800/80">
                  <h2 className="font-display font-extrabold text-xl text-white mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-brand-accent" />
                    Edit Profile Details & Metric Stats
                  </h2>

                  <form onSubmit={handleSaveProfileAndStats} className="space-y-6">
                    {/* Basic profile info */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">Profile Basics</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Full Name</label>
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={e => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-accent text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Scrolling Titles (comma-separated)</label>
                          <input
                            type="text"
                            value={profileForm.titlesText}
                            onChange={e => setProfileForm(prev => ({ ...prev, titlesText: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-accent text-sm text-white font-medium focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Hero Short Bio</label>
                        <input
                          type="text"
                          value={profileForm.intro}
                          onChange={e => setProfileForm(prev => ({ ...prev, intro: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-accent text-sm text-white font-medium focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Biography sections */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">Biography & Creative Philosophy</h3>
                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Long About Me Story</label>
                        <textarea
                          rows={3}
                          value={profileForm.aboutMeBio}
                          onChange={e => setProfileForm(prev => ({ ...prev, aboutMeBio: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-accent text-sm text-white font-medium focus:outline-none transition-colors resize-none"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Editing Philosophy</label>
                          <textarea
                            rows={3}
                            value={profileForm.editingPhilosophy}
                            onChange={e => setProfileForm(prev => ({ ...prev, editingPhilosophy: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-accent text-sm text-white font-medium focus:outline-none transition-colors resize-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Career Objectives</label>
                          <textarea
                            rows={3}
                            value={profileForm.careerGoals}
                            onChange={e => setProfileForm(prev => ({ ...prev, careerGoals: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 focus:border-brand-accent text-sm text-white font-medium focus:outline-none transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats numeric counters */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">Numeric Stats Counters</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {statsForm.map((stat, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-900">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">{stat.label}</label>
                            <div className="flex gap-1">
                              <input
                                type="number"
                                required
                                value={stat.value}
                                onChange={e => {
                                  const updated = [...statsForm];
                                  updated[idx].value = parseInt(e.target.value) || 0;
                                  setStatsForm(updated);
                                }}
                                className="w-full px-2 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-brand-accent text-xs font-bold text-center text-white focus:outline-none"
                              />
                              <input
                                type="text"
                                value={stat.suffix}
                                onChange={e => {
                                  const updated = [...statsForm];
                                  updated[idx].suffix = e.target.value;
                                  setStatsForm(updated);
                                }}
                                className="w-10 px-1 py-1.5 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-brand-accent text-xs font-bold text-center text-zinc-400 focus:outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900/60">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-brand-accent hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-brand-accent/10 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Save className="h-4.5 w-4.5" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SYSTEM SETTINGS TAB */}
              {activeTab === "system" && (
                <div className="glassmorphism rounded-3xl p-6 md:p-8 border border-zinc-800/80 space-y-8">
                  <div>
                    <h2 className="font-display font-extrabold text-xl text-white mb-2 flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-zinc-400" />
                      Backup & Operations Console
                    </h2>
                    <p className="text-xs text-zinc-400 font-medium">Export/Import local portfolio layouts and reset cached custom records</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Backup section */}
                    <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Download className="h-5 w-5 text-brand-primary animate-pulse" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Export Configuration</h3>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        Download all current projects, dynamic statistics, and bio stories as a portable JSON backup file. This file can be stored offline or imported later.
                      </p>
                      <button
                        onClick={handleExportData}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download JSON Backup
                      </button>
                    </div>

                    {/* Import Section */}
                    <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Upload className="h-5 w-5 text-brand-secondary animate-pulse" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Import Backup</h3>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                        Upload a previously exported portfolio backup file to restore custom modifications instantly.
                      </p>
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer transition-colors">
                        <Upload className="h-4 w-4" />
                        Upload Backup File
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportData}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset Section */}
                  <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Factory Revert</h3>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                      Reset all portfolio details back to the default configuration. All local updates, custom video submissions, and graphic image base64 files will be permanently deleted from this browser cache.
                    </p>
                    <button
                      onClick={handleResetDataClick}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 border border-red-800/80 text-xs font-bold text-white cursor-pointer transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset to Default State
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
