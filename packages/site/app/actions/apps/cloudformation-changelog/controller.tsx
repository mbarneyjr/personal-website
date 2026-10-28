import { redirect } from 'remix/response/redirect';
import { createController } from 'remix/router';

import { routes } from '#app/routes.ts';
import { ChangelogChanges } from '#app/ui/pages/apps/cloudformation-changelog/changes.tsx';
import { compare } from '#app/ui/pages/apps/cloudformation-changelog/comparison.ts';
import { ChangelogPage } from '#app/ui/pages/apps/cloudformation-changelog/page.tsx';
import {
  listCfnVersions,
  neighbors,
  regions,
  specification,
} from '#app/ui/pages/apps/cloudformation-changelog/specification.ts';

export default createController(routes.apps.cloudformationChangelog, {
  actions: {
    async index(context) {
      const requestedRegion = context.url.searchParams.get('region') ?? '';
      const region = regions.includes(requestedRegion) ? requestedRegion : 'us-east-1';
      const versions = await listCfnVersions(region);
      const requestedVersion = context.url.searchParams.get('version') ?? '';
      const version = versions.includes(requestedVersion) ? requestedVersion : (versions.at(-1) as string);
      const headers = { 'Cache-Control': 'public, max-age=0, s-maxage=300' };
      if ((requestedRegion && requestedRegion !== region) || (requestedVersion && requestedVersion !== version)) {
        const query = new URLSearchParams({ region, version });
        return redirect(`${routes.apps.cloudformationChangelog.index.href()}?${query}`, { status: 302, headers });
      }
      const navigation = await neighbors(region, version, versions);
      return context.render(<ChangelogPage region={region} versions={versions} navigation={navigation} />, {
        headers,
      });
    },
    async changes(context) {
      const { region, version } = context.params;
      if (!regions.includes(region)) return new Response('Not Found', { status: 404 });
      try {
        const versions = await listCfnVersions(region);
        const index = versions.indexOf(version);
        if (index < 0) return new Response('Not Found', { status: 404 });
        const previous = versions[index - 1];
        const [before, after] = await Promise.all([
          previous ? specification(region, previous) : undefined,
          specification(region, version),
        ]);
        return context.render(<ChangelogChanges changelog={compare(before, after)} />);
      } catch (error) {
        console.error(`changes ${region}/${version} failed`, error);
        return context.render(
          <ChangelogChanges error={`The ${region} specification for ${version} did not download.`} />,
          {
            headers: { 'Cache-Control': 'no-store' },
          },
        );
      }
    },
  },
});
