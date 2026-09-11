# Verification Notes

The project source was validated in the generation environment with:

- `node scripts/verify-source.mjs` — validates required files, all six client promotion/help items, Tun header/footer copy, Mailchimp fields, no database/payment dependencies, and no public OpenAI key.
- Global TypeScript 5.8.3 compile of the pure keyboard/storage/transliteration/AI-prompt modules.
- 14 executable assertions covering caret insertion, selection replacement, Backspace, counts, transliteration, orthography, storage round-trips and AI conversion direction.
- A dependency-free TypeScript syntax/type pass over application source using temporary local module shims.
- `git diff --check` before packaging.

The current execution environment could not resolve `registry.npmjs.org`, so `npm install` timed out and the dependency-backed `npm test`, `npm run lint`, and `npm run build` commands could not be executed here. Run those commands after extracting the ZIP in an environment with npm registry access before production deployment.
