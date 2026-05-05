import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, escapeSvelte, defineMDSveXConfig, type MdsvexOptions } from 'mdsvex'
import { createHighlighter } from 'shiki'

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
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          }
        })
      )
      return `{@html \`${html}\` }`
    }
  },
  extensions: ['.md', '.svx']
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), mdsvex(defineMDSveXConfig(mdsvexConfig))],
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
