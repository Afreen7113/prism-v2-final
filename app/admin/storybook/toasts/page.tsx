"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { DocumentationSection, PropsTable, IntegrationSpec } from "../components";

export default function ToastsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Toasts & Notifications</h1>
        <p className="text-sm text-text-secondary">Feedback messages for user actions.</p>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px] gap-4">
        {/* Success Toast */}
        <div className="bg-bg-surface border-l-4 border-l-status-success border border-border-subtle shadow-lg rounded-xl p-4 w-full max-w-sm flex gap-3 items-start">
          <CheckCircle2 className="w-5 h-5 text-status-success shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-text-primary">Settings Saved</h4>
            <p className="text-xs text-text-secondary mt-0.5">Your changes have been applied successfully.</p>
          </div>
          <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
        </div>

        {/* Error Toast */}
        <div className="bg-bg-surface border-l-4 border-l-status-error border border-border-subtle shadow-lg rounded-xl p-4 w-full max-w-sm flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-status-error shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-text-primary">API Error</h4>
            <p className="text-xs text-text-secondary mt-0.5">Failed to sync tenant data. Please try again.</p>
          </div>
          <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
        </div>

        {/* Info Toast */}
        <div className="bg-bg-surface border-l-4 border-l-info border border-border-subtle shadow-lg rounded-xl p-4 w-full max-w-sm flex gap-3 items-start">
          <Info className="w-5 h-5 text-info shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-text-primary">New Feature Available</h4>
            <p className="text-xs text-text-secondary mt-0.5">Check out the new SDK integration panel.</p>
          </div>
          <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
        </div>
      </div>

      <DocumentationSection>
        <PropsTable props={[
          { name: "type", type: "'success' | 'error' | 'info'", default: "'info'", desc: "Toast variant and icon" },
          { name: "title", type: "string", default: "undefined", desc: "Toast heading" },
          { name: "description", type: "string", default: "undefined", desc: "Toast sub-message text" },
          { name: "duration", type: "number", default: "5000", desc: "Time in ms before auto-dismiss" }
        ]} />
        <IntegrationSpec 
          importCode={`import { toast } from "@/components/ui/useToast";`}
          usageCode={`toast({\n  title: "Settings Saved",\n  description: "Your changes have been applied successfully.",\n  type: "success",\n});`}
          onCopy={(code) => navigator.clipboard.writeText(code)}
        />
      </DocumentationSection>
    </div>
  );
}
