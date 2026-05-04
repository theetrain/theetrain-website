import { allPosts } from 'content-collections'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, url }) => {
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

  return {
    path: post._meta.path,
    title: post.title,
    slug: post.slug,
    datePublished: post.date_authored,
    dateUpdated: post.date_modified
  }
}
