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
      className="fixed bottom-0 left-0 right-0 z-40 w-full border-t border-[#2a2a2a] bg-[#161616]/95 py-3 backdrop-blur-md sm:py-4"
    >
      <div className={`${orderTrackBarInset} flex flex-col sm:flex-row`}>
        <Button
          variant="outline"
          className="h-10 flex-1 border-[#2a2a2a] bg-[#0d0d0f] text-white hover:border-[#baff29]/40 hover:bg-[#2a2a2a] sm:h-11"
          onClick={onViewDetails}
        >
          View Order Details
        </Button>
        <Button
          className="h-10 flex-1 bg-[#baff29] font-semibold text-[#0a0a0a] hover:bg-[#c6ff3a] sm:h-11"
          onClick={onContactSupport}
        >
          Contact Support
        </Button>
      </div>
    </motion.div>
  );
}
