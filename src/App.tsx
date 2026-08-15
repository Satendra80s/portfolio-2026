import { useState, useEffect } from "react";
import { CursorGlow } from "./components/CursorGlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Timeline } from "./components/Timeline";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import { portfolioData } from "./data/portfolioData";
import type { Project } from "./data/portfolioData";
import { Lock, X, Eye, EyeOff } from "lucide-react";
import confetti from "canvas-confetti";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Dynamic Portfolio States loaded from localStorage (falling back to static portfolioData)
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("satendra_portfolio_projects_v3");
    return saved ? JSON.parse(saved) : portfolioData.projects;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("satendra_portfolio_stats");
    return saved ? JSON.parse(saved) : portfolioData.stats;
  });

  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem("satendra_portfolio_personalInfo");
    return saved ? JSON.parse(saved) : portfolioData.personalInfo;
  });

  // Admin access states
  const [isAdminModeActive, setIsAdminModeActive] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem("satendra_portfolio_projects_v3", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("satendra_portfolio_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("satendra_portfolio_personalInfo", JSON.stringify(personalInfo));
  }, [personalInfo]);

  // Check if admin is logged in (session persistence)
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("satendra_admin_logged_in");
    if (isLoggedIn === "true") {
      // Admin session exists, they can toggle without passcode prompt
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "resume", "contact"];
      const scrollPosition = window.scrollY + 120; // offset for sticky navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open Passcode validation modal
  const handleOpenAdminPortal = () => {
    const sessionAuth = sessionStorage.getItem("satendra_admin_logged_in");
    if (sessionAuth === "true") {
      setIsAdminModeActive(true);
    } else {
      setIsPasscodeModalOpen(true);
    }
  };

  // Submit Passcode
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept satendra270 as passcode
    if (passcode === "satendra270" || passcode === "admin123") {
      sessionStorage.setItem("satendra_admin_logged_in", "true");
      setIsPasscodeModalOpen(false);
      setIsAdminModeActive(true);
      setPasscode("");
      setPasscodeError("");
      
      // Admin Access Success Confetti
      confetti({
        particleCount: 80,
        spread: 50,
        colors: ["#3B82F6", "#8B5CF6"]
      });
    } else {
      setPasscodeError("Invalid Access Passcode. Try again.");
    }
  };

  // Revert all data back to original state
  const handleResetToFactoryDefaults = () => {
    localStorage.removeItem("satendra_portfolio_projects");
    localStorage.removeItem("satendra_portfolio_projects_v2");
    localStorage.removeItem("satendra_portfolio_projects_v3");
    localStorage.removeItem("satendra_portfolio_stats");
    localStorage.removeItem("satendra_portfolio_personalInfo");
    
    setProjects(portfolioData.projects);
    setStats(portfolioData.stats);
    setPersonalInfo(portfolioData.personalInfo);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen relative antialiased selection:bg-brand-primary/30 selection:text-white">
      {/* Premium Background Ambient Follower */}
      <CursorGlow />

      {/* Header & Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Floating Gear for Logged In Admin */}
      {sessionStorage.getItem("satendra_admin_logged_in") === "true" && !isAdminModeActive && (
        <button
          onClick={() => setIsAdminModeActive(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:scale-105 hover:rotate-45 cursor-pointer transition-all duration-300"
          title="Open Admin Console"
        >
          <Lock className="h-5 w-5" />
        </button>
      )}

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} stats={stats} />
        <Skills />
        <Projects projects={projects} onUpdateProjects={setProjects} />
        <Timeline />
        <Resume />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdminPortal} />

      {/* Passcode Protection Modal Overlay */}
      {isPasscodeModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 p-4 backdrop-blur-md"
          onClick={() => setIsPasscodeModalOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsPasscodeModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-12 w-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-brand-primary" />
              </div>
              <h3 className="font-display font-extrabold text-xl text-white mb-1.5">Creator Portal Access</h3>
              <p className="text-xs text-zinc-400 font-medium">Verify credentials to unlock video and graphics management panel.</p>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter creator passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (passcodeError) setPasscodeError("");
                  }}
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-zinc-950/80 border text-sm text-white font-medium focus:outline-none transition-colors ${
                    passcodeError ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-brand-primary"
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>

              {passcodeError && (
                <span className="text-xs text-red-400 font-semibold block text-center mt-1">{passcodeError}</span>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm shadow-lg shadow-brand-primary/25 hover:brightness-110 cursor-pointer transition-all"
              >
                Authenticate
              </button>
            </form>
            <div className="text-[10px] text-zinc-500 font-semibold text-center mt-4">
              Tip: Use passcode <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">satendra270</code> to unlock
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard Page Overlay */}
      {isAdminModeActive && (
        <AdminPanel
          projects={projects}
          stats={stats}
          personalInfo={personalInfo}
          onUpdateProjects={setProjects}
          onUpdateStats={setStats}
          onUpdatePersonalInfo={setPersonalInfo}
          onClose={() => setIsAdminModeActive(false)}
          onResetAll={handleResetToFactoryDefaults}
        />
      )}
    </div>
  );
}

export default App;

