"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, Search, Download, ArrowRight,
  Clock, User, FileText, Activity, Server, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Log {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  status: "Success" | "Failed";
}

const MOCK_LOGS: Log[] = [
  { id: "log-1", timestamp: "Oct 12, 14:23:01", user: "sarah.connor@acme.inc", action: "Theme Configuration Updated", resource: "Global Config", ip: "192.168.1.104", status: "Success" },
  { id: "log-2", timestamp: "Oct 12, 14:15:33", user: "system@prism.io", action: "API Key Created", resource: "Auth Service", ip: "10.0.0.1", status: "Success" },
  { id: "log-3", timestamp: "Oct 12, 12:45:11", user: "john.doe@company.com", action: "Multi-Tenant Settings Modified", resource: "Tenant Manager", ip: "203.0.113.42", status: "Success" },
  { id: "log-4", timestamp: "Oct 12, 11:30:05", user: "unknown", action: "Usage Limit Changed", resource: "Billing", ip: "198.51.100.2", status: "Failed" },
  { id: "log-5", timestamp: "Oct 11, 09:12:44", user: "admin@prism.io", action: "Subscription Upgraded", resource: "Billing", ip: "192.168.1.5", status: "Success" },
  { id: "log-6", timestamp: "Oct 11, 08:45:21", user: "sarah.connor@acme.inc", action: "User Invited", resource: "Team Roles", ip: "192.168.1.104", status: "Success" },
];

export default function AuditLogsPage() {
  const [logs] = useState<Log[]>(MOCK_LOGS);
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter(l => 
    l.user.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.resource.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-brand" />
            Audit Logs
          </h1>
          <p className="text-sm text-text-secondary mt-1">Enterprise-grade tracking of all system activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-bg-surface border border-border-subtle rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user, action, or resource..." 
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-subtle bg-bg-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Button variant="ghost" size="sm" className="bg-bg-base border border-border-subtle shrink-0">
            <Clock className="w-3.5 h-3.5 mr-2 text-text-muted" /> Last 7 Days
          </Button>
          <Button variant="ghost" size="sm" className="bg-bg-base border border-border-subtle shrink-0">
            <User className="w-3.5 h-3.5 mr-2 text-text-muted" /> All Users
          </Button>
          <Button variant="ghost" size="sm" className="bg-bg-base border border-border-subtle shrink-0">
            <Activity className="w-3.5 h-3.5 mr-2 text-text-muted" /> All Actions
          </Button>
          <Button variant="ghost" size="sm" className="shrink-0 text-text-muted hover:text-text-primary">
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-elevated text-text-muted font-semibold text-xs tracking-wider uppercase">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-bg-elevated rounded-2xl flex items-center justify-center border border-border-subtle mb-4">
                        <ClipboardList className="w-8 h-8 text-text-muted" />
                      </div>
                      <h3 className="text-base font-bold text-text-primary mb-1">No activity recorded</h3>
                      <p className="text-sm text-text-secondary">We couldn&apos;t find any audit logs matching your current filters. Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
              {filteredLogs.map((log, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={log.id} 
                  className={`transition-colors group ${
                    log.status === "Failed" 
                      ? "bg-[color-mix(in_srgb,var(--color-error)_4%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-error)_8%,transparent)]" 
                      : "hover:bg-bg-elevated/50"
                  }`}
                >
                  <td className={`px-6 py-4 text-xs font-mono text-text-secondary whitespace-nowrap border-l-[3px] ${
                    log.status === "Failed" 
                      ? "border-[color-mix(in_srgb,var(--color-error)_50%,transparent)]" 
                      : "border-transparent"
                  }`}>
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 text-text-primary font-medium whitespace-nowrap">
                    <div className="max-w-[120px] sm:max-w-[180px] truncate" title={log.user}>
                      {log.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="max-w-[160px] sm:max-w-[240px]">
                      <span 
                        className="inline-block w-full text-center px-2.5 py-1 rounded-md bg-bg-base border border-border-subtle text-xs font-medium text-text-primary truncate align-middle" 
                        title={log.action}
                      >
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-xs whitespace-nowrap">
                    <div className="flex items-center gap-2 max-w-[120px] sm:max-w-[160px] truncate" title={log.resource}>
                      <Server className="w-3.5 h-3.5 text-text-muted shrink-0" />
                      <span className="truncate">{log.resource}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-text-muted text-[11px] whitespace-nowrap">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.status === "Success" ? (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-status-success bg-status-success/10 border border-status-success/20 px-2 py-0.5 rounded-full">
                        Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-status-error bg-status-error/10 border border-status-error/20 px-2 py-0.5 rounded-full w-fit">
                        <AlertCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-brand hover:bg-brand/10 hover:text-brand px-2">
                      View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-bg-elevated px-6 py-3 flex items-center justify-between border-t border-border-subtle">
          <span className="text-xs text-text-muted">Showing 1 to {filteredLogs.length} of {filteredLogs.length} entries</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>

    </div>
  );
}
