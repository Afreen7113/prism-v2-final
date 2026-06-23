"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Database, Sheet, FileText, Code, Zap, Terminal, Check } from "lucide-react";


// =========================================================================
// UNIVERSAL BENTO CARD WRAPPER
// =========================================================================
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
}

function BentoCard({ children, className = "", index }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`bento-card group relative overflow-hidden bg-bg-elevated/40 glass rounded-[24px] p-6 cursor-pointer border border-border-subtle hover-semantic-surface hover:opacity-[0.98] ${className}`}
    >

      {children}
    </motion.div>
  );
}

// =========================================================================
// CARD 1: TYPEWRITER CODE EDITOR TOKENS
// =========================================================================
const codeTokens = [
  { text: "import ", type: "keyword" },
  { text: "{ ", type: "punct" },
  { text: "Dashboard", type: "component" },
  { text: " } ", type: "punct" },
  { text: "from ", type: "keyword" },
  { text: "'@prism/react'", type: "string" },
  { text: "\n\n", type: "punct" },
  { text: "export ", type: "keyword" },
  { text: "function ", type: "keyword" },
  { text: "App", type: "component" },
  { text: "() {\n  ", type: "punct" },
  { text: "return", type: "keyword" },
  { text: " (\n    ", type: "punct" },
  { text: "<", type: "punct" },
  { text: "Dashboard", type: "component" },
  { text: "\n      ", type: "punct" },
  { text: "tenant", type: "prop" },
  { text: "=", type: "punct" },
  { text: "{user.companyId}", type: "punct" },
  { text: "\n      ", type: "punct" },
  { text: "theme", type: "prop" },
  { text: "=", type: "punct" },
  { text: "{brandTheme}", type: "punct" },
  { text: "\n      ", type: "punct" },
  { text: "preset", type: "prop" },
  { text: "=", type: "punct" },
  { text: '\"executive\"', type: "string" },
  { text: "\n    />\n  )\n}", type: "punct" },
];

function Card1CodeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });
  const [charCount, setCharCount] = useState(0);

  const totalLength = codeTokens.reduce((acc, t) => acc + t.text.length, 0);

  useEffect(() => {
    if (inView) {
      let current = 0;
      const interval = setInterval(() => {
        current += 1.5; // type speed
        if (current >= totalLength) {
          setCharCount(totalLength);
          clearInterval(interval);
        } else {
          setCharCount(Math.floor(current));
        }
      }, 12);
      return () => clearInterval(interval);
    }
  }, [inView, totalLength]);

  // Slices tokens according to the current charCount typed progress
  const getRenderedTokens = () => {
    let accumulated = 0;
    const result = [];
    for (const token of codeTokens) {
      if (accumulated >= charCount) break;
      const remaining = charCount - accumulated;
      if (remaining >= token.text.length) {
        result.push(token);
        accumulated += token.text.length;
      } else {
        result.push({
          text: token.text.slice(0, remaining),
          type: token.type,
        });
        accumulated += remaining;
        break;
      }
    }
    return result;
  };

  const getTokenColor = (type: string) => {
    switch (type) {
      case "keyword":
        return "text-code-keyword";
      case "string":
        return "text-code-string";
      case "component":
        return "text-code-component";
      case "prop":
        return "text-code-prop";
      default:
        return "text-code-default";
    }
  };

  return (
    <div ref={containerRef} className="h-[170px] bg-bg-base border border-border-subtle rounded-xl p-4 font-mono text-[10px] sm:text-xs overflow-hidden relative">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-status-error/75" />
          <span className="w-2.5 h-2.5 rounded-full bg-status-warning/75" />
          <span className="w-2.5 h-2.5 rounded-full bg-status-success/75" />
        </div>
        <span className="text-[10px] text-text-muted flex items-center gap-1.5">
          <Terminal className="w-3 h-3" /> Dashboard.tsx
        </span>
      </div>

      {/* Code Text */}
      <pre className="text-left leading-normal whitespace-pre-wrap select-none">
        {getRenderedTokens().map((token, i) => (
          <span key={i} className={getTokenColor(token.type)}>
            {token.text}
          </span>
        ))}
        {charCount < totalLength && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-3.5 bg-brand/75 ml-0.5 align-middle"
          />
        )}
      </pre>
    </div>
  );
}

// =========================================================================
// CARD 2: Brand theme options
// =========================================================================
const brandThemes = [
  { id: "healthcare", bg: "var(--color-white)", primary: "#0EA5E9", text: "#1F2937", border: "rgba(0, 0, 0, 0.08)" },
  { id: "fintech", bg: "#064E3B", primary: "#FBBF24", text: "#FAFAFA", border: "rgba(251, 191, 36, 0.2)" },
  { id: "consumer", bg: "#9F1239", primary: "var(--color-white)", text: "var(--color-white)", border: "rgba(255, 255, 255, 0.2)" }, // consumer deep rose
];

function Card2WhiteLabel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getTheme = (offset: number) => {
    return brandThemes[(activeIndex + offset) % 3];
  };

  return (
    <div className="flex gap-3 justify-between items-center h-[170px] select-none pt-2">
      {[0, 1, 2].map((offset) => {
        const theme = getTheme(offset);
        return (
          <motion.div
            key={offset}
            animate={{
              backgroundColor: theme.bg,
              color: theme.text,
              borderColor: theme.border,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-1/3 rounded-xl border p-3 flex flex-col justify-between h-[150px] shadow-lg overflow-hidden"
          >
            {/* Top Stat */}
            <div className="text-left flex flex-col">
              <span className="text-xs opacity-65 uppercase tracking-wide">MRR Growth</span>
              <span className="text-sm font-bold mt-0.5">$38.2K</span>
            </div>

            {/* Tiny Chart */}
            <div className="flex items-end justify-between h-[45px] px-1 gap-1">
              {[40, 75, 55, 90].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ backgroundColor: theme.primary }}
                  transition={{ duration: 0.8 }}
                  style={{ height: `${h}%` }}
                  className="w-full rounded-sm opacity-80"
                />
              ))}
            </div>

            {/* Tiny Button */}
            <motion.div
              animate={{ backgroundColor: theme.primary, color: theme.bg }}
              transition={{ duration: 0.8 }}
              className="text-xs font-bold py-1 px-2 rounded text-center leading-none"
            >
              Export Report
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// =========================================================================
// CARD 3: SELF-SERVE CHART BUILDER (DRAG & DRAG CHIPS)
// =========================================================================
const metricChips = [
  { name: "Revenue", rot: -4, x: -25, y: -5, grad: "from-brand/10 to-brand/20 border-brand/30", delay: 0 },
  { name: "Users", rot: 6, x: 50, y: -20, grad: "from-accent/10 to-accent/20 border-accent/30", delay: 1.5 },
  { name: "Sessions", rot: -8, x: -45, y: 35, grad: "from-[var(--color-accent)]/10 to-[var(--color-accent)]/20 border-[var(--color-accent)]/30", delay: 0.8 },
  { name: "Churn", rot: 4, x: 40, y: 30, grad: "from-[var(--color-error)]/10 to-[var(--color-error)]/20 border-[var(--color-error)]/30", delay: 2.2 },
  { name: "MRR", rot: 3, x: 5, y: 15, grad: "from-brand/10 to-primary/20 border-brand/30", delay: 1.2 },
  { name: "Signups", rot: -2, x: -10, y: -45, grad: "from-secondary/10 to-secondary/20 border-secondary/30", delay: 1.9 },
];

function Card3ChartBuilder() {
  return (
    <div className="flex flex-col h-[400px] justify-between relative select-none">
      
      {/* Top half: Floating metrics */}
      <div className="relative h-1/2 flex items-center justify-center pt-4">
        {metricChips.map((chip, i) => {
          // If it is the first chip "Revenue", we apply the dragging loop keyframes!
          const isDraggingLoop = chip.name === "Revenue";

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                transform: `rotate(${chip.rot}deg)`,
                left: `calc(50% + ${chip.x}px - 40px)`,
                top: `calc(50% + ${chip.y}px - 14px)`,
              }}
              animate={
                isDraggingLoop
                  ? {
                      x: [0, 50, 50, 0],
                      y: [0, 150, 150, 0],
                      opacity: [1, 1, 0, 0, 1],
                    }
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={
                isDraggingLoop
                  ? {
                      duration: 4,
                      repeat: Infinity,
                      times: [0, 0.3, 0.45, 0.9, 1],
                      ease: "easeInOut",
                    }
                  : {
                      duration: 3,
                      repeat: Infinity,
                      delay: chip.delay,
                      ease: "easeInOut",
                    }
              }
              className={`px-3 py-1 rounded-full text-[10px] font-medium border bg-gradient-to-r ${chip.grad} text-text-brand shadow-lg cursor-grab`}
            >
              {chip.name}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom half: Canvas area */}
      <div className="h-1/2 border border-dashed border-brand/30 rounded-xl p-4 flex flex-col justify-end relative bg-bg-surface/10 overflow-hidden">
        
        {/* Helper guide text when empty */}
        <motion.div
          animate={{ opacity: [1, 0.1, 0.1, 1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.28, 0.85, 0.95, 1],
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted select-none pointer-events-none"
        >
          Drop metrics here
        </motion.div>

        {/* Building Chart Bar Graph */}
        <div className="flex items-end justify-between h-[90px] gap-2.5 z-10 px-2">
          {[45, 75, 60, 95, 50].map((h, i) => (
            <div key={i} className="flex-1 bg-bg-surface/5 h-full rounded-md flex items-end">
              <motion.div
                animate={{
                  scaleY: [0, 0, 1, 1, 0, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  times: [0, 0.32, 0.45, 0.85, 0.95, 1],
                  ease: "easeInOut",
                }}
                className="w-full bg-gradient-to-t from-brand to-tertiary rounded-md"
                style={{ height: `${h}%`, originY: 1 }}
              />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

// =========================================================================
// CARD 4: EXPORT PIPELINE DATA FLOW GRAPH
// =========================================================================
function Card4ExportPipeline() {
  return (
    <div className="flex items-center justify-between h-[150px] relative px-4 select-none">
      
      {/* Left side: Database source */}
      <div className="flex flex-col items-center gap-2 z-10 shrink-0">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 15px var(--semantic-primary-glow)",
              "0 0 25px var(--semantic-primary-glow)",
              "0 0 15px var(--semantic-primary-glow)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/40 flex items-center justify-center text-brand"
        >
          <Database className="w-6 h-6" />
        </motion.div>
        <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Your Data</span>
      </div>

      {/* Center: SVG Pipeline Lines */}
      <div className="flex-1 relative h-16 mx-4 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 300 64" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
          
          {/* Top Line */}
          <path d="M 0 12 Q 150 0, 300 12" fill="none" stroke="url(#flow-grad)" strokeWidth="1.5" opacity="0.3" />
          <motion.path
            d="M 0 12 Q 150 0, 300 12"
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -28] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />

          {/* Mid Line */}
          <path d="M 0 32 H 300" fill="none" stroke="url(#flow-grad)" strokeWidth="1.5" opacity="0.3" />
          <motion.path
            d="M 0 32 H 300"
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="2"
            strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />

          {/* Bottom Line */}
          <path d="M 0 52 Q 150 64, 300 52" fill="none" stroke="url(#flow-grad)" strokeWidth="1.5" opacity="0.3" />
          <motion.path
            d="M 0 52 Q 150 64, 300 52"
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -28] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Right side: Destinations stacked vertically */}
      <div className="flex flex-col gap-2.5 w-[140px] z-10 shrink-0">
        {[
          { label: "CSV / Excel", icon: Sheet, delay: 0.4 },
          { label: "PDF Reports", icon: FileText, delay: 0.8 },
          { label: "REST API", icon: Code, delay: 1.2 },
        ].map((dest, i) => {
          const DestIcon = dest.icon;
          return (
            <motion.div
              key={i}
              animate={{
                borderColor: [
                  "rgba(255, 255, 255, 0.05)",
                  "rgba(255, 255, 255, 0.05)",
                  "rgba(16, 185, 129, 0.3)", // green borders glow
                  "rgba(16, 185, 129, 0.3)",
                  "rgba(255, 255, 255, 0.05)",
                ],
                backgroundColor: [
                  "rgba(13, 15, 23, 0.6)",
                  "rgba(13, 15, 23, 0.6)",
                  "rgba(16, 185, 129, 0.06)",
                  "rgba(16, 185, 129, 0.06)",
                  "rgba(13, 15, 23, 0.6)",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                times: [0, dest.delay / 3.5, (dest.delay + 0.2) / 3.5, (dest.delay + 1.6) / 3.5, (dest.delay + 1.8) / 3.5],
                ease: "easeInOut",
              }}
              className="border border-border-subtle rounded-lg py-1.5 px-3 flex items-center justify-between bg-bg-elevated/60 text-left"
            >
              <div className="flex items-center gap-2">
                <DestIcon className="w-3.5 h-3.5 text-text-secondary" />
                <span className="text-[10px] font-medium text-text-brand leading-none">{dest.label}</span>
              </div>
              
              {/* Checkmark animation */}
              <motion.div
                animate={{
                  opacity: [0, 0, 1, 1, 0],
                  scale: [0.5, 0.5, 1, 1, 0.5],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  times: [0, (dest.delay + 0.1) / 3.5, (dest.delay + 0.3) / 3.5, (dest.delay + 1.5) / 3.5, (dest.delay + 1.7) / 3.5],
                }}
                className="w-3.5 h-3.5 rounded-full bg-status-success/20 flex items-center justify-center text-status-success"
              >
                <Check className="w-2.5 h-2.5" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}

// =========================================================================
// CARD 5: MULTI-TENANT NETWORK NODES
// =========================================================================
function Card5NetworkNodes() {
  return (
    <div className="h-[170px] flex items-center justify-center relative select-none">
      
      {/* Outer rotating assembly */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="w-28 h-28 relative flex items-center justify-center"
      >
        <svg className="absolute w-full h-full overflow-visible" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="net-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Radial connector lines */}
          <line x1="50" y1="50" x2="50" y2="10" stroke="url(#net-line-grad)" strokeWidth="1" />
          <line x1="50" y1="50" x2="90" y2="50" stroke="url(#net-line-grad)" strokeWidth="1" />
          <line x1="50" y1="50" x2="50" y2="90" stroke="url(#net-line-grad)" strokeWidth="1" />
          <line x1="50" y1="50" x2="10" y2="50" stroke="url(#net-line-grad)" strokeWidth="1" />
        </svg>

        {/* Satellite nodes */}
        {/* Top Satellite */}
        <div className="absolute top-0 w-5 h-5 rounded-full bg-bg-surface border border-border-subtle/50 flex items-center justify-center text-xs font-mono text-text-secondary">
          T1
        </div>
        {/* Right Satellite */}
        <div className="absolute right-0 w-5 h-5 rounded-full bg-bg-surface border border-border-subtle/50 flex items-center justify-center text-xs font-mono text-text-secondary">
          T2
        </div>
        {/* Bottom Satellite */}
        <div className="absolute bottom-0 w-5 h-5 rounded-full bg-bg-surface border border-border-subtle/50 flex items-center justify-center text-xs font-mono text-text-secondary">
          T3
        </div>
        {/* Left Satellite */}
        <div className="absolute left-0 w-5 h-5 rounded-full bg-bg-surface border border-border-subtle/50 flex items-center justify-center text-xs font-mono text-text-secondary">
          T4
        </div>
      </motion.div>

      {/* Central Node (Prism logo) */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 15px var(--semantic-primary-glow)",
            "0 0 25px var(--semantic-primary-glow)",
            "0 0 15px var(--semantic-primary-glow)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-brand to-tertiary flex items-center justify-center shadow-lg"
      >
        <svg viewBox="0 0 100 100" className="w-5 h-5">
          <path d="M50 20 L25 75 L50 85 Z" fill="var(--color-white)" opacity="0.8" />
          <path d="M50 20 L50 85 L75 75 Z" fill="#000000" opacity="0.2" />
        </svg>
      </motion.div>
      
    </div>
  );
}

// =========================================================================
// CARD 6: LATENCY DISPLAY & SPEED BAR
// =========================================================================
function Card6LatencyDisplay() {
  return (
    <div className="flex items-center justify-between h-[170px] px-6 select-none">
      
      {/* Latency statistics */}
      <div className="flex flex-col items-start text-left w-2/3">
        {/* Massive 47ms Display */}
        <motion.div
          animate={{
            textShadow: [
              "0 0 15px var(--semantic-primary-glow)",
              "0 0 25px var(--semantic-primary-glow)",
              "0 0 15px var(--semantic-primary-glow)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl sm:text-8xl font-bold tracking-[-0.04em] leading-none gradient-text"
          style={{
            backgroundImage: "linear-gradient(120deg, var(--color-primary), var(--color-accent))",
          }}
        >
          47ms
        </motion.div>

        {/* Speed Bar */}
        <div className="w-full max-w-[200px] h-2 bg-bg-surface/5 rounded-full mt-4 overflow-hidden relative">
          <motion.div
            animate={{
              width: ["4%", "6%", "4%"],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-brand to-secondary rounded-full shadow-md"
          />
        </div>
        <span className="text-[10px] text-text-muted mt-2 uppercase tracking-wide font-semibold">Average query latency</span>
      </div>

      {/* Lightning bolt icons */}
      <div className="w-1/3 flex justify-end items-center pr-4">
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shadow-md"
        >
          <Zap className="w-8 h-8 fill-current" />
        </motion.div>
      </div>

    </div>
  );
}

// =========================================================================
// MAIN BENTO GRID SECTION COMPONENT
// =========================================================================
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

export default function BentoGrid() {
  return (
    <section id="product" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 border-b border-border-subtle">
      


      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[13px] font-medium tracking-[0.15em] text-brand uppercase mb-4">
            Why Prism
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.05] text-text-brand mb-6 select-none max-w-4xl mx-auto"
          >
            {"Built for teams who".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" "}
            <span className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "var(--gradient-primary)",
              }}
            >
              {"ship.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed mx-auto mt-6">
            Six pieces of infrastructure that would take you two years to build. 
            We&apos;ve already built them.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(240px,auto)]">
          
          {/* Card 1: Embeddable React SDK */}
          <BentoCard index={0} className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between pb-8">
            <Card1CodeEditor />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-semibold text-text-brand">Drop-in React components</h3>
              <p className="text-sm text-text-secondary mt-1">TypeScript-first SDK with zero config</p>
            </div>
          </BentoCard>

          {/* Card 2: White-Label Theming */}
          <BentoCard index={1} className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between pb-8">
            <Card2WhiteLabel />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-semibold text-text-brand">One component. Infinite brands.</h3>
              <p className="text-sm text-text-secondary mt-1">CSS variable theming adapts to any design</p>
            </div>
          </BentoCard>

          {/* Card 3: Self-Serve Chart Builder (TALL CARD) */}
          <BentoCard index={2} className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 flex flex-col justify-between pb-8">
            <Card3ChartBuilder />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-semibold text-text-brand">Drag. Drop. Done.</h3>
              <p className="text-sm text-text-secondary mt-1">Your customers build their own reports</p>
            </div>
          </BentoCard>

          {/* Card 4: Production Export Pipeline (WIDE CARD) */}
          <BentoCard index={3} className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-between pb-8">
            <Card4ExportPipeline />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-semibold text-text-brand">Export-ready from day one</h3>
              <p className="text-sm text-text-secondary mt-1">CSV, PDF, and REST API exports built-in</p>
            </div>
          </BentoCard>

          {/* Card 5: Multi-Tenant Architecture */}
          <BentoCard index={4} className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col justify-between pb-8">
            <Card5NetworkNodes />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-semibold text-text-brand">Multi-tenant by default</h3>
              <p className="text-sm text-text-secondary mt-1">Isolated. Scalable. Secure.</p>
            </div>
          </BentoCard>

          {/* Card 6: Sub-100ms Performance */}
          <BentoCard index={5} className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between pb-8">
            <Card6LatencyDisplay />
            <div className="mt-4 text-left">
              <h3 className="text-xl font-semibold text-text-brand">Built for speed</h3>
              <p className="text-sm text-text-secondary mt-1">Column-store DB with intelligent caching</p>
            </div>
          </BentoCard>

        </div>

      </div>
    </section>
  );
}



