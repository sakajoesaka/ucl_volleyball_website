import type { MetadataRoute } from "next";
import { navLinks, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...navLinks.map((link) => link.href), "/events/movember"].map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
