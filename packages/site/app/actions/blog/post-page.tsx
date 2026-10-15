import { css, type Handle, unsafeHTML } from 'remix/component'

import { card, mainContent } from '../../ui/styles.ts'
import { Document } from '../document.tsx'
import type { Post } from './posts.ts'

export function BlogPostPage(handle: Handle<{ post: Post; body: string }>) {
  return () => {
    let { post, body } = handle.props

    return (
      <Document title={post.pageTitle} description={post.pageDescription} active="blog">
        <div mix={[mainContent, card, prose]} innerHTML={unsafeHTML(body)} />
      </Document>
    )
  }
}

const prose = css({
  '& .blog-stats': {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'space-evenly',
    fontStyle: 'italic',
  },
  '& .blog-description': { fontStyle: 'italic' },
  '& img': { maxWidth: '100%', margin: 'auto', display: 'block' },
  '& figcaption': { fontStyle: 'italic', textAlign: 'center' },
  '& table': { margin: 'auto', textAlign: 'center' },
  '& th, & td': { paddingInline: '1em' },
  '& table, & th, & td': { border: '1px solid var(--light-color)', borderCollapse: 'collapse' },
  '& pre': {
    width: '100%',
    overflow: 'auto',
    paddingInline: '16px',
    backgroundColor: 'var(--dark-color)',
    boxShadow: 'inset 0 0 4px #000000',
  },
  '& hr': { border: '1px solid var(--dark-color)' },
})
