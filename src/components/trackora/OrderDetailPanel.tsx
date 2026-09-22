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
    <div className="h-full min-h-[480px] rounded-3xl border border-slate-200/90 bg-white p-5 text-slate-900 shadow-sm shadow-slate-100 sm:p-6 lg:p-8">
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
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {order.id}
            </h2>
            <Badge
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                inTransit
                  ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50"
                  : order.status === "processing"
                    ? "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-50"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              {order.statusLabel}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <CustomerAvatar name={order.customer.name} src={order.customer.avatar} />
              <div>
                <p className="text-xs text-slate-500">Customer</p>
                <p className="font-bold text-slate-900">{order.customer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-xs border border-slate-200/60">
                <MapPin className="size-4" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Destination</p>
                <p className="font-bold text-slate-900">{order.destination}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <p className="text-xs text-slate-500">Order value</p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">
                {formatMoney(order.orderValue)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <p className="text-xs text-slate-500">Courier</p>
              <p className="mt-1 flex items-center gap-1.5 font-bold text-slate-900">
                <Truck className="size-4 text-slate-500" />
                <span className="truncate text-sm sm:text-base">
                  {order.courier}
                </span>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <p className="text-xs text-slate-500">ETA</p>
              <p className="mt-1 flex items-center gap-1.5 font-bold text-slate-900">
                <Calendar className="size-4 text-slate-500" />
                <span className="text-sm sm:text-base">{order.eta}</span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
              Shipment tracker
            </p>
            <ShipmentTracker
              steps={order.shipmentTracker}
              orderKey={order.id}
            />
          </div>

          <div className="mt-auto space-y-2 border-t border-slate-200 pt-6 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-medium text-slate-700">{formatMoney(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="font-medium text-slate-700">{formatMoney(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900">
              <span>Total</span>
              <span className="text-blue-600 font-black">{formatMoney(order.total)}</span>
            </div>
          </div>

          <Link
            href="/track?scenario=in_transit"
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            View live tracking
            <ArrowUpRight className="size-5" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
