"use client";

import { useEffect, useMemo, useState } from "react";
import {
  defaultSelectedOrderId,
  filterOptions,
  orders as allOrders,
} from "@/data/mockData";
import { Navbar } from "./Navbar";
import { PageHeader } from "./PageHeader";
import { StatsCards } from "./StatsCards";
import { FiltersBar } from "./FiltersBar";
import { OrdersList } from "./OrdersList";
import { OrderDetailPanel } from "./OrderDetailPanel";

type ListTab = "all" | "processing" | "in_transit";

function matchesStatusFilter(statusLabel: string, filter: string) {
  if (filter === "All statuses") return true;
  return statusLabel.toLowerCase() === filter.toLowerCase();
}

function matchesCourierFilter(courier: string, filter: string) {
  if (filter === "All couriers") return true;
  return courier === filter;
}

export function OrdersDashboard() {
  const [selectedOrderId, setSelectedOrderId] = useState(defaultSelectedOrderId);
  const [listTab, setListTab] = useState<ListTab>("in_transit");
  const [statusFilter, setStatusFilter] = useState(filterOptions.statuses[0]);
  const [courierFilter, setCourierFilter] = useState(filterOptions.couriers[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allOrders.filter((o) => {
      if (!matchesStatusFilter(o.statusLabel, statusFilter)) return false;
      if (!matchesCourierFilter(o.courier, courierFilter)) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.destination.toLowerCase().includes(q)
      );
    });
  }, [statusFilter, courierFilter, searchQuery]);

  useEffect(() => {
    if (
      filteredOrders.length > 0 &&
      !filteredOrders.some((o) => o.id === selectedOrderId)
    ) {
      setSelectedOrderId(filteredOrders[0].id);
    }
  }, [filteredOrders, selectedOrderId]);

  const selectedOrder =
    allOrders.find((o) => o.id === selectedOrderId) ?? allOrders[0];

  return (
    <div className="trackora min-h-screen px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pt-6">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:gap-8">
        <Navbar />
        <PageHeader />
        <StatsCards />
        <FiltersBar
          statusFilter={statusFilter}
          courierFilter={courierFilter}
          searchQuery={searchQuery}
          onStatusChange={setStatusFilter}
          onCourierChange={setCourierFilter}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 xl:col-span-5">
            <OrdersList
              orders={filteredOrders}
              selectedOrderId={selectedOrderId}
              activeTab={listTab}
              onTabChange={setListTab}
              onSelectOrder={setSelectedOrderId}
            />
          </div>
          <div className="lg:col-span-7 xl:col-span-7">
            <OrderDetailPanel order={selectedOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
