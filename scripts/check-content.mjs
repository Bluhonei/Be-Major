// Runs before every build (npm "prebuild").
// 1. Brand language rule: Be Major is not a charitable organization, so
//    no copy, metadata, alt text or schema may say or imply it. Also holds
//    back the offerings Brae has paused (scholarships etc.).
// 2. Once LAUNCHED is true, no flagged copy may remain.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["app", "components", "content", "config", "lib", "public"];
const EXT = /\.(tsx?|mjs|css|json|txt|svg|xml|webmanifest)$/;
const BANNED =
  /\b(foundations?|charit(y|ies|able)|non-?profits?|not-for-profit|501\s*\(?c\)?|donat(e|es|ed|ion|ions|ing)|tax[- ]deductible|philanthrop(y|ic)|scholarships?|internships?|fellowships?|funding|grants?)\b/i;

const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : EXT.test(p) ? [p] : [];
  });

const problems = [];
for (const file of ROOTS.flatMap(files)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes("brand-language-ok")) return;
      const m = line.match(BANNED);
      if (m) problems.push(`${file}:${i + 1}  "${m[0]}"`);
    });
}

const config = readFileSync("config/site.ts", "utf8");
const launched = /export const LAUNCHED\s*=\s*true/.test(config);
if (launched) {
  const content = readFileSync("content/site.ts", "utf8");
  const flags = content.match(/flagged\(\s*"/g)?.length ?? 0;
  if (flags) problems.push(`content/site.ts: ${flags} flagged item(s) left; resolve before launch`);
}

if (problems.length) {
  console.error("Content check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("Content check passed.");
