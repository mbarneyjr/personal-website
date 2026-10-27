import { css } from 'remix/component';

export const layout = {
  /** Centered content column with the page gutter on both sides. */
  container: css({
    width: '100%',
    maxWidth: 'var(--content-width)',
    marginInline: 'auto',
    paddingInline: 'var(--gutter)',
  }),
  /** One horizontal line of items, vertically centered. Items do not wrap. */
  row: css({ display: 'flex', alignItems: 'center' }),
  /** Same as `row`, but flows inline with the surrounding text. */
  inlineRow: css({ display: 'inline-flex', alignItems: 'center' }),
  /** Horizontal items that wrap to new lines when space runs out. */
  cluster: css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }),
  /** Vertical list of items. The column can shrink below its content width. */
  stack: css({ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', alignContent: 'start' }),
  /** Responsive columns, each at least `--column-min` wide. The count changes with the available width. */
  columns: css({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(var(--column-min), 1fr))' }),
  /** Items start at their content width, grow to fill the row, and move to a new row when they do not fit. */
  wrap: css({ display: 'flex', flexWrap: 'wrap', alignItems: 'start', '& > *': { flex: '1 1 max-content' } }),
  /** Two columns: flexible content on the left, content-sized on the right. */
  split: css({ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', alignItems: 'start' }),
  /** Two-column term and value list for `dl` elements. */
  inventory: css({
    display: 'grid',
    gridTemplateColumns: 'max-content minmax(0, 1fr)',
    columnGap: 'var(--space-4)',
    overflowWrap: 'anywhere',
  }),
  /** Centers the children on both axes. */
  center: css({ display: 'grid', placeItems: 'center' }),
  alignStart: css({ alignItems: 'start' }),
  alignEnd: css({ alignItems: 'end' }),
  justifyBetween: css({ justifyContent: 'space-between' }),
  justifyEnd: css({ justifyContent: 'end' }),
  /** Pushes this item and all items after it to the end of a flex row. */
  pushEnd: css({ marginLeft: 'auto' }),
  /** Takes all free space in a flex row, and can shrink to zero. */
  grow: css({ flex: '1 1 0', minWidth: 0 }),
  /** Shrinks from its content width down to `--shrink-basis` before the row wraps. */
  shrink: css({ flex: '1 1 var(--shrink-basis)', maxWidth: 'max-content' }),
  /** Keeps its content size in a flex row. It does not grow or shrink. */
  fixed: css({ flex: 'none' }),
  fullWidth: css({ width: '100%' }),
  /** Spans all columns of the parent grid. */
  fullSpan: css({ gridColumn: '1 / -1' }),
  /** Removes list bullets and indentation. */
  plainList: css({ listStyle: 'none', padding: 0 }),
  /** Scrolls horizontally when the content is wider than the element. */
  scrollX: css({ overflowX: 'auto' }),
  sticky: css({ position: 'sticky', top: 0 }),
  /** Hides the element on screen but keeps it for screen readers. */
  visuallyHidden: css({
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  }),
};

export const space = {
  gap1: css({ gap: 'var(--space-1)' }),
  gap2: css({ gap: 'var(--space-2)' }),
  gap3: css({ gap: 'var(--space-3)' }),
  gap4: css({ gap: 'var(--space-4)' }),
  gap5: css({ gap: 'var(--space-5)' }),
  rowGap1: css({ rowGap: 'var(--space-1)' }),
  rowGap2: css({ rowGap: 'var(--space-2)' }),
  rowGap3: css({ rowGap: 'var(--space-3)' }),
  rowGap4: css({ rowGap: 'var(--space-4)' }),
  rowGap5: css({ rowGap: 'var(--space-5)' }),
  columnGap1: css({ columnGap: 'var(--space-1)' }),
  columnGap2: css({ columnGap: 'var(--space-2)' }),
  columnGap3: css({ columnGap: 'var(--space-3)' }),
  columnGap4: css({ columnGap: 'var(--space-4)' }),
  columnGap5: css({ columnGap: 'var(--space-5)' }),
  pad1: css({ padding: 'var(--space-1)' }),
  pad2: css({ padding: 'var(--space-2)' }),
  pad3: css({ padding: 'var(--space-3)' }),
  pad4: css({ padding: 'var(--space-4)' }),
  pad5: css({ padding: 'var(--space-5)' }),
  padBlock1: css({ paddingBlock: 'var(--space-1)' }),
  padBlock2: css({ paddingBlock: 'var(--space-2)' }),
  padBlock3: css({ paddingBlock: 'var(--space-3)' }),
  padBlock4: css({ paddingBlock: 'var(--space-4)' }),
  padBlock5: css({ paddingBlock: 'var(--space-5)' }),
  padInline1: css({ paddingInline: 'var(--space-1)' }),
  padInline2: css({ paddingInline: 'var(--space-2)' }),
  padInline3: css({ paddingInline: 'var(--space-3)' }),
  padInline4: css({ paddingInline: 'var(--space-4)' }),
  padInline5: css({ paddingInline: 'var(--space-5)' }),
};

export const text = {
  /** Page title (`h1`). */
  title: css({ fontSize: 'var(--text-xl)', fontWeight: 'bold', lineHeight: 'var(--leading-tight)' }),
  /** Secondary title, one step below `title`. */
  subtitle: css({ fontSize: 'var(--text-lg)', fontWeight: 'bold', lineHeight: 'var(--leading-tight)' }),
  /** Section heading (`h2`): bold uppercase at body size. */
  heading: css({
    fontSize: 'var(--text-base)',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 'var(--tracking-label)',
  }),
  /** Small uppercase text for terms, keys, and captions. */
  label: css({ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)' }),
  small: css({ fontSize: 'var(--text-sm)' }),
  base: css({ fontSize: 'var(--text-base)' }),
  large: css({ fontSize: 'var(--text-lg)' }),
  bold: css({ fontWeight: 'bold' }),
  regular: css({ fontWeight: 'normal' }),
  italic: css({ fontStyle: 'italic' }),
  /** Uppercase with label letter spacing, at the current size. */
  uppercase: css({ textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)' }),
  /** Line height for headings and multi-line titles. */
  tight: css({ lineHeight: 'var(--leading-tight)' }),
  /** Equal-width digits, so numbers align in columns. */
  tabular: css({ fontVariantNumeric: 'tabular-nums' }),
  alignCenter: css({ textAlign: 'center' }),
  alignEnd: css({ textAlign: 'end' }),
  nowrap: css({ whiteSpace: 'nowrap' }),
  /** Lets long words and URLs break onto the next line. */
  breakAnywhere: css({ overflowWrap: 'anywhere' }),
  /** One line. Text that does not fit ends with an ellipsis. */
  truncate: css({ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
  noUnderline: css({ textDecoration: 'none' }),
};

export const color = {
  fg: css({ color: 'var(--color-fg)' }),
  muted: css({ color: 'var(--color-muted)' }),
  /** Interactive color: links, buttons, focus. */
  accent1: css({ color: 'var(--color-accent-1)' }),
  /** System data color: status, footer values, project stacks, captions. */
  accent2: css({ color: 'var(--color-accent-2)' }),
  /** System data that is removed. */
  alert: css({ color: 'var(--color-alert)' }),
  /** System data that is modified. */
  caution: css({ color: 'var(--color-caution)' }),
  bg: css({ backgroundColor: 'var(--color-bg)' }),
  panel: css({ backgroundColor: 'var(--color-panel)' }),
  /** Foreground and background colors swapped. Used for the current navigation link. */
  inverted: css({ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }),
  /** Accent 1 background with page-background text. */
  accent1Fill: css({ backgroundColor: 'var(--color-accent-1)', color: 'var(--color-bg)' }),
  /** Accent 2 background with page-background text. */
  accent2Fill: css({ backgroundColor: 'var(--color-accent-2)', color: 'var(--color-bg)' }),
};

export const border = {
  top: css({ borderTop: '1px dashed var(--color-rule)' }),
  bottom: css({ borderBottom: '1px dashed var(--color-rule)' }),
  start: css({ borderInlineStart: '1px dashed var(--color-rule)' }),
  end: css({ borderInlineEnd: '1px dashed var(--color-rule)' }),
  all: css({ border: '1px dashed var(--color-rule)' }),
  topSolid: css({ borderTop: '1px solid var(--color-rule)' }),
  bottomSolid: css({ borderBottom: '1px solid var(--color-rule)' }),
  allSolid: css({ border: '1px solid var(--color-rule)' }),
  /** Solid border in the text color, for emphasis. */
  allStrong: css({ border: '1px solid var(--color-fg)' }),
  none: css({ border: 'none' }),
  /** Adds a solid line in the text color after the content, to the end of the row. Used for `h2`. */
  ruleSolid: css({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    '&::after': { content: '""', flex: 1, borderTop: '1px solid var(--color-fg)' },
  }),
  /** Adds a dashed divider line after the content, to the end of the row. */
  ruleDashed: css({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    '&::after': { content: '""', flex: 1, borderTop: '1px dashed var(--color-rule)' },
  }),
  /** Adds a dotted divider line after the content, to the end of the row. Used for `h3`. */
  ruleDotted: css({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    '&::after': { content: '""', flex: 1, borderTop: '1px dotted var(--color-rule)' },
  }),
};

export const motion = {
  /** Animates color changes, for example on hover. Off when the user prefers reduced motion. */
  transition: css({
    transitionProperty: 'color, background-color, border-color',
    transitionDuration: 'var(--duration-fast)',
    transitionTimingFunction: 'var(--easing-standard)',
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  }),
  /** Repeating on and off blink, for status indicators. Off when the user prefers reduced motion. */
  blink: css({
    '@keyframes blink': { '50%': { opacity: 0 } },
    animation: 'blink var(--duration-blink) steps(1) infinite',
    '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  }),
};
