import { allPosts } from '$lib/utils.server'
import { describe, it } from 'vitest'

describe('allPosts', () => {
  it('returns all posts', async () => {
    const posts = await allPosts()
    console.log(posts)
  })
})
