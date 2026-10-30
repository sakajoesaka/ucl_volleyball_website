import type { Metadata } from "next";
import { site } from "@/content/site";

// Title, description and link-preview details for one page.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.fullName} | Volleyball at UCL`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.fullName,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      // Repeated here because a page's own openGraph replaces the one inherited from app/.
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: "A UCL Volleyball player leaps above the net to spike the ball",
        },
      ],
    },
  };
}
