"use client";

import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity, Radio, Maximize2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const lineData = months.map((m, i) => ({
  month: m,
  revenue: Math.round(4000 + Math.sin(i * 0.5) * 1500 + i * 300 + Math.random() * 400),
  users: Math.round(2000 + Math.cos(i * 0.4) * 800 + i * 150 + Math.random() * 200),
}));

const barData = months.slice(0, 7).map((m) => ({
  month: m,
  sales: Math.round(2000 + Math.random() * 3000),
  returns: Math.round(200 + Math.random() * 600),
}));

const pieData = [
  { name: "Organic",  value: 38, color: "var(--color-primary)" },
  { name: "Paid Ads", value: 24, color: "var(--color-accent)" },
  { name: "Referral", value: 19, color: "var(--color-success)" },
  { name: "Direct",   value: 12, color: "var(--color-warning)" },
  { name: "Social",   value: 7,  color: "var(--color-error)" },
];

const areaData = months.map((m, i) => ({
  month: m,
  web: Math.round(3000 + Math.sin(i * 0.6) * 1000 + i * 200),
  mobile: Math.round(2000 + Math.cos(i * 0.5) * 700 + i * 180),
  api: Math.round(1000 + i * 80 + Math.random() * 300),
}));

const radarData = [
  { metric: "Performance", A: 88, B: 70 },
  { metric: "Reliability", A: 92, B: 80 },
  { metric: "Security", A: 78, B: 85 },
  { metric: "Scalability", A: 85, B: 60 },
  { metric: "UX", A: 95, B: 72 },
  { metric: "Cost", A: 70, B: 88 },
];

const scatterData = Array.from({ length: 40 }, () => ({
  x: Math.round(Math.random() * 100),
  y: Math.round(Math.random() * 100),
  z: Math.round(Math.random() * 300 + 50),
}));

const CHART_TYPES = [
  { id: "line", label: "Line", Icon: TrendingUp },
  { id: "bar", label: "Bar", Icon: BarChart3 },
  { id: "pie", label: "Pie", Icon: PieIcon },
  { id: "area", label: "Area", Icon: Activity },
  { id: "radar", label: "Radar", Icon: Radio },
  { id: "scatter", label: "Scatter", Icon: Maximize2 },
];

const CUSTOM_TOOLTIP = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-3 shadow-lg text-xs">
      {label && <p className="text-text-muted mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

export default function ChartsPage() {
  const [activeChart, setActiveChart] = useState("line");
  const [activeMetric, setActiveMetric] = useState("revenue" as "revenue" | "users");
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  return (
    <div className="min-h-screen bg-bg-base text-text-brand font-sans">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-text-muted hover:text-text-brand text-sm transition-colors">← Back</Link>
            <div className="w-px h-4 bg-border-subtle" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-brand" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-brand">Charts</h1>
                <p className="text-[10px] text-text-muted">Interactive visualization library</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-brand bg-brand/10 border border-brand/20 px-2 py-1 rounded-full">6 Chart Types</span>
            <span className="text-[10px] font-semibold text-status-success bg-status-success/10 border border-success/20 px-2 py-1 rounded-full">Live Data</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: "$2.4M", change: "+18.5%", up: true },
            { label: "Active Users", value: "48.2K", change: "+12.3%", up: true },
            { label: "Conversion Rate", value: "3.84%", change: "+0.6%", up: true },
            { label: "Avg Session", value: "4m 32s", change: "-0.3%", up: false },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-bg-surface border border-border-subtle rounded-2xl p-4"
            >
              <p className="text-xs text-text-muted mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-text-brand">{m.value}</p>
              <p className={`text-xs font-semibold mt-1 ${m.up ? "text-brand" : "text-status-error"}`}>{m.change} vs last period</p>
            </motion.div>
          ))}
        </div>

        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2">
          {CHART_TYPES.map(({ id, label, Icon }) => (
  <Button
    key={id}
    size="sm"
    variant={activeChart === id ? "primary" : "outline"}
    onClick={() => setActiveChart(id)}
    aria-label={`Show ${label} chart`}
    className="flex items-center gap-2"
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </Button>
))}
        </div>

        {/* Main Chart Area */}
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-surface border border-border-subtle rounded-2xl p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-bold text-text-brand">
                {activeChart === "line" && "Revenue & User Growth"}
                {activeChart === "bar" && "Monthly Sales vs Returns"}
                {activeChart === "pie" && "Traffic Source Breakdown"}
                {activeChart === "area" && "Platform Traffic — Web, Mobile, API"}
                {activeChart === "radar" && "Product Comparison Radar"}
                {activeChart === "scatter" && "Engagement Scatter Plot"}
              </h2>
              <p className="text-xs text-text-muted mt-0.5">Last 12 months · Updated in real-time</p>
            </div>
            {activeChart === "line" && (
              <div className="flex gap-2">
{(["revenue", "users"] as const).map((m) => (
  <Button
    key={m}
    size="sm"
    variant={activeMetric === m ? "secondary" : "ghost"}
    onClick={() => setActiveMetric(m)}
    aria-label={`Show ${m} metric`}
    className="capitalize"
  >
    {m}
  </Button>
))}              </div>
            )}
          </div>

          <div className="h-72 md:h-96 min-h-[320px]">
            {mounted && (
  <ResponsiveContainer width="100%" height="100%">
              {activeChart === "line" ? (
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-axis)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Legend />
                  {activeMetric === "revenue" ? (
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Revenue" />
                  ) : (
                    <Line type="monotone" dataKey="users" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Users" />
                  )}
                </LineChart>
              ) : activeChart === "bar" ? (
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-axis)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Sales" />
                  <Bar dataKey="returns" fill="var(--color-error)" radius={[4, 4, 0, 0]} name="Returns" />
                </BarChart>
              ) : activeChart === "pie" ? (
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Legend />
                </PieChart>
              ) : activeChart === "area" ? (
                <AreaChart data={areaData}>
                  <defs>
                    {([ ["web", "var(--color-primary)"], ["mobile", "var(--color-accent)"], ["api", "var(--color-info)"] ] as [string, string][]).map(([key, color]) => (
                      <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-axis)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Legend />
                  <Area type="monotone" dataKey="web" stroke="var(--color-primary)" fill="url(#grad-web)" strokeWidth={2} name="Web" />
                  <Area type="monotone" dataKey="mobile" stroke="var(--color-accent)" fill="url(#grad-mobile)" strokeWidth={2} name="Mobile" />
                  <Area type="monotone" dataKey="api" stroke="var(--color-info)" fill="url(#grad-api)" strokeWidth={2} name="API" />
                </AreaChart>
              ) : activeChart === "radar" ? (
                <RadarChart cx="50%" cy="50%" outerRadius={130} data={radarData}>
                  <PolarGrid stroke="var(--color-chart-axis)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <Radar name="Product A" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.25} />
                  <Radar name="Product B" dataKey="B" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.2} />
                  <Legend />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                </RadarChart>
              ) : (
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-axis)" />
                  <XAxis type="number" dataKey="x" name="Sessions" tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <YAxis type="number" dataKey="y" name="Conversions" tick={{ fontSize: 11, fill: "var(--color-chart-axis)" }} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Users" data={scatterData} fill="var(--color-primary)" fillOpacity={0.7} />
                </ScatterChart>
              )}
            </ResponsiveContainer>
              )}
          </div>
        </motion.div>

        {/* Chart Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Real-time Updates", desc: "Charts auto-refresh every 30 seconds with live data streaming via WebSocket.", badge: "Live" },
            { title: "Export Ready", desc: "Download any chart as PNG, SVG or embed via iframe with a single click.", badge: "PNG/SVG" },
            { title: "Fully Responsive", desc: "Charts resize gracefully across mobile, tablet, and desktop viewports.", badge: "Responsive" },
          ].map((f, i) => (
            <div key={i} className="bg-bg-surface border border-border-subtle rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-text-brand">{f.title}</h3>
                <span className="text-[10px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-full">{f.badge}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
