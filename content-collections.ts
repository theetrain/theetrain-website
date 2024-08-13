import { defineCollection, defineConfig } from '@content-collections/core'
import { compile } from 'mdsvex'
import { codeToHtml } from 'shiki'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexConfig = {
  highlight: {
    highlighter: (code, lang) => {
      return codeToHtml(code, {
        lang,
        themes: { light: 'github-light', dark: 'github-dark' }
      })
    }
  },
  extensions: ['.md']
}

const posts = defineCollection({
  name: 'posts',
  directory: 'src/blog',
  include: '**/*.md',
  schema: (z) => ({
    title: z.string()
  }),
  transform: async (doc) => {
    const mdoc = await compile(doc.content, mdsvexConfig)
    return {
      ...doc,
      content: mdoc?.code,
      slug: doc.title.toLowerCase().replace(/ /g, '-')
    }
  }
})

export default defineConfig({
  collections: [posts]
})
