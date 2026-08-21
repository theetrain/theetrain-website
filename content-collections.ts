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
    content: v.string(),
    /** Path to image in repository */
    splash_image_url: v.optional(v.string()),
    /** Path to public image, if known. */
    splash_image_source: v.optional(v.string()),
    /** Image alt text. */
    splash_image_alt: v.optional(v.string()),
    /** Image description. */
    splash_image_description: v.optional(v.string())
  }),
  transform: async (doc) => {
    // has date prefix (8 digits)
    if (!/^post-[0-9]{8}-[a-z-]+$/.test(doc._meta.path)) {
      throw new Error(
        `Filename does not use convention YYYYMMDD-article-name. Received ${doc._meta.path}`
      )
    }
    return {
      ...doc,
      slug: doc._meta.path.slice(14)
    }
  }
})

export default defineConfig({
  content: [posts]
})
