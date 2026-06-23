"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Building, Globe, Lock, Bell, Webhook, AlertTriangle, 
  Save, CheckCircle2, Send
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function Section({ title, description, icon: Icon, children }: SectionProps) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border-subtle bg-bg-elevated/50 flex items-start gap-4">
        <div className="p-2 bg-brand/10 rounded-lg text-brand mt-0.5 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  description: string;
  defaultChecked?: boolean;
}

function Toggle({ label, description, defaultChecked = false }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary mt-0.5">{description}</p>
      </div>
      <button 
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg-base ${checked ? 'bg-brand' : 'bg-border-default'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand" />
            Platform Settings
          </h1>
          <p className="text-sm text-text-secondary mt-1">Configure your workspace and global preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {saved && (
              <motion.span 
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="text-sm text-status-success flex items-center gap-1.5 font-medium"
              >
                <CheckCircle2 className="w-4 h-4" /> Saved
              </motion.span>
            )}
          </AnimatePresence>
          <Button onClick={handleSave} isLoading={isSaving} disabled={saved}>
            {!isSaving && !saved && <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Organization */}
        <Section title="Organization Details" description="Manage your company info and localization settings." icon={Building}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Company Name</label>
              <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Support Email</label>
              <input type="email" defaultValue="support@acme.inc" className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Timezone</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand appearance-none">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Default Locale</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand appearance-none">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Domain */}
        <Section title="Custom Domain" description="Configure your white-label dashboard URL." icon={Globe}>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full">
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Dashboard URL</label>
              <div className="flex items-center">
                <span className="px-4 py-2.5 bg-bg-elevated border border-r-0 border-border-subtle rounded-l-xl text-sm text-text-muted select-none">https://</span>
                <input type="text" defaultValue="dashboard.acme.inc" className="w-full px-4 py-2.5 rounded-r-xl border border-border-subtle bg-bg-base text-sm focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>
            <Button variant="secondary" className="shrink-0">Verify Domain</Button>
          </div>
          <div className="bg-status-warning/10 border border-status-warning/20 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-status-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-status-warning">Verification Pending</p>
              <p className="text-xs text-status-warning/80 mt-1">Please add the required CNAME records to your DNS provider to verify ownership.</p>
            </div>
          </div>
        </Section>

        {/* Authentication */}
        <Section title="Authentication & Security" description="Control how users log into your workspace." icon={Lock}>
          <div className="space-y-6">
            <Toggle label="Enable SSO (Single Sign-On)" description="Allow users to login via your identity provider." defaultChecked={true} />
            <hr className="border-border-subtle" />
            <Toggle label="SAML Enforcement" description="Require all users to authenticate via SAML." defaultChecked={false} />
            <hr className="border-border-subtle" />
            <Toggle label="Require MFA" description="Force multi-factor authentication for all workspace admins." defaultChecked={true} />
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" description="Manage email and system alerts." icon={Bell}>
          <div className="space-y-6">
            <Toggle label="System Alerts" description="Receive emails about critical platform updates and downtime." defaultChecked={true} />
            <hr className="border-border-subtle" />
            <Toggle label="Billing Notifications" description="Invoices, payment failures, and threshold warnings." defaultChecked={true} />
            <hr className="border-border-subtle" />
            <Toggle label="Weekly Digest" description="Receive a weekly summary of tenant growth and active users." defaultChecked={false} />
          </div>
        </Section>

        {/* Webhooks */}
        <Section title="Webhooks" description="Send real-time events to your own servers." icon={Webhook}>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full">
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">Endpoint URL</label>
              <input type="url" defaultValue="https://api.acme.inc/webhooks/prism" className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <Button variant="secondary" className="shrink-0">
              <Send className="w-4 h-4 mr-2" /> Test
            </Button>
          </div>
        </Section>

        {/* Danger Zone */}
        <div className="bg-status-error/5 border border-status-error/20 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-status-error flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-status-error/10">
            <div>
              <p className="text-sm font-bold text-text-primary">Reset Configuration</p>
              <p className="text-xs text-text-secondary mt-1">Revert all settings back to default. This cannot be undone.</p>
            </div>
            <Button variant="outline" className="text-text-primary border-status-error/30 hover:bg-status-error/10 hover:text-status-error shrink-0">
              Reset Defaults
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-status-error">Delete Workspace</p>
              <p className="text-xs text-status-error/80 mt-1">Permanently delete your workspace, all tenants, and data.</p>
            </div>
            <Button className="bg-status-error hover:bg-status-error/90 text-white shrink-0 shadow-none">
              Delete Workspace
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
