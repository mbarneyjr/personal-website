import { createController } from 'remix/router';

import { routes } from '#app/routes.ts';
import { BlogIndexPage } from '#app/ui/pages/blog/index-page.tsx';
import { BlogPostPage } from '#app/ui/pages/blog/post-page.tsx';
import { getPost, readPost } from '#app/ui/pages/blog/posts.ts';

export default createController(routes.blog, {
  actions: {
    index(context) {
      return context.render(<BlogIndexPage />);
    },
    async show(context) {
      const post = getPost(context.params.slug);
      if (!post) return new Response('Not Found', { status: 404 });
      const { body, minutes } = await readPost(post);
      return context.render(<BlogPostPage post={post} body={body} minutes={minutes} />);
    },
  },
});
