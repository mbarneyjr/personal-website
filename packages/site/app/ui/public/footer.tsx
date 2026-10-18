import { clientEntry, css, type Handle } from 'remix/component';
import { border, color, layout, space, text } from './styles.ts';

interface FooterProps {
  attributes?: Record<string, { text: string; truncate?: boolean }>;
}

const statusIndicator = css({
  '&::before': {
    content: '""',
    width: '0.6em',
    height: '0.6em',
    borderRadius: '50%',
    background: 'currentColor',
  },
});

export const Footer = clientEntry(import.meta.url, function Footer(handle: Handle<FooterProps>) {
  return () => (
    <footer mix={[border.top, color.panel, space.padBlock2, text.small]}>
      <div mix={[layout.container, layout.cluster, space.rowGap1, space.columnGap4]}>
        <div mix={[layout.row, space.gap2, color.accent2, text.bold, statusIndicator]}>ONLINE</div>
        {Object.entries(handle.props.attributes ?? {}).map(([key, { text: value, truncate }]) => (
          <div key={key} mix={truncate ? [layout.shrink, text.truncate] : undefined} title={value}>
            <span mix={[text.label, color.muted]}>{key}</span> <span mix={[text.bold, color.accent1]}>{value}</span>
          </div>
        ))}
        <div mix={[layout.pushEnd, color.muted]}>© {new Date().getFullYear()} Michael Barney</div>
      </div>
    </footer>
  );
});
