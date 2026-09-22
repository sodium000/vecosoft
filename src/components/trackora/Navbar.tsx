"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bell,
  Box,
  Search,
  Settings,
} from "lucide-react";
import { CustomerAvatar } from "./CustomerAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  "Dashboard",
  "Orders",
  "Customers",
  "Shipments",
  "Returns",
];

function NavPills({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full bg-[#0d0d0f] p-1 ${className ?? ""}`}
    >
      {navItems.map((item) => {
        const active = item === "Orders";
        return (
          <button
            key={item}
            type="button"
            className={`relative shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
              active ? "text-[#0a0a0a]" : "text-[#a3a3a3] hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="trackora-nav-pill"
                className="absolute inset-0 rounded-full bg-[#baff29]"
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
      <nav className="flex w-full items-center justify-between gap-3 rounded-full border border-[#2a2a2a] bg-[#161616]/95 px-4 py-2.5 shadow-lg shadow-black/40 backdrop-blur-md sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#baff29]/50"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#baff29] text-[#0a0a0a]">
            <Box className="size-5" strokeWidth={2.2} />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Track<span className="text-[#baff29]">ora</span>
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
                className="flex size-9 items-center justify-center rounded-full text-[#a3a3a3] transition-colors hover:bg-[#2a2a2a] hover:text-white"
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
            className="ml-1 border-[#baff29]/30"
          />
        </div>
      </nav>

      <div className="md:hidden overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <NavPills className="w-max min-w-full justify-start px-1" />
      </div>
    </motion.header>
  );
}
