"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface CustomerAvatarProps {
  name: string;
  src?: string;
  className?: string;
  size?: "sm" | "md";
}

export function CustomerAvatar({
  name,
  src,
  className,
  size = "md",
}: CustomerAvatarProps) {
  const dim = size === "sm" ? "size-7" : "size-9";

  return (
    <Avatar className={`${dim} shrink-0 border border-slate-200 ${className ?? ""}`}>
      {src ? <AvatarImage src={src} alt={name} /> : null}
      <AvatarFallback className="bg-blue-50 text-xs font-semibold text-blue-700">
        {initials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
