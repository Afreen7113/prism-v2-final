"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sliders,
  BarChart3,
  Users,
  CreditCard,
  BookOpen,
  Key,
  ClipboardList,
  Settings,
  Code2,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isStorybookOpen, setIsStorybookOpen] = React.useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { id: "api-keys", label: "API Keys", href: "/admin/api-keys", icon: Key },
    { id: "audit-logs", label: "Audit Logs", href: "/admin/audit-logs", icon: ClipboardList },
    { id: "billing", label: "Usage & Telemetry", href: "/admin/usage-telemetry", icon: CreditCard },
    { id: "builder", label: "Chart Builder", href: "/admin/chart-builder", icon: BarChart3 },
    { id: "playground", label: "Theme Engine", href: "/admin/theme-playground", icon: Sliders },
    { id: "customers", label: "Tenant Manager", href: "/admin/tenant-manager", icon: Users },
    { id: "sdk", label: "SDK & Integration", href: "/admin/sdk", icon: Code2 },
    { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg-surface/85 p-5 flex flex-col gap-1 shrink-0 lg:overflow-y-auto lg:h-full">
      <span className="text-[10px] uppercase font-bold text-text-muted px-3 mb-2 tracking-widest">Navigation</span>
      
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href === "/admin" 
          ? pathname === "/admin"
          : pathname.startsWith(item.href);
          
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-300 ${
              isActive
                ? "bg-brand/15 text-brand border border-brand/20 shadow-md"
                : "text-text-secondary hover:text-text-brand hover:bg-bg-elevated/60 border border-transparent"
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}

      <div className="w-full flex flex-col mt-1">
        <button
          onClick={() => setIsStorybookOpen(!isStorybookOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-300 ${
            pathname.startsWith("/admin/storybook")
              ? "bg-brand/15 text-brand border border-brand/20 shadow-md"
              : "text-text-secondary hover:text-text-brand hover:bg-bg-elevated/60 border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4" />
            <span>Storybook Docs</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isStorybookOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {isStorybookOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col pl-10 pr-3 py-1 gap-0.5">
                <Link href="/admin/storybook/button" className={`text-xs py-1.5 transition-colors ${pathname === "/admin/storybook/button" ? "text-brand font-semibold" : "text-text-secondary hover:text-text-brand"}`}>Button</Link>
                <Link href="/admin/storybook/inputs" className={`text-xs py-1.5 transition-colors ${pathname === "/admin/storybook/inputs" ? "text-brand font-semibold" : "text-text-secondary hover:text-text-brand"}`}>Inputs</Link>
                <Link href="/admin/storybook/modals" className={`text-xs py-1.5 transition-colors ${pathname === "/admin/storybook/modals" ? "text-brand font-semibold" : "text-text-secondary hover:text-text-brand"}`}>Modals</Link>
                <Link href="/admin/storybook/toasts" className={`text-xs py-1.5 transition-colors ${pathname === "/admin/storybook/toasts" ? "text-brand font-semibold" : "text-text-secondary hover:text-text-brand"}`}>Toasts</Link>
                <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer" className="text-xs text-brand hover:text-brand/80 font-semibold py-1.5 mt-1 flex items-center gap-1 transition-colors">
                  Open Full Storybook ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-border-subtle px-3 hidden lg:flex flex-col gap-2">
        <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest block mb-1">Status Overview</span>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">API Status:</span>
          <span className="text-status-success font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-ping" />
            Operational
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Gateway latency:</span>
          <span className="text-text-brand font-mono">14.2ms</span>
        </div>
      </div>
    </aside>
  );
}
