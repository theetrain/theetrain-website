import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, defineMDSveXConfig } from 'mdsvex'
import { codeToHtml } from 'shiki'

const themes = { light: 'github-light', dark: 'github-dark' }

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex(
      defineMDSveXConfig({
        highlight: {
          highlighter: (code, lang) => codeToHtml(code, { lang, themes })
        },
        extensions: ['.md', '.svx']
      })
    )
  ],
  extensions: ['.svelte', '.svx'],

  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),

    paths: {
      base: process.env.NODE_ENV === 'development' ? '' : process.env.BASE_PATH
    },

    alias: {
      '$blog/*': 'src/blog/*',
      'content-collections': './.content-collections/generated'
    }
  }
}

export default config
