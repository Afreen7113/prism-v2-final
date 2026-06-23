"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { DocumentationSection, PropsTable, IntegrationSpec } from "../components";

export default function ButtonPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Button Component</h1>
        <p className="text-sm text-text-secondary">Used for primary actions, secondary actions, and ghost states. Built with semantic tokens.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Variants */}
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 space-y-6 shadow-sm">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Variants</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Primary</span>
              <Button variant="primary">Primary Action</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Secondary</span>
              <Button variant="secondary">Secondary Action</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Outline</span>
              <Button variant="outline">Outline Action</Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Ghost</span>
              <Button variant="ghost">Ghost Action</Button>
            </div>
          </div>
        </div>

        {/* States & Sizes */}
        <div className="space-y-8">
          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" isLoading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Sizes</h3>
            <div className="flex items-end gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </div>

      <DocumentationSection>
        <PropsTable props={[
          { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", desc: "Visual style variant" },
          { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", desc: "Button dimensions" },
          { name: "isLoading", type: "boolean", default: "false", desc: "Displays loading spinner and disables interaction" },
          { name: "disabled", type: "boolean", default: "false", desc: "Disables interaction" },
          { name: "className", type: "string", default: "undefined", desc: "Additional CSS classes" }
        ]} />
        <IntegrationSpec 
          importCode={`import { Button } from "@/components/ui/Button";`}
          usageCode={`<Button\n  variant="primary"\n  size="md"\n  isLoading={false}\n  onClick={() => console.log('clicked')}\n>\n  Primary Action\n</Button>`}
          onCopy={(code) => navigator.clipboard.writeText(code)}
        />
      </DocumentationSection>
    </div>
  );
}
