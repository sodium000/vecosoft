export type DeliveryStep =
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export type OrderScenario =
  | "in_transit"
  | "delayed"
  | "delivered_not_received"
  | "tracking_unavailable";

export type ViewMode = "content" | "loading" | "error";

export interface ProductInfo {
  name: string;
  image: string;
  quantity: number;
  price: number;
  orderDate: string;
}

export interface TimelineEvent {
  id: string;
  step: DeliveryStep;
  label: string;
  timestamp: string | null;
  location?: string;
  completed: boolean;
  active: boolean;
}

export interface OrderTrackingData {
  id: string;
  scenario: OrderScenario;
  product: ProductInfo;
  currentStatus: DeliveryStep;
  statusLabel: string;
  progressPercent: number;
  estimatedDelivery: string;
  originalEta?: string;
  newEta?: string;
  deliveredAt?: string;
  deliveredLocation?: string;
  trackingAvailable: boolean;
  trackingUpdateEstimate?: string;
  timeline: TimelineEvent[];
}

export interface DynamicOrderState {
  progressPercent: number;
  currentStatus: DeliveryStep;
  statusLabel: string;
  estimatedDelivery: string;
  originalEta: string;
  newEta: string;
  productName: string;
  quantity: number;
  price: number;
}
