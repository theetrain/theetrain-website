<script>
  import { page } from '$app/state'
  import Breadcrumbs from '$lib/Breadcrumbs.svelte'
  import '$lib/main.css'

  let { children, data } = $props()

  let title = $derived.by(() => {
    if (page.data.title) {
      return `${page.data.title} - theetrain.ca`
    } else {
      return 'theetrain.ca'
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
    <a href="/" id="site-title">Enrico Sacchetti</a>
    <menu>
      <a href="/blog">Blog</a>
      <a href="/about">About me</a>
    </menu>
  </nav>
</header>

<Breadcrumbs breadcrumbs={data.breadcrumbs} />

<main class="s-container" id="main">{@render children()}</main>

<footer>
  <div class="s-container">
    Enrico Sacchetti
    <nav aria-label="footer navigation">
      <menu>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
        <a href="/about">About me</a>
      </menu>
    </nav>
  </div>
</footer>
