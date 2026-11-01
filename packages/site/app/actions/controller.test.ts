import * as assert from 'remix/assert';
import { describe, it } from 'remix/test';

import { router } from '#app/router.ts';
import { routes } from '#app/routes.ts';

describe('root', () => {
  it(`GET ${routes.home.href()} returns the home page`, async () => {
    const response = await router.fetch(new URL(routes.home.href(), 'http://localhost'));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') ?? '', /text\/html/);
    assert.match(await response.text(), /<title>Michael Barney<\/title>/);
  });

  it('redirects the changelog to cfn.fyi with the query', async () => {
    const response = await router.fetch(
      new URL('/apps/cloudformation-changelog?region=eu-west-1&version=1.0.0', 'http://localhost'),
    );
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('Location'), 'https://cfn.fyi/?region=eu-west-1&version=1.0.0');
  });

  it('redirects changelog sub-paths to cfn.fyi', async () => {
    const response = await router.fetch(new URL('/apps/cloudformation-changelog/us-east-1/1.0.0', 'http://localhost'));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('Location'), 'https://cfn.fyi/');
  });
});
