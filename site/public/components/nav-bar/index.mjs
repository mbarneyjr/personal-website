const DEFAULT_BREAKPOINT = '512px';

const navBar = document.createElement('template');
navBar.innerHTML = /* html */ `
  <style>
    .navbar {
      width: 100%;
      display: flex;
      /* force the targets to be on a new line when expanded on mobile */
      flex-wrap: wrap;
      /* ensure that the toggle is on the right edge and the title is on the left edge */
      justify-content: space-between;
    }

    /* navbar hamburger toggle styles */
    .navbar-toggle {
      cursor: pointer;
      /* when shown, display will be flex */
      flex-direction: column;
      justify-content: center;
    }
    .navbar-toggle span {
      display: block;
      width: 32px;
      height: 1px;
      margin: 2px;
      background-color: black;
      transition: 0.1s;
    }
    .navbar-cross-toggle span:nth-child(1) {
      transform: rotate(-45deg) translate(0px, 7px);
      width: 24px;
    }
    .navbar-cross-toggle span:nth-child(2) {
      opacity: 0;
    }
    .navbar-cross-toggle span:nth-child(3) {
      transform: rotate(45deg) translate(0px, -7px);
      width: 24px;
    }

    /* navbar link styles */
    .targets {
      /* use flex container for links */
      display: flex;
    }

    /* desktop styles */
    .navbar-toggle {
      display: none;
    }
  </style>
  <nav class="navbar" part="navbar">
    <slot name="title" class="title" part="title"></slot>
    <div class="navbar-toggle" part="toggle"><span></span><span></span><span></span> </div>
    <div class="targets" part="targets">
      <slot></slot>
    </div>
  </nav>
`;

class NavBar extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(navBar.content.cloneNode(true));

    this.shadowRoot.querySelector('.navbar-toggle').addEventListener('click', () => this.navBarToggle());
  }

  connectedCallback () {
    const breakpoint = this.getAttribute('breakpoint');
    this.shadowRoot.querySelector('style').append(/* css */`
      @media only screen and (max-width: ${breakpoint || DEFAULT_BREAKPOINT}) {
        .targets {
          /* hide the targets by default */
          display: none;
        }
        .targets ::slotted(a) {
          /* when expanded, each target should take up the full width */
          width: 100%;
        }
        .navbar-toggle {
          /* show the toggle */
          display: flex;
        }
        .show-targets {
          /* ensure that the links are rendered below the navbar */
          flex-basis: 100%;
          /* render each target on the right side of the screen when expanded */
          text-align: right;
          /* render each link in a new line */
          display: flex;
          flex-direction: column;
        }
      }
    `);
  }

  navBarToggle () {
    this.shadowRoot.querySelector('.targets').classList.toggle('show-targets');
    this.shadowRoot.querySelector('.navbar-toggle').classList.toggle('navbar-cross-toggle');
  }
}
window.customElements.define('nav-bar', NavBar);

/* Example usage:
<style>
  nav-bar {
    display: flex;
    background-color: #dfa;
    width: 100%;
  }

  nav-bar a,
  nav-bar::part(toggle) {
    padding: 1rem;
  }

  nav-bar .link:hover {
    background-color: #adf;
  }

  nav-bar .link.active {
    background-color: #adf;
  }
</style>
<nav-bar breakpoint="512px">
  <a href="/" slot="title">My Cool Site</a>
  <a href="/page1" class="link">Page1</a>
  <a href="/page2" class="link">Page2</a>
  <a href="/page3" class="link">Page3</a>
</nav-bar>
*/
