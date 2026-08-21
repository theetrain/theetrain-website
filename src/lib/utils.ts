import type { Path } from '$app/types'

export type HREF = `/${Path}` | '#main'
export const CANONICAL = 'https://theetrain.ca'

export const TOP_LINKS = Object.freeze([
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'License',
    href: '/license'
  },
  {
    label: 'Sitemap',
    href: '/sitemap'
  }
] as const)

export const SOCIAL_LINKS = Object.freeze([
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/theetrain.ca'
  },
  { label: 'GitHub', href: 'https://github.com/theetrain' },
  { label: 'LinkedIn', href: 'https://ca.linkedin.com/in/etrain' },
  {
    label: 'YouTube',
    href: 'https://youtube.com/playlist?list=PL8bMgX1kyZTiLCyvf8vF13sdnR4fhNl6v'
  }
] as const)

export function calculateReadingTime(content: string, wpm = 225) {
  // Remove HTML tags
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, '')

  // Remove 0-length strings
  const words = cleanText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  const wordCount = words.length

  // Calculate time and round up to the nearest minute
  const readingTime = Math.ceil(wordCount / wpm)

  return {
    wordCount,
    minutes: readingTime,
    text: `${readingTime} minute read`
  }
}
