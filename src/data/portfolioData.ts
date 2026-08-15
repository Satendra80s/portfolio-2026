export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  software: string[];
  challenge: string;
  solution: string;
  result: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skillsList: string[];
}

export interface Software {
  name: string;
  level: string; // e.g., Expert, Advanced
  iconName: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientPhoto: string;
  company: string;
  position: string;
  rating: number;
  text: string;
  projectCategory: string;
  completionDate: string;
  verified: boolean;
}

export interface TimelineItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export const portfolioData = {
  personalInfo: {
    name: "Satendra Patel",
    titles: [
      "Senior Video Editor",
      "Motion Graphics Designer",
      "Creative Content Strategist"
    ],
    intro: "I create high-performance videos and motion designs that increase audience retention, optimize watch-time, and help digital brands grow.",
    aboutMeBio: "I am a Senior Video Editor and Motion Graphics Designer with 3+ years of experience delivering high-performance video content for digital brands, agencies, and creators. I specialize in performance-driven video editing, advanced motion design, and digital storytelling that drives conversions, watch-time optimization, and brand recall.",
    editingPhilosophy: "Every frame must serve a retention hook. Pacing, kinetic typography, and structural editing aren't just details—they are performance metrics. By engineering visual hooks and pacing, I help content convert and scale organically.",
    careerGoals: "My objective is to lead creative video production for high-tier agencies and digital brands, leveraging data-driven pacing and motion design to drive conversions and subscriber scale."
  },
  
  stats: [
    { label: "Projects Completed", value: 80, suffix: "+" },
    { label: "Happy Clients", value: 25, suffix: "+" },
    { label: "Videos Edited", value: 100, suffix: "+" },
    { label: "Views Generated", value: 1, suffix: "M+" },
    { label: "Years of Experience", value: 3, suffix: "+" }
  ],

  skillCategories: [
    {
      name: "Editing & Motion",
      icon: "Video",
      description: "Assembling narrative drafts with Premiere, After Effects, and DaVinci to ensure high pacing.",
      skillsList: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut Pro"]
    },
    {
      name: "Advanced Motion",
      icon: "Sparkles",
      description: "Crafting fluid vector motion elements, kinetic titles, and tracking assets.",
      skillsList: ["Kinetic Typography", "2D/3D Layers", "Camera Tracking", "Expressions"]
    },
    {
      name: "Color & Audio",
      icon: "Palette",
      description: "Cinematic grading, matching profiles, mixing spatial audio levels, and soundscapes.",
      skillsList: ["Cinematic Grading", "Custom LUTs", "Sound Design", "Audio Mastering"]
    },
    {
      name: "Content Expertise",
      icon: "TrendingUp",
      description: "Optimizing video structures across formats to maximize conversion and click rates.",
      skillsList: ["YouTube Growth", "Ad Creatives", "Reels & Shorts", "Corporate Films"]
    },
    {
      name: "Design Layouts",
      icon: "Image",
      description: "Graphic creations for thumbnails using contrast rules and viewer visual psychology.",
      skillsList: ["Photoshop", "Illustrator", "Figma", "Thumbnail Psychology"]
    },
    {
      name: "Creative Strategy",
      icon: "Layers",
      description: "Retention tracking, storyboards, and A/B cover tests to maximize algorithm reaches.",
      skillsList: ["Storyboarding", "Script Optimization", "Retention Engineering", "A/B Testing"]
    }
  ],

  software: [
    { name: "Adobe Premiere Pro", level: "Expert", iconName: "Premiere" },
    { name: "After Effects", level: "Expert", iconName: "AfterEffects" },
    { name: "DaVinci Resolve", level: "Advanced", iconName: "DaVinci" },
    { name: "Photoshop", level: "Advanced", iconName: "Photoshop" },
    { name: "Illustrator", level: "Intermediate", iconName: "Illustrator" },
    { name: "CapCut Desktop", level: "Expert", iconName: "CapCut" },
    { name: "Figma", level: "Advanced", iconName: "Figma" }
  ],

  projects: [
    {
      id: "project-1",
      title: "YouTube Channel Growth System",
      category: "Video Strategy & SEO",
      client: "Creator Partner",
      duration: "8 Months",
      software: ["Premiere Pro", "After Effects", "Photoshop", "Figma"],
      challenge: "Scale a client's organic YouTube traffic and subscriber acquisition rate from 5k subscribers to a mainstream digital authority.",
      solution: "Engineered retention-based editing rules, created high-CTR thumbnail assets, implemented kinetic typography hooks, and optimized visual pacing.",
      result: "Scaled the channel from 5K to 50K subscribers (+10x growth) in 8 months. Lifted average watch time by 25% and CTR by 35%.",
      description: "A comprehensive video growth model that focuses on retention tracking, thumbnail contrast design, and structural video hooks.",
      thumbnail: "/assets/project-apex.jpg",
      videoUrl: "https://www.youtube.com/watch?v=iv1tP74965I"
    },
    {
      id: "project-2",
      title: "Performance Ad Creative Suite",
      category: "Ad Editing & Motion Design",
      client: "Marketing Agency",
      duration: "Ongoing",
      software: ["After Effects", "Premiere Pro", "CapCut Desktop"],
      challenge: "Design high-converting video advertisements to reduce acquisition costs and scale lead generation for digital ad campaigns.",
      solution: "Optimized the critical first 3-second visual hooks, styled kinetic caption designs, and streamlined pacing models matching target user demographics.",
      result: "Produced over 100+ high-performance ad creatives, contributing to a 2x increase in lead generation and lifting campaign CTR by 35%.",
      description: "A conversion-focused suite of ad creatives optimized for social feeds, focusing on immediate hooks and visual pacing.",
      thumbnail: "/assets/project-ai.jpg",
      videoUrl: "https://www.youtube.com/watch?v=cI7f7KwtV38"
    },
    {
      id: "project-3",
      title: "SaaS Mobile Fintech App Explainer",
      category: "Product Motion Graphics",
      client: "PayWave Global",
      duration: "4 Weeks",
      software: ["After Effects", "Figma", "Illustrator"],
      challenge: "Create a visual sales walkthrough showing how instantaneous global micro-payments clear, in a clean, Stripe-like elegant animation.",
      solution: "Built a fully stylized 3D glassmorphic cell phone model, and structured bright neon paths flowing between nodes with smooth vector transitions.",
      result: "Used on standard landing page, lifting registration conversions by 125% and lowering onboarding customer drop-offs.",
      description: "A sleek, premium app commercial designed to demystify peer-to-peer cryptocurrency clearing. Utilizes soft drop-shadows and glassmorphism UI mockups.",
      thumbnail: "/assets/project-fintech.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "project-4",
      title: "Apex Legends Season 20 Hype Trailer",
      category: "Video Editing & VFX",
      client: "Respawn Entertainment",
      duration: "3 Weeks",
      software: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
      challenge: "Condense 60+ hours of cinematic and gameplay capture footage into a 90-second high-adrenaline hype reel that triggers action and Day-1 player logins.",
      solution: "Engineered sound design patterns matched with rapid cut rates, customized screen shakes, kinetic text tracking, and color-matched particle sweeps.",
      result: "4.8 Million views across YouTube and Twitter. Attributed to a 18% increase in game login spikes on launch weekend.",
      description: "An explosive, fast-tempo cinematic launch video crafted to celebrate the game's milestone update. Highlighting new mechanics with intense kinetic styling.",
      thumbnail: "/assets/project-shorts.jpg",
      videoUrl: "https://www.youtube.com/watch?v=I148K83YnEs"
    }
  ],

  testimonials: [
    {
      id: "t-1",
      clientName: "Liam Chen",
      clientPhoto: "/assets/client-liam.jpg",
      company: "ONE STOP Partner",
      position: "Executive Producer",
      rating: 5,
      text: "Satendra completely transformed our visual pipeline. Audience retention skyrocketed by 30% instantly due to his incredible editing instincts and dynamic graphics.",
      projectCategory: "Ad Campaign",
      completionDate: "May 2026",
      verified: true
    },
    {
      id: "t-2",
      clientName: "Sarah Jenkins",
      clientPhoto: "/assets/client-sarah.jpg",
      company: "Respawn Entertainment",
      position: "Creative Director",
      rating: 5,
      text: "Satendra delivered visual effects and sound design that exceeded our initial trailer specs. Extremely communicative, highly organized, and always met deadlines.",
      projectCategory: "Cinematic Trailer",
      completionDate: "April 2026",
      verified: true
    },
    {
      id: "t-3",
      clientName: "Marcus Vance",
      clientPhoto: "/assets/client-marcus.jpg",
      company: "PayWave Global",
      position: "Chief Marketing Officer",
      rating: 5,
      text: "The fintech explainer was gorgeous. We had a tight launch schedule, and Satendra worked with us to refine every motion curve. Conversions increased by 125%!",
      projectCategory: "Product Motion Graphics",
      completionDate: "March 2026",
      verified: true
    },
    {
      id: "t-4",
      clientName: "Elena Rostova",
      clientPhoto: "/assets/client-elena.jpg",
      company: "GrowthLabs",
      position: "Founder & Creator",
      rating: 5,
      text: "If you want viral short-form assets, Satendra is the absolute authority. His retention hooks and custom kinetic titles are pure magic. The results speak for themselves.",
      projectCategory: "Short-Form Creator",
      completionDate: "June 2026",
      verified: true
    }
  ],

  timeline: [
    {
      id: "time-1",
      company: "ONE STOP, Jabalpur",
      role: "Senior Video Editor & Motion Designer",
      duration: "Jan 2024 - Present",
      responsibilities: [
        "Led video production and creative direction for 200+ high-impact marketing, promotional, and brand videos across digital platforms.",
        "Design advanced motion graphics templates, kinetic typography assets, and VFX layouts to enhance brand recall.",
        "Mentor and train 3 junior video editors, optimizing quality standards and feedback structures."
      ],
      achievements: [
        "Improved marketing campaign click-through rates (CTR) by 35% and viewer retention by 30% through performance-driven editing strategies.",
        "Increased overall brand recall metrics by 40% through custom styled kinetic graphics.",
        "Reduced overall project turnaround and delivery timelines by 25% by structuring template pipelines."
      ]
    },
    {
      id: "time-2",
      company: "Freelance / Remote",
      role: "Video Editor & Motion Designer",
      duration: "Jan 2022 - Dec 2023",
      responsibilities: [
        "Edited over 300+ custom videos for YouTube, Instagram Reels, Shorts, and ads generating 1M+ cumulative views.",
        "Collaborated closely with 10+ digital brands and content creators to establish visual identities and edit structures.",
        "Designed customized high-contrast thumbnail layouts leveraging target audience color psychology."
      ],
      achievements: [
        "Scaled a client's YouTube channel subscriber base from 5K to 50K (+10x growth) in 8 months through retention-focused pacing.",
        "Increased average watch time by 25% and general engagement rates by 20% to 30%."
      ]
    }
  ],

  certifications: [
    {
      name: "Adobe Certified Professional - After Effects",
      issuer: "Adobe Systems",
      year: "2024"
    },
    {
      name: "DaVinci Resolve Color Grading Specialist",
      issuer: "Blackmagic Design",
      year: "2023"
    },
    {
      name: "Advanced Motion Design Diploma",
      issuer: "Motion Design School",
      year: "2022"
    }
  ],

  education: [
    {
      degree: "B.Tech in Information Technology",
      school: "Global Nature Care Group Sangathan Institution, Jabalpur",
      year: "2020 - 2024"
    }
  ]
};
