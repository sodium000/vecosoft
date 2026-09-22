"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MapPinOff, PackageCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OrderScenario } from "@/types/order";

interface StatusBannerProps {
  scenario: OrderScenario;
  originalEta?: string;
  newEta?: string;
  onTrackUpdate?: () => void;
  onContactSupport?: () => void;
  onReportMissing?: () => void;
}

export function StatusBanner({
  scenario,
  originalEta,
  newEta,
  onTrackUpdate,
  onContactSupport,
  onReportMissing,
}: StatusBannerProps) {
  if (scenario === "delayed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/90 text-amber-950 shadow-sm"
      >
        <motion.div
          animate={{ opacity: [1, 0.9, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-4 sm:p-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-amber-500 text-white font-semibold hover:bg-amber-600">
                  Delivery Delayed
                </Badge>
              </div>
              <p className="mt-2 text-sm text-amber-900/90">
                Your package is experiencing a delay. We&apos;ve updated your
                estimated delivery.
              </p>
              <div className="mt-2 space-y-0.5 text-sm">
                {originalEta && (
                  <p className="text-amber-800/60 line-through">{originalEta}</p>
                )}
                {newEta && (
                  <p className="font-bold text-amber-700">New ETA: {newEta}</p>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-amber-600 text-white font-semibold hover:bg-amber-700"
                  onClick={onTrackUpdate}
                >
                  Track Latest Update
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100/60"
                  onClick={onContactSupport}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (scenario === "delivered_not_received") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-rose-200 bg-rose-50/90 p-4 sm:p-5 text-rose-950 shadow-sm"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <MapPinOff className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-rose-700">
              Didn&apos;t receive your order?
            </p>
            <p className="mt-1 text-sm text-rose-900/90">
              Marked as delivered but package not found? Report it and we&apos;ll
              investigate within 24 hours.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="destructive"
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={onReportMissing}
              >
                Report Missing Package
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-rose-300 bg-white text-rose-900 hover:bg-rose-100/60"
                onClick={onContactSupport}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (scenario === "tracking_unavailable") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4 sm:p-5 text-slate-900 shadow-sm"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <PackageCheck className="size-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Order confirmed</p>
            <p className="mt-1 text-sm text-slate-600">
              Tracking info will appear here once your order ships.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
