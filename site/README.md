# Hive website

Static site for [hive.zeeplabs.com.br](https://hive.zeeplabs.com.br), in English (`/`, the default) and Portuguese (`/pt/`).
Visitors whose first browser language is Portuguese are sent to `/pt/` by a small script in the English pages' `<head>`,
unless they picked a language in the menu (saved in `localStorage`).
React + Vite, pre-rendered to plain HTML at build time and hydrated only for the interactive parts.

## Commands

```bash
npm ci
npm run dev       # local dev server
npm test          # unit tests (release parsing, i18n parity, SEO head)
npm run build     # release data + type check + client/SSR build + prerender + dist checks → dist/site
npm run preview   # serve dist/site on http://localhost:4173
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run audit
                  # axe (WCAG 2.2 AA), horizontal overflow at 360/768/1440 px, console errors, screenshots
```

## How it is published

`.github/workflows/pages.yml` builds the site on every push to `main` and every release, copies the repository's
`appcast.xml` and `CNAME` into the artifact (the update feed must keep its URL), deploys to GitHub
Pages and then checks that the feed is still served. Pull requests only build and test.

## Content and data

- Text lives in `src/i18n/pt.ts` and `src/i18n/en.ts`; both must keep the same structure (a test checks it).
  Text between backticks renders as code.
- The version, date, size, download link and SHA-256 come from the latest GitHub Release at build time
  (`scripts/fetch-release.mjs`). Without network the build uses the committed snapshot in `src/data/release.json`.
- After a release, update `download.whatsNew` in both dictionaries; the build warns while it describes an older
  version.
- Social images: `CHROME_PATH=… node scripts/make-og.mjs` regenerates `public/og-pt.png` and `public/og-en.png`.

## Analytics and the cookie box

The site can load Google Tag Manager and Google Analytics, **only after the visitor accepts**
the cookie box (the choice is saved in `localStorage` as `hive-consent`; the footer link "Cookie preferences"
reopens it). Each tool turns on only if its ID is set at build time (see `.env.example`; in production they are
repository variables read by `.github/workflows/pages.yml`). With no ID set there is no cookie box and nothing
loads. Google Search Console is verified with `VITE_GSC_VERIFICATION` (HTML tag) or by DNS.

Keep the privacy policy (`legal.privacy` in the dictionaries) in line with the tools actually enabled. Production uses only
GTM, with the GA4 tag (`G-ND9D1NXMBS`, no user-provided data) inside the container; leave `VITE_GA_ID` empty, or visits are
counted twice. There is no Firebase SDK on the site.
