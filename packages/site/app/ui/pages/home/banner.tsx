import { css } from 'remix/component';
import { color, text } from '../../public/styles.ts';

const banner = String.raw` _                                 _
| |__  __ _ _ _ _ _  ___ _  _   __| |_____ __
| '_ \/ _${'`'} | '_| ' \/ -_) || |_/ _${'`'} / -_) V /
|_.__/\__,_|_| |_||_\___|\_, (_)__,_\___|\_/
                         |__/`;

export function Banner() {
  return () => (
    <pre
      aria-hidden="true"
      mix={[
        color.accent2,
        text.bold,
        css({
          fontSize: 'clamp(0.55rem, 2.4vw, 1rem)',
          lineHeight: 'var(--leading-tight)',
          overflow: 'hidden',
        }),
      ]}
    >
      {banner}
    </pre>
  );
}
