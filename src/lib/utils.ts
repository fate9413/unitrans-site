import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_CIRC = [0.65, 0, 0.35, 1] as const;

export const SPRING_PANEL = {
  type: "spring",
  stiffness: 170,
  damping: 26,
} as const;

export const SPRING_SNAPPY = {
  type: "spring",
  stiffness: 420,
  damping: 34,
} as const;
