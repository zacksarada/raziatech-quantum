// src/contexts/CartContext.tsx
'use client';
export function CartProvider({ children }: any) {
  return <>{children}</>;
}
export function useCart() {
  return { cartItems: [] };
}
