"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function OrderTrackerSkeleton() {
  return (
    <div className="space-y-4 px-4 py-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Skeleton className="size-20 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Skeleton className="mx-auto h-36 w-36 rounded-full" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
          <div className="flex justify-between pt-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="size-2.5 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="size-7 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
