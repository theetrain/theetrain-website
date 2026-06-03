import { CANONICAL } from '$lib/utils'
import { allPosts } from 'content-collections'
import type { RequestHandler } from './$types'

export const prerender = true

export const GET: RequestHandler = () => {
  let items = allPosts.map((post) => {
    const pubDate = new Date(post.date_authored).toUTCString()

    return `<item>
        <title>${post.title}</title>
        <link>${new URL(post.slug, CANONICAL)}</link>
        <pubDate>${pubDate}</pubDate>
        <author>Enrico Sacchetti</author>
      </item>`
  })

  const xml = `<rss version="2.0">
      <channel>
        <title>Enrico Sacchetti's Blog</title>
        <link>${CANONICAL}/blog</link>
        <description>Enrico's programming blog</description>
        <language>en-ca</language>
        <copyright>Content and graphics is CC BY-NC-ND 4.0. except when specified.</copyright>
        ${items}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
