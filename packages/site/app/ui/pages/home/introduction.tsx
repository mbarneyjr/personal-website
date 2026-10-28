import { css } from 'remix/component';
import { section } from '#app/ui/pages/lib/section.tsx';
import { Portrait } from '#app/ui/public/portrait.tsx';
import { text } from '#app/ui/public/styles.ts';
import { Banner } from './banner.tsx';
import { profile } from './data.tsx';
import { InventoryList } from './inventory.tsx';
import { group } from './styles.ts';

const introductionStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: 'var(--space-4)',
  alignItems: 'start',
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
});

export function Introduction() {
  return () => (
    <section mix={section}>
      <Banner />
      <div mix={introductionStyle}>
        <div mix={group}>
          <h1 mix={text.title}>Howdy, I'm Michael</h1>
          <InventoryList items={profile} />
        </div>
        <Portrait />
      </div>
    </section>
  );
}
