import { readFile } from 'node:fs/promises';

export interface Post {
  slug: string;
  title: string;
  description: string;
  posted: string;
  updated?: string;
}

export const posts: Post[] = [
  {
    slug: 'write-your-own-neural-networks',
    title: 'Write your own neural network!',
    description:
      "Learn how to write your own neural network (library) in JavaScript! I'll go through what a neural network is, what I have made, and how to do it yourself.",
    posted: '2018-03-14',
    updated: '2018-03-20',
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export async function readPost(post: Post) {
  const html = await readFile(new URL(`./posts/${post.slug}.html`, import.meta.url), 'utf8');
  const minutes = Math.ceil(html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200);
  return { body: html, minutes };
}
