## Summary

<!-- What changes and why. Link the issue if there is one (Closes #123). -->

## Area

- [ ] Website (`site/`)
- [ ] Pages workflow or update feed (`.github/`, `appcast.xml`)
- [ ] Repository docs

## Test plan

- [ ] `npm test` in `site/`
- [ ] `npm run build` in `site/` (includes the dist checks)
- [ ] `npm run audit` in `site/` for visual or interactive changes (axe, overflow at 360/768/1440 px)
- [ ] Text changed in both `site/src/i18n/en.ts` and `pt.ts`

## Update feed

- [ ] This PR does not touch `appcast.xml` or how it is published, **or** it explains below how the feed stays at `https://hive.zeeplabs.com.br/appcast.xml`
