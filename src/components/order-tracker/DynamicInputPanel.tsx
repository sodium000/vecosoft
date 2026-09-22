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
      <Card className="border border-[#2a2a2a] bg-[#161616] text-[#fafafa] shadow-lg shadow-black/40">
        <CardHeader className="border-b border-[#2a2a2a] pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
            <Sliders className="size-4 text-[#baff29]" />
            Live Preview Controls
            <Sparkles className="size-3.5 text-[#baff29]" />
          </CardTitle>
          <p className="text-xs text-[#a3a3a3]">
            Adjust values below — charts and timeline update instantly.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="progress" className="text-xs font-medium text-[#d4d4d4]">
                Delivery Progress
              </Label>
              <span className="text-sm font-bold text-[#baff29]">
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
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#2a2a2a] accent-[#baff29]"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="status" className="text-xs font-medium text-[#d4d4d4]">
                Current Status
              </Label>
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
                <SelectTrigger id="status" className="w-full min-w-0 border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#2a2a2a] bg-[#161616] text-[#fafafa]">
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="focus:bg-[#2a2a2a] focus:text-[#baff29]">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-xs font-medium text-[#d4d4d4]">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={99}
                value={state.quantity}
                onChange={(e) =>
                  onChange({ quantity: Math.max(1, Number(e.target.value)) })
                }
                className="border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName" className="text-xs font-medium text-[#d4d4d4]">
              Product Name
            </Label>
            <Input
              id="productName"
              value={state.productName}
              onChange={(e) => onChange({ productName: e.target.value })}
              placeholder="Enter product name"
              className="border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="price" className="text-xs font-medium text-[#d4d4d4]">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={0.01}
                value={state.price}
                onChange={(e) =>
                  onChange({ price: Math.max(0, Number(e.target.value)) })
                }
                className="border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eta" className="text-xs font-medium text-[#d4d4d4]">
                Estimated Delivery
              </Label>
              <Input
                id="eta"
                value={state.estimatedDelivery}
                onChange={(e) =>
                  onChange({ estimatedDelivery: e.target.value })
                }
                placeholder="Today by 6:00 PM"
                className="border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <Label htmlFor="originalEta" className="text-xs font-medium text-[#d4d4d4]">
                Original ETA (delayed)
              </Label>
              <Input
                id="originalEta"
                value={state.originalEta}
                onChange={(e) => onChange({ originalEta: e.target.value })}
                className="border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newEta" className="text-xs font-medium text-[#d4d4d4]">
                New ETA (delayed)
              </Label>
              <Input
                id="newEta"
                value={state.newEta}
                onChange={(e) => onChange({ newEta: e.target.value })}
                className="border-[#2a2a2a] bg-[#0d0d0f] text-[#fafafa]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
