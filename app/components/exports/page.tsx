"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileDown, Download, File, FileText, Code2,
  CheckCircle2, Clock, AlertCircle, RefreshCw,
  Table, Database, CloudDownload
} from "lucide-react";
import Link from "next/link";

type ExportStatus = "idle" | "generating" | "ready" | "error";
type ExportFormat = "csv" | "pdf" | "api" | "excel" | "json";

interface ExportJob {
  id: string;
  name: string;
  format: ExportFormat;
  rows: number;
  status: "completed" | "failed";
  size: string;
  created: string;
}

const RECENT_EXPORTS: ExportJob[] = [
  { id: "ex-001", name: "Customer Revenue Q2 2024", format: "csv", rows: 12_847, status: "completed", size: "2.4 MB", created: "2 min ago" },
  { id: "ex-002", name: "Monthly Executive Report", format: "pdf", rows: 0, status: "completed", size: "1.8 MB", created: "1 hr ago" },
  { id: "ex-003", name: "API Telemetry Dump", format: "json", rows: 48_921, status: "completed", size: "18.2 MB", created: "3 hr ago" },
  { id: "ex-004", name: "Cohort Analysis Export", format: "excel", rows: 5_230, status: "failed", size: "—", created: "5 hr ago" },
  { id: "ex-005", name: "Product Usage Summary", format: "csv", rows: 9_012, status: "completed", size: "1.1 MB", created: "Yesterday" },
  { id: "ex-006", name: "Churn Prediction Model Data", format: "json", rows: 24_500, status: "completed", size: "8.7 MB", created: "Yesterday" },
];

const FORMAT_META: Record<ExportFormat, { icon: React.ElementType; label: string; desc: string; color: string; bg: string }> = {
  csv: { icon: Table, label: "CSV", desc: "Comma-separated values for spreadsheets", color: "text-status-success", bg: "bg-status-success/10 border-success/20" },
  pdf: { icon: FileText, label: "PDF", desc: "Formatted report ready to share or print", color: "text-status-error", bg: "bg-status-error/10 border-error/20" },
  api: { icon: Code2, label: "REST API", desc: "Stream data via authenticated endpoint", color: "text-brand", bg: "bg-brand/10 border-brand/20" },
  excel: { icon: File, label: "Excel", desc: "Native .xlsx with formulas & charts", color: "text-status-warning", bg: "bg-status-warning/10 border-warning/20" },
  json: { icon: Database, label: "JSON", desc: "Raw structured data for developers", color: "text-info", bg: "bg-info/10 border-info/20" },
};

const DATASETS = [
  { id: "customers", label: "Customers", count: "48,291 rows" },
  { id: "revenue", label: "Revenue", count: "12 months" },
  { id: "events", label: "Event Logs", count: "2.1M events" },
  { id: "cohorts", label: "Cohort Analysis", count: "36 cohorts" },
  { id: "retention", label: "Retention Rates", count: "24 months" },
];

const API_SNIPPET = `curl -X GET https://api.prism.io/v1/export \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset": "customers",
    "format": "json",
    "filters": { "status": "active" },
    "limit": 10000
  }'`;

export default function ExportsPage() {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("csv");
  const [selectedDataset, setSelectedDataset] = useState("customers");
  const [exportStatus, setExportStatus] = useState<ExportStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [dateFilter, setDateFilter] = useState("last30");
  const [compression, setCompression] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleExport = () => {
    setExportStatus("generating");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4;
      setProgress(Math.min(p, 99));
      if (p >= 99) {
        clearInterval(interval);
        setTimeout(() => { setProgress(100); setExportStatus("ready"); }, 400);
      }
    }, 200);
  };

  const handleReset = () => { setExportStatus("idle"); setProgress(0); };

  const copyApiKey = () => {
    navigator.clipboard.writeText("prism_live_sk_a7b3c9d2e1f0g4h5i6j7k8").catch(() => {});
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const fmt = FORMAT_META[selectedFormat];
  const FmtIcon = fmt.icon;

  return (
    <div className="min-h-screen bg-bg-base text-text-brand font-sans">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-text-muted hover:text-text-brand text-sm transition-colors">← Back</Link>
            <div className="w-px h-4 bg-border-subtle" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-status-success/10 border border-success/20 flex items-center justify-center">
                <FileDown className="w-4 h-4 text-status-success" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-brand">Exports</h1>
                <p className="text-[10px] text-text-secondary">CSV · PDF · REST API · Excel · JSON</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-status-success bg-status-success/10 border border-success/20 px-2 py-1 rounded-full">5 formats</span>
            <span className="text-[10px] font-semibold text-brand bg-brand/10 border border-brand/20 px-2 py-1 rounded-full">{RECENT_EXPORTS.filter(e => e.status === "completed").length} recent exports</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Main Export Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Format Selector */}
            <div className="bg-bg-surface border border-border-subtle rounded-2xl p-5">
              <h2 className="text-sm font-bold text-text-brand mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-status-success" /> Choose Export Format
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.keys(FORMAT_META) as ExportFormat[]).map(f => {
                  const { icon: Icon, label, color, bg } = FORMAT_META[f];
                  return (
                    <button
                      key={f}
                      onClick={() => setSelectedFormat(f)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        selectedFormat === f ? `${bg} border-current ${color} shadow-sm` : "bg-bg-elevated border-border-subtle text-text-muted hover:text-text-brand hover:border-border-default"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-bold">{label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-text-secondary mt-3">{fmt.desc}</p>
            </div>

            {/* Dataset + Options */}
            {selectedFormat !== "api" ? (
              <div className="bg-bg-surface border border-border-subtle rounded-2xl p-5 space-y-4">
                <h2 className="text-sm font-bold text-text-brand flex items-center gap-2">
                  <Database className="w-4 h-4 text-brand" /> Dataset & Options
                </h2>
                {/* Dataset */}
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 block">Dataset</label>
                  <div className="flex flex-wrap gap-2">
                    {DATASETS.map(ds => (
                      <button
                        key={ds.id}
                        onClick={() => setSelectedDataset(ds.id)}
                        className={`flex flex-col items-start px-3 py-2 rounded-xl border text-xs transition-all ${selectedDataset === ds.id ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-elevated border-border-subtle text-text-secondary hover-semantic-surface"}`}
                      >
                        <span className="font-semibold">{ds.label}</span>
                        <span className="text-[9px] text-text-secondary">{ds.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 block">Date Range</label>
                  <div className="flex flex-wrap gap-2">
                    {[["last7", "Last 7d"], ["last30", "Last 30d"], ["last90", "Last 90d"], ["ytd", "Year to Date"], ["all", "All Time"]].map(([v, l]) => (
                      <button key={v} onClick={() => setDateFilter(v)} className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${dateFilter === v ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-elevated border-border-subtle text-text-muted hover:text-text-brand"}`}>{l}</button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="flex flex-wrap gap-4">
                  {selectedFormat === "csv" && (
                    <label className="flex items-center gap-2 cursor-pointer">
  <button
    type="button"
    aria-label="Toggle include headers"
    onClick={() => setIncludeHeaders(!includeHeaders)}
    className={`w-8 h-4 rounded-full relative transition-colors ${
      includeHeaders ? "bg-brand" : "bg-border-default"
    }`}
  >
    <div className={`absolute top-0.5 w-3 h-3 bg-bg-base rounded-full shadow transition-all ${includeHeaders ? "left-4" : "left-0.5"}`} />
                      </button>
                      <span className="text-xs text-text-secondary">Include headers</span>
                    </label>
                  )}
                  <label className="flex items-center gap-2 cursor-pointer">
  <button
    type="button"
    aria-label="Toggle compression"
    onClick={() => setCompression(!compression)} className={`w-8 h-4 rounded-full relative transition-colors ${compression ? "bg-brand" : "bg-border-default"}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-bg-base rounded-full shadow transition-all ${compression ? "left-4" : "left-0.5"}`} />
                    </button>
                    <span className="text-xs text-text-secondary">Compress (.zip)</span>
                  </label>
                </div>
              </div>
            ) : (
              /* API Tab */
              <div className="bg-bg-surface border border-border-subtle rounded-2xl p-5 space-y-4">
                <h2 className="text-sm font-bold text-text-brand flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-brand" /> REST API Access
                </h2>
                <div className="bg-bg-elevated border border-border-subtle rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Your API Key</p>
                    <button onClick={copyApiKey} className={`text-[10px] font-semibold transition-colors ${copiedKey ? "text-status-success" : "text-brand hover:text-brand/80"}`}>
                      {copiedKey ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-text-brand tracking-wider">prism_live_sk_a7b3c9d2e1f0g4h5i6j7k8</p>
                </div>
                <div className="bg-bg-base rounded-xl border border-border-subtle overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle bg-bg-elevated">
                    <div className="w-2 h-2 rounded-full bg-status-error" />
                    <div className="w-2 h-2 rounded-full bg-status-warning" />
                    <div className="w-2 h-2 rounded-full bg-status-success" />
                    <span className="text-[10px] text-text-secondary ml-2 font-mono">Terminal</span>
                  </div>
                  <pre className="p-4 text-[11px] font-mono text-status-success overflow-x-auto leading-relaxed">{API_SNIPPET}</pre>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[["Rate Limit", "10k req/hr"], ["Avg Latency", "~120ms"], ["Uptime SLA", "99.99%"]].map(([k, v]) => (
                    <div key={k} className="bg-bg-elevated border border-border-subtle rounded-xl p-3">
                      <p className="text-[9px] text-text-secondary">{k}</p>
                      <p className="text-sm font-bold text-text-brand">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Export Button + Status */}
          <div className="space-y-4">
            {/* Export CTA */}
            {selectedFormat !== "api" && (
              <div className="bg-bg-surface border border-border-subtle rounded-2xl p-5 text-center">
                <div className={`w-16 h-16 rounded-2xl ${fmt.bg} border flex items-center justify-center mx-auto mb-4`}>
                  <FmtIcon className={`w-8 h-8 ${fmt.color}`} />
                </div>
                <h3 className="text-sm font-bold text-text-brand mb-1">{fmt.label} Export</h3>
                <p className="text-xs text-text-muted mb-4">{DATASETS.find(d => d.id === selectedDataset)?.label} · {DATASETS.find(d => d.id === selectedDataset)?.count}</p>

                <AnimatePresence mode="wait">
                  {exportStatus === "idle" && (
                    <motion.button
                      key="idle"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={handleExport}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand text-text-on-primary rounded-xl font-semibold text-sm hover:bg-brand/90 transition-colors shadow-md"
                    >
                      <CloudDownload className="w-4 h-4" /> Generate Export
                    </motion.button>
                  )}
                  {exportStatus === "generating" && (
                    <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand" /> Generating your export…
                      </div>
                      <div className="w-full bg-bg-elevated rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand to-success rounded-full"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-text-muted">{Math.round(progress)}%</p>
                    </motion.div>
                  )}
                  {exportStatus === "ready" && (
                    <motion.div key="ready" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-status-success text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" /> Export ready!
                      </div>
                      <a
                        href="#"
                        download
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-status-success text-text-on-primary rounded-xl font-semibold text-sm hover:bg-status-success/90 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Download {fmt.label}
                      </a>
                      <button onClick={handleReset} className="w-full text-xs text-text-muted hover:text-text-brand transition-colors">
                        New export
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Stats */}
            <div className="bg-bg-surface border border-border-subtle rounded-2xl p-4 space-y-3">
              <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Export Stats</h3>
              {[
                { label: "Total exports this month", value: "247" },
                { label: "Data exported", value: "4.8 GB" },
                { label: "Avg export time", value: "3.2s" },
                { label: "Success rate", value: "99.2%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{label}</span>
                  <span className="text-xs font-bold text-text-brand">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Exports Table */}
        <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
            <h2 className="text-sm font-bold text-text-brand">Recent Exports</h2>
            <button className="text-xs text-brand hover:text-brand/80 transition-colors font-semibold">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-elevated/50">
                  {["Name", "Format", "Rows", "Status", "Size", "Created", ""].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-text-secondary uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_EXPORTS.map((job, i) => {
                  const { icon: Icon, color, bg } = FORMAT_META[job.format];
                  return (
                    <motion.tr
                      key={job.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated/20 transition-colors"
                    >
                      <td className="px-5 py-3 font-semibold text-text-brand">{job.name}</td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded-full border text-[9px] font-bold ${bg} ${color}`}>
                          <Icon className="w-2.5 h-2.5" /> {job.format.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-text-secondary font-mono">{job.rows > 0 ? job.rows.toLocaleString() : "—"}</td>
                      <td className="px-5 py-3">
                        {job.status === "completed" ? (
                          <span className="flex items-center gap-1 text-status-success text-[10px] font-semibold"><CheckCircle2 className="w-3 h-3" /> Completed</span>
                        ) : (
                          <span className="flex items-center gap-1 text-status-error text-[10px] font-semibold"><AlertCircle className="w-3 h-3" /> Failed</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-text-secondary font-mono">{job.size}</td>
                      <td className="px-5 py-3 text-text-secondary flex items-center gap-1 whitespace-nowrap"><Clock className="w-2.5 h-2.5" /> {job.created}</td>
                      <td className="px-5 py-3">
                        {job.status === "completed" && (
                          <button className="flex items-center gap-1 text-brand hover:text-brand/80 transition-colors font-semibold text-[10px]">
                            <Download className="w-3 h-3" /> Download
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
