<script module lang="ts">
  function isExternal(href: string): boolean {
    if ('parse' in URL === false) return false

    return !!URL.parse(href)
  }
</script>

<script lang="ts">
  import { type Snippet } from 'svelte'
  let { children, href, ...rest }: { children: Snippet, href: string } = $props()


  const linkAttributes = $derived({ href, rel: isExternal(href) ? 'external' : undefined})
</script>

<a {...rest} {...linkAttributes}>{@render children()}</a>
