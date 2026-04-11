"use client";

import { timelineEvents } from "@/lib/data";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6" ref={ref}>
        <SectionReveal>
          <p className="mb-12 text-center text-sm text-text-muted uppercase tracking-wider">
            Reálný scénář
          </p>
        </SectionReveal>

        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-0 left-[72px] h-full w-px bg-brand/20 md:left-[88px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.time}
              className="relative mb-8 flex items-center gap-6 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.4 }}
            >
              <div className="w-16 shrink-0 text-right font-mono text-lg text-brand md:w-20">
                {event.time}
              </div>
              <div className="relative z-10 h-3 w-3 shrink-0 rounded-full bg-brand shadow-[0_0_12px_rgba(57,143,255,0.5)]" />
              <div className="text-text-primary">{event.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
