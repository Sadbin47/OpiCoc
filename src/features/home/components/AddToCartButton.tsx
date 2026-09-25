"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Check } from "lucide-react";
import { BaseProduct } from "@/types";
import { useAnimationPreference } from "@/hooks/useAnimationPreference";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  base: BaseProduct;
  className?: string;
}

export function AddToCartButton({ base, className }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = React.useState(false);
  const { prefersReduced } = useAnimationPreference();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const currentCart = JSON.parse(localStorage.getItem("opicoc_cart") || "[]");
      const exists = currentCart.some((item: { id: string }) => item.id === base.id);

      if (!exists) {
        currentCart.push({
          id: base.id,
          title: base.title,
          price: base.price,
          productImage: base.productImage,
          townHall: base.townHall,
        });
        localStorage.setItem("opicoc_cart", JSON.stringify(currentCart));
        window.dispatchEvent(new Event("storage"));
      }
    } catch {
      // Ignore storage errors in private mode
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.button
      type="button"
      onClick={handleAddToCart}
      whileHover={prefersReduced ? undefined : { scale: 1.04 }}
      whileTap={prefersReduced ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "inline-flex items-center justify-center h-8 rounded-md px-3 text-xs font-semibold select-none cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        isAdded
          ? "bg-[#1A1E26] text-emerald-400 border border-emerald-500/40"
          : "bg-[#F59E0B] text-[#090A0D] hover:bg-[#D97706] shadow-sm",
        className
      )}
      aria-label={isAdded ? `Added ${base.title} to cart` : `Add ${base.title} to cart`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isAdded ? (
          <motion.span
            key="added"
            initial={prefersReduced ? undefined : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? undefined : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center"
          >
            <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>Added</span>
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={prefersReduced ? undefined : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReduced ? undefined : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            <span>Add to Cart</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
