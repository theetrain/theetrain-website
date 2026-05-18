<script module>
  function getUserFontStyle() {
    const styleName = Object.freeze({ serif: 'serif', sans: 'sans' })

    // These are duplicated since they'll get copied
    // to `<head>`.
    const FONT_STORAGE_KEY = 'font'
    const FONT_DATASET_KEY = 'fontStyle'

    const fontPreference = localStorage.getItem(FONT_STORAGE_KEY) as keyof typeof styleName | null

    if (!fontPreference) {
      document.documentElement.dataset[FONT_DATASET_KEY] = styleName.serif
    } else if (fontPreference in styleName) {
      document.documentElement.dataset[FONT_DATASET_KEY] = styleName[fontPreference]
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'

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
  {@html `<script>(${getUserFontStyle.toString()})()</script>`}
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
