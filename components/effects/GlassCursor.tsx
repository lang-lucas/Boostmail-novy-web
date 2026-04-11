"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Only on desktop with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("cursor-active");

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const grow = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { scale: 2.5, duration: 0.3, ease: "power2.out" });
    };

    const shrink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mix-blend-difference md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
