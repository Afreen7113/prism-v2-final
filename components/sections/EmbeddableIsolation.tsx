import React from 'react';
import { ShieldCheck, Check, LayoutDashboard, Users, Settings, BarChart3, ArrowUpRight, CheckCircle2, Bell } from 'lucide-react';

const lightTokens = {
  "--color-bg-base": "#F8FAFC",
  "--color-bg-surface": "#FFFFFF",
  "--color-bg-elevated": "#F1F5F9",
  "--color-text-primary": "#0F172A",
  "--color-text-secondary": "#64748B",
  "--color-text-muted": "#94A3B8",
  "--color-border-subtle": "#E2E8F0",
  "--color-border-default": "#CBD5E1",
  "--color-brand": "#0EA5E9",
  "--color-accent": "#38BDF8",
  "--color-success": "#10B981"
} as React.CSSProperties;

const darkTokens = {
  "--color-bg-base": "#0B1121",
  "--color-bg-surface": "#0F172A",
  "--color-bg-elevated": "#1E293B",
  "--color-text-primary": "#F8FAFC",
  "--color-text-secondary": "#94A3B8",
  "--color-text-muted": "#64748B",
  "--color-border-subtle": "#1E293B",
  "--color-border-default": "#334155",
  "--color-brand": "#F59E0B",
  "--color-accent": "#FCD34D",
  "--color-success": "#10B981"
} as React.CSSProperties;

const isolatedTokens = {
  "--color-bg-base": "#FFFFFF",
  "--color-bg-surface": "#FFFFFF",
  "--color-bg-elevated": "#F9FAFB",
  "--color-text-primary": "#111827",
  "--color-text-secondary": "#6B7280",
  "--color-text-muted": "#9CA3AF",
  "--color-border-subtle": "#E5E7EB",
  "--color-border-default": "#D1D5DB",
  "--color-brand": "#6366F1",
  "--color-accent": "#818CF8",
  "--color-success": "#059669"
} as React.CSSProperties;

const PrismChart = () => (
  <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 shadow-sm font-sans w-full max-w-[340px] shrink-0 h-[220px] flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-sm font-bold text-text-primary mb-1 leading-tight">Revenue Analytics</h4>
        <p className="text-[11px] text-text-secondary leading-tight">Monthly recurring revenue (MRR)</p>
      </div>
      <div className="text-[11px] font-bold text-success bg-success/10 border border-success/20 px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
        <ArrowUpRight className="w-3 h-3" />
        14.2%
      </div>
    </div>
    
    <div className="flex items-end gap-[4px] h-28 w-full mt-auto">
      {[40, 55, 35, 70, 60, 85, 100, 75, 90].map((h, i) => (
        <div 
          key={i} 
          className="flex-1 bg-brand rounded-t-sm hover:opacity-80 transition-opacity" 
          style={{ height: `${h}%` }} 
        />
      ))}
    </div>
  </div>
);

export default function EmbeddableIsolation() {
  return (
    <section id="embeddable-isolation" className="relative py-24 md:py-32 overflow-hidden bg-bg-surface border-b border-border-subtle">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4" />
            Embeddable Component Isolation
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[900] tracking-tight leading-[1.1] text-text-brand mb-6">
            <span className="block">One chart component.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent block mt-2">Any SaaS application.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary font-medium max-w-2xl mx-auto">
            Embed Prism analytics into products with completely different visual systems while preserving component integrity, styling isolation, and functionality.
          </p>
        </div>

        {/* Visual Proof Layer (Connector) */}
        <div className="relative mb-8 hidden md:block">
          <div className="absolute top-1/2 left-[25%] right-[25%] h-px border-t-2 border-dashed border-border-default/60 -z-10" />
          <div className="absolute top-1/2 left-[25%] w-px h-6 border-l-2 border-dashed border-border-default/60 -z-10" />
          <div className="absolute top-1/2 right-[25%] w-px h-6 border-r-2 border-dashed border-border-default/60 -z-10" />
          <div className="flex justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-bg-elevated text-text-primary border border-border-subtle shadow-sm text-[10px] font-[800] uppercase tracking-widest backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              Same Prism Component
            </div>
          </div>
        </div>

        {/* Subtle Proof Callout */}
        <div className="max-w-[1100px] mx-auto mb-6 flex justify-center">
          <div className="px-4 py-2 rounded-lg bg-bg-surface border border-border-subtle text-xs font-medium text-text-secondary shadow-sm text-center">
            The exact same PrismChart component is embedded into both applications below. Only the host application changes.
          </div>
        </div>

        {/* Main Demonstration Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6 max-w-[1100px] mx-auto">
          
          {/* Left Card: Light Host */}
          <div className="flex flex-col bg-bg-base border border-border-subtle rounded-[20px] overflow-hidden shadow-sm h-[420px]" style={lightTokens}>
            {/* Host Header */}
            <div className="px-5 h-14 border-b border-border-subtle bg-bg-surface flex justify-between items-center shrink-0">
              <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">Light Host</span>
              <span className="text-sm font-bold text-text-primary flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-brand" /> Acme CRM
              </span>
            </div>
            
            {/* Host Body */}
            <div className="flex flex-1 overflow-hidden bg-bg-base">
              {/* Sidebar */}
              <div className="w-48 hidden sm:flex flex-col gap-2 border-r border-border-subtle py-5 px-3 bg-bg-surface shrink-0">
                <div className="h-9 w-full bg-brand/10 text-brand font-bold flex items-center px-3 rounded-lg mb-4 text-sm">Acme Corp</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand/10 text-brand text-xs font-semibold cursor-pointer"><LayoutDashboard className="w-4 h-4" /> Dashboard</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium cursor-pointer"><Users className="w-4 h-4" /> Customers</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium cursor-pointer"><BarChart3 className="w-4 h-4" /> Reports</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium mt-auto cursor-pointer"><Settings className="w-4 h-4" /> Settings</div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col p-5 sm:p-6 bg-bg-base overflow-y-auto">
                {/* Host Nav Elements */}
                <div className="flex justify-between items-center mb-8 shrink-0">
                  <h3 className="text-lg font-bold text-text-primary">Overview</h3>
                  <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary cursor-pointer">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Fixed Embedded Component */}
                <div className="flex-1 flex items-start sm:items-center justify-center relative w-full pt-4 sm:pt-0">
                  <div className="relative w-full max-w-[340px]" style={isolatedTokens}>
                    <div className="absolute -top-3 -right-3 z-20 bg-brand/10 text-brand text-[9px] font-bold tracking-wider px-2 py-1 rounded border border-brand/20 uppercase shadow-sm whitespace-nowrap flex items-center gap-1 backdrop-blur-md">
                      <CheckCircle2 className="w-3 h-3" /> Same PrismChart Component
                    </div>
                    <PrismChart />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Dark Host */}
          <div className="flex flex-col bg-bg-base border border-border-subtle rounded-[20px] overflow-hidden shadow-card h-[420px]" style={darkTokens}>
            {/* Host Header */}
            <div className="px-5 h-14 border-b border-border-subtle bg-bg-surface flex justify-between items-center shrink-0">
              <span className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">Dark Host</span>
              <span className="text-sm font-bold text-text-primary flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-brand" /> Vault Finance
              </span>
            </div>
            
            {/* Host Body */}
            <div className="flex flex-1 overflow-hidden bg-bg-base">
              {/* Finance Sidebar */}
              <div className="w-48 hidden sm:flex flex-col gap-2 border-r border-border-subtle py-5 px-3 bg-bg-surface shrink-0">
                <div className="h-9 w-full bg-brand/10 text-brand font-bold flex items-center px-3 rounded-lg mb-4 text-sm">Vault Finance</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium cursor-pointer"><LayoutDashboard className="w-4 h-4" /> Portfolio</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium cursor-pointer"><Users className="w-4 h-4" /> Transactions</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand/10 text-brand text-xs font-semibold cursor-pointer"><BarChart3 className="w-4 h-4" /> Analytics</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium cursor-pointer"><ShieldCheck className="w-4 h-4" /> Risk</div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary text-xs font-medium mt-auto cursor-pointer"><Settings className="w-4 h-4" /> Compliance</div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col p-5 sm:p-6 bg-bg-base overflow-y-auto">
                {/* Host Nav Elements */}
                <div className="flex justify-between items-center mb-8 shrink-0">
                  <h3 className="text-lg font-bold text-text-primary">Analytics</h3>
                  <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary cursor-pointer">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Fixed Embedded Component */}
                <div className="flex-1 flex items-start sm:items-center justify-center relative w-full pt-4 sm:pt-0">
                  <div className="relative w-full max-w-[340px]" style={isolatedTokens}>
                    <div className="absolute -top-3 -right-3 z-20 bg-brand/10 text-brand text-[9px] font-bold tracking-wider px-2 py-1 rounded border border-brand/20 uppercase shadow-sm whitespace-nowrap flex items-center gap-1 backdrop-blur-md">
                      <CheckCircle2 className="w-3 h-3" /> Same PrismChart Component
                    </div>
                    <PrismChart />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Explicit Isolation Proof Footer */}
        <div className="max-w-[1000px] mx-auto mt-2 mb-12 flex justify-center">
          <p className="text-[13px] text-text-secondary text-center font-medium">
            Host styles, navigation systems, and branding do not affect Prism component rendering.
          </p>
        </div>

        {/* Engineering Proof Card */}
        <div className="max-w-[900px] mx-auto bg-bg-surface border border-border-subtle rounded-[20px] p-5 md:p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-border-subtle/60">
           {/* Metric 1 */}
           <div className="flex flex-col items-center justify-center flex-1 w-full py-2 md:py-0">
             <div className="text-3xl md:text-4xl font-[900] text-text-primary mb-1 tracking-tight leading-none">1</div>
             <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-secondary text-center">Component Source</div>
           </div>
           {/* Metric 2 */}
           <div className="flex flex-col items-center justify-center flex-1 w-full py-2 md:py-0">
             <div className="text-3xl md:text-4xl font-[900] text-text-primary mb-1 tracking-tight leading-none">2</div>
             <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-secondary text-center">Host Applications</div>
           </div>
           {/* Metric 3 */}
           <div className="flex flex-col items-center justify-center flex-1 w-full py-2 md:py-0">
             <div className="text-3xl md:text-4xl font-[900] text-text-primary mb-1 tracking-tight leading-none">0</div>
             <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-secondary text-center">Component Rewrites</div>
           </div>
           {/* Metric 4 */}
           <div className="flex flex-col items-center justify-center flex-1 w-full py-2 md:py-0">
             <div className="text-3xl md:text-4xl font-[900] text-text-primary mb-1 tracking-tight leading-none">0</div>
             <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-secondary text-center">CSS Conflicts</div>
           </div>
           {/* Metric 5 */}
           <div className="flex flex-col items-center justify-center flex-1 w-full py-2 md:py-0">
             <div className="text-3xl md:text-4xl font-[900] mb-1 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">100%</div>
             <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-text-secondary text-center">Host Isolation</div>
           </div>
        </div>

        {/* Technical Validation Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-[800px] mx-auto">
          {[
            "Same Component Instance", 
            "Host-Agnostic Rendering", 
            "Scoped Styling", 
            "Theme Safe", 
            "No CSS Leakage", 
            "Production Ready"
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-text-secondary">
              <Check className="w-3.5 h-3.5 text-success" />
              {badge}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
