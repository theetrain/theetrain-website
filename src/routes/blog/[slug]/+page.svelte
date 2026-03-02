<script lang="ts">
  const { data } = $props()
  const Post = $derived(data.Post)
</script>

<h1>{data.title}</h1>

<Post />
