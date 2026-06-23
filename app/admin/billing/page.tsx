import React from 'react';

export default function BillingPage() {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold text-text-primary">Usage & Billing</h2>
        <p className="text-text-secondary text-sm mt-1">Monitor API usage, dashboards, and billing tiers.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border border-border-subtle rounded-2xl bg-bg-surface shadow-sm">
          <h3 className="text-text-secondary text-sm font-bold mb-2">Current Tier</h3>
          <p className="text-2xl font-bold text-brand">Enterprise</p>
        </div>
        <div className="p-6 border border-border-subtle rounded-2xl bg-bg-surface shadow-sm">
          <h3 className="text-text-secondary text-sm font-bold mb-2">API Usage</h3>
          <p className="text-2xl font-bold text-text-primary">1.2M / 2.0M</p>
          <p className="text-text-muted text-xs mt-1 font-semibold">Requests this month</p>
        </div>
        <div className="p-6 border border-border-subtle rounded-2xl bg-bg-surface shadow-sm">
          <h3 className="text-text-secondary text-sm font-bold mb-2">Active Dashboards</h3>
          <p className="text-2xl font-bold text-text-primary">14 / 20</p>
        </div>
      </div>

      {/* Chart Mockup */}
      <div className="p-6 border border-border-subtle rounded-2xl bg-bg-surface shadow-sm">
        <h3 className="font-bold text-text-primary mb-4">API Usage Over Time</h3>
        <div className="h-64 flex items-end gap-2 border-b border-l border-border-subtle p-4 pb-0 pt-8">
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '40%' }}></div>
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '60%' }}></div>
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '35%' }}></div>
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '80%' }}></div>
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '50%' }}></div>
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '90%' }}></div>
          <div className="w-full bg-brand/80 hover:bg-brand transition-colors rounded-t-md" style={{ height: '70%' }}></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold tracking-wider uppercase text-text-muted mt-3">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
