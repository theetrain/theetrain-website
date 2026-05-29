import type { Pathname } from '$app/types'

export type HREF = Pathname | '#main'
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
  {
    label: 'GitHub',
    href: 'https://github.com/theetrain'
  },
  {
    label: 'LinkedIn',
    href: 'https://ca.linkedin.com/in/etrain'
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/playlist?list=PL8bMgX1kyZTiLCyvf8vF13sdnR4fhNl6v'
  }
] as const)
