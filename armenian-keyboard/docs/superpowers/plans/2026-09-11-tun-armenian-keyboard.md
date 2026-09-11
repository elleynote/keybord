# Tun Armenian Keyboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive Tun-branded Armenian Keyboard web app with local keyboard utilities, optional AI helpers, promotional panels, footer, tests, and Netlify-ready packaging.

**Architecture:** Next.js App Router + TypeScript. Core features run client-side with localStorage; optional AI actions use one secure server route. Branding and ecosystem URLs are centralized and the footer/header mirror the Tun translator patterns.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules/global CSS, Vitest, React Testing Library, Netlify.

**Spec:** `docs/superpowers/specs/2026-09-11-tun-armenian-keyboard-design.md`

## Global Constraints
- No database, authentication, billing, Supabase, Firebase, Prisma, PostgreSQL, or MongoDB.
- Use Nunito and Noto Sans Armenian.
- Primary red `#DB182B`, hover red `#BF1324`, page background `#F8F8F8`, ink `#171717`, border `#E8E5E2`.
- Default dialect Western Armenian; default keyboard layout Standard; default orthography Reformed.
- AI secrets remain server-side in `OPENAI_API_KEY`.
- All six client promotional/help requirements must be visible.
- Final project must pass tests, lint and production build before ZIP creation.

---

### Task 1: Project shell and brand system

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `netlify.toml`, `.env.example`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/config/brand.ts`, `src/components/Header.tsx`, `src/components/Footer.tsx`
- Test: `src/brand-shell.test.tsx`

**Interfaces:**
- Produces `brand` config, reusable `Header` and `Footer`.

- [ ] Write a failing test asserting promo strip, Tun links, footer copyright and Mailchimp fields.
- [ ] Run the focused test and confirm RED.
- [ ] Implement project shell, brand config, header/footer and metadata.
- [ ] Run focused test and confirm GREEN.
- [ ] Commit.

### Task 2: Keyboard core logic

**Files:**
- Create: `src/lib/keyboard-layouts.ts`, `src/lib/editor-text.ts`, `src/lib/transliteration.ts`, `src/lib/orthography.ts`
- Test: `src/lib/editor-text.test.ts`, `src/lib/transliteration.test.ts`

**Interfaces:**
- Produces `applyEditorKey(value,start,end,key,shift)`, `getKeyboardRows(layout,dialect,shift)`, `transliterate(text,dialect)`.

- [ ] Write failing caret insertion, selection replacement, Backspace, count and transliteration tests.
- [ ] Run focused tests and confirm RED.
- [ ] Implement minimal pure functions and keyboard mapping data.
- [ ] Run focused tests and confirm GREEN.
- [ ] Commit.

### Task 3: Persistence and vocabulary

**Files:**
- Create: `src/lib/storage.ts`, `src/types/keyboard.ts`
- Test: `src/lib/storage.test.ts`

**Interfaces:**
- Produces `loadPreferences`, `savePreferences`, `loadVocabulary`, `saveVocabulary` and shared types.

- [ ] Write failing storage serialization tests with a mock storage object.
- [ ] Run focused tests and confirm RED.
- [ ] Implement SSR-safe storage utilities.
- [ ] Run focused tests and confirm GREEN.
- [ ] Commit.

### Task 4: Main keyboard experience

**Files:**
- Create: `src/components/KeyboardApp.tsx`, `src/components/OnScreenKeyboard.tsx`, `src/components/SegmentedControl.tsx`, `src/components/VocabularyPanel.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`
- Test: `src/components/KeyboardApp.test.tsx`

**Interfaces:**
- Consumes keyboard logic and storage utilities.
- Produces the full interactive editor/keyboard experience.

- [ ] Write failing UI tests for controls, typing, copy labels, counters and saved vocabulary.
- [ ] Run focused test and confirm RED.
- [ ] Implement responsive keyboard experience and local status messaging.
- [ ] Run focused test and confirm GREEN.
- [ ] Commit.

### Task 5: Optional AI actions and promotional sidebar

**Files:**
- Create: `src/app/api/ai/route.ts`, `src/lib/ai-prompts.ts`, `src/components/AITools.tsx`, `src/components/PromoSidebar.tsx`
- Modify: `src/components/KeyboardApp.tsx`, `src/app/globals.css`
- Test: `src/promo-links.test.tsx`, `src/lib/ai-prompts.test.ts`

**Interfaces:**
- Produces `/api/ai` action API and all six promotional/help destinations.

- [ ] Write failing tests for action prompts and exact required links/copy.
- [ ] Run focused tests and confirm RED.
- [ ] Implement secure AI route, modal/results UI and promotional sidebar.
- [ ] Run focused tests and confirm GREEN.
- [ ] Commit.

### Task 6: Final QA, docs and ZIP

**Files:**
- Create: `README.md`
- Modify: any file only as required by verification findings.

**Interfaces:**
- Produces a ready-to-run ZIP artifact.

- [ ] Run `npm test` and fix any failures.
- [ ] Run `npm run lint` and fix any failures.
- [ ] Run `npm run build` and fix any failures.
- [ ] Inspect responsive-critical CSS and asset paths.
- [ ] Write README with setup, env, deployment, storage and rule-editing guidance.
- [ ] Remove `.next`, `node_modules` and transient files from packaging.
- [ ] Create `/mnt/data/armenian-keyboard.zip` containing the complete source project.
