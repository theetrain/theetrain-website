import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/blog',
  include: '**/*.svx',
  schema: (z) => ({
    title: z.string()
  }),
  transform: async (doc) => {
    return {
      ...doc,
      slug: doc.title.toLowerCase().replace(/ /g, '-')
    }
  }
})

export default defineConfig({
  collections: [posts]
})
