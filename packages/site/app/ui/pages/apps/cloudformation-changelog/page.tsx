import { Frame, type Handle } from 'remix/component';
import { routes } from '#app/routes.ts';
import { Document } from '#app/ui/pages/lib/document.tsx';
import { color, layout, space, text } from '#app/ui/public/styles.ts';
import { ChangelogNavigation } from './public/navigation.tsx';
import { type Neighbor, regions } from './specification.ts';

interface ChangelogPageProps {
  region: string;
  versions: string[];
  navigation: { previous?: Neighbor; current: Neighbor; next?: Neighbor };
}

export function ChangelogPage(handle: Handle<ChangelogPageProps>) {
  return () => {
    const { region, versions, navigation } = handle.props;
    const version = navigation.current.version;
    return (
      <Document
        title="CloudFormation Changelog - Michael Barney"
        description="Changes between versions of the AWS CloudFormation resource specification."
        path={routes.apps.cloudformationChangelog.index.href()}
      >
        <div mix={[layout.stack, space.gap4]}>
          <header mix={[layout.stack, space.gap2]}>
            <h1 mix={text.title}>CloudFormation Changelog</h1>
            <p mix={color.muted}>Changes to the CloudFormation resource specification.</p>
          </header>
          <ChangelogNavigation
            regions={regions}
            region={region}
            versions={versions}
            version={version}
            date={navigation.current.date}
            previous={navigation.previous}
            next={navigation.next}
          >
            <Frame src={routes.apps.cloudformationChangelog.changes.href({ region, version })} />
          </ChangelogNavigation>
        </div>
      </Document>
    );
  };
}
