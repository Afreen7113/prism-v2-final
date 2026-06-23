"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp, ChevronDown, ChevronsUpDown, Search,
  Download, Filter as FilterIcon, RefreshCw, Table, ChevronLeft, ChevronRight, Eye, Trash2, Edit3
} from "lucide-react";
import Link from "next/link";

type SortDir = "asc" | "desc" | null;

const STATUSES = ["Active", "Pending", "Inactive", "Suspended"] as const;
type Status = typeof STATUSES[number];

interface Row {
  id: number;
  name: string;
  email: string;
  plan: string;
  mrr: number;
  status: Status;
  joined: string;
  region: string;
}

const STATUS_COLOR: Record<Status, string> = {
  Active: "text-status-success bg-status-success/10 border-success/20",
  Pending: "text-status-warning bg-status-warning/10 border-warning/20",
  Inactive: "text-text-muted bg-bg-elevated border-border-subtle",
  Suspended: "text-status-error bg-status-error/10 border-error/20",
};

const PLANS = ["Starter", "Pro", "Business", "Enterprise"];
const REGIONS = ["North America", "Europe", "APAC", "LATAM", "Middle East"];
const FIRST = ["Alex", "Sarah", "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Lucas", "Isabella", "Mason", "Mia", "Ethan", "Charlotte"];
const LAST = ["Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Lee", "Harris"];

const seed = (n: number) => {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
};

const generateData = (): Row[] =>
  Array.from({ length: 80 }, (_, i) => {
    const first = FIRST[Math.floor(seed(i * 3 + 1) * FIRST.length)];
    const last = LAST[Math.floor(seed(i * 3 + 2) * LAST.length)];
    return {
      id: 1000 + i,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@company.io`,
      plan: PLANS[Math.floor(seed(i * 3 + 3) * PLANS.length)],
      mrr: Math.round(seed(i * 5 + 4) * 4800 + 200),
      status: STATUSES[Math.floor(seed(i * 7 + 5) * STATUSES.length)],
      joined: new Date(2022, Math.floor(seed(i * 3 + 6) * 12), Math.floor(seed(i * 2 + 7) * 28) + 1).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      region: REGIONS[Math.floor(seed(i * 11 + 8) * REGIONS.length)],
    };
  });

const COLUMNS = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: false },
  { key: "plan", label: "Plan", sortable: true },
  { key: "mrr", label: "MRR", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "region", label: "Region", sortable: true },
  { key: "joined", label: "Joined", sortable: false },
];

const PAGE_SIZE = 10;

export default function TablesPage() {
  const [data] = useState<Row[]>(generateData);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>("mrr");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [filterPlan, setFilterPlan] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let rows = [...data];
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.region.toLowerCase().includes(q));
    }
    if (filterStatus !== "All") rows = rows.filter(r => r.status === filterStatus);
    if (filterPlan !== "All") rows = rows.filter(r => r.plan === filterPlan);
    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey as keyof Row];
        const bv = b[sortKey as keyof Row];
        const cmp = typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, filterStatus, filterPlan, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === pageData.length) setSelected(new Set());
    else setSelected(new Set(pageData.map(r => r.id)));
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-text-muted" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-brand" /> : <ChevronDown className="w-3 h-3 text-brand" />;
  };

  const totalMRR = filtered.reduce((sum, r) => sum + r.mrr, 0);

  return (
    <div className="min-h-screen bg-bg-base text-text-brand font-sans">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-text-muted hover:text-text-brand text-sm transition-colors">← Back</Link>
            <div className="w-px h-4 bg-border-subtle" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                <Table className="w-4 h-4 text-brand" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-brand">Tables</h1>
                <p className="text-[10px] text-text-muted">Sortable & filterable data grid</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-brand bg-brand/10 border border-brand/20 px-2 py-1 rounded-full">{filtered.length} rows</span>
            <span className="text-[10px] font-semibold text-status-success bg-status-success/10 border border-success/20 px-2 py-1 rounded-full">MRR ${totalMRR.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search customers..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-bg-surface border border-border-subtle rounded-xl text-text-brand placeholder-text-muted focus:outline-none focus:border-brand/50 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-brand">{selected.size} selected</span>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-status-error bg-status-error/10 border border-error/20 rounded-lg hover:bg-status-error/20 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </motion.div>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${showFilters ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-surface border-border-subtle text-text-secondary hover:text-text-brand"}`}
            >
              <FilterIcon className="w-3.5 h-3.5" /> Filters
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border bg-bg-surface border-border-subtle text-text-secondary hover:text-text-brand transition-all">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border bg-bg-surface border-border-subtle text-text-secondary hover:text-text-brand transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-bg-surface border border-border-subtle rounded-2xl p-4 flex flex-wrap gap-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">Status</label>
                <div className="flex gap-2 flex-wrap">
                  {["All", ...STATUSES].map(s => (
                    <button
                      key={s}
                      onClick={() => { setFilterStatus(s as Status | "All"); setPage(1); }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${filterStatus === s ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-elevated border-border-subtle text-text-muted hover:text-text-brand"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">Plan</label>
                <div className="flex gap-2 flex-wrap">
                  {["All", ...PLANS].map(p => (
                    <button
                      key={p}
                      onClick={() => { setFilterPlan(p); setPage(1); }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${filterPlan === p ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-elevated border-border-subtle text-text-muted hover:text-text-brand"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="bg-bg-surface border border-border-subtle rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-elevated/50">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selected.size === pageData.length && pageData.length > 0}
                      onChange={toggleAll}
                      className="w-3.5 h-3.5 accent-primary"
                    />
                  </th>
                  {COLUMNS.map(col => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && toggleSort(col.key)}
                      className={`px-4 py-3 text-left font-semibold text-text-muted uppercase tracking-widest text-[10px] whitespace-nowrap ${col.sortable ? "cursor-pointer hover:text-text-brand select-none" : ""}`}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {col.sortable && <SortIcon col={col.key} />}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-semibold text-text-muted uppercase tracking-widest text-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {pageData.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`border-b border-border-subtle last:border-0 hover:bg-bg-elevated/30 transition-colors ${selected.has(row.id) ? "bg-brand/5" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => toggleSelect(row.id)}
                          className="w-3.5 h-3.5 accent-primary"
                        />
                      </td>
                      <td className="px-4 py-3 text-text-muted font-mono">#{row.id}</td>
                      <td className="px-4 py-3 font-semibold text-text-brand whitespace-nowrap">{row.name}</td>
                      <td className="px-4 py-3 text-text-secondary truncate max-w-[160px]">{row.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
                          row.plan === "Enterprise" ? "text-status-warning bg-status-warning/10 border-warning/20" :
                          row.plan === "Business" ? "text-brand bg-brand/10 border-brand/20" :
                          row.plan === "Pro" ? "text-brand bg-brand/10 border-brand/20" :
                          "text-text-muted bg-bg-elevated border-border-subtle"
                        }`}>{row.plan}</span>
                      </td>
                      <td className="px-4 py-3 font-bold text-text-brand">${row.mrr.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${STATUS_COLOR[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{row.region}</td>
                      <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{row.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1 rounded-lg text-text-muted hover:text-brand hover:bg-brand/10 transition-all"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1 rounded-lg text-text-muted hover:text-brand hover:bg-brand/10 transition-all"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button className="p-1 rounded-lg text-text-muted hover:text-status-error hover:bg-status-error/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border-subtle">
            <span className="text-[11px] text-text-muted">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-brand hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pg = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page + i - 2;
                if (pg < 1 || pg > totalPages) return null;
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold border transition-all ${pg === page ? "bg-brand text-text-on-primary border-brand" : "border-border-subtle text-text-muted hover:text-text-brand hover:bg-bg-elevated"}`}
                  >
                    {pg}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-brand hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
