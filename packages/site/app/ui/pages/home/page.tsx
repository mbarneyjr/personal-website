import { routes } from '#app/routes.ts';
import { Document } from '#app/ui/pages/lib/document.tsx';
import { aws, homelab } from './data.tsx';
import { Introduction } from './introduction.tsx';
import { InventorySection } from './inventory.tsx';
import { Operator } from './operator.tsx';
import { Projects } from './projects.tsx';

export function HomePage() {
  return () => (
    <Document description="The personal website of Michael Barney." path={routes.home.href()}>
      <Introduction />
      <Operator />
      <InventorySection heading="HOMELAB" groups={homelab} />
      <InventorySection heading="AWS" groups={aws} />
      <Projects />
    </Document>
  );
}
