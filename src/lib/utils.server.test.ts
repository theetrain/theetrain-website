import { describe, it, expect } from 'vitest'
import { buildStaticBreadcrumbs } from './utils.server'

describe('buildStaticBreadcrumbs', () => {
  it('returns no breadcrumbs on home route', () => {
    expect(buildStaticBreadcrumbs(new URL('https://example.com'))).toEqual([])
  })
  it('returns breadcrumbs on a static route', () => {
    expect(buildStaticBreadcrumbs(new URL('https://example.com/blog'))).toEqual([
      { title: 'Home', href: '/' },
      { title: 'Blog', href: '/blog' }
    ])
  })
  it('ignores dynamic tail', () => {
    expect(buildStaticBreadcrumbs(new URL('https://example.com/blog/hello-world'))).toEqual([
      { title: 'Home', href: '/' },
      { title: 'Blog', href: '/blog' }
    ])
  })
})
