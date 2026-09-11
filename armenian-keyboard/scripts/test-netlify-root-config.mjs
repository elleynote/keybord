import { readFileSync } from "node:fs";

const rootConfig = readFileSync(new URL("../../netlify.toml", import.meta.url), "utf8");
const baseConfig = readFileSync(new URL("../netlify.toml", import.meta.url), "utf8");
const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

if (!/^\s*base\s*=\s*"armenian-keyboard"\s*$/m.test(rootConfig)) {
  throw new Error('Root netlify.toml must set base = "armenian-keyboard"');
}

if (!/^\s*command\s*=\s*"npm run build"\s*$/m.test(rootConfig)) {
  throw new Error('Root netlify.toml must run npm run build');
}

if (!/^\s*NPM_VERSION\s*=\s*"11\.6\.0"\s*$/m.test(rootConfig)) {
  throw new Error('Root netlify.toml must pin NPM_VERSION = "11.6.0"');
}

if (!/^\s*NPM_VERSION\s*=\s*"11\.6\.0"\s*$/m.test(baseConfig)) {
  throw new Error('Base-directory netlify.toml must pin NPM_VERSION = "11.6.0"');
}

if (!/^\s*publish\s*=\s*"\.next"\s*$/m.test(baseConfig)) {
  throw new Error('Base-directory netlify.toml must publish ".next"');
}

if (!/^\s*\[\[plugins\]\]\s*$/m.test(baseConfig) || !/^\s*package\s*=\s*"@netlify\/plugin-nextjs"\s*$/m.test(baseConfig)) {
  throw new Error('Base-directory netlify.toml must register @netlify/plugin-nextjs');
}

if (packageJson.devDependencies?.["@netlify/plugin-nextjs"] !== "5.15.13") {
  throw new Error('package.json must pin @netlify/plugin-nextjs to 5.15.13');
}

console.log("Netlify config pins npm, publishes .next, and registers the Next.js runtime.");
