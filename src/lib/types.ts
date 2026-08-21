import type { Path } from '$app/types'
import type { Picture } from '@sveltejs/enhanced-img';

export type Breadcrumb = { title: string; href: `/${Path}` }

export type EnhancedPicture = Picture & {
  sources: {
    jpeg: string
    avif: string
    webp: string
  }
}
