import { readFileSync } from 'fs';
import { config } from './lib/config';
import { siteBucket } from './assets';
import { siteLogBucket } from './logging';

const zone = await aws.route53.getZone({ name: config.hostedZoneName });

export const router = new sst.aws.Router('SiteRouter', {
  domain: {
    name: config.domainName,
    dns: sst.aws.dns({
      zone: zone.id,
    }),
  },
  routes: {
    '/*': {
      bucket: siteBucket,
      edge: {
        viewerRequest: {
          injection: `
            var request = event.request;
            var uri = event.request.uri;
            if (uri.endsWith('/')) {
              // check whether the URI is missing a file name
              request.uri += 'index.html';
            } else if (!uri.includes('.')) {
              // check whether the URI is missing a file extension
              request.uri += '/index.html';
            }
          `,
        },
      },
    },
  },
  transform: {
    cdn: {
      invalidation: true,
      transform: {
        distribution: {
          comment: `${$app.name}-${$app.stage} site distribution router`,
          defaultRootObject: 'index.html',
          loggingConfig: {
            bucket: siteLogBucket.domain,
          },
        },
      },
    },
  },
});
