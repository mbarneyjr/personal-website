const baseDomainName = 'barney.dev';

type Config = {
  domainName: string;
  hostedZoneName: string;
  redirectDomains: Array<{
    domainName: string;
    hostedZoneName: string;
  }>;
};

const envMap: Record<string, Config> = {
  prod: {
    domainName: baseDomainName,
    hostedZoneName: baseDomainName,
    redirectDomains: [
      {
        domainName: 'mbarney.me',
        hostedZoneName: 'mbarney.me',
      },
    ],
  },
  qa: {
    domainName: `qa.${baseDomainName}`,
    hostedZoneName: `qa.${baseDomainName}`,
    redirectDomains: [],
  },
  dev: {
    domainName: `dev.${baseDomainName}`,
    hostedZoneName: `dev.${baseDomainName}`,
    redirectDomains: [],
  },
};

const config = envMap[$app.stage] ?? {
  domainName: process.env.DOMAIN_NAME ?? `${$app.stage}.dev.${baseDomainName}`,
  hostedZoneName: process.env.HOSTED_ZONE_NAME ?? `dev.${baseDomainName}`,
  redirectDomains: [],
};

export { config };
