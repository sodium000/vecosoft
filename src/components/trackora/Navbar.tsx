"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, Box, Search, Settings } from "lucide-react";
import { CustomerAvatar } from "./CustomerAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = ["Dashboard", "Orders", "Customers", "Shipments", "Returns"];

function NavPills({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full bg-slate-100/90 p-1 border border-slate-200/60 ${className ?? ""}`}
    >
      {navItems.map((item) => {
        const active = item === "Orders";
        return (
          <button
            key={item}
            type="button"
            className={`relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
              active
                ? "text-blue-600 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {active && (
              <motion.span
                layoutId="trackora-nav-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{item}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-[1440px] space-y-2"
    >
      <nav className="flex w-full items-center justify-between gap-3 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2.5 shadow-sm shadow-slate-200/50 backdrop-blur-md sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/25">
            <Box className="size-5" strokeWidth={2.2} />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            vecoSoft<span className="text-blue-600">ora</span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <NavPills />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {(
            [
              { Icon: Search, label: "Search" },
              { Icon: Bell, label: "Notifications" },
              { Icon: Settings, label: "Settings" },
            ] as const
          ).map(({ Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger
                type="button"
                className="flex size-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label={label}
              >
                <Icon className="size-[18px]" />
              </TooltipTrigger>
              <TooltipContent side="bottom">{label}</TooltipContent>
            </Tooltip>
          ))}
          <CustomerAvatar
            name="Alex Morgan"
            src="/avatars/10.jpg"
            className="ml-1 border-slate-200"
          />
        </div>
      </nav>

      <div className="md:hidden overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <NavPills className="w-max min-w-full justify-start px-1" />
      </div>
    </motion.header>
  );
}
