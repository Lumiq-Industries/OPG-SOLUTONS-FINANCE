"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { PreloaderGate } from "@/components/preloader";

const Chatbot = dynamic(() => import("@/components/chatbot").then((m) => m.Chatbot), {
  ssr: false,
});

export function FinanceShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  return (
    <PreloaderGate onComplete={handleComplete}>
      {children}
      {ready && <Chatbot />}
    </PreloaderGate>
  );
}
