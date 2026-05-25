import type { Component } from 'svelte'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ data }) => {
  const Post: Component = (await import(`$blog/${data.path}.svx`)).default

  return { Post, ...data }
}
