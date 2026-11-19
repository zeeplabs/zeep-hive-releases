import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import type { Lang, PageId } from './i18n/types'
import './styles/fonts.css'
import './styles/site.css'

const root = document.getElementById('root')!
hydrateRoot(root, <App page={root.dataset.page as PageId} lang={root.dataset.lang as Lang} />)
