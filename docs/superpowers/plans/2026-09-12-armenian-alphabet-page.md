# Armenian Alphabet Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/armenian-alphabet` educational page using the client-provided article, a reduced Armenian alphabet table based on the referenced Wikipedia source, and the existing site header/footer without changing the current keyboard homepage.

**Architecture:** Implement the page as a new App Router route under `src/app/armenian-alphabet/`. Keep the long article and alphabet dataset in focused page-local modules so the route component stays readable, add page-local CSS for visual isolation, and update the sitemap only to expose the new route. The existing `Header`, `Footer`, and `/` page remain unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Vitest/source-regression tests.

**Spec:** `docs/superpowers/specs/2026-09-12-armenian-alphabet-page-design.md`

## Global Constraints

- Route must be `/armenian-alphabet`.
- Page title must be `Armenian Alphabet`.
- Reuse the existing `Header` and `Footer` unchanged.
- Do not modify the existing `/` keyboard page.
- Use the client-provided Google Doc copy without rewriting its wording.
- Keep only the client-approved table columns and remove the crossed-out Wikipedia columns.
- Preserve responsive behavior with horizontal table scrolling on small screens.
- Do not merge without explicit user approval.

---

### Task 1: Add the regression test for the new page contract

**Files:**
- Create: `armenian-keyboard/src/armenian-alphabet-page.test.tsx`
- Test: `armenian-keyboard/src/armenian-alphabet-page.test.tsx`

**Interfaces:**
- Consumes: the future route module at `src/app/armenian-alphabet/page.tsx` and alphabet dataset at `src/app/armenian-alphabet/alphabet-data.ts`.
- Produces: a failing test that defines the route/content/table contract before implementation.

- [ ] **Step 1: Write the failing test**

Create `src/armenian-alphabet-page.test.tsx` with checks that:
- importing the page module succeeds;
- metadata title is exactly `Armenian Alphabet`;
- metadata canonical is `/armenian-alphabet`;
- rendered page output includes `Header` and `Footer` components;
- rendered content includes the required major headings from the client document;
- both Vimeo IDs `780911329` and `780911379` are present;
- alphabet data contains all expected rows and includes `Ու • ու` and `և`;
- table labels include `Forms`, `Classical`, `Reformed`, `Eastern`, `Western`, `ISO 9985`;
- removed labels `Numerical value` and the crossed-out Name-pronunciation group are absent.

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd armenian-keyboard
npm test -- armenian-alphabet-page.test.tsx
```

Expected: FAIL because `/armenian-alphabet` and its data module do not exist yet.

- [ ] **Step 3: Commit the failing test**

```bash
git add armenian-keyboard/src/armenian-alphabet-page.test.tsx
git commit -m "test: define Armenian alphabet page contract"
```

---

### Task 2: Add the Armenian alphabet data model and source-backed rows

**Files:**
- Create: `armenian-keyboard/src/app/armenian-alphabet/alphabet-data.ts`
- Test: `armenian-keyboard/src/armenian-alphabet-page.test.tsx`

**Interfaces:**
- Produces:
```ts
export interface ArmenianAlphabetRow {
  forms: string;
  nameClassical: string;
  nameReformed: string;
  letterClassical: string;
  letterEastern: string;
  letterWestern: string;
  transliterationClassical: string;
  transliterationIso9985: string;
}

export const armenianAlphabetRows: ArmenianAlphabetRow[];
```

- [ ] **Step 1: Add the data module**

Populate `armenianAlphabetRows` from the referenced Armenian alphabet table, keeping only these fields:
- Forms
- Name Classical
- Name Reformed
- Letter pronunciation Classical
- Letter pronunciation Eastern
- Letter pronunciation Western
- Transliteration Classical
- Transliteration ISO 9985

Use `—` for source cells that are blank/not applicable. Include the full source table row set, including `Ու • ու` and `և` as represented by the source.

- [ ] **Step 2: Run the focused test**

```bash
cd armenian-keyboard
npm test -- armenian-alphabet-page.test.tsx
```

Expected: still FAIL because the route/page is not implemented yet, but alphabet-data assertions should no longer be the failing part.

- [ ] **Step 3: Commit**

```bash
git add armenian-keyboard/src/app/armenian-alphabet/alphabet-data.ts armenian-keyboard/src/armenian-alphabet-page.test.tsx
git commit -m "feat: add Armenian alphabet reference data"
```

---

### Task 3: Build the page content and alphabet table

**Files:**
- Create: `armenian-keyboard/src/app/armenian-alphabet/page.tsx`
- Create: `armenian-keyboard/src/app/armenian-alphabet/ArmenianAlphabetTable.tsx`
- Create: `armenian-keyboard/src/app/armenian-alphabet/page.module.css`
- Test: `armenian-keyboard/src/armenian-alphabet-page.test.tsx`

**Interfaces:**
- `ArmenianAlphabetTable` consumes `armenianAlphabetRows` and renders the approved eight-column table.
- `page.tsx` exports page metadata and default route component.

- [ ] **Step 1: Add the table component**

Create `ArmenianAlphabetTable.tsx` with a horizontally scrollable wrapper and a semantic `<table>`.

Use a two-row header structure:
- `Forms`
- `Name` → `Classical`, `Reformed`
- `Letter pronunciation` → `Classical`, `Eastern`, `Western`
- `Transliteration` → `Classical`, `ISO 9985`

Do not render the removed Name-pronunciation or Numerical value columns.

- [ ] **Step 2: Add the page route and metadata**

Create `page.tsx` with:
```ts
export const metadata: Metadata = {
  title: "Armenian Alphabet",
  description: "Learn the Armenian alphabet, compare Eastern and Western Armenian pronunciation, and use the free Armenian keyboard online.",
  alternates: { canonical: "/armenian-alphabet" },
};
```

Render, in order:
- existing `Header`;
- the client-provided article content and links;
- `ArmenianAlphabetTable` in the `Armenian Alphabet Chart` section;
- two responsive Vimeo iframes using IDs `780911329` and `780911379`;
- existing `Footer`.

Use same-site CTAs to `https://armeniankeyboard.com` and external Tun links exactly as supplied in the client document.

- [ ] **Step 3: Add isolated page styling**

Create `page.module.css` for only this route. Style:
- centered article container;
- Tun red eyebrow/CTA accents;
- dark headings and muted gray paragraphs;
- white content cards where useful;
- responsive 16:9 video wrappers;
- alphabet table with subtle borders, strong header hierarchy, and horizontal overflow on small screens;
- mobile typography and spacing.

Do not edit `globals.css`, `Header.tsx`, or `Footer.tsx` unless a test proves an unavoidable route-specific issue. If that happens, stop and request approval before broadening scope.

- [ ] **Step 4: Run the focused test and make it green**

```bash
cd armenian-keyboard
npm test -- armenian-alphabet-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add armenian-keyboard/src/app/armenian-alphabet armenian-keyboard/src/armenian-alphabet-page.test.tsx
git commit -m "feat: add Armenian alphabet page"
```

---

### Task 4: Add the new route to the sitemap

**Files:**
- Modify: `armenian-keyboard/src/app/sitemap.ts`
- Test: `armenian-keyboard/src/armenian-alphabet-page.test.tsx`

**Interfaces:**
- Existing sitemap default export remains compatible with Next.js metadata routes.
- Adds `https://armeniankeyboard.com/armenian-alphabet` alongside the existing homepage URL.

- [ ] **Step 1: Extend the regression test**

Add an assertion that the sitemap output contains both:
- `https://armeniankeyboard.com/`
- `https://armeniankeyboard.com/armenian-alphabet`

- [ ] **Step 2: Run test to verify it fails**

```bash
cd armenian-keyboard
npm test -- armenian-alphabet-page.test.tsx
```

Expected: FAIL because the new sitemap URL is missing.

- [ ] **Step 3: Update `sitemap.ts`**

Keep the current homepage entry and append the alphabet page entry with an appropriate `changeFrequency` and `priority` lower than or equal to the homepage.

- [ ] **Step 4: Run test to verify it passes**

```bash
cd armenian-keyboard
npm test -- armenian-alphabet-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add armenian-keyboard/src/app/sitemap.ts armenian-keyboard/src/armenian-alphabet-page.test.tsx
git commit -m "feat: add alphabet page to sitemap"
```

---

### Task 5: Verify the full project and confirm no homepage/header/footer regression

**Files:**
- Verify only; no intended source changes.

**Interfaces:**
- Confirms new route integrates with existing project without changing the keyboard homepage or shared shell.

- [ ] **Step 1: Confirm protected files are unchanged**

Run:
```bash
git diff main...HEAD -- armenian-keyboard/src/app/page.tsx armenian-keyboard/src/components/Header.tsx armenian-keyboard/src/components/Footer.tsx
```

Expected: no diff.

- [ ] **Step 2: Run tests**

```bash
cd armenian-keyboard
npm test
```

Expected: PASS with zero failing tests.

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: exit 0.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Expected: exit 0.

- [ ] **Step 5: Run source verification**

```bash
npm run verify:source
```

Expected: exit 0.

- [ ] **Step 6: Run production build**

```bash
npm run build
```

Expected: exit 0 and route output includes `/armenian-alphabet`.

- [ ] **Step 7: Review final diff**

Run:
```bash
git diff --stat main...HEAD
git diff main...HEAD
```

Confirm only the approved new page, its page-local data/styles/tests, sitemap change, and planning docs are present.

- [ ] **Step 8: Open Draft PR**

Create a Draft PR from `feature/armenian-alphabet-page` to `main` summarizing:
- new `/armenian-alphabet` route;
- client Google Doc content;
- reduced sourced alphabet table;
- responsive Vimeo embeds;
- sitemap/SEO metadata;
- explicit confirmation that existing homepage/header/footer are untouched;
- fresh verification results.
