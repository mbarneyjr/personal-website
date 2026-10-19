import { css } from 'remix/component';
import { color, layout, space, text } from '../../public/styles.ts';

export const group = [layout.stack, space.gap2];
export const groupHeading = [text.label, color.muted];
export const inventory = [layout.stack, space.gap1];
export const entry = css({ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' });
export const term = [layout.fixed, text.label, color.muted];
export const value = [
  layout.grow,
  text.alignEnd,
  text.breakAnywhere,
  css({
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--space-2)',
    '&::before': {
      content: '""',
      flex: 1,
      minWidth: 'var(--space-3)',
      alignSelf: 'start',
      height: '0.5lh',
      borderBottom: '1px dashed var(--color-rule)',
    },
  }),
];
