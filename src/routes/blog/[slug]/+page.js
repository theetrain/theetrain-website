import { allPosts } from 'content-collections'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const post = allPosts.find((el) => el.slug === params.slug)
  const Post = (await import(`$blog/${post._meta.path}.svx`)).default

  if (!post) error(404, 'Post not found.')

  return {
    Post,
    title: post.title,
    slug: post.slug
  }
}
