"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Building2, Activity, Zap, ShieldCheck } from "lucide-react";

interface AnimatedNumberProps {
  target: number;
  format: (n: number) => string;
}

function AnimatedNumber({ target, format }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => format(latest));

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2.5, ease: [0.32, 0.72, 0, 1] });
    }
  }, [inView, target, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

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

export default function MetricsBand() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-bg-base relative border-t border-b border-border-subtle overflow-hidden text-center z-10">
      
      {/* Background drifting particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-brand/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="block text-[13px] font-semibold text-brand uppercase tracking-[0.15em] mb-4">
            By The Numbers
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-text-brand"
          >
            {"Trusted at".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" "}
            <span
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, var(--color-primary), var(--color-accent), var(--color-accent), var(--color-primary))",
              }}
            >
              {"scale.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-sm sm:text-base text-text-secondary max-w-[600px] mx-auto font-medium"
          >
            Representative production-scale platform metrics.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center bg-[color-mix(in_srgb,var(--color-brand)_2%,var(--color-bg-surface))] border border-border-subtle hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] rounded-2xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:border-[color-mix(in_srgb,var(--color-brand)_20%,transparent)] transition-colors duration-300 mb-4">
              <Building2 className="w-4 h-4 text-brand opacity-80" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] leading-none mb-2 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-brand to-accent text-center flex justify-center">
              <AnimatedNumber
                target={2400}
                format={(n) => Math.round(n).toLocaleString() + "+"}
              />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-text-brand mb-1 tracking-[0.1em] uppercase">
              Active Customers
            </span>
            <span className="text-xs sm:text-sm text-text-secondary font-medium text-center">
              Trust Prism in production
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center bg-[color-mix(in_srgb,var(--color-brand)_2%,var(--color-bg-surface))] border border-border-subtle hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] rounded-2xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:border-[color-mix(in_srgb,var(--color-brand)_20%,transparent)] transition-colors duration-300 mb-4">
              <Activity className="w-4 h-4 text-brand opacity-80" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] leading-none mb-2 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-brand to-accent text-center flex justify-center">
              <AnimatedNumber
                target={180}
                format={(n) => Math.round(n) + "M"}
              />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-text-brand mb-1 tracking-[0.1em] uppercase">
              Events Processed
            </span>
            <span className="text-xs sm:text-sm text-text-secondary font-medium text-center">
              Across all deployments
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center bg-[color-mix(in_srgb,var(--color-brand)_2%,var(--color-bg-surface))] border border-border-subtle hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] rounded-2xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:border-[color-mix(in_srgb,var(--color-brand)_20%,transparent)] transition-colors duration-300 mb-4">
              <Zap className="w-4 h-4 text-brand opacity-80" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] leading-none mb-2 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-brand to-accent text-center flex justify-center">
              <AnimatedNumber
                target={47}
                format={(n) => Math.round(n) + "ms"}
              />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-text-brand mb-1 tracking-[0.1em] uppercase">
              Average Latency
            </span>
            <span className="text-xs sm:text-sm text-text-secondary font-medium text-center">
              P95 response time
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center bg-[color-mix(in_srgb,var(--color-brand)_2%,var(--color-bg-surface))] border border-border-subtle hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] rounded-2xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--color-brand)_10%,transparent)] group-hover:border-[color-mix(in_srgb,var(--color-brand)_20%,transparent)] transition-colors duration-300 mb-4">
              <ShieldCheck className="w-4 h-4 text-brand opacity-80" />
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] leading-none mb-2 gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] bg-gradient-to-r from-brand to-accent text-center flex justify-center">
              <AnimatedNumber
                target={99.99}
                format={(n) => n.toFixed(2) + "%"}
              />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-text-brand mb-1 tracking-[0.1em] uppercase">
              Uptime SLA
            </span>
            <span className="text-xs sm:text-sm text-text-secondary font-medium text-center">
              Guaranteed availability
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}



