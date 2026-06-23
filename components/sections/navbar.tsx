"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Product", href: "/#product" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Documentation", href: "/#docs" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Storybook", href: "/storybook" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-surface border-b border-border-subtle shadow-sm backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-[0_0_8px_var(--semantic-primary-glow)]">
                <defs>
                  <linearGradient id="prism-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-accent)" />
                  </linearGradient>
                  <linearGradient id="prism-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-primary)" />
                  </linearGradient>
                </defs>
                {/* Front Left Facet */}
                <path d="M50 10 L15 75 L50 90 Z" fill="url(#prism-grad-1)" />
                {/* Front Right Facet */}
                <path d="M50 10 L50 90 L85 75 Z" fill="url(#prism-grad-2)" />
                {/* Center Ridge Highlight */}
                <path d="M50 10 L50 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
              </svg>
            </motion.div>
            <span className="font-semibold text-text-primary text-lg tracking-tight bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text group-hover:text-text-primary transition-colors duration-300">
              Prism
            </span>
          </Link>

          {/* Center - Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 flex items-center gap-1"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span>{item.name}</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === idx ? 1 : 0 }}
                  transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-tertiary to-secondary origin-left"
                />
              </Link>
            ))}
          </nav>

          {/* Right - Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Admin Portal Button */}
            <Link
              href="/admin"
              className="flex items-center gap-2 bg-primary text-text-on-primary px-5 py-2 rounded-lg"
            >
              <LayoutDashboard size={16} />
              Admin Portal
            </Link>
            <Link
              href="/admin"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              Log in
            </Link>
            <Link
              href="#book-demo"
              className="group relative inline-flex items-center justify-center px-7 py-2 text-sm font-medium text-text-on-primary rounded-lg bg-gradient-to-r from-primary to-tertiary transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              style={{
                boxShadow: "var(--shadow-glow-primary)",
              }}
            >
              {/* Soft Pulsing Ambient Glow Background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />
              Book a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
  className="flex md:hidden p-2 text-text-secondary hover:text-text-primary focus:outline-none"
>
  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-bg-surface/95 backdrop-blur-20px border-b border-border-subtle p-6 flex flex-col gap-5"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <hr className="border-border-subtle" />
            <div className="flex flex-col gap-4">
              {/* Admin Portal Mobile Button */}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 bg-primary text-text-on-primary px-5 py-2 rounded-lg"
              >
                <LayoutDashboard size={16} />
                Admin Portal
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-medium text-text-secondary hover:text-text-primary py-2 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="#book-demo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-text-on-primary rounded-lg bg-gradient-to-r from-primary to-tertiary"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
