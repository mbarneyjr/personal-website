import { css, type Handle, type RemixNode } from 'remix/component';
import { ImportMap } from 'remix/component/server';
import { assets } from '../../../assets.ts';
import { routes } from '../../../routes.ts';
import { Footer } from '../../public/footer.tsx';
import { NavBar } from '../../public/nav-bar.tsx';
import { layout, space } from '../../public/styles.ts';

const scriptEntry = await assets.getScriptEntry('app/ui/public/entry.ts');

const origin = 'https://barney.dev';

export interface DocumentProps {
  children?: RemixNode;
  title?: string;
  description: string;
  path: string;
  active?: string;
  article?: { published: string; modified?: string };
}

const resetCssHref = await assets.getHref('app/ui/public/reset.css');
const fontsCssHref = await assets.getHref('app/ui/public/fonts.css');
const themeCssHref = await assets.getHref('app/ui/public/theme.css');
const faviconHref = await assets.getHref('app/ui/public/favicon.svg');
const fontHrefs = await Promise.all(
  ['Regular', 'Bold', 'Oblique'].map((style) => assets.getHref(`app/ui/public/fonts/BerkeleyMono-${style}.woff2`)),
);

export function Document(handle: Handle<DocumentProps>) {
  return () => {
    const { children, title = 'Michael Barney', description, path, active, article } = handle.props;
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
          <meta property="og:type" content={article ? 'article' : 'website'} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="Michael Barney" />
          <link rel="canonical" href={`${origin}${path}`} />
          <meta property="og:url" content={`${origin}${path}`} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`${origin}/images/og.png`} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Michael Barney, personal website" />
          {article && <meta property="article:published_time" content={article.published} />}
          {article?.modified && <meta property="article:modified_time" content={article.modified} />}
          {article && <meta property="article:author" content={origin} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@mbarneyjr" />
          <meta name="twitter:creator" content="@mbarneyjr" />
          <link rel="icon" type="image/svg+xml" href={faviconHref} />
          <ImportMap value={importMap} />
          {preloads.map((preloadHref) => (
            <link key={preloadHref} rel="modulepreload" href={preloadHref} />
          ))}
          <script type="module" src={href}></script>

          {fontHrefs.map((fontHref) => (
            <link key={fontHref} rel="preload" href={fontHref} as="font" type="font/woff2" crossOrigin="anonymous" />
          ))}
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
