"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Headphones, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  DeliveryStep,
  DynamicOrderState,
  OrderScenario,
  OrderTrackingData,
  ViewMode,
} from "@/types/order";
import { scenarioLabels } from "@/data/orderData";
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
  viewMode: ViewMode;
  onScenarioChange: (scenario: OrderScenario) => void;
  onViewModeChange: (mode: ViewMode) => void;
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
  if (scenario === "delayed") return "text-amber-600";
  if (scenario === "delivered_not_received") return "text-emerald-600";
  if (scenario === "tracking_unavailable") return "text-blue-600";
  if (status === "delivered") return "text-emerald-600";
  return "text-blue-600";
}

export function OrderTracker({
  baseOrder,
  scenario,
  viewMode,
  onScenarioChange,
  onViewModeChange,
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
        {/* Dev controls: scenario + view mode tabs */}
        <Card className="border-slate-200/60 bg-white/80">
          <CardContent className="space-y-3 p-3">
            <p className="text-xs font-medium text-muted-foreground">
              Preview States
            </p>
            <Tabs
              value={scenario}
              onValueChange={(v) => onScenarioChange(v as OrderScenario)}
            >
              <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-slate-100 p-1 sm:grid-cols-4">
                {(Object.keys(scenarioLabels) as OrderScenario[]).map((s) => (
                  <TabsTrigger
                    key={s}
                    value={s}
                    className="px-1 py-1.5 text-[10px] leading-tight sm:text-xs sm:py-2"
                  >
                    {scenarioLabels[s]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Tabs
              value={viewMode}
              onValueChange={(v) => onViewModeChange(v as ViewMode)}
            >
              <TabsList className="grid w-full grid-cols-3 bg-slate-100">
                <TabsTrigger value="content" className="text-xs">
                  Content
                </TabsTrigger>
                <TabsTrigger value="loading" className="text-xs">
                  Loading
                </TabsTrigger>
                <TabsTrigger value="error" className="text-xs">
                  Error
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {viewMode === "content" && (
            <motion.div
              key={`content-${scenario}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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
                      showSkeleton
                      onNotify={() => setNotifySent(true)}
                      onContactSupport={() => setSupportOpen(true)}
                    />
                  ) : (
                    <Card className="overflow-hidden border-slate-200/80 shadow-sm">
                      <CardContent className="p-4 sm:p-5 md:p-6">
                        <div className="text-center md:text-left lg:text-center xl:text-left">
                          <Badge
                            variant="outline"
                            className={`mb-2 border-current ${statusColor}`}
                          >
                            {liveOrder.statusLabel}
                          </Badge>
                          <motion.h2
                            key={liveOrder.statusLabel}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-xl font-bold sm:text-2xl md:text-3xl ${statusColor}`}
                          >
                            {liveOrder.statusLabel}
                          </motion.h2>
                          <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:text-base md:justify-start lg:justify-center xl:justify-start">
                            <Clock className="size-4 shrink-0" />
                            <motion.span
                              key={liveOrder.estimatedDelivery}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-left"
                            >
                              {liveOrder.estimatedDelivery}
                            </motion.span>
                          </div>
                          {liveOrder.deliveredLocation && (
                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
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
                      className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700 sm:text-base"
                    >
                      You&apos;ll be notified when tracking is available!
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 sm:h-11"
                      onClick={() => setSupportOpen(true)}
                    >
                      <Headphones className="size-4" />
                      Contact Support
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2 sm:h-11"
                      onClick={() => setReportOpen(true)}
                    >
                      <AlertCircle className="size-4" />
                      Report an Issue
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {viewMode === "content" && (
        <StickyActionBar
          onViewDetails={() => setDetailsOpen(true)}
          onContactSupport={() => setSupportOpen(true)}
        />
      )}

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
