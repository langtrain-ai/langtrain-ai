/**
 * Minimal image->manifest sample
 */

import fs from "fs";

export function sampleVisionToManifest(images: string[], outFile: string) {
    const manifest = images.map((p) => ({ image: p, caption: "PLACEHOLDER_CAPTION" }));
    fs.writeFileSync(outFile, JSON.stringify({ items: manifest }, null, 2));
    return outFile;
}
