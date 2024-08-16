import { dev } from '$app/environment'
import { base } from '$app/paths'

/**
 * @param {string} href
 */
export function prependBase(href) {
  let resolvedPath = href

  if (!dev && !(href.startsWith('http') || href.startsWith('//'))) {
    // Prepend base url to relative path
    resolvedPath = new URL(href, base).pathname
  }

  return resolvedPath
}
