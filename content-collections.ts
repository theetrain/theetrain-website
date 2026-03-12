import { defineCollection, defineConfig } from '@content-collections/core'
import * as v from 'valibot'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/blog',
  include: '**/*.svx',
  schema: v.object({
    title: v.string(),
    redirect_from: v.optional(v.string()),
    date_authored: v.pipe(v.string(), v.toDate()),
    date_modified: v.optional(v.pipe(v.string(), v.toDate())),
    content: v.string()
  }),
  transform: async (doc) => {
    // has date prefix (8 digits)
    if (!/^[0-9]{8}-[a-z-]+$/.test(doc._meta.path)) {
      throw new Error(
        `Filename does not use convention YYYYMMDD-article-name. Received ${doc._meta.path}`
      )
    }
    return {
      ...doc,
      slug: doc._meta.path.slice(9)
    }
  }
})

export default defineConfig({
  collections: [posts]
})
