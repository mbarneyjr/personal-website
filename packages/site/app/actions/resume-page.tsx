import type { Handle } from 'remix/component'

import { routes } from '../routes.ts'
import { card, mainContent } from '../ui/styles.ts'
import { Document } from './document.tsx'

const services = [
  ['Messaging', 'EventBridge, SNS, SQS, SES'],
  ['Compute', 'Lambda, StepFunctions, ECS, ECR'],
  ['Management', 'CloudFormation, SAR, CodeSuite, AppConfig, CloudWatch, SSM, DataSync'],
  [
    'Security/Governance',
    'CloudTrail, Config, ControlTower, Organizations, Service Catalog, ACM, Cognito, GuardDuty, IAM, KMS, SecretsManager, SSO, WAF',
  ],
  ['Database', 'DynamoDB'],
  ['Storage', 'S3, Backup'],
  ['Networking/Content Delivery', 'API Gateway, CloudFront, Route53, VPC, Amplify Console'],
]

const tooling = [
  ['CI/CD', 'GitLab CI, GitHub Actions, CodePipeline/CodeBuild, CircleCI'],
  ['AWS', 'OrgFormation'],
  ['Other', 'Docker'],
]

const experience = [
  {
    role: 'Cloud Engineer Intern',
    years: '2017-2018',
    summary:
      'During my internship I was responsible for learning AWS, building internal tooling, and working on open source projects such as AWSume.',
  },
  {
    role: 'DevOps Engineer',
    years: '2018-2021',
    summary: 'Responsible for implementing cloud architectures designed by architects with a focus on DevOps.',
  },
  {
    role: 'DevOps Architect',
    years: '2021-Present',
    summary: 'Expands on the DevOps Engineer role, including designing solutions for engineers to implement.',
  },
]

const certifications = [
  ['AWS Certified Cloud Practitioner', 'Practitioner - 2019'],
  ['AWS Certified Solutions Architect', 'Associate - 2018'],
  ['AWS Certified Developer', 'Associate - 2018'],
  ['AWS Certified SysOps Administrator', 'Associate - 2019'],
  ['AWS Certified Solutions Architect', 'Professional - 2019'],
  ['AWS Certified DevOps Engineer', 'Professional - 2018'],
  ['AWS Certified Security', 'Specialty - 2022'],
  ['GitLab Professional Services Engineer', 'Specialist - 2021'],
]

const education = [
  ['B.S. in Computer Science', 'Indiana University, 2018'],
  ['Minor in Mathematics', 'Indiana University, 2018'],
]

function Entries(handle: Handle<{ items: string[][]; separator?: string }>) {
  return () => (
    <ul>
      {handle.props.items.map(([name, detail]) => (
        <li key={name + detail}>
          <b>{name}</b>
          {handle.props.separator ?? ' '}
          {detail}
        </li>
      ))}
    </ul>
  )
}

export function ResumePage() {
  return () => (
    <Document description="The resume of Michael Barney." active="resume">
      <div mix={[mainContent, card]}>
        <h1>Michael Richard Barney, Jr.</h1>
        <p>
          South Bend, IN | <a href={routes.home.href()}>barney.dev</a>
        </p>
        <p>
          Best fit to design and build modern applications using cloud native technologies. Qualified to be responsible
          for cloud architecture, software development, and security engineering.
        </p>

        <hr />
        <h2>Technical Skills</h2>
        <p>I'm proficient in the following languages: Python, JavaScript, TypeScript, Bash, and Graphviz/Dot.</p>
        <p>Capable of designing and delivering architectures with the following services:</p>
        <Entries items={services} separator=": " />
        <p>Comfortable with the following tooling</p>
        <Entries items={tooling} separator=": " />

        <hr />
        <h2>Experience</h2>
        <ul>
          {experience.map((job) => (
            <li key={job.role}>
              <p>
                <b>{job.role}</b> | Trek10, Inc. | <i>{job.years}</i>
              </p>
              <p>{job.summary}</p>
            </li>
          ))}
        </ul>

        <hr />
        <h2>Certifications</h2>
        <Entries items={certifications} />

        <hr />
        <h2>Education</h2>
        <Entries items={education} />
      </div>
    </Document>
  )
}
