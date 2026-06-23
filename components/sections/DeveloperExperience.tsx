"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clipboard, Check, Play, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

const tabs = ["1. Install", "2. Configure", "3. Embed"];

// Tab 0 (Install Bash Code)
const tab0Code = `$ npm install @prism/react @prism/sdk

\u001b[32m✓\u001b[0m Installed in 2.3s
\u001b[32m✓\u001b[0m TypeScript types included
\u001b[32m✓\u001b[0m Zero peer dependency conflicts

Next: Configure your provider →`;

// Token representations for syntax highlighting during typewriter animation
const tab1Tokens = [
  { text: "import ", type: "keyword" },
  { text: "{ ", type: "punct" },
  { text: "PrismProvider", type: "component" },
  { text: " } ", type: "punct" },
  { text: "from ", type: "keyword" },
  { text: "'@prism/react'", type: "string" },
  { text: "\n\n", type: "punct" },
  { text: "export ", type: "keyword" },
  { text: "default ", type: "keyword" },
  { text: "function ", type: "keyword" },
  { text: "App", type: "component" },
  { text: "({ children }) {\n  ", type: "punct" },
  { text: "return", type: "keyword" },
  { text: " (\n    ", type: "punct" },
  { text: "<", type: "punct" },
  { text: "PrismProvider", type: "component" },
  { text: "\n      ", type: "punct" },
  { text: "apiKey", type: "prop" },
  { text: "={process.env.PRISM_KEY}\n      ", type: "punct" },
  { text: "theme", type: "prop" },
  { text: "={yourBrandTheme}\n      ", type: "punct" },
  { text: "tenant", type: "prop" },
  { text: "={user.companyId}\n    ", type: "punct" },
  { text: ">\n      ", type: "punct" },
  { text: "{children}\n    ", type: "punct" },
  { text: "</", type: "punct" },
  { text: "PrismProvider", type: "component" },
  { text: ">\n  )\n}", type: "punct" },
];

const tab2Tokens = [
  { text: "import ", type: "keyword" },
  { text: "{ ", type: "punct" },
  { text: "Dashboard", type: "component" },
  { text: ", ", type: "punct" },
  { text: "ChartBuilder", type: "component" },
  { text: " } ", type: "punct" },
  { text: "from ", type: "keyword" },
  { text: "'@prism/react'", type: "string" },
  { text: "\n\n", type: "punct" },
  { text: "export ", type: "keyword" },
  { text: "function ", type: "keyword" },
  { text: "AnalyticsPage", type: "component" },
  { text: "() {\n  ", type: "punct" },
  { text: "return", type: "keyword" },
  { text: " (\n    ", type: "punct" },
  { text: "<", type: "punct" },
  { text: "Dashboard", type: "component" },
  { text: "\n      ", type: "punct" },
  { text: "preset", type: "prop" },
  { text: "=", type: "punct" },
  { text: '"executive-summary"', type: "string" },
  { text: "\n      ", type: "punct" },
  { text: "dateRange", type: "prop" },
  { text: "=", type: "punct" },
  { text: '"last-30-days"', type: "string" },
  { text: "\n      ", type: "punct" },
  { text: "exportable", type: "prop" },
  { text: "\n      ", type: "punct" },
  { text: "onExport", type: "prop" },
  { text: "={(data) => console.log(data)}\n    />\n  )\n}", type: "punct" },
];

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

const getFullTextOfTab = (tabIdx: number) => {
  if (tabIdx === 0) return tab0Code.length;
  if (tabIdx === 1) return tab1Tokens.reduce((acc, t) => acc + t.text.length, 0);
  return tab2Tokens.reduce((acc, t) => acc + t.text.length, 0);
};

export default function DeveloperExperience() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  // Typewriter states
  const [charCount, setCharCount] = useState(0);
  const [isFadingCode, setIsFadingCode] = useState(false);

  const handleTypewriter = useCallback((tabIdx: number) => {
    setIsFadingCode(true);
    setTimeout(() => {
      setCharCount(0);
      setIsFadingCode(false);
      const targetLength = getFullTextOfTab(tabIdx);
      let current = 0;
      const interval = setInterval(() => {
        current += 2.5; // faster typewriter speed for DX
        if (current >= targetLength) {
          setCharCount(targetLength);
          clearInterval(interval);
        } else {
          setCharCount(Math.floor(current));
        }
      }, 10);
      return () => clearInterval(interval);
    }, 150);
  }, []);

  useEffect(() => {
    handleTypewriter(activeTab);
  }, [activeTab, handleTypewriter]);

  const handleCopy = () => {
    let copyText = "";
    if (activeTab === 0) {
      copyText = "npm install @prism/react @prism/sdk";
    } else if (activeTab === 1) {
      copyText = tab1Tokens.reduce((acc, t) => acc + t.text, "");
    } else {
      copyText = tab2Tokens.reduce((acc, t) => acc + t.text, "");
    }
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      case "comment":
        return "text-code-comment";
      default:
        return "text-code-default";
    }
  };

  // Renders the typed segment of the syntax highlighted code
  const renderTypedTokens = (tokens: typeof tab1Tokens) => {
    let accumulated = 0;
    const rendered = [];
    for (const token of tokens) {
      if (accumulated >= charCount) break;
      const remaining = charCount - accumulated;
      if (remaining >= token.text.length) {
        rendered.push(token);
        accumulated += token.text.length;
      } else {
        rendered.push({
          text: token.text.slice(0, remaining),
          type: token.type,
        });
        accumulated += remaining;
        break;
      }
    }
    return (
      <>
        {rendered.map((token, i) => (
          <span key={i} className={getTokenColor(token.type)}>
            {token.text}
          </span>
        ))}
      </>
    );
  };

  return (
    <section id="sdk" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 border-b border-border-subtle text-left">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block text-[13px] font-medium tracking-[0.15em] text-brand uppercase mb-4">
            Developer Experience
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-text-brand mb-6"
          >
            {"Embed analytics in minutes,".split(" ").map((word, i) => (
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
              {"not months.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed mt-4"
          >
            TypeScript-first. Tree-shakeable. Under 14kb gzipped.
          </motion.p>
        </div>

        {/* Core Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left panel - Code Editor */}
          <motion.div
            whileHover={{ borderColor: "var(--color-primary)", opacity: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden shadow-card flex flex-col min-h-[380px] transition-colors"
          >
            
            {/* Chrome Header */}
            <div className="bg-bg-surface px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-error" />
                <span className="w-2.5 h-2.5 rounded-full bg-status-warning" />
                <span className="w-2.5 h-2.5 rounded-full bg-status-success" />
              </div>
              <span className="text-[10px] text-slate-600 font-mono">prism-setup.tsx</span>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* Tab Bar */}
            <div className="bg-bg-base border-b border-border-subtle flex">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-3 text-xs font-mono transition-all duration-300 focus:outline-none border-b-2 ${
                      isActive
                        ? "text-text-brand border-brand"
                        : "text-text-secondary border-transparent hover:text-text-brand"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Code Body Area */}
            <div className="p-5 flex-1 relative font-mono text-xs sm:text-sm leading-relaxed overflow-auto flex flex-col">
              
              {/* Copy button */}
              <button
                aria-label={copied ? "Copied" : "Copy code"}
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-bg-base/5 hover:bg-bg-base/10 text-text-brand transition-all duration-300 focus:outline-none z-20"
              >
                {copied ? <Check className="w-4 h-4 text-status-success" /> : <Clipboard className="w-4 h-4" />}
              </button>

              <div
                className={`flex-1 transition-opacity duration-200 text-left select-all ${
                  isFadingCode ? "opacity-0" : "opacity-100"
                }`}
              >
                {activeTab === 0 && (
                  <pre className="text-text-brand leading-loose">
                    {/* Render raw install commands */}
                    {tab0Code.slice(0, charCount)}
                    {charCount < tab0Code.length && (
                      <span className="inline-block w-1.5 h-4 bg-brand/70 ml-0.5 align-middle animate-pulse" />
                    )}
                  </pre>
                )}

                {activeTab === 1 && (
                  <pre className="whitespace-pre">
                    {renderTypedTokens(tab1Tokens)}
                    {charCount < tab1Tokens.reduce((acc, t) => acc + t.text.length, 0) && (
                      <span className="inline-block w-1.5 h-4 bg-brand/70 ml-0.5 align-middle animate-pulse" />
                    )}
                  </pre>
                )}

                {activeTab === 2 && (
                  <pre className="whitespace-pre">
                    {renderTypedTokens(tab2Tokens)}
                    {charCount < tab2Tokens.reduce((acc, t) => acc + t.text.length, 0) && (
                      <span className="inline-block w-1.5 h-4 bg-brand/70 ml-0.5 align-middle animate-pulse" />
                    )}
                  </pre>
                )}
              </div>
            </div>

          </motion.div>

          {/* Right panel - Live Preview Window */}
          <motion.div
            whileHover={{ borderColor: "var(--color-primary)", opacity: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden shadow-card flex flex-col min-h-[380px] transition-colors"
          >
            
            {/* Chrome Header */}
            <div className="bg-bg-surface px-4 py-3 flex items-center justify-between border-b border-border-subtle">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-bg-base/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-bg-base/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-bg-base/10" />
              </div>
              <span className="text-[10px] text-slate-600 font-mono">
                {activeTab === 0 ? "terminal.sh" : activeTab === 1 ? "api-check.log" : "localhost:3000/dashboard"}
              </span>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* Preview Body Area */}
            <div className="p-5 flex-1 flex flex-col justify-center bg-bg-elevated/20 relative overflow-hidden">

              <AnimatePresence mode="wait">
                
                {/* Tab 0 preview: Installation Terminal */}
                {activeTab === 0 && (
                  <motion.div
                    key="preview-tab-0"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-between text-left font-mono text-xs"
                  >
                    <div className="space-y-3 text-status-success bg-bg-base/40 p-5 rounded-xl border border-border-subtle flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                        <span>Injected @prism/react package</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                        <span>Loaded Typescript declarations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />
                        <span>Validated peer dependencies</span>
                      </div>
                    </div>
                    <div className="mt-4 text-slate-500 text-[10px] text-center">
                      Installation complete. Ready to embed provider context.
                    </div>
                  </motion.div>
                )}

                {/* Tab 1 preview: Initialized success */}
                {activeTab === 1 && (
                  <motion.div
                    key="preview-tab-1"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center max-w-sm mx-auto justify-center h-full w-full"
                  >
                    {/* Glowing success checkmark */}
                    <motion.div
                      animate={{ scale: [0.95, 1.03, 0.95] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-full bg-status-success/10 border border-success/20 flex items-center justify-center text-status-success mb-4"
                    >
                      <ShieldCheck className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-base font-semibold text-text-brand mb-1">Provider Initialized</h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 max-w-xs">
                      API Credentials verified. Prism wrapper context loaded.
                    </p>
                    
                    {/* Status pills */}
                    <div className="flex flex-col gap-1.5 w-full">
                      {[
                        "✓ API Credentials Connected",
                        "✓ Brand Theme Configurations Loaded",
                        "✓ Tenant Isolation Authenticated",
                      ].map((pill, i) => (
                        <span key={i} className="text-[10px] py-1.5 px-3 rounded-full bg-status-success/5 border border-success/15 text-status-success font-medium inline-block w-full">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tab 2 preview: Actual mini dashboard card */}
                {activeTab === 2 && (
                  <motion.div
                    key="preview-tab-2"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col gap-4 text-left"
                  >
                    {/* Dashboard top */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-text-brand">Executive Summary</span>
                      <span className="text-[9px] text-brand font-semibold py-0.5 px-2 bg-brand/10 rounded-full border border-brand/20">
                        Live Embed
                      </span>
                    </div>

                    {/* 2 mini stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="bg-[var(--prism-card-bg)] border border-[var(--prism-card-border)] p-3 flex flex-col justify-between transition-all duration-300"
                        style={{ borderRadius: "var(--prism-card-radius)" }}
                      >
<span className="text-[9px] text-slate-400 uppercase tracking-wider">
  Revenue (Monthly)
</span>
                        <span className="text-base font-bold text-text-brand mt-0.5">$48,290</span>
                      </div>
                      <div
                        className="bg-[var(--prism-card-bg)] border border-[var(--prism-card-border)] p-3 flex flex-col justify-between transition-all duration-300"
                        style={{ borderRadius: "var(--prism-card-radius)" }}
                      >
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider">Signups</span>
                        <span className="text-base font-bold text-text-brand mt-0.5">1,482</span>
                      </div>
                    </div>

                    {/* Chart representation */}
                    <div
                      className="flex-1 bg-[var(--prism-card-bg)] border border-[var(--prism-card-border)] p-3 flex flex-col justify-between min-h-[110px] transition-all duration-300"
                      style={{ borderRadius: "var(--prism-card-radius)" }}
                    >
<span className="text-[9px] text-slate-400 uppercase tracking-wider mb-1 block">
  Monthly Growth
</span>
                      <div className="flex-1 w-full relative pt-2">
                        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="embed-chart-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--prism-chart-primary)" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="var(--prism-chart-primary)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M 0 80 Q 50 40, 100 50 T 200 20 T 300 10 L 300 80 L 0 80 Z" fill="url(#embed-chart-grad)" />
                          <path d="M 0 80 Q 50 40, 100 50 T 200 20 T 300 10" fill="none" stroke="var(--prism-chart-primary)" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </motion.div>

        </div>

        {/* Feature Pills */}
        <div className="flex justify-center gap-4 flex-wrap mt-8">
          {[
            { text: "TypeScript-first", icon: ShieldCheck },
            { text: "Tree-shakeable", icon: Cpu },
            { text: "Under 14kb gzipped", icon: Check },
            { text: "Zero config needed", icon: Play },
          ].map((pill, i) => {
            const PillIcon = pill.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ borderColor: "var(--prism-semantic-primary)", opacity: 0.98 }}
                className="bg-bg-elevated/60 glass border border-border-subtle rounded-full px-5 py-2 flex items-center gap-2 cursor-pointer transition-all duration-300 text-sm font-medium text-text-brand shadow-sm"
              >
                <div className="w-4 h-4 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <PillIcon className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>{pill.text}</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



