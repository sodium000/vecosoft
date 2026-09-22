"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import type { DeliveryStep } from "@/types/order";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const STEPS: DeliveryStep[] = [
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
];

const STEP_LABELS: Record<DeliveryStep, string> = {
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

interface DeliveryProgressChartProps {
  progressPercent: number;
  currentStatus: DeliveryStep;
}

export function DeliveryProgressChart({
  progressPercent,
  currentStatus,
}: DeliveryProgressChartProps) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercent));
  const stepIndex = STEPS.indexOf(currentStatus);

  const doughnutData = useMemo(
    () => ({
      labels: ["Complete", "Remaining"],
      datasets: [
        {
          data: [clampedProgress, 100 - clampedProgress],
          backgroundColor: ["#2563eb", "#f1f5f9"],
          borderWidth: 0,
          cutout: "78%",
        },
      ],
    }),
    [clampedProgress]
  );

  const barData = useMemo(
    () => ({
      labels: STEPS.map((s) => STEP_LABELS[s]),
      datasets: [
        {
          label: "Step Progress",
          data: STEPS.map((step, i) => {
            if (i < stepIndex) return 100;
            if (i === stepIndex) return clampedProgress % 25 === 0 ? 100 : 75;
            return 0;
          }),
          backgroundColor: STEPS.map((_, i) => {
            if (i < stepIndex) return "#10b981";
            if (i === stepIndex) return "#2563eb";
            return "#f1f5f9";
          }),
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    }),
    [stepIndex, clampedProgress]
  );

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const barOptions: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600, easing: "easeOutQuart" },
    scales: {
      x: {
        max: 100,
        display: false,
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: "#64748b" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.x}% complete`,
        },
      },
    },
  };

  const chartKey = `${clampedProgress}-${currentStatus}`;

  return (
    <motion.div
      key={chartKey}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full min-w-0 flex-col gap-4 md:gap-6 lg:flex-row lg:items-center lg:justify-between xl:gap-8"
    >
      <div className="relative mx-auto h-36 w-36 shrink-0 sm:h-40 sm:w-40 md:h-44 md:w-44 lg:mx-0">
        <Doughnut
          key={`doughnut-${chartKey}`}
          data={doughnutData}
          options={doughnutOptions}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={clampedProgress}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-extrabold text-blue-600 sm:text-3xl"
          >
            {clampedProgress}%
          </motion.span>
          <span className="text-xs font-medium text-slate-500">Journey</span>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-4 lg:max-w-none">
        <div className="h-28 w-full sm:h-32 md:h-36">
          <Bar
            key={`bar-${chartKey}`}
            data={barData}
            options={barOptions}
          />
        </div>

        <div className="grid grid-cols-4 gap-1 px-0.5 sm:gap-2">
        {STEPS.map((step, i) => (
          <div key={step} className="flex min-w-0 flex-col items-center gap-1">
            <div
              className={`size-2.5 shrink-0 rounded-full transition-colors duration-300 sm:size-3 ${
                i <= stepIndex
                  ? i === stepIndex
                    ? "bg-blue-600 ring-4 ring-blue-100"
                    : "bg-emerald-500"
                  : "bg-slate-200"
              }`}
            />
            <span
              className={`w-full max-w-[5.5rem] text-center text-[10px] leading-tight sm:text-xs ${
                i === stepIndex
                  ? "font-bold text-blue-600"
                  : i < stepIndex
                    ? "font-medium text-emerald-700"
                    : "text-slate-400"
              }`}
            >
              {STEP_LABELS[step]}
            </span>
          </div>
        ))}
        </div>
      </div>
    </motion.div>
  );
}
