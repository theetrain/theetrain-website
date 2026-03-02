import type { ServerLoad } from '@sveltejs/kit'
import { buildStaticBreadcrumbs } from '$lib/utils.server'

export const prerender = true

export const load: ServerLoad = ({ url }) => {
  const breadcrumbs = buildStaticBreadcrumbs(url)

  return { breadcrumbs }
}
