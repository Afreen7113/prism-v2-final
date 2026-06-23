"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, ArrowUpDown, Building, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Tenant = {
  id: string;
  name: string;
  clientId: string;
  apiKey: string;
  preset: string;
  status: "Active" | "Suspended";
  tier: "Growth" | "Enterprise" | "Developer";
  requests: string;
  revenue: string;
};

export default function TenantManager() {
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: "1", name: "Clinix Medical", clientId: "cli_health_84a7", apiKey: "pk_live_0a28bc94ef03", preset: "healthcare", status: "Active", tier: "Growth", requests: "142,840", revenue: "$1,200" },
    { id: "2", name: "Apex Wealth", clientId: "cli_fintech_71b9", apiKey: "pk_live_948fbd20adbc", preset: "fintech", status: "Active", tier: "Enterprise", requests: "942,030", revenue: "$5,400" },
    { id: "3", name: "ShopSync Retail", clientId: "cli_retail_38c2", apiKey: "pk_live_e92a40b90c01", preset: "consumer", status: "Active", tier: "Growth", requests: "582,310", revenue: "$2,800" },
    { id: "4", name: "DevEngine Metrics", clientId: "cli_devtools_90d5", apiKey: "pk_live_38bf8c02def9", preset: "developer", status: "Suspended", tier: "Developer", requests: "12,940", revenue: "$0" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  

  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [apiKeyVisible, setApiKeyVisible] = useState<Record<string, boolean>>({});

  const toggleTenantStatus = (id: string) => {
    setTenants(tenants.map(t => t.id === id ? { ...t, status: t.status === "Active" ? "Suspended" : "Active" } : t));
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterTier === "All" || t.tier === filterTier) &&
    (filterStatus === "All" || t.status === filterStatus)
  );

  return (
    <div className="flex flex-col gap-6 text-left pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Tenant Manager</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage active B2B platform integrations, configure API scopes, and provision new workspaces.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add New Tenant
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-bg-surface border border-border-subtle rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tenant name..." 
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-subtle bg-bg-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="bg-bg-base border border-border-subtle rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand appearance-none"
          >
            <option value="All">All Plans</option>
            <option value="Developer">Developer</option>
            <option value="Growth">Growth</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-bg-base border border-border-subtle rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand appearance-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Tenant List */}
      <div className="bg-bg-surface border border-border-subtle rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-elevated text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4">Tenant Name</th>
                <th className="px-6 py-4">Client ID</th>
                <th className="px-6 py-4">API Key</th>
                <th className="px-6 py-4">Pricing Tier</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-text-primary">
                    Requests/mo <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-text-primary">
                    Revenue <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredTenants.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-bg-elevated rounded-2xl flex items-center justify-center border border-border-subtle mb-4">
                        <Building className="w-8 h-8 text-text-muted" />
                      </div>
                      <h3 className="text-base font-bold text-text-primary mb-1">No tenants found</h3>
                      <p className="text-sm text-text-secondary mb-6">Create a new tenant to start managing B2B integrations and providing API access.</p>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Tenant
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-bg-elevated/50 transition-colors">
                  <td className="px-6 py-4 text-text-primary font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold text-xs">
                      {t.name.substring(0, 2).toUpperCase()}
                    </div>
                    {t.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-text-secondary text-xs">{t.clientId}</td>
                  <td className="px-6 py-4 font-mono text-text-secondary text-xs">
                    <div className="flex items-center gap-2">
                      <span>{apiKeyVisible[t.id] ? t.apiKey : "pk_live_••••••••••••"}</span>
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => setApiKeyVisible({ ...apiKeyVisible, [t.id]: !apiKeyVisible[t.id] })}
                        className="text-[10px] h-6 px-2 font-bold uppercase tracking-wider text-brand hover:bg-brand/10 hover:text-brand"
                      >
                        {apiKeyVisible[t.id] ? "HIDE" : "SHOW"}
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      t.tier === "Enterprise" ? "bg-accent/10 text-accent border border-accent/20" : 
                      t.tier === "Growth" ? "bg-brand/10 text-brand border border-brand/20" : 
                      "bg-bg-elevated text-text-secondary border border-border-subtle"
                    }`}>
                      {t.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-text-primary">{t.requests}</td>
                  <td className="px-6 py-4 font-mono text-text-primary text-status-success">{t.revenue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${
                      t.status === "Active" ? "bg-status-success/10 text-status-success" : "bg-status-error/10 text-status-error"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${t.status === "Active" ? "bg-status-success" : "bg-status-error"}`} />
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTenant(t)}>
                      Manage <Edit2 className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Details Drawer (Modal) */}
      <AnimatePresence>
        {selectedTenant && (
          <div className="fixed inset-0 z-50 flex justify-end bg-bg-elevated/70 backdrop-blur-sm">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-bg-surface w-full max-w-md h-full border-l border-border-subtle shadow-card flex flex-col"
            >
              <div className="bg-bg-surface border-b border-border-subtle p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    {selectedTenant.name}
                    {selectedTenant.status === "Active" ? <span className="w-2 h-2 rounded-full bg-status-success"></span> : <span className="w-2 h-2 rounded-full bg-status-error"></span>}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Tenant ID: {selectedTenant.id}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedTenant(null)} aria-label="Close details">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-8">
                <div>
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Credentials</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-text-muted block mb-1">Client ID</label>
                      <div className="bg-bg-base border border-border-subtle rounded-xl p-3 font-mono text-xs text-text-primary">
                        {selectedTenant.clientId}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-text-muted block mb-1">Secret Key (sk_live)</label>
                      <div className="bg-bg-base border border-border-subtle rounded-xl p-3 font-mono text-xs text-text-primary flex justify-between items-center">
                        sk_live_••••••••••••••••••••••••
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Roll Key</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-text-muted block mb-1">Plan Tier</label>
                      <select className="w-full bg-bg-base border border-border-subtle rounded-xl p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand appearance-none">
                        <option selected={selectedTenant.tier === "Growth"}>Growth</option>
                        <option selected={selectedTenant.tier === "Enterprise"}>Enterprise</option>
                        <option selected={selectedTenant.tier === "Developer"}>Developer</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-text-muted block mb-1">White-label Preset</label>
                      <select className="w-full bg-bg-base border border-border-subtle rounded-xl p-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand appearance-none">
                        <option selected={selectedTenant.preset === "healthcare"}>Healthcare</option>
                        <option selected={selectedTenant.preset === "fintech"}>Fintech</option>
                        <option selected={selectedTenant.preset === "consumer"}>Consumer</option>
                        <option selected={selectedTenant.preset === "developer"}>Developer</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Danger Zone</h4>
                  <div className="bg-status-error/5 border border-status-error/20 rounded-xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-text-primary">Tenant Status</p>
                        <p className="text-xs text-text-secondary">{selectedTenant.status === "Active" ? "Suspend access to all APIs." : "Restore API access."}</p>
                      </div>
                      <Button 
                        variant="secondary" 
                        onClick={() => { toggleTenantStatus(selectedTenant.id); setSelectedTenant({...selectedTenant, status: selectedTenant.status === "Active" ? "Suspended" : "Active"}); }}
                      >
                        {selectedTenant.status === "Active" ? "Suspend Tenant" : "Activate Tenant"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
