import { Suspense } from "react";
import { OrderTrackerPage } from "@/components/order-tracker/OrderTrackerPage";
import { OrderTrackerSkeleton } from "@/components/order-tracker/OrderTrackerSkeleton";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Suspense
        fallback={
          <div className="mx-auto min-h-screen max-w-[430px] bg-slate-50">
            <OrderTrackerSkeleton />
          </div>
        }
      >
        <OrderTrackerPage />
      </Suspense>
    </main>
  );
}
