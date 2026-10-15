import { css } from 'remix/component'

import { card, mainContent, sectionHeader, title } from '../ui/styles.ts'
import { Document } from './document.tsx'

const projects = [
  {
    name: 'AWSume',
    technologies: ['Python'],
    description:
      "Through my internship at Trek10, I've created an awesome command-line utility for easily using AWS IAM credentials. Easily use AWS user/role credentials with this feature-packed and extensible command-line utility.",
    github: 'https://github.com/trek10inc/awsume',
  },
  {
    name: 'multilayerperceptron-js',
    technologies: ['NodeJS'],
    description:
      'I wrote a small neural network library using JavaScript. This library is intended to be easily understood/readable for educational purposes, and not meant to be optimized.',
    github: 'https://github.com/mbarneyjr/multilayerperceptron-js',
  },
  {
    name: 'DiscoPong',
    technologies: ['C++', 'OpenGL'],
    description:
      'Trying to better understand graphics programming, I wrote a small program using OpenGL to animate a bouncing light on top of a randomly-generated disco floor.',
    github: 'https://github.com/mbarneyjr/DiscoPong',
  },
  {
    name: 'Growth',
    technologies: ['C#', 'Unity'],
    description:
      'Using the Unity3D game engine, I created a simple game reminiscent of the game Agario. The goal of the game is to eat everything that is smaller than you, and avoid things that are bigger than you.',
    github: 'https://github.com/mbarneyjr/Growth',
  },
  {
    name: 'Mr. Go',
    technologies: ['AWS', 'NodeJS'],
    description:
      "Mr. Go is a serverless URL shortener built on AWS. It's a project I built to get the experience of building a basic full stack application using web standards and serverless technologies.",
    github: 'https://github.com/mbarneyjr/mrgo',
    website: 'https://mrgo.io',
  },
]

export function HomePage() {
  return () => (
    <Document description="The personal website of Michael Barney.">
      <div mix={mainContent}>
        <section mix={card}>
          <div mix={css({ display: 'flex', justifyContent: 'center', padding: '1rem' })}>
            <img
              src="images/mbarney.png"
              alt="profile picture"
              id="profile-picture"
              width="512"
              height="512"
              mix={css({ maxWidth: '384px', height: 'auto', borderRadius: '4rem', border: '4px solid black' })}
            />
          </div>
          <h1 mix={title}>Michael Barney</h1>
          <p mix={css({ textAlign: 'center' })}>Howdy, I'm Michael! I like to build stuff!</p>
        </section>

        <h2 mix={sectionHeader} id="more-stuff-about-me">Some More Stuff About Me</h2>
        <section mix={card}>
          <p>
            I'm a DevOps Architect at <a target="_blank" href="https://trek10.com">Trek10 Inc</a>. I entered tech as a "
            <a target="_blank" href="https://twitter.com/forrestbrazeal/status/1051953942492602370">
              serverless native,
            </a>
            " beginning my career building cloud applications at the bleeding edge. I studied Computer Science at
            Indiana University, and I have 7 AWS certifications. The only thing I love more than serverless technologies
            is automation and DevOps. The more I can automate through source control, CI/CD, and infrastructure-as-code
            the happier I am.
          </p>
          <p>
            When I'm not working at Trek10 I enjoy learning new technologies, tinkering with my homelab, and playing
            video games. My homelab currently consists of a Unifi Dream Machine Pro and a PoE Switch for networking. For
            compute I have a{' '}
            <a target="_blank" href="https://system76.com/">
              System76
            </a>{' '}
            laptop with Ubuntu server installed. Most homelab services I run are in the form of a{' '}
            <a target="_blank" href="https://www.docker.com/">
              Docker
            </a>{' '}
            container, orchestrated through docker-compose. Services I run include{' '}
            <a target="_blank" href="https://pi-hole.net/">
              Pihole
            </a>
            ,{' '}
            <a target="_blank" href="https://homebridge.io/">
              Homebridge
            </a>
            ,{' '}
            <a target="_blank" href="https://gitea.io/">
              Gitea
            </a>
            ,{' '}
            <a target="_blank" href="https://www.plex.tv/">
              Plex
            </a>
            , and{' '}
            <a target="_blank" href="https://minecraft.net/">
              Minecraft
            </a>
            .
          </p>
        </section>

        <h2 mix={sectionHeader}>Projects</h2>
        <div mix={card}>
        <ul mix={projectList}>
          {projects.map((project) => (
            <li key={project.name} mix={[card, projectItem]}>
              <header mix={projectHeader}>
                <h3 mix={css({ fontFamily: 'Acme, sans-serif', margin: 0 })}>{project.name}</h3>
                <ul mix={technologyList}>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </header>
              <p mix={css({ margin: 0, fontStyle: 'italic' })}>{project.description}</p>
              <ul mix={css({ all: 'unset', display: 'flex', gap: '1rem' })}>
                <li>
                  <a aria-label="link to project's GitHub page" target="_blank" href={project.github}>
                    <i class="fa fa-large fa-github" />
                  </a>
                </li>
                {project.website && (
                  <li>
                    <a aria-label="link to project's website" target="_blank" href={project.website}>
                      <i class="fa fa-large fa-rocket" />
                    </a>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </Document>
  )
}

const projectList = css({
  listStyle: 'none',
  padding: 0,
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
})

const projectItem = css({
  flex: '1 49%',
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
})

const projectHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  width: '100%',
})

const technologyList = css({
  textAlign: 'center',
  height: '100%',
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  '& li': { whiteSpace: 'nowrap' },
  '& li:not(:last-child)': { marginRight: '1em' },
})
