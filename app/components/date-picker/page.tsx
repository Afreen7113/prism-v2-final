"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, ChevronLeft, ChevronRight, Check,
  Clock, Zap, X
} from "lucide-react";
import Link from "next/link";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Yesterday", days: -1 },
  { label: "Last 7 days", days: -7 },
  { label: "Last 30 days", days: -30 },
  { label: "Last 90 days", days: -90 },
  { label: "This month", type: "month" as const },
  { label: "Last month", type: "lastMonth" as const },
  { label: "This year", type: "year" as const },
  { label: "All time", type: "all" as const },
];

type Granularity = "hour" | "day" | "week" | "month";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isBetween(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date > start && date < end;
}
function formatDate(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

// Fake metrics data (changes with date range)
function getMetrics(start: Date | null, end: Date | null) {
  if (!start) return null;
  const days = end ? Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000)) : 1;
  return {
    sessions: Math.round(days * 1247 + Math.random() * 500),
    revenue: Math.round(days * 843 + Math.random() * 300),
    signups: Math.round(days * 38 + Math.random() * 20),
    avgSession: `${2 + Math.floor(days / 10)}m ${Math.floor(Math.random() * 60)}s`,
  };
}

export default function DatePickerPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState<Date | null>(addDays(today, -30));
  const [endDate, setEndDate] = useState<Date | null>(today);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end" | null>(null);
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [activePreset, setActivePreset] = useState("Last 30 days");
  const [showTime, setShowTime] = useState(false);
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);
  const [compareMode, setCompareMode] = useState(false);

  const metrics = getMetrics(startDate, endDate);

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setActivePreset(preset.label);
    const now = new Date(today);
    if ("days" in preset) {
      if (preset.days === 0) { setStartDate(new Date(today)); setEndDate(new Date(today)); }
      else if (preset.days === -1) {
        const y = addDays(today, -1);
        setStartDate(y); setEndDate(y);
      }
      else { setStartDate(addDays(today, preset.days as number)); setEndDate(new Date(today)); }
    } else if (preset.type === "month") {
      setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
      setEndDate(new Date(today));
    } else if (preset.type === "lastMonth") {
      setStartDate(new Date(now.getFullYear(), now.getMonth() - 1, 1));
      setEndDate(new Date(now.getFullYear(), now.getMonth(), 0));
    } else if (preset.type === "year") {
      setStartDate(new Date(now.getFullYear(), 0, 1));
      setEndDate(new Date(today));
    } else {
      setStartDate(new Date(2020, 0, 1));
      setEndDate(new Date(today));
    }
  };

  const handleDateClick = (date: Date) => {
    if (!selecting || selecting === "start") {
      setStartDate(date); setEndDate(null); setSelecting("end"); setActivePreset("");
    } else {
      if (date < startDate!) {
        setStartDate(date); setEndDate(startDate); 
      } else {
        setEndDate(date);
      }
      setSelecting(null); setActivePreset("");
    }
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const rangeEnd = selecting === "end" && hoverDate ? hoverDate : endDate;

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
                <Calendar className="w-4 h-4 text-brand" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-text-brand">Date Picker</h1>
                <p className="text-[10px] text-text-muted">Time range selector</p>
              </div>
            </div>
          </div>
          <div className="text-xs text-text-muted">
            {formatDate(startDate)} → {formatDate(endDate)}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Metrics Bar */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Sessions", value: metrics.sessions.toLocaleString(), change: "+12%" },
              { label: "Revenue", value: `$${metrics.revenue.toLocaleString()}`, change: "+8%" },
              { label: "Signups", value: metrics.signups.toLocaleString(), change: "+24%" },
              { label: "Avg Session", value: metrics.avgSession, change: "+5%" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-bg-surface border border-border-subtle rounded-2xl p-4"
              >
                <p className="text-[10px] text-text-muted mb-1">{m.label}</p>
                <p className="text-xl font-bold text-text-brand">{m.value}</p>
                <p className="text-[10px] text-status-success font-semibold mt-0.5">{m.change} vs previous period</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: Presets + Options */}
          <div className="lg:w-56 flex flex-col gap-3">
            {/* Presets */}
            <div className="bg-bg-surface border border-border-subtle rounded-2xl p-3">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Quick Select</p>
              <div className="flex flex-col gap-0.5">
                {PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${activePreset === preset.label ? "bg-brand/10 text-brand" : "text-text-secondary hover:text-text-brand hover:bg-bg-elevated"}`}
                  >
                    {preset.label}
                    {activePreset === preset.label && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="bg-bg-surface border border-border-subtle rounded-2xl p-3 space-y-3">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Options</p>

              <div>
                <p className="text-[10px] text-text-muted mb-1.5">Granularity</p>
                <div className="grid grid-cols-2 gap-1">
                  {(["hour", "day", "week", "month"] as Granularity[]).map(g => (
                    <button
                      key={g}
                      onClick={() => setGranularity(g)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold border transition-all capitalize ${granularity === g ? "bg-brand/10 border-brand/30 text-brand" : "bg-bg-elevated border-border-subtle text-text-muted hover:text-text-brand"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <button
  type="button"
  onClick={() => setShowTime(!showTime)}
  className={`w-8 h-4 rounded-full relative transition-colors ${
    showTime ? "bg-brand" : "bg-border-default"
  }`}
>
  <div
    className={`absolute top-0.5 w-3 h-3 bg-bg-base rounded-full shadow transition-all ${
      showTime ? "left-4" : "left-0.5"
    }`}
  />
</button>
                <span className="text-xs text-text-secondary">Time range</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <button
  type="button"
  onClick={() => setCompareMode(!compareMode)} className={`w-8 h-4 rounded-full relative transition-colors ${compareMode ? "bg-brand" : "bg-border-default"}`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-bg-base rounded-full shadow transition-all ${compareMode ? "left-4" : "left-0.5"}`} />
                </button>
                <span className="text-xs text-text-secondary">Compare periods</span>
              </label>
            </div>
          </div>

          {/* Right: Calendar */}
          <div className="flex-1 bg-bg-surface border border-border-subtle rounded-2xl p-6">
            {/* Nav */}
            <div className="flex items-center justify-between mb-4">
<button
  aria-label="Previous month"
  onClick={prevMonth}
  className="p-2 rounded-xl hover:bg-bg-elevated transition-colors"
>
                  <ChevronLeft className="w-4 h-4 text-text-muted" />
              </button>
              <div className="flex items-center gap-2">
                <select
                  value={viewMonth}
                  onChange={e => setViewMonth(Number(e.target.value))}
                  className="text-sm font-bold text-text-brand bg-transparent focus:outline-none cursor-pointer"
                >
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <select
                  value={viewYear}
                  onChange={e => setViewYear(Number(e.target.value))}
                  className="text-sm font-bold text-text-brand bg-transparent focus:outline-none cursor-pointer"
                >
                  {Array.from({ length: 10 }, (_, i) => 2020 + i).map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
<button
  aria-label="Next month"
  onClick={nextMonth}
  className="p-2 rounded-xl hover:bg-bg-elevated transition-colors"
>
                  <ChevronRight className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-text-muted py-1">{d}</div>
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = new Date(viewYear, viewMonth, i + 1);
                const isStart = isSameDay(date, startDate);
                const isEnd = isSameDay(date, rangeEnd);
                const inRange = isBetween(date, startDate, rangeEnd);
                const isToday = isSameDay(date, today);
                const isFuture = date > today;

                return (
                  <button
                    key={i}
                    disabled={isFuture}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => selecting === "end" && setHoverDate(date)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={`
                      relative h-9 text-xs font-semibold transition-all rounded-lg
                      ${isFuture ? "text-text-muted/30 cursor-not-allowed" : "cursor-pointer hover:bg-brand/10"}
                      ${(isStart || isEnd) ? "bg-brand text-text-on-primary hover:bg-brand z-10 shadow-md" : ""}
                      ${inRange ? "bg-brand/10 text-brand rounded-none" : "text-text-brand"}
                      ${isToday && !isStart && !isEnd ? "ring-1 ring-primary/50" : ""}
                    `}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Time Range */}
            <AnimatePresence>
              {showTime && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border-subtle overflow-hidden"
                >
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <p className="text-[10px] text-text-muted mb-1.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Start time</p>
                      <input
                        type="range" min={0} max={23}
                        value={startHour}
                        onChange={e => setStartHour(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <p className="text-xs font-bold text-text-brand mt-1">{String(startHour).padStart(2, "0")}:00</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-text-muted mb-1.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> End time</p>
                      <input
                        type="range" min={0} max={23}
                        value={endHour}
                        onChange={e => setEndHour(Number(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <p className="text-xs font-bold text-text-brand mt-1">{String(endHour).padStart(2, "0")}:59</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Selection Summary */}
            <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-text-muted">
                {startDate && endDate ? (
                  <span className="font-semibold text-text-brand">
                    {formatDate(startDate)} → {formatDate(endDate)}
                    <span className="ml-2 text-text-muted font-normal">
                      ({Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1} days)
                    </span>
                  </span>
                ) : startDate ? (
                  <span className="text-brand font-semibold">Select end date…</span>
                ) : (
                  "Click to select a date range"
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setStartDate(null); setEndDate(null); setSelecting(null); setActivePreset(""); }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-text-muted hover:text-status-error border border-border-subtle rounded-lg transition-colors"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
                <button
                  onClick={() => setSelecting("start")}
                  className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-text-on-primary bg-brand rounded-lg hover:bg-brand/90 transition-colors"
                >
                  <Zap className="w-3 h-3" /> Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
