"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { BaseProduct } from "@/types";

interface AddToCartButtonProps {
  base: BaseProduct;
  className?: string;
}

export function AddToCartButton({ base, className }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Store in localStorage for lightweight client-side persistence
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
        // Dispatch custom storage event so other components (Header) can react
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
    <Button
      type="button"
      size="sm"
      onClick={handleAddToCart}
      className={className}
      variant={isAdded ? "secondary" : "default"}
      aria-label={isAdded ? `Added ${base.title} to cart` : `Add ${base.title} to cart`}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 text-emerald-400 mr-1.5" />
          <span className="text-emerald-400 font-semibold">Added</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  );
}
