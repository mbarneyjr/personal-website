import { get, route } from 'remix/routes';
import { changelogRoutes } from './actions/apps/cloudformation-changelog/routes.ts';

export const routes = route({
  assets: get('/assets/*path'),
  home: get('/'),
  resume: get('/resume'),
  blog: {
    index: get('/blog'),
    show: get('/blog/:slug'),
  },
  apps: route('/apps', {
    cloudformationChangelog: route('/cloudformation-changelog', changelogRoutes),
  }),
});
