export type Lang = 'pt' | 'en'
export type PageId = 'home' | 'download' | 'privacy' | 'terms' | 'notFound'

export interface Point {
  b: string
  t: string
}

export interface LegalDoc {
  kicker: string
  title: string
  updated: string
  intro: string
  sections: { title: string; body: string[]; list?: string[] }[]
}

export interface Dict {
  htmlLang: string
  ogLocale: string
  locale: string
  orgs: [string, string, string]
  meta: Record<PageId, { title: string; description: string }>
  nav: {
    skip: string
    main: string
    live: string
    identity: string
    features: string
    delegation: string
    download: string
    menu: string
    langLabel: string
    langShort: string
  }
  motion: { pause: string; play: string }
  hero: {
    kickerNew: string
    kickerText: string
    line1: string[]
    line2: string[]
    lead: string
    ctaDownload: string
    ctaLive: string
    agentsLabel: string
  }
  live: {
    title: string
    lead: string
    demoLabel: string
    demoSummary: string
    toastTitle: string
    toastBody: string
    idle: string
    legendRun: string
    legendWait: string
    legendDone: string
    linesA: string[]
    linesB: string[]
  }
  identity: {
    title: string
    lead: string
    tabsLabel: string
    sessionOf: string
    termBar: string
    scrubbed: string
    emptyDefault: string
    points: Point[]
  }
  features: { title: string; lead: string; beta: string; items: { title: string; body: string }[] }
  delegation: {
    kicker: string
    title: string
    lead: string
    betaNote: string
    diagramLabel: string
    agentA: string
    agentASub: string
    agentB: string
    agentBSub: string
    gateTitle: string
    gateSub: string
    autoLabel: string
    orgLabel: string
    items: { title: string; body: string }[]
  }
  cookies: { title: string; body: string; policy: string; accept: string; reject: string; manage: string }
  legal: { updatedLabel: string; privacy: LegalDoc; terms: LegalDoc }
  native: { title: string; lead: string; stack: string[] }
  faq: { title: string; items: { q: string; a: string }[] }
  final: { title: string; cta: string; req: string }
  footer: { product: string; nav: string; download: string; notes: string; issue: string; privacy: string; terms: string; home: string; newTab: string }
  download: {
    kicker: string
    words: string[]
    lead: string
    cta: string
    req: string
    signed: string
    whatsNewLink: string
    previous: string
    verifyLink: string
    dmgLabel: string
    apps: string
    stepsTitle: string
    steps: { title: string; body: string }[]
    whatsNew: { version: string; title: string; lead: string; more: string; points: Point[] }
    reqTitle: string
    reqLead: string
    reqItems: { tag: 'must' | 'optional' | 'recommended'; title: string; body: string }[]
    reqTags: Record<'must' | 'optional' | 'recommended', string>
    verifyTitle: string
    verifyLead: string
    copy: string
    copied: string
    copyLabel: string
    secretsNote: string
    updatesTitle: string
    updates: Point[]
    issueTitle: string
    issueCta: string
    issueSub: string
  }
  notFound: { title: string; body: string; home: string; download: string }
}
