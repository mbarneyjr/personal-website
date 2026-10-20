import { clientEntry, css, type Handle, ref } from 'remix/component';
import { color, layout, text } from './styles.ts';

const portraitStyle = css({
  width: '10rem',
  '& img': { width: '100%', height: 'auto', border: '1px solid var(--color-rule)' },
  '& > div': { display: 'grid' },
  '& > div > img': { gridArea: '1 / 1' },
  '& > div > img:nth-child(2)': { opacity: 0, pointerEvents: 'none' },
  '&[data-active] > div > img:nth-child(2)': { opacity: 1 },
  '@media (hover: hover)': { '&:hover > div > img:nth-child(2)': { opacity: 1 } },
});

export const Portrait = clientEntry(import.meta.url, function Portrait(handle: Handle) {
  let active = false;

  function track(figure: Element, signal: AbortSignal) {
    document.addEventListener(
      'pointerdown',
      (event) => {
        const next = event.pointerType === 'touch' && figure.contains(event.target as Node) && !active;
        if (next === active) return;
        active = next;
        handle.update();
      },
      { signal },
    );
  }

  return () => (
    <figure mix={[portraitStyle, ref(track)]} data-active={active ? '' : undefined}>
      <div>
        <img src="/images/mbarney.webp" alt="Michael Barney" width="320" height="320" />
        <img src="/images/hat.webp" alt="" width="320" height="320" />
      </div>
      <figcaption mix={[layout.row, layout.justifyBetween, text.label, color.accent2]}>
        <span>FIG. 01</span>
        <span>OPERATOR</span>
      </figcaption>
    </figure>
  );
});
