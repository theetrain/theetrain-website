<script>
  import '$lib/main.css'

  let { children } = $props()
</script>

<svelte:head>
  <script>
    function updateTheme({ matches }) {
      if (matches) {
        console.log('change to dark mode!')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        console.log('change to light mode!')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
    window.matchMedia('(prefers-color-scheme: dark)').matches
  </script>
</svelte:head>

<main>{@render children()}</main>

<style>
  @media (prefers-color-scheme: dark) {
    :global(.shiki),
    :global(.shiki span) {
      color: var(--shiki-dark) !important;
      background-color: var(--shiki-dark-bg) !important;
      /* Optional, if you also want font styles */
      font-style: var(--shiki-dark-font-style) !important;
      font-weight: var(--shiki-dark-font-weight) !important;
      text-decoration: var(--shiki-dark-text-decoration) !important;
    }
  }
</style>
