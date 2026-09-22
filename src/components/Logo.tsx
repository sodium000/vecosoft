"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const sizes = {
  sm: { icon: 20, title: "text-sm", tagline: "text-[10px]" },
  md: { icon: 24, title: "text-base", tagline: "text-xs" },
  lg: { icon: 32, title: "text-xl", tagline: "text-sm" },
};

export function Logo({ size = "md", showTagline = false }: LogoProps) {
  const s = sizes[size];

  return (
    <motion.div
      className="flex items-center gap-2.5"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/25">
        <Package className="size-5 text-white" strokeWidth={2.2} />
        <div className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-400" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-bold tracking-tight text-foreground ${s.title}`}>
          Veco<span className="text-blue-600">Soft</span>
        </span>
        {showTagline && (
          <span className={`mt-0.5 font-medium text-muted-foreground ${s.tagline}`}>
            Order Track
          </span>
        )}
      </div>
    </motion.div>
  );
}
