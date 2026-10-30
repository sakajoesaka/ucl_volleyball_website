import fs from "node:fs";
import path from "node:path";

// Checks whether a photo has been added to /public at build time, so the site can
// fall back to a labelled placeholder until it exists.
export function imageExists(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}
