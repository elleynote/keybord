# Armenian Alphabet Page Design

## Goal
Add a new public `Armenian Alphabet` page to ArmenianKeyboard.com without changing the existing keyboard page, header, footer, or their visual design.

## Route and SEO
- Route: `/armenian-alphabet`
- Browser/page title: `Armenian Alphabet`
- Use page-level Next.js metadata with a canonical URL of `/armenian-alphabet`.
- Add the new route to `src/app/sitemap.ts` while keeping the existing homepage entry.

## Shared shell
- Reuse the existing `Header` and `Footer` components exactly as they exist on `main`.
- Do not modify the existing `/` keyboard page.
- Use the existing Nunito and Noto Sans Armenian fonts and current red/white Tun visual language.

## Content source
Use the client-provided Google Doc `Armenian Alphabet - Page Content` as the source of the article copy, headings, calls to action, FAQ copy, and Vimeo embeds.

Document source:
`https://docs.google.com/document/d/1JW6_05IxiefXWTzk-SHyfUiIHiMQ5A46TfBwc_kT1F8/edit?usp=sharing`

Preserve the client's wording rather than rewriting the supplied article copy.

The page sections, in document order, are:
1. `Armenian Alphabet: Letters, Pronunciation & Online Keyboard`
2. Intro paragraphs and `Start typing with the Armenian Keyboard →`
3. `The Armenian Alphabet`
4. `Armenian Alphabet Chart`
5. `Eastern and Western Armenian Alphabet Pronunciation`
6. Eastern pronunciation Vimeo video `780911329`
7. Western pronunciation Vimeo video `780911379`
8. `How Many Letters Are in the Armenian Alphabet?`
9. `What Does the Armenian Alphabet Look Like?`
10. `What Is the Letter A in Armenian?`
11. `Eastern Armenian Alphabet`
12. `Eastern vs Western Armenian Letters`
13. `English to Armenian Alphabet`
14. `How to Type Armenian Online`
15. `Armenian Keyboard for Beginners`
16. `Armenian Script and the Armenian Written Language`
17. `Learn Armenian Lettering by Typing`
18. `Frequently Asked Questions About the Armenian Alphabet`
19. `Learn the Armenian Alphabet by Using It`
20. Final `Start Typing Armenian Online →` CTA.

## Alphabet table
Use the Armenian alphabet table structure and values from:
`https://en.wikipedia.org/wiki/Armenian_alphabet`

Follow the client's marked screenshot, not the simplified sample table in the Google Doc.

Keep these columns:
- Forms
- Name — Classical
- Name — Reformed
- Letter pronunciation — Classical
- Letter pronunciation — Eastern
- Letter pronunciation — Western
- Transliteration — Classical
- Transliteration — ISO 9985

Remove these Wikipedia columns entirely:
- Name pronunciation — Classical
- Name pronunciation — Eastern
- Name pronunciation — Western
- Numerical value

Include the full alphabet rows represented by the source table, including `Ու • ու` and `և` where the Wikipedia table treats them as entries. Preserve empty/not-applicable values as `—` rather than inventing values.

The table must be responsive: desktop keeps the full table; small screens get horizontal scrolling rather than squeezed or hidden columns.

## Links
Use the client's links from the Google Doc:
- Keyboard CTAs: `https://armeniankeyboard.com`
- Tun Online Armenian School: `https://tunapp.com`
- Eastern Armenian and Western Armenian learning links: `https://tunapp.com/get-started/`

External links open safely in a new tab. Same-site keyboard links may use normal navigation.

## Video embeds
Embed the two Vimeo videos responsively with 16:9 aspect ratio:
- Eastern Armenian: `https://player.vimeo.com/video/780911329?badge=0&autopause=0&player_id=0&app_id=58479`
- Western Armenian: `https://player.vimeo.com/video/780911379?badge=0&autopause=0&player_id=0&app_id=58479`

Do not load duplicate Vimeo player scripts; plain responsive iframes are sufficient because the videos are standard embeds and do not require custom player API behavior.

## Styling
- Create page-specific styles so the existing keyboard UI does not regress.
- Keep the content centered inside the same overall site width family as the current keyboard page.
- Use white content surfaces, subtle borders/shadows, black/dark headings, muted gray body copy, and the existing Tun red for CTAs and accents.
- Use clear heading hierarchy and generous vertical spacing for a long educational page.
- The alphabet table should visually match the site, not copy Wikipedia's gray styling literally.

## Testing and safety
- Add a focused regression test that verifies the new route, metadata/canonical, shared Header/Footer, both Vimeo IDs, required article headings, full table data count, kept column labels, and absence of removed column labels.
- Verify the existing homepage source remains unchanged.
- Run `npm test`, `npm run typecheck`, `npm run lint`, `npm run verify:source`, and `npm run build` before creating the final Draft PR.
- Work only on a feature branch and do not merge without explicit user approval.
