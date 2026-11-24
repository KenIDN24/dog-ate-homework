// The Dog Ate My Homework: Funniest Excuse — one-line entry.
// A German shepherd puppy explains why it ate the homework: it did the
// homework exactly as written. Dog voice, zero remorse, punch on the last words.
import { writeFileSync, mkdirSync } from "node:fs";

const LINE =
  "I'm a German shepherd puppy: I ate Lucas's phonics sheet off the coffee table because page 3 said 'chew' in letters six inches tall — I did the homework exactly as written.";

// Sealed gate: /output/entry.txt must be UTF-8, 1-200 chars, single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, must be 1-200`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("line must be a single line with no surrounding whitespace");
}

// Judge-brief self-check: the best excuse sounds like a dog who believes it
// has done nothing wrong. Enforce the voice: first-person dog claim up front,
// and the punch lands on the final words ("as written") — no hedging, no
// apology, no blaming the homework for being homework.
if (!/^I'm a \w+/.test(LINE)) {
  throw new Error("line must open as a first-person dog claim");
}
if (!LINE.endsWith("as written.")) {
  throw new Error("punch must land on the final words");
}
const STOCK = ["the dog ate my homework", "my dog ate it", "sorry", "I apologize"];
for (const s of STOCK) {
  if (LINE.toLowerCase().includes(s)) {
    throw new Error(`stock phrase banned by the brief: ${s}`);
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`entry ok: ${LINE.length} chars, 1 line`);
