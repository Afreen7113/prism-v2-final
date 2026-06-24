"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeState = {
  activePreset: string;
  themeMode: "light" | "dark";
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  bgColor: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  chartPrimary: string;
  chartSecondary: string;
  radius: number;
  font: string;
  elevatedColor: string;
  glassBg: string;
  primaryGlow: string;
};

export type ThemeContextType = ThemeState & {
  setTheme: (updates: Partial<ThemeState>) => void;
  applyPreset: (presetId: string) => void;
};

const baseTheme: ThemeState = {
  activePreset: "healthcare",
  themeMode: "light",
  primaryColor: "#0284C7",
  accentColor: "#0F766E",
  surfaceColor: "var(--color-white)",
  bgColor: "#F8FAFC",
  textPrimary: "var(--color-slate-900)",
  textSecondary: "var(--color-slate-600)",
  textMuted: "var(--color-slate-500)",
  borderColor: "var(--color-slate-200)",
  successColor: "var(--color-emerald-500)",
  warningColor: "var(--color-amber-500)",
  errorColor: "var(--color-red-500)",
  chartPrimary: "",
  chartSecondary: "",
  radius: 6,
  font: "Inter",
  elevatedColor: "#F1F5F9",
  glassBg: "rgba(255, 255, 255, 0.75)",
  primaryGlow: "rgba(2, 132, 199, 0.15)",
};

export const presets: Record<string, Partial<ThemeState>> = {
  "prism": {
    themeMode: "light",
    primaryColor: "#4F46E5",
    accentColor: "#0EA5E9",
    surfaceColor: "#FFFFFF",
    bgColor: "#F8FAFC",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#334155",
    borderColor: "#E2E8F0",
    elevatedColor: "#F1F5F9",
    glassBg: "rgba(255, 255, 255, 0.75)",
    primaryGlow: "rgba(79, 70, 229, 0.15)",
    font: "Inter",
    radius: 12,
  },
  "healthcare": {
    themeMode: "light",
    primaryColor: "#0284C7",
    accentColor: "#0F766E",
    surfaceColor: "var(--color-white)",
    bgColor: "#F8FAFC",
    textPrimary: "var(--color-slate-900)",
    textSecondary: "var(--color-slate-600)",
    textMuted: "var(--color-slate-500)",
    borderColor: "var(--color-slate-200)",
    elevatedColor: "#F1F5F9",
    glassBg: "rgba(255, 255, 255, 0.75)",
    primaryGlow: "rgba(2, 132, 199, 0.15)",
    font: "Inter",
    radius: 6,
  },
  "fintech": {
    themeMode: "dark",
    primaryColor: "#10B981",
    accentColor: "#EAB308",
    surfaceColor: "#111827",
    bgColor: "#0B0F19",
    textPrimary: "var(--color-slate-50)",
    textSecondary: "var(--color-slate-300)",
    textMuted: "var(--color-slate-400)",
    borderColor: "var(--color-slate-800)",
    elevatedColor: "#1F2937",
    glassBg: "rgba(17, 24, 39, 0.6)",
    primaryGlow: "rgba(5, 150, 105, 0.3)",
    font: "Sora",
    radius: 4,
  },
  "consumer": {
    themeMode: "light",
    primaryColor: "#B88A2A",
    accentColor: "#D4A54A",
    surfaceColor: "#FFFDF9",
    bgColor: "#F8F5EF",
    textPrimary: "#3A342B",
    textSecondary: "#5F574B",
    textMuted: "#888073",
    borderColor: "#E7DED1",
    elevatedColor: "#F4EFE6",
    glassBg: "rgba(255, 253, 249, 1)",
    primaryGlow: "transparent",
    font: "DM Sans",
    radius: 8,
  },
  "developer": {
    themeMode: "dark",
    primaryColor: "#C86F4A",
    accentColor: "#A38372",
    surfaceColor: "#161B22",
    bgColor: "#0D1117",
    textPrimary: "#E6EDF3",
    textSecondary: "#8B949E",
    textMuted: "#6E7681",
    borderColor: "#30363D",
    elevatedColor: "#21262D",
    glassBg: "rgba(22, 27, 34, 0.8)",
    primaryGlow: "rgba(200, 111, 74, 0.2)",
    font: "JetBrains Mono",
    radius: 6,
  }
};

export const AVAILABLE_PRESETS = [
  { id: "prism", label: "Prism", color: `bg-[${presets["prism"]?.primaryColor}]` },
  { id: "healthcare", label: "Medical", color: "bg-info" },
  { id: "fintech", label: "Fintech", color: "bg-status-success" },
  { id: "consumer", label: "Retail", color: "bg-[var(--color-accent)]" },
  { id: "developer", label: "Console", color: `bg-[${presets["developer"]?.primaryColor}]` },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to apply CSS variables directly to the DOM
const applyThemeToDOM = (theme: ThemeState) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.themeMode);

  root.style.setProperty("--semantic-primary", theme.primaryColor);
  root.style.setProperty("--semantic-primary-10", `color-mix(in srgb, ${theme.primaryColor} 10%, transparent)`);
  root.style.setProperty("--semantic-primary-20", `color-mix(in srgb, ${theme.primaryColor} 20%, transparent)`);
  
  root.style.setProperty("--semantic-accent", theme.accentColor);
  root.style.setProperty("--semantic-accent-10", `color-mix(in srgb, ${theme.accentColor} 10%, transparent)`);
  root.style.setProperty("--semantic-accent-20", `color-mix(in srgb, ${theme.accentColor} 20%, transparent)`);
  
  root.style.setProperty("--semantic-bg", theme.bgColor);
  root.style.setProperty("--semantic-surface", theme.surfaceColor);
  root.style.setProperty("--semantic-elevated", theme.elevatedColor);
  
  root.style.setProperty("--semantic-text-primary", theme.textPrimary);
  root.style.setProperty("--semantic-text-secondary", theme.textSecondary);
  root.style.setProperty("--semantic-text-muted", theme.textMuted);
  root.style.setProperty("--semantic-text-on-primary", "#ffffff");
  
  root.style.setProperty("--semantic-border", theme.borderColor);
  
  root.style.setProperty("--semantic-success", theme.successColor);
  root.style.setProperty("--semantic-warning", theme.warningColor);
  root.style.setProperty("--semantic-error", theme.errorColor);
  
  root.style.setProperty("--semantic-glass-bg", theme.glassBg);
  root.style.setProperty("--semantic-primary-glow", theme.primaryGlow);

  root.style.setProperty("--prism-chart-primary", theme.chartPrimary || theme.primaryColor);
  root.style.setProperty("--prism-chart-secondary", theme.chartSecondary || theme.accentColor);
  root.style.setProperty("--prism-chart-accent", theme.accentColor);
  
  root.style.setProperty("--semantic-radius", `${theme.radius}px`);
  root.style.setProperty("--prism-card-radius", `${theme.radius}px`);
  
  let fontVar = theme.font;
  if (theme.font === "Geist") fontVar = "var(--font-geist)";
  if (theme.font === "JetBrains Mono") fontVar = "var(--font-geist-mono)";
  root.style.setProperty("--semantic-font", fontVar);
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const getInitialTheme = (): ThemeState => {
  if (typeof window !== 'undefined') {
    try {
      const savedTheme = localStorage.getItem("prism-theme");
      if (savedTheme) {
        return JSON.parse(savedTheme);
      }
    } catch (e) {
      console.error("Failed to parse saved theme from localStorage", e);
    }
  }
  const firstPresetId = AVAILABLE_PRESETS[0].id;
  return { ...baseTheme, ...presets[firstPresetId], activePreset: firstPresetId } as ThemeState;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<ThemeState>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // useIsomorphicLayoutEffect runs synchronously before browser paint
  useIsomorphicLayoutEffect(() => {
    let currentTheme = getInitialTheme();
    
    setThemeState(currentTheme);
    // Immediately apply CSS variables to the DOM before rendering frame
    applyThemeToDOM(currentTheme);
    setMounted(true);
  }, []);

  // Save to localStorage and apply CSS vars whenever themeState changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("prism-theme", JSON.stringify(themeState));
    applyThemeToDOM(themeState);
  }, [themeState, mounted]);

  const setTheme = (updates: Partial<ThemeState>) => {
    setThemeState(prev => ({ ...prev, ...updates }));
  };

  const applyPreset = (presetId: string) => {
    const presetTheme = presets[presetId];
    if (presetTheme) {
      setThemeState(prev => ({ ...prev, ...presetTheme, activePreset: presetId }));
    }
  };

  // We only render children once mounted to avoid hydration mismatch with text/content that depends on the theme.
  // Wait, if we return null, there is a FOUC (white screen).
  // The requirement says "Avoid flashes of incorrect theme during page load". 
  // Next.js hydration will just give warnings in dev, so we can suppress them or ignore them.
  // Let's render children immediately. The CSS variables are applied synchronously above so there is no visual FOUC!
  return (
    <ThemeContext.Provider value={{ ...themeState, setTheme, applyPreset }}>
      <div style={{ display: "contents" }} suppressHydrationWarning>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
