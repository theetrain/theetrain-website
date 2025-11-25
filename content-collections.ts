import { defineCollection, defineConfig } from '@content-collections/core'
import * as v from 'valibot'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/blog',
  include: '**/*.svx',
  schema: v.object({
    title: v.string(),
    redirect_from: v.string(),
    content: v.string()
  }),
  transform: async (doc) => {
    return {
      ...doc,
      slug: doc.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\,|\+|\(|\)|\`|\~|\!/g, '')
    }
  }
})

export default defineConfig({
  collections: [posts]
})
