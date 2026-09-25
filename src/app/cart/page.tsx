"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/context/CartContext";
import { getClientSession } from "@/services/authService";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Trash2,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    const user = getClientSession();
    if (!user) {
      // Must authenticate to receive digital delivery in profile
      router.push(`/login?redirectTo=${encodeURIComponent("/cart")}`);
      return;
    }

    setIsCheckingOut(true);

    try {
      // Simulate checkout processing
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Generate order record in user's library
      const existingPurchases = JSON.parse(
        localStorage.getItem("opicoc_purchased_bases") || "[]"
      );

      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
      const newPurchases = items.map((item) => ({
        id: `pb-${Math.random().toString(36).substring(2, 9)}`,
        orderId,
        baseId: item.id,
        title: item.title,
        townHall: item.townHall,
        productImage: item.productImage,
        price: item.price,
        purchasedAt: new Date().toISOString(),
        links: [
          {
            id: `link-1`,
            label: "Primary War Defense",
            url: `https://link.clashofclans.com/en?action=OpenLayout&id=${encodeURIComponent(
              item.title
            )}`,
          },
        ],
      }));

      localStorage.setItem(
        "opicoc_purchased_bases",
        JSON.stringify([...newPurchases, ...existingPurchases])
      );

      clearCart();
      router.push("/profile?tab=purchased&success=true");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#0B0D11]">
      <Container size="default">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-8">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#F1F5F9]">Shopping Cart</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#262B35]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Digital Armory Checkout</span>
            </div>
            <h1 className="font-clash text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Your Selected Base Layouts
            </h1>
          </div>

          {items.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-xs text-[#64748B] hover:text-red-400 self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Clear Cart
            </Button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-[#262B35] bg-[#12151B] transition hover:border-amber-500/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-[#1A1E26] shrink-0 border border-[#262B35]">
                      <Image
                        src={item.productImage}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="tactical" className="text-[10px] px-1.5 py-0.5">
                          {item.townHall}
                        </Badge>
                      </div>
                      <h3 className="font-clash text-base font-bold text-[#F1F5F9]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#64748B] font-mono">
                        Instant Supercell Game Import
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1E232B]">
                    <span className="font-clash text-xl font-bold text-[#F1F5F9]">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 text-[#64748B] hover:text-red-400 hover:bg-red-500/10"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/all-products" className="flex items-center gap-1.5 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-[#262B35] bg-[#12151B] p-6 sm:p-7 space-y-6 shadow-xl">
                <h2 className="font-clash text-xl font-bold text-[#F1F5F9]">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs border-b border-[#1E232B] pb-4">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-mono text-[#F1F5F9]">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Digital Goods Delivery</span>
                    <span className="font-mono text-emerald-400 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Estimated Tax</span>
                    <span className="font-mono text-[#F1F5F9]">$0.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#F1F5F9]">Total Due</span>
                  <span className="font-clash text-2xl font-bold text-amber-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-6 text-sm font-bold shadow-lg shadow-amber-500/20 gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isCheckingOut ? "Processing Order..." : "Proceed to Checkout"}
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Guarantees */}
                <div className="space-y-2.5 pt-2 text-[11px] text-[#94A3B8]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instant Supercell layout link access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>100% Supercell Fair Play TOS compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>24/7 Discord support assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="max-w-md mx-auto text-center py-16 px-6 rounded-2xl border border-[#262B35] bg-[#12151B] space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">Your Armory is Empty</h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              You haven&apos;t added any base layouts to your cart yet. Explore our audited Town Hall 15 to 18 defensive formations.
            </p>
            <div className="pt-2">
              <Button asChild size="default" className="font-semibold gap-2 shadow-md">
                <Link href="/all-products">
                  Explore Town Hall Bases
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
