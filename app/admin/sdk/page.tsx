"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Copy, CheckCircle2, ChevronRight, Layers, FileJson, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

function CodeBlock({ code, language }: { code: string, language: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute flex items-center justify-between top-0 left-0 right-0 px-4 py-2 bg-transparent rounded-t-xl">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{language}</span>
        <Button 
          variant="ghost"
          size="icon"
          onClick={copy}
          className="h-6 w-6 text-text-muted hover:text-text-primary"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-status-success" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <pre className="p-4 pt-12 rounded-xl bg-bg-elevated border border-border-subtle overflow-x-auto text-sm font-mono text-text-primary leading-relaxed shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function SdkPage() {
  const [activeTab, setActiveTab] = useState<"react" | "vue" | "next" | "js">("react");

  const installCommands: Record<string, string> = {
    react: "npm install @prism/sdk-react",
    vue: "npm install @prism/sdk-vue",
    next: "npm install @prism/sdk-react @prism/next",
    js: "<script src=\"https://cdn.prism.io/v1/prism.js\"></script>"
  };

  const snippets: Record<string, string> = {
    react: `import { PrismProvider, Dashboard } from '@prism/sdk-react';

function App() {
  return (
    <PrismProvider 
      publishableKey="pk_live_your_key_here"
      tenantId="tenant_123"
    >
      <div className="dashboard-container">
        <Dashboard 
          layout="grid" 
          theme="dark" 
        />
      </div>
    </PrismProvider>
  );
}`,
    vue: `<template>
  <div class="dashboard-container">
    <PrismDashboard 
      publishableKey="pk_live_your_key_here"
      tenantId="tenant_123"
      layout="grid"
      theme="dark"
    />
  </div>
</template>

<script setup>
import { PrismDashboard } from '@prism/sdk-vue';
</script>`,
    next: `import { PrismDashboard } from '@prism/sdk-react/server';
import { getSession } from '@/auth';

export default async function AnalyticsPage() {
  const session = await getSession();
  
  // Secure server-side rendering
  return (
    <PrismDashboard 
      publishableKey={process.env.NEXT_PUBLIC_PRISM_KEY}
      tenantToken={session.prismToken}
      ssr={true}
    />
  );
}`,
    js: `const prism = new Prism('pk_live_your_key_here');

prism.mount('#analytics-container', {
  tenantId: 'tenant_123',
  components: ['revenue_chart', 'user_table'],
  theme: {
    mode: 'dark',
    primaryColor: 'var(--color-primary)'
  }
});`
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Code2 className="w-6 h-6 text-brand" />
          SDK & Integration
        </h1>
        <p className="text-sm text-text-secondary mt-1 max-w-2xl">Integrate Prism analytics into your application in minutes using our native SDKs or REST API.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content - Code Tabs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
            <div className="flex border-b border-border-subtle bg-bg-elevated/50 overflow-x-auto">
              {([] as Array<{ id: "react" | "vue" | "next" | "js"; label: string }>).concat([
                { id: "react", label: "React" },
                { id: "next", label: "Next.js" },
                { id: "vue", label: "Vue" },
                { id: "js", label: "Vanilla JS" }
              ]).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? "text-brand" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-text-muted" /> Installation
                </h3>
                <CodeBlock code={installCommands[activeTab]} language="bash" />
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-text-muted" /> Implementation
                </h3>
                <p className="text-sm text-text-secondary mb-4">Initialize the provider with your publishable key to mount the dashboard.</p>
                <CodeBlock code={snippets[activeTab]} language={activeTab === "js" ? "javascript" : "typescript"} />
              </div>
            </div>
          </div>

          <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-text-primary">Need custom styling?</h3>
              <p className="text-sm text-text-secondary mt-1">Check out the Theme Playground to generate a custom CSS token file.</p>
            </div>
            <Button variant="secondary" className="shrink-0" onClick={() => {}}>
              Go to Playground <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Sidebar - REST API & Resources */}
        <div className="space-y-6">
          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand/10 rounded-lg text-brand">
                <FileJson className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-text-primary">REST API</h3>
            </div>
            <p className="text-sm text-text-secondary mb-6">Access raw data endpoints to build custom visualizations.</p>
            
            <div className="flex flex-col gap-3 mt-4">
              <div className="group border border-border-subtle rounded-xl p-3 cursor-pointer bg-bg-base hover-semantic-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-text-primary">List Tenants</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand/10 text-brand">GET</span>
                </div>
                <p className="text-[10px] text-text-muted font-mono truncate">/v1/tenants</p>
              </div>
              <div className="group border border-border-subtle rounded-xl p-3 cursor-pointer bg-bg-base hover-semantic-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-text-primary">Create Tenant</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-status-warning/10 text-status-warning">POST</span>
                </div>
                <p className="text-[10px] text-text-muted font-mono truncate">/v1/tenants</p>
              </div>
              <div className="group border border-border-subtle rounded-xl p-3 cursor-pointer bg-bg-base hover-semantic-card">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold bg-status-warning/10 px-2 py-0.5 rounded uppercase text-status-warning">POST</span>
                  <span className="text-xs font-mono text-text-primary min-w-0 truncate">/v1/tenants/sync</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6">View API Reference</Button>
          </div>

          <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand" /> Resources
            </h3>
            <div className="space-y-3">
              <a href="#" className="block text-sm text-text-secondary hover:text-brand transition-colors">Documentation</a>
              <a href="#" className="block text-sm text-text-secondary hover:text-brand transition-colors">GitHub Repository</a>
              <a href="#" className="block text-sm text-text-secondary hover:text-brand transition-colors">Community Discord</a>
              <a href="#" className="block text-sm text-text-secondary hover:text-brand transition-colors">Status Page</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
