import { css, type Handle } from 'remix/component';
import { border, color, layout, space, text } from '#app/ui/public/styles.ts';
import type { Block, Changelog, Line, Mark, Segment, Status } from './comparison.ts';
import { ExpandControls } from './public/expand-controls.tsx';

const tone = (token: string) => css({ color: token, '--link-color': token });

const mutedTone = tone('var(--color-muted)');

const disclosure = css({ '&:not([open])': { rowGap: 0 } });

const breakable = (name: string) => name.split(/(?<=::)/).flatMap((part, index) => (index ? [<wbr />, part] : part));

const heading = css({ position: 'relative', justifySelf: 'start', paddingInlineEnd: 'var(--space-4)' });

const anchor = css({
  position: 'absolute',
  insetBlockStart: 0,
  insetInlineEnd: 0,
  display: 'flex',
  alignItems: 'center',
  height: '1lh',
  '--link-color': 'var(--color-muted)',
  opacity: 0,
  ':hover > &': { opacity: 1 },
  '&:focus-visible': { opacity: 1 },
  '@media (hover: none)': { opacity: 1 },
});

const anchorIcon = css({
  width: '1em',
  height: '1em',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

function AnchorLink(handle: Handle<{ block: Block }>) {
  return () => {
    const { block } = handle.props;
    return (
      <a href={`#${block.id}`} mix={anchor}>
        <span mix={layout.visuallyHidden}>Link to {block.name}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" mix={anchorIcon}>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </a>
    );
  };
}

const marks: Record<Mark, { label: string; mix: ReturnType<typeof css> }> = {
  '+': { label: 'added', mix: tone('var(--color-added)') },
  '-': { label: 'removed', mix: tone('var(--color-alert)') },
  '~': { label: 'modified', mix: tone('var(--color-caution)') },
};

const groupTitles: [Status, string][] = [
  ['added', 'New resource types'],
  ['modified', 'Changed resource types'],
  ['removed', 'Removed resource types'],
];

const statusMarks: Record<Status, Mark> = { added: '+', modified: '~', removed: '-' };

const unselectable = css({ userSelect: 'none' });

const code = css({
  overflowX: 'auto',
  padding: 'var(--space-3)',
  backgroundColor: 'var(--color-panel)',
  fontSize: 'var(--text-sm)',
  lineHeight: 'var(--leading-base)',
  '--link-color': 'var(--color-fg)',
  '& code': { counterReset: 'line' },
  '& :target': { backgroundColor: 'var(--color-rule)' },
});

const gutter = css({
  counterIncrement: 'line',
  userSelect: 'none',
  '&::after': {
    content: 'counter(line)',
    display: 'inline-block',
    width: 'var(--line-number-width)',
    margin: '0 var(--space-3)',
    textAlign: 'right',
    color: 'var(--color-muted)',
  },
});

function Link(handle: Handle<{ segment: Segment }>) {
  return () => {
    const { segment } = handle.props;
    return segment.href ? <a href={segment.href}>{segment.text}</a> : segment.text;
  };
}

function YamlLine(handle: Handle<{ line: Line }>) {
  return () => {
    const { line } = handle.props;
    const mark = line.mark ? marks[line.mark] : undefined;
    const indent = '  '.repeat(Math.max(0, line.depth - (line.dash ? 1 : 0)));
    return (
      <span id={line.id} mix={mark?.mix}>
        <span aria-hidden="true" mix={gutter}>
          {line.mark ?? ' '}
        </span>
        {mark && <span mix={[layout.visuallyHidden, unselectable]}>{mark.label}: </span>}
        {indent}
        {line.dash && '- '}
        {line.key && (
          <>
            <Link segment={line.key} />:
          </>
        )}
        {line.value && (
          <>
            {line.key && ' '}
            <Link segment={line.value} />
          </>
        )}
        {line.comment && (
          <span mix={mark ? undefined : mutedTone}>
            {(line.key || line.value) && '  '}# <Link segment={line.comment} />
          </span>
        )}
        {'\n'}
      </span>
    );
  };
}

interface ChangelogChangesProps {
  changelog?: Changelog;
  error?: string;
}

export function ChangelogChanges(handle: Handle<ChangelogChangesProps>) {
  return () => {
    const { changelog, error } = handle.props;
    if (!changelog) return <p mix={color.alert}>{error}</p>;
    const count = (status: string) => changelog.blocks.filter((block) => block.status === status).length;
    const groups = groupTitles
      .map(([status, title]) => ({
        status,
        title,
        blocks: changelog.blocks.filter((block) => block.status === status),
      }))
      .filter((group) => group.blocks.length > 0);
    const summary = [
      { term: 'ADDED', value: count('added') },
      { term: 'REMOVED', value: count('removed') },
      { term: 'MODIFIED', value: count('modified') },
      { term: 'DOCUMENTATION', value: changelog.documentation },
    ];
    return (
      <div mix={[layout.stack, space.gap4]}>
        <div mix={[layout.stack, space.gap2]}>
          <dl mix={[layout.cluster, space.rowGap1, space.columnGap4, text.small]}>
            {summary.map((item) => (
              <div key={item.term} mix={[layout.row, space.gap2]}>
                <dt mix={[text.label, color.muted]}>{item.term}</dt>
                <dd mix={[text.bold, text.tabular]}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {changelog.blocks.length === 0 && <p mix={color.muted}>No changes.</p>}{' '}
        {groups.map((group) => (
          <section key={group.status} mix={[layout.stack, space.gap4]}>
            <h2 mix={[text.heading, border.ruleSolid]}>{group.title}</h2>
            {group.status !== 'removed' && <ExpandControls />}
            <div mix={[layout.stack, space.gap2]}>
              {group.blocks.map((block) => {
                if (block.status === 'removed') {
                  return (
                    <h3
                      key={block.name}
                      id={block.id}
                      mix={[text.bold, text.breakAnywhere, heading, marks[statusMarks[block.status]].mix]}
                    >
                      {breakable(block.name)}
                      <AnchorLink block={block} />
                    </h3>
                  );
                }
                return (
                  <details key={block.name} id={block.id} mix={[layout.stack, space.gap2, disclosure]}>
                    <summary mix={[text.bold, text.breakAnywhere, heading, marks[statusMarks[block.status]].mix]}>
                      {breakable(block.name)}
                      <AnchorLink block={block} />
                    </summary>
                    <pre mix={[code, border.allSolid]}>
                      <code>
                        {block.lines.map((line, index) => (
                          <YamlLine key={index} line={block.status === 'added' ? { ...line, mark: undefined } : line} />
                        ))}
                      </code>
                    </pre>
                  </details>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    );
  };
}
