import React from "react";
import { ArrowUp, Mail } from "lucide-react";

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900/60 bg-zinc-950/40 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright info */}
        <div className="text-center md:text-left order-2 md:order-1">
          <span className="font-display font-bold text-sm tracking-tight text-white block">SATENDRA PATEL</span>
          <span className="text-xs text-zinc-500 font-medium block mt-1">
            &copy; {currentYear} Satendra Patel. All rights reserved. Recruiter portfolio layout.
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="ml-2 text-zinc-650 hover:text-brand-primary font-bold transition-colors cursor-pointer inline-flex items-center gap-0.5"
              >
                • Admin Access
              </button>
            )}
          </span>
        </div>

        {/* Social channels */}
        <div className="flex items-center gap-4 order-1 md:order-2">
          <a
            href="mailto:satendrapatel270@gmail.com"
            className="p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Email Direct"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/satendra-patel"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="LinkedIn Profile"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="https://github.com/satendra-patel"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="GitHub Profile"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="Instagram Profile"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={handleBackToTop}
          className="p-3 rounded-xl bg-zinc-900/80 hover:bg-white text-zinc-400 hover:text-zinc-950 border border-zinc-800/85 hover:border-white transition-all cursor-pointer shadow-md group order-3"
          title="Back to Top"
        >
          <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
