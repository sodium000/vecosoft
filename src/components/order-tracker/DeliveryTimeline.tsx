"use client";

import { motion } from "framer-motion";
import { Check, Circle, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TimelineEvent } from "@/types/order";

interface DeliveryTimelineProps {
  events: TimelineEvent[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export function DeliveryTimeline({ events }: DeliveryTimelineProps) {
  return (
    <Card className="border border-slate-200/90 bg-white text-slate-900 shadow-sm shadow-slate-100">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-base font-bold text-slate-900">
          Delivery Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pb-4">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-0"
        >
          {events.map((event, index) => (
            <motion.li key={event.id} variants={item}>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-7 items-center justify-center rounded-full ${
                      event.completed
                        ? "bg-emerald-500 text-white shadow-xs"
                        : event.active
                          ? "bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs"
                          : "border-2 border-slate-200 bg-white text-slate-300"
                    }`}
                  >
                    {event.completed ? (
                      <Check className="size-3.5" strokeWidth={3} />
                    ) : (
                      <Circle className="size-3" />
                    )}
                  </div>
                  {index < events.length - 1 && (
                    <div
                      className={`my-1 w-0.5 flex-1 min-h-8 ${
                        event.completed ? "bg-emerald-400" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-5">
                  <p
                    className={`text-sm ${
                      event.active
                        ? "font-bold text-blue-600"
                        : event.completed
                          ? "font-semibold text-slate-900"
                          : "text-slate-400"
                    }`}
                  >
                    {event.label}
                  </p>
                  {event.timestamp && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {event.timestamp}
                    </p>
                  )}
                  {event.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="size-3 text-slate-400" />
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
              {index < events.length - 1 && (
                <Separator className="mb-3 ml-3.5 hidden" />
              )}
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}
