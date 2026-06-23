"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DocumentationSection, PropsTable, IntegrationSpec } from "../components";

export default function ModalsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Modal Dialogs</h1>
        <p className="text-sm text-text-secondary">Overlays for critical actions and complex forms.</p>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-2xl p-8 shadow-sm flex items-center justify-center min-h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 bg-bg-elevated/40 backdrop-blur-sm flex items-center justify-center p-4">
          {/* Mock Modal */}
          <div className="bg-bg-surface border border-border-subtle rounded-2xl shadow-card w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-bg-elevated/50">
              <h3 className="font-bold text-text-primary">Confirm Deletion</h3>
              <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-text-secondary">Are you sure you want to delete this tenant? This action cannot be undone and will immediately revoke API access.</p>
            </div>
            <div className="p-5 border-t border-border-subtle bg-bg-elevated/50 flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-status-error hover:bg-status-error/90 text-white border-transparent">Delete Tenant</Button>
            </div>
          </div>
        </div>
      </div>

      <DocumentationSection>
        <PropsTable props={[
          { name: "isOpen", type: "boolean", default: "false", desc: "Controls modal visibility" },
          { name: "onClose", type: "() => void", default: "undefined", desc: "Callback when modal requests to close" },
          { name: "title", type: "string", default: "undefined", desc: "Modal header title" },
          { name: "children", type: "ReactNode", default: "undefined", desc: "Modal body content" }
        ]} />
        <IntegrationSpec 
          importCode={`import { Modal } from "@/components/ui/Modal";`}
          usageCode={`<div className="fixed inset-0 bg-bg-elevated/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">\n  <div className="bg-bg-surface border border-border-subtle rounded-2xl shadow-card w-full max-w-md overflow-hidden">\n    <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-bg-elevated/50">\n      <h3 className="font-bold text-text-primary">Confirm Deletion</h3>\n      <button className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>\n    </div>\n    <div className="p-6">\n      <p className="text-sm text-text-secondary">Are you sure you want to delete this tenant?</p>\n    </div>\n    <div className="p-5 border-t border-border-subtle bg-bg-elevated/50 flex justify-end gap-3">\n      <Button variant="outline">Cancel</Button>\n      <Button className="bg-status-error text-white border-transparent">Delete Tenant</Button>\n    </div>\n  </div>\n</div>`}
          onCopy={(code) => navigator.clipboard.writeText(code)}
        />
      </DocumentationSection>
    </div>
  );
}
