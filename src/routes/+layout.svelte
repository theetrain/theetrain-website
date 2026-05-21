<script lang="ts">
  import { page } from '$app/state'

  import { CANONICAL, type HREF } from '$lib/utils'

  import Breadcrumbs from './Breadcrumbs.svelte'
  import FontToggle from './FontToggle.svelte'

  import '$lib/main.css'
  import logo from '$lib/assets/logo.png?url'
  import ThemeToggle from './ThemeToggle.svelte'
  import Disclosure from '$lib/components/Disclosure.svelte'

  let { children, data } = $props()

  let title = $derived.by(() => {
    if (page.data.title) {
      return `${page.data.title} - theetrain.ca`
    } else if (data.staticTitle) {
      return `${data.staticTitle} - theetrain.ca`
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
  <link rel="canonical" href={CANONICAL} />
  <meta
    name="description"
    content="Enrico Sacchetti: software architect based in Ontario, Canada.
Specializing in front end web development, inclusive design, and design systems."
  />
  <meta property="og:title" content={title} />
</svelte:head>

<div id="settings">
  <div class="s-container responsive-row align-center">
    <a id="skip-link" href="#main">Skip to content</a>
    <div class="responsive-settings">
      <div class="widget">
        <Disclosure label="Site settings">
          <FontToggle />
          <ThemeToggle />
        </Disclosure>
      </div>

      <div class="inline">
        <FontToggle />
        <ThemeToggle />
      </div>
    </div>
  </div>
</div>
<header>
  <nav class="s-container" aria-label="top navigation">
    <span id="site-title">
      <img id="logo" src={logo} alt="Cogwheel logo" width="512" height="512" />
      <a {...navLink('/')}> Enrico Sacchetti</a>
    </span>
    <menu>
      <li><a {...navLink('/blog')}>Blog</a></li>
    </menu>
  </nav>
</header>

<Breadcrumbs breadcrumbs={data.breadcrumbs} />

<main class="s-container" id="main">{@render children()}</main>

<footer class="responsive-row">
  <div class="s-container grid">
    <div>
      <span id="footer-site-nav">Enrico Sacchetti, site navigation</span>
      <nav aria-labelledby="footer-site-nav">
        <menu>
          <li><a {...navLink('/')}>Home</a></li>
          <li><a {...navLink('/blog')}>Blog</a></li>
          <li><a {...navLink('/license')}>License</a></li>
        </menu>
      </nav>
    </div>
    <div>
      <span id="footer-social-links">Social links</span>
      <nav aria-labelledby="footer-social-links">
        <menu>
          <li><a rel="external" href="https://bsky.app/profile/theetrain.ca">Bluesky</a></li>
          <li><a rel="external" href="https://github.com/theetrain">GitHub</a></li>
          <li><a rel="external" href="https://ca.linkedin.com/in/etrain">LinkedIn</a></li>
          <li>
            <a
              rel="external"
              href="https://youtube.com/playlist?list=PL8bMgX1kyZTiLCyvf8vF13sdnR4fhNl6v">YouTube</a
            >
          </li>
        </menu>
      </nav>
    </div>
    <div role="group" aria-labelledby="font-label">
      <span id="font-label">Font style</span>
      <div>
        <FontToggle />
      </div>
    </div>
    <div role="group" aria-labelledby="theme-label">
      <span id="theme-label">Theme</span>
      <div>
        <ThemeToggle />
      </div>
    </div>
  </div>
  <div id="copyright" class="s-container">
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
  .grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    row-gap: 1rem;
  }

  #skip-link {
    flex: 0 1 auto;
  }

  .responsive-settings {
    container-type: inline-size;
    text-align: right;

    .inline {
      display: none;
      justify-content: end;
    }
  }

  @container (min-width: 31rem) {
    .responsive-settings .inline {
      display: flex;
      gap: 1.5rem;
    }

    .widget {
      display: none;
    }
  }

  #site-title {
    font-size: 1.5rem;
    line-height: 1.2;
    padding: 8px 0;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &[aria-current='page']:not(:focus-visible) {
        outline: inherit;
      }
    }
  }
  #logo {
    height: 1lh;
    width: auto;
    vertical-align: top;
  }
  #settings {
    & > * {
      padding-block: 0.5rem;
    }
  }

  #copyright {
    margin-top: 2rem;
  }
</style>
