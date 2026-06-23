"use client";

import React from "react";

export default function StorybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* KPIs Header */}
      <div className="bg-bg-elevated border border-border-subtle rounded-xl py-3 px-6 flex items-center justify-between mb-2">
        <div className="flex gap-8">
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Components</div><div className="text-lg font-bold text-text-primary">42</div></div>
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Stories</div><div className="text-lg font-bold text-text-primary">128</div></div>
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Tokens</div><div className="text-lg font-bold text-text-primary">315</div></div>
          <div><div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Coverage</div><div className="text-lg font-bold text-status-success">100%</div></div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}
