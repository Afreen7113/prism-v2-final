"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter, ChevronDown, X, Check, Search, RotateCcw,
  SlidersHorizontal, Tag, MapPin, DollarSign, Star, Zap
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["Analytics", "Marketing", "Sales", "Engineering", "Finance", "Operations", "HR", "Product"];
const REGIONS = ["North America", "Europe", "APAC", "LATAM"];
const PLANS = ["Starter", "Pro", "Business", "Enterprise"];
const RATINGS = [1, 2, 3, 4, 5];

interface Filters {
  search: string;
  categories: string[];
  regions: string[];
  plans: string[];
  minRating: number;
  minMRR: number;
  maxMRR: number;
  dateRange: "all" | "7d" | "30d" | "90d";
  activeOnly: boolean;
  verified: boolean;
}

const defaultFilters: Filters = {
  search: "",
  categories: [],
  regions: [],
  plans: [],
  minRating: 0,
  minMRR: 0,
  maxMRR: 10000,
  dateRange: "all",
  activeOnly: false,
  verified: false,
};

const seed = (n: number) => { const x = Math.sin(n) * 10000; return x - Math.floor(x); };

const NAMES = ["Acme Corp", "Globex Inc", "Initech", "Umbrella Ltd", "Stark Industries", "Wayne Enterprises", "Oscorp", "Cyberdyne", "Weyland-Yutani", "Soylent Corp", "Multi Corp", "Hooli", "Aviato", "Pied Piper", "Raviga Capital", "Bream-Hall", "Nucleus", "EndFrame"];

const generateItems = () =>
  Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    name: NAMES[i % NAMES.length],
    category: CATEGORIES[Math.floor(seed(i * 3) * CATEGORIES.length)],
    region: REGIONS[Math.floor(seed(i * 7) * REGIONS.length)],
    plan: PLANS[Math.floor(seed(i * 5) * PLANS.length)],
    mrr: Math.round(seed(i * 11) * 9800 + 200),
    rating: Math.round(seed(i * 13) * 4) + 1,
    active: seed(i * 17) > 0.25,
    verified: seed(i * 19) > 0.4,
    joined: new Date(2021, Math.floor(seed(i * 23) * 12), Math.floor(seed(i * 29) * 28) + 1),
  }));

type FilterKey = keyof Filters;

function MultiSelect({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${selected.length > 0 ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-surface border-border-subtle text-text-secondary hover:text-text-brand"}`}
      >
        {label} {selected.length > 0 && <span className="bg-brand text-text-on-primary w-4 h-4 rounded-full flex items-center justify-center text-[9px]">{selected.length}</span>}
        <ChevronDown className="w-3 h-3" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.96 }}
            className="absolute top-full left-0 mt-1.5 z-50 bg-bg-surface border border-border-subtle rounded-xl shadow-card p-2 min-w-[160px]"
          >
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => onToggle(opt)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium text-text-secondary hover:text-text-brand hover:bg-bg-elevated transition-colors gap-4"
              >
                {opt}
                {selected.includes(opt) && <Check className="w-3.5 h-3.5 text-brand" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FiltersPage() {
  const allItems = generateItems();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const set = <K extends FilterKey>(key: K, val: Filters[K]) =>
    setFilters(prev => ({ ...prev, [key]: val }));

  const toggleArr = (key: "categories" | "regions" | "plans", val: string) =>
    setFilters(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(val)
        ? (prev[key] as string[]).filter(v => v !== val)
        : [...(prev[key] as string[]), val],
    }));

  const reset = () => setFilters(defaultFilters);

  const activeCount = [
    filters.search,
    ...filters.categories,
    ...filters.regions,
    ...filters.plans,
    filters.minRating > 0,
    filters.minMRR > 0,
    filters.maxMRR < 10000,
    filters.dateRange !== "all",
    filters.activeOnly,
    filters.verified,
  ].filter(Boolean).length;

  const results = allItems.filter(item => {
    if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase()) && !item.category.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.categories.length && !filters.categories.includes(item.category)) return false;
    if (filters.regions.length && !filters.regions.includes(item.region)) return false;
    if (filters.plans.length && !filters.plans.includes(item.plan)) return false;
    if (item.rating < filters.minRating) return false;
    if (item.mrr < filters.minMRR || item.mrr > filters.maxMRR) return false;
    if (filters.activeOnly && !item.active) return false;
    if (filters.verified && !item.verified) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-brand font-sans">
      {/* Header */}
      <header className="border-b border-border-subtle bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-text-secondary hover:text-text-brand text-sm transition-colors">← Back</Link>
            <div className="w-px h-4 bg-border-subtle" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                <Filter className="w-4 h-4 text-brand" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-brand">Filters</h1>
                <p className="text-[10px] text-text-secondary">Advanced filter controls</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
  <span className="text-[10px] font-semibold text-brand bg-brand/10 border border-brand/20 px-2 py-1 rounded-full">
    {results.length} results
  </span>
  {activeCount > 0 && (
              <span className="text-[10px] font-semibold text-brand bg-brand/10 border border-brand/20 px-2 py-1 rounded-full">{activeCount} filters active</span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Filter Bar */}
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-brand">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand" /> Filters
            </div>
            {activeCount > 0 && (
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-status-error transition-colors ml-auto">
                <RotateCcw className="w-3 h-3" /> Reset all
              </button>
            )}
          </div>

          {/* Top row filters */}
          <div className="flex flex-wrap gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
              <input
                value={filters.search}
                onChange={e => set("search", e.target.value)}
                placeholder="Search name or category..."
                className="pl-9 pr-3 py-2 text-xs bg-bg-elevated border border-border-subtle rounded-xl text-text-brand placeholder-text-secondary focus:outline-none focus:border-brand/50 transition-colors w-52"
              />
            </div>

            {/* Multi-selects */}
            <MultiSelect label="Category" options={CATEGORIES} selected={filters.categories} onToggle={v => toggleArr("categories", v)} />
            <MultiSelect label="Region" options={REGIONS} selected={filters.regions} onToggle={v => toggleArr("regions", v)} />
            <MultiSelect label="Plan" options={PLANS} selected={filters.plans} onToggle={v => toggleArr("plans", v)} />

            {/* Date Range */}
            <div className="flex gap-1">
              {(["all", "7d", "30d", "90d"] as const).map(d => (
                <button
                  key={d}
                  onClick={() => set("dateRange", d)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${filters.dateRange === d ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-elevated border-border-subtle text-text-secondary hover:text-text-brand"}`}
                >
                  {d === "all" ? "All time" : d}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* MRR Range */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-xs text-text-secondary">MRR</span>
              <input
                type="range" min={0} max={10000} step={200}
                value={filters.minMRR}
                onChange={e => set("minMRR", Number(e.target.value))}
                className="w-24 accent-primary"
              />
              <span className="text-xs text-text-brand font-semibold">${filters.minMRR}+</span>
            </div>

            {/* Min Rating */}
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-xs text-text-secondary">Min rating</span>
              <div className="flex gap-1">
                {RATINGS.map(r => (
                  <button key={r} onClick={() => set("minRating", r === filters.minRating ? 0 : r)}>
                    <Star className={`w-4 h-4 transition-colors ${r <= filters.minRating ? "text-status-warning fill-amber-400" : "text-border-default"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <label className="flex items-center gap-2 cursor-pointer">
  <button
    type="button"
    aria-label="Toggle active only"
    onClick={() => set("activeOnly", !filters.activeOnly)}
                className={`w-8 h-4 rounded-full transition-colors relative ${filters.activeOnly ? "bg-brand" : "bg-border-default"}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-bg-base rounded-full shadow transition-all ${filters.activeOnly ? "left-4.5 translate-x-0.5" : "left-0.5"}`} />
              </button>
              <span className="text-xs text-text-secondary">Active only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
  <button
    type="button"
    aria-label="Toggle verified only"
    onClick={() => set("verified", !filters.verified)}
    className={`w-8 h-4 rounded-full relative transition-colors ${filters.verified ? "bg-status-success" : "bg-border-default"}`}
  >
    <div className={`absolute top-0.5 w-3 h-3 bg-bg-base rounded-full shadow transition-all ${filters.verified ? "left-4.5 translate-x-0.5" : "left-0.5"}`} />
  </button>
              <span className="text-xs text-text-secondary">Verified only</span>
            </label>
          </div>

          {/* Active filter chips */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-semibold text-brand">
                  <Search className="w-2.5 h-2.5" /> {filters.search}
                  <button onClick={() => set("search", "")}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
              {[...filters.categories, ...filters.regions, ...filters.plans].map(chip => (
                <span key={chip} className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-semibold text-brand">
                  <Tag className="w-2.5 h-2.5" /> {chip}
                  <button onClick={() => {
                    if (filters.categories.includes(chip)) toggleArr("categories", chip);
                    else if (filters.regions.includes(chip)) toggleArr("regions", chip);
                    else toggleArr("plans", chip);
                  }}><X className="w-2.5 h-2.5" /></button>
                </span>
              ))}
              {filters.minMRR > 0 && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-semibold text-brand">
                  <DollarSign className="w-2.5 h-2.5" /> MRR ${filters.minMRR}+
                  <button onClick={() => set("minMRR", 0)}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-semibold text-brand">
                  <Star className="w-2.5 h-2.5" /> {filters.minRating}★+
                  <button onClick={() => set("minRating", 0)}><X className="w-2.5 h-2.5" /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div>
          <p className="text-xs text-text-secondary mb-4 font-semibold">{results.length} companies match your filters</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {results.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.02 }}
                  className="bg-bg-surface border border-border-subtle rounded-2xl p-4 hover:border-brand/30 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="text-sm font-bold text-text-brand">{item.name}</h3>
                        {item.verified && <Zap className="w-3 h-3 text-status-warning fill-warning" />}
                      </div>
                      <p className="text-[10px] text-text-secondary flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {item.region}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${item.active ? "text-status-success bg-status-success/10 border-success/20" : "text-text-muted bg-bg-elevated border-border-subtle"}`}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {RATINGS.map(r => (
                      <Star key={r} className={`w-3 h-3 ${r <= item.rating ? "text-status-warning fill-warning" : "text-border-default"}`} />
                    ))}
                    <span className="text-[10px] text-text-secondary ml-1">{item.rating}.0</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
                    <div>
                      <p className="text-[9px] text-text-secondary">MRR</p>
                      <p className="text-sm font-bold text-text-brand">${item.mrr.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                        item.plan === "Enterprise" ? "text-status-warning bg-status-warning/10 border-warning/20" :
                        item.plan === "Business" ? "text-brand bg-brand/10 border-brand/20" :
                        item.plan === "Pro" ? "text-brand bg-brand/10 border-brand/20" :
                        "text-text-muted bg-bg-elevated border-border-subtle"
                      }`}>{item.plan}</span>
                      <p className="text-[9px] text-text-secondary mt-0.5">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {results.length === 0 && (
            <div className="text-center py-24 text-text-muted">
              <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-sm">No results match your filters</p>
              <button onClick={reset} className="mt-3 text-xs text-brand hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
