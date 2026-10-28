import { css, type Handle, type RemixNode } from 'remix/component';
import { border, layout, space, text } from '#app/ui/public/styles.ts';

export const headingPrefix = css({
  '&::before': {
    content: '"■"',
    color: 'var(--color-muted)',
  },
});

export const section = [layout.stack, space.gap4];
export const sectionHeading = [headingPrefix, text.heading, border.ruleSolid];

interface SectionProps {
  heading: string;
  children?: RemixNode;
}

export function Section(handle: Handle<SectionProps>) {
  return () => (
    <section mix={section}>
      <h2 mix={sectionHeading}>{handle.props.heading}</h2>
      {handle.props.children}
    </section>
  );
}
