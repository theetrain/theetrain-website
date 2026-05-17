<script lang="ts">
  import { onMount } from 'svelte'

  const styles = Object.freeze({
    serif: { label: 'serif', snippet: serif },
    sans: { label: 'sans', snippet: sans }
  } as const)
  const FONT_STORAGE_KEY = 'font'
  const FONT_DATASET_KEY = 'fontStyle'

  let userStyle: (typeof styles)[keyof typeof styles] = $state(styles.serif)
  const targetSnippet = $derived(userStyle.snippet)

  function handleStyleChange() {
    if (userStyle.label === 'serif') {
      userStyle = styles.sans
    } else {
      userStyle = styles.serif
    }
    document.documentElement.dataset[FONT_DATASET_KEY] = userStyle.label
    localStorage.setItem(FONT_STORAGE_KEY, userStyle.label)
  }

  let ready = $state(false)

  onMount(() => {
    const userPreference = document.documentElement.dataset[FONT_DATASET_KEY]

    function isValidStyle(key?: string): key is keyof typeof styles {
      if (!key) return false
      return key in styles
    }

    if (isValidStyle(userPreference)) {
      userStyle = styles[userPreference]
    }

    ready = true
  })
</script>

<svelte:head>
  <script>
    // Get initial font preference
    const fontPreference = localStorage.getItem('font')

    if (!fontPreference) {
      document.documentElement.dataset.fontStyle = 'serif'
    } else if (fontPreference === 'serif' || fontPreference === 'sans') {
      document.documentElement.dataset.fontStyle = fontPreference
    }
  </script>
</svelte:head>

{#snippet serif()}
  change to sans
{/snippet}

{#snippet sans()}
  change to serif
{/snippet}

<span aria-busy={!ready}
  >Font style: {userStyle.label}
  <button disabled={!ready} onclick={handleStyleChange}>{@render targetSnippet()}</button></span
>
