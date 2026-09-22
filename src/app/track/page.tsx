import { Suspense } from "react";
import { OrderTrackerPage } from "@/components/order-tracker/OrderTrackerPage";

export default function ConsumerTrackPage() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-slate-100">
      <Suspense fallback={null}>
        <OrderTrackerPage />
      </Suspense>
    </main>
  );
}
