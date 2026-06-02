<script lang="ts">
  import { CANONICAL } from '$lib/utils.js'
  import { type WithContext, type BlogPosting } from 'schema-dts'
  import enricoAvatar from '$lib/assets/enrico.jpg?url'

  const { data } = $props()
  const Post = $derived(data.Post)

  const blogPath = $derived(`${CANONICAL}/${data.slug}`)

  const splashImage = $derived({
    sources: data.splashEnhancedImageSources,
    source: data.splashImageSource,
    alt: data.splashImageAlt,
    description: data.splashImageDescription
  })

  /** TODO */
  const wordCount = $derived(123)

  // jsonLD and related logic
  const jsonLd: WithContext<BlogPosting> = $derived({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': blogPath,
    name: `${data.title}`,
    datePublished: `${data.datePublishedIso}`,
    dateModified: `${data.dateUpdatedIso ?? data.datePublishedIso}`,
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
</script>

<svelte:head>
  {@html jsonLdScript}
</svelte:head>

<article>
  <h1>{data.title}</h1>
  <p class="subtitle">
    <span
      >Published: <time datetime={data.datePublishedIso}>{data.datePublishedReadable}</time>.</span
    >
    {#if data.dateUpdatedIso}
      <wbr /><span
        >Updated <time datetime={data.dateUpdatedIso}>{data.dateUpdatedReadable}</time>.</span
      >
    {/if}
  </p>

  {#if splashImage.sources}
    <figure>
      <enhanced:img
        src={splashImage.sources}
        alt={splashImage.alt ?? splashImage.description ?? 'Splash image'}
      />
      {#if splashImage.description}
        <figcaption>
          {#if splashImage.description}
            {splashImage.description}
          {/if}

          {#if splashImage.source}
            <a
              rel="external"
              href="https://unsplash.com/photos/aerial-view-of-trees-and-river-sss0DlUxfGY"
              >(source<span class="visually-hidden"> for {splashImage.description}</span>)</a
            >
          {/if}
        </figcaption>
      {/if}
    </figure>
  {/if}

  <Post />
</article>

<style>
  p {
    margin-bottom: 1rem;
  }
  p span {
    display: inline-block;
  }
</style>
