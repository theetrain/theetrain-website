import type { Pathname } from '$app/types'
import type { Breadcrumb } from './types'

const staticRoutes = new Map<string, Breadcrumb>([
  ['', { title: 'Home', href: '/' }],
  ['blog', { title: 'Blog', href: '/blog' }]
])

/**
 * Build breadcrumb array from static routes.
 * Does not account for non-tail dynamic routes.
 *
 * @param url Current URL
 * @param title Current route's page title
 */
export function buildStaticBreadcrumbs(
  url: URL
): Breadcrumb[] {
  // On home page, no need for breadcrumbs
  if (url.pathname === '/') return []

  const segments = url.pathname.split('/')
  const breadcrumbs: Breadcrumb[] = []

  for (const segment of segments) {
    if (!staticRoutes.has(segment)) continue
    breadcrumbs.push(staticRoutes.get(segment))
  }

  return breadcrumbs
} /** Breadcrumbs for static paths */
