<script lang="ts">
  const { data } = $props()
  const { Post } = data
</script>

<svelte:head>
  <title>{data.title} - theetrain.ca</title>
</svelte:head>

<h1>{data.title}</h1>

<Post />
