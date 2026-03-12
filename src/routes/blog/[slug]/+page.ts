import { allPosts } from 'content-collections'
import { error, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
  let redirectPath = ''

  // TODO: handle slugs that may change
  const post = allPosts.find((post) => {
    if (post.redirect_from === url.pathname) {
      redirectPath = post.slug
      // TODO, generate pages from `redirect_from` instances
      console.log('REDIRECT', redirectPath)
    }

    return post.slug === params.slug
  })

  if (!post) error(404, 'Post not found.')

  if (redirectPath) throw redirect(301, `/blog/${redirectPath}`)

  const Post = (await import(`$blog/${post._meta.path}.svx`)).default

  return {
    Post,
    title: post.title,
    slug: post.slug
  }
}
