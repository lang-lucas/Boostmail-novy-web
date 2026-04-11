"use client";

import { motion } from "framer-motion";

type BlurTextRevealProps = {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  staggerDelay?: number;
};

export function BlurTextReveal({
  text,
  tag: Tag = "h2",
  className = "",
  delay = 0,
  staggerDelay = 0.02,
}: BlurTextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => {
            const totalIndex =
              words.slice(0, wordIndex).join(" ").length + charIndex;
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: delay + totalIndex * staggerDelay,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="inline-block"
                style={{ willChange: "filter, opacity, transform" }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
