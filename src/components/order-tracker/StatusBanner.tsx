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
        className="overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[#fafafa]"
      >
        <motion.div
          animate={{ opacity: [1, 0.85, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-4 sm:p-5"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-amber-400 text-[#0a0a0a] font-semibold hover:bg-amber-400">
                  Delivery Delayed
                </Badge>
              </div>
              <p className="mt-2 text-sm text-[#d4d4d4]">
                Your package is experiencing a delay. We&apos;ve updated your
                estimated delivery.
              </p>
              <div className="mt-2 space-y-0.5 text-sm">
                {originalEta && (
                  <p className="text-[#a3a3a3] line-through">{originalEta}</p>
                )}
                {newEta && (
                  <p className="font-bold text-amber-400">New ETA: {newEta}</p>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-amber-500 text-[#0a0a0a] font-semibold hover:bg-amber-400"
                  onClick={onTrackUpdate}
                >
                  Track Latest Update
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#2a2a2a] bg-[#0d0d0f] text-white hover:bg-[#2a2a2a]"
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
        className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 sm:p-5 text-[#fafafa]"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
            <MapPinOff className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-red-400">
              Didn&apos;t receive your order?
            </p>
            <p className="mt-1 text-sm text-[#d4d4d4]">
              Marked as delivered but package not found? Report it and we&apos;ll
              investigate within 24 hours.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="destructive"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={onReportMissing}
              >
                Report Missing Package
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#2a2a2a] bg-[#0d0d0f] text-white hover:bg-[#2a2a2a]"
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
        className="rounded-2xl border border-[#2a2a2a] bg-[#161616] p-4 sm:p-5 text-[#fafafa]"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#baff29]/15 text-[#baff29]">
            <PackageCheck className="size-5" />
          </div>
          <div>
            <p className="font-bold text-white">Order confirmed</p>
            <p className="mt-1 text-sm text-[#a3a3a3]">
              Tracking info will appear here once your order ships.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
