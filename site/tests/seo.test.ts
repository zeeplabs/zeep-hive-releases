import { describe, expect, it } from 'vitest'
import { buildHead } from '../src/lib/seo'
import { routes } from '../src/lib/routes'

const route = (path: string) => routes.find((r) => r.path === path)!

describe('buildHead', () => {
  it('home EN na raiz: canonical, hreflang de ida e volta e x-default em inglês', () => {
    const head = buildHead(route('/'))
    expect(head).toContain('<link rel="canonical" href="https://hive.zeeplabs.com.br/">')
    expect(head).toContain('hreflang="en" href="https://hive.zeeplabs.com.br/"')
    expect(head).toContain('hreflang="pt-BR" href="https://hive.zeeplabs.com.br/pt/"')
    expect(head).toContain('hreflang="x-default" href="https://hive.zeeplabs.com.br/"')
    expect(head).toContain('"@type":"FAQPage"')
  })

  it('download PT aponta as alternativas do download, não da home', () => {
    const head = buildHead(route('/pt/download/'))
    expect(head).toContain('hreflang="en" href="https://hive.zeeplabs.com.br/download/"')
    expect(head).toContain('"@type":"BreadcrumbList"')
    expect(head).toContain('og-pt.png')
  })

  it('só as páginas em inglês redirecionam por idioma, e o 404 nunca', () => {
    expect(buildHead(route('/'))).toContain("location.replace('/pt'")
    expect(buildHead(route('/download/'))).toContain("location.replace('/pt'")
    expect(buildHead(route('/pt/'))).not.toContain('location.replace')
    expect(buildHead(route('/404.html'))).not.toContain('location.replace')
  })

  it('404 não é indexado e não tem canonical', () => {
    const head = buildHead(route('/404.html'))
    expect(head).toContain('noindex')
    expect(head).not.toContain('canonical')
  })

  it('JSON-LD não deixa fechar a tag script', () => {
    for (const r of routes) {
      for (const m of buildHead(r).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        expect(m[1]).not.toContain('<')
        expect(() => JSON.parse(m[1])).not.toThrow()
      }
    }
  })
})
