import { Suspense } from "react";
import { OrderTrackerPage } from "@/components/order-tracker/OrderTrackerPage";
import { OrderTrackerSkeleton } from "@/components/order-tracker/OrderTrackerSkeleton";

export default function Home() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-slate-100">
      <Suspense
        fallback={
          <div className="mx-auto min-h-screen w-full min-w-0 bg-slate-50 px-4 sm:px-6 md:px-8">
            <OrderTrackerSkeleton />
          </div>
        }
      >
        <OrderTrackerPage />
      </Suspense>
    </main>
  );
}
