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
      id: "video-1",
      title: "IPL का सबसे Confusing Match 😱 जीती टीम रोई, हारने वाली हँसी",
      category: "Cricket Storytelling & Video Editing",
      client: "Sports Content",
      duration: "1 Week",
      software: ["Premiere Pro", "After Effects", "Photoshop"],
      challenge: "Pacing high-stakes cricket narrative and fast-action commentary visual matching.",
      solution: "Engineered dynamic retention hooks, kinetic sound design, and historical match visual tracking.",
      result: "High retention rate with viral audience reach.",
      description: "This is the unbelievable story of Mumbai Indians vs Rajasthan Royals 2014 — one of the craziest and most confusing matches in cricket history.",
      thumbnail: "https://i.ytimg.com/vi/cgJQKY1oKxg/hqdefault.jpg",
      videoUrl: "https://youtu.be/cgJQKY1oKxg?si=T316iO6sA1y3B7Ob"
    },
    {
      id: "video-2",
      title: "Pani Puri bechne se lekar Double Century tak | India ka Next Superstar?",
      category: "Documentary Video Editing",
      client: "Cricket Story",
      duration: "1 Week",
      software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      challenge: "Telling an emotional, inspiring rags-to-riches journey with archival footage.",
      solution: "Crafted cinematic color grading, emotional sound design, and fast pacing.",
      result: "Massive viral engagement and high watch-time.",
      description: "Yashasvi Jaiswal ki journey kisi movie se kam nahi hai. Mumbai ke Azad Maidan me bina proper ghar, bina light aur kai baar bina khane ke rehne wala ek chhota ladka… aaj Team India aur Rajasthan Royals ka superstar ban chuka hai. Ek time aisa tha jab wo din bhar cricket practice karta tha aur shaam ko pani puri bechkar apna guzara karta tha. Lekin usne apne dreams kabhi nahi chhode.",
      thumbnail: "https://i.ytimg.com/vi/jMpAQLWEGZw/hqdefault.jpg",
      videoUrl: "https://youtu.be/jMpAQLWEGZw?si=g2rEUx5wGENi73j8"
    },
    {
      id: "video-3",
      title: "Smriti Mandhana Creates History! Only Indian in TIME's 100 Most Influential Sports List",
      category: "Shorts & Reels Motion Editing",
      client: "SPORTS MARQ",
      duration: "2 Days",
      software: ["After Effects", "CapCut Desktop", "Photoshop"],
      challenge: "Designing vertical 9:16 high-retention short content with fast text animations.",
      solution: "Used kinetic typography, energetic visual pop-ups, and punchy audio transitions.",
      result: "Viral Short with 90%+ average percentage viewed.",
      description: "Smriti Mandhana ne history rach di hai. TIME Magazine ki pehli-ever 100 Most Influential People in Sports list mein jagah banane wali woh iklauti Indian sportsperson bani hain.",
      thumbnail: "https://i.ytimg.com/vi/rHcvCj3U6Ag/hqdefault.jpg",
      videoUrl: "https://youtube.com/shorts/rHcvCj3U6Ag?si=xQCHd356DvEH9ZcT"
    },
    {
      id: "video-4",
      title: "From Dishwashers to 191 Branches — The Untold Indian Coffee House Empire Story",
      category: "Podcast Video Editing",
      client: "The First Talk",
      duration: "5 Days",
      software: ["Premiere Pro", "After Effects", "Audition"],
      challenge: "Multi-camera podcast editing with clear audio mixing and visual archival overlays.",
      solution: "Seamless multi-cam switching, lower-thirds motion graphics, and narrative sound design.",
      result: "Featured episode with high viewer retention.",
      description: "In this inspiring episode of The First Talk, host Dr. Sanjeev Choudhary sits down with Dr. O.K. Rajagopalan, President of the Indian Coffee House Workers Association, who has dedicated more than five decades to building one of India's most iconic and trusted food service institutions.",
      thumbnail: "https://i.ytimg.com/vi/3sDGIdfVMgg/hqdefault.jpg",
      videoUrl: "https://youtu.be/3sDGIdfVMgg?si=rnpYSauon-TxpkTu"
    },
    {
      id: "video-5",
      title: "क्या Tiger अपने ही बच्चों को मार देता है? | The First Talk",
      category: "Shorts & Podcast Video Editing",
      client: "The First Talk",
      duration: "1 Day",
      software: ["Premiere Pro", "After Effects"],
      challenge: "Creating an intriguing podcast short clip with high curiosity hook.",
      solution: "Engineered suspenseful visual hooks, bold subtitles, and sound effects.",
      result: "Top performing podcast short.",
      description: "क्या जंगल का सबसे शक्तिशाली शिकारी अपने ही बच्चों के लिए खतरा बन सकता है? Tiger के व्यवहार से जुड़ा यह चौंकाने वाला सच जानिए The First Talk Podcast के इस खास क्लिप में।",
      thumbnail: "https://i.ytimg.com/vi/X6M746nChvk/hqdefault.jpg",
      videoUrl: "https://youtube.com/shorts/X6M746nChvk?si=llUtLnVZs5wAFP_D"
    },
    {
      id: "video-6",
      title: "How BJP Accidentally Created Narendra Modi | The Untold Story",
      category: "Documentary Video Editing",
      client: "Political Documentary",
      duration: "1 Week",
      software: ["Premiere Pro", "After Effects", "Photoshop", "DaVinci Resolve"],
      challenge: "Compiling archival news footage into a captivating documentary style video.",
      solution: "High-end map animations, historical newspaper cutouts, and dramatic background score.",
      result: "Deep-dive documentary with high shareability.",
      description: "This documentary explores how Narendra Modi became the Chief Minister of Gujarat, the internal BJP power struggle between Atal Bihari Vajpayee and L.K. Advani, the impact of the 2002 Godhra train incident, and the political events that transformed Modi into one of the most influential politicians in India.",
      thumbnail: "https://i.ytimg.com/vi/llMg--bUseQ/hqdefault.jpg",
      videoUrl: "https://youtu.be/llMg--bUseQ?si=MpPV-fbKsn-pdLCH"
    },
    {
      id: "video-7",
      title: "Commercial Ad Showcase 01",
      category: "Commercial Ad Video Editing",
      client: "Brand Campaign",
      duration: "3 Days",
      software: ["Premiere Pro", "After Effects"],
      challenge: "Creating high-converting promotional ad creative with punchy visual cuts.",
      solution: "Fast-paced visual edits, custom color grading, and call-to-action motion graphics.",
      result: "High CTR commercial advertisement.",
      description: "High-performance commercial advertisement video designed for digital campaigns and brand awareness.",
      thumbnail: "https://i.ytimg.com/vi/cY-io-PQJnw/hqdefault.jpg",
      videoUrl: "https://youtu.be/cY-io-PQJnw"
    },
    {
      id: "video-8",
      title: "Commercial Ad Showcase 02",
      category: "Commercial Ad Video Editing",
      client: "Brand Campaign",
      duration: "3 Days",
      software: ["Premiere Pro", "After Effects"],
      challenge: "Driving customer engagement through dynamic ad transitions.",
      solution: "Focused on 3-second hook optimization and polished product sound design.",
      result: "Optimized ad creative for digital marketing.",
      description: "High-converting promotional and commercial advertisement video.",
      thumbnail: "https://i.ytimg.com/vi/M2K_2NrTSOU/hqdefault.jpg",
      videoUrl: "https://youtu.be/M2K_2NrTSOU"
    },
    {
      id: "video-9",
      title: "Commercial Ad Showcase 03",
      category: "Commercial Ad Video Editing",
      client: "Brand Campaign",
      duration: "3 Days",
      software: ["Premiere Pro", "After Effects"],
      challenge: "Designing visual storytelling for brand promotion.",
      solution: "Sleek kinetic titles, custom color correction, and rhythmic audio cuts.",
      result: "Increased brand engagement.",
      description: "Creative brand commercial and promo video tailored for social platforms.",
      thumbnail: "https://i.ytimg.com/vi/zy3eDLkE2us/hqdefault.jpg",
      videoUrl: "https://youtu.be/zy3eDLkE2us"
    },
    {
      id: "video-10",
      title: "Client Showcase Video 10",
      category: "Shorts & Reels Video Editing",
      client: "Client Content",
      duration: "2 Days",
      software: ["After Effects", "Premiere Pro", "CapCut Desktop"],
      challenge: "Optimizing vertical short video hooks for maximum audience retention.",
      solution: "Engineered kinetic typography, visual sound design, and color correction.",
      result: "High retention rate on social feeds.",
      description: "Client short video showcase featuring high-converting vertical editing, dynamic captions, and visual effects.",
      thumbnail: "https://i.ytimg.com/vi/r9Jp0AZexDE/hqdefault.jpg",
      videoUrl: "https://youtube.com/shorts/r9Jp0AZexDE?feature=share"
    },
    {
      id: "video-11",
      title: "Client Showcase Video 11",
      category: "Shorts & Reels Video Editing",
      client: "Client Content",
      duration: "2 Days",
      software: ["After Effects", "Premiere Pro", "CapCut Desktop"],
      challenge: "High-retention vertical short-form editing with dynamic subtitles and visual hooks.",
      solution: "Engineered kinetic captions, fast-paced audio cuts, and visual popups.",
      result: "High retention and audience engagement.",
      description: "Client short video showcase featuring high-energy vertical editing, retention hooks, and motion graphics.",
      thumbnail: "https://i.ytimg.com/vi/zsGoYM5MWrs/hqdefault.jpg",
      videoUrl: "https://youtube.com/shorts/zsGoYM5MWrs?feature=share"
    },
    {
      id: "video-12",
      title: "Client Showcase Video 12",
      category: "Shorts & Reels Video Editing",
      client: "Client Content",
      duration: "2 Days",
      software: ["After Effects", "Premiere Pro"],
      challenge: "Captivating audience attention in the first 3 seconds of vertical short video.",
      solution: "Applied motion graphics overlay, punchy visual transitions, and sound effects.",
      result: "Lifted audience watch-time and click rates.",
      description: "Client short video showcase featuring high-converting vertical editing and visual motion effects.",
      thumbnail: "https://i.ytimg.com/vi/TxRdUFbKy34/hqdefault.jpg",
      videoUrl: "https://youtube.com/shorts/TxRdUFbKy34"
    },
    {
      id: "video-13",
      title: "Client Showcase Video 13",
      category: "Shorts & Reels Video Editing",
      client: "Client Content",
      duration: "2 Days",
      software: ["After Effects", "Premiere Pro", "Photoshop"],
      challenge: "Designing eye-catching vertical visual storytelling.",
      solution: "Seamless transitions, kinetic subtitles, and customized color correction.",
      result: "Top performing client short video.",
      description: "Client short video showcase featuring custom text animations, kinetic pacing, and audio mastering.",
      thumbnail: "https://i.ytimg.com/vi/tDrOrorbr6k/hqdefault.jpg",
      videoUrl: "https://youtube.com/shorts/tDrOrorbr6k?feature=share"
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
