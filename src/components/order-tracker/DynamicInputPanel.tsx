"use client";

import { motion } from "framer-motion";
import { Sliders, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DeliveryStep, DynamicOrderState } from "@/types/order";

const STATUS_OPTIONS: { value: DeliveryStep; label: string }[] = [
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
];

interface DynamicInputPanelProps {
  state: DynamicOrderState;
  onChange: (updates: Partial<DynamicOrderState>) => void;
}

export function DynamicInputPanel({ state, onChange }: DynamicInputPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sliders className="size-4 text-blue-600" />
            Live Preview Controls
            <Sparkles className="size-3.5 text-amber-500" />
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Adjust values below — charts and timeline update instantly.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="progress">Delivery Progress</Label>
              <span className="text-sm font-bold text-blue-600">
                {state.progressPercent}%
              </span>
            </div>
            <input
              id="progress"
              type="range"
              min={0}
              max={100}
              step={1}
              value={state.progressPercent}
              onChange={(e) =>
                onChange({ progressPercent: Number(e.target.value) })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="status">Current Status</Label>
              <Select
                value={state.currentStatus}
                onValueChange={(v) => {
                  if (!v) return;
                  const status = v as DeliveryStep;
                  const labels: Record<DeliveryStep, string> = {
                    processing: "Processing",
                    shipped: "Shipped",
                    out_for_delivery: "Out for Delivery",
                    delivered: "Delivered",
                  };
                  onChange({
                    currentStatus: status,
                    statusLabel: labels[status],
                  });
                }}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={99}
                value={state.quantity}
                onChange={(e) =>
                  onChange({ quantity: Math.max(1, Number(e.target.value)) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={state.productName}
              onChange={(e) => onChange({ productName: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={0.01}
                value={state.price}
                onChange={(e) =>
                  onChange({ price: Math.max(0, Number(e.target.value)) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eta">Estimated Delivery</Label>
              <Input
                id="eta"
                value={state.estimatedDelivery}
                onChange={(e) =>
                  onChange({ estimatedDelivery: e.target.value })
                }
                placeholder="Today by 6:00 PM"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="originalEta">Original ETA (delayed)</Label>
              <Input
                id="originalEta"
                value={state.originalEta}
                onChange={(e) => onChange({ originalEta: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newEta">New ETA (delayed)</Label>
              <Input
                id="newEta"
                value={state.newEta}
                onChange={(e) => onChange({ newEta: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
