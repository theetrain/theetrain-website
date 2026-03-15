import type { HTMLAnchorAttributes } from 'svelte/elements'
import type { Pathname } from '$app/types'
import type { HREF } from '$lib/utils'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      title: string
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
