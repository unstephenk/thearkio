import type { CartLine } from "@/lib/lion-ruo/types";

export const LION_CART_KEY = "lion-ruo-preview-cart-v1";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LION_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LION_CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("lion-cart-change"));
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.quantity, 0);
}
