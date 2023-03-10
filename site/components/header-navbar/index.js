class HeaderNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = String.raw`
      <header class="navbar">
        <a class="nav-title" href="/">Michael Barney</a>
        <ul class="nav-links">
          <li><a aria-label="blog" href="/blog" class="nav-link" style="color: var(--light-color);">
            <i class="fa fa-large fa-rss-square"></i>
            blog
          </a></li>
          <li><a aria-label="resume" href="/resume" class="nav-link" style="color: var(--light-color);">
            <i class="fa fa-large fa-file-text"></i>
            resume
          </a></li>
          <li><a aria-label="twitter" href="https://twitter.com/mbarneyjr" class="nav-link" style="color: #1DA1F2">
            <i class="fa fa-large fa-twitter"></i>
            twitter
          </a></li>
          <li><a aria-label="instagram" href="https://instagram.com/mbarneyme" class="nav-link" style="color: #C13584">
            <i class="fa fa-large fa-instagram"></i>
            instagram
          </a></li>
          <li><a aria-label="reddit" href="https://reddit.com/user/mbarneyme" class="nav-link" style="color: #FF4500">
            <i class="fa fa-large fa-reddit"></i>
            reddit
          </a></li>
          <li><a aria-label="github" href="https://github.com/mbarneyjr" class="nav-link" style="color: #000">
            <i class="fa fa-large fa-github"></i>
            github
          </a></li>
        </ul>
      </header>
    `;
  }
}

customElements.define('header-navbar', HeaderNavbar);
