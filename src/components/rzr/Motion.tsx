"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
};

const buildVariants = (y: number, delay: number, reduced: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : y,
    filter: reduced ? "none" : "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: reduced ? 0 : 0.55,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/** Fade-in-up on scroll, respecting reduced motion. */
export function FadeIn({ children, className, delay = 0, y = 16, once = true, as = "div" }: AnimationProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={cn(className)}
      variants={buildVariants(y, delay, !!reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </Comp>
  );
}

/** Stagger container for child FadeIn elements. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const MotionItem = motion.div;
