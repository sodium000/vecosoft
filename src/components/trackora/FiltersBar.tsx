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
        className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-xs outline-none hover:bg-slate-50 hover:text-slate-900 data-popup-open:bg-slate-50"
      >
        {label}
        <ChevronDown className="size-4 text-slate-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border border-slate-200 bg-white text-slate-800 shadow-md"
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
        <span className="text-sm font-semibold text-slate-700">
          Active filters
        </span>
        <Tooltip>
          <TooltipTrigger
            type="button"
            className="text-slate-400 hover:text-blue-600"
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
              className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
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
              className="focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
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
            className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900"
          >
            <Calendar className="size-4 text-slate-400" />
            {month}
          </button>
        ))}

        <div className="relative min-w-[180px] flex-1 sm:min-w-[220px] lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Find order"
            className="h-10 rounded-full border border-slate-200 bg-white pl-9 text-slate-900 placeholder:text-slate-400 shadow-xs focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
          />
        </div>
      </div>
    </div>
  );
}
