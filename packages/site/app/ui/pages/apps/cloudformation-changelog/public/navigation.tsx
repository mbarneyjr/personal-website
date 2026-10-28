import { clientEntry, css, type Handle, on, type RemixNode } from 'remix/component';
import { routes } from '#app/routes.ts';
import type { Neighbor } from '#app/ui/pages/apps/cloudformation-changelog/specification.ts';
import { color, layout, space, text } from '#app/ui/public/styles.ts';

interface ChangelogNavigationProps {
  regions: string[];
  region: string;
  versions: string[];
  version: string;
  date?: string;
  previous?: Neighbor;
  next?: Neighbor;
  children?: RemixNode;
}

const grid = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: 'var(--space-3)',
});

const dateSlot = css({ minBlockSize: '1lh', minInlineSize: '10ch' });

const selectors = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'var(--space-2)',
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
});

const select = css({
  width: '100%',
  font: 'inherit',
  color: 'var(--color-accent-1)',
  backgroundColor: 'var(--color-bg)',
  border: '1px solid currentColor',
  borderRadius: 0,
  padding: 'var(--space-1) var(--space-4)',
  textAlign: 'center',
  textAlignLast: 'center',
  appearance: 'none',
  backgroundImage:
    'linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)',
  backgroundSize: 'var(--space-1) var(--space-1)',
  backgroundPosition: 'calc(100% - var(--space-3) - var(--space-1)) 50%, calc(100% - var(--space-3)) 50%',
  backgroundRepeat: 'no-repeat',
});

export const ChangelogNavigation = clientEntry(
  import.meta.url,
  function ChangelogNavigation(handle: Handle<ChangelogNavigationProps>) {
    let pending = false;
    let rendered = '';
    let target = '';

    function start() {
      pending = true;
      handle.update();
    }

    return () => {
      const { regions, region, versions, version, date, previous, next, children } = handle.props;
      const current = `${region}/${version}`;
      if (current !== rendered) {
        rendered = current;
        pending = false;
        target = version;
      }
      const index = versions.indexOf(target);
      const neighbors = { previous: versions[index - 1], next: versions[index + 1] };
      const server = { previous, next };
      const link = (direction: 'previous' | 'next') => {
        const value = neighbors[direction];
        if (!value) return undefined;
        const neighbor = server[direction]?.version === value ? server[direction] : { version: value };
        const href = `${routes.apps.cloudformationChangelog.index.href()}?${new URLSearchParams({ region, version: value })}`;
        return (
          <a
            href={href}
            rel={direction === 'previous' ? 'prev' : 'next'}
            mix={[
              layout.stack,
              text.noUnderline,
              direction === 'next' && text.alignEnd,
              on('click', (event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                target = value;
                start();
                location.assign(href);
              }),
            ]}
          >
            <span mix={text.nowrap}>{direction === 'previous' ? `← ${value}` : `${value} →`}</span>
            <time datetime={neighbor?.date} mix={[text.small, text.tabular, text.nowrap, color.muted, dateSlot]}>
              {neighbor?.date}
            </time>
          </a>
        );
      };
      const bar = (
        <nav aria-label="Specification versions" mix={[grid, text.small]}>
          <div mix={layout.row}>{link('previous')}</div>
          <form
            method="get"
            action={routes.apps.cloudformationChangelog.index.href()}
            mix={[
              selectors,
              on('change', (event) => {
                const data = new FormData(event.currentTarget);
                if (data.get('region') === region) target = String(data.get('version'));
                start();
                event.currentTarget.requestSubmit();
              }),
            ]}
          >
            <select name="region" aria-label="Region" mix={select}>
              {regions.map((value) => (
                <option key={value} value={value} selected={value === region}>
                  {value}
                </option>
              ))}
            </select>
            <select name="version" aria-label="Version" mix={select}>
              {versions.toReversed().map((value) => (
                <option key={value} value={value} selected={value === target}>
                  {value}
                </option>
              ))}
            </select>
            <time
              datetime={target === version ? date : undefined}
              mix={[layout.fullSpan, text.small, text.tabular, text.alignCenter, color.muted, dateSlot]}
            >
              {target === version && date}
            </time>
            <noscript>
              <button type="submit">show</button>
            </noscript>
          </form>
          <div mix={[layout.row, layout.justifyEnd]}>{link('next')}</div>
        </nav>
      );
      return (
        <div mix={[layout.stack, space.gap4]}>
          {bar}
          {pending && <p mix={color.muted}>Loading changes…</p>}
          <div hidden={pending}>{children}</div>
          {bar}
        </div>
      );
    };
  },
);
