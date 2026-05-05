import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import contentCollections from '@content-collections/vite'
import { fontless } from 'fontless'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    process.env.VITEST ? undefined : contentCollections(),
    fontless()
  ]
})
