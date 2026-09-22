"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { OrderScenario, ViewMode } from "@/types/order";
import { getOrderByScenario } from "@/data/orderData";
import { OrderTracker } from "./OrderTracker";
import { OrderTrackerSkeleton } from "./OrderTrackerSkeleton";
import { OrderTrackerError } from "./OrderTrackerError";

const VALID_SCENARIOS: OrderScenario[] = [
  "in_transit",
  "delayed",
  "delivered_not_received",
  "tracking_unavailable",
];

function parseScenario(value: string | null): OrderScenario {
  if (value && VALID_SCENARIOS.includes(value as OrderScenario)) {
    return value as OrderScenario;
  }
  return "in_transit";
}

function parseViewMode(value: string | null): ViewMode {
  if (value === "loading" || value === "error") return value;
  return "content";
}

export function OrderTrackerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [scenario, setScenario] = useState<OrderScenario>(() =>
    parseScenario(searchParams.get("scenario"))
  );
  const [viewMode, setViewMode] = useState<ViewMode>(() =>
    parseViewMode(searchParams.get("view"))
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("scenario", scenario);
    if (viewMode !== "content") params.set("view", viewMode);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [scenario, viewMode, router]);

  const handleScenarioChange = useCallback((s: OrderScenario) => {
    setScenario(s);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const handleRetry = useCallback(() => {
    setViewMode("loading");
    setTimeout(() => setViewMode("content"), 1500);
  }, []);

  const baseOrder = getOrderByScenario(scenario);

  if (isInitialLoading) {
    return (
      <div className="mx-auto min-h-screen max-w-[430px] bg-slate-50">
        <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md">
          <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
        </div>
        <OrderTrackerSkeleton />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {viewMode === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-auto min-h-screen max-w-[430px] bg-slate-50"
        >
          <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md">
            <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
          </div>
          <OrderTrackerSkeleton />
        </motion.div>
      )}

      {viewMode === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-slate-50"
        >
          <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md">
            <p className="text-base font-semibold">Order Tracking</p>
          </div>
          <OrderTrackerError onRetry={handleRetry} />
        </motion.div>
      )}

      {viewMode === "content" && (
        <motion.div
          key={`tracker-${scenario}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <OrderTracker
            baseOrder={baseOrder}
            scenario={scenario}
            viewMode={viewMode}
            onScenarioChange={handleScenarioChange}
            onViewModeChange={handleViewModeChange}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
