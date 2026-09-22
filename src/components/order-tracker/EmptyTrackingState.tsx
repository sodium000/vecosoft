"use client";

import { motion } from "framer-motion";
import { PackageSearch, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface EmptyTrackingStateProps {
  updateEstimate?: string;
  showSkeleton?: boolean;
  onNotify?: () => void;
  onContactSupport?: () => void;
}

export function EmptyTrackingState({
  updateEstimate,
  showSkeleton = false,
  onNotify,
  onContactSupport,
}: EmptyTrackingStateProps) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-dashed border-slate-200">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-slate-100">
              <PackageSearch className="size-7 text-slate-400" />
            </div>
            <h3 className="mt-4 text-base font-semibold">
              Tracking info coming soon
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Tracking info will appear here once your order ships. We&apos;ll
              notify you when it&apos;s on the way.
            </p>
            {updateEstimate && (
              <p className="mt-3 text-xs font-medium text-blue-600">
                {updateEstimate}
              </p>
            )}
            <div className="mt-5 flex w-full flex-col gap-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={onNotify}>
                <Bell className="size-4" />
                Notify Me
              </Button>
              <Button variant="outline" onClick={onContactSupport}>
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {showSkeleton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 rounded-xl border border-slate-100 p-4"
        >
          <p className="text-xs font-medium text-muted-foreground">
            Loading preview...
          </p>
          <Skeleton className="h-28 w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/5" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
