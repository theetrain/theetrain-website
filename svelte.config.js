import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    adapter: adapter(),

    alias: {
      '$blog/*': 'src/blog/*',
      'content-collections': './.content-collections/generated'
    }
  }
}

export default config
