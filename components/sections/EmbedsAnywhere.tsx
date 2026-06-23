'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Settings, Activity } from 'lucide-react'
import { presets } from '@/providers/ThemeProvider'

const RevenueChart = () => (
  <div className="w-full flex-1 mt-2 relative flex items-end justify-between gap-1 px-1 pb-1 border-b border-[var(--semantic-border)]">
    {/* Y Axis lines */}
    <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full h-[0.5px] bg-[var(--semantic-border)] opacity-40" />
      ))}
    </div>
    
    {/* Bars */}
    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
      <div 
        key={i} 
        className="w-full rounded-t-sm z-10 transition-all duration-500 hover:opacity-80"
        style={{ height: `${h}%`, backgroundColor: 'var(--chart-primary)' }}
      />
    ))}
  </div>
)

export default function EmbedsAnywhere() {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand text-[13px] uppercase tracking-[0.15em] font-bold mb-4">
            BUILT FOR YOUR PRODUCT
          </p>
          <h2 className="font-semibold text-3xl md:text-5xl text-[var(--prism-site-text)] mb-6 tracking-tight">
            Embeds anywhere. Adapts instantly.
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--prism-site-text-secondary)] text-base md:text-lg">
            Same component. Different host applications. Prism charts inherit your environment&apos;s design tokens automatically.
          </p>
        </div>

        {/* Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Host App A (Light Theme) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-card flex flex-col h-[280px]"
            style={{ 
              '--semantic-bg': presets["healthcare"]?.bgColor || '#ffffff',
              '--semantic-surface': presets["healthcare"]?.surfaceColor || '#f8fafc',
              '--semantic-border': presets["healthcare"]?.primaryColor ? `color-mix(in srgb, ${presets["healthcare"].primaryColor} 20%, transparent)` : '#e2e8f0',
              '--semantic-text-primary': presets["healthcare"]?.textPrimary || '#0f172a',
              '--semantic-text-primary-muted': presets["healthcare"]?.textMuted || '#94a3b8',
              '--chart-primary': presets["healthcare"]?.primaryColor || '#3b82f6',
            } as React.CSSProperties}
          >
            {/* SaaS Header */}
            <div className="h-8 border-b border-[var(--semantic-border)] bg-[var(--semantic-surface)] flex items-center px-3 justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <div className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
              <div className="text-[var(--semantic-text-primary-muted)] text-[8px] font-bold uppercase tracking-widest opacity-60">Host App A</div>
              <div className="w-4 h-4 rounded-full bg-slate-200" />
            </div>
            
            {/* SaaS Body */}
            <div className="flex flex-1">
              {/* Sidebar */}
              <div className="w-12 border-r border-[var(--semantic-border)] bg-[var(--semantic-surface)] flex flex-col items-center py-4 gap-4">
                <LayoutDashboard className="w-4 h-4 text-[var(--chart-primary)]" />
                <Users className="w-4 h-4 text-[var(--semantic-text-primary-muted)] opacity-40" />
                <Activity className="w-4 h-4 text-[var(--semantic-text-primary-muted)] opacity-40" />
                <Settings className="w-4 h-4 text-[var(--semantic-text-primary-muted)] mt-auto opacity-40" />
              </div>
              {/* Content */}
              <div className="flex-1 p-4 bg-[var(--semantic-bg)] flex flex-col">
                <h3 className="text-[var(--semantic-text-primary)] font-semibold text-sm mb-0.5 opacity-80">Revenue Overview</h3>
                <p className="text-[var(--semantic-text-primary-muted)] text-xs mb-4 opacity-70">Monthly recurring revenue (MRR)</p>
                <div className="flex-1 bg-[var(--semantic-surface)] border border-[var(--semantic-border)] rounded-lg p-3 flex flex-col shadow-sm">
                   <div className="text-[var(--semantic-text-primary-muted)] text-[8px] font-bold uppercase tracking-widest mb-2 text-center border-b border-[var(--semantic-border)] pb-1.5 opacity-60">Prism Component</div>
                   <RevenueChart />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Host App B (Dark Theme) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-slate-800/60 bg-slate-950 overflow-hidden shadow-card flex flex-col h-[280px]"
            style={{ 
              '--semantic-bg': presets["fintech"]?.bgColor || '#020617',
              '--semantic-surface': presets["fintech"]?.surfaceColor || '#0f172a',
              '--semantic-border': presets["fintech"]?.primaryColor ? `color-mix(in srgb, ${presets["fintech"].primaryColor} 20%, transparent)` : '#1e293b',
              '--semantic-text-primary': presets["fintech"]?.textPrimary || '#f8fafc',
              '--semantic-text-primary-muted': presets["fintech"]?.textMuted || '#475569',
              '--chart-primary': presets["fintech"]?.primaryColor || '#10b981',
            } as React.CSSProperties}
          >
            {/* SaaS Header */}
            <div className="h-8 border-b border-[var(--semantic-border)] bg-[var(--semantic-surface)] flex items-center px-3 justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
              <div className="text-[var(--semantic-text-primary-muted)] text-[8px] font-bold uppercase tracking-widest opacity-60">Host App B</div>
              <div className="w-4 h-4 rounded-full bg-slate-800" />
            </div>
            
            {/* SaaS Body */}
            <div className="flex flex-1">
              {/* Sidebar */}
              <div className="w-12 border-r border-[var(--semantic-border)] bg-[var(--semantic-surface)] flex flex-col items-center py-4 gap-4">
                <LayoutDashboard className="w-4 h-4 text-[var(--chart-primary)]" />
                <Users className="w-4 h-4 text-[var(--semantic-text-primary-muted)] opacity-40" />
                <Activity className="w-4 h-4 text-[var(--semantic-text-primary-muted)] opacity-40" />
                <Settings className="w-4 h-4 text-[var(--semantic-text-primary-muted)] mt-auto opacity-40" />
              </div>
              {/* Content */}
              <div className="flex-1 p-4 bg-[var(--semantic-bg)] flex flex-col">
                <h3 className="text-[var(--semantic-text-primary)] font-semibold text-sm mb-0.5 opacity-80">Revenue Overview</h3>
                <p className="text-[var(--semantic-text-primary-muted)] text-xs mb-4 opacity-70">Monthly recurring revenue (MRR)</p>
                <div className="flex-1 bg-[var(--semantic-surface)] border border-[var(--semantic-border)] rounded-lg p-3 flex flex-col shadow-sm">
                   <div className="text-[var(--semantic-text-primary-muted)] text-[8px] font-bold uppercase tracking-widest mb-2 text-center border-b border-[var(--semantic-border)] pb-1.5 opacity-60">Prism Component</div>
                   <RevenueChart />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Developer Integration Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-bg-elevated border border-border-subtle rounded-xl p-4 shadow-sm font-mono text-sm leading-relaxed overflow-x-auto text-text-primary">
            <span className="text-text-muted">{"<"}</span><span className="text-brand font-medium">PrismProvider</span> <span className="text-accent">theme</span><span className="text-text-primary">=</span><span className="text-brand/80">{"{customerTheme}"}</span><span className="text-text-muted">{">"}</span><br />
            &nbsp;&nbsp;<span className="text-text-muted">{"<"}</span><span className="text-brand font-medium">RevenueChart</span> <span className="text-text-muted">{"/>"}</span><br />
            <span className="text-text-muted">{"</"}</span><span className="text-brand font-medium">PrismProvider</span><span className="text-text-muted">{">"}</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
