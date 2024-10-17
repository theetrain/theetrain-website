import { allPosts } from 'content-collections'
import { error, redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
  let redirectPath = ''
  const post = allPosts.find((el) => {
    if (el.redirect_from === url.pathname) {
      redirectPath = el.slug
      // TODO, generate pages from `redirect_from` instances
      console.log('REDIRECT', redirectPath)
    }

    return el.slug === params.slug
  })

  if (redirectPath) throw redirect(301, `/blog/${redirectPath}`)

  const Post = (await import(`$blog/${post._meta.path}.svx`)).default

  if (!post) error(404, 'Post not found.')

  return {
    Post,
    title: post.title,
    slug: post.slug
  }
}
