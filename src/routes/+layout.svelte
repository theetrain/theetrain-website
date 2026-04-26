<script lang="ts">
  import { page } from '$app/state'
  import Breadcrumbs from '$lib/Breadcrumbs.svelte'
  import '$lib/main.css'
  import logo from '$lib/assets/logo.png?url'
  import type { HREF } from '$lib/utils'

  let { children, data } = $props()

  let title = $derived.by(() => {
    if (page.data.title) {
      return `${page.data.title} - theetrain.ca`
    } else {
      return 'theetrain.ca'
    }
  })

  /** If given path is the current page, use a hash link */
  function navLink(path: HREF) {
    if (path === page.url.pathname)
      return { href: '#main' as const, 'aria-current': 'page' as const }

    return { href: path }
  }

  /** It is CURRENT YEAR */
  let currentYear = new Date().getFullYear()
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="icon" href={logo} />
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
    <a {...navLink('/')} id="site-title"
      ><img id="logo" src={logo} alt="Cogwheel logo" width="512" height="512" />
      Enrico Sacchetti</a
    >
    <menu>
      <a {...navLink('/blog')}>Blog</a>
    </menu>
  </nav>
</header>

<Breadcrumbs breadcrumbs={data.breadcrumbs} />

<main class="s-container" id="main">{@render children()}</main>

<footer class="responsive-row">
  <div class="s-container">
    Enrico Sacchetti
    <nav aria-label="footer navigation">
      <menu>
        <a {...navLink('/')}>Home</a>
        <a {...navLink('/blog')}>Blog</a>
        <a {...navLink('/license')}>License</a>
      </menu>
    </nav>
  </div>
  <div class="s-container">
    <p>
      © {currentYear} Enrico Sacchetti. Code is MIT; content and graphics is CC BY-NC-ND 4.0. except when
      specified.
      <br />See
      <a href="/license">license</a> for details.
    </p>
    <p>
      Source: <a href="https://github.com/theetrain/theetrain-website"
        >github.com/theetrain/theetrain-website</a
      >
    </p>
  </div>
</footer>

<style>
  #site-title {
    font-size: 1.5rem;
    text-decoration: none;
    line-height: 1.2;
    padding: 8px 0;
  }
  #logo {
    height: 1lh;
    width: auto;
    vertical-align: top;
  }
</style>
