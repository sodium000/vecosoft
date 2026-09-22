"use client";

import { MessageCircle, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SupportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Average wait: under 2 min",
    action: "Start Chat",
    iconBg: "bg-blue-600 text-white",
    primary: true,
  },
  {
    icon: Phone,
    title: "Call Support",
    description: "1-800-VECO-SOFT (Toll-Free)",
    action: "Call Now",
    iconBg: "bg-slate-100 text-slate-700",
    primary: false,
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@vecosoft.com",
    action: "Send Email",
    iconBg: "bg-slate-100 text-slate-700",
    primary: false,
  },
];

export function SupportSheet({ open, onOpenChange }: SupportSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-slate-900 shadow-2xl">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ShieldCheck className="size-4" strokeWidth={2.4} />
            </div>
            <DialogTitle className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Contact Support
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500 sm:text-sm">
            Our specialized support team is available 24/7 to resolve any issues.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              VS
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">vecoSoft Support</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Online now · Replies in &lt; 5 min
              </p>
            </div>
          </div>
          <div className="hidden rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-600 sm:flex items-center gap-1">
            <Clock className="size-3" />
            24/7 Available
          </div>
        </div>

        <div className="space-y-2.5">
          {supportOptions.map((option) => (
            <div
              key={option.title}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white p-3.5 transition-all hover:border-blue-400 hover:bg-slate-50/70"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${option.iconBg}`}
                >
                  <option.icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {option.title}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {option.description}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className={
                  option.primary
                    ? "shrink-0 rounded-full bg-blue-600 px-4 font-semibold text-white hover:bg-blue-700"
                    : "shrink-0 rounded-full border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }
              >
                {option.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-3 text-center">
          <p className="text-xs text-slate-500">
            Order Ref: <span className="font-mono font-medium text-blue-600">VS-2026-78432</span> · Quote this ID for priority assistance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
