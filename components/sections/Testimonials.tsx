"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialAuthor {
  initials: string;
  name: string;
  role: string;
}

interface Testimonial {
  quote: string;
  author: TestimonialAuthor;
}

const testimonialsData: Testimonial[] = [
  {
    quote: "We replaced 6 months of planned engineering work with Prism in a single afternoon. Our customers had no idea we were using a third-party SDK — it looked completely native to our product.",
    author: {
      initials: "SC",
      name: "Sarah Chen",
      role: "CTO at Lumen Health",
    },
  },
  {
    quote: "The white-labeling is unreal. We customized every token to match our brand perfectly. Customers genuinely believe we built our analytics dashboard in-house. That's the ultimate compliment.",
    author: {
      initials: "MW",
      name: "Marcus Webb",
      role: "VP Engineering at Vault Finance",
    },
  },
  {
    quote: "Self-serve chart builder cut our customer support tickets in half. Users love being able to create their own reports without filing a ticket. Game-changer for our team.",
    author: {
      initials: "PP",
      name: "Priya Patel",
      role: "Founder at Stitch",
    },
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

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <span className="inline-block text-[13px] font-semibold text-brand uppercase tracking-[0.15em] mb-4">
            Testimonials
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-text-brand mb-6"
          >
            <span
              className="gradient-text bg-[length:200%_auto] animate-[text-shimmer_8s_ease_infinite] inline-block"
              style={{
                backgroundImage: "linear-gradient(120deg, var(--color-primary), var(--color-accent), var(--color-accent), var(--color-primary))",
              }}
            >
              {"Loved".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>{" "}
            {"by engineering teams.".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.4em] -mb-[0.4em] pt-[0.1em] -mt-[0.1em]">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Hear from CTOs and engineers who shipped analytics in days, not months.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="group bg-bg-elevated/60 backdrop-blur-xl border border-border-subtle rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-between min-h-[240px] transition-colors duration-300 text-left"
            >
              
              {/* Decorative Quote Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="absolute top-6 left-6 w-12 h-12 opacity-10 transition-all duration-300 pointer-events-none"
              >
                <defs>
                  <linearGradient id={`quote-grad-${idx}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-accent)" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 11H5.7C5.3 11 5 10.7 5 10.3V8.7C5 6.7 6.7 5 8.7 5H9C9.6 5 10 4.6 10 4V3C10 2.4 9.6 2 9 2H8.7C5 2 2 5 2 8.7V17C2 19.8 4.2 22 7 22H10C10.6 22 11 21.6 11 21V12C11 11.4 10.6 11 10 11ZM22 11H17.7C17.3 11 17 10.7 17 10.3V8.7C17 6.7 18.7 5 20.7 5H21C21.6 5 22 4.6 22 4V3C22 2.4 21.6 2 21 2H20.7C17 2 14 5 14 8.7V17C14 19.8 16.2 22 19 22H22C22.6 22 23 21.6 23 21V12C23 11.4 22.6 11 22 11Z"
                  fill={`url(#quote-grad-${idx})`}
                />
              </svg>

              {/* Star Rating */}
              <div className="absolute top-8 right-8 flex gap-1 z-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-status-warning text-status-warning" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-text-brand text-[13px] leading-relaxed italic mt-10 flex-1 relative z-10">
                &quot;{t.quote}&quot;
              </p>

              {/* Author block */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-subtle relative z-10">
                {/* Avatar with unique gradient */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-text-primary font-bold text-sm border shrink-0 shadow-sm"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 40%, transparent)",
                    borderColor: "color-mix(in srgb, var(--color-primary) 50%, transparent)"
                  }}
                >
                  {t.author.initials}
                </div>
                {/* Author info */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-text-brand">
                    {t.author.name}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {t.author.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}




