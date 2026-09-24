import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <Container size="narrow" className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold">
            HTTP 404 Error
          </span>
          <h1 className="font-clash text-4xl sm:text-5xl font-bold text-[#F1F5F9]">
            Sector Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-md mx-auto">
            The layout, base tier, or page coordinates you requested do not exist or have been relocated in the V2 deployment.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/all-products" className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-500" />
              Explore Bases
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
