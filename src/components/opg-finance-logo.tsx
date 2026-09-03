"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAVY = "#2B3A48";
const GOLD = "#9B7846";

function Emblem({ animated }: { animated: boolean }) {
  if (animated) {
    return (
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -3, 0] }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
      >
        <motion.path
          d="M62 136 C62 82 104 42 160 42 C216 42 258 82 258 136"
          stroke={GOLD}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
        <motion.text
          x="160"
          y="128"
          textAnchor="middle"
          fill={NAVY}
          fontSize="34"
          fontWeight="700"
          fontFamily="var(--font-dm-sans), Arial, sans-serif"
          letterSpacing="2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          OPG
        </motion.text>
        {[
          { x: 92, width: 136, y: 168, delay: 0.95 },
          { x: 108, width: 104, y: 184, delay: 1.05 },
          { x: 124, width: 72, y: 200, delay: 1.15 },
          { x: 140, width: 40, y: 216, delay: 1.25 },
        ].map((bar) => (
          <motion.rect
            key={bar.x}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height="8"
            rx="2"
            fill={NAVY}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: bar.delay }}
            style={{ transformOrigin: "160px center" }}
          />
        ))}
      </motion.g>
    );
  }

  return (
    <g>
      <path
        d="M62 136 C62 82 104 42 160 42 C216 42 258 82 258 136"
        stroke={GOLD}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="160"
        y="128"
        textAnchor="middle"
        fill={NAVY}
        fontSize="34"
        fontWeight="700"
        fontFamily="var(--font-dm-sans), Arial, sans-serif"
        letterSpacing="2"
      >
        OPG
      </text>
      <rect x="92" y="168" width="136" height="8" rx="2" fill={NAVY} />
      <rect x="108" y="184" width="104" height="8" rx="2" fill={NAVY} />
      <rect x="124" y="200" width="72" height="8" rx="2" fill={NAVY} />
      <rect x="140" y="216" width="40" height="8" rx="2" fill={NAVY} />
    </g>
  );
}

function Wordmark({ animated }: { animated: boolean }) {
  const textProps = (delay: number) =>
    animated
      ? {
          initial: { opacity: 0, y: 10 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { duration: 0.55, ease: "easeOut" as const, delay },
        }
      : {};

  const Text = animated ? motion.text : "text";

  return (
    <>
      <Text
        x="160"
        y="286"
        textAnchor="middle"
        fill={NAVY}
        fontSize="56"
        fontWeight="700"
        fontFamily="var(--font-dm-sans), Arial, sans-serif"
        letterSpacing="4"
        {...textProps(1.35)}
      >
        OPG
      </Text>
      {animated ? (
        <motion.text
          x="248"
          y="252"
          fill={NAVY}
          fontSize="14"
          fontWeight="600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          TM
        </motion.text>
      ) : (
        <text x="248" y="252" fill={NAVY} fontSize="14" fontWeight="600">
          TM
        </text>
      )}
      <Text
        x="160"
        y="322"
        textAnchor="middle"
        fill={NAVY}
        fontSize="18"
        fontWeight="500"
        fontFamily="var(--font-dm-sans), Arial, sans-serif"
        letterSpacing="10"
        {...textProps(1.55)}
      >
        SOLUTIONS
      </Text>
    </>
  );
}

export function OPGFinanceLogo({
  className,
  size = "md",
  animated = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}) {
  const widths = { sm: 100, md: 160, lg: 240 };
  const width = widths[size];
  const height = width * 1.19;

  return (
    <div className={cn("inline-flex justify-center", className)} aria-label="OPG Solutions Finance">
      <svg
        width={width}
        height={height}
        viewBox="0 0 320 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
      >
        <Emblem animated={animated} />
        <Wordmark animated={animated} />
      </svg>
    </div>
  );
}
