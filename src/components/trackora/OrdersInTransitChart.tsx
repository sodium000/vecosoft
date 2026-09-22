"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { CustomerAvatar } from "./CustomerAvatar";
import { summaryStats } from "@/data/mockData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type MonthlyTrend = (typeof summaryStats.ordersInTransit.monthlyTrend)[number];

const avatarNames = [
  "James Carter",
  "Sophia Lee",
  "Maria Jones",
  "David Kim",
  "Priya Nair",
  "Alex Morgan",
  "Sam Rivera",
  "Jordan Lee",
  "Casey Wu",
  "Taylor Brooks",
];

interface OrdersInTransitChartProps {
  trend: MonthlyTrend[];
}

export function OrdersInTransitChart({ trend }: OrdersInTransitChartProps) {
  const maxVal = Math.max(...trend.map((t) => t.value), 1);

  const chartData = useMemo(
    () => ({
      labels: trend.map((t) => t.month),
      datasets: [
        {
          data: trend.map((t) => t.value),
          backgroundColor: "#2563eb",
          borderRadius: 999,
          borderSkipped: false,
          barThickness: 14,
        },
      ],
    }),
    [trend]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: "easeOutQuart" as const },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#0f172a",
          bodyColor: "#2563eb",
          borderColor: "#e2e8f0",
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#64748b", font: { size: 10 } },
          border: { display: false },
        },
        y: { display: false, max: maxVal * 1.15 },
      },
    }),
    [maxVal]
  );

  return (
    <div className="mt-3 space-y-2">
      <div className="h-[88px] w-full">
        <Bar data={chartData} options={options} />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {trend.map((month, idx) => (
          <div key={month.month} className="flex flex-col items-center gap-1">
            <div className="flex -space-x-1.5">
              {month.avatars.length > 0 ? (
                month.avatars.slice(0, 3).map((av, i) => (
                  <CustomerAvatar
                    key={av}
                    name={avatarNames[(idx * 3 + i) % avatarNames.length]}
                    src={av}
                    size="sm"
                    className="size-6 border-2 border-white shadow-xs"
                  />
                ))
              ) : (
                <span className="h-6" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
