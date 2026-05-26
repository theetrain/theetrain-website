import adapter from '@sveltejs/adapter-static'
import { type Config } from '@sveltejs/kit'
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

const config: Config = {
  preprocess: [vitePreprocess(), mdsvex(defineMDSveXConfig(mdsvexConfig))],
  extensions: ['.svelte', '.svx'],

  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),

    alias: {
      '$blog/*': 'src/blog/*',
      'content-collections': './.content-collections/generated'
    }
  }
}

export default config
