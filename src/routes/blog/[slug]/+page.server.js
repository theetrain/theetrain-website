import { allPosts } from 'content-collections'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const post = allPosts.find((el) => el.slug === params.slug)

  if (!post) error(404, 'Post not found.')

  return {
    content: post.content,
    title: post.title,
    slug: post.slug
  }
}
