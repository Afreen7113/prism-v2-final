"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Download, Activity, Server, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/Button";

const telemetryData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 50000 + 10000),
  errors: Math.floor(Math.random() * 500),
}));

export default function UsageTelemetry() {
  const [selectedTier, setSelectedTier] = useState<"developer" | "growth" | "enterprise">("growth");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const billingConfig = {
    developer: { price: "$0", limit: "50,000 requests/mo", features: ["Standard charts", "Standard support", "CSS Customization"], capPct: 25.8 },
    growth: { price: "$149/mo", limit: "1,000,000 requests/mo", features: ["Advanced visualizer", "Priority response support", "Multi-tenant white-label variables", "Interactive theme dashboard"], capPct: 83.7 },
    enterprise: { price: "Custom Pricing", limit: "Unlimited requests", features: ["Dedicated servers", "SLA guarantees", "Custom analytics pipelines", "24/7 Phone Support"], capPct: 42.1 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="billing"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-8 pb-12 animate-in fade-in duration-500"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Usage & Telemetry</h1>
            <p className="text-sm text-text-secondary mt-1">
              Monitor tenant-wide request volumes, gateway query loads, active rates, and simulate billing configurations.
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Billing Simulator Card */}
          <div className="lg:col-span-4 bg-bg-surface border border-border-subtle p-6 rounded-2xl shadow-sm flex flex-col gap-6">
            <div>
              <span className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" /> Billing Configurator
              </span>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-bg-elevated border border-border-subtle w-full overflow-hidden">
                {(["developer", "growth", "enterprise"] as const).map((tier) => (
                  <Button
                    key={tier}
                    variant={selectedTier === tier ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTier(tier)}
                    className="w-full capitalize px-1 sm:px-2 whitespace-nowrap text-[11px] sm:text-xs font-semibold h-8"
                  >
                    {tier}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tier details panel */}
            <div className="bg-bg-elevated/50 rounded-xl border border-border-subtle p-5 sm:p-6 flex flex-col flex-1">
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs text-text-secondary font-bold tracking-wide">Monthly Price</span>
                  <span className="text-xl font-bold text-text-primary">{billingConfig[selectedTier].price}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-border-subtle/50 pb-5 mb-5">
                  <span className="text-xs text-text-secondary font-bold tracking-wide">Usage Limit</span>
                  <span className="text-sm font-semibold text-text-primary">{billingConfig[selectedTier].limit}</span>
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4">Features Included:</span>
                <div className="flex flex-col justify-between flex-1 pb-1">
                  {billingConfig[selectedTier].features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs py-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-status-success shrink-0" />
                      <span className="text-text-secondary font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-6 pt-2">
              {/* Limit usage bars */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span className="text-text-secondary">Current tier limit reached</span>
                  <span className={`${billingConfig[selectedTier].capPct >= 80 ? "text-status-warning" : "text-status-success"}`}>
                    {billingConfig[selectedTier].capPct}%
                  </span>
                </div>
                <div className="w-full bg-bg-elevated border border-border-subtle h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      billingConfig[selectedTier].capPct >= 80
                        ? "bg-status-warning"
                        : "bg-status-success"
                    }`}
                    style={{ width: `${billingConfig[selectedTier].capPct}%` }}
                  />
                </div>
              </div>

              {billingConfig[selectedTier].capPct >= 80 ? (
                <div className="mt-4 p-3 bg-[color-mix(in_srgb,var(--color-warning)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-warning)_15%,transparent)] rounded-xl flex flex-col gap-2.5">
                  <div className="flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-status-warning">
                        Approaching your plan limit. API requests may be throttled if usage continues to increase.
                      </p>
                      <p className="text-[10px] text-status-warning/80 mt-1 font-medium">
                        <span className="uppercase tracking-wider font-bold mr-1">Recommended Action</span> 
                        Upgrade your plan to avoid throttling during peak traffic.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-fit bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)] text-status-warning border-[color-mix(in_srgb,var(--color-warning)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-warning)_20%,transparent)] hover:text-status-warning hover:border-[color-mix(in_srgb,var(--color-warning)_40%,transparent)] transition-colors shadow-none h-8 text-xs px-3 ml-6"
                  >
                    Upgrade Plan <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full text-text-primary border-border-subtle hover:bg-bg-elevated transition-colors shadow-sm"
                  >
                    Upgrade Plan <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Telemetry charts */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-bg-surface border border-border-subtle p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                    <Activity className="w-5 h-5 text-brand" /> API Gateway Requests
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">Aggregate telemetry across all tenants (Past 24h)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-brand" /> Requests
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-status-error" /> Errors
                  </span>
                </div>
              </div>

              <div className="h-64 w-full min-w-0">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={telemetryData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorErr" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-status-error)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-status-error)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                      <XAxis dataKey="time" stroke="var(--color-text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--color-text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-subtle)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--color-text-primary)' }}
                      />
                      <Area type="monotone" dataKey="requests" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
                      <Area type="monotone" dataKey="errors" stroke="var(--color-status-error)" strokeWidth={2} fillOpacity={1} fill="url(#colorErr)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Breakdown Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Top Endpoints */}
              <div className="bg-bg-surface border border-border-subtle p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4 text-brand" /> Top Endpoints
                </h3>
                <div className="space-y-3">
                  {[
                    { path: "/v1/metrics/query", count: "1.2M", pct: "45%" },
                    { path: "/v1/tenants/list", count: "840k", pct: "32%" },
                    { path: "/v1/reports/generate", count: "320k", pct: "12%" },
                    { path: "/v1/auth/verify", count: "290k", pct: "11%" },
                  ].map((ep, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-mono text-xs text-text-secondary truncate">{ep.path}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-text-primary">{ep.count}</span>
                        <span className="text-[10px] text-text-muted w-8 text-right">{ep.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Codes */}
              <div className="bg-bg-surface border border-border-subtle p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand" /> Status Codes
                </h3>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 pb-5 border-b border-border-subtle">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-status-success"></span>
                    <span className="text-[10px] font-bold text-status-success tracking-wide uppercase">2xx Success</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-info"></span>
                    <span className="text-[10px] font-bold text-info tracking-wide uppercase">3xx Redirect</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-status-warning"></span>
                    <span className="text-[10px] font-bold text-status-warning tracking-wide uppercase">4xx Client Error</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-status-error"></span>
                    <span className="text-[10px] font-bold text-status-error tracking-wide uppercase">5xx Server Error</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { code: "200 OK", label: "Success", count: "2.4M", color: "text-status-success", bg: "bg-[color-mix(in_srgb,var(--color-success)_15%,transparent)]" },
                    { code: "201 Created", label: "Success", count: "120k", color: "text-status-success", bg: "bg-[color-mix(in_srgb,var(--color-success)_15%,transparent)]" },
                    { code: "304 Not Modified", label: "Redirect", count: "12k", color: "text-info", bg: "bg-[color-mix(in_srgb,var(--color-info)_15%,transparent)]" },
                    { code: "400 Bad Request", label: "Client Error", count: "8.4k", color: "text-status-warning", bg: "bg-[color-mix(in_srgb,var(--color-warning)_15%,transparent)]" },
                    { code: "429 Too Many Req", label: "Client Error", count: "2.1k", color: "text-status-warning", bg: "bg-[color-mix(in_srgb,var(--color-warning)_15%,transparent)]" },
                    { code: "500 Server Error", label: "Server Error", count: "342", color: "text-status-error", bg: "bg-[color-mix(in_srgb,var(--color-error)_15%,transparent)]" },
                  ].map((sc, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2.5">
                        <span className={`font-mono text-xs font-bold ${sc.color}`}>{sc.code}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wide uppercase border border-current opacity-80 ${sc.color} ${sc.bg}`}>
                          {sc.label}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-text-primary">{sc.count}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
