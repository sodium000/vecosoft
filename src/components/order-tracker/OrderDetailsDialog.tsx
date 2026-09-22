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
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>Order {order.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Product</span>
            <span className="max-w-[60%] text-right font-medium">
              {order.product.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantity</span>
            <span className="font-medium">{order.product.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Unit Price</span>
            <span className="font-medium">${order.product.price.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-emerald-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-bold">${(total * 1.08).toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">{order.statusLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Date</span>
            <span className="font-medium">{order.product.orderDate}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
