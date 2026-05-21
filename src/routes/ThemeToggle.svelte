<script module>
  const themes = Object.freeze({ auto: 'auto', light: 's-light', dark: 's-dark' })
  type ThemeValues = (typeof themes)[keyof typeof themes]

  const THEME_STORAGE_KEY = 'theme'

  function getThemePreference() {
    const themeValues: (typeof themes)[keyof typeof themes][] = ['auto', 's-light', 's-dark']
    const THEME_STORAGE_KEY = 'theme'

    const themePreference = localStorage.getItem(THEME_STORAGE_KEY) as ThemeValues | null
    if (!themePreference) return

    if (themeValues.includes(themePreference)) {
      document.documentElement.classList.add(themePreference)
    }
  }

  /**
   * Track number of instances on page.
   * Only the first instance should set up global scripts.
   */
  export const instance = $state({ current: 0 })

  /** Active theme */
  export const currentTheme: { current: ThemeValues } = $state({ current: 'auto' })
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  instance.current++

  function updateTheme(
    e: MouseEvent & {
      currentTarget: HTMLButtonElement
    }
  ) {
    const targetTheme = e.currentTarget.dataset['theme'] as ThemeValues

    if (targetTheme === themes.auto) {
      document.documentElement.classList.remove(themes.light, themes.dark)
    } else if (targetTheme === themes.light) {
      document.documentElement.classList.remove(themes.auto, themes.dark)
      document.documentElement.classList.add(themes.light)
    } else if (targetTheme === themes.dark) {
      document.documentElement.classList.remove(themes.auto, themes.light)
      document.documentElement.classList.add(themes.dark)
    }

    localStorage.setItem(THEME_STORAGE_KEY, targetTheme)
    currentTheme.current = targetTheme
  }

  let ready = $state(false)

  onMount(() => {
    ready = true
  })
</script>

<svelte:head>
  {#if instance.current === 1}
    {@html `<script>(${getThemePreference.toString()})()</script>`}
  {/if}
</svelte:head>

<div class="button-group">
  <button
    aria-busy={!ready}
    aria-current={currentTheme.current === 'auto'}
    disabled={!ready}
    onclick={updateTheme}
    data-theme="auto">OS default</button
  ><button
    aria-busy={!ready}
    aria-current={currentTheme.current === 's-light'}
    disabled={!ready}
    onclick={updateTheme}
    data-theme="s-light">Light</button
  ><button
    aria-busy={!ready}
    aria-current={currentTheme.current === 's-dark'}
    disabled={!ready}
    onclick={updateTheme}
    data-theme="s-dark">Dark</button
  >
</div>
