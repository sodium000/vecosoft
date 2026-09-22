"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { orderTrackHeaderBar } from "@/lib/responsive-layout";

interface OrderTrackerHeaderProps {
  orderId: string;
  onBack?: () => void;
}

export function OrderTrackerHeader({ orderId, onBack }: OrderTrackerHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className={`${orderTrackHeaderBar} gap-3`}>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-semibold tracking-tight sm:text-lg md:text-xl">
            Order Tracking
          </h1>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">{orderId}</p>
        </div>
        <Logo size="sm" />
      </div>
    </header>
  );
}
