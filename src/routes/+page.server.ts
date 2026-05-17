import { allPosts } from 'content-collections'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  let latestPosts: Pick<(typeof allPosts)[number], 'title' | 'slug' | 'date_authored'>[] = []

  for (let i = 0; i < Math.min(3, allPosts.length); i++) {
    const post = allPosts[i]!

    latestPosts.push({
      title: post.title,
      slug: post.slug,
      date_authored: post.date_authored
    })
  }

  return { title: 'Enrico Sacchetti, software architect', latestPosts }
}
