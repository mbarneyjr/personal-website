import { css, type Handle } from 'remix/component';
import { routes } from '../../../routes.ts';
import { border, color, layout, space, text } from '../../public/styles.ts';
import { Document } from '../lib/document.tsx';
import { Section } from '../lib/section.tsx';
import {
  type Credential,
  certifications,
  type Entry,
  education,
  experience,
  location,
  name,
  services,
  summary,
  tooling,
} from './data.ts';

const certificationColumns = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, var(--column-wide)), 1fr))',
  columnGap: 'var(--space-4)',
  rowGap: 'var(--space-1)',
});
const keepTogether = css({ breakInside: 'avoid' });
const groupHeading = [text.label, color.muted, border.ruleDotted];

function EntryList(handle: Handle<{ heading?: string; entries: Entry[] }>) {
  return () => (
    <div mix={[layout.stack, space.gap1, keepTogether]}>
      {handle.props.heading && <h3 mix={groupHeading}>{handle.props.heading}</h3>}
      <dl mix={[layout.inventory, space.rowGap1]}>
        {handle.props.entries.map((entry) => [
          <dt key={`${entry.term}-term`} mix={[text.label, color.muted]}>
            {entry.term}
          </dt>,
          <dd key={`${entry.term}-value`}>{entry.value}</dd>,
        ])}
      </dl>
    </div>
  );
}

function CredentialItem(handle: Handle<{ credential: Credential }>) {
  return () => {
    const { credential } = handle.props;
    return (
      <li mix={[layout.cluster, space.columnGap3, keepTogether]}>
        <span mix={text.bold}>{credential.name}</span>
        <span mix={[text.label, color.muted]}>{credential.level}</span>
        {credential.year && <span mix={[layout.pushEnd, text.tabular, color.accent2]}>{credential.year}</span>}
      </li>
    );
  };
}

export function ResumePage() {
  return () => (
    <Document
      title="Resume - Michael Barney"
      description="The resume of Michael Barney."
      path={routes.resume.href()}
      active={routes.resume.href()}
    >
      <header mix={[layout.stack, space.gap2]}>
        <h1 mix={text.title}>{name}</h1>
        <p mix={[layout.cluster, space.columnGap3, color.muted]}>
          <span>{location}</span>
          <a href="https://barney.dev">https://barney.dev</a>
          <a href="https://github.com/mbarneyjr">https://github.com/mbarneyjr</a>
        </p>
        <p>{summary}</p>
      </header>

      <Section heading="EXPERIENCE">
        <ol mix={[layout.plainList, layout.stack, space.gap3]}>
          {experience.map((position) => (
            <li key={position.role} mix={[layout.stack, space.gap1, keepTogether]}>
              <div mix={[layout.cluster, space.columnGap3]}>
                <h3 mix={text.bold}>{position.role}</h3>
                <span mix={[text.label, color.muted]}>{position.organization}</span>
                <span mix={[layout.pushEnd, text.tabular, color.accent2]}>{position.years}</span>
              </div>
              <ul mix={[layout.stack, space.gap1]}>
                {position.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading="TECHNICAL SKILLS">
        <EntryList entries={tooling} />
        <EntryList heading="AWS SERVICES" entries={services} />
      </Section>

      <Section heading="EDUCATION AND CERTIFICATIONS">
        <ul mix={[layout.plainList, certificationColumns]}>
          {[...education, ...certifications].map((credential) => (
            <CredentialItem key={`${credential.name}-${credential.level}`} credential={credential} />
          ))}
        </ul>
      </Section>
    </Document>
  );
}
