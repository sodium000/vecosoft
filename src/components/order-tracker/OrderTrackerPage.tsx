"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { OrderScenario } from "@/types/order";
import { getOrderByScenario } from "@/data/orderData";
import { OrderTracker } from "./OrderTracker";

const VALID_SCENARIOS: OrderScenario[] = [
  "in_transit",
  "delayed",
  "delivered_not_received",
  "tracking_unavailable",
];

function parseScenario(value: string | null): OrderScenario {
  if (value && VALID_SCENARIOS.includes(value as OrderScenario)) {
    return value as OrderScenario;
  }
  return "in_transit";
}

export function OrderTrackerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [scenario, setScenario] = useState<OrderScenario>(() =>
    parseScenario(searchParams.get("scenario"))
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("scenario", scenario);
    router.replace(`/track?${params.toString()}`, { scroll: false });
  }, [scenario, router]);

  const baseOrder = getOrderByScenario(scenario);

  return (
    <OrderTracker
      baseOrder={baseOrder}
      scenario={scenario}
    />
  );
}
