<script>
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
        Hi, I'm a software architect with {yearsXp} years of professional experience. I help eliminate
        frustration on the web by building scalable tools and patterns for teams and online consumers.
      </p>

      <p>Let's build a better web, together.</p>
    </div>
  </div>
</section>

<h2>Latest blog posts</h2>

<ul>
  <li><a href="/blog">My blog</a></li>
</ul>

<h2>Latest recording</h2>

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

<p><a href="https://www.youtube.com/@EnricoSacchetti">Watch more of my videos on YouTube.</a></p>

<h2>My priorities</h2>

<ol>
  <li>Avoid complexity.</li>
  <li>Accessibility is addressed early and often.</li>
  <li>Start with the customer's experience and work backwards to build the right solution.</li>
  <li>
    Regularly check in with team members to tighten feedback loops and address points of friction.
  </li>
  <li>
    Provide a bridge between all disciplines to promote collaborative and highly contextual
    workflows.
  </li>
  <li>User experience is more important than developer experience.</li>
</ol>

<h2>Achievements</h2>

<ul>
  <li>
    Web Unleashed 2025: "Build Robust Components". <a
      href="https://fitc.ca/presentation/build-robust-components/"
      >Session<span class="visually-hidden"> notes for talk "Build Robust Components"</span></a
    >
    |
    <a href="https://youtu.be/Sf0DlcPPNTE?si=3bnx3eR0rCybMsxu"
      >Recording<span class="visually-hidden"> of talk "Build Robust Components"</span></a
    >
  </li>
  <li>
    Web Unleashed 2024: "Choosing a JS Framework in 2024".
    <a href="https://fitc.ca/presentation/choosing-a-js-framework-in-2024/"
      >Session<span class="visually-hidden">
        notes for talk "Choosing a JS Framework in 2024"</span
      ></a
    >
  </li>
  <li>Planned and maintained 3 internal design systems of various scales since 2017.</li>
  <li>
    Co-founded <a href="//designsystems.community">Design Systems Community</a> and co-hosted over 17
    meetups in Toronto.
  </li>
</ul>

<h2>Connect with me</h2>

<ul>
  <li><a href="https://bsky.app/profile/theetrain.ca">Bluesky</a></li>
  <li><a href="https://github.com/theetrain">GitHub</a></li>
  <li><a href="https://ca.linkedin.com/in/etrain">LinkedIn</a></li>
  <li>
    <a href="https://youtube.com/playlist?list=PL8bMgX1kyZTiLCyvf8vF13sdnR4fhNl6v">YouTube</a>
  </li>
  <li><a href="https://medium.com/@theetrain">Medium</a></li>
</ul>

<style>
  #portrait {
    width: clamp(450px, 50%, 100%);
    flex-basis: 300px;
    flex-grow: 0;

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
    font-size: clamp(1rem, 2vw + 0.25rem, 1.3rem);
    text-wrap: balance;
  }

  .responsive-row-50 {
    gap: 1rem;
    align-items: center;
  }

  iframe {
    width: clamp(560px, calc(100vh * 1.5 - 300px), 100%);
    aspect-ratio: 1.777;
    margin-bottom: 1rem;
  }
</style>
