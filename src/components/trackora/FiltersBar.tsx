"use client";

import type { ReactNode } from "react";
import { Calendar, Info, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { filterOptions } from "@/data/mockData";
import { ChevronDown } from "lucide-react";

interface FiltersBarProps {
  statusFilter: string;
  courierFilter: string;
  searchQuery: string;
  onStatusChange: (v: string) => void;
  onCourierChange: (v: string) => void;
  onSearchChange: (v: string) => void;
}

function FilterPill({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#161616] px-4 text-sm text-[#fafafa] outline-none hover:bg-[#1a1a1a] data-popup-open:bg-[#1a1a1a]"
      >
        {label}
        <ChevronDown className="size-4 text-[#737373]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border-[#2a2a2a] bg-[#161616] text-[#fafafa]"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function FiltersBar({
  statusFilter,
  courierFilter,
  searchQuery,
  onStatusChange,
  onCourierChange,
  onSearchChange,
}: FiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#fafafa]">
          Active filters
        </span>
        <Tooltip>
          <TooltipTrigger
            type="button"
            className="text-[#737373] hover:text-[#baff29]"
            aria-label="Filter info"
          >
            <Info className="size-4" />
          </TooltipTrigger>
          <TooltipContent>
            Filter orders by status, courier, and date range
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterPill label={statusFilter}>
          {filterOptions.statuses.map((s) => (
            <DropdownMenuItem
              key={s}
              className="focus:bg-[#2a2a2a] focus:text-[#baff29]"
              onClick={() => onStatusChange(s)}
              onSelect={() => onStatusChange(s)}
            >
              {s}
            </DropdownMenuItem>
          ))}
        </FilterPill>

        <FilterPill label={courierFilter}>
          {filterOptions.couriers.map((c) => (
            <DropdownMenuItem
              key={c}
              className="focus:bg-[#2a2a2a] focus:text-[#baff29]"
              onClick={() => onCourierChange(c)}
              onSelect={() => onCourierChange(c)}
            >
              {c}
            </DropdownMenuItem>
          ))}
        </FilterPill>

        {["November 2026", "December 2026"].map((month) => (
          <button
            key={month}
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#161616] px-4 text-sm text-[#fafafa] hover:bg-[#1a1a1a]"
          >
            <Calendar className="size-4 text-[#737373]" />
            {month}
          </button>
        ))}

        <div className="relative min-w-[180px] flex-1 sm:min-w-[220px] lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#737373]" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Find order"
            className="h-10 rounded-full border-[#2a2a2a] bg-[#161616] pl-9 text-[#fafafa] placeholder:text-[#737373] focus-visible:border-[#baff29]/50 focus-visible:ring-[#baff29]/20"
          />
        </div>
      </div>
    </div>
  );
}
