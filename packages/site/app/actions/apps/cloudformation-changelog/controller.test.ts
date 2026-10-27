import * as assert from 'remix/assert';
import { describe, it } from 'remix/test';

import { router } from '../../../router.ts';
import { routes } from '../../../routes.ts';

const base = routes.apps.cloudformationChangelog.index.href();

const listing =
  '<ListBucketResult><CommonPrefixes><Prefix>1.0.0/</Prefix></CommonPrefixes><CommonPrefixes><Prefix>2.0.0/</Prefix></CommonPrefixes></ListBucketResult>';

async function storage(input: string | URL | Request) {
  const url = new URL(input instanceof Request ? input.url : input);
  return url.searchParams.has('list-type') ? new Response(listing) : new Response(null, { status: 404 });
}

const index = (query: string) => router.fetch(new URL(`${base}${query}`, 'http://localhost'));

describe('changelog', () => {
  it('builds the hrefs under the apps prefix', () => {
    assert.equal(routes.apps.cloudformationChangelog.index.href(), '/apps/cloudformation-changelog');
    assert.equal(
      routes.apps.cloudformationChangelog.changes.href({ region: 'us-east-1', version: '1.0.0' }),
      '/apps/cloudformation-changelog/us-east-1/1.0.0',
    );
  });

  it('redirects an unknown region to the default region and latest version', async (t) => {
    t.mock.method(globalThis, 'fetch', storage);
    const response = await index('?region=xx-invalid-1');
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('Location'), `${base}?region=us-east-1&version=2.0.0`);
  });

  it('redirects an unknown version to the latest version of the region', async (t) => {
    t.mock.method(globalThis, 'fetch', storage);
    const response = await index('?region=eu-west-1&version=9.9.9');
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('Location'), `${base}?region=eu-west-1&version=2.0.0`);
  });

  it('renders valid or absent query values without a redirect', async (t) => {
    t.mock.method(globalThis, 'fetch', storage);
    assert.equal((await index('')).status, 200);
    assert.equal((await index('?region=eu-west-1&version=1.0.0')).status, 200);
  });

  it('rejects an unknown region', async () => {
    const href = routes.apps.cloudformationChangelog.changes.href({ region: 'xx-invalid-1', version: '1.0.0' });
    const response = await router.fetch(new URL(href, 'http://localhost'));
    assert.equal(response.status, 404);
  });
});
