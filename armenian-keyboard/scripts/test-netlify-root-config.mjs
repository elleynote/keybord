import { readFileSync } from "node:fs";

const config = readFileSync(new URL("../../netlify.toml", import.meta.url), "utf8");

if (!/^\s*base\s*=\s*"armenian-keyboard"\s*$/m.test(config)) {
  throw new Error('Root netlify.toml must set base = "armenian-keyboard"');
}

if (!/^\s*command\s*=\s*"npm run build"\s*$/m.test(config)) {
  throw new Error('Root netlify.toml must run npm run build');
}

console.log("Root Netlify configuration points at armenian-keyboard.");
