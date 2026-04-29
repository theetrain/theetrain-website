import type { Breadcrumb } from './types'

const staticRoutes = new Map<string, Breadcrumb>([
  ['', { title: 'Home', href: '/' }],
  ['blog', { title: 'Blog', href: '/blog' }],
  ['license', { title: 'License', href: '/license' }]
])

/**
 * Build breadcrumb array from static routes.
 * Does not account for non-tail dynamic routes.
 *
 * @param url Current URL
 * @param title Current route's page title
 */
export function buildStaticBreadcrumbs(url: URL): Breadcrumb[] {
  // On home page, no need for breadcrumbs
  if (url.pathname === '/') return []

  const segments = url.pathname.split('/')
  const breadcrumbs: Breadcrumb[] = []

  for (const segment of segments) {
    // Iterate through non-static routes
    if (!staticRoutes.has(segment)) continue

    // Return static route
    const staticBreadcrumb = staticRoutes.get(segment)
    if (!staticBreadcrumb) continue
    breadcrumbs.push(staticBreadcrumb)
  }

  return breadcrumbs
} /** Breadcrumbs for static paths */
