import { renderToString } from 'react-dom/server'
import { App } from './App'
import { routes } from './lib/routes'
import { buildHead } from './lib/seo'
import type { Route } from './lib/routes'

export { routes }

export function render(route: Route) {
  return {
    html: renderToString(<App page={route.page} lang={route.lang} />),
    head: buildHead(route),
  }
}
