# Tun Armenian Keyboard Design

## Goal
Build a standalone, production-quality Armenian Keyboard web app for Tun Online Armenian School that supports Western and Eastern Armenian typing, standard and phonetic layouts, transliteration, useful text actions, optional AI helpers, Tun ecosystem promotion, and a responsive Tun-branded shell.

## Architecture
The app is a Next.js App Router application written in TypeScript. Core typing, keyboard mappings, text analysis, transliteration, clipboard utilities, local preferences, and saved vocabulary are client-side and database-free. Optional AI actions are exposed through a single secure server route using `OPENAI_API_KEY`; the app remains fully usable when the key is absent.

## Data and persistence
No database, authentication, billing, Supabase, Firebase, Prisma, or backend storage. Browser persistence uses localStorage through a single storage utility. Persist dialect, keyboard layout, orthography, recent editor text, and saved vocabulary.

## Core interaction
- Dialect: Western Armenian (default) or Eastern Armenian.
- Keyboard layout: Standard (default) or Phonetic.
- Orthography: Reformed (default) or Traditional.
- On-screen keyboard inserts at the caret, replaces selections, supports Backspace, Enter, Space, Shift, punctuation and Armenian letters.
- Physical typing remains available in the textarea.
- Copy, Paste, Clear, Listen, character count and word count are provided.
- Transliteration updates locally as text changes.
- English translation is user-triggered to control cost.

## AI helpers
`/api/ai` accepts a constrained action enum: `translate`, `check`, `convert`, `ask`. It uses the OpenAI Responses API through server-side fetch only. Missing key or upstream failure returns a friendly error; no secrets are exposed client-side.

## Linguistic safety
Keyboard mapping, transliteration and orthography are isolated into data/logic modules. The implementation avoids claiming exhaustive linguistic correctness and keeps rules editable. Western and Eastern behavior are represented separately where relevant.

## Visual system
Structure follows the supplied Armenian Keyboard mockup, while branding follows the Western Armenian Translator: Nunito, Noto Sans Armenian, white surfaces, #F8F8F8 background, #171717 ink, #666666 secondary text, #E8E5E2 borders, #DB182B primary red and #BF1324 hover red. The header uses the Tun logo treatment and $1 promo strip; the footer mirrors the translator footer structure with mountain artwork, black directory section, social links, Mailchimp community signup and exact copyright copy.

## Promotion/help requirements
All six client-requested items appear in the UI: Tun Online Armenian School, Armenian Translation Tool, Armenian Verb Conjugations, Armenian Social Network, Learn Armenian Online and Need help/contact email. The sidebar uses hierarchy so the school promotion is prominent and the remaining tools are compact.

## Responsive behavior
Desktop uses a wide two-column layout with the main keyboard area dominant and the resource sidebar secondary. Tablet/mobile stack cleanly, prevent horizontal overflow, keep touch targets usable, wrap segmented controls and preserve keyboard readability down to 320px.

## Accessibility and reliability
Use semantic buttons, labels, focus states, aria labels, graceful Clipboard and SpeechSynthesis fallbacks, inline status messages, and no silent failures. Async actions have loading/error states.

## Deliverable
A complete ZIP with source, README, `.env.example`, Netlify configuration, tests, and verified `npm test`, `npm run lint`, and `npm run build` results.
