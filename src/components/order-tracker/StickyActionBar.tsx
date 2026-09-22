"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StickyActionBarProps {
  onViewDetails: () => void;
  onContactSupport: () => void;
}

export function StickyActionBar({
  onViewDetails,
  onContactSupport,
}: StickyActionBarProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[430px] gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onViewDetails}
        >
          View Order Details
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onContactSupport}>
          Contact Support
        </Button>
      </div>
    </motion.div>
  );
}
