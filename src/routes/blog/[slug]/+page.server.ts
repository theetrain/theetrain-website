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

  const formatter = Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return {
    path: post._meta.path,
    title: post.title,
    slug: post.slug,
    datePublishedIso: post.date_authored.toISOString(),
    datePublishedReadable: formatter.format(post.date_authored),
    dateUpdatedIso: post.date_modified?.toISOString(),
    dateUpdatedReadable: formatter.format(post.date_modified)
  }
}
