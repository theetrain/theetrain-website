import type { HTMLAnchorAttributes } from 'svelte/elements'
import type { HREF } from '#lib/utils.js'
import type { EnhancedPicture } from '#lib/types.ts'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      title: string
      /** Blog post splash image */
      splashEnhancedImageSources?: EnhancedPicture
    }
    // interface PageState {}
    // interface Platform {}
  }

  namespace svelteHTML {
    interface IntrinsicElements {
      a: Omit<HTMLAnchorAttributes, 'href'> & {
        // The (string & {}) trick prevents 'string' from collapsing the union,
        // preserving Intellisense for your Pathnames.
        href?: HREF | (string & {}) | null
      }
    }
  }
}

export {}
