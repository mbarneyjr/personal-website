import type { Handle, RemixNode } from 'remix/component'
import { ImportMap } from 'remix/component/server'

import { scriptEntry } from '../assets.ts'
import { NavBar, type NavSection } from '../ui/public/nav-bar.tsx'

export interface DocumentProps {
  children?: RemixNode
  title?: string
  description: string
  active?: NavSection
}

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    let { children, title = 'Michael Barney', description, active } = handle.props
    let { href, importMap, preloads } = scriptEntry

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/png" href="/images/favicon.png" />
          <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" />
          <link rel="stylesheet" href="/styles.css" />
          <ImportMap value={importMap} />
          {preloads.map((preloadHref) => (
            <link key={preloadHref} rel="modulepreload" href={preloadHref} />
          ))}
          <script type="module" src={href}></script>
        </head>
        <body>
          <header>
            <NavBar active={active} />
          </header>
          {children}
        </body>
      </html>
    )
  }
}
