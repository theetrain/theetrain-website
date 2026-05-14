<script>
  import bluesky from '$lib/assets/icons/bluesky.svg?raw'
  import github from '$lib/assets/icons/github.svg?raw'
  import linkedin from '$lib/assets/icons/linkedin.svg?raw'
  import youtube from '$lib/assets/icons/youtube.svg?raw'

  const { data } = $props()

  /** Years of experience */
  const yearsXp = new Date().getFullYear() - new Date('2014-02-01').getFullYear()
</script>

<section aria-labelledby="meet-enrico">
  <h1 id="meet-enrico">Meet Enrico Sacchetti</h1>

  <div class="responsive-row-50">
    <div id="portrait">
      <enhanced:img
        src="$lib/assets/enrico.jpg"
        alt="Portrait of Enrico; a man facing
      the camera, smiling"
      />
    </div>
    <div id="intro">
      <p>
        I'm a software architect and front end developer with {yearsXp} years of professional experience.
        I help eliminate frustration on the web by building scalable tools and patterns for teams that
        emphasize inclusive design.
      </p>

      <p>Let's build a better web, together.</p>

      <p>
        Find me on
        <span class="nowrap"
          >{@html bluesky}
          <a rel="external" href="https://bsky.app/profile/theetrain.ca">Bluesky</a></span
        >,
        <span class="nowrap"
          >{@html github} <a rel="external" href="https://github.com/theetrain">GitHub</a></span
        >,
        <span class="nowrap"
          >{@html linkedin}
          <a rel="external" href="https://ca.linkedin.com/in/etrain">LinkedIn</a></span
        >, or
        <span class="nowrap">
          {@html youtube}
          <a
            rel="external"
            href="https://youtube.com/playlist?list=PL8bMgX1kyZTiLCyvf8vF13sdnR4fhNl6v">YouTube</a
          >
        </span>.
      </p>
    </div>
  </div>
</section>

<section aria-labelledby="latest-blog-posts">
  <h2 id="latest-blog-posts">Latest blog posts</h2>

  <ul>
    {#each data.latestPosts as post}
      {@const postDate = new Date(post.date_authored).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      <li><a href="/blog/{post.slug}">{postDate} - {post.title}</a></li>
    {/each}
  </ul>
</section>

<section aria-labelledby="latest-recording">
  <h2 id="latest-recording">Latest recording</h2>

  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/Sf0DlcPPNTE?si=kYyVhEKkKqbVExx1"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>

  <p>
    <a rel="external" href="https://www.youtube.com/@EnricoSacchetti"
      >Watch more of my videos on YouTube.</a
    >
  </p>
</section>

<section aria-describedby="my-priorities">
  <h2 id="my-priorities">My priorities</h2>

  <ul>
    <li>Avoid complexity.</li>
    <li>Accessibility is addressed early and often.</li>
    <li>User experience is more important than developer experience.</li>
    <li>Start with the customer's experience and work backwards to build the right solution.</li>
    <li>
      Regularly check in with team members to tighten feedback loops and address points of friction.
    </li>
    <li>
      Provide a bridge between all disciplines to promote collaborative and highly contextual
      workflows.
    </li>
  </ul>
</section>

<section aria-describedby="achievements">
  <h2 id="achievements">Achievements</h2>

  <ul>
    <li>
      Web Unleashed 2025: "Build Robust Components". <a
        rel="external"
        href="https://fitc.ca/presentation/build-robust-components/"
        >Session<span class="visually-hidden"> notes for talk "Build Robust Components"</span></a
      >
      |
      <a rel="external" href="https://youtu.be/Sf0DlcPPNTE?si=3bnx3eR0rCybMsxu"
        >Recording<span class="visually-hidden"> of talk "Build Robust Components"</span></a
      >
    </li>
    <li>
      Web Unleashed 2024: "Choosing a JS Framework in 2024".
      <a rel="external" href="https://fitc.ca/presentation/choosing-a-js-framework-in-2024/"
        >Session<span class="visually-hidden">
          notes for talk "Choosing a JS Framework in 2024"</span
        ></a
      >
    </li>
    <li>
      Co-founded <a rel="external" href="https://designsystems.community"
        >Design Systems Community</a
      > and co-hosted over 17 meetups in Toronto.
    </li>
  </ul>
</section>

<style>
  #portrait {
    width: clamp(450px, 50%, 100%);
    flex-basis: 300px;
    flex-grow: 0;
    align-self: flex-start;

    :global(picture) {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    :global(img) {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  #intro {
    font-size: 1.25rem;
    text-wrap: balance;
  }

  .responsive-row-50 {
    gap: 1.5rem;
    align-items: center;
  }

  iframe {
    width: clamp(560px, calc(100vh * 1.5 - 300px), 100%);
    aspect-ratio: 1.777;
    margin-bottom: 1rem;
  }
</style>
