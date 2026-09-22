"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { OrderScenario, ViewMode } from "@/types/order";
import { getOrderByScenario } from "@/data/orderData";
import { OrderTracker } from "./OrderTracker";
import { OrderTrackerSkeleton } from "./OrderTrackerSkeleton";
import { OrderTrackerError } from "./OrderTrackerError";
import { orderTrackHeaderBar, orderTrackInset, orderTrackShell } from "@/lib/responsive-layout";

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
      <div className={orderTrackShell}>
        <div className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
          <div className={orderTrackHeaderBar}>
            <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100 sm:h-11" />
          </div>
        </div>
        <div className={orderTrackInset}>
          <OrderTrackerSkeleton />
        </div>
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
          className={orderTrackShell}
        >
          <div className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
            <div className={orderTrackHeaderBar}>
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100 sm:h-11" />
            </div>
          </div>
          <div className={orderTrackInset}>
            <OrderTrackerSkeleton />
          </div>
        </motion.div>
      )}

      {viewMode === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${orderTrackShell} flex flex-col`}
        >
          <div className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
            <div className={orderTrackHeaderBar}>
              <p className="text-base font-semibold sm:text-lg">Order Tracking</p>
            </div>
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
