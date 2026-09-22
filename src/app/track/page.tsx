import { Suspense } from "react";
import { OrderTrackerPage } from "@/components/order-tracker/OrderTrackerPage";
import "../trackora-theme.css";

export default function ConsumerTrackPage() {
  return (
    <main className="trackora min-h-screen w-full min-w-0 bg-[#0a0a0a] text-[#fafafa]">
      <Suspense fallback={null}>
        <OrderTrackerPage />
      </Suspense>
    </main>
  );
}
