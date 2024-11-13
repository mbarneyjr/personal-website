import { Assets } from './lib/resources/assets';

export const siteBucket = new sst.aws.Bucket('SiteBucket', {
  access: 'cloudfront',
  transform: {
    bucket: {
      bucket: `${$app.name}-${$app.stage}-site`,
    },
  },
});

export const uploadedAssets = Assets(siteBucket.name, './packages/barneydev/site');
