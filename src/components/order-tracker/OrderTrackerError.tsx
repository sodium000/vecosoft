"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderTrackerErrorProps {
  onRetry: () => void;
}

export function OrderTrackerError({ onRetry }: OrderTrackerErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-1 items-center justify-center px-4 py-12"
    >
      <Card className="w-full max-w-sm border-red-100">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="size-7 text-red-500" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Couldn&apos;t load order</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while fetching your tracking info. Please try
            again.
          </p>
          <Button className="mt-5 gap-2" onClick={onRetry}>
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
