<script>
  import { page } from '$app/stores'
  import A from '$lib/A.svelte'
  import '$lib/main.css'

  let { children, data } = $props()

  let title = $derived.by(() => {
    if ($page.data.title) {
      return `${$page.data.title} - theetrain.ca`
    } else {
      return 'theetrain.ca'
    }
  })

  /**
   * @type {{ title: string, href: string }[] | null}
   */
  let breadcrumbs = $derived.by(() => {
    if ($page.url.pathname !== '/') {
      return [...data.titles, { title: $page.data.title, href: '#main' }]
    } else {
      return null
    }
  })
</script>

<svelte:head>
  <title>{title}</title>
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

<header>
  <nav class="s-container" aria-label="top navigation">
    <A href="/" id="site-title">Enrico Sacchetti</A>
    <menu>
      <A href="/blog">Blog</A>
      <A href="/about">About me</A>
      <A href="/portfolio">Portfolio</A>
    </menu>
  </nav>
</header>

{#if breadcrumbs}
  <nav class="s-container" aria-label="breadcrumb">
    <ol>
      {#each breadcrumbs as { title, href }}
        <li><A {href}>{title}</A></li>
      {/each}
    </ol>
  </nav>
{/if}

<main class="s-container">{@render children()}</main>

<footer>
  <div class="s-container">
    Enrico Sacchetti
    <nav aria-label="footer navigation">
      <menu>
        <A href="/">Home</A>
        <A href="/blog">Blog</A>
        <A href="/about">About me</A>
        <A href="/portfolio">Portfolio</A>
      </menu>
    </nav>
  </div>
</footer>
