import * as React from "react";

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any>;
}

/**
 * Standard Next.js server-side JSON-LD structured data injector.
 * Enables search engine crawlers (Google, Bing) to parse Organization, Product,
 * FAQPage, BreadcrumbList, and other rich schemas.
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
