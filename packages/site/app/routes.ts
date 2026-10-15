import { get, route } from 'remix/routes';

export const routes = route({
  assets: get('/assets/*path'),
  home: get('/'),
  resume: get('/resume'),
  blog: {
    index: get('/blog'),
    show: get('/blog/:slug'),
  },
});
