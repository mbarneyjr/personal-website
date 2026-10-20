import { readFile } from 'node:fs/promises';
import type { RemixNode } from 'remix/component';

export interface InventoryItem {
  term: string;
  value: RemixNode;
}

export interface InventoryGroup {
  heading: string;
  items: InventoryItem[];
}

export const profile: InventoryItem[] = [
  { term: 'NAME', value: 'Michael Barney' },
  { term: 'HEADQUARTERS', value: 'South Bend, IN' },
  {
    term: 'CERTIFICATIONS',
    value: (
      <>
        <a href="https://www.credly.com/users/mbarneyme">AWS (7)</a>,
        <a href="https://www.credly.com/users/mbarneyme">Claude (2)</a>
      </>
    ),
  },
  { term: 'SYSTEM', value: <a href="https://github.com/mbarneyjr/system.nix">system.nix</a> },
];

export const homelab: InventoryGroup[] = [
  {
    heading: 'NETWORK',
    items: [
      { term: 'GATEWAY', value: 'UniFi UDM Pro' },
      { term: 'SWITCHING', value: 'UniFi USW-48-PoE' },
    ],
  },
  {
    heading: 'COMPUTE',
    items: [
      { term: 'HOST', value: 'System76 GAZE14' },
      { term: 'RUNTIME', value: 'Docker Compose' },
    ],
  },
  {
    heading: 'SERVICES',
    items: [
      { term: 'Pi-hole', value: 'DNS Adblock' },
      { term: 'Homebridge', value: 'Apple Home Extension' },
      { term: 'Gitea', value: 'Private Git' },
    ],
  },
];

export const aws: InventoryGroup[] = [
  {
    heading: 'ORGANIZATION',
    items: [
      {
        term: 'MANAGEMENT',
        value: (
          <>
            <a href="https://github.com/org-formation/org-formation-cli">OrgFormation</a>,CloudFormation
          </>
        ),
      },
      { term: 'ACCOUNTS', value: '20+' },
      { term: 'ACCESS', value: 'Identity Center' },
      { term: 'AUDIT', value: 'CloudTrail,AWS Config' },
      { term: 'DETECTION', value: 'GuardDuty,IAM Access Analyzer' },
    ],
  },
  {
    heading: 'SERVICES',
    items: [
      { term: 'BARNEY.DEV', value: 'Personal Website' },
      { term: 'MC.BARNEY.DEV', value: 'On-Demand Minecraft Hosting' },
      { term: 'NIX.BARNEY.DEV', value: 'Personal Nix Cache' },
      { term: 'MRGO.IO', value: 'Serverless URL Shortener' },
      { term: 'BACKUP', value: 'Personal Cloud Backup' },
    ],
  },
];

export interface Project {
  name: string;
  href?: string;
  stack: string;
  description: string;
  image?: string | { svg: string };
}

export const projects: Project[] = [
  {
    name: 'AWSume',
    href: 'https://github.com/trek10inc/awsume',
    stack: 'Python',
    description: 'A utility for assuming AWS IAM roles from the command line.',
  },
  {
    name: 'aws-iam-language-server',
    href: 'https://github.com/mbarneyjr/aws-iam-language-server',
    stack: 'TypeScript',
    description: 'A language server and VSCode extension for AWS IAM policies.',
    image: { svg: await readFile(new URL('./projects/aws-iam-language-server.svg', import.meta.url), 'utf8') },
  },
  {
    name: 'cfn.nvim',
    href: 'https://github.com/mbarneyjr/cfn.nvim',
    stack: 'Lua, Go',
    description: 'A Neovim plugin for working with AWS CloudFormation.',
    image: { svg: await readFile(new URL('./projects/cfn.nvim.svg', import.meta.url), 'utf8') },
  },
  {
    name: 'cfn-changeset-viewer',
    href: 'https://github.com/trek10inc/cfn-changeset-viewer',
    stack: 'TypeScript',
    description: 'A Terraform plan-like viewer for CloudFormation change sets.',
    image: { svg: await readFile(new URL('./projects/cfn-changeset-viewer.svg', import.meta.url), 'utf8') },
  },
  {
    name: 'cfn-event-tailer',
    href: 'https://github.com/trek10inc/cfn-event-tailer',
    stack: 'TypeScript',
    description: 'A CloudFormation event tailer that includes nested stacks.',
    image: { svg: await readFile(new URL('./projects/cfn-event-tailer.svg', import.meta.url), 'utf8') },
  },
  {
    name: 'Mr. Go',
    href: 'https://github.com/mbarneyjr/mrgo',
    stack: 'TypeScript, AWS',
    description: 'A serverless URL shortener.',
  },
  {
    name: 'multilayerperceptron-js',
    href: 'https://github.com/mbarneyjr/multilayerperceptron-js',
    stack: 'JavaScript',
    description: 'A small multilayer perceptron library for educational purposes.',
    image: { svg: await readFile(new URL('./projects/multilayerperceptron-js.svg', import.meta.url), 'utf8') },
  },
  {
    name: 'DiscoPong',
    href: 'https://github.com/mbarneyjr/DiscoPong',
    stack: 'C++',
    description: 'A sandbox project for learning graphics programming with OpenGL.',
    image: '/images/projects/discopong.webp',
  },
];
