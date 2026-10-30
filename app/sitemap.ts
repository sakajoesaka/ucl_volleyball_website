import type { MetadataRoute } from "next";
import { navLinks, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({ url: new URL(link.href, site.url).toString() }));
}
