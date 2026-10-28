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
});
