<script lang="ts">
  import { page } from '$app/state'
  import type { Breadcrumb } from './types'

  type Props = {
    breadcrumbs: Breadcrumb[]
  }
  let { breadcrumbs }: Props = $props()
</script>

{#if breadcrumbs.length > 0}
  <nav class="s-container breadcrumbs" aria-label="breadcrumb">
    <ol class="crumbs">
      {#each breadcrumbs as { title, href }}
        {@const tailHref = page.url.pathname === href}
        <li>
          <a href={tailHref ? '#main' : href} aria-current={tailHref ? 'page' : null}>{title}</a>
        </li>
      {/each}

      <!-- Display dynamic tail breadcrumb -->
      {#if page.data.title && !breadcrumbs.some((bc) => bc.href === page.url.pathname)}
        <li><a href="#main" aria-current="page">{page.data.title}</a></li>
      {/if}
    </ol>
  </nav>
{/if}

<style>
  .breadcrumbs {
    padding-top: 0;
  }
  .crumbs {
    margin: 0;
    min-height: var(--sugar-spacing-block);
    align-items: center;
  }
</style>
