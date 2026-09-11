import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const requiredFiles = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/api/ai/route.ts",
  "src/components/KeyboardApp.tsx",
  "src/components/OnScreenKeyboard.tsx",
  "src/components/PromoSidebar.tsx",
  "src/components/AITools.tsx",
  "src/components/Footer.tsx",
  "src/lib/keyboard-layouts.ts",
  "src/lib/transliteration.ts",
  "src/lib/storage.ts",
  "README.md",
  ".env.example",
  "netlify.toml",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required project file: ${file}`);
}

const allSource = requiredFiles.filter((file) => file.endsWith(".ts") || file.endsWith(".tsx")).map(read).join("\n");
const promo = read("src/components/PromoSidebar.tsx") + "\n" + read("src/components/AITools.tsx");
const footer = read("src/components/Footer.tsx");
const header = read("src/components/Header.tsx");
const pkg = JSON.parse(read("package.json"));

for (const dependency of ["@supabase/supabase-js", "firebase", "prisma", "stripe", "mongoose"]) {
  if (pkg.dependencies?.[dependency] || pkg.devDependencies?.[dependency]) throw new Error(`Unexpected database/payment dependency: ${dependency}`);
}
for (const value of [
  "Tun Online Armenian School",
  "English to Armenian translation",
  "Try Armenian verb tool",
  "Join Armenian Social Network",
  "Try 4 lessons for $1",
  "https://translatearmenian.com/",
  "mailto:hello@tunapp.com",
]) {
  if (!promo.includes(value) && !read("src/config/brand.ts").includes(value)) throw new Error(`Missing promotional requirement: ${value}`);
}
for (const link of ["translator", "verbs", "socialNetwork", "getStarted"]) {
  if (!promo.includes(`brand.links.${link}`)) throw new Error(`Missing smart-tool destination: ${link}`);
}
if (!header.includes("Try 4 Armenian lessons for $1 →") || !header.includes('width="105"')) throw new Error("Header branding contract is incomplete");
if (!footer.includes("Enter your email here") || !footer.includes("Join the community")) throw new Error("Footer newsletter is incomplete");
if (!footer.includes("Copyright © 2026, Tun Online Armenian School. All rights reserved. For every Armenian who loves their home.")) throw new Error("Footer copyright is incorrect");
if (allSource.includes("NEXT_PUBLIC_OPENAI_API_KEY")) throw new Error("OpenAI key must not be public");
console.log("Source verification passed: required structure, Tun promotions, footer, and no database dependencies.");
