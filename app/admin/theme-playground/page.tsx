"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clipboard,
  Check,
  Eye,
  Download,
  Upload,
  Code,
  RotateCcw,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import PrismDashboard from "@/components/PrismDashboard";
import { useTheme, AVAILABLE_PRESETS } from "@/providers/ThemeProvider";

export default function ThemePlayground() {
  const {
    activePreset,
    primaryColor,
    surfaceColor,
    accentColor,
    font,
    radius,
    setTheme,
    applyPreset
  } = useTheme();

  const [cssCopied, setCssCopied] = useState(false);
  const [playgroundPulse, setPlaygroundPulse] = useState(false);

  useEffect(() => {
    setPlaygroundPulse(true);
    const timer = setTimeout(() => setPlaygroundPulse(false), 300);
    return () => clearTimeout(timer);
  }, [primaryColor, surfaceColor, accentColor, font, radius]);

  // Color Contrast Helper
  const getContrastColor = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    let r = 0, g = 0, b = 0;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex.charAt(0) + cleanHex.charAt(0), 16);
      g = parseInt(cleanHex.charAt(1) + cleanHex.charAt(1), 16);
      b = parseInt(cleanHex.charAt(2) + cleanHex.charAt(2), 16);
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.slice(0, 2), 16);
      g = parseInt(cleanHex.slice(2, 4), 16);
      b = parseInt(cleanHex.slice(4, 6), 16);
    }
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#0F172A" : "#FAFAFA";
  };

  const textContrast = getContrastColor(surfaceColor);
  const cardBg = textContrast === "#0F172A" ? "rgba(15, 23, 42, 0.04)" : "rgba(255, 255, 255, 0.03)";
  const primaryContrast = getContrastColor(primaryColor);

  const handlePrimaryChange = (val: string) => {
    setTheme({ primaryColor: val, activePreset: "custom" });
  };

  const handleSurfaceChange = (val: string) => {
    const tc = getContrastColor(val);
    const cb = tc === "#0F172A" ? "rgba(15, 23, 42, 0.04)" : "rgba(255, 255, 255, 0.03)";
    setTheme({ 
      surfaceColor: val, 
      bgColor: val,
      textPrimary: tc, 
      elevatedColor: cb, 
      activePreset: "custom" 
    });
  };

  const handleAccentChange = (val: string) => {
    setTheme({ accentColor: val, activePreset: "custom" });
  };

  const handleFontChange = (val: string) => {
    setTheme({ font: val, activePreset: "custom" });
  };

  const handleRadiusChange = (val: number) => {
    setTheme({ radius: val, activePreset: "custom" });
  };

  const copyCss = () => {
    const cssText = `/* CSS Design Token System - 3 Abstraction Layers */
:root {
  /* 1. Primitive Tokens */
  --prism-color-primary: ${primaryColor};
  --prism-color-accent: ${accentColor};
  --prism-color-surface: ${surfaceColor};
  --prism-radius-base: ${radius}px;
  --prism-font-base: '${font}', sans-serif;

  /* 2. Semantic Tokens */
  --prism-semantic-primary: var(--prism-color-primary);
  --prism-semantic-accent: var(--prism-color-accent);
  --prism-semantic-bg: var(--prism-color-surface);
  --prism-semantic-text-brand: ${textContrast};
  --prism-semantic-text-secondary: ${textContrast === "#FAFAFA" ? "var(--color-border-default)" : "#475569"};
  --prism-semantic-border: ${textContrast === "#FAFAFA" ? "rgba(250,250,250,0.08)" : "rgba(15,23,42,0.08)"};
  --prism-semantic-radius: var(--prism-radius-base);

  /* 3. Component Tokens */
  --prism-dashboard-bg: var(--prism-semantic-bg);
  --prism-dashboard-text: var(--prism-semantic-text-brand);
  --prism-dashboard-text-secondary: var(--prism-semantic-text-secondary);
  --prism-dashboard-border: var(--prism-semantic-border);
  --prism-sidebar-bg: ${textContrast === "#FAFAFA" ? "rgba(0,0,0,0.15)" : "rgba(15,23,42,0.03)"};
  --prism-card-bg: ${cardBg};
  --prism-card-radius: var(--prism-semantic-radius);
  --prism-button-bg: var(--prism-semantic-primary);
  --prism-button-text: ${primaryContrast};
  --prism-chart-primary: var(--prism-semantic-primary);
  --prism-chart-accent: var(--prism-semantic-accent);
}`;
    navigator.clipboard.writeText(cssText);
    setCssCopied(true);
    setTimeout(() => setCssCopied(false), 2000);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="playground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"
      >
        <div className="xl:col-span-12">
          <h1 className="text-3xl font-bold tracking-tight text-text-brand">White-Label Theme Playground</h1>
          <p className="text-sm text-text-secondary mt-1">
            Prism adapts dynamically to any client dashboard. Customize 3-layer CSS Design Tokens, test presets, and copy integration custom properties.
          </p>
        </div>

        {/* Left: Playground Controls */}
        <div className="xl:col-span-5 flex flex-col gap-6 bg-bg-surface/50 border border-border-subtle p-6 rounded-[24px] shadow-card">
          {/* Preset Selector */}
          <div>
            <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5">
              1. Visual Presets (White-Label Demos)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {AVAILABLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all border ${
                    activePreset === p.id
                      ? "bg-brand/20 text-brand border-brand"
                      : "bg-bg-elevated/50 border-border-subtle hover:bg-bg-elevated text-text-secondary"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Token Level 1: Primitives */}
          <div className="border-t border-border-subtle pt-4">
            <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
              2. Layer 1: Primitive Tokens (Base Variables)
            </span>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Primary Color */}
              <div className="flex flex-col gap-1 items-center bg-bg-elevated/60 p-2.5 rounded-xl border border-border-subtle">
                <label className="cursor-pointer relative flex items-center justify-center">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handlePrimaryChange(e.target.value)}
                    className="absolute opacity-0 w-8 h-8 cursor-pointer"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-border-subtle shadow-inner cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  />
                </label>
                <span className="text-[10px] font-semibold text-text-brand mt-1">Primary</span>
                <span className="text-[9px] font-mono text-text-muted uppercase leading-none">{primaryColor}</span>
              </div>

              {/* Surface Color */}
              <div className="flex flex-col gap-1 items-center bg-bg-elevated/60 p-2.5 rounded-xl border border-border-subtle">
                <label className="cursor-pointer relative flex items-center justify-center">
                  <input
                    type="color"
                    value={surfaceColor}
                    onChange={(e) => handleSurfaceChange(e.target.value)}
                    className="absolute opacity-0 w-8 h-8 cursor-pointer"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-border-subtle shadow-inner cursor-pointer"
                    style={{ backgroundColor: surfaceColor }}
                  />
                </label>
                <span className="text-[10px] font-semibold text-text-brand mt-1">Surface</span>
                <span className="text-[9px] font-mono text-text-muted uppercase leading-none">{surfaceColor}</span>
              </div>

              {/* Accent Color */}
              <div className="flex flex-col gap-1 items-center bg-bg-elevated/60 p-2.5 rounded-xl border border-border-subtle">
                <label className="cursor-pointer relative flex items-center justify-center">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => handleAccentChange(e.target.value)}
                    className="absolute opacity-0 w-8 h-8 cursor-pointer"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-border-subtle shadow-inner cursor-pointer"
                    style={{ backgroundColor: accentColor }}
                  />
                </label>
                <span className="text-[10px] font-semibold text-text-brand mt-1">Accent</span>
                <span className="text-[9px] font-mono text-text-muted uppercase leading-none">{accentColor}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Font Primitive */}
              <div>
                <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Font family</label>
                <select
                  value={font}
                  onChange={(e) => handleFontChange(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle p-2 rounded-lg text-xs text-text-brand focus:outline-none"
                >
                  <option value="Geist">Geist</option>
                  <option value="Inter">Inter (SaaS Std)</option>
                  <option value="Sora">Sora (Modern/Fintech)</option>
                  <option value="DM Sans">DM Sans (Consumer)</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                </select>
              </div>

              {/* Radius Primitive */}
              <div>
                <label className="block text-[9px] font-bold text-text-secondary uppercase mb-1">Border Radius</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={radius}
                    onChange={(e) => handleRadiusChange(Number(e.target.value))}
                    className="flex-1 accent-primary bg-bg-elevated/80 h-1.5 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-semibold font-mono text-text-brand min-w-[28px] text-right">{radius}px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Token Level 2 & 3: Semantics & Component Mappings */}
          <div className="border-t border-border-subtle pt-4">
            <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2.5">
              3. Semantic & Component Token Resolutions
            </span>
            <div className="flex flex-col gap-2 bg-bg-elevated/40 p-3.5 rounded-xl border border-border-subtle text-[11px] leading-relaxed">
              <div className="flex justify-between items-center border-b border-border-subtle pb-1.5">
                <span className="text-text-secondary font-semibold font-mono">--prism-semantic-bg</span>
                <span className="text-text-brand font-mono uppercase text-[10px]" style={{ color: surfaceColor }}>{surfaceColor}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-subtle pb-1.5">
                <span className="text-text-secondary font-semibold font-mono">--prism-semantic-text-brand</span>
                <span className="text-text-brand font-mono uppercase text-[10px]" style={{ color: textContrast }}>{textContrast}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-subtle pb-1.5">
                <span className="text-text-secondary font-semibold font-mono">--prism-card-radius</span>
                <span className="text-text-brand font-mono text-[10px]">{radius}px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary font-semibold font-mono">--prism-button-bg</span>
                <span className="text-text-brand font-mono uppercase text-[10px]" style={{ color: primaryColor }}>{primaryColor}</span>
              </div>
            </div>
          </div>

          {/* Theme Operations */}
          <div className="pt-4 border-t border-border-subtle space-y-4">
            <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">
              Theme Operations
            </span>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" size="sm" onClick={copyCss} className="w-full justify-start text-xs font-normal bg-bg-elevated/40">
                {cssCopied ? <Check className="w-3.5 h-3.5 mr-2 text-status-success" /> : <Clipboard className="w-3.5 h-3.5 mr-2 text-text-muted" />}
                {cssCopied ? "Copied Variables" : "Copy CSS Variables"}
              </Button>
              <Button variant="secondary" size="sm" onClick={copyCss} className="w-full justify-start text-xs font-normal bg-bg-elevated/40">
                <Code className="w-3.5 h-3.5 mr-2 text-text-muted" /> Copy Tailwind Config
              </Button>
              <Button variant="secondary" size="sm" onClick={() => {}} className="w-full justify-start text-xs font-normal bg-bg-elevated/40">
                <Download className="w-3.5 h-3.5 mr-2 text-text-muted" /> Export Theme JSON
              </Button>
              <Button variant="secondary" size="sm" onClick={() => {}} className="w-full justify-start text-xs font-normal bg-bg-elevated/40">
                <Upload className="w-3.5 h-3.5 mr-2 text-text-muted" /> Import Theme JSON
              </Button>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => applyPreset('default')} className="flex-1 text-xs">
                <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
              </Button>
              <Button variant="primary" size="sm" onClick={() => {}} className="flex-1 text-xs">
                <Save className="w-3.5 h-3.5 mr-2" /> Save Preset
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Browser Sandbox */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-brand" /> Live white-label browser sandbox
            </span>
            <span className="text-xs text-text-secondary">
              Active: <span className="font-semibold text-text-brand capitalize">{activePreset} preset</span>
            </span>
          </div>

          <motion.div
            animate={playgroundPulse ? { scale: 1.01 } : { scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full bg-bg-surface border border-border-subtle rounded-[20px] shadow-card flex flex-col flex-1 h-fit min-h-[560px]"
          >
            {/* Browser chrome header */}
            <div className="bg-bg-elevated/80 border-b border-border-subtle px-4 py-3.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-error/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-status-warning/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-status-success/60" />
              </div>
              <div className="flex-1 max-w-[280px] mx-auto bg-bg-base/5 py-1 px-3 rounded text-[10px] text-text-muted font-mono text-center truncate select-all">
                https://client-portal.app/analytics
              </div>
            </div>

            {/* Dashboard Container */}
            <div className="p-4 bg-bg-base/[0.01] flex-1 flex flex-col h-full min-h-[500px]">
              <PrismDashboard
                title={activePreset === "healthcare" ? "Clinix EHR Portal" : activePreset === "fintech" ? "Apex Ledger" : activePreset === "consumer" ? "ShopSync Hub" : "Prism Dashboard"}
                chartMetric={activePreset === "healthcare" ? "Daily Admissions" : activePreset === "fintech" ? "Ledger Volume" : activePreset === "consumer" ? "Gross Orders" : "API requests"}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}


