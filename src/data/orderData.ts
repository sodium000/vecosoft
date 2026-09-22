import type { OrderTrackingData, OrderScenario } from "@/types/order";

const baseProduct = {
  name: "Wireless Noise-Cancelling Headphones Pro",
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  quantity: 1,
  price: 249.99,
  orderDate: "Sep 18, 2026",
};

const baseTimeline = [
  {
    id: "1",
    step: "processing" as const,
    label: "Processing",
    timestamp: "Sep 18, 2026 · 10:24 AM",
    location: "VecoSoft Fulfillment Center",
    completed: true,
    active: false,
  },
  {
    id: "2",
    step: "shipped" as const,
    label: "Shipped",
    timestamp: "Sep 19, 2026 · 2:15 PM",
    location: "Los Angeles, CA",
    completed: true,
    active: false,
  },
  {
    id: "3",
    step: "out_for_delivery" as const,
    label: "Out for Delivery",
    timestamp: "Sep 22, 2026 · 8:00 AM",
    location: "Local Delivery Hub",
    completed: false,
    active: true,
  },
  {
    id: "4",
    step: "delivered" as const,
    label: "Delivered",
    timestamp: null,
    location: undefined,
    completed: false,
    active: false,
  },
];

export const inTransitOrder: OrderTrackingData = {
  id: "VS-2026-78432",
  scenario: "in_transit",
  product: baseProduct,
  currentStatus: "out_for_delivery",
  statusLabel: "Out for Delivery",
  progressPercent: 75,
  estimatedDelivery: "Today by 6:00 PM",
  trackingAvailable: true,
  timeline: baseTimeline,
};

export const delayedOrder: OrderTrackingData = {
  id: "VS-2026-78432",
  scenario: "delayed",
  product: baseProduct,
  currentStatus: "shipped",
  statusLabel: "Shipped — Delayed",
  progressPercent: 50,
  estimatedDelivery: "Sep 25, 2026 by 8:00 PM",
  originalEta: "Sep 22, 2026 by 6:00 PM",
  newEta: "Sep 25, 2026 by 8:00 PM",
  trackingAvailable: true,
  timeline: [
    { ...baseTimeline[0] },
    { ...baseTimeline[1], active: true, completed: false },
    {
      ...baseTimeline[2],
      timestamp: null,
      active: false,
      completed: false,
    },
    { ...baseTimeline[3] },
  ],
};

export const deliveredNotReceivedOrder: OrderTrackingData = {
  id: "VS-2026-78432",
  scenario: "delivered_not_received",
  product: baseProduct,
  currentStatus: "delivered",
  statusLabel: "Delivered",
  progressPercent: 100,
  estimatedDelivery: "Delivered Sep 21, 2026 · 3:42 PM",
  deliveredAt: "Sep 21, 2026 · 3:42 PM",
  deliveredLocation: "Front porch — 742 Evergreen Terrace",
  trackingAvailable: true,
  timeline: [
    { ...baseTimeline[0] },
    { ...baseTimeline[1] },
    {
      ...baseTimeline[2],
      timestamp: "Sep 21, 2026 · 9:30 AM",
      completed: true,
      active: false,
    },
    {
      ...baseTimeline[3],
      timestamp: "Sep 21, 2026 · 3:42 PM",
      location: "Front porch",
      completed: true,
      active: true,
    },
  ],
};

export const trackingUnavailableOrder: OrderTrackingData = {
  id: "VS-2026-78432",
  scenario: "tracking_unavailable",
  product: baseProduct,
  currentStatus: "processing",
  statusLabel: "Order Confirmed",
  progressPercent: 10,
  estimatedDelivery: "Sep 26 – Sep 28, 2026",
  trackingAvailable: false,
  trackingUpdateEstimate: "Tracking available within 24–48 hours after shipping",
  timeline: [
    {
      id: "1",
      step: "processing",
      label: "Processing",
      timestamp: "Sep 22, 2026 · 11:05 AM",
      location: "VecoSoft Fulfillment Center",
      completed: true,
      active: true,
    },
    {
      id: "2",
      step: "shipped",
      label: "Shipped",
      timestamp: null,
      completed: false,
      active: false,
    },
    {
      id: "3",
      step: "out_for_delivery",
      label: "Out for Delivery",
      timestamp: null,
      completed: false,
      active: false,
    },
    {
      id: "4",
      step: "delivered",
      label: "Delivered",
      timestamp: null,
      completed: false,
      active: false,
    },
  ],
};

export const orderScenarios: Record<OrderScenario, OrderTrackingData> = {
  in_transit: inTransitOrder,
  delayed: delayedOrder,
  delivered_not_received: deliveredNotReceivedOrder,
  tracking_unavailable: trackingUnavailableOrder,
};

export const scenarioLabels: Record<OrderScenario, string> = {
  in_transit: "In Transit",
  delayed: "Delayed",
  delivered_not_received: "Delivered (Not Received)",
  tracking_unavailable: "Tracking Unavailable",
};

export function getOrderByScenario(scenario: OrderScenario): OrderTrackingData {
  return orderScenarios[scenario];
}
