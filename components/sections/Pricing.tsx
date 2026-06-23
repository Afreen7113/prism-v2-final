"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-bg-base relative z-10 overflow-hidden text-center">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/5 pointer-events-none blur-[40px] z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-12 px-6">
          <span className="inline-block text-[13px] font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Pricing
          </span>
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.05] text-text-brand mb-6"
          >
            {"Simple pricing. Built for".split(" ").map((word, i) => (
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Start free. Pay only when you&apos;re ready to ship to real customers.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <div className="bg-bg-base/5 border border-border-subtle p-1 rounded-full flex w-fit select-none">
            <Button
  variant={billing === "monthly" ? "primary" : "ghost"}
  size="sm"
  onClick={() => setBilling("monthly")}
>
  Monthly
</Button>
            <Button
              variant={billing === "annual" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setBilling("annual")}
              className="flex items-center gap-4"
            >
              <span>Annual</span>
              <span className="bg-gradient-to-r from-primary to-tertiary text-text-on-primary text-[10px] py-0.5 px-3 rounded-full font-bold leading-none flex items-center justify-center min-h-[22px] whitespace-nowrap">
                Save 20%
              </span>
            </Button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Starter */}
          <div className="bg-bg-elevated/60 border border-border-subtle hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] rounded-[24px] p-6 sm:p-8 flex flex-col text-left transition-all duration-300 hover:shadow-card hover:shadow-card group">
            <div className="flex flex-col flex-1">
              <span className="text-xl font-bold text-text-primary block">Starter</span>
              <span className="text-xs text-text-secondary mt-1 block">For early-stage products</span>
              
              <div className="mt-6 flex flex-col justify-end h-[64px]">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight text-text-primary">$0</span>
                  <span className="text-sm text-text-secondary ml-1">/month</span>
                </div>
              </div>
 
              <Button variant="outline" className="w-full mt-6 h-12">
                Start free
              </Button>
 
              <div className="w-full h-[1px] bg-border-subtle my-6" />
 
              <div className="flex flex-col gap-5">
                {[
                  "Up to 1,000 MAUs",
                  "React SDK access",
                  "3 chart types",
                  "Community support",
                  "Prism branding required",
                  "Standard themes",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <Check className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg text-text-primary font-medium leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Card 2: Growth (Highlighted) */}
          <div className="relative scale-100 md:scale-105 z-10 flex flex-col transition-transform duration-300 group/growth">
            
            {/* Semantic ambient glow behind the card */}
            <div className="absolute -inset-[1px] rounded-[24px] bg-brand/10 blur-md z-0" />
            
            {/* MOST POPULAR Badge */}
            <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-brand text-white text-[11px] font-bold py-1.5 px-4 rounded-full tracking-wider uppercase shadow-md z-20">
              Most Popular
            </span>
 
            <div className="relative bg-bg-surface border-2 border-brand/30 hover:border-brand/60 rounded-[24px] p-6 sm:p-8 flex flex-col text-left h-full shadow-card z-10 transition-all duration-300 flex-1 hover:shadow-card hover:shadow-card">
              <div className="flex flex-col flex-1">
                <span className="text-xl font-bold text-text-primary block">Growth</span>
                <span className="text-xs text-text-secondary mt-1 block">For scaling B2B SaaS</span>
                
                <div className="mt-6 flex flex-col justify-end h-[64px]">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold tracking-tight text-text-primary transition-all duration-300">
                      {billing === "monthly" ? "$499" : "$399"}
                    </span>
                    <span className="text-sm text-text-secondary ml-1">/month</span>
                  </div>
                  {billing === "annual" && (
                    <span className="text-[10px] text-status-success font-mono mt-1 font-semibold block">
                      * billed annually ($4,788/yr)
                    </span>
                  )}
                </div>
 
                <Button variant="primary" className="w-full mt-6 h-12">
                  Start 14-day trial
                </Button>
 
                <div className="w-full h-[1px] bg-border-subtle my-6" />
 
                <div className="flex flex-col gap-5">
                  {[
                    "Up to 50,000 MAUs",
                    "Full React + Vue SDK",
                    "All 15+ chart types",
                    "Full white-label theming engine",
                    "CSV + PDF exports",
                    "Priority support (4hr response)",
                    "Custom domain",
                    "Remove Prism branding",
                    "Advanced analytics",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <Check className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                      <span className="text-base sm:text-lg text-text-primary font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
 
          {/* Card 3: Enterprise */}
          <div className="bg-bg-elevated/60 border border-border-subtle hover:border-[color-mix(in_srgb,var(--color-brand)_30%,transparent)] rounded-[24px] p-6 sm:p-8 flex flex-col text-left transition-all duration-300 hover:shadow-card hover:shadow-card group">
            <div className="flex flex-col flex-1">
              <span className="text-xl font-bold text-text-primary block">Enterprise</span>
              <span className="text-xs text-text-secondary mt-1 block">For mission-critical deployments</span>
              
              <div className="mt-6 flex flex-col justify-end h-[64px]">
                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">Custom</span>
                </div>
              </div>
 
              <Button variant="outline" className="w-full mt-6 h-12">
                Contact sales
              </Button>
 
              <div className="w-full h-[1px] bg-border-subtle my-6" />
 
              <div className="flex flex-col gap-5">
                {[
                  "Unlimited MAUs",
                  "Self-hosted option available",
                  "Full REST API access",
                  "SSO + SAML authentication",
                  "Dedicated success manager",
                  "99.99% SLA guaranteed",
                  "SOC 2 + HIPAA + GDPR compliance",
                  "Custom contract terms",
                  "White-glove onboarding",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <Check className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg text-text-primary font-medium leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <span className="text-sm text-text-secondary">
            Need a custom solution for your team?{" "}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline cursor-pointer group"
            >
              <span>Talk to our team</span>
              <motion.span
                variants={{
                  hover: { x: 4 },
                }}
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </motion.span>
            </motion.a>
          </span>
        </div>

      </div>
    </section>
  );
}




