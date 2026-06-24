"use client";

import { motion } from "framer-motion";
import { BarChart3, Table, Filter, Calendar, FileDown, Layers, Check } from "lucide-react";
import { useState } from "react";
import RevealText from "@/components/ui/RevealText";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";

const componentBlocks = [
  {
    icon: BarChart3,
    title: "Charts",
    description: "Line, bar, pie & more",
    color: "text-brand",
    iconBg: "bg-[var(--semantic-primary-10)] border-[var(--semantic-primary-20)]",
    href: "/components/charts",
  },
  {
    icon: Table,
    title: "Tables",
    description: "Sortable & filterable",
    color: "text-brand",
    iconBg: "bg-[var(--semantic-primary-10)] border-[var(--semantic-primary-20)]",
    href: "/components/tables",
  },
  {
    icon: Filter,
    title: "Filters",
    description: "Advanced controls",
    color: "text-brand",
    iconBg: "bg-[var(--semantic-primary-10)] border-[var(--semantic-primary-20)]",
    href: "/components/filters",
  },
  {
    icon: Calendar,
    title: "Date Picker",
    description: "Time range selector",
    color: "text-brand",
    iconBg: "bg-[var(--semantic-primary-10)] border-[var(--semantic-primary-20)]",
    href: "/components/date-picker",
  },
  {
    icon: FileDown,
    title: "Exports",
    description: "CSV, PDF, API",
    color: "text-brand",
    iconBg: "bg-[var(--semantic-primary-10)] border-[var(--semantic-primary-20)]",
    href: "/components/exports",
  },
  {
    icon: Layers,
    title: "KPI Cards",
    description: "Metrics at a glance",
    color: "text-brand",
    iconBg: "bg-[var(--semantic-primary-10)] border-[var(--semantic-primary-20)]",
    href: "/components/kpi-cards",
  },
];

const features = [
  "Real-time & historical data",
  "Custom reports & saved views",
  "Drill-down & segmentation",
  "Alerts & anomaly detection",
];

const countries = [
  { name: "United States", pct: "48%", color: "bg-brand" },
  { name: "Canada", pct: "12%", color: "bg-status-warning" },
  { name: "Germany", pct: "10%", color: "bg-[var(--semantic-accent)]" },
  { name: "Australia", pct: "8%", color: "bg-status-success" },
  { name: "Other", pct: "22%", color: "bg-bg-elevated border border-border-subtle" },
];

export default function ComponentsSection() {
  const [activeTab, setActiveTab] = useState("Overview");
  const { activePreset } = useTheme();

  return (
    <section id="solutions" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base text-text-brand relative z-10 border-y border-border-subtle font-sans overflow-hidden">
      

      
      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        
        {/* Top Header & Component Tiles */}
        <div className="flex flex-col items-center">
          <div className="text-center max-w-xl mb-12 flex flex-col items-center">
            <RevealText
              text="Enterprise analytics. Modular by design."
              tag="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-text-brand leading-tight text-center"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-text-secondary text-sm sm:text-base mt-2 font-medium"
            >
              A fully white-labeled, multi-tenant SDK. Embed production-ready charts, builders, and dashboards directly into your SaaS.
            </motion.p>
          </div>

          {/* Component grid cards */}
          <div className="w-full flex items-center justify-center mb-6">
            <span className="text-xs font-bold text-brand/80 uppercase tracking-[0.2em]">
              Production-ready building blocks for modern SaaS platforms
            </span>
          </div>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {componentBlocks.map((block, idx) => {
              const Icon = block.icon;
              return (
                <Link key={idx} href={block.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="bg-bg-elevated/20 rounded-2xl p-5 border border-border-subtle shadow-card flex flex-col items-center text-center group cursor-pointer hover:border-border-default hover:shadow-card transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 border ${block.iconBg} ${block.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-text-brand mb-1 transition-colors">
                      {block.title}
                    </h3>
                    <p className="text-xs text-text-secondary font-medium leading-relaxed">
                      {block.description}
                    </p>
                    <span className="mt-3 text-[9px] font-bold text-brand opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">Explore →</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Two-Column Dashboard Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-border-subtle">
          
          {/* Left Column: Text & Features list */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start">
            <div className="max-w-md">
              <RevealText
                text="Powerful dashboards out of the box"
                tag="h3"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-text-brand leading-tight mb-4"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8"
              >
                Turn raw data into actionable insights with beautiful, interactive dashboards.
              </motion.p>

              <div className="flex flex-col gap-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 text-[14px] sm:text-base font-semibold text-text-brand/90"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-brand" strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup container */}
          <div className="col-span-1 lg:col-span-7 w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full bg-[var(--prism-site-surface,#08090E)] border border-[var(--prism-site-border,rgba(255,255,255,0.05))] rounded-3xl shadow-card overflow-hidden flex flex-col sm:flex-row aspect-none sm:aspect-[1.5] min-h-[380px] transition-all duration-300"
            >
              {/* Sidebar Mockup */}
              <div className="w-full sm:w-44 border-b sm:border-b-0 sm:border-r border-[var(--prism-sidebar-border,rgba(255,255,255,0.05))] bg-[var(--prism-sidebar-bg,rgba(13,15,23,0.4))] p-4 flex flex-row sm:flex-col justify-between sm:justify-start gap-4 sm:gap-6 shrink-0 transition-all duration-300">
                <div className="flex flex-col w-full">
                  {/* Brand Logo */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-6">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                          <linearGradient id={`prism-grad-components-${activePreset || "default"}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--semantic-primary)" />
                            <stop offset="100%" stopColor="var(--semantic-accent)" />
                          </linearGradient>
                          <linearGradient id={`prism-grad-components-2-${activePreset || "default"}`} x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--semantic-accent)" />
                            <stop offset="100%" stopColor="var(--semantic-primary)" />
                          </linearGradient>
                        </defs>
                        <path d="M50 10 L15 75 L50 90 Z" fill={`url(#prism-grad-components-${activePreset || "default"})`} />
                        <path d="M50 10 L50 90 L85 75 Z" fill={`url(#prism-grad-components-2-${activePreset || "default"})`} />
                        <path d="M50 10 L50 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <span className="font-bold text-sm tracking-tight text-text-brand">Prism</span>
                  </div>

                  {/* Sidebar Menu items */}
                  <div className="hidden sm:flex flex-col gap-1 w-full">
                    {["Overview", "Dashboards", "Reports", "Events", "Users", "Funnels", "Retention", "Flows", "Exports"].map((item) => {
                      const isActive = activeTab === item;
                      return (
                        <button
                          key={item}
                          onClick={() => setActiveTab(item)}
                          className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-all ${
                            isActive
                              ? "bg-brand/10 text-brand font-semibold"
                              : "text-slate-400 hover:text-text-brand hover:bg-bg-base/5 font-medium"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* User Info (Mobile) */}
                <div className="flex sm:hidden items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-[10px] font-bold text-brand">
                    AW
                  </div>
                </div>
              </div>

              {/* Main Content Area Mockup */}
              <div className="flex-1 p-5 flex flex-col justify-between min-w-0 bg-[var(--prism-dashboard-bg,#08090E)] text-[var(--prism-dashboard-text,#FAFAFA)] transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--prism-card-border,rgba(255,255,255,0.05))] pb-3 mb-4">
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-[var(--prism-dashboard-text)]">{activeTab} Overview</h4>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Date picker Mockup */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] text-[10px] font-semibold text-text-secondary cursor-pointer hover:opacity-85 transition-all">
                      <Calendar className="w-3 h-3 text-text-muted" />
                      <span>May 1 - May 31, 2026</span>
                    </div>

                    {/* Avatars */}
                    <div className="flex -space-x-1.5 items-center">
                      <div className="w-5 h-5 rounded-full border border-[var(--prism-dashboard-bg)] bg-bg-elevated overflow-hidden flex items-center justify-center text-[6px] font-bold text-text-brand">
                        <span>A</span>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-[var(--prism-dashboard-bg)] bg-brand overflow-hidden flex items-center justify-center text-[6px] font-bold text-white">
                        <span>B</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPIs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { label: "Clinix", val: "$48,650", trend: "+12.5%", isUp: true },
                    { label: "DevEngine", val: "1.58M", trend: "+18.4%", isUp: true },
                    { label: "ApexWealth", val: "128.4K", trend: "+12.4%", isUp: true },
                    { label: "ShopSync", val: "3.24%", trend: "-1.1%", isUp: false },
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      className="p-2 border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] flex flex-col justify-between transition-all duration-300"
                      style={{ borderRadius: "var(--prism-card-radius)" }}
                    >
                      <span className="text-[9px] uppercase tracking-wider text-text-muted font-semibold">{card.label}</span>
                      <div className="flex items-baseline justify-between mt-1 gap-1 flex-wrap">
                        <span className="text-xs font-bold text-[var(--prism-dashboard-text)]">{card.val}</span>
                        <span className={`text-[8px] font-bold px-1 py-0.2 rounded-full ${
                          card.isUp ? "bg-brand/10 text-brand" : "bg-accent/10 text-accent"
                        }`}>
                          {card.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Split: Chart & Countries */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
                  {/* Revenue Over Time Chart */}
                  <div
                    className="md:col-span-8 p-3 border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] flex flex-col justify-between min-h-[160px] transition-all duration-300"
                    style={{ borderRadius: "var(--prism-card-radius)" }}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      Revenue Over Time
                    </span>
                    <div className="flex-1 flex items-end relative min-h-[100px]">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                        <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                        <div className="border-b border-dashed border-slate-800 w-full h-0"></div>
                      </div>
                      
                      {/* Smooth Area Chart SVG */}
                      <svg viewBox="0 0 300 120" className="w-full h-full z-10" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`mockupGrad-${activePreset || "default"}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--semantic-primary)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--semantic-primary)" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 100 C 30 100, 50 80, 80 85 C 110 90, 130 55, 160 50 C 190 45, 210 65, 240 40 C 270 15, 285 20, 300 15 L 300 120 L 0 120 Z"
                          fill={`url(#mockupGrad-${activePreset || "default"})`}
                        />
                        <path
                          d="M 0 100 C 30 100, 50 80, 80 85 C 110 90, 130 55, 160 50 C 190 45, 210 65, 240 40 C 270 15, 285 20, 300 15"
                          fill="none"
                          stroke="var(--semantic-primary)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* Chart X-axis */}
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mt-1">
                      <span>May 1</span>
                      <span>May 8</span>
                      <span>May 15</span>
                      <span>May 22</span>
                      <span>May 29</span>
                    </div>
                  </div>

                  {/* Top Countries side list */}
                  <div
                    className="md:col-span-4 p-3 border border-[var(--prism-card-border)] bg-[var(--prism-card-bg)] flex flex-col transition-all duration-300"
                    style={{ borderRadius: "var(--prism-card-radius)" }}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                      Top Countries
                    </span>
                    <div className="flex flex-col gap-2.5 flex-1 justify-center">
                      {countries.map((c, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-[9px] font-bold text-text-secondary">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${c.color}`} />
                              <span>{c.name}</span>
                            </div>
                            <span className="text-slate-400">{c.pct}</span>
                          </div>
                          {/* Mini Progress bar */}
                          <div className="w-full h-1 bg-bg-base/5 border border-border-subtle rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-brand"
                              style={{ width: c.pct }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

