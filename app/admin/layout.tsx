"use client";

import React from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminSurfaceBadge } from "@/components/ui/AdminSurfaceBadge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-bg-base text-text-brand flex flex-col relative font-sans overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 bg-grid opacity-20 pointer-events-none" />

      {/* Admin Portal Header */}
      <header className="h-16 border-b border-border-subtle bg-bg-surface/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 100 100" className="w-6 h-6 drop-shadow-md">
            <defs>
              <linearGradient id="admin-prism-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--prism-semantic-primary, var(--color-primary))" />
                <stop offset="100%" stopColor="var(--prism-semantic-accent, var(--color-accent))" />
              </linearGradient>
              <linearGradient id="admin-prism-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--prism-semantic-accent, var(--color-accent))" />
                <stop offset="100%" stopColor="var(--prism-semantic-primary, var(--color-primary))" />
              </linearGradient>
            </defs>
            <path d="M50 10 L15 75 L50 90 Z" fill="url(#admin-prism-grad-1)" />
            <path d="M50 10 L50 90 L85 75 Z" fill="url(#admin-prism-grad-2)" />
            <path d="M50 10 L50 90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
          </svg>
          <span className="font-semibold text-text-brand text-base tracking-tight flex items-center">
            Prism <AdminSurfaceBadge className="ml-1.5" />
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-text-secondary hover:text-text-brand transition-all">
            ← Back to marketing page
          </Link>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        {/* Sidebar Controls */}
        <AdminSidebar />

        {/* Content Pane */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
