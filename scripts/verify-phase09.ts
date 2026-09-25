import {
  fadeInVariants,
  fadeUpVariants,
  fadeScaleVariants,
  staggerContainerVariants,
  staggerItemVariants,
  reducedMotionVariants,
  EASINGS,
  DURATIONS,
} from "../src/components/motion/variants";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log("--- Testing Phase 09 Motion Variants & Reduced Motion Fallbacks ---");

// Test 1: Durations & Easings are properly calibrated for 60fps
assert(DURATIONS.fast < DURATIONS.normal, "Fast duration must be less than normal duration");
assert(DURATIONS.normal < DURATIONS.slow, "Normal duration must be less than slow duration");
assert(EASINGS.easeOutCubic.length === 4, "easeOutCubic must be cubic bezier 4-tuple");

// Test 2: Variants have initial hidden and target visible states
assert("hidden" in fadeInVariants && "visible" in fadeInVariants, "fadeInVariants has hidden and visible states");
assert("hidden" in fadeUpVariants && "visible" in fadeUpVariants, "fadeUpVariants has hidden and visible states");
assert("hidden" in fadeScaleVariants && "visible" in fadeScaleVariants, "fadeScaleVariants has hidden and visible states");
assert("hidden" in staggerContainerVariants && "visible" in staggerContainerVariants, "staggerContainerVariants has hidden and visible states");
assert("hidden" in staggerItemVariants && "visible" in staggerItemVariants, "staggerItemVariants has hidden and visible states");

// Test 3: Reduced motion variant collapses animations to immediate opacity
assert(reducedMotionVariants.visible !== undefined, "reducedMotionVariants has visible");
const redTransition = (reducedMotionVariants.visible as { transition?: { duration?: number } }).transition;
assert(redTransition?.duration === 0.01, "reducedMotionVariants duration must be minimal (0.01s)");

// Test 4: Stagger timings
const staggerTransition = (staggerContainerVariants.visible as { transition?: { staggerChildren?: number } }).transition;
assert(staggerTransition?.staggerChildren === 0.06, "Stagger interval must be 0.06s for rapid 60fps cascade");

console.log("✅ All Phase 09 Motion & Reduced-Motion unit checks passed successfully!");
