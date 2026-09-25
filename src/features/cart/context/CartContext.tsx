"use client";

import * as React from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalItems: number;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "opicoc_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Listen to cross-window or custom storage events
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const updated = localStorage.getItem(CART_STORAGE_KEY);
        setItems(updated ? JSON.parse(updated) : []);
      } catch {}
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save to localStorage whenever items change after initial load
  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  const addItem = (item: CartItem) => {
    if (items.some((i) => i.id === item.id)) return;
    const next = [...items, item];
    saveItems(next);
  };

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    saveItems(next);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const isInCart = (id: string) => {
    return items.some((i) => i.id === id);
  };

  const totalItems = items.length;
  const totalPrice = items.reduce(
    (acc, curr) => acc + (typeof curr.price === "number" ? curr.price : 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
