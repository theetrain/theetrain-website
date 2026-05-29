<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Attachment } from 'svelte/attachments'
  import { on } from 'svelte/events'

  type Props = {
    children: Snippet
    label: string
  }
  let { children, label }: Props = $props()

  /** Track disclosure open state */
  let open = $state(false)

  const handleOutClick: Attachment<HTMLDetailsElement> = (node) => {
    if (!open) return

    const off = on(window, 'pointerdown', (e) => {
      if (node.contains(e.target as Node)) return
      open = false
    })

    return () => off()
  }
</script>

<details {@attach handleOutClick} bind:open>
  <summary>{label}</summary>
  <div class="panel gap-2">{@render children()}</div>
</details>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    container-type: inline-size;

    position: absolute;
    z-index: 10;
    right: 0;

    width: 19.25rem;
    max-width: 100%;
    padding: 0.5rem;
    background-color: var(--s-color-bg);

    border: 1px solid var(--s-color-text);
    box-shadow: -4px 4px 10px 0 color-mix(in srgb, var(--s-color-text), transparent 50%);
  }
</style>
