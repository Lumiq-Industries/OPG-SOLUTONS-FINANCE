"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypingTextProps = {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
};

export function TypingText({
  text,
  className,
  speed = 42,
  delay = 0,
  cursor = true,
}: TypingTextProps) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (display.length >= text.length) return;
    const timer = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed);
    return () => clearTimeout(timer);
  }, [display, started, speed, text]);

  return (
    <span className={cn("inline", className)}>
      {display}
      {cursor && display.length < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-[#9B7846] align-middle" />
      )}
    </span>
  );
}
