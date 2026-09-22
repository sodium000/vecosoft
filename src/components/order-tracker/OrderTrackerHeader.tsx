"use client";

import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import { orderTrackHeaderBar } from "@/lib/responsive-layout";

interface OrderTrackerHeaderProps {
  orderId: string;
  onBack?: () => void;
}

export function OrderTrackerHeader({
  orderId,
  onBack,
}: OrderTrackerHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full rounded-full border-b border-slate-200/80 mt-3 bg-white/95 px-3 py-1 shadow-xs backdrop-blur-md">
      <div className={`${orderTrackHeaderBar} gap-3`}>
        {onBack ? (
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:bg-slate-100 hover:text-slate-900"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : (
          <Link
            href="/"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="size-4" />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              Live Order Tracking
            </h1>
            <span className="hidden rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 sm:inline-block">
              {orderId}
            </span>
          </div>
          <p className="truncate text-xs text-slate-500 sm:hidden">{orderId}</p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs transition-colors hover:bg-slate-50"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-white shadow-xs">
            <Box className="size-3.5" strokeWidth={2.4} />
          </div>
          <span className="hidden text-sm font-bold tracking-tight text-slate-900 sm:inline">
            vecoSoft<span className="text-blue-600">ora</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
