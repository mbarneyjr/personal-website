import { css } from 'remix/component'

import { routes } from '../../routes.ts'
import { card, mainContent, sectionHeader } from '../../ui/styles.ts'
import { Document } from '../document.tsx'
import { posts } from './posts.ts'

export function BlogIndexPage() {
  return () => (
    <Document
      title="Michael's Blog"
      description="Michael Barney's blog, where you can read some of his thoughts."
      active="blog"
    >
      <div mix={mainContent}>
        <h2 mix={sectionHeader} id="more-stuff-about-me">Blog Posts</h2>
        <ul mix={css({ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' })}>
          {posts.map((post) => (
            <li key={post.slug} mix={card}>
              <div mix={css({ display: 'flex', justifyContent: 'space-between' })}>
                <a
                  href={routes.blog.show.href({ slug: post.slug })}
                  mix={css({ fontFamily: 'Acme, sans-serif', textDecoration: 'inherit', color: 'white' })}
                >
                  <h3>{post.title}</h3>
                </a>
                <p mix={italic}>{post.updated}</p>
              </div>
              <p mix={italic}>{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Document>
  )
}

const italic = css({ fontStyle: 'italic' })
