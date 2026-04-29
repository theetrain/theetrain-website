import { allPosts } from 'content-collections'
import { format } from 'date-fns'

/** @type {import('./$types').PageLoad} */
export async function load() {
  const posts = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date_authored: format(post.date_authored, 'yyyy MMMM d')
  }))

  return {
    posts
  }
}
