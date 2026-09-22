export type OrderStatus = "processing" | "in_transit" | "delivered" | "delayed";

export interface ShipmentStep {
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  customer: { name: string; avatar: string };
  destination: string;
  status: OrderStatus;
  statusLabel: string;
  courier: string;
  eta: string;
  orderValue: number;
  subtotal: number;
  shipping: number;
  total: number;
  shipmentTracker: ShipmentStep[];
}

export const orders: Order[] = [
  {
    id: "#TR-4021",
    customer: { name: "James Carter", avatar: "/avatars/1.jpg" },
    destination: "Los Angeles, CA",
    status: "in_transit",
    statusLabel: "In transit",
    courier: "FedEx",
    eta: "Nov 26, 2026",
    orderValue: 80770.0,
    subtotal: 79900.0,
    shipping: 870.0,
    total: 80770.0,
    shipmentTracker: [
      {
        label: "Order placed",
        date: "Nov 18, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Packed",
        date: "Nov 19, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Shipped",
        date: "Nov 20, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Out for delivery",
        date: "Nov 26, 2026",
        completed: false,
        current: true,
      },
    ],
  },
  {
    id: "#TR-4261",
    customer: { name: "Sophia Lee", avatar: "/avatars/2.jpg" },
    destination: "Austin, TX",
    status: "delivered",
    statusLabel: "Delivered",
    courier: "UPS",
    eta: "Delivered Nov 20, 2026",
    orderValue: 27114.0,
    subtotal: 26700.0,
    shipping: 414.0,
    total: 27114.0,
    shipmentTracker: [
      {
        label: "Order placed",
        date: "Nov 14, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Packed",
        date: "Nov 15, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Shipped",
        date: "Nov 16, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Delivered",
        date: "Nov 20, 2026",
        completed: true,
        current: false,
      },
    ],
  },
  {
    id: "#TR-4272",
    customer: { name: "Maria Jones", avatar: "/avatars/3.jpg" },
    destination: "New York, NY",
    status: "in_transit",
    statusLabel: "In transit",
    courier: "DHL Express",
    eta: "Nov 28, 2026",
    orderValue: 53154.0,
    subtotal: 49210.0,
    shipping: 144.0,
    total: 53154.0,
    shipmentTracker: [
      {
        label: "Order placed",
        date: "Nov 21, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Packed",
        date: "Nov 22, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Shipped",
        date: "Nov 23, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Out for delivery",
        date: "Nov 28, 2026",
        completed: false,
        current: true,
      },
    ],
  },
  {
    id: "#TR-4412",
    customer: { name: "David Kim", avatar: "/avatars/4.jpg" },
    destination: "Chicago, IL",
    status: "processing",
    statusLabel: "Processing",
    courier: "Not assigned yet",
    eta: "Pending",
    orderValue: 61223.0,
    subtotal: 60500.0,
    shipping: 723.0,
    total: 61223.0,
    shipmentTracker: [
      {
        label: "Order placed",
        date: "Nov 24, 2026",
        completed: true,
        current: true,
      },
      {
        label: "Packed",
        date: "Pending",
        completed: false,
        current: false,
      },
      {
        label: "Shipped",
        date: "Pending",
        completed: false,
        current: false,
      },
      {
        label: "Out for delivery",
        date: "Pending",
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: "#TR-4720",
    customer: { name: "Priya Nair", avatar: "/avatars/5.jpg" },
    destination: "Seattle, WA",
    status: "delivered",
    statusLabel: "Delivered",
    courier: "Blue Dart",
    eta: "Delivered Nov 17, 2026",
    orderValue: 7311.0,
    subtotal: 7011.0,
    shipping: 300.0,
    total: 7311.0,
    shipmentTracker: [
      {
        label: "Order placed",
        date: "Nov 12, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Packed",
        date: "Nov 13, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Shipped",
        date: "Nov 14, 2026",
        completed: true,
        current: false,
      },
      {
        label: "Delivered",
        date: "Nov 17, 2026",
        completed: true,
        current: false,
      },
    ],
  },
];

export const summaryStats = {
  ordersInTransit: {
    value: 148,
    monthlyTrend: [
      {
        month: "Sep",
        value: 65,
        avatars: ["/avatars/1.jpg", "/avatars/2.jpg", "/avatars/3.jpg"],
      },
      { month: "Oct", value: 40, avatars: [] },
      {
        month: "Nov",
        value: 90,
        avatars: [
          "/avatars/4.jpg",
          "/avatars/5.jpg",
          "/avatars/6.jpg",
          "/avatars/7.jpg",
        ],
      },
      {
        month: "Dec",
        value: 30,
        avatars: ["/avatars/8.jpg", "/avatars/9.jpg", "/avatars/10.jpg"],
      },
    ],
  },
  dueForDeliveryToday: { value: 32 },
  averageDeliveryTime: { value: 2.4, unit: "days" },
  onTimeDeliveryRate: {
    value: 96.8,
    label: "Excellent",
    breakdown: [
      { label: "Below target", value: 92.1, status: "below" as const },
      { label: "On target", value: 96.8, status: "target" as const },
      { label: "Above target", value: 99.3, status: "above" as const },
    ],
  },
};

export const filterOptions = {
  statuses: [
    "All statuses",
    "Processing",
    "In transit",
    "Delivered",
    "Delayed",
  ],
  couriers: ["All couriers", "DHL Express", "FedEx", "UPS", "Blue Dart"],
};

export const defaultSelectedOrderId = "#TR-4272";
