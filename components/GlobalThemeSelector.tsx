"use client";

import React, { useState } from "react";
import { Sliders, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, AVAILABLE_PRESETS } from "@/providers/ThemeProvider";

export default function GlobalThemeSelector() {
  const [open, setOpen] = useState(false);
  const { activePreset, applyPreset } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 bg-bg-surface/90 glass border border-border-subtle p-4 rounded-2xl w-60 shadow-card flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <span className="text-[10px] uppercase font-bold text-text-brand flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand" /> Global Theme Sandbox
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {AVAILABLE_PRESETS.map((t) => {
                const isSelected = activePreset === t.id;
                return (
                  <button
                    aria-label="Open theme selector"
                    key={t.id}
                    onClick={() => applyPreset(t.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? "bg-brand/10 border-brand/30 text-text-on-primary shadow-md"
                        : "bg-bg-elevated border-transparent text-text-secondary hover:text-text-brand hover:bg-brand/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                      <span>{t.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand" />}
                  </button>
                );
              })}
            </div>
            <span className="text-[9px] text-text-muted leading-tight text-center mt-1">
              Select a theme to see the entire landing page morph in real-time.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-label="Open theme selector"
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-brand to-tertiary flex items-center justify-center text-text-brand shadow-md hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
      >
        <Sliders className="w-5 h-5" />
      </button>
    </div>
  );
}
