"use client";

import { motion } from "framer-motion";
import { Check, Truck } from "lucide-react";
import type { ShipmentStep } from "@/data/mockData";

interface ShipmentTrackerProps {
  steps: ShipmentStep[];
  orderKey: string;
}

export function ShipmentTracker({ steps, orderKey }: ShipmentTrackerProps) {
  const currentIndex = steps.findIndex((s) => s.current);
  const lastCompleted = steps.reduce(
    (acc, s, i) => (s.completed ? i : acc),
    -1
  );
  const fillThrough =
    currentIndex >= 0 ? currentIndex : Math.max(lastCompleted, 0);
  const segmentCount = Math.max(steps.length - 1, 1);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const isCurrent = step.current;
          const isDone = step.completed && !step.current;
          const showLine = index < steps.length - 1;

          return (
            <div
              key={`${orderKey}-${step.label}`}
              className="relative flex flex-1 flex-col items-center"
            >
              {showLine && (
                <div className="absolute left-[calc(50%+16px)] top-4 h-0.5 w-[calc(100%-32px)] bg-[#e5e5e5]">
                  <motion.div
                    key={`line-${orderKey}-${index}`}
                    className="h-full origin-left bg-[#baff29]"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: index < fillThrough ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                  />
                </div>
              )}

              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.35 }}
                className={`relative z-10 flex size-8 items-center justify-center rounded-full border-2 sm:size-9 ${
                  isDone
                    ? "border-[#baff29] bg-[#baff29] text-[#0a0a0a]"
                    : isCurrent
                      ? "border-[#baff29] bg-white text-[#0a0a0a] shadow-[0_0_0_4px_rgba(186,255,41,0.25)]"
                      : "border-[#d4d4d4] bg-white text-[#a3a3a3]"
                }`}
              >
                {isDone ? (
                  <Check className="size-4" strokeWidth={3} />
                ) : isCurrent ? (
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                  >
                    <Truck className="size-4" />
                  </motion.span>
                ) : (
                  <span className="size-2 rounded-full bg-[#d4d4d4]" />
                )}
              </motion.div>

              <p className="mt-3 max-w-[5rem] text-center text-[10px] font-semibold leading-tight text-[#171717] sm:max-w-none sm:text-xs">
                {step.label}
              </p>
              <p className="mt-1 text-center text-[10px] text-[#737373] sm:text-xs">
                {step.date}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
