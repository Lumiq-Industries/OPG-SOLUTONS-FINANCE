import { OPGFinanceLogo } from "@/components/opg-finance-logo";

export function FinanceLogo({ className = "", size = "sm" as const }: { className?: string; size?: "sm" | "md" | "lg" }) {
  return <OPGFinanceLogo className={className} size={size} />;
}
