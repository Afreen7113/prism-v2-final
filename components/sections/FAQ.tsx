"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the embedding actually work?",
    answer: "Install our React SDK with 'npm install @prism/react', wrap your app in <PrismProvider />, and drop in components like <Dashboard /> wherever you need analytics. We handle data fetching, caching, rendering, multi-tenant isolation, and real-time updates. Most teams ship their first dashboard in under an hour.",
  },
  {
    question: "Can Prism be embedded into an existing SaaS platform?",
    answer: "Yes, this is exactly what Prism was built for. Unlike standalone BI tools, Prism is an API-first embedding engine. You drop our React components directly into your existing SaaS application, maintaining your authentication, routing, and user experience. To your customers, it looks like you built a world-class analytics suite from scratch.",
  },
  {
    question: "Can I really match my exact brand identity?",
    answer: "Yes. Our theming engine exposes CSS custom properties at three abstraction layers: primitive tokens (raw colors, fonts, spacing), semantic tokens (purpose-mapped like 'primary' or 'success'), and component tokens (scoped to specific components). Designers can match any visual identity — from clinical medical software to vibrant consumer apps — without writing custom CSS.",
  },
  {
    question: "How do token overrides work across multiple brands?",
    answer: "Prism manages theming via configuration rather than code. When rendering a dashboard, Prism injects a tenant's runtime theme JSON containing primitive, semantic, and component token overrides. This instantly reskins the UI at runtime, allowing massive multi-brand scale with absolutely zero component duplication.",
  },
  {
    question: "Can different tenants use different themes simultaneously?",
    answer: "Yes. Theming in Prism is tenant-scoped and resolved dynamically at runtime. When an end-user loads a dashboard, Prism fetches their organization's specific design tokens and applies them independently. This allows you to support completely distinct brand experiences concurrently using a single shared component system.",
  },
  {
    question: "Do I need to fork components to customize them?",
    answer: "No. Our configuration-driven architecture and comprehensive token system completely eliminate the need for component forks. You maintain a single, clean codebase while providing infinite visual variations. If a tenant requires structural changes beyond CSS, our slot-based composition model allows you to inject custom React nodes seamlessly.",
  },
  {
    question: "What happens when we launch a new brand?",
    answer: "Launching a new brand requires zero engineering changes. You simply create a new theme configuration via our Admin UI or REST API, mapping your design tokens to the new brand identity. The moment it's saved, the new theme automatically propagates globally, and existing components adapt instantly for users of that brand.",
  },
  {
    question: "How do theme tokens propagate across the platform?",
    answer: "Prism manages design semantics through a strict token hierarchy. Changing a primitive or semantic token automatically propagates to all dependent component tokens globally. This ensures perfectly consistent branding across every chart, table, and modal in the UI without ever requiring manual component updates.",
  },
  {
    question: "How is customer data isolated between tenants?",
    answer: "Beyond standard security, Prism enforces strict logical and physical tenant boundaries through its application-level isolation architecture. Every API request is cryptographically scoped to a specific tenant ID, and data access is structurally confined. This is engineered specifically for the strict compliance requirements of B2B white-label SaaS.",
  },
  {
    question: "Which frameworks and platforms do you support?",
    answer: "Primary support for React (with TypeScript types included). Official packages also available for Vue 3, Angular 17+, Svelte 4+, and vanilla JavaScript. Our SDK core is framework-agnostic — most teams using other frameworks integrate without issues.",
  },
  {
    question: "Can my customers build their own custom reports?",
    answer: "Yes. Our self-serve chart builder lets your end-users drag-and-drop metrics, apply filters, change visualizations, and save custom dashboards — all within your product's UI. You control which metrics are exposed. This typically reduces analytics-related support tickets by 60%+.",
  },
  {
    question: "Do you support self-hosted deployments?",
    answer: "Yes. While our cloud deployment is SOC 2 Type II certified and fully managed, we offer robust self-hosted deployment options for enterprise environments. You can deploy Prism entirely within your own VPC to meet strict data sovereignty, air-gapped security, or internal compliance requirements.",
  },
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="block text-[13px] font-semibold text-brand uppercase tracking-[0.15em] mb-4">
            Frequently Asked Questions
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-text-brand"
          >
            {"Questions,".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" " }
            <span
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, var(--color-primary), var(--color-accent), var(--color-accent), var(--color-primary))",
              }}
            >
              {"answered.".split(" ").map((word, i) => (
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
            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md mx-auto mt-4"
          >
            Can&apos;t find what you&apos;re looking for? Email our team and we&apos;ll get back within 4 hours.
          </motion.p>
        </div>

        {/* Accordion Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {faqData.map((item, idx) => {
              if (idx % 2 !== 0) return null;
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={`bg-bg-elevated/60 backdrop-blur-xl border rounded-[16px] overflow-hidden transition-all duration-300 text-left ${
                    isOpen
                      ? "border-brand/30 bg-brand/5 shadow-md"
                      : "border-border-subtle hover:border-border-subtle/70"
                  }`}
                >
                  
                  {/* Accordion Trigger Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 flex justify-between items-center bg-transparent border-none cursor-pointer focus:outline-none"
                  >
                    <span className="text-[14px] font-medium text-text-brand pr-4 leading-snug">
                      {item.question}
                    </span>
                    
                    {/* Plus/Minus Indicator */}
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center text-text-brand">
                      <Plus
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-brand" : "rotate-0 text-text-brand"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Collapsible Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[13px] text-text-secondary leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {faqData.map((item, idx) => {
              if (idx % 2 === 0) return null;
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={`bg-bg-elevated/60 backdrop-blur-xl border rounded-[16px] overflow-hidden transition-all duration-300 text-left ${
                    isOpen
                      ? "border-brand/30 bg-brand/5 shadow-md"
                      : "border-border-subtle hover:border-border-subtle/70"
                  }`}
                >
                  
                  {/* Accordion Trigger Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 flex justify-between items-center bg-transparent border-none cursor-pointer focus:outline-none"
                  >
                    <span className="text-[14px] font-medium text-text-brand pr-4 leading-snug">
                      {item.question}
                    </span>
                    
                    {/* Plus/Minus Indicator */}
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center text-text-brand">
                      <Plus
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-brand" : "rotate-0 text-text-brand"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Collapsible Answer Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-[13px] text-text-secondary leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}



