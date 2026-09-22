"use client";

import { MessageCircle, Phone, Mail, Clock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SupportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Average wait: 2 min",
    action: "Start Chat",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Phone,
    title: "Call Support",
    description: "1-800-VECO-SOFT",
    action: "Call Now",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "support@vecosoft.com",
    action: "Send Email",
    color: "text-violet-600 bg-violet-50",
  },
];

export function SupportSheet({ open, onOpenChange }: SupportSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[90vh] overflow-y-auto rounded-t-2xl px-4 pb-8 sm:px-6 md:left-1/2 md:max-w-lg md:-translate-x-1/2 md:px-8 lg:max-w-xl"
      >
        <SheetHeader className="text-left">
          <SheetTitle>Contact Support</SheetTitle>
          <SheetDescription>
            Our team is available 24/7 to help with your order.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <Avatar className="size-10">
            <AvatarFallback className="bg-blue-600 text-white text-sm">
              VS
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">VecoSoft Support</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              Online now · Typically replies in 5 min
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {supportOptions.map((option) => (
            <div
              key={option.title}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${option.color}`}
                >
                  <option.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{option.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                {option.action}
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <p className="text-center text-xs text-muted-foreground">
          Order ID: VS-2026-78432 · Reference this when contacting support
        </p>
      </SheetContent>
    </Sheet>
  );
}
