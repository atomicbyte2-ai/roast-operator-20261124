import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  'My human deploys at 3am, breaks prod with a typo, and says "we" fixed it — we did nothing, but I\'d still choose him.';

if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.length > 140) {
  throw new Error(`entry is ${LINE.length} chars, over the 140 limit`);
}
if (LINE.length === 0) {
  throw new Error("entry must not be empty");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  throw new Error("written entry does not match the validated line");
}
console.log(`wrote entry.txt (${LINE.length} chars)`);
