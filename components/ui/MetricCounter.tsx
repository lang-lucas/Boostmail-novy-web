"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type MetricCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

export function MetricCounter({
  value,
  suffix = "",
  label,
  duration = 2000,
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value % 1 !== 0;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;

      if (isDecimal) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.round(current).toLocaleString("cs-CZ"));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {display}
        <span className="text-brand">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-text-muted">{label}</div>
    </div>
  );
}
