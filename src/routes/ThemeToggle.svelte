<script module>
  const themes = Object.freeze({ auto: 'auto', light: 's-light', dark: 's-dark' })
  type ThemeValues = (typeof themes)[keyof typeof themes]

  const THEME_STORAGE_KEY = 'theme'

  function getThemePreference() {
    const themeValues: ThemeValues[] = ['auto', 's-light', 's-dark']
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
  export const selectedTheme: { current: ThemeValues } = $state({ current: 'auto' })
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  type Props = {
    /** Whether to show label above or to the left */
    showLabel?: 'top' | 'left'
  }

  let { showLabel }: Props = $props()

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
    selectedTheme.current = targetTheme
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

<div
  class="button-group"
  class:top-label={showLabel === 'top'}
  class:left-label={showLabel === 'left'}
>
  {#if showLabel}
    <span class="label">Theme</span>
  {/if}
  <div>
    <button
      aria-busy={!ready}
      aria-current={selectedTheme.current === 'auto'}
      disabled={!ready}
      onclick={updateTheme}
      data-theme="auto">OS default</button
    ><button
      aria-busy={!ready}
      aria-current={selectedTheme.current === 's-light'}
      disabled={!ready}
      onclick={updateTheme}
      data-theme="s-light">Light</button
    ><button
      aria-busy={!ready}
      aria-current={selectedTheme.current === 's-dark'}
      disabled={!ready}
      onclick={updateTheme}
      data-theme="s-dark">Dark</button
    >
  </div>
</div>

<style>
  .button-group {
    display: flex;
    gap: 0.25rem;
  }
  .left-label {
    align-items: center;
  }
  .top-label {
    flex-direction: column;
    align-items: start;
  }
</style>
