import { readFile } from 'node:fs/promises';

export interface Post {
  slug: string;
  title: string;
  description: string;
  updated: string;
  pageTitle: string;
  pageDescription: string;
}

export const posts: Post[] = [
  {
    slug: 'write-your-own-neural-networks',
    title: 'Write your own neural network!',
    description:
      "Learn how to write your own neural network (library) in JavaScript! I'll go through what a neural network is, what I have made, and how to do it yourself.",
    updated: 'March 20, 2018',
    pageTitle: 'Write Your Own Neural Networks',
    pageDescription: 'Learn how to write your own Neural Networks!',
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function readPostBody(post: Post) {
  return readFile(new URL(`./posts/${post.slug}.html`, import.meta.url), 'utf8');
}
