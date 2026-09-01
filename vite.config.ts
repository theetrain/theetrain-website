import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, escapeSvelte, defineMDSveXConfig, type MdsvexOptions } from 'mdsvex'
import { createHighlighter } from 'shiki'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import contentCollections from '@content-collections/vite'
import { fontless } from 'fontless'
import { defineConfig } from 'vite'
import path from 'node:path'

const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['javascript', 'typescript', 'sh', 'svelte', 'css']
})

const mdsvexConfig: MdsvexOptions = {
  highlight: {
    highlighter: (code, lang = 'text') => {
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang: lang!,
          themes: { light: 'github-light', dark: 'github-dark' }
        })
      )

      return `{@html \`${html}\` }`
    }
  },
  extensions: ['.md', '.svx'],
  layout: path.resolve(import.meta.dirname, './src/lib/components/BlogLayout.svx')
}

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      preprocess: [vitePreprocess(), mdsvex(defineMDSveXConfig(mdsvexConfig))],
      extensions: ['.svelte', '.svx'],
      adapter: adapter({ fallback: '404.html' })
    }),
    process.env['VITEST'] ? undefined : contentCollections(),
    fontless({
      families: [
        {
          name: 'Source Serif 4',
          preload: true
        },
      ]
    })
  ]
})
