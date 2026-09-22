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
      <Card className="overflow-hidden border-slate-200/80 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Qty: {product.quantity} · ${product.price.toFixed(2)} each
              </p>
              <p className="mt-1.5 text-base font-bold text-foreground">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              <span>Ordered {product.orderDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Hash className="size-3.5" />
              <span>{orderId}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
