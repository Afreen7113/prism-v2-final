"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-base py-16 px-8 relative z-10 overflow-hidden text-left border-t border-border-subtle">
      
      {/* Decorative top gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-tertiary/50 via-transparent mb-16 max-w-7xl mx-auto" />

      {/* Huge background logo & text watermark with blue gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-12 w-full max-w-7xl px-8 select-none pointer-events-none z-0 opacity-[0.05]">
        <svg viewBox="0 0 100 100" className="w-[26vw] max-w-[300px] h-[26vw] max-h-[300px] shrink-0">
          <defs>
            <linearGradient id="footer-watermark-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
          <path d="M50 10 L15 75 L50 90 Z" fill="url(#footer-watermark-blue-grad)" />
          <path d="M50 10 L50 90 L85 75 Z" fill="url(#footer-watermark-blue-grad)" opacity="0.8" />
        </svg>
        <span className="text-[22vw] lg:text-[260px] font-black tracking-tighter uppercase font-sans leading-none bg-gradient-to-r from-brand to-tertiary bg-clip-text text-transparent">
          Prism
        </span>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        
        {/* Column 1 - Brand (col-span-2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-md">
                <defs>
                  <linearGradient id="footer-prism-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-accent)" />
                  </linearGradient>
                  <linearGradient id="footer-prism-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-accent)" />
                  </linearGradient>
                </defs>
                <path d="M50 10 L15 75 L50 90 Z" fill="url(#footer-prism-grad-1)" />
                <path d="M50 10 L50 90 L85 75 Z" fill="url(#footer-prism-grad-2)" />
                <path d="M50 10 L50 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="font-semibold text-text-brand text-lg tracking-tight">
              Prism
            </span>
          </Link>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
            The white-label analytics infrastructure for modern B2B SaaS. Built for developers, loved by designers.
          </p>
          
          {/* Social icons row */}
          <div className="flex gap-3 mt-2">
            {[
              {
                label: "Twitter",
                href: "#",
                path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
              },
              {
                label: "GitHub",
                href: "#",
                path: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 M9 18c-4.51 2-5-2-7-2"
              },
              {
                label: "LinkedIn",
                href: "#",
                path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
              },
              {
                label: "YouTube",
                href: "#",
                path: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z",
                isYoutube: true
              }
            ].map((social, i) => {
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "var(--color-white)" }}
                  className="w-9 h-9 bg-bg-base/5 border border-border-subtle flex items-center justify-center rounded-lg text-text-secondary transition-colors duration-300 focus:outline-none"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[18px] h-[18px]"
                  >
                    <path d={social.path} />
                    {social.isYoutube && (
                      <polygon points="10 15 15 12 10 9" fill="currentColor" />
                    )}
                  </svg>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Column 2 - Product */}
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-semibold text-slate-700 uppercase tracking-[0.15em]">
            Product
          </span>
          <div className="flex flex-col gap-3">
            {["Components", "Theme Engine", "Chart Builder", "Exports", "Changelog", "Pricing"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm text-text-secondary hover:text-text-brand transition-colors duration-200 w-fit"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 - Developers */}
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-semibold text-slate-700 uppercase tracking-[0.15em]">
            Developers
          </span>
          <div className="flex flex-col gap-3">
            {["Documentation", "React SDK", "REST API", "Storybook", "Code Examples", "System Status"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm text-text-secondary hover:text-text-brand transition-colors duration-200 w-fit"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4 - Company */}
        <div className="flex flex-col gap-4">
          <span className="text-[12px] font-semibold text-slate-700 uppercase tracking-[0.15em]">
            Company
          </span>
          <div className="flex flex-col gap-3">
            {["About", "Customers", "Careers", "Press Kit", "Contact", "Blog"].map((link) => {
              const isCareers = link === "Careers";
              return (
                <div key={link} className="flex items-center">
                  <Link
                    href="#"
                    className="text-sm text-text-secondary hover:text-text-brand transition-colors duration-200 w-fit"
                  >
                    {link}
                  </Link>
                  {isCareers && (
                    <span className="bg-brand/15 text-brand text-[10px] py-0.5 px-2 rounded-full font-medium ml-2 select-none border border-brand/10">
                      We&apos;re hiring!
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left - Copyright */}
        <span className="text-xs sm:text-sm text-slate-700">
          &copy; {currentYear} Prism Analytics, Inc.
        </span>

        {/* Center - Compliance Badges */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {[
            { text: "SOC 2 Type II" },
            { text: "HIPAA Ready" },
            { text: "GDPR Compliant" },
          ].map((badge, i) => (
            <div
              key={i}
              className="bg-bg-elevated/40 border border-border-subtle px-3 py-1.5 rounded-full flex items-center gap-2 select-none shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-status-success fill-success/20" />
              <span className="text-[11px] font-medium text-slate-700">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Right - Legal Links */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
          <Link href="#" className="hover:text-text-brand transition-colors">Privacy</Link>
          <span>&middot;</span>
          <Link href="#" className="hover:text-text-brand transition-colors">Terms</Link>
          <span>&middot;</span>
          <Link href="#" className="hover:text-text-brand transition-colors">Security</Link>
        </div>

      </div>

      {/* Bottom decorative radial gradient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[radial-gradient(circle,var(--prism-primary-glow)_0%,transparent_70%)] opacity-25 pointer-events-none blur-[100px] z-0" />

    </footer>
  );
}

