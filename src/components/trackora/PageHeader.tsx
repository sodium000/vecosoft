"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader() {
  const handleExport = () => {
    const blob = new Blob(
      ["Order ID,Customer,Status,Total\n#TR-4272,Maria Jones,In transit,53154"],
      { type: "text/csv" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trackora-orders-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="flex flex-wrap items-center justify-between gap-4"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Order Tracking
      </h1>
      <Button
        type="button"
        variant="outline"
        onClick={handleExport}
        className="h-11 rounded-full border-[#2a2a2a] bg-transparent px-5 text-sm font-medium text-[#fafafa] hover:bg-[#161616] hover:text-white"
      >
        <Download className="size-4" />
        Export report
      </Button>
    </motion.div>
  );
}
