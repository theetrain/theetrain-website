import type { ServerLoad } from '@sveltejs/kit'
import { buildStaticBreadcrumbs, staticRoutes } from '$lib/utils.server'

export const prerender = true

export const load: ServerLoad = ({ url }) => {
  const breadcrumbs = buildStaticBreadcrumbs(url)
  const staticTitle = Array.from(staticRoutes).find((el) => el[1].href === url.pathname)?.[1]?.title

  return { breadcrumbs, staticTitle }
}
