import { clientEntry, css, type Handle, on, ref } from 'remix/component';
import { routes } from '../../routes.ts';
import { border, color, layout, space, text } from './styles.ts';
import { ThemeControl } from './theme-control.tsx';

interface NavBarProps {
  pages: Array<{ text: string; href: string }>;
  active?: string;
}

const menuStyle = css({
  positionArea: 'bottom span-left',
  padding: 'var(--space-2)',
  '& a': { display: 'block', padding: 'var(--space-3)' },
});

export const NavBar = clientEntry(import.meta.url, function NavBar(handle: Handle<NavBarProps>) {
  let collapsed = false;
  let neededWidth = 0;

  function observe(row: Element, signal: AbortSignal) {
    const observer = new ResizeObserver(() => {
      if (!collapsed) neededWidth = row.scrollWidth;
      const next = row.clientWidth < neededWidth;
      if (next !== collapsed) {
        collapsed = next;
        handle.update();
      }
    });
    observer.observe(row);
    signal.addEventListener('abort', () => observer.disconnect());
  }

  return () => {
    const links = handle.props.pages.map((page) => (
      <li key={page.href}>
        <a
          href={page.href}
          aria-current={page.href === handle.props.active ? 'page' : undefined}
          mix={page.href === handle.props.active ? color.inverted : undefined}
        >
          /{page.text}
        </a>
      </li>
    ));

    return (
      <nav mix={[border.bottom, space.padBlock2]}>
        <div mix={layout.container}>
          <div mix={[layout.row, space.gap4, ref(observe)]}>
            <a href={routes.home.href()}>barney.dev</a>
            {collapsed ? (
              <>
                <button type="button" popovertarget="nav-menu" mix={layout.pushEnd}>
                  menu
                </button>
                <ul
                  id="nav-menu"
                  popover
                  mix={[
                    layout.plainList,
                    border.all,
                    menuStyle,
                    on('click', (event) => {
                      if ((event.target as Element).closest('a')) event.currentTarget.hidePopover();
                    }),
                  ]}
                >
                  {links}
                </ul>
              </>
            ) : (
              <ul mix={[layout.plainList, layout.row, layout.pushEnd, space.gap3, text.nowrap]}>{links}</ul>
            )}
            <ThemeControl />
          </div>
        </div>
      </nav>
    );
  };
});
