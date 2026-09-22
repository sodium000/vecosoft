"use client";

import { useEffect, useState } from "react";

export function useCountUp(
  end: number,
  durationMs = 1200,
  decimals = 0,
  enabled = true
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(end);
      return;
    }

    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, durationMs, enabled]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
}
