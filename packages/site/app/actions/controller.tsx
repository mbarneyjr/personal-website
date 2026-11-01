import { createController } from 'remix/router';

import { assets } from '#app/assets.ts';
import { routes } from '#app/routes.ts';
import { HomePage } from '#app/ui/pages/home/page.tsx';
import { ResumePage } from '#app/ui/pages/resume/page.tsx';

export default createController(routes, {
  actions: {
    async assets(context) {
      return (await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 });
    },
    home(context) {
      return context.render(<HomePage />);
    },
    resume(context) {
      return context.render(<ResumePage />);
    },
  },
});
