import { getReviews } from "@/services/reviewService";
import { ReviewSection } from "./ReviewSection";

/**
 * Async Server Component wrapper enabling React Suspense streaming for reviews.
 */
export async function ReviewSectionStream() {
  const reviews = await getReviews();
  return <ReviewSection reviews={reviews} />;
}
