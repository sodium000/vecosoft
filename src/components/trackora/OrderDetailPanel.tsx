"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/data/mockData";
import { CustomerAvatar } from "./CustomerAvatar";
import { ShipmentTracker } from "./ShipmentTracker";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

interface OrderDetailPanelProps {
  order: Order;
}

export function OrderDetailPanel({ order }: OrderDetailPanelProps) {
  const inTransit = order.status === "in_transit";

  return (
    <div className="h-full min-h-[480px] rounded-3xl bg-white p-5 text-[#171717] shadow-2xl shadow-black/50 sm:p-6 lg:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="flex h-full flex-col"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {order.id}
            </h2>
            <Badge
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                inTransit
                  ? "bg-[#baff29] text-[#0a0a0a] hover:bg-[#baff29]"
                  : order.status === "processing"
                    ? "bg-amber-100 text-amber-900"
                    : "bg-neutral-100 text-neutral-700"
              }`}
            >
              {order.statusLabel}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#e5e5e5] px-4 py-3">
              <CustomerAvatar name={order.customer.name} src={order.customer.avatar} />
              <div>
                <p className="text-xs text-[#737373]">Customer</p>
                <p className="font-semibold">{order.customer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#e5e5e5] px-4 py-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#f5f5f5]">
                <MapPin className="size-4" />
              </div>
              <div>
                <p className="text-xs text-[#737373]">Destination</p>
                <p className="font-semibold">{order.destination}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
              <p className="text-xs text-[#737373]">Order value</p>
              <p className="mt-1 text-lg font-bold">
                {formatMoney(order.orderValue)}
              </p>
            </div>
            <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
              <p className="text-xs text-[#737373]">Courier</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold">
                <Truck className="size-4 text-[#737373]" />
                <span className="truncate text-sm sm:text-base">
                  {order.courier}
                </span>
              </p>
            </div>
            <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
              <p className="text-xs text-[#737373]">ETA</p>
              <p className="mt-1 flex items-center gap-1.5 font-semibold">
                <Calendar className="size-4 text-[#737373]" />
                <span className="text-sm sm:text-base">{order.eta}</span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#737373]">
              Shipment tracker
            </p>
            <ShipmentTracker
              steps={order.shipmentTracker}
              orderKey={order.id}
            />
          </div>

          <div className="mt-auto space-y-2 border-t border-[#e5e5e5] pt-6 text-sm">
            <div className="flex justify-between text-[#737373]">
              <span>Subtotal</span>
              <span>{formatMoney(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#737373]">
              <span>Shipping</span>
              <span>{formatMoney(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#171717]">
              <span>Total</span>
              <span>{formatMoney(order.total)}</span>
            </div>
          </div>

          <Link
            href="/track?scenario=in_transit"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#baff29] text-base font-semibold text-[#0a0a0a] transition-colors hover:bg-[#c6ff3a]"
          >
            View live tracking
            <ArrowUpRight className="size-5" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
