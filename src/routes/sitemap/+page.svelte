<script lang="ts">
  import { page } from '$app/state'
  import { TOP_LINKS } from '$lib/utils.js'

  let { data } = $props()
</script>

<h1>Sitemap</h1>

<p>This page lists all the sections and content available on this website.</p>

<h2>Pages</h2>
<ul>
  {#each TOP_LINKS as link}
    {@const current = page.url.pathname === link.href}
    <li>
      <a href={link.href} aria-current={current ? 'page' : false}>
        {link.label}
      </a>
    </li>
  {/each}
</ul>

<h2>Alternate forms</h2>
<ul>
  <li><a href="/sitemap.xml">XML Sitemap</a></li>
  <li><a href="/rss.xml">Blog RSS Feed</a></li>
</ul>

<h2>Blog Posts</h2>
<ul>
  {#each data.posts as post (post.slug)}
    <li>
      <a href="/blog/{post.slug}">{post.title}</a>
      <span class="date">- Published on {post.date_authored}</span>
    </li>
  {/each}
</ul>
