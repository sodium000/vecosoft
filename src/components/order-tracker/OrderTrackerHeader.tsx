"use client";

import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";
import { orderTrackHeaderBar } from "@/lib/responsive-layout";

interface OrderTrackerHeaderProps {
  orderId: string;
  onBack?: () => void;
}

export function OrderTrackerHeader({ orderId, onBack }: OrderTrackerHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2a2a2a] bg-[#161616]/95 backdrop-blur-md">
      <div className={`${orderTrackHeaderBar} gap-3`}>
        {onBack ? (
          <button
            type="button"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#0d0d0f] text-[#a3a3a3] transition-colors hover:border-[#baff29]/40 hover:bg-[#2a2a2a] hover:text-white"
            onClick={onBack}
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : (
          <Link
            href="/"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#0d0d0f] text-[#a3a3a3] transition-colors hover:border-[#baff29]/40 hover:bg-[#2a2a2a] hover:text-white"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="size-4" />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              Live Order Tracking
            </h1>
            <span className="hidden rounded-full border border-[#2a2a2a] bg-[#0d0d0f] px-2.5 py-0.5 text-xs font-semibold text-[#baff29] sm:inline-block">
              {orderId}
            </span>
          </div>
          <p className="truncate text-xs text-[#a3a3a3] sm:hidden">{orderId}</p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-[#2a2a2a] bg-[#0d0d0f] px-3 py-1.5 transition-colors hover:border-[#baff29]/40"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-[#baff29] text-[#0a0a0a]">
            <Box className="size-3.5" strokeWidth={2.4} />
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:inline">
            vecoSoft<span className="text-[#baff29]">ora</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
