<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Attachment } from 'svelte/attachments'
  import { on } from 'svelte/events'

  type Props = {
    children: Snippet
    label: string
  }
  let { children, label }: Props = $props()

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

    position: absolute;
    z-index: 10;
    right: 0;

    width: max-content;
    padding: 0.5rem;
    background-color: var(--s-color-bg);
  }
</style>
