import { css, type Handle, type RemixNode } from 'remix/component';
import { ImportMap } from 'remix/component/server';
import { assets } from '../../../assets.ts';
import { routes } from '../../../routes.ts';
import { Footer } from '../../public/footer.tsx';
import { NavBar } from '../../public/nav-bar.tsx';
import { layout, space } from '../../public/styles.ts';

const scriptEntry = await assets.getScriptEntry('app/ui/public/entry.ts');

export interface DocumentProps {
  children?: RemixNode;
  title?: string;
  description: string;
  active?: string;
}

const resetCssHref = await assets.getHref('app/ui/public/reset.css');
const fontsCssHref = await assets.getHref('app/ui/public/fonts.css');
const themeCssHref = await assets.getHref('app/ui/public/theme.css');
const faviconHref = await assets.getHref('app/ui/public/favicon.svg');
const berkeleyMonoRegularHref = await assets.getHref('app/ui/public/fonts/BerkeleyMono-Regular.woff2');

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    const { children, title = 'Michael Barney', description, active } = handle.props;
    const { href, importMap, preloads } = scriptEntry;
    return (
      <html lang="en-US" data-rmx-preserve-attrs="data-theme">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script>
            {`try{const t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch{}`}
          </script>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/svg+xml" href={faviconHref} />
          <ImportMap value={importMap} />
          {preloads.map((preloadHref) => (
            <link key={preloadHref} rel="modulepreload" href={preloadHref} />
          ))}
          <script type="module" src={href}></script>

          <link rel="preload" href={berkeleyMonoRegularHref} as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="stylesheet" href={resetCssHref} />
          <link rel="stylesheet" href={fontsCssHref} />
          <link rel="stylesheet" href={themeCssHref} />
        </head>
        <body mix={css({ display: 'grid', gridTemplateRows: 'auto 1fr auto', gridTemplateColumns: 'minmax(0, 1fr)' })}>
          <header>
            <NavBar
              active={active}
              pages={[
                { text: 'blog', href: routes.blog.index.href() },
                { text: 'resume', href: routes.resume.href() },
              ]}
            />
          </header>
          <main mix={[layout.container, layout.stack, space.gap5, space.padBlock3]}>{children}</main>
          <Footer
            attributes={{
              env: { text: process.env.ENVIRONMENT_NAME ?? 'local' },
              region: { text: process.env.AWS_REGION ?? 'local' },
              build: { text: process.env.BUILD_ID ?? 'local', truncate: true },
            }}
          />
        </body>
      </html>
    );
  };
}
