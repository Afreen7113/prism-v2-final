"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutDashboard, Users, CreditCard, Settings, ChevronRight, Activity, Bell, Search } from "lucide-react";
import { AVAILABLE_PRESETS } from "@/providers/ThemeProvider";
import Link from "next/link";
import { useState, useEffect } from "react";
import RevealText from "@/components/ui/RevealText";

type ShowcaseTheme = {
  id: string;
  name: string;
  tokens: React.CSSProperties;
};

const showcaseThemes: ShowcaseTheme[] = [
  {
    id: "medical",
    name: "Medical",
    tokens: {
      "--color-primary": "#0284C7",
      "--color-accent": "#0F766E",
      "--color-bg-base": "#F8FAFC",
      "--color-bg-surface": "#FFFFFF",
      "--color-bg-elevated": "#F1F5F9",
      "--color-text-primary": "#0F172A",
      "--color-text-secondary": "#475569",
      "--color-text-muted": "#64748B",
      "--color-border-subtle": "#E2E8F0",
      "--color-border-default": "#CBD5E1",
      "--color-success": "#10B981",
      "--color-warning": "#F59E0B",
      "--semantic-text-on-primary": "#FFFFFF",
    } as React.CSSProperties,
  },
  {
    id: "fintech",
    name: "Fintech",
    tokens: {
      "--color-primary": "#059669",
      "--color-accent": "#EAB308",
      "--color-bg-base": "#0B0F19",
      "--color-bg-surface": "#111827",
      "--color-bg-elevated": "#1F2937",
      "--color-text-primary": "#F8FAFC",
      "--color-text-secondary": "#94A3B8",
      "--color-text-muted": "#64748B",
      "--color-border-subtle": "#1E293B",
      "--color-border-default": "#334155",
      "--color-success": "#10B981",
      "--color-warning": "#EAB308",
      "--semantic-text-on-primary": "#FFFFFF",
    } as React.CSSProperties,
  },
  {
    id: "retail",
    name: "Retail",
    tokens: {
      "--color-primary": "#1F2937",
      "--color-accent": "#D4A017",
      "--color-bg-base": "#F3F4F6",
      "--color-bg-surface": "#FFFFFF",
      "--color-bg-elevated": "#F9FAFB",
      "--color-text-primary": "#111827",
      "--color-text-secondary": "#4B5563",
      "--color-text-muted": "#9CA3AF",
      "--color-border-subtle": "#E5E7EB",
      "--color-border-default": "#D1D5DB",
      "--color-success": "#10B981",
      "--color-warning": "#F59E0B",
      "--semantic-text-on-primary": "#FFFFFF",
    } as React.CSSProperties,
  }
];

export default function Hero() {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Calculate dynamic additional presets count
  const hiddenPresetsCount = Math.max(0, AVAILABLE_PRESETS.length - showcaseThemes.length);

  // Auto-cycle themes
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveThemeIndex((prev) => (prev + 1) % showcaseThemes.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovering]);

  const activeTheme = showcaseThemes[activeThemeIndex];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-bg-base pt-24 pb-16 md:pt-28 md:pb-20 px-6 z-10">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-grid opacity-20 pointer-events-none" />

      {/* Glow Orbs */}
      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--prism-primary-glow)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />
      <motion.div
        animate={{
          x: [30, -30, 30],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--prism-border-glow)_0%,transparent_70%)] pointer-events-none blur-[100px] z-0"
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Content */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left xl:pr-8">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
            className="glass px-6 py-1.5 rounded-full text-[11px] font-semibold border border-brand/25 text-brand flex items-center gap-2 shadow-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span>WHITE-LABEL ANALYTICS INFRASTRUCTURE</span>
          </motion.div>

          {/* Heading */}
          <div className="text-[clamp(40px,5vw,64px)] font-bold tracking-tight text-text-brand mb-6 leading-[1.05] max-w-2xl">
            <RevealText
              text="Ship analytics under"
              tag="h1"
              trigger="mount"
              delay={0.1}
              className="text-text-brand font-bold block"
            />
            <RevealText
              text="your brand in hours."
              tag="span"
              trigger="mount"
              delay={0.3}
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] font-bold block mt-1"
            />
          </div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
            className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed mb-6"
          >
            Drop a React component. Pass a token file. Done. Prism renders inside your product, adapting to every customer brand without component rewrites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.32, 0.72, 0, 1] as const }}
            className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-text-muted mb-8 uppercase"
          >
            <span>One Platform</span>
            <span className="w-1 h-1 rounded-full bg-border-default" />
            <span>Infinite Brands</span>
          </motion.div>

          {/* CTA Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.32, 0.72, 0, 1] as const }}
            className="flex flex-wrap gap-4 items-center mb-4 w-full"
          >
            <Link
              href="#api"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 font-bold text-text-on-primary rounded-lg bg-brand shadow-xl shadow-brand/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/30 active:scale-[0.98] transition-all duration-300 overflow-hidden min-h-[52px]"
            >
              <motion.span
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3,
                  ease: "linear",
                  repeatDelay: 1.5,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
              />
              View the API
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#demo"
              className="glass group inline-flex items-center justify-center px-6 py-3.5 font-medium text-text-brand rounded-lg border border-border-subtle/50 hover:border-brand/30 hover:bg-brand/5 transition-all duration-300 min-h-[52px]"
            >
              See it in your brand
            </Link>
          </motion.div>

          {/* Supporting Microcopy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
            className="text-xs font-medium text-text-secondary mt-1"
          >
            Drop a React component. Pass a token file. Done.
          </motion.div>
        </div>

        {/* Right Column - Large Dashboard Proof of Concept */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center w-full relative z-20 perspective-[2000px]">
          {/* Live Theme Preview Label */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-3"
          >
            LIVE BRAND THEME PREVIEW
          </motion.span>

          {/* Theme Selectors */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 mb-2 bg-bg-surface border border-border-subtle rounded-full p-1.5 shadow-sm"
          >
            {showcaseThemes.map((theme, index) => (
              <button
                key={theme.id}
                onClick={() => setActiveThemeIndex(index)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeThemeIndex === index 
                    ? "bg-brand text-white shadow-md scale-105" 
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                }`}
              >
                {theme.name}
              </button>
            ))}
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[10px] text-text-secondary mb-6 block"
          >
            + {hiddenPresetsCount} additional preset{hiddenPresetsCount !== 1 ? 's' : ''} available in Theme Playground
          </motion.span>

          {/* Scaled Dashboard Container wrapped in motion.div with inline tokens */}
          <motion.div
            animate={activeTheme.tokens as unknown as Record<string, string>}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full max-w-[580px] h-[420px] sm:h-[480px] rounded-lg border border-border-subtle shadow-sm flex overflow-hidden bg-bg-base font-sans transform-gpu hover:scale-[1.01] transition-transform duration-500"
          >
            {/* Sidebar */}
            <div className="w-[40px] md:w-[52px] h-full flex flex-col items-center py-3 border-r border-border-subtle bg-bg-surface shrink-0">
              <div className="w-5 h-5 rounded-md bg-brand flex items-center justify-center shadow-glow-primary mb-5 transition-colors duration-500">
                <Activity className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="p-1 rounded-md bg-brand/10 text-brand transition-colors duration-500">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                  <Settings className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-bg-base transition-colors duration-500">
              {/* Header */}
              <div className="h-10 px-3 md:px-5 border-b border-border-subtle flex items-center justify-between bg-bg-surface shrink-0 transition-colors duration-500">
                <div className="flex items-center gap-3">
                  <div className="relative hidden sm:block text-text-muted">
                    <Search className="w-3 h-3 absolute left-1.5 top-1/2 -translate-y-1/2" />
                    <input 
                      disabled
                      placeholder="Search..." 
                      className="pl-6 pr-2 py-0.5 rounded-sm bg-bg-elevated border border-border-subtle text-[10px] w-28 text-text-primary transition-colors duration-500"
                    />
                  </div>
                  <span className="sm:hidden font-semibold text-text-primary text-xs">Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-text-muted hover:text-text-primary cursor-pointer relative">
                    <Bell className="w-3.5 h-3.5" />
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-brand rounded-full border border-bg-surface transition-colors duration-500" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-accent text-bg-base flex items-center justify-center font-bold text-[9px] shadow-sm transition-colors duration-500">
                    {activeTheme.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-3 md:p-5 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-base font-bold text-text-primary transition-colors duration-500">Overview</h2>
                    <p className="text-[10px] text-text-secondary mt-0.5 transition-colors duration-500">Welcome back to your analytics.</p>
                  </div>
                  <div className="px-1.5 py-0.5 rounded-sm bg-bg-surface border border-border-subtle text-[10px] font-medium text-text-primary shadow-sm hidden sm:block transition-colors duration-500">
                    Last 30 Days <ChevronRight className="w-2.5 h-2.5 inline-block ml-0.5 opacity-50" />
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mb-3">
                  {/* KPI 1 */}
                  <div className="p-3 rounded-md border border-border-subtle bg-bg-surface shadow-sm transition-colors duration-500">
                    <span className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">Total Revenue</span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-text-primary transition-colors duration-500">$124,500</span>
                      <span className="text-[9px] font-bold text-status-success bg-status-success/10 px-1 py-0.5 rounded-sm transition-colors duration-500">+14.2%</span>
                    </div>
                  </div>
                  {/* KPI 2 */}
                  <div className="p-3 rounded-md border border-border-subtle bg-bg-surface shadow-sm transition-colors duration-500">
                    <span className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">Active Users</span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-text-primary transition-colors duration-500">45.2K</span>
                      <span className="text-[9px] font-bold text-status-success bg-status-success/10 px-1 py-0.5 rounded-sm transition-colors duration-500">+8.1%</span>
                    </div>
                  </div>
                  {/* KPI 3 */}
                  <div className="p-3 rounded-md border border-border-subtle bg-bg-surface shadow-sm hidden sm:block transition-colors duration-500">
                    <span className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">Avg Session</span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-text-primary transition-colors duration-500">4m 12s</span>
                      <span className="text-[9px] font-bold text-status-warning bg-status-warning/10 px-1 py-0.5 rounded-sm transition-colors duration-500">-1.2%</span>
                    </div>
                  </div>
                </div>

                {/* Big Chart Area */}
                <div className="p-3 rounded-md border border-border-subtle bg-bg-surface shadow-sm flex-1 min-h-[120px] md:min-h-[160px] flex flex-col transition-colors duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-text-primary transition-colors duration-500">User Growth</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand transition-colors duration-500" />
                        <span className="text-[9px] text-text-secondary transition-colors duration-500">Current</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent transition-colors duration-500" />
                        <span className="text-[9px] text-text-secondary transition-colors duration-500">Previous</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* SVG Chart Graphic */}
                  <div className="flex-1 w-full relative">
                    <svg viewBox="0 0 500 150" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        {/* Current Gradient */}
                        <linearGradient id="chartGradientBrand" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Lines */}
                      <path d="M 0 37.5 L 500 37.5" stroke="var(--color-border-subtle)" strokeWidth="1" strokeDasharray="4 4" className="transition-colors duration-500" />
                      <path d="M 0 75 L 500 75" stroke="var(--color-border-subtle)" strokeWidth="1" strokeDasharray="4 4" className="transition-colors duration-500" />
                      <path d="M 0 112.5 L 500 112.5" stroke="var(--color-border-subtle)" strokeWidth="1" strokeDasharray="4 4" className="transition-colors duration-500" />
                      
                      {/* Previous line (Accent) */}
                      <path 
                        d="M 0 120 Q 80 110 150 90 T 300 70 T 450 50 L 500 45" 
                        fill="none" 
                        stroke="var(--color-accent)" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeDasharray="4 4"
                        className="opacity-60 transition-colors duration-500"
                      />

                      {/* Current Fill & Line (Brand) */}
                      <path 
                        d="M 0 100 Q 100 80 200 60 T 350 40 T 500 15 L 500 150 L 0 150 Z" 
                        fill="url(#chartGradientBrand)" 
                      />
                      <path 
                        d="M 0 100 Q 100 80 200 60 T 350 40 T 500 15" 
                        fill="none" 
                        stroke="var(--color-primary)" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        className="transition-colors duration-500"
                      />
                      
                      {/* Data Point */}
                      <circle cx="350" cy="40" r="3" fill="var(--color-bg-surface)" stroke="var(--color-primary)" strokeWidth="1.5" className="transition-colors duration-500" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
