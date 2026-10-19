import { routes } from '../../../routes.ts';
import { color, layout, space, text } from '../../public/styles.ts';
import { Document } from '../lib/document.tsx';
import { Section } from '../lib/section.tsx';
import { posts } from './posts.ts';

export function BlogIndexPage() {
  return () => (
    <Document title="Blog - Michael Barney" description="Posts by Michael Barney." active={routes.blog.index.href()}>
      <Section heading="POSTS">
        <ol mix={[layout.plainList, layout.stack, space.gap4]}>
          {posts.map((post) => (
            <li key={post.slug} mix={[layout.inventory, space.rowGap1]}>
              <time datetime={post.posted} mix={[text.label, text.tabular, color.muted]}>
                {post.posted}
              </time>
              <div mix={[layout.stack, space.gap1]}>
                <a href={routes.blog.show.href({ slug: post.slug })} mix={text.bold}>
                  {post.title}
                </a>
                <p mix={color.muted}>{post.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </Document>
  );
}
