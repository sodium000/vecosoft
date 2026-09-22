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
    <Card className="border border-[#2a2a2a] bg-[#161616] text-[#fafafa] shadow-lg shadow-black/40">
      <CardHeader className="border-b border-[#2a2a2a] pb-3">
        <CardTitle className="text-base font-semibold text-white">
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
                        ? "bg-[#baff29] text-[#0a0a0a]"
                        : event.active
                          ? "bg-[#baff29] text-[#0a0a0a] ring-4 ring-[#baff29]/25"
                          : "border-2 border-[#2a2a2a] bg-[#0d0d0f] text-[#525252]"
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
                        event.completed ? "bg-[#baff29]" : "bg-[#2a2a2a]"
                      }`}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-5">
                  <p
                    className={`text-sm ${
                      event.active
                        ? "font-bold text-[#baff29]"
                        : event.completed
                          ? "font-semibold text-white"
                          : "text-[#737373]"
                    }`}
                  >
                    {event.label}
                  </p>
                  {event.timestamp && (
                    <p className="mt-0.5 text-xs text-[#a3a3a3]">
                      {event.timestamp}
                    </p>
                  )}
                  {event.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#a3a3a3]">
                      <MapPin className="size-3 text-[#737373]" />
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
              {index < events.length - 1 && (
                <Separator className="mb-3 ml-3.5 hidden border-[#2a2a2a]" />
              )}
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}
