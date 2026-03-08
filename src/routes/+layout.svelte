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
  <meta
    name="description"
    content="Enrico Sacchetti: software architect based in Ontario, Canada.
Specializing in front end web development, inclusive design, and design systems."
  />
  <meta property="og:title" content={title} />
  <script>
    function updateTheme({ matches }) {
      if (matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
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
