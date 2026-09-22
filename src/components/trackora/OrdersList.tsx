"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  List,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Order, OrderStatus } from "@/data/mockData";
import { CustomerAvatar } from "./CustomerAvatar";

type ListTab = "all" | "processing" | "in_transit";

interface OrdersListProps {
  orders: Order[];
  selectedOrderId: string;
  activeTab: ListTab;
  onTabChange: (tab: ListTab) => void;
  onSelectOrder: (id: string) => void;
}

function statusDot(status: OrderStatus) {
  switch (status) {
    case "in_transit":
      return "bg-[#baff29]";
    case "processing":
      return "bg-amber-400";
    case "delivered":
      return "bg-[#737373]";
    default:
      return "bg-red-400";
  }
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function OrdersList({
  orders,
  selectedOrderId,
  activeTab,
  onTabChange,
  onSelectOrder,
}: OrdersListProps) {
  const processingCount = orders.filter((o) => o.status === "processing").length;
  const transitCount = orders.filter((o) => o.status === "in_transit").length;

  const tabs: { id: ListTab; label: string }[] = [
    { id: "all", label: "All orders" },
    { id: "processing", label: `Processing (${processingCount})` },
    { id: "in_transit", label: `In transit (${transitCount})` },
  ];

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((o) =>
          activeTab === "processing"
            ? o.status === "processing"
            : o.status === "in_transit"
        );

  return (
    <div className="flex h-full min-h-[480px] flex-col rounded-2xl border border-[#2a2a2a] bg-[#161616] p-4 lg:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-lg p-2 text-[#737373] hover:bg-[#2a2a2a] hover:text-white"
            aria-label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-lg bg-[#2a2a2a] p-2 text-[#baff29]"
            aria-label="List view"
          >
            <List className="size-4" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-lg p-2 text-[#737373] outline-none hover:bg-[#2a2a2a] hover:text-white"
              aria-label="More options"
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-[#2a2a2a] bg-[#161616]">
              <DropdownMenuItem className="focus:bg-[#2a2a2a]">
                Export list
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#2a2a2a]">
                Refresh
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative mb-4 flex flex-wrap gap-1 rounded-full bg-[#0d0d0f] p-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium sm:text-sm ${
                active ? "text-[#0a0a0a]" : "text-[#a3a3a3] hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="orders-list-tab"
                  className="absolute inset-0 rounded-full bg-[#baff29]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto pr-1">
        {filtered.map((order) => {
          const selected = order.id === selectedOrderId;
          return (
            <li key={order.id}>
              <motion.button
                type="button"
                onClick={() => onSelectOrder(order.id)}
                layout
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                  selected ? "relative" : "hover:bg-[#1a1a1a]"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="order-row-highlight"
                    className="absolute inset-0 rounded-xl bg-[#252525] ring-1 ring-[#baff29]/20"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <CustomerAvatar
                  name={order.customer.name}
                  src={order.customer.avatar}
                  className="relative z-10"
                />
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="truncate font-semibold text-white">{order.id}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#a3a3a3]">
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${statusDot(order.status)}`}
                    />
                    {order.statusLabel}
                  </p>
                </div>
                <span className="relative z-10 shrink-0 text-sm font-medium text-[#fafafa]">
                  {formatMoney(order.orderValue)}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
