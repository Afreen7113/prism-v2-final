"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { Clock, DollarSign, TrendingDown } from "lucide-react";

// Custom scroll-triggered Counter component as requested
function CardCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [inView, target, count]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const cardsData = [
  {
    icon: Clock,
    target: 6,
    prefix: "",
    suffix: " months",
    title: "Average build time",
    description: "For a basic analytics dashboard with charts, filters, exports, and multi-tenant data isolation. Built from scratch by senior engineers.",
  },
  {
    icon: DollarSign,
    target: 400,
    prefix: "$",
    suffix: "K+",
    title: "Engineering cost",
    description: "Before you even ship to your first customer. Senior full-stack engineers don't come cheap — and you need at least 3 of them.",
  },
  {
    icon: TrendingDown,
    target: 89,
    prefix: "",
    suffix: "%",
    title: "Underestimate the complexity",
    description: "Of SaaS teams who try to build analytics in-house end up rewriting it within 18 months. We've seen it happen too many times.",
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

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column (Sticky on scroll) */}
        <div className="lg:sticky lg:top-32 h-fit self-start mb-12 lg:mb-0">
          
          {/* Eyebrow Label */}
          <span className="inline-block text-[13px] font-medium tracking-[0.15em] text-brand uppercase mb-6">
            The Build vs. Buy Problem
          </span>
          
          {/* Massive Heading */}
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-text-brand max-w-lg mb-6"
          >
            {"Your team shouldn't".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
            {" "}
            <span className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, var(--color-primary), var(--color-accent), var(--color-accent), var(--color-primary))",
              }}
            >
              {"rebuild Tableau.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>
          
          {/* Body Text */}
          <p className="text-lg text-text-secondary leading-relaxed max-w-[480px]">
            Every B2B SaaS hits the same wall: customers demand analytics. 
            You either spend 6 months building it, or ship embedded iframes 
            that look broken inside your product.
          </p>
        </div>

        {/* Right Column (Scrolling cards) */}
        <div className="flex flex-col gap-5 items-start lg:items-start">
          {cardsData.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="relative max-w-[420px] w-full bg-bg-elevated/40 glass rounded-[16px] p-5 md:p-6 overflow-hidden shadow-card transition-all duration-300"
              >
                {/* Top Right Corner Icon */}
                <div className="absolute top-5 right-5 text-text-brand opacity-25 select-none pointer-events-none">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                
                {/* Massive Number */}
                <div className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] leading-none mb-2.5 gradient-text"
                  style={{
                    backgroundImage: "linear-gradient(120deg, var(--color-primary), var(--color-accent), var(--color-accent))",
                  }}
                >
                  <CardCounter target={card.target} prefix={card.prefix} suffix={card.suffix} />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-text-brand mb-1">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[320px]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}



