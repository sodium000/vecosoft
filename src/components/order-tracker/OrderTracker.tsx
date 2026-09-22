"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Headphones, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  DeliveryStep,
  DynamicOrderState,
  OrderScenario,
  OrderTrackingData,
} from "@/types/order";
import { OrderTrackerHeader } from "./OrderTrackerHeader";
import { ProductSummaryCard } from "./ProductSummaryCard";
import { DeliveryProgressChart } from "./DeliveryProgressChart";
import { DeliveryTimeline } from "./DeliveryTimeline";
import { StatusBanner } from "./StatusBanner";
import { SupportSheet } from "./SupportSheet";
import { ReportIssueDialog } from "./ReportIssueDialog";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { StickyActionBar } from "./StickyActionBar";
import { EmptyTrackingState } from "./EmptyTrackingState";
import { DynamicInputPanel } from "./DynamicInputPanel";
import { orderTrackInset, orderTrackShell } from "@/lib/responsive-layout";

const STEPS: DeliveryStep[] = [
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
];

interface OrderTrackerProps {
  baseOrder: OrderTrackingData;
  scenario: OrderScenario;
}

function buildTimelineFromState(
  baseTimeline: OrderTrackingData["timeline"],
  currentStatus: DeliveryStep
) {
  const stepIndex = STEPS.indexOf(currentStatus);
  return baseTimeline.map((event, i) => ({
    ...event,
    completed: i < stepIndex,
    active: i === stepIndex,
    step: STEPS[i] ?? event.step,
    label: event.label,
  }));
}

function getStatusColor(scenario: OrderScenario, status: DeliveryStep) {
  if (scenario === "delayed") return "text-amber-700 border-amber-200 bg-amber-50";
  if (scenario === "delivered_not_received") return "text-blue-700 border-blue-200 bg-blue-50";
  if (scenario === "tracking_unavailable") return "text-blue-700 border-blue-200 bg-blue-50";
  if (status === "delivered") return "text-emerald-700 border-emerald-200 bg-emerald-50";
  return "text-blue-700 border-blue-200 bg-blue-50";
}

export function OrderTracker({
  baseOrder,
  scenario,
}: OrderTrackerProps) {
  const [supportOpen, setSupportOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [notifySent, setNotifySent] = useState(false);

  const [dynamicState, setDynamicState] = useState<DynamicOrderState>(() => ({
    progressPercent: baseOrder.progressPercent,
    currentStatus: baseOrder.currentStatus,
    statusLabel: baseOrder.statusLabel,
    estimatedDelivery: baseOrder.estimatedDelivery,
    originalEta: baseOrder.originalEta ?? "",
    newEta: baseOrder.newEta ?? "",
    productName: baseOrder.product.name,
    quantity: baseOrder.product.quantity,
    price: baseOrder.product.price,
  }));

  useEffect(() => {
    setDynamicState({
      progressPercent: baseOrder.progressPercent,
      currentStatus: baseOrder.currentStatus,
      statusLabel: baseOrder.statusLabel,
      estimatedDelivery: baseOrder.estimatedDelivery,
      originalEta: baseOrder.originalEta ?? "",
      newEta: baseOrder.newEta ?? "",
      productName: baseOrder.product.name,
      quantity: baseOrder.product.quantity,
      price: baseOrder.product.price,
    });
  }, [baseOrder, scenario]);

  const handleDynamicChange = useCallback(
    (updates: Partial<DynamicOrderState>) => {
      setDynamicState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const liveOrder = useMemo<OrderTrackingData>(() => {
    const timeline = buildTimelineFromState(
      baseOrder.timeline,
      dynamicState.currentStatus
    );

    return {
      ...baseOrder,
      scenario,
      currentStatus: dynamicState.currentStatus,
      statusLabel: dynamicState.statusLabel,
      progressPercent: dynamicState.progressPercent,
      estimatedDelivery: dynamicState.estimatedDelivery,
      originalEta: dynamicState.originalEta || baseOrder.originalEta,
      newEta: dynamicState.newEta || baseOrder.newEta,
      product: {
        ...baseOrder.product,
        name: dynamicState.productName,
        quantity: dynamicState.quantity,
        price: dynamicState.price,
      },
      timeline,
    };
  }, [baseOrder, scenario, dynamicState]);

  const statusColor = getStatusColor(scenario, liveOrder.currentStatus);

  return (
    <div className={orderTrackShell}>
      <OrderTrackerHeader orderId={liveOrder.id} />

      <div className={orderTrackInset}>
        <motion.div
          key={`content-${scenario}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 lg:space-y-0"
        >
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8 xl:grid-cols-12">
            <div className="min-w-0 space-y-4 md:space-y-5 lg:col-span-1 xl:col-span-5">
              <ProductSummaryCard
                product={liveOrder.product}
                orderId={liveOrder.id}
              />

              <DynamicInputPanel
                state={dynamicState}
                onChange={handleDynamicChange}
              />
            </div>

            <div className="min-w-0 space-y-4 md:space-y-5 lg:col-span-1 xl:col-span-7">
              <StatusBanner
                scenario={scenario}
                originalEta={liveOrder.originalEta}
                newEta={liveOrder.newEta}
                onTrackUpdate={() => setSupportOpen(true)}
                onContactSupport={() => setSupportOpen(true)}
                onReportMissing={() => setReportOpen(true)}
              />

              {scenario === "tracking_unavailable" ? (
                <EmptyTrackingState
                  updateEstimate={baseOrder.trackingUpdateEstimate}
                  showSkeleton={false}
                  onNotify={() => setNotifySent(true)}
                  onContactSupport={() => setSupportOpen(true)}
                />
              ) : (
                <Card className="overflow-hidden border border-slate-200/90 bg-white text-slate-900 shadow-sm shadow-slate-100">
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <div className="text-center md:text-left lg:text-center xl:text-left">
                      <Badge
                        variant="outline"
                        className={`mb-2 font-semibold ${statusColor}`}
                      >
                        {liveOrder.statusLabel}
                      </Badge>
                      <motion.h2
                        key={liveOrder.statusLabel}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-extrabold text-slate-900 sm:text-2xl"
                      >
                        {liveOrder.statusLabel}
                      </motion.h2>
                      <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-500 md:justify-start lg:justify-center xl:justify-start">
                        <Clock className="size-4 shrink-0 text-blue-600" />
                        <motion.span
                          key={liveOrder.estimatedDelivery}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {liveOrder.estimatedDelivery}
                        </motion.span>
                      </div>
                      {liveOrder.deliveredLocation && (
                        <p className="mt-1 text-sm text-slate-500">
                          {liveOrder.deliveredLocation}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 md:mt-6">
                      <DeliveryProgressChart
                        progressPercent={liveOrder.progressPercent}
                        currentStatus={liveOrder.currentStatus}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {scenario !== "tracking_unavailable" && (
                <DeliveryTimeline events={liveOrder.timeline} />
              )}

              {notifySent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center text-sm font-semibold text-blue-700"
                >
                  You&apos;ll be notified when tracking is available!
                </motion.div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 gap-2 sm:h-11 border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900"
                  onClick={() => setSupportOpen(true)}
                >
                  <Headphones className="size-4 text-blue-600" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 sm:h-11 border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900"
                  onClick={() => setReportOpen(true)}
                >
                  <AlertCircle className="size-4 text-slate-400" />
                  Report an Issue
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <StickyActionBar
        onViewDetails={() => setDetailsOpen(true)}
        onContactSupport={() => setSupportOpen(true)}
      />

      <SupportSheet open={supportOpen} onOpenChange={setSupportOpen} />
      <ReportIssueDialog open={reportOpen} onOpenChange={setReportOpen} />
      <OrderDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        order={liveOrder}
      />
    </div>
  );
}
