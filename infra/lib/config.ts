const baseDomainName = 'barney.dev';

type Config = {
  domainName: string;
  hostedZoneName: string;
};

const envMap: Record<string, Config> = {
  prod: {
    domainName: baseDomainName,
    hostedZoneName: baseDomainName,
  },
  qa: {
    domainName: `qa.${baseDomainName}`,
    hostedZoneName: `qa.${baseDomainName}`,
  },
  dev: {
    domainName: `dev.${baseDomainName}`,
    hostedZoneName: `dev.${baseDomainName}`,
  },
  sandbox: {
    domainName: `sandbox.${baseDomainName}`,
    hostedZoneName: `sandbox.${baseDomainName}`,
  },
};

const config = envMap[$app.stage] ?? {
  domainName: `${$app.stage}.dev.${baseDomainName}`,
  hostedZoneName: `dev.${baseDomainName}`,
};

export { config };
