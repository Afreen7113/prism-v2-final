"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
  once?: boolean;
  trigger?: "mount" | "view";
}

export default function RevealText({
  text,
  className = "",
  tag = "h2",
  delay = 0,
  once = true,
  trigger = "view",
}: RevealTextProps) {
  const words = text.split(/\s+/);
  const Tag = tag;

  // Determine text justification based on Tailwind text alignment classes
  const isCentered = className.includes("text-center") || className.includes("mx-auto");
  const isRight = className.includes("text-right");
  const justification = isCentered ? "justify-center" : isRight ? "justify-end" : "justify-start";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "105%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 120,
        duration: 0.6,
      },
    },
  };

  const motionProps = trigger === "mount"
    ? {
        animate: "visible",
      }
    : {
        whileInView: "visible",
        viewport: { once, margin: "-40px" },
      };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        {...motionProps}
        className={`flex flex-wrap ${justification} w-full`}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden mr-[0.22em] pb-[0.5em] -mb-[0.5em] pt-[0.2em] -mt-[0.2em]"
          >
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
