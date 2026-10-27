import { get, route } from 'remix/routes';

export const changelogRoutes = route({
  index: get('/'),
  changes: get('/:region/*version'),
});
