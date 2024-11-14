import { config } from './lib/config';

const redirectLinkable = new sst.Linkable('SiteRedirect', {
  properties: {
    domainName: config.domainName,
  },
});

async function SiteRedirect(id: string, domainName: string, hostedZoneName: string) {
  const redirectFunction = new sst.aws.Function(`${id}RedirectFunction`, {
    dev: false,
    nodejs: {
      sourcemap: true,
    },
    handler: './packages/site-redirect/index.handler',
    link: [redirectLinkable],
    url: true,
  });
  const zone = await aws.route53.getZone({ name: hostedZoneName });
  new sst.aws.Router(`${id}Redirect`, {
    domain: {
      name: domainName,
      dns: sst.aws.dns({
        zone: zone.id,
      }),
    },
    routes: {
      '/*': redirectFunction.url,
    },
  });
  return {
    domainName,
  };
}

export const siteRedirects = await Promise.all(
  config.redirectDomains.map((domain) => {
    return SiteRedirect(domain.domainName.replace(/\./g, ''), domain.domainName, domain.hostedZoneName);
  }),
);
