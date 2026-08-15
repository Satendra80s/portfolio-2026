import React, { useState } from "react";
import { Mail, Send, Loader2, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Freelance Project",
    message: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const triggerMailtoFallback = (toEmail: string) => {
    setIsSubmitting(false);
    
    const subject = encodeURIComponent(`Portfolio Inquiry: ${formData.subject}`);
    const body = encodeURIComponent(
      `Hi Alex,\n\nMy name is ${formData.name} (${formData.email}).\n\nProposal Details:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    
    // Open mail client
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    
    setSubmitSuccess(true);
    
    // Blast Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3B82F6", "#8B5CF6", "#EC4899", "#FFFFFF"]
    });

    setFormData({
      name: "",
      email: "",
      subject: "Freelance Project",
      message: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const fallbackEmail = import.meta.env.VITE_TO_EMAIL || "satendrapatel270@gmail.com";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: fallbackEmail
    };

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#8B5CF6", "#EC4899", "#FFFFFF"]
        });

        setFormData({
          name: "",
          email: "",
          subject: "Freelance Project",
          message: ""
        });
      } catch (error) {
        console.error("EmailJS Error:", error);
        alert("Failed to send email via background server. Opening local mail client instead...");
        triggerMailtoFallback(fallbackEmail);
      }
    } else {
      triggerMailtoFallback(fallbackEmail);
    }
  };

  const directChannels = [
    {
      name: "Email",
      value: "satendrapatel270@gmail.com",
      href: "mailto:satendrapatel270@gmail.com",
      icon: <Mail className="h-5 w-5 text-brand-primary" />,
      color: "hover:border-brand-primary/45"
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/satendra-patel",
      href: "https://linkedin.com/in/satendra-patel",
      icon: (
        <svg className="h-5 w-5 text-brand-secondary fill-brand-secondary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: "hover:border-brand-secondary/45"
    },
    {
      name: "GitHub",
      value: "github.com/satendra-patel",
      href: "https://github.com/satendra-patel",
      icon: (
        <svg className="h-5 w-5 text-zinc-300 fill-zinc-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: "hover:border-zinc-700"
    },
    {
      name: "Instagram",
      value: "@satendra.patel.creative",
      href: "https://instagram.com",
      icon: (
        <svg className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      color: "hover:border-pink-500/40"
    }
  ];

  return (
    <section id="contact" className="py-24 border-t border-zinc-900/60 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-3">Get in Touch</h2>
          <p className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white max-w-2xl">
            Let's Make Something Great
          </p>
          <div className="h-[2px] w-12 bg-gradient-to-r from-brand-primary to-brand-secondary mt-4" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          
          {/* Left Column: Direct channels */}
          <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-white mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-brand-primary" />
                Direct Communication
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-medium mb-8">
                Have an upcoming video project, an open creative role, or want to discuss motion graphics designs? Reach out directly or fill out the form.
              </p>

              {/* Channels Grid */}
              <div className="space-y-4">
                {directChannels.map((chan, idx) => (
                  <a
                    key={idx}
                    href={chan.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 transition-all duration-300 ${chan.color} hover:bg-zinc-900 group`}
                  >
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {chan.icon}
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">{chan.name}</span>
                      <span className="text-sm font-bold text-zinc-300 truncate block mt-0.5">{chan.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Note Badge */}
            <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-start gap-3 mt-6">
              <AlertCircle className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
              <span className="text-xs text-zinc-400 font-medium leading-normal">
                Standard turnaround on freelance inquiries is within <strong>12-24 hours</strong>. Open to contract & remote hiring.
              </span>
            </div>
          </div>

          {/* Right Column: Contact form with validations */}
          <div className="md:col-span-3">
            <div className="glassmorphism rounded-3xl p-8 border border-zinc-800/80 shadow-lg relative">
              
              {/* Confetti celebration container overlay on success */}
              {submitSuccess && (
                <div className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                  <CheckCircle2 className="h-16 w-16 text-emerald-400 fill-emerald-500/10 mb-4 animate-bounce" />
                  <h4 className="font-display font-extrabold text-2xl text-white mb-2">Message Dispatched!</h4>
                  <p className="text-sm text-zinc-400 font-medium max-w-sm leading-relaxed">
                    Thank you for reaching out. Your proposal has cleared successfully, and I will be in contact shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form fields layout grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-white font-medium focus:outline-none transition-colors ${
                        errors.name 
                          ? "border-red-500/50 focus:border-red-500" 
                          : "border-zinc-800/85 focus:border-brand-primary"
                      }`}
                      placeholder="e.g. Liam Chen"
                    />
                    {errors.name && <span className="text-[10px] text-red-400 font-semibold mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-white font-medium focus:outline-none transition-colors ${
                        errors.email 
                          ? "border-red-500/50 focus:border-red-500" 
                          : "border-zinc-800/85 focus:border-brand-primary"
                      }`}
                      placeholder="e.g. liam@company.com"
                    />
                    {errors.email && <span className="text-[10px] text-red-400 font-semibold mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Project Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800/85 focus:border-brand-primary text-sm text-zinc-300 font-medium focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Freelance Project">Freelance Video Edit / Project Proposal</option>
                    <option value="Full-time Hiring">Full-Time Career Opportunities</option>
                    <option value="Collaboration">Motion Graphic Collaborations</option>
                    <option value="Just Saying Hi">General Consultation / Say Hi</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Message Proposal</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-white font-medium focus:outline-none transition-colors resize-none ${
                      errors.message 
                        ? "border-red-500/50 focus:border-red-500" 
                        : "border-zinc-800/85 focus:border-brand-primary"
                    }`}
                    placeholder="Describe your creative vision, timelines, and budget expectations..."
                  />
                  {errors.message && <span className="text-[10px] text-red-400 font-semibold mt-1 block">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary disabled:from-zinc-850 disabled:to-zinc-850 text-white font-bold text-sm shadow-lg shadow-brand-primary/20 hover:brightness-110 cursor-pointer disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                      Dispatched queue loading...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Dispatch Proposal
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
