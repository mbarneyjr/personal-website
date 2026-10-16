import { fileURLToPath } from 'node:url';
import { compression } from 'remix/middleware/compression';
import { render } from 'remix/middleware/render';
import { staticFiles } from 'remix/middleware/static';
import { createRouter, type Middleware, type MiddlewareContext } from 'remix/router';

import blogController from './actions/blog/controller.tsx';
import controller from './actions/controller.tsx';
import { assets } from './assets.ts';
import { routes } from './routes.ts';

const renderMiddleware = render({ assets });
type AppContext = MiddlewareContext<[typeof renderMiddleware]>;

declare module 'remix' {
  interface RouterTypes {
    context: AppContext;
  }
}

const edgeCache: Middleware = async (_context, next) => {
  const response = await next();
  if (response.ok && !response.headers.has('Cache-Control')) {
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=31536000');
  }
  return response;
};

export const router = createRouter<AppContext>({
  middleware: [
    compression(),
    edgeCache,
    staticFiles(fileURLToPath(new URL('../public', import.meta.url)), {
      index: false,
      etag: 'strong',
      lastModified: false,
    }),
    renderMiddleware,
  ],
});

router.map(routes, controller);
router.map(routes.blog, blogController);
