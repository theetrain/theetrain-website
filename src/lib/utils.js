import { base } from '$app/paths'

/**
 * Prepend base URL to root-relative links.
 * @param {string} href
 */
export function prependBase(href) {
  let inputPath = href

  console.log({ base })

  // Remove leading slash from urlPath if present
  if (href.startsWith('/')) {
    inputPath = href.slice(1)
  } else {
    return href
  }

  // Concatenate base and urlPath with a single slash between them
  return `${base}/${inputPath}`
}
