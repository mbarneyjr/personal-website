import { css, type Handle, on } from 'remix/component';
import { layout, text } from './styles.ts';

const themes = ['auto', 'light', 'dark'] as const;
type Theme = (typeof themes)[number];

const fixedWidth = css({
  boxSizing: 'content-box',
  width: `${3 + Math.max(...themes.map((theme) => theme.length))}ch`,
});

export function ThemeControl(handle: Handle) {
  let theme: Theme = 'auto';

  function apply(next: Theme) {
    theme = next;
    if (theme === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
  }

  handle.queueTask(() => {
    const current = document.documentElement.dataset.theme;
    if (current === 'light' || current === 'dark') {
      theme = current;
      handle.update();
    }
  });

  function select() {
    apply(themes[(themes.indexOf(theme) + 1) % themes.length]);
    try {
      if (theme === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', theme);
    } catch {}
    handle.update();
  }

  return () => (
    <button
      type="button"
      aria-label={`Color theme: ${theme}`}
      mix={[on('click', select), fixedWidth, layout.fixed, text.alignCenter]}
    >
      ◐ {theme}
    </button>
  );
}
