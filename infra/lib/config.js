const baseDomainName = 'barney.dev';
const envMap = {
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
    hostedZoneName: `${$app.stage}.dev.${baseDomainName}`,
};
export { config };
