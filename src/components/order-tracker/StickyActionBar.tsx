"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { orderTrackBarInset } from "@/lib/responsive-layout";

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
      className="fixed bottom-0 left-0 right-0 z-40 w-full border-t border-slate-200/90 bg-white/95 py-3 shadow-lg backdrop-blur-md sm:py-4"
    >
      <div className={`${orderTrackBarInset} flex flex-col sm:flex-row`}>
        <Button
          variant="outline"
          className="h-10 flex-1 border-slate-200 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-medium sm:h-11"
          onClick={onViewDetails}
        >
          View Order Details
        </Button>
        <Button
          className="h-10 flex-1 bg-blue-600 font-semibold text-white hover:bg-blue-700 shadow-sm sm:h-11"
          onClick={onContactSupport}
        >
          Contact Support
        </Button>
      </div>
    </motion.div>
  );
}
