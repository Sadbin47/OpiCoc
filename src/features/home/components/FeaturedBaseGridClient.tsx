"use client";

import * as React from "react";
import { BaseProduct } from "@/types";
import { BaseCard } from "@/features/bases/components/BaseCard";
import { MotionContainer } from "@/components/motion/MotionContainer";

interface FeaturedBaseGridClientProps {
  initialBases: BaseProduct[];
}

export function FeaturedBaseGridClient({ initialBases }: FeaturedBaseGridClientProps) {
  const [bases, setBases] = React.useState<BaseProduct[]>(initialBases);

  React.useEffect(() => {
    const handleUpdate = () => {
      // 1. Immediately check local cache for zero-latency UI update
      if (typeof window !== "undefined") {
        try {
          const raw = window.localStorage.getItem("opicoc_admin_bases");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              setBases(parsed.slice(0, 4));
            }
          }
        } catch {}
      }

      // 2. Fetch fresh bases from server API in background to ensure 100% server sync
      fetch("/api/bases")
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.bases)) {
            setBases(data.bases.slice(0, 4));
          }
        })
        .catch(() => {});
    };

    window.addEventListener("opicoc_bases_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("opicoc_bases_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  if (!bases || bases.length === 0) {
    return null;
  }

  return (
    <MotionContainer animation="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {bases.map((base, idx) => (
        <BaseCard key={base.id} base={base} priority={idx < 4} />
      ))}
    </MotionContainer>
  );
}
