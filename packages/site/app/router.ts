import { fileURLToPath } from 'node:url';
import { render } from 'remix/middleware/render';
import { staticFiles } from 'remix/middleware/static';
import { createRouter, type MiddlewareContext } from 'remix/router';

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

export const router = createRouter<AppContext>({
  middleware: [staticFiles(fileURLToPath(new URL('../public', import.meta.url)), { index: false }), renderMiddleware],
});

router.map(routes, controller);
router.map(routes.blog, blogController);
