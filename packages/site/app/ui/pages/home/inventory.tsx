import type { Handle } from 'remix/component';
import { Section } from '#app/ui/pages/lib/section.tsx';
import { layout, space, text } from '#app/ui/public/styles.ts';
import type { InventoryGroup, InventoryItem } from './data.tsx';
import { entry, group, groupHeading, inventory, term, value } from './styles.ts';

export function InventoryList(handle: Handle<{ items: InventoryItem[] }>) {
  return () => (
    <dl mix={inventory}>
      {handle.props.items.map((item) => (
        <div key={item.term} mix={[entry]}>
          <dt mix={[term, text.italic]}>{item.term}</dt>
          <dd mix={value}>
            <span>{item.value}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Inventory(handle: Handle<InventoryGroup>) {
  return () => (
    <div mix={group}>
      <h3 mix={groupHeading}>{handle.props.heading}</h3>
      <InventoryList items={handle.props.items} />
    </div>
  );
}

export function InventorySection(handle: Handle<{ heading: string; groups: InventoryGroup[] }>) {
  return () => (
    <Section heading={handle.props.heading}>
      <div mix={[layout.wrap, space.gap4]}>
        {handle.props.groups.map((item) => (
          <Inventory key={item.heading} heading={item.heading} items={item.items} />
        ))}
      </div>
    </Section>
  );
}
