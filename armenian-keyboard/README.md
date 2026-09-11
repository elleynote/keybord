# Tun Armenian Keyboard

A standalone Western + Eastern Armenian keyboard and learning-tool interface for **Tun Online Armenian School**. The product structure follows the supplied Armenian Keyboard concept while the visual system follows the Tun translator ecosystem.

## Features

- Western Armenian and Eastern Armenian dialect selector
- Standard and phonetic on-screen keyboard layouts
- Reformed and Traditional orthography preference
- Caret-aware insertion, selection replacement, Backspace, Enter, Space, Shift and Armenian punctuation
- Phonetic physical-key mapping while the editor is focused
- Character and word counts
- Copy, Paste, Clear and browser Armenian Text-to-Speech controls
- Local Latin transliteration that updates while typing
- User-triggered English translation
- AI-powered **Check my Armenian**, **Convert dialect**, and **Ask Tun AI** actions
- Saved vocabulary stored locally in the browser
- Tun ecosystem promotion panel with all six requested destinations
- Tun promo strip, header logo treatment, favicon source, footer artwork, social links and Mailchimp community signup
- Responsive layouts for desktop, tablet, mobile and narrow mobile
- SEO metadata, robots and sitemap routes

## Requirements

- Node.js 20.9 or newer (Node 22 recommended)
- npm
- Internet access for npm packages, Google Fonts, Tun-hosted brand artwork, and AI requests
- Optional OpenAI API key for AI features

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the local URL printed by Next.js.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then configure:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.4
```

`OPENAI_API_KEY` is optional. The keyboard, transliteration, local preferences, vocabulary, clipboard tools and external Tun links continue to work without it. AI buttons return a friendly unavailable message when no key is configured.

The key is used only in `src/app/api/ai/route.ts` and is never exposed through a `NEXT_PUBLIC_` variable.

## Scripts

```bash
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
npm run verify:source
```

## Netlify deployment

The repository includes `netlify.toml` for a standard Next.js build.

1. Push the project to a Git repository.
2. Create a new Netlify site from the repository.
3. Netlify will use `npm run build`.
4. Add `OPENAI_API_KEY` and, optionally, `OPENAI_MODEL` in Netlify environment variables.
5. Point `armeniankeyboard.com` to the deployed Netlify site when ready.

No database setup or migration is required.

## Local storage

Browser persistence is implemented in `src/lib/storage.ts`.

Keys:

- `tun-keyboard-preferences` — dialect, keyboard layout, orthography and editor text
- `tun-keyboard-vocabulary` — locally saved Armenian words and transliteration

No personal data is sent to a database. Clearing browser/site storage removes these local values.

## AI architecture

The browser sends only the current action, Armenian text and selected language options to `/api/ai`. The server route validates the request, builds a task-specific instruction in `src/lib/ai-prompts.ts`, and calls the OpenAI Responses API with the server-side key.

Available actions:

- `translate` — Armenian → English
- `check` — spelling/grammar suggestions
- `convert` — Western ↔ Eastern Armenian
- `ask` — contextual learner question

The default model is `gpt-5.4`, configurable through `OPENAI_MODEL`.

## Editing keyboard mappings

Edit:

```text
src/lib/keyboard-layouts.ts
```

This file contains:

- Standard keyboard rows
- Phonetic keyboard rows
- Latin physical-key mappings
- Armenian punctuation keys

Keyboard data is intentionally isolated from the React UI so a language reviewer can correct mappings without redesigning components.

## Editing transliteration rules

Edit:

```text
src/lib/transliteration.ts
```

The implementation keeps Eastern and Western tables separate and includes position-aware behavior for Armenian `ե` and `ո`, plus the explicit `ես` / `եմ` handling requested during Tun language-tool work. These rules should remain reviewable by a Western/Eastern Armenian language specialist.

## Editing orthography behavior

Edit:

```text
src/lib/orthography.ts
```

The local transformation is deliberately conservative. It only handles the clearly reversible `և` ↔ `եւ` representation. Other Traditional/Reformed differences are lexical/context-dependent and are left to the AI helper or future linguist-approved rules rather than guessed in client code.

## Tun links and branding

Edit ecosystem URLs and brand asset sources in:

```text
src/config/brand.ts
```

The app uses the same Tun logo source and footer artwork source used by the existing Tun translator ecosystem. The `public/_redirects` file also contains optional Netlify proxy aliases for the logo and footer artwork.

## Important linguistic note

This project is structured so keyboard mapping, transliteration, orthography, and AI prompts can be independently reviewed. Do not treat unreviewed automatic dialect/orthography conversion as a replacement for a qualified Western/Eastern Armenian language reviewer.
