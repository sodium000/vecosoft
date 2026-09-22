"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductInfo } from "@/types/order";

interface ProductSummaryCardProps {
  product: ProductInfo;
  orderId: string;
}

export function ProductSummaryCard({ product, orderId }: ProductSummaryCardProps) {
  const total = product.price * product.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="overflow-hidden border border-slate-200/90 bg-white text-slate-900 shadow-sm shadow-slate-100">
        <CardContent className="p-4 sm:p-5 md:p-6">
          <div className="flex gap-3 sm:gap-4 md:gap-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:size-24 md:size-28">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, 112px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-3 text-sm font-bold leading-snug text-slate-900 sm:text-base md:text-lg">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Qty: {product.quantity} · ${product.price.toFixed(2)} each
              </p>
              <p className="mt-1.5 text-base font-extrabold text-blue-600 sm:text-lg md:text-xl">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-3 sm:mt-4 sm:gap-4 sm:pt-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="size-3.5 text-slate-400" />
              <span>Ordered {product.orderDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Hash className="size-3.5 text-slate-400" />
              <span className="font-mono font-semibold text-blue-600">{orderId}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
