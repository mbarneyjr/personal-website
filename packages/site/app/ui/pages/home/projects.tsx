import { css, unsafeHTML } from 'remix/component';
import { Section } from '#app/ui/pages/lib/section.tsx';
import { border, color, layout, space, text } from '#app/ui/public/styles.ts';
import { projects } from './data.tsx';

const projectImageStyle = css({ aspectRatio: '1', width: '100%', objectFit: 'cover' });

const inlineImageStyle = css({ userSelect: 'none', '& > svg': { display: 'block', width: '100%', height: '100%' } });

export function Projects() {
  return () => (
    <Section heading="PROJECTS">
      <ul mix={[layout.plainList, layout.columns, space.gap4]}>
        {projects.map((project, index) => (
          <li key={project.name} mix={[layout.stack, space.gap2, text.breakAnywhere]}>
            {typeof project.image === 'string' ? (
              <img src={project.image} alt="" mix={projectImageStyle} />
            ) : project.image ? (
              <div
                aria-hidden="true"
                mix={[projectImageStyle, inlineImageStyle]}
                innerHTML={unsafeHTML(project.image.svg)}
              />
            ) : (
              <div mix={[projectImageStyle, layout.center, text.label, color.muted, border.all]}>
                FIG. {String(index + 2).padStart(2, '0')}
                <br /> NO IMAGE
              </div>
            )}
            <h3 mix={text.bold}>{project.href ? <a href={project.href}>{project.name}</a> : project.name}</h3>
            <p mix={[text.label, color.accent2]}>{project.stack}</p>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
