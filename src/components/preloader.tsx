"use client";

import { motion } from "framer-motion";
import { OPGFinanceLogo } from "@/components/opg-finance-logo";

export function PreloaderGate({
  children,
  onComplete,
}: {
  children: React.ReactNode;
  onComplete?: () => void;
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f7f5f1]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ delay: 2.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => onComplete?.()}
        role="status"
        aria-label="Loading OPG Solutions Finance"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <OPGFinanceLogo size="lg" animated />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-8 text-[10px] tracking-[0.4em] uppercase text-[#2B3A48]/45"
        >
          Unlocking Business Potential
        </motion.p>
        <motion.div
          className="mt-10 h-px w-32 overflow-hidden bg-[#2B3A48]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="h-full bg-[#9B7846]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.4, duration: 1.1, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        {children}
      </motion.div>
    </>
  );
}
