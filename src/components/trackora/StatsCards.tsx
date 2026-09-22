"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { summaryStats } from "@/data/mockData";
import { useCountUp } from "@/hooks/useCountUp";
import { OrdersInTransitChart } from "./OrdersInTransitChart";

const cardMotion = {
  whileHover: { y: -4, scale: 1.01 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

export function StatsCards() {
  const transit = useCountUp(summaryStats.ordersInTransit.value);
  const dueToday = useCountUp(summaryStats.dueForDeliveryToday.value);
  const avgTime = useCountUp(summaryStats.averageDeliveryTime.value, 1200, 1);
  const onTime = useCountUp(summaryStats.onTimeDeliveryRate.value, 1200, 1);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <motion.div
        {...cardMotion}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-100 lg:p-6"
      >
        <p className="text-sm font-semibold text-slate-500">
          Orders in transit
        </p>
        <motion.p
          className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {transit}
        </motion.p>
        <OrdersInTransitChart
          trend={summaryStats.ordersInTransit.monthlyTrend}
        />
      </motion.div>

      <motion.div
        {...cardMotion}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-100 lg:p-6"
      >
        <p className="text-sm font-semibold text-slate-500">
          Due for delivery today
        </p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {dueToday}
        </p>
        <p className="mt-8 text-sm text-slate-500">
          Scheduled for final-mile drop-off today
        </p>
      </motion.div>

      <motion.div
        {...cardMotion}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-100 lg:p-6"
      >
        <p className="text-sm font-semibold text-slate-500">
          Average delivery time
        </p>
        <p className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            {avgTime}
          </span>
          <span className="text-lg font-medium text-slate-500">
            {summaryStats.averageDeliveryTime.unit}
          </span>
        </p>
        <p className="mt-8 text-sm text-slate-500">Rolling 30-day average</p>
      </motion.div>

      <motion.div
        {...cardMotion}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-100 lg:p-6"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-500">
            On-time delivery rate
          </p>
          <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-50">
            {summaryStats.onTimeDeliveryRate.label}
          </Badge>
        </div>
        <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
          {onTime}%
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {summaryStats.onTimeDeliveryRate.breakdown.map((item) => (
            <span
              key={item.label}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                item.status === "target"
                  ? "bg-emerald-100 text-emerald-800"
                  : "border border-slate-200 bg-slate-100 text-slate-600"
              }`}
            >
              {item.label} {item.value}%
            </span>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
          View details
          <ExternalLink className="size-3.5 text-slate-500" />
        </Button>
      </motion.div>
    </div>
  );
}
