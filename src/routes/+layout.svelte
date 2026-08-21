<script lang="ts">
  import { ProgressBar } from '@prgm/sveltekit-progress-bar'
  import { page } from '$app/state'

  import '#lib/main.css'
  import logo from '#lib/assets/logo.png?url'
  import Disclosure from '#lib/components/Disclosure.svelte'

  import Breadcrumbs from './Breadcrumbs.svelte'
  import FontToggle from './FontToggle.svelte'
  import ThemeToggle from './ThemeToggle.svelte'

  import { CANONICAL, SOCIAL_LINKS, TOP_LINKS, type HREF } from '#lib/utils.js'

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

  let ogImage = $derived.by(() => {
    let url = ''

    if (page.data.splashEnhancedImageSources) {
      url = page.data.splashEnhancedImageSources.sources['jpeg'].split(',')[0]?.split(' ')[0] ?? ''
    } else {
      url = logo
    }

    return new URL(url, CANONICAL).href
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
  <meta property="og:image" content={ogImage} />

  <link
    rel="alternate"
    type="application/rss+xml"
    title="RSS Feed Enrico Sacchetti's Blog"
    href="/rss.xml"
  />
</svelte:head>

<ProgressBar color="var(--color-primary)" />

<div id="settings">
  <div class="s-container responsive-row-50 align-center gap-1">
    <a id="skip-link" class="skip-link" href="#main">Skip to content</a>
    <div class="responsive-settings">
      <div class="widget">
        <Disclosure label="Site settings">
          <FontToggle />
          <ThemeToggle showLabel="top" />
        </Disclosure>
      </div>

      <div class="inline">
        <FontToggle />
        <ThemeToggle showLabel="left" />
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
          {#each TOP_LINKS as link}
            <li><a {...navLink(link.href)}>{link.label}</a></li>
          {/each}
          <li><a href="/rss.xml">Blog RSS Feed</a></li>
        </menu>
      </nav>
    </div>
    <div>
      <span id="footer-social-links">Social links</span>
      <nav aria-labelledby="footer-social-links">
        <menu>
          {#each SOCIAL_LINKS as link}
            <li><a rel="external" href={link.href}>{link.label}</a></li>
          {/each}
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
      <ThemeToggle />
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
    grid-template-columns: repeat(auto-fill, minmax(min(24rem, 100%), 1fr));
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

  @container (min-width: 34rem) {
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
