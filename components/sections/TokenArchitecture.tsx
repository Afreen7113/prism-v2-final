'use client';

import React, { type ReactNode, useState } from 'react';
import { ShieldCheck, CheckCircle2, Heart, DollarSign, ShoppingBag, Zap, ChevronDown, ChevronUp, Code2, ArrowRight, ArrowDown, Palette, Layers, LayoutDashboard } from 'lucide-react';
import PrismDashboard from '@/components/PrismDashboard';

interface BrandCard {
  icon: ReactNode;
  brand: string;
  badge: string;
  bg: string;
  text: string;
  primary: string;
  badgeClassName: string;
  dividerClassName: string;
  mutedClassName: string;
  kpis: { label: string; value: string }[];
  button: { label: string; className: string };
  visualization: ReactNode;
}

const brands: BrandCard[] = [
  {
    icon: <Heart className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
    brand: 'MedDash Analytics',
    badge: 'MEDICAL',
    bg: 'bg-gradient-to-br from-sky-50/50 to-white dark:from-sky-950/30 dark:to-bg-surface border-sky-200/50 dark:border-sky-800/40 hover:border-sky-400/60 dark:hover:border-sky-500/50',
    text: 'text-slate-900 dark:text-white',
    primary: 'var(--color-sky-600)',
    badgeClassName: 'bg-sky-100/80 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60',
    dividerClassName: 'border-sky-200/60 dark:border-sky-800/40',
    mutedClassName: 'text-sky-800 dark:text-sky-300',
    kpis: [
      { label: 'Admissions', value: '12,847' },
      { label: 'Avg Stay', value: '4.2 days' },
    ],
    button: {
      label: 'View Report',
      className: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm',
    },
    visualization: (
      <div className="w-full h-8">
        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible stroke-sky-500 fill-none stroke-[3]">
          <path d="M0,25 Q15,25 30,15 T60,20 T80,5 T100,0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    icon: <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    brand: 'Vault Finance',
    badge: 'FINTECH',
    bg: 'bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/30 dark:to-bg-surface border-amber-200/50 dark:border-amber-800/40 hover:border-amber-400/60 dark:hover:border-amber-500/50',
    text: 'text-slate-900 dark:text-white',
    primary: 'var(--color-amber-500)',
    badgeClassName: 'bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60',
    dividerClassName: 'border-amber-200/60 dark:border-amber-800/40',
    mutedClassName: 'text-amber-800 dark:text-amber-300',
    kpis: [
      { label: 'Portfolio', value: '$4.8M' },
      { label: 'ROI', value: '+23.5%' },
    ],
    button: {
      label: 'Trade Now',
      className: 'bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold shadow-sm',
    },
    visualization: (
      <div className="flex items-end gap-[2px] h-8 w-full justify-between">
        {[30, 45, 25, 60, 85, 50, 95, 70, 85].map((h, i) => (
           <div key={i} className="flex-1 bg-amber-500 rounded-t-[2px] transition-all hover:bg-amber-400" style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  },
  {
    icon: <ShoppingBag className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
    brand: 'Stitch Style',
    badge: 'CONSUMER',
    bg: 'bg-gradient-to-br from-orange-50/50 to-white dark:from-orange-950/30 dark:to-bg-surface border-orange-200/50 dark:border-orange-800/40 hover:border-orange-400/60 dark:hover:border-orange-500/50',
    text: 'text-slate-900 dark:text-white',
    primary: 'var(--color-orange-500)',
    badgeClassName: 'bg-orange-100/80 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/60',
    dividerClassName: 'border-orange-200/60 dark:border-orange-800/40',
    mutedClassName: 'text-orange-800 dark:text-orange-300',
    kpis: [
      { label: 'Orders', value: '1,247' },
      { label: 'Conversion', value: '3.4%' },
    ],
    button: {
      label: 'Shop Now',
      className: 'bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm',
    },
    visualization: (
      <div className="w-full h-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-b-md" />
        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible stroke-orange-500 fill-none stroke-[3] relative z-10">
          <path d="M0,25 L20,15 L40,20 L60,5 L80,10 L100,0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    icon: <Zap className="w-4 h-4 text-emerald-400" />,
    brand: 'DevOps Cloud',
    badge: 'DEVELOPER',
    bg: 'bg-[#0B1121] bg-gradient-to-br from-slate-900 to-[#0B1121] border-slate-800 shadow-card hover:border-emerald-500/50',
    text: 'text-white',
    primary: 'var(--color-emerald-500)',
    badgeClassName: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    dividerClassName: 'border-slate-800/80',
    mutedClassName: 'text-slate-400',
    kpis: [
      { label: 'Deploys', value: '4,521' },
      { label: 'Uptime', value: '99.99%' },
    ],
    button: {
      label: 'Deploy',
      className: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    },
    visualization: (
      <div className="grid grid-cols-6 gap-[2px] h-8 content-end w-full">
         {[...Array(12)].map((_, i) => (
           <div key={i} className={`h-[5px] rounded-[1px] ${[1, 5, 8, 10].includes(i) ? 'bg-emerald-500/20' : 'bg-emerald-500'}`} />
         ))}
      </div>
    )
  },
];

export default function TokenArchitecture() {
  const [showCode, setShowCode] = useState(false);

  return (
    <section id="white-label-architecture" className="relative py-24 md:py-32 overflow-hidden bg-bg-surface border-y border-border-subtle">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-subtle)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4" />
            White-Label Token Architecture
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-[72px] font-[900] tracking-tight leading-[1.1] text-center mb-6 w-full">
            <span className="text-text-brand">One platform. </span>
            <span className="gradient-text whitespace-nowrap block sm:inline">Every brand.</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-text-primary font-medium text-center mb-4">
            Same React component. Different design tokens. Zero component changes.
          </h3>
          <p className="text-base text-text-secondary font-medium max-w-[650px] mx-auto text-center">
            The same dashboard rendered under multiple brand presets using Prism&apos;s token architecture.
          </p>
        </div>

        <div className="flex flex-col gap-24">

          {/* Theme Preview Cards (Stacked Row 1A) */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1000px] w-full mx-auto">
              {brands.map((b, i) => (
                <div key={i} className={`p-6 rounded-[20px] border ${b.bg} flex flex-col justify-between shadow-sm relative overflow-hidden group transition-all duration-250 hover:opacity-[0.98] hover:shadow-card h-[220px] w-full max-w-[480px] mx-auto`}>
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/5 ring-1 ring-white/20 dark:ring-white/10 shrink-0">
                        {b.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[8px] font-[800] tracking-widest ${b.badgeClassName} px-2 py-0.5 rounded-full uppercase shadow-sm backdrop-blur-sm self-start mb-0.5 leading-none`}>{b.badge}</span>
                        <h4 className={`text-base font-[700] ${b.text} tracking-tight leading-none mt-0.5`}>{b.brand}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Card Body (KPIs) */}
                  <div className={`mt-5 pt-4 border-t ${b.dividerClassName} grid grid-cols-2 gap-4 relative z-10`}>
                    {b.kpis.map((kpi, j) => (
                      <div key={j}>
                        <div className={`text-[10px] uppercase font-bold tracking-wider ${b.mutedClassName} opacity-70 mb-1 leading-none`}>{kpi.label}</div>
                        <div className={`text-xl font-[800] ${b.text} leading-none mt-1`}>{kpi.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer (Viz + Button) */}
                  <div className="relative z-10 w-full mt-auto pt-4 flex items-end gap-4 justify-between">
                    <div className="w-[30%] shrink-0">
                      {b.visualization}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button className={`px-4 py-1.5 rounded-lg text-xs transition-colors ${b.button.className}`}>
                        {b.button.label}
                      </button>
                      <div className="text-[8px] font-mono uppercase tracking-widest text-slate-400/80">
                        Same Prism Component
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Architecture Pipeline (Stacked Row 1B) */}
          <div className="flex justify-center">
            <div className="w-full max-w-[900px] bg-bg-surface border border-border-subtle rounded-2xl p-8 shadow-sm">
              <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-text-primary mb-2">Architecture Pipeline</h3>
                <p className="text-sm text-text-secondary">
                  Cascading token mapping isolates logic from presentation.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                
                {/* Node 1 */}
                <div className="w-full md:w-1/4 bg-bg-elevated border border-border-subtle p-4 rounded-xl flex flex-col items-center text-center shadow-sm relative z-10 hover:border-text-muted transition-colors">
                  <div className="bg-sky-500/10 text-sky-500 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm mb-1">Primitive Tokens</h4>
                  <p className="text-[10px] text-text-secondary font-mono bg-text-primary/5 px-1.5 py-0.5 rounded">--color-sky-600</p>
                </div>
                
                {/* Arrow 1 */}
                <div className="hidden md:flex items-center justify-center w-8 z-0">
                  <ArrowRight className="w-6 h-6 text-brand/60 drop-shadow-[0_0_8px_rgba(2,132,199,0.3)]" />
                </div>
                <div className="md:hidden py-2">
                  <ArrowDown className="w-6 h-6 text-brand/60" />
                </div>

                {/* Node 2 */}
                <div className="w-full md:w-1/4 bg-bg-elevated border border-border-subtle p-4 rounded-xl flex flex-col items-center text-center shadow-sm relative z-10 hover:border-text-muted transition-colors">
                  <div className="bg-brand/10 text-brand w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm mb-1">Semantic Tokens</h4>
                  <p className="text-[10px] text-text-secondary font-mono bg-text-primary/5 px-1.5 py-0.5 rounded">--semantic-primary</p>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:flex items-center justify-center w-8 z-0">
                  <ArrowRight className="w-6 h-6 text-brand/80 drop-shadow-[0_0_8px_rgba(2,132,199,0.4)]" />
                </div>
                <div className="md:hidden py-2">
                  <ArrowDown className="w-6 h-6 text-brand/80" />
                </div>

                {/* Node 3 */}
                <div className="w-full md:w-1/4 bg-bg-elevated border border-border-subtle p-4 rounded-xl flex flex-col items-center text-center shadow-sm relative z-10 hover:border-text-muted transition-colors">
                  <div className="bg-emerald-500/10 text-emerald-500 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm mb-1">Component Tokens</h4>
                  <p className="text-[10px] text-text-secondary font-mono bg-text-primary/5 px-1.5 py-0.5 rounded">--btn-primary-bg</p>
                </div>

                {/* Arrow 3 */}
                <div className="hidden md:flex items-center justify-center w-8 z-0">
                  <ArrowRight className="w-6 h-6 text-brand drop-shadow-[0_0_12px_rgba(2,132,199,0.5)]" />
                </div>
                <div className="md:hidden py-2">
                  <ArrowDown className="w-6 h-6 text-brand" />
                </div>

                {/* Node 4 */}
                <div className="w-full md:w-1/4 bg-brand/5 border border-brand/30 p-4 rounded-xl flex flex-col items-center text-center shadow-sm relative z-10 ring-1 ring-brand/10">
                  <div className="bg-brand text-white w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-md shadow-brand/20">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-brand text-sm mb-1">Dashboard UI</h4>
                  <p className="text-[10px] text-brand/70 font-mono bg-brand/10 px-1.5 py-0.5 rounded">100% Adapted</p>
                </div>

              </div>
            </div>
          </div>

          {/* ROW 2: Same Dashboard Proof */}
          <div className="flex flex-col gap-8 items-center">
            
            <div className="flex flex-col items-center gap-3 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-widest shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Same Component / Different Tokens
              </div>
              <p className="text-lg font-semibold text-text-primary">
                These dashboard instances use identical React components and identical data.<br className="hidden sm:block"/> Only token values are changed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1200px] mx-auto">
              
              {/* Token Overrides - Left (Medical/Blue) */}
              <div 
                className="rounded-2xl overflow-hidden border border-slate-200 shadow-card bg-white flex flex-col h-full"
                style={{ 
                  "--color-brand": "#0284c7", 
                  "--color-bg-base": "#f0f9ff", 
                  "--color-bg-surface": "#ffffff",
                  "--color-bg-elevated": "#e0f2fe",
                  "--color-text-primary": "#0c4a6e", 
                  "--color-text-secondary": "#0369a1", 
                  "--color-border-subtle": "#bae6fd", 
                  "--prism-chart-primary": "#0284c7",
                } as React.CSSProperties}
              >
                <div className="bg-sky-600 px-5 py-3 flex items-center justify-between border-b border-sky-700 shrink-0">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Medical Theme</span>
                  <span className="text-[10px] font-mono text-sky-200">Token Set A</span>
                </div>
                <div className="flex-1 w-full bg-[#f0f9ff] p-4 lg:p-6 overflow-hidden">
                  <PrismDashboard 
                    theme="medical"
                    title="Platform Analytics" 
                    chartMetric="Active Users"
                    hideSidebar={true}
                    customData={[
                      { label: "Revenue", value: "$24,580", trend: "+12.5% ↑", isUp: true },
                      { label: "Active Users", value: "1,847", trend: "+8.2% ↑", isUp: true },
                      { label: "Conversion", value: "3.4%", trend: "-0.5% ↓", isUp: false },
                    ]}
                  />
                </div>
              </div>

              {/* Token Overrides - Right (Fintech/Green) */}
              <div 
                className="rounded-2xl overflow-hidden border border-emerald-800 shadow-card bg-emerald-950 flex flex-col h-full"
                style={{ 
                  "--color-brand": "#10b981", 
                  "--color-bg-base": "#022c22", 
                  "--color-bg-surface": "#064e3b", 
                  "--color-bg-elevated": "#065f46", 
                  "--color-text-primary": "#ecfdf5", 
                  "--color-text-secondary": "#6ee7b7", 
                  "--color-border-subtle": "#047857", 
                  "--prism-chart-primary": "#10b981",
                } as React.CSSProperties}
              >
                <div className="bg-emerald-500 px-5 py-3 flex items-center justify-between border-b border-emerald-600 shrink-0">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Fintech Theme</span>
                  <span className="text-[10px] font-mono text-emerald-900">Token Set B</span>
                </div>
                <div className="flex-1 w-full bg-[#022c22] p-4 lg:p-6 overflow-hidden">
                  <PrismDashboard 
                    theme="fintech"
                    title="Platform Analytics" 
                    chartMetric="Active Users"
                    hideSidebar={true}
                    customData={[
                      { label: "Revenue", value: "$24,580", trend: "+12.5% ↑", isUp: true },
                      { label: "Active Users", value: "1,847", trend: "+8.2% ↑", isUp: true },
                      { label: "Conversion", value: "3.4%", trend: "-0.5% ↓", isUp: false },
                    ]}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* ROW 3: Architecture Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1000px] mx-auto w-full">
            <div className="bg-bg-elevated border border-border-subtle rounded-xl p-6 text-center shadow-sm flex flex-col items-center justify-center aspect-video md:aspect-auto h-[120px]">
              <div className="text-3xl font-bold text-text-primary mb-1">50+</div>
              <div className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider">Primitive Tokens</div>
            </div>
            <div className="bg-bg-elevated border border-border-subtle rounded-xl p-6 text-center shadow-sm flex flex-col items-center justify-center aspect-video md:aspect-auto h-[120px]">
              <div className="text-3xl font-bold text-text-primary mb-1">120+</div>
              <div className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider">Semantic Tokens</div>
            </div>
            <div className="bg-bg-elevated border border-border-subtle rounded-xl p-6 text-center shadow-sm flex flex-col items-center justify-center aspect-video md:aspect-auto h-[120px]">
              <div className="text-3xl font-bold text-brand mb-1">300+</div>
              <div className="text-[10px] sm:text-xs font-bold text-brand/70 uppercase tracking-wider">Component Tokens</div>
            </div>
            <div className="bg-bg-elevated border border-border-subtle rounded-xl p-6 text-center shadow-sm flex flex-col items-center justify-center aspect-video md:aspect-auto h-[120px]">
              <div className="text-3xl font-bold text-brand mb-1">100%</div>
              <div className="text-[10px] sm:text-xs font-bold text-brand/70 uppercase tracking-wider">UI Adaptation</div>
            </div>
          </div>

          {/* ROW 4: Technical Token Proof (Accordion) */}
          <div className="max-w-[900px] mx-auto w-full flex flex-col items-center text-center">
            <p className="text-sm text-text-secondary mb-4">
              Inspect the underlying token architecture powering all theme transformations.
            </p>
            
            <button 
              onClick={() => setShowCode(!showCode)}
              className="w-full flex items-center justify-between p-5 bg-bg-elevated border border-border-subtle rounded-xl font-semibold text-text-primary hover:bg-bg-surface transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-text-muted" />
                <span className="text-sm md:text-base">View Technical Architecture</span>
              </div>
              {showCode ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
            </button>
            
            {showCode && (
              <div className="mt-4 bg-[#0D1117] border border-border-subtle rounded-xl overflow-hidden shadow-card animate-in fade-in slide-in-from-top-2 duration-300 w-full text-left">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#161B22]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 ml-2">theme-provider.css</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-[11px] sm:text-xs font-mono leading-relaxed text-slate-300">
                    <code className="text-[#ff7b72]">:root</code> {'{\n'}
                    <span className="text-[#79c0ff]">  --color-primary</span>: <span className="text-[#a5d6ff]">#0EA5E9</span>;\n
                    <span className="text-[#79c0ff]">  --color-surface</span>: <span className="text-[#a5d6ff]">#FFFFFF</span>;\n
                    {'  \n'}
                    <span className="text-[#8b949e]">  {'/* Semantic Mapping */'}</span>\n
                    <span className="text-[#79c0ff]">  --semantic-primary</span>: <span className="text-[#d2a8ff]">var</span>(<span className="text-[#79c0ff]">--color-primary</span>);\n
                    <span className="text-[#79c0ff]">  --semantic-surface</span>: <span className="text-[#d2a8ff]">var</span>(<span className="text-[#79c0ff]">--color-surface</span>);\n
                    {'  \n'}
                    <span className="text-[#8b949e]">  {'/* Component Isolation */'}</span>\n
                    <span className="text-[#79c0ff]">  --button-primary-bg</span>: <span className="text-[#d2a8ff]">var</span>(<span className="text-[#79c0ff]">--semantic-primary</span>);\n
                    {'}'}
                  </pre>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
