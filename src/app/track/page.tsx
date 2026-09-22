import { Suspense } from "react";
import { OrderTrackerPage } from "@/components/order-tracker/OrderTrackerPage";
import "../trackora-theme.css";

export default function ConsumerTrackPage() {
  return (
    <main className="trackora min-h-screen w-full min-w-0 bg-[#f8fafc] text-[#0f172a]">
      <Suspense fallback={null}>
        <OrderTrackerPage />
      </Suspense>
    </main>
  );
}
