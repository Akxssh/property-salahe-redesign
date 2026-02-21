"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

interface GradientBlobProps {
  className?: string;
  style?: CSSProperties;
}

export function GradientBlob({ className, style }: GradientBlobProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        ...style,
      }}
      className={cn(
        "absolute rounded-full blur-3xl opacity-30",
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
        className
      )}
    />
  );
}

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] opacity-20 blur-3xl"
      />
    </div>
  );
}
