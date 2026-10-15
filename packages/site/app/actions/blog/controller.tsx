import { createController } from 'remix/router'

import { routes } from '../../routes.ts'
import { BlogIndexPage } from './index-page.tsx'
import { BlogPostPage } from './post-page.tsx'
import { getPost, readPostBody } from './posts.ts'

export default createController(routes.blog, {
  actions: {
    index(context) {
      return context.render(<BlogIndexPage />)
    },
    async show(context) {
      let post = getPost(context.params.slug)
      if (!post) return new Response('Not Found', { status: 404 })
      return context.render(<BlogPostPage post={post} body={await readPostBody(post)} />)
    },
  },
})
