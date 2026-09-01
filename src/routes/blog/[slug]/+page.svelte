<script lang="ts">
  import { CANONICAL } from '#lib/utils.js'
  import { type WithContext, type BlogPosting } from 'schema-dts'
  import enricoAvatar from '#lib/assets/enrico.jpg?url'

  const { data } = $props()
  const Post = $derived(data.Post)

  const blogPath = $derived(`${CANONICAL}/${data.slug}`)

  const splashImage = $derived({
    sources: data.splashEnhancedImageSources,
    source: data.splashImageSource,
    alt: data.splashImageAlt,
    description: data.splashImageDescription
  })

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
    wordCount: data.wordCount
  })

  const jsonLdScript = $derived(
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`
  )
</script>

<svelte:head>
  {@html jsonLdScript}

  <!-- Article-specific opengraph data not competing with root layout -->
  <meta property="og:article:author" content="Enrico Sacchetti" />
  <meta property="og:article:published_time" content={data.datePublishedIso} />
  {#if data.dateUpdatedIso}
    <meta property="og:article:modified_time" content={data.dateUpdatedIso} />
  {/if}
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
    <wbr /><em>{data.readingTime}</em>
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
              href={splashImage.source}
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
