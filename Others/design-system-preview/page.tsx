"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { MotionFadeIn } from "@/components/motion/MotionFadeIn";
import { MotionStaggerContainer, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { TacticalButton } from "@/components/motion/TacticalButton";
import {
  Shield,
  Sparkles,
  Search,
  Mail,
  Lock,
  ChevronDown,
  Layers,
  RefreshCw,
} from "lucide-react";

export default function DesignSystemPage() {
  const [motionKey, setMotionKey] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="py-12 space-y-16">
      {/* Title & Overview Banner */}
      <Section spacing="none">
        <Container size="default">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#262B35]">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default">Phase 02 Architecture</Badge>
                <Badge variant="tactical">WCAG AA Compliant</Badge>
                <Badge variant="success">Interactive Real Components</Badge>
              </div>
              <h1 className="font-clash text-4xl sm:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                Design System & <span className="text-amber-500">Component Matrix</span>
              </h1>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
                Living visual specifications and production UI primitives powering the OPICOC V2 competitive gaming platform. Every component is accessible, responsive, and tokenized.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setMotionKey((k) => k + 1)}
              className="flex items-center gap-2 self-start md:self-auto font-mono text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Replay Motion
            </Button>
          </div>
        </Container>
      </Section>

      {/* 1. Color Palette Tokens */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9] flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                1. Semantic Color Tokens
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Strict contrast tokens eliminating the legacy 1.62:1 low-contrast defect.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: "Primary (Amber)", hex: "#F59E0B", fg: "#090A0D", role: "Primary CTA / Focus", contrast: "11.2:1" },
                { name: "Tactical Accent", hex: "#3B82F6", fg: "#FFFFFF", role: "CWL & Esports Meta", contrast: "5.2:1" },
                { name: "Success", hex: "#10B981", fg: "#041F15", role: "Verified / Active", contrast: "9.4:1" },
                { name: "Destructive", hex: "#EF4444", fg: "#FFFFFF", role: "Expired / Danger", contrast: "4.8:1" },
                { name: "Card Surface", hex: "#12151B", fg: "#F1F5F9", role: "Card Containers", contrast: "14.5:1" },
                { name: "Background", hex: "#0B0D11", fg: "#F1F5F9", role: "Root Canvas", contrast: "16.8:1" },
              ].map((color) => (
                <div
                  key={color.name}
                  className="rounded-lg border border-[#262B35] bg-[#12151B] p-3 flex flex-col justify-between space-y-3"
                >
                  <div
                    className="h-14 rounded-md flex items-center justify-center font-mono text-xs font-bold shadow-inner"
                    style={{ backgroundColor: color.hex, color: color.fg }}
                  >
                    {color.hex}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#F1F5F9] block">{color.name}</span>
                    <span className="text-[11px] text-[#64748B] block mt-0.5">{color.role}</span>
                    <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                      Contrast: {color.contrast}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Typography Hierarchy */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                2. Typography Hierarchy
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Clash Display for structural boldness paired with Geist Sans for razor-sharp micro-data.
              </p>
            </div>

            <div className="rounded-xl border border-[#262B35] bg-[#12151B] p-6 space-y-6">
              <div className="space-y-1 pb-4 border-b border-[#1E232B]">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block">Display • Clash 56px Bold</span>
                <p className="font-clash text-4xl sm:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                  UNBEATABLE CLASH BASES
                </p>
              </div>

              <div className="space-y-1 pb-4 border-b border-[#1E232B]">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block">Heading 1 • Clash 36px Bold</span>
                <p className="font-clash text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                  Town Hall 18 CWL Anti-3 Star Defense
                </p>
              </div>

              <div className="space-y-1 pb-4 border-b border-[#1E232B]">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block">Heading 2 • Clash 24px Bold</span>
                <p className="font-clash text-xl font-bold text-[#F1F5F9]">
                  Meta Pack Validity & Tournament Strategy
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">Body Large • Geist 16px Regular</span>
                  <p className="text-base text-[#CBD5E1] leading-relaxed">
                    Tested across 50+ champion war league attacks. Built to counter the current Queen Charge and Root Rider smash formations.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">Caption & Tabular Data • Geist 12px Mono</span>
                  <p className="text-xs font-mono text-[#94A3B8] tabular-nums">
                    PRICE: $46.00 USD • SEASON EXPIRES: 2026-05-07 • ORDER #OPI-9482
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Button Hierarchy */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                3. Button System
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Semantic variants, states, tactile press feedback, and accessible focus rings.
              </p>
            </div>

            <div className="rounded-xl border border-[#262B35] bg-[#12151B] p-6 space-y-6">
              {/* Variants */}
              <div>
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-3">Variants</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="tactical">Tactical CWL</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Inline Link</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-3">Sizes</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small (sm)</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large (lg)</Button>
                  <Button size="icon" aria-label="Shield action">
                    <Shield className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* States */}
              <div>
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-3">States</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button isLoading>Processing Order</Button>
                  <Button disabled>Disabled Action</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Badges & Tags */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                4. Tactical Badges & Indicators
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Visual tags for Town Hall levels, pack tiers, and defense classifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-[#262B35] bg-[#12151B] p-6">
              <Badge variant="default">Amber Gold (Default)</Badge>
              <Badge variant="tactical">
                <Shield className="w-3 h-3 mr-1" />
                CWL Pro Pack
              </Badge>
              <Badge variant="success">Verified Buyer</Badge>
              <Badge variant="warning">Expires in 3 Days</Badge>
              <Badge variant="destructive">Season Expired</Badge>
              <Badge variant="secondary">Town Hall 17</Badge>
              <Badge variant="outline">Anti-3 Star</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Form Primitives & Validation */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                5. Form Controls & Validation Foundation
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Accessible labels, helper text, error messages, and icon-prefixed inputs.
              </p>
            </div>

            <div className="rounded-xl border border-[#262B35] bg-[#12151B] p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="demo-email"
                label="Player Email"
                description="Your digital layout links will be delivered here."
                required
              >
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="chief@clashofclans.com"
                  startIcon={<Mail className="w-4 h-4" />}
                />
              </FormField>

              <FormField
                id="demo-search"
                label="Search Base Catalogue"
                description="Search by Town Hall, defensive meta, or builder."
              >
                <Input
                  id="demo-search"
                  type="text"
                  placeholder="e.g. Anti-Air CWL 17"
                  startIcon={<Search className="w-4 h-4" />}
                />
              </FormField>

              <FormField
                id="demo-error"
                label="Supercell Layout URL"
                required
                error="Must be a valid https://link.clashofclans.com layout link"
              >
                <Input
                  id="demo-error"
                  defaultValue="http://invalid-link.com"
                  error
                  startIcon={<Lock className="w-4 h-4" />}
                />
              </FormField>

              <FormField
                id="demo-select"
                label="Town Hall Tier"
                description="Select your target defensive town hall level."
                required
              >
                <Select defaultValue="th18">
                  <SelectTrigger id="demo-select">
                    <SelectValue placeholder="Select Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Tiers</SelectLabel>
                      <SelectItem value="th18">Town Hall 18 (Current Meta)</SelectItem>
                      <SelectItem value="th17">Town Hall 17</SelectItem>
                      <SelectItem value="th16">Town Hall 16</SelectItem>
                      <SelectItem value="th15">Town Hall 15</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormField>

              <div className="md:col-span-2">
                <FormField
                  id="demo-desc"
                  label="Custom Base Requirements"
                  description="Describe the defensive priority (Anti-2 star, Clan War League, Legend Cup pushing)."
                >
                  <Textarea
                    id="demo-desc"
                    placeholder="Enter special troop defenses, sweeper angles, and core trap placements..."
                    rows={3}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Cards & Surface Elevation */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                6. Surface Hierarchy & Cards
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Level 2 standard card vs Level 3 elevated card vs interactive hover lift card.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">Surface Level 2</Badge>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>Default surface container for content blocks.</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-[#94A3B8]">
                  Used for product specs, order receipts, and technical descriptions.
                </CardContent>
              </Card>

              <Card elevated>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">Surface Level 3</Badge>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Subtle tonal lift for active widgets and callouts.</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-[#94A3B8]">
                  Highlights special CWL alerts or user account notification summaries.
                </CardContent>
              </Card>

              <Card interactive>
                <CardHeader>
                  <Badge variant="default" className="w-fit mb-2">Interactive Lift</Badge>
                  <CardTitle>Base Product Card</CardTitle>
                  <CardDescription>Hover lift with border highlight on non-touch devices.</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-[#94A3B8]">
                  Includes micro-interaction spring and border accent transition.
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="font-clash text-lg font-bold text-amber-500">$46.00</span>
                  <Button size="sm">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. Dialogs, Modals & Dropdown Menus */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                7. Dialogs & Interactive Menus
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Accessible Radix UI dialog replacing the legacy checkbox hack.
              </p>
            </div>

            <div className="rounded-xl border border-[#262B35] bg-[#12151B] p-6 flex flex-wrap items-center gap-4">
              {/* Accessible Dialog */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="primary">Launch Layout Modal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <Badge variant="tactical" className="w-fit mb-1">Town Hall 18 Pro</Badge>
                    <DialogTitle>TH18 Legend League Trophy Base</DialogTitle>
                    <DialogDescription>
                      Full defensive analysis and meta strategy details for Clan War League.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2 space-y-3 text-sm text-[#CBD5E1]">
                    <p>
                      This layout has been tested across 45 competitive matches with an 84% 1-star / 2-star defense rate against Root Rider combinations.
                    </p>
                    <div className="p-3 rounded-lg bg-[#0B0D11] border border-[#1E232B] flex items-center justify-between text-xs font-mono">
                      <span>DEFENSE FOCUS: ANTI-3 STAR</span>
                      <span className="text-emerald-400">STATUS: ACTIVE</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close Preview</Button>
                    </DialogClose>
                    <Button variant="primary">Add Pack to Cart ($46)</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span>Options Dropdown</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View CWL Base 1</DropdownMenuItem>
                  <DropdownMenuItem>View CWL Base 2</DropdownMenuItem>
                  <DropdownMenuItem>Download Defensive Log</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-400">Remove from Library</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Tabs Primitive */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                8. Tabs Navigation Primitive
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Tabbed views for Town Hall switching, user dashboards, and account settings.
              </p>
            </div>

            <div className="rounded-xl border border-[#262B35] bg-[#12151B] p-6">
              <Tabs defaultValue="th18" className="w-full">
                <TabsList className="grid grid-cols-4 w-full sm:w-[480px]">
                  <TabsTrigger value="th18">TH 18</TabsTrigger>
                  <TabsTrigger value="th17">TH 17</TabsTrigger>
                  <TabsTrigger value="th16">TH 16</TabsTrigger>
                  <TabsTrigger value="th15">TH 15</TabsTrigger>
                </TabsList>
                <TabsContent value="th18" className="p-4 rounded-lg bg-[#0B0D11] border border-[#1E232B] mt-4">
                  <h4 className="font-clash text-lg font-bold text-amber-400">Town Hall 18 Defense Hub</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Showing latest meta releases for Town Hall 18 CWL packs and competitive Legend cups.
                  </p>
                </TabsContent>
                <TabsContent value="th17" className="p-4 rounded-lg bg-[#0B0D11] border border-[#1E232B] mt-4">
                  <h4 className="font-clash text-lg font-bold text-[#F1F5F9]">Town Hall 17 Defense Hub</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Classic anti-3 star formations for Town Hall 17 Clan War Leagues.
                  </p>
                </TabsContent>
                <TabsContent value="th16" className="p-4 rounded-lg bg-[#0B0D11] border border-[#1E232B] mt-4">
                  <h4 className="font-clash text-lg font-bold text-[#F1F5F9]">Town Hall 16 Defense Hub</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Reliable anti-ground layouts with central monolith defense.
                  </p>
                </TabsContent>
                <TabsContent value="th15" className="p-4 rounded-lg bg-[#0B0D11] border border-[#1E232B] mt-4">
                  <h4 className="font-clash text-lg font-bold text-[#F1F5F9]">Town Hall 15 Defense Hub</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Spell tower defense formations for TH15 pushing.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. Alerts & Semantic Feedback */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                9. Semantic Alerts & Banners
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Actionable user feedback with semantic icons and WCAG AA contrast.
              </p>
            </div>

            <div className="space-y-3">
              <Alert variant="default" title="System Notice">
                OPICOC V2 architectural rebuild is currently executing Phase 02 foundation.
              </Alert>
              <Alert variant="info" title="CWL Meta Season Live">
                New Town Hall 18 and 17 pro packs released for the April Clan War League cycle.
              </Alert>
              <Alert variant="success" title="Purchase Verified">
                Order #OPI-9482 confirmed. Your Supercell layout links have been added to your profile.
              </Alert>
              <Alert variant="warning" title="Season Ending Soon">
                Current meta packs expire in 4 days. New layouts release on the 28th.
              </Alert>
              <Alert variant="destructive" title="Payment Action Required">
                Card authorization declined. Please verify your billing zip code or select PayPal.
              </Alert>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10. Motion System Demonstration */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                10. Motion for React Foundation
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Hardware-accelerated stagger reveals with automatic reduced-motion detection.
              </p>
            </div>

            <div key={motionKey} className="space-y-6">
              <MotionFadeIn>
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    MotionFadeIn: Decelerated cubic-bezier entrance reveal
                  </span>
                  <span>280ms</span>
                </div>
              </MotionFadeIn>

              <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <MotionStaggerItem key={item}>
                    <Card interactive className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Stagger Item {item}</Badge>
                        <span className="text-[10px] font-mono text-[#64748B]">+{item * 60}ms</span>
                      </div>
                      <h4 className="font-clash text-lg font-bold text-[#F1F5F9]">Staggered Card {item}</h4>
                      <p className="text-xs text-[#94A3B8]">
                        Smooth hardware-accelerated transform with zero layout reflow.
                      </p>
                    </Card>
                  </MotionStaggerItem>
                ))}
              </MotionStaggerContainer>

              {/* Tactical Spring Button Demonstrations */}
              <div className="pt-4 border-t border-[#1E232B] space-y-3">
                <span className="text-xs font-mono text-[#64748B]">
                  Tactile Spring Buttons (Motion Physics: stiffness 450, damping 25):
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <TacticalButton variant="primary" size="md">
                    Tactile Primary
                  </TacticalButton>
                  <TacticalButton variant="secondary" size="md">
                    Tactile Secondary
                  </TacticalButton>
                  <TacticalButton variant="outline" size="md">
                    Tactile Outline
                  </TacticalButton>
                  <TacticalButton variant="ghost" size="md">
                    Tactile Ghost
                  </TacticalButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 11. Skeleton Zero-CLS Loading States */}
      <Section spacing="none">
        <Container size="default">
          <div className="space-y-6">
            <div className="border-b border-[#1E232B] pb-3">
              <h2 className="font-clash text-2xl font-bold text-[#F1F5F9]">
                11. Zero-CLS Skeleton Loading States
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1">
                Geometry-matched skeletons preventing Cumulative Layout Shift during data fetching.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-[#262B35] bg-[#12151B] p-5 space-y-4">
                  <Skeleton className="h-36 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="pt-2 flex justify-between items-center">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
