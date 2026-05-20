<script module>
  function getUserFontStyle() {
    const styleName = Object.freeze({ serif: 'serif', sans: 'sans' })

    // These are duplicated since they'll get copied
    // to `<head>`.
    const FONT_STORAGE_KEY = 'font'
    const FONT_DATASET_KEY = 'fontStyle'

    const fontPreference = localStorage.getItem(FONT_STORAGE_KEY) as keyof typeof styleName | null

    document.documentElement.dataset[FONT_DATASET_KEY] = fontPreference
      ? styleName[fontPreference]
      : styleName.serif
  }

  /**
   * Track number of instances on page.
   * Only the first instance should set up global scripts.
   */
  // svelte-ignore non_reactive_update
  export let instance = 0
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  instance++

  const styles = Object.freeze({
    serif: { label: 'serif' },
    sans: { label: 'sans' }
  } as const)

  const FONT_STORAGE_KEY = 'font'
  const FONT_DATASET_KEY = 'fontStyle'

  let userStyle: (typeof styles)[keyof typeof styles] = $state(styles.serif)

  function handleStyleChange() {
    if (userStyle.label === 'serif') {
      userStyle = styles.sans
    } else {
      userStyle = styles.serif
    }
    document.documentElement.dataset[FONT_DATASET_KEY] = userStyle.label
    localStorage.setItem(FONT_STORAGE_KEY, userStyle.label)
  }

  let preferenceRetrieved = $state(false)

  onMount(() => {
    const userPreference = document.documentElement.dataset[FONT_DATASET_KEY]

    function isValidStyle(key?: string): key is keyof typeof styles {
      if (!key) return false
      return key in styles
    }

    if (isValidStyle(userPreference)) {
      userStyle = styles[userPreference]
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
  Use {#if userStyle.label === 'serif'}
    sans
  {:else}
    serif
  {/if} font
</button>
