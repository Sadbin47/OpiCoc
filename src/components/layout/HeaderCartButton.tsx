"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/features/cart/context/CartContext";
import { ShoppingCart } from "lucide-react";

export function HeaderCartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center h-9 w-9 rounded-md border border-[#262B35] bg-[#12151B] text-[#CBD5E1] hover:text-[#F1F5F9] hover:border-[#3B4252] transition outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label={`Shopping Cart (${totalItems} items)`}
    >
      <ShoppingCart className="w-4 h-4" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black shadow-sm animate-in zoom-in-50">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
