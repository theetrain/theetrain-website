import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/blog',
  include: '**/*.svx',
  schema: (z) => ({
    title: z.string(),
    redirect_from: z.string()
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
