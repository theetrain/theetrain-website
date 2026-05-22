<script module>
  const styleName = Object.freeze({ serif: 'serif', sans: 'sans' })
  type StyleValues = (typeof styleName)[keyof typeof styleName]

  function getUserFontStyle() {
    const styles: typeof styleName = Object.freeze({ serif: 'serif', sans: 'sans' })
    // These are duplicated since they'll get copied
    // to `<head>`.
    const FONT_STORAGE_KEY = 'font'
    const FONT_DATASET_KEY = 'fontStyle'

    const fontPreference = localStorage.getItem(FONT_STORAGE_KEY) as StyleValues | null
    if (!fontPreference) return

    if (styles[fontPreference]) {
      document.documentElement.dataset[FONT_DATASET_KEY] = styles[fontPreference]
    } else {
      document.documentElement.dataset[FONT_DATASET_KEY] = styles.serif
    }

    return fontPreference
  }

  /**
   * Track number of instances on page.
   * Only the first instance should set up global scripts.
   */
  // svelte-ignore non_reactive_update
  export let instance = 0

  /** Active font */
  export const selectedFont: { current: StyleValues } = $state({ current: 'serif' })
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  instance++

  const FONT_STORAGE_KEY = 'font'
  const FONT_DATASET_KEY = 'fontStyle'

  function handleStyleChange() {
    if (selectedFont.current === 'serif') {
      selectedFont.current = styleName.sans
    } else {
      selectedFont.current = styleName.serif
    }
    console.log('current font is ', selectedFont.current)
    document.documentElement.dataset[FONT_DATASET_KEY] = selectedFont.current
    localStorage.setItem(FONT_STORAGE_KEY, selectedFont.current)
  }

  let preferenceRetrieved = $state(false)

  onMount(() => {
    const userPreference = getUserFontStyle()

    if (userPreference && userPreference !== selectedFont.current) {
      selectedFont.current = styleName[userPreference]
    }

    preferenceRetrieved = true
  })
</script>

<svelte:head>
  {#if instance === 1}
    {@html `<script>(${getUserFontStyle.toString()})()</script>`}
  {/if}
</svelte:head>

<button
  aria-busy={!preferenceRetrieved}
  disabled={!preferenceRetrieved}
  onclick={handleStyleChange}
>
  Use {#if selectedFont.current === 'serif'}
    sans
  {:else}
    serif
  {/if} font
</button>
