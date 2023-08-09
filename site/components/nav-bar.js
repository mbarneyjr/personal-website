const DEFAULT_BREAKPOINT = '512px';

const navBar = document.createElement('template');
navBar.innerHTML = /* html */ `
  <style>
    :host {
      --padding: 1rem;
    }

    body {
      margin: 0;
    }

    .navbar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar-toggle {
      display: none;
      cursor: pointer;
    }
    .navbar-toggle span {
      display: block;
      width: 32px;
      height: 2px;
      margin: 2px;
      background-color: black;
      transition: 0.4s;
    }
    .navbar-cross-toggle span:nth-child(1) {
      transform: rotate(-45deg) translate(-4px, 4px);
    }
    .navbar-cross-toggle span:nth-child(2) {
      opacity: 0;
    }
    .navbar-cross-toggle span:nth-child(3) {
      transform: rotate(45deg) translate(-4px, -4px);
    }

    .targets {
      text-align: center;
      display: flex;
    }

    ::slotted(a), .navbar-toggle {
      padding: var(--padding);
    }
  </style>
  <nav class="navbar" part="navbar">
    <div class="title" part="title">
      <slot name="title"></slot>
    </div>
    <div class="navbar-toggle" part="toggle"><span></span><span></span><span></span>
    </div>
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
  
  connectedCallback() {
    const breakpoint = this.getAttribute('breakpoint');
    this.shadowRoot.querySelector('style').append(/* css */`
      @media only screen and (max-width: ${breakpoint || DEFAULT_BREAKPOINT}) {
        .targets {
          flex-direction: column;
        }
        .targets {
          flex-basis: 100%;
          display: none;
        }
        .targets ::slotted(a) {
          width: 100%;
        }
        .navbar-toggle {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .navbar-show-toggle {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    `); 
  }

  navBarToggle() {
    this.shadowRoot.querySelector('.targets').classList.toggle('navbar-show-toggle');
    this.shadowRoot.querySelector('.navbar-toggle').classList.toggle('navbar-cross-toggle');
  }
}
window.customElements.define('nav-bar', NavBar);
