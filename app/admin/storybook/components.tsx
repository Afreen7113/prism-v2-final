"use client";

import React, { useState } from "react";
import { Check, Clipboard } from "lucide-react";

export function DocumentationSection({ children }: { children: React.ReactNode }) {
  return <div className="mt-16 space-y-12 border-t border-border-subtle pt-10">{children}</div>;
}

export function PropsTable({ props }: { props: Array<{ name: string; type: string; default: string; desc: string }> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Component Props</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Name</th>
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Type</th>
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Default</th>
              <th className="pb-2 text-xs font-semibold text-text-secondary w-1/4">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr key={i} className="border-b border-border-subtle/50">
                <td className="py-3 text-sm font-mono text-brand">{p.name}</td>
                <td className="py-3 text-sm font-mono text-text-muted">{p.type}</td>
                <td className="py-3 text-sm font-mono text-text-muted">{p.default || "-"}</td>
                <td className="py-3 text-sm text-text-secondary">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IntegrationSpec({ importCode, usageCode, onCopy }: { importCode: string; usageCode: string; onCopy: (code: string) => void }) {
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const copyImport = () => {
    onCopy(importCode);
    setCopiedImport(true);
    setTimeout(() => setCopiedImport(false), 2000);
  };

  const copyUsage = () => {
    onCopy(usageCode);
    setCopiedUsage(true);
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Component Integration Spec</h3>
      
      <div>
        <label className="block text-sm font-semibold text-text-secondary mb-2">Import Declaration:</label>
        <div className="bg-bg-elevated/40 border border-border-subtle rounded-lg p-4 font-mono text-xs text-status-success relative group flex items-center justify-between">
          <span>{importCode}</span>
          <button onClick={copyImport} className="text-text-muted hover:text-text-primary transition-colors">
            {copiedImport ? <Check className="w-4 h-4 text-status-success" /> : <Clipboard className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-text-secondary">&lt;/&gt; Usage Code block</label>
          <button onClick={copyUsage} className="text-xs font-semibold text-text-primary flex items-center gap-1.5 hover:text-brand transition-colors">
            {copiedUsage ? <Check className="w-4 h-4 text-status-success" /> : <Clipboard className="w-4 h-4" />} Copy integration snippet
          </button>
        </div>
        <div className="bg-black border border-border-subtle rounded-xl p-5 font-mono text-[13px] leading-relaxed text-status-success overflow-x-auto shadow-inner">
          <pre>{usageCode}</pre>
        </div>
      </div>
    </div>
  );
}
