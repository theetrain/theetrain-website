<script lang="ts">
  import { CANONICAL } from '$lib/utils.js'
  import { type WithContext, type BlogPosting } from 'schema-dts'
  import enricoAvatar from '$lib/assets/enrico.jpg?url'

  const { data } = $props()
  const Post = $derived(data.Post)

  const blogPath = $derived(`${CANONICAL}/${data.slug}`)
  const wordCount = $derived(123)

  const jsonLd: WithContext<BlogPosting> = $derived({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': blogPath,
    name: `${data.title}`,
    datePublished: `${data.datePublished}`,
    dateModified: `${data.dateUpdated ?? data.datePublished}`,
    author: {
      '@type': 'Person',
      name: 'Enrico Sacchetti',
      image: {
        '@type': 'ImageObject',
        '@id': `${enricoAvatar}`,
        url: `${enricoAvatar}`,
        height: 1000,
        width: 1000
      }
    },
    url: blogPath,
    wordCount
  })

  const jsonLdScript = $derived(
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`
  )

  $inspect(jsonLd)
</script>

<svelte:head>
  {@html jsonLdScript}
</svelte:head>

<article>
  <h1>{data.title}</h1>
  <p>
    Published: <time datetime={data.datePublishedIso}>{data.datePublishedReadable}</time>
  </p>
  {#if data.dateUpdatedIso}
    <p>Updated <time datetime={data.dateUpdatedIso}>{data.dateUpdatedReadable}</time></p>
  {/if}

  <Post />
</article>
