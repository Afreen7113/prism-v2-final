"use client";

import React from "react";
import { Search, AlertCircle } from "lucide-react";
import { DocumentationSection, PropsTable, IntegrationSpec } from "../components";

export default function InputsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Input Components</h1>
        <p className="text-sm text-text-secondary">Text fields, textareas, and search inputs with state handling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Default Inputs */}
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 space-y-6 shadow-sm">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Default Fields</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Standard Input</label>
              <input type="text" placeholder="Enter text..." className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand text-text-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">With Icon</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand text-text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 space-y-6 shadow-sm">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">States</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-status-error mb-1.5 uppercase tracking-wider">Error State</label>
              <input type="text" defaultValue="Invalid email format" className="w-full px-4 py-2.5 rounded-xl border border-status-error focus:ring-status-error bg-status-error/5 text-sm focus:outline-none focus:ring-2 text-text-primary" />
              <p className="text-xs text-status-error mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Email is required</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wider">Disabled State</label>
              <input type="text" disabled defaultValue="Cannot edit this" className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-elevated text-sm text-text-muted cursor-not-allowed opacity-70" />
            </div>
          </div>
        </div>
      </div>

      <DocumentationSection>
        <PropsTable props={[
          { name: "type", type: "string", default: "'text'", desc: "HTML input type" },
          { name: "placeholder", type: "string", default: "undefined", desc: "Placeholder text" },
          { name: "disabled", type: "boolean", default: "false", desc: "Disables the input field" },
          { name: "defaultValue", type: "string", default: "undefined", desc: "Initial value" },
          { name: "className", type: "string", default: "undefined", desc: "Additional CSS classes" }
        ]} />
        <IntegrationSpec 
          importCode={`import { Input } from "@/components/ui/Input";`}
          usageCode={`<input \n  type="text" \n  placeholder="Enter text..." \n  className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand text-text-primary" \n/>`}
          onCopy={(code) => navigator.clipboard.writeText(code)}
        />
      </DocumentationSection>
    </div>
  );
}
