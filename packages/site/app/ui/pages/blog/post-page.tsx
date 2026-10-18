import { css, type Handle, unsafeHTML } from 'remix/component';
import { routes } from '../../../routes.ts';
import { border, color, layout, space, text } from '../../public/styles.ts';
import { Document } from '../lib/document.tsx';
import type { Post } from './posts.ts';

const prose = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: 'var(--space-3)',
  '& h2': {
    marginTop: 'var(--space-4)',
    fontSize: 'var(--text-lg)',
    lineHeight: 'var(--leading-tight)',
    '&::before': { content: '"■ "', color: 'var(--color-muted)' },
  },
  '& h3': { marginTop: 'var(--space-3)', fontSize: 'var(--text-base)' },
  '& ul, & ol': {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: 'var(--space-2)',
    paddingInlineStart: '3ch',
  },
  '& li > pre': { marginTop: 'var(--space-2)' },
  '& blockquote': {
    paddingInlineStart: '2ch',
    borderInlineStart: '2px solid var(--color-rule)',
    color: 'var(--color-muted)',
  },
  '& code': { backgroundColor: 'var(--color-panel)', paddingInline: '0.25em' },
  '& pre': {
    overflowX: 'auto',
    padding: 'var(--space-3)',
    border: '1px solid var(--color-rule)',
    backgroundColor: 'var(--color-panel)',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--leading-base)',
  },
  '& pre code': { padding: 0 },
  '& table': {
    justifySelf: 'start',
    borderCollapse: 'collapse',
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'center',
  },
  '& th, & td': { paddingInline: 'var(--space-3)', border: '1px solid var(--color-rule)' },
  '& figure': { display: 'grid', gap: 'var(--space-2)', marginBlock: 'var(--space-3)' },
  '& figure > img, & figure > svg': { marginInline: 'auto', height: 'auto' },
  '& figcaption': { fontSize: 'var(--text-sm)', color: 'var(--color-muted)', textAlign: 'center' },
  '& svg': { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, fontSize: '14px' },
  '& svg text': { fill: 'currentColor', stroke: 'none', textAnchor: 'middle', dominantBaseline: 'central' },
  '& math[display="block"]': { overflowX: 'auto', fontSize: 'var(--text-lg)' },
});

interface BlogPostPageProps {
  post: Post;
  body: string;
  minutes: number;
}

export function BlogPostPage(handle: Handle<BlogPostPageProps>) {
  return () => {
    const { post, body, minutes } = handle.props;
    const details = [
      { term: 'POSTED', value: post.posted },
      ...(post.updated ? [{ term: 'UPDATED', value: post.updated }] : []),
      { term: 'READ', value: `${minutes} MIN` },
    ];
    return (
      <Document
        title={`${post.title} - Michael Barney`}
        description={post.description}
        active={routes.blog.index.href()}
      >
        <article mix={[layout.stack, space.gap4]}>
          <header mix={[layout.stack, space.gap2, border.bottom, space.padBlock3]}>
            <h1 mix={text.title}>{post.title}</h1>
            <dl mix={[layout.cluster, space.rowGap1, space.columnGap4, text.small]}>
              {details.map((detail) => (
                <div key={detail.term} mix={[layout.row, space.gap2]}>
                  <dt mix={[text.label, color.muted]}>{detail.term}</dt>
                  <dd mix={[text.bold, text.tabular, color.accent2]}>{detail.value}</dd>
                </div>
              ))}
            </dl>
            <p mix={color.muted}>{post.description}</p>
          </header>
          <div mix={prose} innerHTML={unsafeHTML(body)} />
        </article>
      </Document>
    );
  };
}
