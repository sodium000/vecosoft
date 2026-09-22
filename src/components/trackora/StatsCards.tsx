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
        className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5 lg:p-6"
      >
        <p className="text-sm font-medium text-[#737373]">
          Orders in transit
        </p>
        <motion.p
          className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
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
        className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5 lg:p-6"
      >
        <p className="text-sm font-medium text-[#737373]">
          Due for delivery today
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {dueToday}
        </p>
        <p className="mt-8 text-sm text-[#737373]">
          Scheduled for final-mile drop-off today
        </p>
      </motion.div>

      <motion.div
        {...cardMotion}
        className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5 lg:p-6"
      >
        <p className="text-sm font-medium text-[#737373]">
          Average delivery time
        </p>
        <p className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-white">
            {avgTime}
          </span>
          <span className="text-lg text-[#737373]">
            {summaryStats.averageDeliveryTime.unit}
          </span>
        </p>
        <p className="mt-8 text-sm text-[#737373]">Rolling 30-day average</p>
      </motion.div>

      <motion.div
        {...cardMotion}
        className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5 lg:p-6"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-[#737373]">
            On-time delivery rate
          </p>
          <Badge className="border-0 bg-[#baff29]/15 text-[#baff29] hover:bg-[#baff29]/15">
            {summaryStats.onTimeDeliveryRate.label}
          </Badge>
        </div>
        <p className="mt-2 text-4xl font-bold tracking-tight text-white">
          {onTime}%
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {summaryStats.onTimeDeliveryRate.breakdown.map((item) => (
            <span
              key={item.label}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                item.status === "target"
                  ? "bg-[#baff29] text-[#0a0a0a]"
                  : "border border-[#2a2a2a] bg-[#0d0d0f] text-[#a3a3a3]"
              }`}
            >
              {item.label} {item.value}%
            </span>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full border-[#2a2a2a] bg-transparent text-[#fafafa] hover:bg-[#2a2a2a] hover:text-white"
        >
          View details
          <ExternalLink className="size-3.5" />
        </Button>
      </motion.div>
    </div>
  );
}
