"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
}

export default function AnimatedHeading({
  children,
  className = "",
  as = "h2",
  delay = 0,
}: AnimatedHeadingProps) {
  // Split words
  if (typeof children === "string") {
    const words = children.split(" ");

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: delay,
        },
      },
    };

    const wordVariants: Variants = {
      hidden: { opacity: 0, y: 22 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };

    const MotionTag = motion[as];

    return (
      <MotionTag
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className={className}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.28em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  // Fallback heading
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
