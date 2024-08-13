<script lang="ts">
  const { data } = $props()
</script>

<svelte:head>
  <title>{data.title} - theetrain.ca</title>
</svelte:head>

<h1>{data.title}</h1>

{@html data.content}
