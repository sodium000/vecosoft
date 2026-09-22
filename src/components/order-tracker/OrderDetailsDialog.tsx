"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { OrderTrackingData } from "@/types/order";

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderTrackingData;
}

export function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: OrderDetailsDialogProps) {
  const total = order.product.price * order.product.quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border border-[#2a2a2a] bg-[#161616] p-5 sm:p-6 text-[#fafafa] shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white">Order Details</DialogTitle>
          <DialogDescription className="text-xs text-[#a3a3a3]">
            Order <span className="font-mono text-[#baff29]">{order.id}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm pt-2">
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Product</span>
            <span className="max-w-[60%] text-right font-medium text-white">
              {order.product.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Quantity</span>
            <span className="font-medium text-white">{order.product.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Unit Price</span>
            <span className="font-medium text-white">${order.product.price.toFixed(2)}</span>
          </div>
          <Separator className="border-[#2a2a2a]" />
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Subtotal</span>
            <span className="font-medium text-white">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Shipping</span>
            <span className="font-semibold text-[#baff29]">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Tax</span>
            <span className="font-medium text-white">${(total * 0.08).toFixed(2)}</span>
          </div>
          <Separator className="border-[#2a2a2a]" />
          <div className="flex justify-between text-base">
            <span className="font-bold text-white">Total</span>
            <span className="font-extrabold text-[#baff29]">${(total * 1.08).toFixed(2)}</span>
          </div>
          <Separator className="border-[#2a2a2a]" />
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Status</span>
            <span className="font-semibold text-[#baff29]">{order.statusLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a3a3a3]">Order Date</span>
            <span className="font-medium text-white">{order.product.orderDate}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
