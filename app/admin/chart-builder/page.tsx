"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3, X, Clipboard, Check, Code2, LineChart, PieChart,
  ChevronDown, Search, Download, Calendar, Grid3X3, Play,
  Share2, FileDown, Library
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// --- AVAILABLE FIELDS DEFINITIONS ---
const METRIC_FIELDS = [
  { id: "metric-revenue", label: "Revenue ($)", emoji: "💰" },
  { id: "metric-users", label: "Active Users", emoji: "👥" },
  { id: "metric-orders", label: "Total Orders", emoji: "🛒" },
  { id: "metric-conversions", label: "Conversions", emoji: "💳" },
  { id: "metric-sessions", label: "Sessions", emoji: "📈" },
  { id: "metric-duration", label: "Avg Session Duration", emoji: "⏱" },
  { id: "metric-mrr", label: "MRR", emoji: "💵" },
  { id: "metric-churn", label: "Churn Rate", emoji: "📉" },
  { id: "metric-ctr", label: "Click-through Rate", emoji: "🎯" },
  { id: "metric-arpu", label: "ARPU (Avg Revenue Per User)", emoji: "💰" },
];

const DIMENSION_FIELDS = [
  { id: "dim-date", label: "Date", emoji: "📅" },
  { id: "dim-country", label: "Country", emoji: "🌍" },
  { id: "dim-device", label: "Device Type", emoji: "📱" },
  { id: "dim-traffic", label: "Traffic Source", emoji: "🔗" },
  { id: "dim-segment", label: "User Segment", emoji: "👤" },
  { id: "dim-plan", label: "Plan Type", emoji: "💼" },
  { id: "dim-category", label: "Product Category", emoji: "🏷" },
  { id: "dim-browser", label: "Browser", emoji: "🌐" },
  { id: "dim-hour", label: "Hour of Day", emoji: "🕐" },
  { id: "dim-region", label: "Region", emoji: "📍" },
];

// --- 1. DRAG-AND-DROP FIELD CHIP ---
interface FieldChipProps {
  id: string;
  label: string;
  type: "metric" | "dimension";
  emoji: string;
}

function FieldChip({ id, label, type, emoji }: FieldChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { type, label, emoji },
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-3 py-2 rounded-lg border text-xs font-bold flex items-center gap-2 transition-all select-none ${
        type === "metric"
          ? "bg-status-success/10 border-success text-status-success hover:bg-status-success/25"
          : "bg-info/10 border-info text-info hover:bg-info/25"
      } ${
        isDragging
          ? "opacity-40 scale-95 cursor-grabbing border-brand"
          : "cursor-grab hover:scale-[1.02] hover:shadow-md active:cursor-grabbing"
      }`}
    >
      <span>{emoji}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

// --- 2. DROPPABLE CONFIGURATION ZONE ---
interface DropZoneProps {
  id: string;
  label: string;
  subtitle: string;
  accepts: Array<"metric" | "dimension">;
  items: Array<{ id: string; label: string; type: "metric" | "dimension"; emoji: string }>;
  onRemove: (itemId: string) => void;
  flashWarning: string | null;
}

function DropZone({ id, label, accepts, items, onRemove, flashWarning }: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { accepts },
  });

  const isEmpty = items.length === 0;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <span className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider">{label}</span>
      
      <div
        ref={setNodeRef}
        className={`w-full min-h-[120px] rounded-xl p-4 transition-all duration-300 border-2 flex flex-wrap gap-2 items-start content-start relative ${
          isEmpty && !isOver
            ? "bg-bg-elevated/10 border-dashed border-border-subtle"
            : isOver
            ? "border-solid border-brand bg-brand/15 shadow-md"
            : "bg-bg-surface border-solid border-border-subtle"
        } ${
          flashWarning
            ? "border-error bg-status-error/10 animate-shake"
            : ""
        }`}
      >
        {isEmpty && !isOver && (
          <span className="text-xs text-text-muted italic w-full text-center py-5 pointer-events-none select-none">
            {accepts.includes("metric") && accepts.includes("dimension")
              ? "Drop fields here (optional)"
              : accepts.includes("metric")
              ? "Drop metrics here"
              : id === "group-by"
              ? "Drop dimension here (optional)"
              : "Drop dimension here"}
          </span>
        )}

        {isOver && isEmpty && (
          <span className="text-xs text-brand font-bold w-full text-center py-5 pointer-events-none select-none">
            Release to drop
          </span>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className={`px-2.5 py-1.5 rounded-md border text-xs font-bold flex items-center gap-1.5 select-none ${
              item.type === "metric"
                ? "bg-status-success/15 border-success text-status-success"
                : "bg-info/15 border-info text-info"
            }`}
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
            <button
  type="button"
  aria-label="Remove field"
  onClick={() => onRemove(item.id)}
  className="text-text-muted hover:text-text-brand transition-colors cursor-pointer"
>
  <X className="w-3 h-3" />
</button>
          </div>
        ))}

        {flashWarning && (
          <div className="absolute top-2.5 right-2.5 bg-status-error text-text-brand text-[9px] font-bold py-0.5 px-2 rounded shadow-md z-50 animate-pulse">
            {flashWarning}
          </div>
        )}
      </div>
    </div>
  );
}

// --- 3. MAIN COMPONENT SYSTEM ---
interface SelectedField {
  id: string;
  label: string;
  type: "metric" | "dimension";
  emoji: string;
}

export default function ChartBuilder() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [chartType, setChartType] = useState<"Bar" | "Line" | "Area" | "Donut" | "Table">("Bar");

  // Drag and Drop Zones items
  const [xAxis, setXAxis] = useState<SelectedField[]>([
    { id: "dim-date", label: "Date", type: "dimension", emoji: "📅" }
  ]);
  const [yAxis, setYAxis] = useState<SelectedField[]>([
    { id: "metric-revenue", label: "Revenue ($)", type: "metric", emoji: "💰" }
  ]);
  const [groupBy, setGroupBy] = useState<SelectedField[]>([]);
  const [filters, setFilters] = useState<SelectedField[]>([]);

  // Flash warning states for invalid drop configurations
  const [flashWarnings, setFlashWarnings] = useState<Record<string, string | null>>({
    "x-axis": null,
    "y-axis": null,
    "group-by": null,
    "filters": null
  });

  // Chart properties configuration panel
  const [chartTitle, setChartTitle] = useState("My Custom Chart");
  const [colorScheme, setColorScheme] = useState("default");
  const [showLegend, setShowLegend] = useState(true);
  const [showGridlines, setShowGridlines] = useState(true);
  const [showDataLabels, setShowDataLabels] = useState(false);
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [yAxisFormat, setYAxisFormat] = useState("number");
  const [dateRange, setDateRange] = useState("30");
  const [aggregation, setAggregation] = useState("sum");
  const [limitResults, setLimitResults] = useState(100);

  // Active dragging states
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<{ type: string; label: string; emoji: string } | null>(null);

  // Embed Modal State
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedCopied, setEmbedCopied] = useState<"react" | "html" | "vue" | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, []);

  // --- ACTIONS ---
  const handleRemoveField = (zone: "x-axis" | "y-axis" | "group-by" | "filters", itemId: string) => {
    if (zone === "x-axis") setXAxis([]);
    else if (zone === "y-axis") setYAxis(yAxis.filter((item) => item.id !== itemId));
    else if (zone === "group-by") setGroupBy([]);
    else if (zone === "filters") setFilters(filters.filter((item) => item.id !== itemId));
  };

  const handleResetCanvas = () => {
    setXAxis([]);
    setYAxis([]);
    setGroupBy([]);
    setFilters([]);
  };

  // --- DRAG EVENTS ---
  const handleDragStart = (event: DragStartEvent) => {
    const activeIdStr = String(event.active.id);
    setActiveDragId(activeIdStr);
    
    const metricItem = METRIC_FIELDS.find((m) => m.id === activeIdStr);
    const dimItem = DIMENSION_FIELDS.find((d) => d.id === activeIdStr);
    if (metricItem) {
      setActiveDragData({ type: "metric", label: metricItem.label, emoji: metricItem.emoji });
    } else if (dimItem) {
      setActiveDragData({ type: "dimension", label: dimItem.label, emoji: dimItem.emoji });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    setActiveDragData(null);

    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    const activeData = active.data.current as { type: "metric" | "dimension"; label: string; emoji: string } | undefined;
    if (!activeData) return;

    const { type, label, emoji } = activeData;

    const overData = over.data.current as { accepts: Array<"metric" | "dimension"> } | undefined;
    if (!overData) return;

    const { accepts } = overData;

    if (!accepts.includes(type)) {
      setFlashWarnings((prev) => ({
        ...prev,
        [overIdStr]: type === "metric" ? "Metrics go on Y-Axis" : "Dimensions go on X-Axis"
      }));
      setTimeout(() => {
        setFlashWarnings((prev) => ({
          ...prev,
          [overIdStr]: null
        }));
      }, 2000);
      return;
    }

    const newItem = { id: activeIdStr, type, label, emoji };

    if (overIdStr === "x-axis") {
      setXAxis([newItem]);
    } else if (overIdStr === "y-axis") {
      if (!yAxis.some((item) => item.id === newItem.id)) {
        setYAxis([...yAxis, newItem]);
      }
    } else if (overIdStr === "group-by") {
      setGroupBy([newItem]);
    } else if (overIdStr === "filters") {
      if (!filters.some((item) => item.id === newItem.id)) {
        setFilters([...filters, newItem]);
      }
    }
  };

  // --- MOCK DATA GENERATION ENGINE ---
  const getCategories = () => {
    if (xAxis.length === 0) return ["Category A", "Category B", "Category C", "Category D", "Category E"];
    const dimId = xAxis[0].id;
    switch (dimId) {
      case "dim-date":
        return ["Jun 11", "Jun 12", "Jun 13", "Jun 14", "Jun 15", "Jun 16", "Jun 17"];
      case "dim-country":
        return ["USA", "Canada", "Germany", "Japan", "UK", "Australia", "France"];
      case "dim-device":
        return ["Mobile", "Desktop", "Tablet", "Smart TV"];
      case "dim-traffic":
        return ["Direct", "Organic Search", "Referrals", "Paid Ads", "Email"];
      case "dim-segment":
        return ["New Users", "Active", "Dormant", "VIP"];
      case "dim-plan":
        return ["Free", "Pro Monthly", "Pro Annual", "Enterprise"];
      case "dim-category":
        return ["SaaS Core", "Premium Addons", "API Usage", "Advisory Services"];
      case "dim-browser":
        return ["Chrome", "Safari", "Firefox", "Edge"];
      case "dim-hour":
        return ["00:00", "06:00", "12:00", "18:00"];
      case "dim-region":
        return ["Americas", "EMEA", "APAC", "LATAM"];
      default:
        return ["Category A", "Category B", "Category C", "Category D"];
    }
  };

  const getMetricBase = (metricId: string) => {
    switch (metricId) {
      case "metric-revenue":
        return { min: 8000, max: 24000, prefix: "$", suffix: "" };
      case "metric-users":
        return { min: 800, max: 4500, prefix: "", suffix: "" };
      case "metric-orders":
        return { min: 150, max: 1100, prefix: "", suffix: "" };
      case "metric-conversions":
        return { min: 10, max: 95, prefix: "", suffix: "%" };
      case "metric-sessions":
        return { min: 1200, max: 6800, prefix: "", suffix: "" };
      case "metric-duration":
        return { min: 30, max: 180, prefix: "", suffix: "s" };
      case "metric-mrr":
        return { min: 15000, max: 38000, prefix: "$", suffix: "" };
      case "metric-churn":
        return { min: 0.5, max: 5.5, prefix: "", suffix: "%" };
      case "metric-ctr":
        return { min: 0.8, max: 4.2, prefix: "", suffix: "%" };
      case "metric-arpu":
        return { min: 12, max: 88, prefix: "$", suffix: "" };
      default:
        return { min: 5, max: 95, prefix: "", suffix: "" };
    }
  };

  const getColorPalette = (idx: number, scheme: string) => {
    const palettes: Record<string, string[]> = {
      default: ["var(--color-primary)","var(--color-info)", "var(--color-success)", "var(--color-border-default)", "var(--color-accent)"],
      categorical: ["var(--color-primary)", "var(--color-success)", "var(--color-border-default)", "var(--color-info)", "var(--color-accent)", "var(--color-text-muted)", "var(--color-text-secondary)"],
      sequential: ["var(--color-text-primary)", "var(--color-text-secondary)", "var(--color-text-muted)", "var(--color-border-subtle)", "var(--color-primary)", "var(--color-accent)", "var(--color-border-default)"],
      diverging: ["var(--color-error)", "var(--color-warning)", "var(--color-text-muted)", "var(--color-border-subtle)", "var(--color-success)", "var(--color-info)", "var(--color-primary)"]
    };
    const activePalette = palettes[scheme] || palettes.default;
    return activePalette[idx % activePalette.length];
  };

  const generatePreviewData = () => {
    const categories = getCategories();
    
    if (groupBy.length > 0 && yAxis.length > 0) {
      const splitDim = groupBy[0].id;
      const metric = yAxis[0];
      const base = getMetricBase(metric.id);
      
      const splitCategories = splitDim === "dim-plan" ? ["Free", "Pro", "Enterprise"] : ["Segment A", "Segment B", "Segment C"];
      
      return splitCategories.map((groupName, gIdx) => {
        const factor = gIdx === 0 ? 0.4 : gIdx === 1 ? 0.75 : 1.2;
        const color = getColorPalette(gIdx, colorScheme);
        const dataVals = categories.map(() => {
          const raw = Math.round(base.min + Math.random() * (base.max - base.min));
          return Math.round(raw * factor);
        });
        return {
          label: `${groupName} - ${metric.label}`,
          data: dataVals,
          color,
          prefix: base.prefix,
          suffix: base.suffix
        };
      });
    }

    return yAxis.map((metric, idx) => {
      const base = getMetricBase(metric.id);
      const color = getColorPalette(idx, colorScheme);
      const dataVals = categories.map(() => {
        return Math.round(base.min + Math.random() * (base.max - base.min));
      });
      return {
        label: metric.label,
        data: dataVals,
        color,
        prefix: base.prefix,
        suffix: base.suffix
      };
    });
  };

  const hasData = xAxis.length > 0 && yAxis.length > 0;
  const datasets = generatePreviewData();
  const categories = getCategories();

  const getPreviewSubtitle = () => {
    if (!hasData) return "Configure chart columns";
    const xName = xAxis[0].label;
    const yNames = yAxis.map((y) => y.label).join(" & ");
    const groupName = groupBy.length > 0 ? `, split by ${groupBy[0].label}` : "";
    return `${yNames} by ${xName}${groupName}`;
  };

  const filteredMetrics = METRIC_FIELDS.filter((m) =>
    m.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDimensions = DIMENSION_FIELDS.filter((d) =>
    d.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyEmbed = (type: "react" | "html" | "vue") => {
    let text = "";
    const metricsParam = yAxis.map(y => y.id).join(",");
    const xParam = xAxis.length > 0 ? xAxis[0].id : "";
    const groupParam = groupBy.length > 0 ? groupBy[0].id : "";

    if (type === "react") {
      text = `<PrismComposer
  chartType="${chartType}"
  metrics={[${yAxis.map(y => `"${y.id}"`).join(", ")}]}
  dimension="${xParam}"
  groupBy="${groupParam}"
  properties={{
    title: "${chartTitle}",
    colorScheme: "${colorScheme}",
    showLegend: ${showLegend},
    showGridlines: ${showGridlines}
  }}
/>`;
    } else {
      text = `<iframe 
  src="https://cdn.prism.dev/embed/composer?type=${chartType.toLowerCase()}&metrics=${encodeURIComponent(metricsParam)}&dimension=${encodeURIComponent(xParam)}&groupBy=${encodeURIComponent(groupParam)}&title=${encodeURIComponent(chartTitle)}" 
  width="100%" 
  height="450" 
  frameborder="0" 
  style="border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);"
></iframe>`;
    }

    navigator.clipboard.writeText(text);
    setEmbedCopied(type);
    setTimeout(() => setEmbedCopied(null), 2000);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Custom scrollbar hide styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      <div className="flex flex-col gap-4 text-left">
        {/* Page Titles */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-brand">Self-Serve Chart Builder</h1>
          <p className="text-sm text-text-secondary mt-1">
            Build bespoke reporting widgets by dragging metrics and dimensions into visual dropzones.
          </p>
        </div>

        {/* 3-Column Layout Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* ============================================
              COLUMN 1: AVAILABLE FIELDS (LEFT)
              FIX: Removed inner scroll, hidden scrollbar
          ============================================ */}
          <div className="lg:col-span-3 bg-bg-surface/50 border border-border-subtle p-4 rounded-2xl flex flex-col gap-4 lg:max-w-[280px] w-full hide-scrollbar">
            <span className="text-[11px] font-extrabold text-text-muted uppercase tracking-wider block">Available Fields</span>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search metrics & categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-elevated border border-border-subtle pl-9 pr-3.5 py-2 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand placeholder-text-muted font-medium"
              />
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
            </div>

            {/* METRICS - FIX: removed max-h and overflow */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Metrics</span>
                <span className="text-[9px] text-text-muted font-medium mt-0.5">Numerical values to measure</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {filteredMetrics.map((item) => (
                  <FieldChip
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    type="metric"
                    emoji={item.emoji}
                  />
                ))}
                {filteredMetrics.length === 0 && (
                  <span className="text-[10px] text-text-muted italic py-1">No metrics found</span>
                )}
              </div>
            </div>

            {/* DIMENSIONS - FIX: removed max-h and overflow */}
            <div className="flex flex-col gap-2 border-t border-border-subtle pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Dimensions</span>
                <span className="text-[9px] text-text-muted font-medium mt-0.5">Categories to group by</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {filteredDimensions.map((item) => (
                  <FieldChip
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    type="dimension"
                    emoji={item.emoji}
                  />
                ))}
                {filteredDimensions.length === 0 && (
                  <span className="text-[10px] text-text-muted italic py-1">No dimensions found</span>
                )}
              </div>
            </div>
          </div>

          {/* ============================================
              COLUMN 2: CHART CONFIGURATION & PREVIEW
              FIX: Better proportions, more space in config
          ============================================ */}
          <div className="lg:col-span-6 flex flex-col gap-4 w-full">
            
            {/* TOP CONFIG CARD - FIX: Increased padding, taller drop zones */}
            <div className="bg-bg-surface/50 border border-border-subtle p-6 rounded-2xl flex flex-col gap-5 shadow-sm">
              
              {/* Chart Type Selector Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-bg-elevated border border-border-subtle">
                {[
                  { id: "Bar", label: "Bar Chart", icon: BarChart3 },
                  { id: "Line", label: "Line Chart", icon: LineChart },
                  { id: "Area", label: "Area Chart", icon: PieChart },
                  { id: "Donut", label: "Donut Chart", icon: PieChart },
                  { id: "Table", label: "Table View", icon: Grid3X3 },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = chartType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setChartType(item.id as "Bar" | "Line" | "Area" | "Donut" | "Table")}
                      className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand text-text-on-primary shadow-lg shadow-primary/10"
                          : "text-text-secondary hover:text-text-brand hover:bg-bg-surface/40"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Drop Zones Grid - FIX: Bigger zones, more spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <DropZone
                  id="x-axis"
                  label="X-Axis (Columns)"
                  subtitle="Drag a dimension here"
                  accepts={["dimension"]}
                  items={xAxis}
                  onRemove={(id) => handleRemoveField("x-axis", id)}
                  flashWarning={flashWarnings["x-axis"]}
                />

                <DropZone
                  id="y-axis"
                  label="Y-Axis (Rows)"
                  subtitle="Drag metrics here (multiple)"
                  accepts={["metric"]}
                  items={yAxis}
                  onRemove={(id) => handleRemoveField("y-axis", id)}
                  flashWarning={flashWarnings["y-axis"]}
                />

                <DropZone
                  id="group-by"
                  label="Group By (Color)"
                  subtitle="Optional: dimension to split"
                  accepts={["dimension"]}
                  items={groupBy}
                  onRemove={(id) => handleRemoveField("group-by", id)}
                  flashWarning={flashWarnings["group-by"]}
                />

                <DropZone
                  id="filters"
                  label="Filters"
                  subtitle="Limit data shown"
                  accepts={["metric", "dimension"]}
                  items={filters}
                  onRemove={(id) => handleRemoveField("filters", id)}
                  flashWarning={flashWarnings["filters"]}
                />
              </div>

              {/* Reset Button */}
              <div className="flex justify-end pt-2 border-t border-border-subtle/50">
                <button
                  onClick={handleResetCanvas}
                  className="text-[10px] font-extrabold text-text-muted hover:text-brand transition-colors cursor-pointer"
                >
                  Clear Config Layout
                </button>
              </div>
            </div>

            {/* ============================================
                BOTTOM PREVIEW CARD
                FIX: Reduced empty space, better chart height
            ============================================ */}
            <div className="bg-bg-surface/50 border border-border-subtle p-5 rounded-2xl flex flex-col gap-3 shadow-sm relative overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-border-subtle/50 pb-3 z-10">
                <div>
                  <h3 className="text-sm font-bold text-text-brand">Chart Preview</h3>
                  <span className="text-[10px] text-text-secondary font-semibold capitalize tracking-wide block mt-0.5">
                    {getPreviewSubtitle()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasData && (
                    <div className="flex items-center gap-1.5 border border-border-subtle rounded-md px-2 py-0.5 bg-bg-base/50 text-[10px] text-text-secondary cursor-pointer hover:text-text-brand transition-colors">
                      <Download className="w-3 h-3" />
                      <span className="font-medium">Export</span>
                    </div>
                  )}
                  {hasData && (
                    <span className="text-[9px] uppercase font-bold text-status-success bg-status-success/10 border border-success/25 px-2 py-0.5 rounded-full select-none">
                      Render Live
                    </span>
                  )}
                </div>
              </div>

              {/* Chart Core Render - FIX: Fixed height instead of min-height to remove empty space */}
              <div className="h-[400px] w-full relative">
                {!hasData ? (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-[280px] mx-auto">
                    <div className="text-3xl mb-3 animate-bounce">📊</div>
                    <span className="text-xs font-bold text-text-brand uppercase tracking-wide">No data selected</span>
                    <span className="text-[10px] text-text-muted mt-1 font-semibold leading-normal">
                      Drag metrics to the Y-Axis dropzone and dimensions to the X-Axis dropzone to start visual aggregation.
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col select-none">
                    
                    {/* 1. BAR CHART - FIX: Better height proportions */}
                    {chartType === "Bar" && (
                      <div className="flex-1 flex items-end justify-between px-4 gap-2 pt-4 relative border-b border-border-subtle/60 pb-1">
                        {showGridlines && (
                          <div className="absolute inset-x-0 top-0 bottom-1 flex flex-col justify-between pointer-events-none opacity-10">
                            <div className="border-t border-border-subtle" />
                            <div className="border-t border-border-subtle" />
                            <div className="border-t border-border-subtle" />
                            <div className="border-t border-border-subtle" />
                          </div>
                        )}
                        {categories.map((catName, cIdx) => (
                          <div key={cIdx} className="flex-1 flex flex-col justify-end items-center h-full relative group">
                            <div className="flex items-end gap-1 w-full justify-center max-w-[70px] h-full">
                              {datasets.map((ds, dIdx) => {
                                const maxVal = Math.max(...datasets.flatMap(d => d.data), 1);
                                const heightPct = (ds.data[cIdx] / maxVal) * 95;
                                return (
                                  <div key={dIdx} className="flex-1 flex flex-col justify-end h-full relative">
                                    <div
                                      style={{
                                        height: `${heightPct}%`,
                                        backgroundColor: ds.color,
                                        borderRadius: "4px 4px 0 0",
                                        minHeight: "8px"
                                      }}
                                      className="w-full relative group-hover:opacity-90 transition-all duration-300"
                                    />
                                    {showDataLabels && (
                                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-extrabold text-text-brand whitespace-nowrap bg-bg-surface/90 px-1 py-0.5 rounded shadow">
                                        {ds.prefix}{ds.data[cIdx]}{ds.suffix}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 2. LINE CHART - FIX: Use flex-1 */}
                    {chartType === "Line" && (
                      <div className="flex-1 relative border-b border-border-subtle/60 pb-1 pt-4">
                        {showGridlines && (
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                            <div className="border-t border-border-subtle h-0" />
                            <div className="border-t border-border-subtle h-0" />
                            <div className="border-t border-border-subtle h-0" />
                            <div className="border-t border-border-subtle h-0" />
                          </div>
                        )}
                        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                          {datasets.map((ds, dIdx) => {
                            const maxVal = Math.max(...datasets.flatMap(d => d.data), 1);
                            const points = categories.map((_, cIdx) => {
                              const x = (cIdx / (categories.length - 1)) * 480 + 10;
                              const y = 190 - (ds.data[cIdx] / maxVal) * 160;
                              return `${x},${y}`;
                            }).join(" ");

                            return (
                              <g key={dIdx}>
                                <polyline
                                  fill="none"
                                  stroke={ds.color}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  points={points}
                                  className="transition-all duration-500"
                                />
                                {categories.map((_, cIdx) => {
                                  const x = (cIdx / (categories.length - 1)) * 480 + 10;
                                  const y = 190 - (ds.data[cIdx] / maxVal) * 160;
                                  return (
                                    <circle
                                      key={cIdx}
                                      cx={x}
                                      cy={y}
                                      r="4"
                                      fill={ds.color}
                                      stroke="var(--color-bg-base)"
                                      strokeWidth="1.5"
                                    />
                                  );
                                })}
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    )}

                    {/* 3. AREA CHART - FIX: Use flex-1 */}
                    {chartType === "Area" && (
                      <div className="flex-1 relative border-b border-border-subtle/60 pb-1 pt-4">
                        {showGridlines && (
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                            <div className="border-t border-border-subtle h-0" />
                            <div className="border-t border-border-subtle h-0" />
                            <div className="border-t border-border-subtle h-0" />
                            <div className="border-t border-border-subtle h-0" />
                          </div>
                        )}
                        <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            {datasets.map((ds, dIdx) => (
                              <linearGradient key={dIdx} id={`area-grad-${dIdx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={ds.color} stopOpacity="0.35" />
                                <stop offset="100%" stopColor={ds.color} stopOpacity="0.0" />
                              </linearGradient>
                            ))}
                          </defs>
                          {datasets.map((ds, dIdx) => {
                            const maxVal = Math.max(...datasets.flatMap(d => d.data), 1);
                            const linePoints = categories.map((_, cIdx) => {
                              const x = (cIdx / (categories.length - 1)) * 480 + 10;
                              const y = 190 - (ds.data[cIdx] / maxVal) * 160;
                              return `${x},${y}`;
                            });

                            const areaPoints = [
                              `10,195`,
                              ...linePoints,
                              `${(categories.length - 1) / (categories.length - 1) * 480 + 10},195`
                            ].join(" ");

                            return (
                              <g key={dIdx}>
                                <polygon
                                  fill={`url(#area-grad-${dIdx})`}
                                  points={areaPoints}
                                  className="transition-all duration-500"
                                />
                                <polyline
                                  fill="none"
                                  stroke={ds.color}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  points={linePoints.join(" ")}
                                  className="transition-all duration-500"
                                />
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    )}

                    {/* 4. DONUT CHART - FIX: Center properly in available space */}
                    {chartType === "Donut" && (
                      <div className="flex-1 flex items-center justify-center py-4 gap-8">
                        <div className="relative w-40 h-40 shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-text-secondary/20" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            {categories.map((cat, cIdx) => {
                              const totalVal = datasets[0]?.data.reduce((a, b) => a + b, 0) || 1;
                              const currentVal = datasets[0]?.data[cIdx] || 0;
                              const pctShare = (currentVal / totalVal) * 100;
                              
                              const prevPct = categories.slice(0, cIdx).reduce((accSum, _, prevIdx) => {
                                return accSum + ((datasets[0]?.data[prevIdx] || 0) / totalVal) * 100;
                              }, 0);

                              const strokeColor = getColorPalette(cIdx, colorScheme);

                              return (
                                <path
                                  key={cIdx}
                                  stroke={strokeColor}
                                  strokeWidth="3.5"
                                  strokeDasharray={`${pctShare}, 100`}
                                  strokeDashoffset={-prevPct}
                                  strokeLinecap="round"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              );
                            })}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[18px] font-black text-text-brand">Breakdown</span>
                            <span className="text-[9px] text-text-secondary uppercase font-extrabold tracking-wider">{xAxis[0].label}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto pr-2 hide-scrollbar">
                          {categories.map((cat, cIdx) => {
                            const totalVal = datasets[0]?.data.reduce((a, b) => a + b, 0) || 1;
                            const currentVal = datasets[0]?.data[cIdx] || 0;
                            const pctShare = Math.round((currentVal / totalVal) * 100);
                            const strokeColor = getColorPalette(cIdx, colorScheme);

                            return (
                              <div key={cIdx} className="flex items-center gap-2 text-[10px] font-semibold text-text-secondary">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: strokeColor }} />
                                <span className="truncate max-w-[80px]">{cat}:</span>
                                <span className="text-text-brand font-bold">{pctShare}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 5. TABLE VIEW - FIX: Use flex-1 with proper overflow */}
                    {chartType === "Table" && (
                      <div className="flex-1 overflow-y-auto border border-border-subtle rounded-xl bg-bg-elevated/20 p-2 hide-scrollbar">
                        <table className="w-full text-[10px] text-left border-collapse">
                          <thead>
                            <tr className="border-b border-border-subtle text-text-secondary font-extrabold">
                              <th className="py-2 px-2.5">{xAxis[0].label}</th>
                              {datasets.map((ds, dIdx) => (
                                <th key={dIdx} className="py-2 px-2.5 text-right">{ds.label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((catVal, cIdx) => (
                              <tr key={cIdx} className="border-b border-border-subtle/50 last:border-0 hover:bg-bg-base/[0.01]">
                                <td className="py-2 px-2.5 font-bold text-text-brand">{catVal}</td>
                                {datasets.map((ds, dIdx) => (
                                  <td key={dIdx} className="py-2 px-2.5 text-right font-mono font-semibold text-text-brand">
                                    {ds.prefix}{ds.data[cIdx].toLocaleString()}{ds.suffix}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* X-Axis Labels - FIX: Only show for relevant chart types */}
                    {(chartType === "Bar" || chartType === "Line" || chartType === "Area") && (
                      <div className="flex justify-between text-[9px] font-bold text-text-muted mt-2 px-2">
                        {categories.map((catVal, idx) => (
                          <span key={idx} className="flex-1 text-center">{catVal}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Legends - FIX: Only show when applicable */}
              {hasData && showLegend && chartType !== "Donut" && chartType !== "Table" && (
                <div className="flex flex-wrap items-center justify-center gap-4 border-t border-border-subtle/50 pt-3 z-10">
                  {datasets.map((ds, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[10px] text-text-secondary font-bold">
                      <span className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: ds.color }} />
                      <span>{ds.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ============================================
              COLUMN 3: CHART PROPERTIES PANEL (RIGHT)
              FIX: Hidden scrollbar
          ============================================ */}
          <div className="lg:col-span-3 bg-bg-surface/50 border border-border-subtle p-4 rounded-2xl flex flex-col gap-4 w-full hide-scrollbar">
            <span className="text-[11px] font-extrabold text-text-muted uppercase tracking-wider block">Chart Properties</span>

            {/* SECTION 1: APPEARANCE */}
            <div className="flex flex-col gap-3 border-b border-border-subtle pb-4">
              <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest block">Appearance</span>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Chart Title</label>
                <input
                  type="text"
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle px-3 py-2 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Color Scheme</label>
                <div className="relative">
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand appearance-none cursor-pointer font-medium"
                  >
                    <option value="default">Default Palette</option>
                    <option value="categorical">Categorical (Distinct)</option>
                    <option value="sequential">Sequential (Gradients)</option>
                    <option value="diverging">Diverging (Red ↔ Green)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-1">
                <label className="flex items-center gap-2.5 text-xs text-text-secondary font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showLegend}
                    onChange={(e) => setShowLegend(e.target.checked)}
                    className="accent-primary w-4 h-4 cursor-pointer rounded"
                  />
                  <span>Show Legend</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-text-secondary font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showGridlines}
                    onChange={(e) => setShowGridlines(e.target.checked)}
                    className="accent-primary w-4 h-4 cursor-pointer rounded"
                  />
                  <span>Show Gridlines</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-text-secondary font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showDataLabels}
                    onChange={(e) => setShowDataLabels(e.target.checked)}
                    className="accent-primary w-4 h-4 cursor-pointer rounded"
                  />
                  <span>Show Data Labels</span>
                </label>
              </div>
            </div>

            {/* SECTION 2: AXIS SETTINGS */}
            <div className="flex flex-col gap-3 border-b border-border-subtle pb-4">
              <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest block">Axis Settings</span>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary">X-Axis Label</label>
                  <input
                    type="text"
                    placeholder="Auto"
                    value={xAxisLabel}
                    onChange={(e) => setXAxisLabel(e.target.value)}
                    className="w-full bg-bg-elevated border border-border-subtle px-3 py-2 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary">Y-Axis Label</label>
                  <input
                    type="text"
                    placeholder="Auto"
                    value={yAxisLabel}
                    onChange={(e) => setYAxisLabel(e.target.value)}
                    className="w-full bg-bg-elevated border border-border-subtle px-3 py-2 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Y-Axis Format</label>
                <div className="relative">
                  <select
                    value={yAxisFormat}
                    onChange={(e) => setYAxisFormat(e.target.value)}
                    className="w-full bg-bg-elevated border border-border-subtle p-2.5 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand appearance-none cursor-pointer font-medium"
                  >
                    <option value="number">Numeric Formatting</option>
                    <option value="currency">Currency ($)</option>
                    <option value="percentage">Percentage (%)</option>
                    <option value="date">Date Formatter</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* SECTION 3: DATA RANGE CONFIG */}
            <div className="flex flex-col gap-3 border-b border-border-subtle pb-4">
              <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest block">Data Limits</span>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">Date Range</label>
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full bg-bg-elevated border border-border-subtle p-2.5 pl-9 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand appearance-none cursor-pointer font-medium"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="custom">Custom Filter Range</option>
                  </select>
                  <Calendar className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                  <ChevronDown className="w-4 h-4 text-text-muted absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary">Aggregation</label>
                  <div className="relative">
                    <select
                      value={aggregation}
                      onChange={(e) => setAggregation(e.target.value)}
                      className="w-full bg-bg-elevated border border-border-subtle p-2 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand appearance-none cursor-pointer font-medium"
                    >
                      <option value="sum">Sum</option>
                      <option value="avg">Average</option>
                      <option value="count">Count</option>
                      <option value="min">Min / Max</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-text-secondary">Limit Results</label>
                  <input
                    type="number"
                    value={limitResults}
                    onChange={(e) => setLimitResults(Number(e.target.value))}
                    className="w-full bg-bg-elevated border border-border-subtle px-3 py-1.5 rounded-xl text-xs text-text-brand focus:outline-none focus:border-brand font-medium"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: EXPORT ACTIONS */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2.5">
                <Button variant="primary" size="sm" onClick={() => {}} className="w-full text-xs shadow-lg shadow-brand/20">
                  <Play className="w-3.5 h-3.5 mr-2" />
                  Save Widget
                </Button>
                <Button variant="outline" size="sm" onClick={() => {}} className="w-full text-xs">
                  <Library className="w-3.5 h-3.5 mr-2" />
                  Widget Library
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <Button variant="secondary" size="sm" className="w-full text-[10px]">
                  <FileDown className="w-3.5 h-3.5 mr-1 text-brand" /> PNG
                </Button>
                <Button variant="secondary" size="sm" className="w-full text-[10px]">
                  <FileDown className="w-3.5 h-3.5 mr-1 text-status-success" /> SVG
                </Button>
                <Button variant="secondary" size="sm" className="w-full text-[10px]">
                  <FileDown className="w-3.5 h-3.5 mr-1 text-status-warning" /> PDF
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowEmbedModal(true)}
                className="w-full text-xs font-bold text-brand hover:text-text-brand border-brand/30 hover:border-brand/50 hover:bg-brand/5"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Generate Embed Code
              </Button>
            </div>
          </div>

        </div>

        {/* DRAG OVERLAY */}
        <DragOverlay>
          {activeDragId && activeDragData ? (
            <div
              className={`px-3.5 py-2 rounded-lg border text-xs font-extrabold flex items-center gap-2 shadow-card opacity-90 scale-105 select-none w-fit shrink-0 cursor-grabbing border-brand ${
                activeDragData.type === "metric"
                  ? "bg-status-success/15 text-status-success"
                  : "bg-info/15 text-info"
              }`}
            >
              <span>{activeDragData.emoji}</span>
              <span>{activeDragData.label}</span>
            </div>
          ) : null}
        </DragOverlay>

        {/* EMBED CODE MODAL */}
        {showEmbedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-elevated/70 backdrop-blur-sm p-4">
            <div className="bg-bg-surface border border-border-subtle p-6 rounded-2xl w-full max-w-xl shadow-card relative flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-text-brand">Get Embed Code</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Integrate this custom compiled chart into your developer platforms.</p>
                </div>
<button
  aria-label="Close modal"
  onClick={() => setShowEmbedModal(false)}
  className="p-1 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-text-brand transition-colors cursor-pointer"
>
  <X className="w-5 h-5" />
</button>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-secondary flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-brand" /> React Component Integration
                  </span>
                  <button
                    onClick={() => copyEmbed("react")}
                    className="text-[10px] font-extrabold text-brand hover:text-text-brand transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {embedCopied === "react" ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                    Copy Snippet
                  </button>
                </div>
                <div className="bg-bg-elevated p-3.5 rounded-xl border border-border-subtle font-mono text-[10px] text-status-success max-h-[140px] overflow-y-auto hide-scrollbar">
                  <pre>{`<PrismComposer
  chartType="${chartType}"
  metrics={[${yAxis.map(y => `"${y.id}"`).join(", ")}]}
  dimension="${xAxis.length > 0 ? xAxis[0].id : ""}"
  groupBy="${groupBy.length > 0 ? groupBy[0].id : ""}"
  properties={{
    title: "${chartTitle}",
    colorScheme: "${colorScheme}",
    showLegend: ${showLegend},
    showGridlines: ${showGridlines}
  }}
/>`}</pre>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-secondary flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-status-warning" /> Vue Component Integration
                  </span>
                  <button
                    onClick={() => copyEmbed("vue")}
                    className="text-[10px] font-extrabold text-brand hover:text-text-brand transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {embedCopied === "vue" ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                    Copy Snippet
                  </button>
                </div>
                <div className="bg-bg-elevated p-3.5 rounded-xl border border-border-subtle font-mono text-[10px] text-status-warning max-h-[140px] overflow-y-auto hide-scrollbar">
                  <pre>{`<template>
  <PrismComposer
    chartType="${chartType}"
    :metrics="[${yAxis.map(y => `'${y.id}'`).join(", ")}]"
    dimension="${xAxis.length > 0 ? xAxis[0].id : ""}"
    groupBy="${groupBy.length > 0 ? groupBy[0].id : ""}"
    :properties="{
      title: '${chartTitle}',
      colorScheme: '${colorScheme}',
      showLegend: ${showLegend},
      showGridlines: ${showGridlines}
    }"
  />
</template>`}</pre>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-secondary flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-brand" /> Raw HTML Iframe Link
                  </span>
                  <button
                    onClick={() => copyEmbed("html")}
                    className="text-[10px] font-extrabold text-brand hover:text-text-brand transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {embedCopied === "html" ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Clipboard className="w-3.5 h-3.5" />}
                    Copy Link
                  </button>
                </div>
                <div className="bg-bg-elevated p-3.5 rounded-xl border border-border-subtle font-mono text-[10px] text-text-brand max-h-[100px] overflow-y-auto break-all hide-scrollbar">
                  <code>{`<iframe src="https://cdn.prism.dev/embed/composer?type=${chartType.toLowerCase()}&metrics=${encodeURIComponent(yAxis.map(y => y.id).join(","))}&dimension=${encodeURIComponent(xAxis.length > 0 ? xAxis[0].id : "")}&groupBy=${encodeURIComponent(groupBy.length > 0 ? groupBy[0].id : "")}&title=${encodeURIComponent(chartTitle)}" width="100%" height="450" frameborder="0"></iframe>`}</code>
                </div>
              </div>

              <div className="flex justify-end gap-3.5 mt-2">
                <button
                  onClick={() => setShowEmbedModal(false)}
                  className="px-5 py-2 bg-bg-elevated border border-border-subtle rounded-xl text-xs font-bold text-text-brand hover:bg-bg-elevated/80 transition-colors cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DndContext>
  );
}




