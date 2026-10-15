import { clientEntry, css, on, type Handle } from 'remix/component'

import { routes } from '../../routes.ts'

export type NavSection = 'resume' | 'blog'

const links = [
  { label: 'github', href: 'https://github.com/mbarneyjr', icon: 'fa-github', color: '#fff' },
  { label: 'reddit', href: 'https://reddit.com/user/mbarneyme', icon: 'fa-reddit', color: '#FF4500' },
  { label: 'instagram', href: 'https://instagram.com/mbarneyme', icon: 'fa-instagram', color: '#C13584' },
  { label: 'twitter', href: 'https://twitter.com/mbarneyjr', icon: 'fa-twitter', color: '#1DA1F2' },
  { label: 'resume', href: routes.resume.href(), icon: 'fa-file-text', section: 'resume' },
  { label: 'blog', href: routes.blog.index.href(), icon: 'fa-rss-square', section: 'blog' },
]

export const NavBar = clientEntry(import.meta.url, function NavBar(handle: Handle<{ active?: NavSection }>) {
  let open = false

  return () => (
    <nav mix={navStyle}>
      <div mix={innerStyle}>
        <a href={routes.home.href()} mix={itemStyle}>
          Michael Barney
        </a>
        <button
          type="button"
          aria-label="toggle navigation"
          aria-expanded={open}
          aria-controls={handle.id}
          mix={[
            itemStyle,
            toggleStyle,
            on('click', () => {
              open = !open
              handle.update()
            }),
          ]}
        >
          <span />
          <span />
          <span />
        </button>
        <div id={handle.id} mix={targetsStyle} data-open={open}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              aria-current={link.section && link.section === handle.props.active ? 'page' : undefined}
              mix={[itemStyle, linkStyle]}
              style={link.color ? { color: link.color } : undefined}
            >
              {link.label}
              <i class={`fa fa-large ${link.icon}`} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
})

const mobile = '@media (max-width: 720px)'

const navStyle = css({
  backgroundColor: 'var(--dim-color)',
  fontFamily: 'Acme, sans-serif',
  marginBottom: '1rem',
  boxShadow: [
    'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset',
    'rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset',
    'rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset',
    'rgba(0, 0, 0, 0.06) 0px 2px 1px',
    'rgba(0, 0, 0, 0.09) 0px 4px 2px',
    'rgba(0, 0, 0, 0.09) 0px 8px 4px',
    'rgba(0, 0, 0, 0.09) 0px 16px 8px',
    'rgba(0, 0, 0, 0.09) 0px 32px 16px',
  ].join(', '),
  '@media print': { display: 'none' },
})

const innerStyle = css({
  maxWidth: '1024px',
  margin: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})

const itemStyle = css({
  padding: '1rem',
  textDecoration: 'none',
  color: 'var(--light-color)',
})

const linkStyle = css({
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  gap: '0.25rem',
  '&:hover, &[aria-current]': { backgroundColor: 'var(--dark-color)' },
})

const toggleStyle = css({
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'center',
  border: 0,
  background: 'none',
  cursor: 'pointer',
  '& span': {
    display: 'block',
    width: '32px',
    height: '1px',
    margin: '2px',
    backgroundColor: 'var(--light-color)',
    transition: '0.1s',
  },
  '&[aria-expanded="true"] span:nth-child(1)': { transform: 'rotate(-45deg) translate(0px, 7px)', width: '24px' },
  '&[aria-expanded="true"] span:nth-child(2)': { opacity: 0 },
  '&[aria-expanded="true"] span:nth-child(3)': { transform: 'rotate(45deg) translate(0px, -7px)', width: '24px' },
  [mobile]: { display: 'flex' },
})

const targetsStyle = css({
  display: 'flex',
  [mobile]: {
    display: 'none',
    '&[data-open="true"]': { display: 'flex', flexBasis: '100%', flexDirection: 'column' },
  },
})
