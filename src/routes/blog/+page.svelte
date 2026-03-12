<script>
  let { data } = $props()

  $inspect(data.posts)
</script>

<h1>All articles</h1>

<ul>
  {#each data.posts as post (post.slug)}
    <li>
      <a href="/blog/{post.slug}">{post.date_authored} - {post.title}</a>
    </li>
  {/each}
</ul>
