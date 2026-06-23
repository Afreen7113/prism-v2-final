"use client";

import { motion } from "framer-motion";

const row1Logos = [
  { name: "Linear", style: "font-bold tracking-tighter" },
  { name: "Vercel", style: "font-semibold tracking-normal" },
  { name: "Stripe", style: "font-bold italic" },
  { name: "Notion", style: "font-medium tracking-wider" },
  { name: "Framer", style: "font-extrabold tracking-tight" },
  { name: "Cal.com", style: "font-semibold" },
  { name: "Resend", style: "font-medium" },
  { name: "Supabase", style: "font-semibold" },
];

const row2Logos = [
  { name: "Datadog", style: "font-bold tracking-tight" },
  { name: "MongoDB", style: "font-medium tracking-wide" },
  { name: "Twilio", style: "font-semibold" },
  { name: "Cloudflare", style: "font-bold tracking-tighter" },
  { name: "Algolia", style: "font-semibold tracking-normal" },
  { name: "PostHog", style: "font-extrabold tracking-tight" },
  { name: "Plaid", style: "font-bold italic" },
  { name: "Auth0", style: "font-medium tracking-wider" },
];

export default function LogoMarquee() {
  return (
    <section 
      className="relative py-6 bg-bg-base border-y border-border-subtle overflow-hidden select-none z-10"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-4 px-6">
        <h2 className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase">
          Powering Analytics for the World&apos;s Best Products
        </h2>
      </div>

      {/* Marquee Body */}
      <div className="flex flex-col gap-3">
        
        {/* Row 1 (scrolls LEFT to RIGHT, 20s loop) */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex shrink-0"
          >
            {/* Duplicate the array twice for seamless looping */}
            {[...row1Logos, ...row1Logos].map((logo, idx) => (
              <span
                key={`r1-${idx}`}
                className={`inline-block text-[15px] text-text-muted hover:text-text-brand px-8 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 ${logo.style}`}
              >
                {logo.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Row 2 (scrolls RIGHT to LEFT, 25s loop) */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex shrink-0"
          >
            {/* Duplicate the array twice for seamless looping */}
            {[...row2Logos, ...row2Logos].map((logo, idx) => (
              <span
                key={`r2-${idx}`}
                className={`inline-block text-[15px] text-text-muted hover:text-text-brand px-8 cursor-pointer select-none whitespace-nowrap transition-all duration-300 hover:scale-105 ${logo.style}`}
              >
                {logo.name}
              </span>
            ))}
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
