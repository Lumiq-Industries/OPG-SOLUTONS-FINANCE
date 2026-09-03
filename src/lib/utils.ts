import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number) {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export const STORE_NAME = "OPG Solutions";
