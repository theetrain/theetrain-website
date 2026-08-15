import { allPosts } from '#content-collections'
import { CANONICAL } from '#lib/utils.js'
import type { RequestHandler } from './$types'

export const prerender = true

interface SitemapUrl {
  loc: string
  changefreq: string
  lastmod?: string
}

export const GET: RequestHandler = () => {
  const urls: SitemapUrl[] = [
    { loc: CANONICAL, changefreq: 'daily' },
    { loc: `${CANONICAL}/blog`, changefreq: 'daily' },
    { loc: `${CANONICAL}/license`, changefreq: 'monthly' },
    { loc: `${CANONICAL}/sitemap`, changefreq: 'weekly' }
  ]

  // Add blog posts
  for (const post of allPosts) {
    const lastmod = (post.date_modified || post.date_authored).toISOString().split('T')[0]
    const entry: SitemapUrl = {
      loc: `${CANONICAL}/blog/${post.slug}`,
      changefreq: 'weekly'
    }
    if (lastmod) {
      entry.lastmod = lastmod
    }
    urls.push(entry)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${
      u.lastmod
        ? `
    <lastmod>${u.lastmod}</lastmod>`
        : ''
    }
    <changefreq>${u.changefreq}</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`.trim()

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
