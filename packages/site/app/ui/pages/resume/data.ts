export interface Entry {
  term: string;
  value: string;
}

export interface Position {
  role: string;
  organization: string;
  years: string;
  highlights: string[];
}

export interface Credential {
  name: string;
  level: string;
  year?: string;
}

export const name = 'Michael Richard Barney, Jr.';
export const location = 'South Bend, IN';

export const summary =
  'Cloud architect who designs and builds secure, scalable, highly available AWS applications, from workload migrations to greenfield builds, for clients from small businesses to Fortune 500 companies.';

export const services: Entry[] = [
  { term: 'MESSAGING', value: 'EventBridge (Pipes, Scheduler), SNS, SQS, SES, Kinesis' },
  { term: 'COMPUTE', value: 'Lambda, ECS, ECR, EC2, Fargate' },
  { term: 'INTEGRATION', value: 'Step Functions, MWAA, AppSync Events' },
  { term: 'MANAGEMENT', value: 'CloudFormation, CodeSuite, CloudWatch, Systems Manager, X-Ray, DataSync' },
  {
    term: 'SECURITY',
    value:
      'CloudTrail, Config, ControlTower, Organizations, Service Catalog, ACM, Cognito, GuardDuty, IAM, IAM Access Analyzer, KMS, SecretsManager, Identity Center, WAF, Inspector, Firewall Manager, Verified Permissions',
  },
  { term: 'DATABASE', value: 'DynamoDB, Aurora, OpenSearch, RDS, DSQL' },
  { term: 'STORAGE', value: 'S3, EBS, EFS, Backup, Transfer Family' },
  {
    term: 'NETWORKING',
    value: 'API Gateway, AppSync, CloudFront, Route53, VPC, Transit Gateway, PrivateLink, ALB',
  },
];

export const tooling: Entry[] = [
  { term: 'LANGUAGES', value: 'TypeScript, Python, Go, Bash' },
  { term: 'CI/CD', value: 'GitHub Actions, GitLab CI, CodePipeline/CodeBuild' },
  { term: 'IAC', value: 'Terraform/OpenTofu, CloudFormation/CDK' },
  { term: 'CONTAINERS', value: 'Docker' },
  { term: 'IDENTITY', value: 'Okta, SAML/OIDC' },
  { term: 'OTHER', value: 'Nix, direnv, Neovim, tmux, Graphviz/Dot' },
];

export const experience: Position[] = [
  {
    role: 'Senior Cloud Architect',
    organization: 'Trek10/Caylent',
    years: '2024-Present',
    highlights: [
      'Led over a dozen client engagements: gathered requirements, designed and engineered solutions, and delegated project work to other engineers.',
      'Designed and implemented a cloud migration for an e-commerce organization, processing thousands of orders per day. Focused on observability, which reduced support tickets. For the first time, the client support team did not handle cases over Thanksgiving and Black Friday.',
      "Led a small software company's cloud journey to deliver better software to local government and school customers. Built a landing zone of hundreds of accounts serving hundreds of tenants, and defined the cloud native development and event-driven architecture model.",
      'Led the engagement with a higher-education Cloud Platform Services team. Architected security, compliance, and governance automation across hundreds of accounts. Automated the VDI image lifecycle, replacing manual inventory, update, and deployment. Enabled over a dozen engineers with SDLC and CI/CD practices on GitHub Actions.',
      'Founding architect of the Caylent managed services practice after the Caylent acquisition of Trek10. Architected and built the IAM system that gives dozens of employees SSO access to hundreds of accounts for all MSP clients.',
    ],
  },
  {
    role: 'DevOps Architect',
    organization: 'Trek10/Caylent',
    years: '2021-2024',
    highlights: [
      'Expanded on the DevOps Engineer role: designed cloud native architectures and led client engagements.',
      'Helped establish the landing zone practice. Delivered dozens of landing zones.',
    ],
  },
  {
    role: 'DevOps Engineer',
    organization: 'Trek10/Caylent',
    years: '2018-2021',
    highlights: [
      'Engineered cloud native applications, integrations, and other services.',
      'Primary developer of AWSume, an open source CLI for assuming AWS IAM roles (https://github.com/trek10inc/awsume): 440 commits and over 500,000 PyPI downloads per month.',
    ],
  },
];

export const certifications: Credential[] = [
  { name: 'Claude Certified Architect', level: 'Professional', year: '2026' },
  { name: 'Claude Certified Architect', level: 'Foundations', year: '2026' },
  { name: 'AWS Security', level: 'Specialty', year: '2022' },
  { name: 'AWS Solutions Architect', level: 'Professional', year: '2019' },
  { name: 'AWS DevOps Engineer', level: 'Professional', year: '2018' },
];

export const education: Credential[] = [
  { name: 'B.S. in Computer Science', level: 'Indiana University', year: '2018' },
  { name: 'Minor in Mathematics', level: 'Indiana University', year: '2018' },
];
