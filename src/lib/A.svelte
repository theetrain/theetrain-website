<script>
  import { prependBase } from './utils'

  /**
   * @typedef {object} Props
   * @property {string} href
   * @property {import('svelte').Snippet} children
   */

  /** @type {Props & import('svelte/elements').HTMLAnchorAttributes} */
  let { href, children, ...rest } = $props()

  let resolvedRoute = $state(prependBase(href))
</script>

<!-- @component Special anchor element that prepends the base path. -->
<a {...rest} href={resolvedRoute}>{@render children()}</a>
