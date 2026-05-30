import { allPosts } from 'content-collections'
import { format } from 'date-fns'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date_authored: format(post.date_authored, 'yyyy MMMM d')
  }))

  return {
    title: 'Sitemap',
    posts
  }
}
