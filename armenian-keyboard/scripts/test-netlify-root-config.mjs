import { readFileSync } from "node:fs";

const rootConfig = readFileSync(new URL("../../netlify.toml", import.meta.url), "utf8");
const baseConfig = readFileSync(new URL("../netlify.toml", import.meta.url), "utf8");

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

console.log("Netlify root and base-directory configs both pin npm 11.6.0.");
