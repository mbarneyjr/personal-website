import * as assert from 'remix/assert';
import { describe, it } from 'remix/test';

import { router } from '../router.ts';
import { routes } from '../routes.ts';

async function get(path: string) {
  return router.fetch(new URL(path, 'http://localhost'));
}

describe('pages', () => {
  for (const path of [routes.home.href(), routes.resume.href(), routes.blog.index.href()]) {
    it(`GET ${path} renders a page`, async () => {
      const response = await get(path);
      assert.equal(response.status, 200);
      assert.match(await response.text(), /<html[\s>]/);
    });
  }

  it('GET a blog post renders its body', async () => {
    const response = await get(routes.blog.show.href({ slug: 'write-your-own-neural-networks' }));
    assert.equal(response.status, 200);
    assert.match(await response.text(), /MultiLayer Perceptrons/);
  });

  it('GET an unknown blog post returns 404', async () => {
    const response = await get(routes.blog.show.href({ slug: 'missing' }));
    assert.equal(response.status, 404);
  });
});
